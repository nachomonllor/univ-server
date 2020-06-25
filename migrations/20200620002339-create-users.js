'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true      
    },
    fullname: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    lastname: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
      lowercase: true,
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    // is_verified: {
    //   type: Sequelize.BOOLEAN,
    //   allowNull: false,
    // },
    img: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    // reset_password_token: {
    //   type: Sequelize.STRING(100),
    //   allowNull: true,
    // },
    // reset_password_expires: {
    //   type: Sequelize.DATE,
    //   allowNull: true,
    // },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: true,
      type: Sequelize.DATE,
    }
  }),  
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users')
};
