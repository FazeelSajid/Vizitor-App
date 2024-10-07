import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bUrl } from "../../../../../Utils/BUrl/BUrl";

const initialState = {
    profileDetails: {
        data: {} ,
        status: 'idle',
        error: null,
        success: null
    }
};

export const getprofileDetails = createAsyncThunk(
    'profileDetails/getprofileDetails', 
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

            const response = await fetch(`${bUrl}/api/general/VizitrUserProfile/Get`, {
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

const profileDetailsSlice = createSlice({
    name: 'profileDetailsSlice',
    initialState,
    reducers: {
        resetStatus(state) {
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getprofileDetails.pending, (state) => {
                state.profileDetails.status = 'loading';
                state.profileDetails.error = null;
                state.profileDetails.data = {};
            })
            .addCase(getprofileDetails.fulfilled, (state, action) => {
                state.profileDetails.status = 'succeeded';
            state.profileDetails.data = action.payload.Response.apiResponse[0];
                state.profileDetails.success = action.payload.Status;
            })
            .addCase(getprofileDetails.rejected, (state, action) => {
                state.profileDetails.status = 'failed';
                state.profileDetails.error = action.payload ? action.payload : action.error.message;
                console.log('profileDetails' ,action.payload);
            });
    },
});

export const { resetStatus } = profileDetailsSlice.actions;
export default profileDetailsSlice.reducer;
