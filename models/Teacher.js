import * as bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
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
    
  });
  Teacher.associate = (models) => {
  };
  return Teacher;
};
