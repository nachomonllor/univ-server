import db from '../../models'
import { Sequelize } from '../../models'
import Parametrizer from '../../utils/parametrizer'
import RESPONSES from '../../utils/responses'
import _ from 'lodash'

class InscriptionController {
  static Fetch(req, res) {
    const { Op } = Sequelize
    const attrs = ['id', 'StudentId', 'CourseId', 'active', 'createdAt']
    const search = ['StudentId']
    const { filter } = req.query
    const options = Parametrizer.getOptions(req.query, attrs, search)
    if (filter) {
      options.where.name = {
        [Op.like]: `%${filter}%`,
      }
    }
    db.Inscription.findAndCountAll(options)
      .then((data) => {
        res.status(200).json(Parametrizer.responseOk(data, options))
      })
      .catch(Sequelize.ValidationError, (msg) =>
        res.status(422).json({ message: msg.errors[0].message }),
      )
      .catch((err) => {
        res
          .status(400)
          .json({ message: RESPONSES.DB_CONNECTION_ERROR.message, err })
      })
  }
  static FetchOne(req, res) {
    const id = +req.params.id
    db.Inscription.findOne({
      where: {
        id,
      },
    })
      .then((result) => {
        if (result === 0) {
          res.status(404).json({
            error: RESPONSES.RECORD_NOT_FOUND_ERROR.message,
          })
        } else {
          res.status(200).json({
            ok: true,
            payload: result,
          })
        }
      })
      .catch(Sequelize.ValidationError, (msg) =>
        res.status(422).json({
          message: msg.errors[0].message,
        }),
      )
      .catch((err) =>
        res
          .status(400)
          .json({ message: RESPONSES.DB_CONNECTION_ERROR.message }),
      )
  }
  static async Create(req, res) {
    let courses = req.body
    const studentModel = await db.Student.findOne({
      where: {
        UserId: req.user.id,
      }
    })
    studentModel.setInscriptions(courses).then((inscriptions) => {
      res.status(200).json({
        ok: true,
        inscriptions,
      })
    }).catch((err) => {
      res.status(400).json({ message: RESPONSES.DB_CONNECTION_ERROR.message })
    })   
  }
  static Update(req, res) {
    const { TeacherId, name, quarter, spaces, active } = req.body
    const id = +req.params.id
    // db.Inscription.update(
    //   {
    //     id,
    //     ,
    //     name,
    //     quarter,
    //     spaces,
    //     img,
    //     active,
    //   },
    //   { where: { id } },
    // )
    //   .then((course) => {
    //     res.status(200).json(course)
    //   })
    //   .catch(Sequelize.ValidationError, (msg) =>
    //     res.status(422).json({ message: msg.errors[0].message }),
    //   )
    //   .catch((err) =>
    //     res
    //       .status(400)
    //       .json({ message: RESPONSES.DB_CONNECTION_ERROR.message }),
    //   )
  }
  static Delete(req, res) {
    const { id } = req.params
    db.Inscription.destroy({ where: { id } })
      .then((result) => {
        if (result === 0) {
          res.status(404).json({
            error: RESPONSES.RECORD_NOT_FOUND_ERROR.message,
          })
        } else {
          res.status(200).json({
            message: RESPONSES.DELETE_RECORD_ERROR.message,
          })
        }
      })
      .catch(Sequelize.ValidationError, (msg) =>
        res.status(422).json({ message: msg.errors[0].message }),
      )
      .catch(Sequelize.ForeignKeyConstraintError, (err) =>
        res.status(400).json({
          message: RESPONSES.RECORD_IN_USE_ERROR.message,
        }),
      )
      .catch((err) =>
        res
          .status(400)
          .json({ message: RESPONSES.DB_CONNECTION_ERROR.message + err }),
      )
  }
}
export default InscriptionController
