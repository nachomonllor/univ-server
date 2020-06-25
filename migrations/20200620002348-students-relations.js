/* eslint-disable indent */
module.exports = {
  up(queryInterface) {
    return queryInterface.addConstraint(
        'Students', ['UserId'], {
          type: 'foreign key',
          name: 'fk_Users_StudentId',
          references: {
            table: 'Users', // name of Target model
            field: 'id', // key in Target model that we're referencing
          },
          onDelete: 'CASCADE',
          allowNull: false,
        },
      );
  },
  down(queryInterface) {
    return queryInterface.removeConstraint('Students', 'fk_Users_StudentId');
  },
};