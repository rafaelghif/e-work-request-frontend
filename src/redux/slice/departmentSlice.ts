import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface departmentState {
    id: string;
    name: string;
    abbreviation: string;
};

const initialState: departmentState = {
    id: "",
    name: "",
    abbreviation: "",
};

const departmentSlice = createSlice({
    name: "department",
    initialState,
    reducers: {
        setDepartment: (state, action: PayloadAction<departmentState>) => {
            return state = action.payload;
        },
        clearDepartment: () => {
            return initialState;
        },
    },
});

export const { setDepartment, clearDepartment } = departmentSlice.actions;
export default departmentSlice.reducer;