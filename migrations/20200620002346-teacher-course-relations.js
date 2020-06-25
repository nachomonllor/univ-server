/* eslint-disable indent */
module.exports = {
  up(queryInterface) {
    return queryInterface.addConstraint(
        'TeacherCourses', ['TeacherId'], {
          type: 'foreign key',
          name: 'fk_TeacherCourses_TeacherId',
          references: {
            table: 'Users', // name of Target model
            field: 'id', // key in Target model that we're referencing
          },
          onDelete: 'CASCADE',
          allowNull: false,
        },
      ), queryInterface.addConstraint(
        'TeacherCourses', ['CourseId'], {
          type: 'foreign key',
          name: 'fk_TeacherCourses_CourseId',
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
    return queryInterface.removeConstraint('TeacherCourses', 'fk_TeacherCourses_TeacherId'),
      queryInterface.removeConstraint('TeacherCourses', 'fk_TeacherCourses_CourseId');
  },
};