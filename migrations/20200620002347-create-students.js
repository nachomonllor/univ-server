/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Students', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    // CareerId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    // },
    // matricula
    enrollment: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    genre: {
      type: Sequelize.STRING(1),
      allowNull: false,
    },
    birthDate: {
      type: Sequelize.DATE,
      allowNull: false,
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Students'),
};