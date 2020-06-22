/* eslint-disable indent */
module.exports = {
  up(queryInterface) {
    return queryInterface.addConstraint(
        'Subjects', ['TeacherId'], {
          type: 'foreign key',
          name: 'fk_Subjects_TeacherId',
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
    return queryInterface.removeConstraint('Subjects', 'fk_Subjects_TeacherId');
  },
};