import { AllProfilesActionTypes } from "./all-profiles.types";

const INITIAL_STATE = {
  allProfiles: null
};

const allProfilesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AllProfilesActionTypes.SET_ALL_STUDENTS:
      return {
        ...state,
        allProfiles: action.payload
      };
    default:
      return state;
  }
};

export default allProfilesReducer;