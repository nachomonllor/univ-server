import * as bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {

  const TeacherSubject = sequelize.define('TeacherSubject', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    TeacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    SubjectId: {
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
  TeacherSubject.associate = (models) => {

  };
  // Method 3 via the direct method
  TeacherSubject.beforeCreate((TeacherSubject, options) => {

  });
  return TeacherSubject;
};