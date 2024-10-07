import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bUrl } from "../../../../../Utils/BUrl/BUrl";

const initialState = {
    getConfigState: {
        data: null,
        status: 'idle',
        error: null,
        success: null
    }
};

export const GetConfiguration = createAsyncThunk(
    'getConfigurationSlice',  
    async (data, { rejectWithValue }) => {

        try {
            const body = {
                "Data": {
                    "BranchID": data.BranchID
                },
                "DataObj": {},
                "DataInt": {},
                "DataFloat": {},
                "IsPlatform": false,
                "ClientId": "89248",
                "OrgId": "65",
                "RoleId": "66"
            };

            const headers = {
                "Authorization": `Bearer ${data.authToken}`,
                "Content-Type": "application/json"  
            };

            const response = await fetch(`${bUrl}/api/general/VizitrUserMyInvite/GetConfiguration`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body), 
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.message || 'Failed to fetch');
            }


            const responseData = await response.json();
            return responseData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const getConfigurationSlice = createSlice({
    name: 'getConfigurationSlice',
    initialState,
    reducers: {
        resetStatus(state) {
            state.getConfigState.status = 'idle';
            state.getConfigState.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetConfiguration.pending, (state) => {
                state.getConfigState.status = 'loading';
                state.getConfigState.error = null;
                state.getConfigState.data = null;
            })
            .addCase(GetConfiguration.fulfilled, (state, action) => {
                state.getConfigState.status = 'succeeded';
                state.getConfigState.data = action.payload.Response.apiResponse[0];
                state.getConfigState.success = action.payload.Status;
            })
            .addCase(GetConfiguration.rejected, (state, action) => {
                state.getConfigState.status = 'failed';
                state.getConfigState.error = action.payload ? action.payload : action.error.message;
            });
    },
});

export const { resetStatus } = getConfigurationSlice.actions;
export default getConfigurationSlice.reducer;
