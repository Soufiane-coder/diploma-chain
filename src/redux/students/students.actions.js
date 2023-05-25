import { StudentActionTypes } from './students.types';

export const setStudentList = students => ({
  type: StudentActionTypes.SET_CURRENT_STUDENTS,
  payload: students
});
