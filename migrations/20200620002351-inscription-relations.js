/* eslint-disable indent */
module.exports = {
  up(queryInterface) {
    return queryInterface.addConstraint(
        'Inscriptions', ['StudentId'], {
          type: 'foreign key',
          name: 'fk_Inscriptions_StudentId',
          references: {
            table: 'Students', // name of Target model
            field: 'id', // key in Target model that we're referencing
          },
          onDelete: 'CASCADE',
          allowNull: false,
        },
      ), queryInterface.addConstraint(
        'Inscriptions', ['CourseId'], {
          type: 'foreign key',
          name: 'fk_Inscriptions_CourseId',
          references: {
            table: 'Courses', // name of Target model
            field: 'id', // key in Target model that we're referencing
          },
          onDelete: 'CASCADE',
          allowNull: false,
        },
      );
  },
  down(queryInterface) {
    return queryInterface.removeConstraint('Inscriptions', 'fk_Inscriptions_StudentId'),
      queryInterface.removeConstraint('Inscriptions', 'fk_Inscriptions_CourseId');
  },
};