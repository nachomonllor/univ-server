export default (sequelize, DataTypes) => {
  const Subject = sequelize.define('Subject', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    TeacherId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    quarter: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spacesAvailables: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  });
  Subject.associate = (models) => {
    // M:1
    Subject.belongsTo(models.User, {
      as: 'users',
      foreignKey: 'SubjectId',
    });
    // M:M
    Subject.belongsToMany(models.User, {
      through: { model: models.TeacherSubject },
      as: 'teachers',
      foreignKey: 'SubjectId',
    });
  };

  return Subject;
};
