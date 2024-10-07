import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bUrl } from "../../../../../Utils/BUrl/BUrl";
import { setAppStates } from "../../../StateSlices/AppStates/AppStatesSlice";



const initialState = {
    Visits: {
        data: [],
        status: 'idle',
        error: null,
        success: null
    }
};

export const getVisit = createAsyncThunk(
    'getVisitslice/getVisits',
    async (data, { rejectWithValue }) => {
        // console.log(data, 'GetVisits Body'); 

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

            const response = await fetch(`${bUrl}/api/general/VizitrUserMyVisit/GetVisit`, {
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

const getVisitSlice = createSlice({
    name: 'getVisitslice',
    initialState,
    reducers: {
        resetStatus(state) {
            state.Visits.status = 'idle';
            state.Visits.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getVisit.pending, (state) => {
                state.Visits.status = 'loading';
                state.Visits.error = null;
                state.Visits.data = [];
                // setAppStates({
                //     isLoading: true
                // })
            })
            .addCase(getVisit.fulfilled, (state, action) => {
                state.Visits.status = 'succeeded';
                state.Visits.data = action.payload.Response.apiResponse;
                state.Visits.success = action.payload.Status;
                // setAppStates({
                //     isLoading: false
                // })
            })
            .addCase(getVisit.rejected, (state, action) => {
                state.Visits.status = 'failed';
                state.Visits.error = action.payload ? action.payload : action.error.message;
                console.log(action.payload, 'Visits error');
            });
    },
});

export const { resetStatus } = getVisitSlice.actions;
export default getVisitSlice.reducer;
