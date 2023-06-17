import { AllProfilesActionTypes } from './all-profiles.types';

export const setAllProfiles = allStudents => ({
  type: AllProfilesActionTypes.SET_ALL_STUDENTS,
  payload: allStudents
});
