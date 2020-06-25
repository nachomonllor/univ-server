const bcrypt = require('bcryptjs');
/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('UserRoles', [{
    UserId: 1,
    RoleId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    UserId: 2,
    RoleId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    UserId: 3,
    RoleId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('UserRoles', null, {}),
};
