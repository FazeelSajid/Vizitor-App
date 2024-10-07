import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { bUrl } from "../../../../../Utils/BUrl/BUrl";

const initialState = {
    getPurposeListState: {
        data: null,
        status: 'idle',
        error: null,
        success: null
    }
};

export const GetPurposeList = createAsyncThunk(
    'getPurposeListSlice/getPurposeList',
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

        
            const response = await fetch(`${bUrl}/api/general/VizitrUserMyInvite/GetHostPurposeList`, {
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

const getPurposeListSlice = createSlice({
    name: 'getPurposeListSlice',
    initialState,
    reducers: {
        resetStatus(state) {
            state.getPurposeListState.status = 'idle';
            state.getPurposeListState.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetPurposeList.pending, (state) => {
                state.getPurposeListState.status = 'loading';
                state.getPurposeListState.error = null;
                state.getPurposeListState.data = null;
            })
            .addCase(GetPurposeList.fulfilled, (state, action) => {
                state.getPurposeListState.status = 'succeeded';
                state.getPurposeListState.data = action.payload.Response.apiResponse;
                state.getPurposeListState.success = action.payload.Status;
            })
            .addCase(GetPurposeList.rejected, (state, action) => {
                state.getPurposeListState.status = 'failed';
                state.getPurposeListState.error = action.payload ? action.payload : action.error.message;
            });
    },
});

export const { resetStatus } = getPurposeListSlice.actions;
export default getPurposeListSlice.reducer;
