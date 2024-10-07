import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bUrl } from "../../../../../Utils/BUrl/BUrl";

const initialState = {
    whereImHost: {
        data: [],
        status: 'idle',
        error: null,
        success: null
    }
};

export const getWhereImHost = createAsyncThunk(
    'whereImHost/getWhereImHost', 
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

            const response = await fetch(`${bUrl}/api/general/VizitrUserProfile/GetHostLocationList`, {
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

const whereImHostSlice = createSlice({
    name: 'whereImHostSlice',
    initialState,
    reducers: {
        resetStatus(state) {
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWhereImHost.pending, (state) => {
                state.whereImHost.status = 'loading';
                state.whereImHost.error = null;
                state.whereImHost.data = [];
            })
            .addCase(getWhereImHost.fulfilled, (state, action) => {
                state.whereImHost.status = 'succeeded';
                state.whereImHost.data = action.payload.Response.apiResponse;
                state.whereImHost.success = action.payload.Status;
            })
            .addCase(getWhereImHost.rejected, (state, action) => {
                state.whereImHost.status = 'failed';
                state.whereImHost.error = action.payload ? action.payload : action.error.message;
                console.log(action.payload, 'whereImHost');
            });
    },
});

export const { resetStatus } = whereImHostSlice.actions;
export default whereImHostSlice.reducer;
