
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import db from '../../models'
const node_env = process.env.NODE_ENV || 'development'
// const { SEED } = require('../../config/config')[node_env]
const config = require('../../config').config
class AuthController {
  static Login(req, res) {
    const { body } = req
    db.User.findOne({
      where: {
        email: body.email
      }
    }).then(user => {
      // si no encuentro el usuario
      if(!user) {
        return res.status(400).json({
          ok: false,
          message: 'Credenciales incorrectas',
          errors: 'Credenciales incorrectas'
        })
      }     
      if (!bcrypt.compareSync(body.password, user.password)) {
        return res.status(400).json({
          ok: false,
          message: 'Credenciales incorrectas',
          errors: 'Credenciales incorrectas',
        })
      }
      user.password = ':P'
      // Crear un token
      // expira en 4hs
      const token = jwt.sign({ user: user }, config.authJwtSecret, { expiresIn: 14400 })
      res.status(200).json({
        ok: true,
        user: user,
        token,
        id: user.id,
        // menu: getMenu(roles),
      })
    }).catch(err => {
      res.status(400).json({ message: 'issues trying to connect to database' + err, err })
    })
  }
  static RenewToken(req, res) {
    const token = jwt.sign({ user: req.user }, SEED, { expiresIn: 14400 })
    res.status(200).json({
      ok: true,
      token,
    })
  }
}

export default AuthController