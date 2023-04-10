import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWorkRequestReceiveCountService } from "../../services/work-request-service";

interface WorkRequestReceiveCount {
    data: number;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: WorkRequestReceiveCount = {
    data: 0,
    status: "idle",
    error: null
}

const fetchWorkRequestReceiveCount = createAsyncThunk("workRequestReceiveCount/fetchWorkRequestReceiveCount",
    async () => {
        const response = await getWorkRequestReceiveCountService();
        return response.data;
    }
);

export const workRequestReceiveCountSlice = createSlice({
    name: "workRequestReceiveCount",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkRequestReceiveCount.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchWorkRequestReceiveCount.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchWorkRequestReceiveCount.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Something went wrong";
            });
    },
});

export { fetchWorkRequestReceiveCount };
export default workRequestReceiveCountSlice.reducer;