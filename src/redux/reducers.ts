import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import departmentSlice from "./slice/departmentSlice";
import lineSlice from "./slice/lineSlice";
import loadingSlice from "./slice/loadingSlice";
import sectionSlice from "./slice/sectionSlice";
import userSlice from "./slice/userSlice";
import workRequestCountSlice from "./slice/workRequestCountSlice";
import workRequestReceiveCountSlice from "./slice/workRequestReceiveCountSlice";

const reducers = combineReducers({
    user: userSlice,
    department: departmentSlice,
    line: lineSlice,
    section: sectionSlice,
    auth: authSlice,
    loading: loadingSlice,
    workRequestCount: workRequestCountSlice,
    workRequestReceiveCount: workRequestReceiveCountSlice
});

export default reducers;