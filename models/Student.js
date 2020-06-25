import * as bcrypt from 'bcryptjs'

export default (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // CareerId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // matricula
    enrollment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING(1),
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {timestamps: false})
  Student.associate = (models) => {
    Student.belongsTo(models.User, {
      foreignKey: 'UserId',
      targetKey: 'id',
    })
    // M:M
    Student.belongsToMany(models.Course, {
      through: { model: models.Inscription },
      as: 'inscriptions',
      foreignKey: 'StudentId',
    })
  }
  return Student
}
