import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
    id: string;
    badgeId: string;
    name: string;
    email: string;
    role: string;
};

const initialState: userState = {
    id: "",
    badgeId: "",
    name: "",
    email: "",
    role: ""
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<userState>) => {
            return state = action.payload;
        },
        clearUser: () => {
            return initialState;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;