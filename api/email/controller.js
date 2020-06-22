import db from require('../../models');
import { Sequelize } from '../../models';
import RESPONSES from '../../utils/responses';
import smtpTransport from './../../utils/transport';
const { Op } = Sequelize;
class EmailSenderController {
  static ForgotPassword(req, res) {
    const email = req.body.email;
    // const expiracionDias = req.body.exp;
    async.waterfall([
      function (done) {
        db.User.findOne({
          where: {
            email
          }
        })
          .then(function (user) {
            if (user) {
              console.log("Encontré al usuario del mail requerido!");
              done(null, user);
            } else {
              console.log("NO Encontré al usuario del mail requerido!");
              return res.json({ user: false });
            }
          })
      },
      function (user, done) {
        console.log("Creo el token")
        // create the random token
        crypto.randomBytes(20, function (err, buffer) {
          var token = buffer.toString('hex');
          console.log(`Creé el token -> ${token}`);
          done(err, user, token);
        });
      },
      async function (user, token, done) {
        console.log("Actualizo al usuario");
        const reset_password_expires = Date.now() + 86400000;
        await db.User.update(
          {
            reset_password_token: token,
            reset_password_expires,
          },
          { where: { id: user.id } }
        )
        console.log("Actualicé al usuario");
        await db.User.findOne({
          where: {
            id: user.id
          }
        }).then(function (nuevo_usuario) {
          console.log("Obtuve al usuario actualizado");
          done(null, token, nuevo_usuario);
        })
      },
      async function (token, user, done) {
        console.log("Mando mail");

        const configFile = await getFile();

        var data = {
          to: user.email,
          from: '"University " <dev@gmail.com>', // sender address
          template: 'forgot-password-email',
          subject: 'Password help has arrived!',
          context: {
            url: `http://${configFile.development.host}:4200/reset_password/${token}`,
            name: user.firstname,
            layout: 'forgot-password-email.html'
          }
        };
        smtpTransport.sendMail(data, function (err) {
          if (!err) {
            console.log("Mandé mail");
            return res.json({ user: true, email: true, message: 'Kindly check your email for further instructions' });
          } else {
            console.log(`ERROR Mando mail -> ${err}`);
            return res.json({ user: true, email: false, message: 'Kindly check your email for further instructions' });
          }
        });
      }
    ], function (err) {
      return res.status(422).json({ message: err });
    });
  };

  static ResetPassword(req, res) {
    db.User.findOne({
      where: {
        reset_password_token: req.body.token,
        reset_password_expires: {
          [Op.gte]: Date.now()
        }
      }
    }).then(function (user) {
      if (user) {
        user.reset_password_token = undefined;
        user.reset_password_expires = undefined;
        user.password = bcrypt.hashSync(req.body.password, 10);
        // bcrypt.genSalt(10, (err, salt) => {
        //     bcrypt.hash(req.body.password, salt, null, (err, hash) => {
        // if (err) throw err;
        // user.password = hash;
        user
          .save()
          .then(user => {
            var data = {
              to: user.email,
              from: '"University " <dev@gmail.com>', // sender address
              template: 'reset-password-email',
              subject: 'Password Reset Confirmation',
              context: {
                name: user.firstname
              }
            };
            smtpTransport.sendMail(data, function (err) {
              if (!err) {
                console.log("Email enviado!");
                return res.json({ token: true, password: true, reset: true, email: true });
              } else {
                console.log("Hubo un error al enviar el email");
                return res.json({ token: true, password: true, reset: true, email: false });
              }
            });
          })
          .catch(err => {
            console.log("El usuario no pudo ser actualizado");
            return res.json({ token: true, passwords: true, reset: false });
          })
        //     })
        // });
      } else {
        console.log("El token para resetear el password es invalido o ha expirado");
        return res.json({ token: false })
      }
    });
  }
}

export default EmailSenderController