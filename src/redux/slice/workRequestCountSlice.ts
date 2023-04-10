import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorToast } from "../../services/toast-service";
import { getWorkRequestCountService } from "../../services/work-request-service";

interface WorkRequestCount {
    data: number;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: WorkRequestCount = {
    data: 0,
    status: "idle",
    error: null
}

const fetchWorkRequestCount = createAsyncThunk("workRequestCount/fetchWorkRequestCount", async () => {
    try {
        const response = await getWorkRequestCountService();
        return response.data;
    } catch (err) {
        await errorToast(err);
        return 0;
    }
});

export const workRequestCountSlice = createSlice({
    name: "workRequestCount",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkRequestCount.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchWorkRequestCount.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchWorkRequestCount.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Something went wrong";
            });
    },
});

export { fetchWorkRequestCount };
export default workRequestCountSlice.reducer;