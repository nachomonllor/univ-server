/* eslint-disable indent */
module.exports = {
  up(queryInterface) {
    return queryInterface.addConstraint(
        'TeacherSubjects', ['TeacherId'], {
          type: 'foreign key',
          name: 'fk_TeacherSubjects_TeacherId',
          references: {
            table: 'Users', // name of Target model
            field: 'id', // key in Target model that we're referencing
          },
          onDelete: 'CASCADE',
          allowNull: false,
        },
      ), queryInterface.addConstraint(
        'TeacherSubjects', ['SubjectId'], {
          type: 'foreign key',
          name: 'fk_TeacherSubjects_SubjectId',
          references: {
            table: 'Subjects', // name of Target model
            field: 'id', // key in Target model that we're referencing
          },
          onDelete: 'CASCADE',
          allowNull: false,
        },
      );
  },
  down(queryInterface) {
    return queryInterface.removeConstraint('TeacherSubjects', 'fk_TeacherSubjects_TeacherId'),
      queryInterface.removeConstraint('TeacherSubjects', 'fk_TeacherSubjects_SubjectId');
  },
};