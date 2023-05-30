import { StudentProfileActionTypes } from './students-profile.types';
import { addStudent, addSemester, addModule, changeAttribute } from './students-profile.utils';

const INITIAL_STATE = {
  studentProfileList: []
};

const studentsProfileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case StudentProfileActionTypes.SET_CURRENT_STUDENTS_PROFILE:
      return {
        ...state,
        studentProfileList: action.payload
      };
      case StudentProfileActionTypes.ADD_STUDENT_TO_LIST:
        return {
          ...state,
          studentProfileList: addStudent(state.studentProfileList, action.payload)
        };
      case StudentProfileActionTypes.ADD_SEMESTER_TO_STUDENT_LIST:
        return {
          ...state,
          studentProfileList: addSemester(state.studentProfileList, action.payload)
        };
      case StudentProfileActionTypes.ADD_MODULE_TO_SEMESTER:
        const {studentId, semesterNum, moduleName, note,id} = action.payload;
        return {
          ...state,
          studentProfileList: addModule(state.studentProfileList, studentId, semesterNum, moduleName, note,id)
        }
      case StudentProfileActionTypes.CHANGE_ATTRIBUTE:
        return {
          ...state,
          studentProfileList: changeAttribute(state.studentProfileList, action.payload.studentId, action.payload.attributeName, action.payload.newAttributeValue)
        }
    default:
      return state;
  }
};

export default studentsProfileReducer;