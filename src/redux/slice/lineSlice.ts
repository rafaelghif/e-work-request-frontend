import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface lineState {
    id: string;
    name: string;
};

const initialState: lineState = {
    id: "",
    name: "",
};

const lineSlice = createSlice({
    name: "line",
    initialState,
    reducers: {
        setLine: (state, action: PayloadAction<lineState>) => {
            return state = action.payload;
        },
        clearLine: () => {
            return initialState;
        },
    },
});

export const { setLine, clearLine } = lineSlice.actions;
export default lineSlice.reducer;