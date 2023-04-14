import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWorkTicketRequestCountService } from "../../services/work-request-service";

interface ticketRequestCount {
    data: number;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ticketRequestCount = {
    data: 0,
    status: "idle",
    error: null
}

const fetchTicketRequestCount = createAsyncThunk("ticketRequestCountSlice/fetchTicketRequestCountSlice",
    async () => {
        const response = await getWorkTicketRequestCountService();
        return response.data;
    }
);

export const ticketRequestCountSlice = createSlice({
    name: "ticketRequestCount",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTicketRequestCount.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTicketRequestCount.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchTicketRequestCount.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Something went wrong";
            });
    },
});

export { fetchTicketRequestCount };
export default ticketRequestCountSlice.reducer;