import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type authState = boolean;

const initialState: authState = false

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<authState>) => {
            return state = action.payload;
        },
        clearAuth: () => {
            return initialState;
        }
    },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;