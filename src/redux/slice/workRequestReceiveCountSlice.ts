import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorToast } from "../../services/toast-service";
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

const fetchWorkRequestReceiveCount = createAsyncThunk("workRequestReceiveCount/fetchWorkRequestReceiveCount", async () => {
    try {
        const response = await getWorkRequestReceiveCountService();
        return response.data;
    } catch (err) {
        await errorToast(err);
        return 0;
    }
});

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