import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bUrl } from "../../../../../Utils/BUrl/BUrl";

const initialState = {
    hostLocation: {
        data: [],
        status: 'idle',
        error: null,
        success: null
    }
};

export const GetHostLocation = createAsyncThunk(
    'hostLocation/getHostLocation', 
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

            const response = await fetch(`${bUrl}/api/general/VizitrUserMyInvite/GetHostLocationList`, {
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

const HostLocationSlice = createSlice({
    name: 'HostLocationSlice',
    initialState,
    reducers: {
        resetStatus(state) {
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetHostLocation.pending, (state) => {
                state.hostLocation.status = 'loading';
                state.hostLocation.error = null;
                state.hostLocation.data = [];
            })
            .addCase(GetHostLocation.fulfilled, (state, action) => {
                state.hostLocation.status = 'succeeded';
                state.hostLocation.data = action.payload.Response.apiResponse;
                state.hostLocation.success = action.payload.Status;
            })
            .addCase(GetHostLocation.rejected, (state, action) => {
                state.hostLocation.status = 'failed';
                state.hostLocation.error = action.payload ? action.payload : action.error.message;
                console.log(action.payload, 'hostLocation');
            });
    },
});

export const { resetStatus } = HostLocationSlice.actions;
export default HostLocationSlice.reducer;
