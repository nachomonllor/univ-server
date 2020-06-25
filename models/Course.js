export default (sequelize, Sequelize) => {
  const Course = sequelize.define('Course', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    period: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    capacity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  });
  Course.associate = (models) => {
    // M:1
    Course.belongsTo(models.User, {
      as: 'users',
      foreignKey: 'CourseId',
    });
    // M:M
    Course.belongsToMany(models.User, {
      through: { model: models.TeacherCourse },
      as: 'teachers',
      foreignKey: 'CourseId',
    });
  };

  return Course;
};
