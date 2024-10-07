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

export const GetHostInvitedLocation = createAsyncThunk(
    'hostLocation/getHostInvitedLocation',  
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

         
            const response = await fetch(`${bUrl}/api/general/VizitrUserMyVisit/GetHostInvitedLocationList`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body),  
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.message || 'Failed to fetch data');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            if (error.message === "Failed to fetch") {
                return rejectWithValue("Network error or CORS issue. Check your network and API settings.");
            }
            return rejectWithValue(error.message);
        }
    }
);

const getHostInvitedLocationSlice = createSlice({
    name: 'getHostInvitedLocationSlice',
    initialState,
    reducers: {
        resetStatus(state) {
            state.hostLocation.status = 'idle';
            state.hostLocation.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetHostInvitedLocation.pending, (state) => {
                state.hostLocation.status = 'loading';
                state.hostLocation.error = null;
                state.hostLocation.data = [];
            })
            .addCase(GetHostInvitedLocation.fulfilled, (state, action) => {
                state.hostLocation.status = 'succeeded';
                state.hostLocation.data = action.payload.Response.apiResponse;
                state.hostLocation.success = action.payload.Status;
                // console.log(action.payload);
                
            })
            .addCase(GetHostInvitedLocation.rejected, (state, action) => {
                state.hostLocation.status = 'failed';
                state.hostLocation.error = action.payload || action.error.message;
                // console.log(action.payload, 'hostinvitedLocation error');
            });
    },
});

export const { resetStatus } = getHostInvitedLocationSlice.actions;
export default getHostInvitedLocationSlice.reducer;
