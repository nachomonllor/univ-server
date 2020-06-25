import db from '../../models';

import { Sequelize } from '../../models';
import Parametrizer from '../../utils/parametrizer';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
const node_env = process.env.NODE_ENV || 'development';
const config = require('../../config').config;

class AuthController {
  static Login(req, res) {
    const { body } = req;
    db.User.findOne({
        where: {
          email: body.email
        },
        include: [{
          model: db.Role,
          as: 'roles',
          through: { attributes: [] },
        }],
      }).then(user => {
        if (!user) {
          return res.status(400).json({
            ok: false,
            message: 'Credenciales incorrectas',
            errors: 'Credenciales incorrectas',
          });
        }
        if (!bcrypt.compareSync(body.password, user.password)) {
          return res.status(400).json({
            ok: false,
            message: 'Credenciales incorrectas',
            errors: 'Credenciales incorrectas',
          });
        }
        // Crear un token
        // expira en 4hs
        user.password = ':P';
        const token = jwt.sign({ user: user }, config.authJwtSecret, { expiresIn: 14400 });
        const { roles } = user;
        res.status(200).json({
          ok: true,
          user: user,
          token,
          id: user.id,
          menu: getMenu(roles),
        });
      })
      .catch(err => {
        res.status(400).json({ message: 'issues trying to connect to database' + err, err })
      });
  }

  static RenewToken(req, res) {
    const token = jwt.sign({ user: req.user }, SEED, { expiresIn: 14400 });
    res.status(200).json({
      ok: true,
      token,
    });
  }
}

function getMenu(roles) {
  const menu = [{
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
      ],
    },
    {
      titulo: 'Administración',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [],
    },
  ];
  if (containsAdminRole(roles) >= 0) {
    menu[1].submenu.push({ titulo: 'Usuarios', url: '/users' });
    menu[1].submenu.push({ titulo: 'Roles', url: '/roles' });
    menu[1].submenu.push({ titulo: 'Materias', url: '/courses' });
    menu[1].submenu.push({ titulo: 'Alumnos', url: '/students' });
    menu[1].submenu.push({ titulo: 'Inscripción', url: '/inscription' });
  }
  if (containsStudentRole(roles) >= 0) {
    menu[1].submenu.push({ titulo: 'Inscripción', url: '/inscription' });
  }
  return menu;
}

function containsAdminRole(roles) {
  return roles.findIndex(role => role.name === "Administrador");
}

function containsStudentRole(roles) {
  return roles.findIndex(role => role.name === "Alumno");
}
export default AuthController;

