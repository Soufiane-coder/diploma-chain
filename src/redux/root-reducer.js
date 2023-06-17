import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import studentsProfileReducer from "./students-profile/students-profile.reducer";
import allProfilesReducer from "./all-profiles/all-profiles.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: userReducer,
  studentProfile: studentsProfileReducer,
  allProfiles: allProfilesReducer
});

export default persistReducer(persistConfig, rootReducer);