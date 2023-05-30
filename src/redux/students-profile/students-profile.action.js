import { StudentProfileActionTypes } from './students-profile.types';

export const setStudentList = students => ({
  type: StudentProfileActionTypes.SET_CURRENT_STUDENTS_PROFILE,
  payload: students
});

export const addStudentToList = student => ({
  type: StudentProfileActionTypes.ADD_STUDENT_TO_LIST,
  payload: student
})

export const addSemesterToStudentProfileList = studentId => ({
  type: StudentProfileActionTypes.ADD_SEMESTER_TO_STUDENT_LIST,
  payload: studentId
})

export const addModuleToSemester = (studentId, semesterNum, moduleName, note, id) => ({
  type: StudentProfileActionTypes.ADD_MODULE_TO_SEMESTER,
  payload: {studentId, semesterNum, moduleName, note, id}
})

export const changeAttribut = (studentId, attributeName, newAttributeValue) => ({
  type: StudentProfileActionTypes.CHANGE_ATTRIBUTE,
  payload: {studentId, attributeName, newAttributeValue}
})
