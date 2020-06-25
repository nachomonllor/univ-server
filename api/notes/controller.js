import db from '../../models'
import { Sequelize } from '../../models'
import Parametrizer from '../../utils/parametrizer'
import RESPONSES from '../../utils/responses'
const { Op } = Sequelize
class NoteController {
  static Fetch(req, res) {
    let roles = req.query.roles.split(',')
    const attrs = [
      'id',
      'NoteId',
      'enrollment', //matricula
      'birthDate'
    ]
    req.query.active = undefined
    const options = Parametrizer.getOptions(req.query, attrs)
    roles = roles.map((i) => +i)

    options.include = [
      {
        model: db.Role,
        attributes: ['id', 'name'],
        as: 'roles',
        through: { attributes: [] },
        where:
          roles.length > 0
            ? {
                [Op.or]: {
                  id: roles,
                },
              }
            : null,
      },
    ]
    db.Note.findAndCountAll(options)
      .then((data) => {
        res.status(200).json(Parametrizer.responseOk(data, options))
      })
      .catch(Sequelize.ValidationError, (msg) =>
        res.status(422).json({ message: msg.errors[0].message }),
      )
      .catch((err) => {
        res
          .status(400)
          .json({ message: RESPONSES.DB_CONNECTION_ERROR.message + err })
      })
  }
  static FetchOne(req, res) {
    const attrs = ['id', 'fullname', 'lastname', 'email']
    const id = +req.params.id
    db.Note.findOne({
      where: {
        id,
      },
      attributes: attrs,
      include: [
        {
          model: db.Role,
          as: 'roles',
          through: { attributes: ['NoteId', 'RoleId'] },
        },
      ],
      // order: [
      //   [db.LoanDetail, 'id', 'ASC']
      // ]
    })
      .then((Note) => {
        if (!Note) {
          res.status(404).json({
            error: RESPONSES.RECORD_NOT_FOUND_ERROR.message,
          })
        } else {
          res.status(200).json({
            ok: true,
            payload: Note,
          })
        }
      })
      .catch(Sequelize.ValidationError, (msg) => {
        res.status(422).json({
          message: msg.errors[0].message,
        })
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: RESPONSES.DB_CONNECTION_ERROR.message + err })
      })
  }
  static Create(req, res) {
    const { fullname, lastname, email, password, phone, img, roles, categories, schedule } = req.body
    const is_verified = false
    const active = true
    db.sequelize
      .transaction({ autocommit: false })
      .then(async (t) => {
        const NoteModel = await db.Note.create(
          {
            fullname,
            lastname,
            email,
            password,
            phone,
            is_verified,
            img,
            active,
          },
          { transaction: t },
        )
        NoteModel.password = ':P'
        const rolesModel = await db.Role.findAll(
          {
            where: {
              [Op.or]: {
                id: roles,
              },
            },
          },
          { transaction: t },
        )
        await NoteModel.setRoles(rolesModel, { transaction: t })
        if(categories) {
          const categoriesModel = await db.Category.findAll(
            {
              where: {
                [Op.or]: {
                  id: categories,
                },
              },
            },
            { transaction: t },
          )
          await NoteModel.setCategories(categoriesModel, { transaction: t })
          await db.Schedule.bulkCreate(
            schedule.map(i => {
              i.ProfesionalId = NoteModel.id
              return i;
            })
            , { transaction: t });

        }
        t.commit()
        return NoteModel
      })
      .then((Note) => {
        res.status(200).json({
          ok: true,
          Note,
        })
      })
      .catch((err) => {
        res
          .status(400)
          .json({ description: RESPONSES.DB_CONNECTION_ERROR + err })
      })
  }
  static Update(req, res) {
    const { fullname, lastname, email, password, phone, img } = req.body
    const { id } = req.params
    db.Note.update(
      {
        fullname,
        lastname,
        email,
        password,
        phone,
        img,
      },
      { where: { id } },
    )
      .then((Note) => {
        res.status(200).json(Note)
      })
      .catch(Sequelize.ValidationError, (msg) =>
        res.status(422).json({ message: msg.errors[0].message }),
      )
      .catch((err) =>
        res
          .status(400)
          .json({ message: RESPONSES.DB_CONNECTION_ERROR.message + err }),
      )
  }
  static Delete(req, res) {
    const { id } = req.params
    db.Note.update({ active: false }, { where: { id } })
      .then((result) => {
        if (result === 0) {
          res.status(404).json({
            error: 'Registro no encontrado!',
          })
        } else {
          res.status(200).json({
            message: 'El usuario ha sido desactivado!',
          })
        }
      })
      // .catch(Sequelize.ValidationError, (msg) =>
      //   res.status(422).json({ message: msg.errors[0].message }),
      // )
      // .catch(Sequelize.ForeignKeyConstraintError, (err) =>
      //   res
      //     .status(400)
      //     .json({
      //       message:
      //         'El registro no puede ser eliminado por que ya está en uso. Solo puede desactivarlo',
      //     }),
      // )
      .catch((err) =>
        res
          .status(400)
          .json({ message: RESPONSES.DB_CONNECTION_ERROR.message + err }),
      )
  }
}

export default NoteController
