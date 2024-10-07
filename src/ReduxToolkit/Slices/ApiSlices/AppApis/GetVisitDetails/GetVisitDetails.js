import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { bUrl } from "../../../../../Utils/BUrl/BUrl";


const initialState = {
    visitDetails: {
        data: null,
        status: 'idle',
        error: null,
        success: null
    }
};

export const GetVisitDetail = createAsyncThunk(
    'GetVisitDetailSlice/GetVisitDetail', 
    async (userData, { rejectWithValue }) => {
        try {
            const body = {
                "Data": {
                    "VisitID": userData.VisitId
                },
                "IsPlatform": false,
                "ClientId": "89248",
                "OrgId": "65",
                "RoleId": "66"
            }

            const headers = {
                "Authorization": `Bearer ${userData.authToken}`,
                "Content-Type": "application/json"  
            };

            const response = await fetch(`${bUrl}/api/general/VizitrUserMyVisit/GetVisitDetails`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body), 
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log(response, 'response error');
                
                throw new Error(errorData?.message || 'Failed to fetch');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const GetVisitDetailSlice = createSlice({
    name: 'GetVisitDetailSlice',
    initialState,
    reducers: {
        resetStatus(state) {
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetVisitDetail.pending, (state) => {
                state.visitDetails.status = 'loading';
                state.visitDetails.error = null;
                state.visitDetails.data = null;
            })
            .addCase(GetVisitDetail.fulfilled, (state, action) => {
                state.visitDetails.status = 'succeeded';
                state.visitDetails.data = action.payload.Response.apiResponse[0];
                state.visitDetails.success = action.payload.Status;
                // console.log(action.payload.Response, 'visitDetails');
                
            })
            .addCase(GetVisitDetail.rejected, (state, action) => {
                state.visitDetails.status = 'failed';
                state.visitDetails.error = action.payload ? action.payload : action.error.message;
                console.log(action.payload, 'visitDetails');
            });
    },
});

export const { resetStatus } = GetVisitDetailSlice.actions;
export default GetVisitDetailSlice.reducer;
