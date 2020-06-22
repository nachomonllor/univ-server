import * as bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {
  const validRoles = ['ADMIN_ROLE', 'USER_ROLE', 'GUEST_ROLE']

  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      lowercase: true,
      validate: {
        isEmail: true
      },
      unique: {
        args: true,
        msg: 'El email no esta disponible, elija otro!'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false
    },
    reset_password_token: {
      type: DataTypes.STRING,
      allowNull: true,
      default: false
    },
    reset_password_expires: {
      type: DataTypes.STRING,
      allowNull: true,
      default: false
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  });
  User.associate = (models) => {
    // relaciones
    // 1:M
    User.hasMany(models.Subject, {
      foreignKey: 'TeacherId'
    });
    // M:M
    User.belongsToMany(models.Subject, {
      through: { model: models.TeacherSubject },
      as: 'subjects',
      foreignKey: 'TeacherId',
    });
  };
  // Hook se dispara antes de crear el registro en la tabla
  User.beforeCreate((user, options) => {
    if (!user.changed('password')) {
      return sequelize.Promise.reject("not modified");
    }
    if (user.password) {
      user.password = bcrypt.hashSync(user.password, 10);
    }    
  });
  return User;
};
