const bcrypt = require('bcryptjs');
/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Roles', [{
    name: 'Administrador',
    description: 'Administrador',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    name: 'Profesor',
    description: 'Profesor de la universidad',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    name: 'Alumno',
    description: 'Alumno de la universidad',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Roles', null, {}),
};