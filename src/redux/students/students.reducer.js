import { StudentActionTypes } from './students.types';

const INITIAL_STATE = {
  studentList: null
};

const studentsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case StudentActionTypes.SET_CURRENT_STUDENTS:
      return {
        ...state,
        studentList: action.payload
      };
    default:
      return state;
  }
};

export default studentsReducer;