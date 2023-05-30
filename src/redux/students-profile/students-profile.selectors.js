import { createSelector } from "reselect";

const selectStudentsProfile = (state) => state.studentProfile;


export const selectStudentProfileList = createSelector(
  [selectStudentsProfile],
  (studentProfile) => studentProfile.studentProfileList
);

export const selectStudent = createSelector(
  [selectStudentsProfile],
  (students) => (studentId) => students.studentProfileList.find(item => item.studentId === studentId)
)

export const selectSemesters = createSelector(
  [selectStudentsProfile],
  (students) => (studentId) => students.studentProfileList.find(item => item.studentId === studentId)?.semesters
)

export const selectModules = createSelector(
  [selectStudentsProfile],
  (students) => (studentId, semesterNum) => students.studentProfileList.find(item => item.studentId === studentId)?.semesters?.find(item => item.semester === semesterNum)
)