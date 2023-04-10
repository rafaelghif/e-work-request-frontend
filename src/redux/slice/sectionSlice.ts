import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface sectionState {
    id: string;
    name: string;
    level: number;
};

const initialState: sectionState = {
    id: "",
    name: "",
    level: 0,
};

const sectionSlice = createSlice({
    name: "section",
    initialState,
    reducers: {
        setSection: (state, action: PayloadAction<sectionState>) => {
            return state = action.payload;
        },
        clearSection: () => {
            return initialState;
        },
    },
});

export const { setSection, clearSection } = sectionSlice.actions;
export default sectionSlice.reducer;