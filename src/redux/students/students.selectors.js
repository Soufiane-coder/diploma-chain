import { createSelector } from "reselect";

const selectStudents = (state) => state.students;

export const selectStudentList = createSelector(
  [selectStudents],
  (students) => students.studentList
);
