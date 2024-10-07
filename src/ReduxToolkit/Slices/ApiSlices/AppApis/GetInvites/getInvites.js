import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { bUrl } from "../../../../../Utils/BUrl/BUrl";
import { setAppStates } from "../../../StateSlices/AppStates/AppStatesSlice";

const initialState = {
    Invites: {
        data: [],
        status: 'idle',
        error: null,
        success: null
    }
};

export const GetInvites = createAsyncThunk(
    'getInviteSlice/getInvites',
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

            const response = await fetch(`${bUrl}/api/general/VizitrUserMyInvite/GetInvites`, {
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

const getInviteSlice = createSlice({
    name: 'getInviteSlice',
    initialState,
    reducers: {
        resetStatus(state) {
            state.Invites.status = 'idle';
            state.Invites.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetInvites.pending, (state) => {
                state.Invites.status = 'loading';
                state.Invites.error = null;
                state.Invites.data = [];
                // setAppStates({
                //     isLoading: true
                // })
            })
            .addCase(GetInvites.fulfilled, (state, action) => {
                state.Invites.status = 'succeeded';
                state.Invites.data = action.payload.Response.apiResponse;
                state.Invites.success = action.payload.Status;
                // console.log(action.payload, "getinVites");
               
                
            })
            .addCase(GetInvites.rejected, (state, action) => {
                state.Invites.status = 'failed';
                state.Invites.error = action.payload ? action.payload : action.error.message;
            });
    },
});

export const { resetStatus } = getInviteSlice.actions;
export default getInviteSlice.reducer;
