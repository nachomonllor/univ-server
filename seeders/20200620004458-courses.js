const bcrypt = require('bcryptjs')
/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Courses',
      [
        {
          name: 'Matematicas 1',
          period: 1,
          capacity: 30,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Matematicas 2',
          period: 1,
          capacity: 30,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Lenguajes de Programacion 1',
          period: 1,
          capacity: 30,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    ),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('UserRoles', null, {}),
}
