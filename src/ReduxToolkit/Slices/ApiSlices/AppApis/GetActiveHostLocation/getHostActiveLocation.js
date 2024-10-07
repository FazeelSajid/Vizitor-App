import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bUrl } from "../../../../../Utils/BUrl/BUrl";

const initialState = {
    hostActiveLocation: {
        data: null,
        status: 'idle',
        error: null,
        success: null,
    }
};

export const fetchHostActiveLocation = createAsyncThunk(
    'hostActiveLocation/fetchHostActiveLocation',  
    async (authToken, { rejectWithValue }) => {
        try {
            const body = {
                IsPlatform: false,
                ClientId: "89248",
                OrgId: "65",
                RoleId: "66"
            };

            const headers = {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json"
            };

            const response = await fetch(`${bUrl}/api/general/VizitrUserMyInvite/GetHostActiveLocationList`, {
                method: 'POST',
                headers,
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.message || 'Failed to fetch host locations');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const hostActiveLocationSlice = createSlice({
    name: 'hostActiveLocation',
    initialState,
    reducers: {
        resetStatus(state) {
            state.hostActiveLocation.status = 'idle';
            state.hostActiveLocation.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHostActiveLocation.pending, (state) => {
                state.hostActiveLocation.status = 'loading';
                state.hostActiveLocation.error = null;
                state.hostActiveLocation.data = null;
            })
            .addCase(fetchHostActiveLocation.fulfilled, (state, action) => {
                state.hostActiveLocation.status = 'succeeded';
                state.hostActiveLocation.data = action.payload?.Response?.apiResponse || null;  
                state.hostActiveLocation.success = action.payload?.Status || null;
            })
            .addCase(fetchHostActiveLocation.rejected, (state, action) => {
                state.hostActiveLocation.status = 'failed';
                state.hostActiveLocation.error = action.payload || action.error.message;
                console.error(action.payload || action.error.message, 'fetchHostActiveLocation error');  
            });
    },
});

export const { resetStatus } = hostActiveLocationSlice.actions;

export default hostActiveLocationSlice.reducer;

