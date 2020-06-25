export default (sequelize, DataTypes) => {

  const TeacherCourse = sequelize.define('TeacherCourse', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    TeacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CourseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  });
  TeacherCourse.associate = (models) => {

  };
  // Method 3 via the direct method
  TeacherCourse.beforeCreate((TeacherCourse, options) => {

  });
  return TeacherCourse;
};