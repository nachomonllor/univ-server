const bcrypt = require('bcryptjs');

/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Students', [{
    UserId: 3,
    enrollment: '11222993',
    genre: 'M',
    birthDate: new Date(),
  }], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Students', null, {}),
}