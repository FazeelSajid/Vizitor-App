import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { bUrl } from "../../../../../Utils/BUrl/BUrl";


const initialState = {
    windowTimeList: {
        data: null,
        status: 'idle',
        error: null,
        success: null
    }
};

export const GetWindowTimeList = createAsyncThunk(
    'WindowTimeList/getWindowTimeList', 
    async (authToken, { rejectWithValue }) => {
        try {
            const body = {
                "IsPlatform": false,
                "ClientId": "89248",
                "OrgId": "65",
                "RoleId": "66"
            };

            const headers = {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json"  
            };

            const response = await fetch(`${bUrl}/api/general/KeyValueApi/WindowTimeList`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body), 
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.message || 'Failed to fetch');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const WindowTimeListSlice = createSlice({
    name: 'WindowTimeListSlice',
    initialState,
    reducers: {
        resetStatus(state) {
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetWindowTimeList.pending, (state) => {
                state.windowTimeList.status = 'loading';
                state.windowTimeList.error = null;
                state.windowTimeList.data = null;
            })
            .addCase(GetWindowTimeList.fulfilled, (state, action) => {
                state.windowTimeList.status = 'succeeded';
                state.windowTimeList.data = action.payload.Response.apiResponse;
                state.windowTimeList.success = action.payload.Status;
            })
            .addCase(GetWindowTimeList.rejected, (state, action) => {
                state.windowTimeList.status = 'failed';
                state.windowTimeList.error = action.payload ? action.payload : action.error.message;
                console.log(action.payload, 'WindowTimeList');
            });
    },
});

export const { resetStatus } = WindowTimeListSlice.actions;
export default WindowTimeListSlice.reducer;
