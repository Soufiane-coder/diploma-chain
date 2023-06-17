import { createSelector } from "reselect";
const selectAllProfiles = (state) => state.allProfiles;


export const selectProfile = createSelector(
  [selectAllProfiles],
  (allProfiles) => (studentId) => allProfiles.allProfiles.find(item => item.studentId === studentId)
)
