import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bUrl } from "../../../../../Utils/BUrl/BUrl";

const initialState = {
    addVisitState: {
        data: null,
        status: 'idle',
        error: null,
        success: null,
        IsCreated: false
    }
};

// Assuming you need a POST request
export const AddVisit = createAsyncThunk(
    'AddVisitSlice',
    async (data, { rejectWithValue }) => {
        // console.log(data, 'config Body');  // Check if authToken and data are correctly retrieved

        try {
            const body = {
                "Data": {
                    "PurposeID": data.purpose,
                    "ExpectedCheckIn": data.timeFrom,
                    "Title": data.title,
                    "ExpectedCheckOut": data.timeTo,
                    "BranchID": data.branch,
                    "WindowTime": data.arrivalWindow,
                    "DateCheckIn": data.dateFrom,
                    "DateCheckOut":data.dateTo,
                    "EmailId": data.email
                },
                "IsPlatform": false,
                "ClientId": "89248",
                "OrgId": "65",
                "RoleId": "66"
            };

            const headers = {
                Authorization: `Bearer ${data.authToken}`,
                "Content-Type": "application/json"  // Ensure JSON content type
            };

            // Perform the POST request using fetch
            const response = await fetch(`${bUrl}/api/general/VizitrUserMyInvite/AddVisit`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body),  // Convert body to JSON string
            });

            // Check if the response is successful (status in the 200 range)
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.message || 'Failed to add visit');
            }

            // Parse response JSON
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const AddVisitSlice = createSlice({
    name: 'AddVisitSlice',
    initialState,
    reducers: {
        resetStatus(state) {
            state.addVisitState.status = 'idle';
            state.addVisitState.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(AddVisit.pending, (state) => {
                state.addVisitState.status = 'loading';
                state.addVisitState.error = null;
                state.addVisitState.data = null;
            })
            .addCase(AddVisit.fulfilled, (state, action) => {
                state.addVisitState.status = 'succeeded';
                state.addVisitState.data = action.payload.Response.apiResponse
                state.addVisitState.IsCreated = action.payload.Response.apiResponse.IsCreated;
                state.addVisitState.success = action.payload.Status;
                // console.log(action.payload.Response.apiResponse, 'addVisitState');
            })
            .addCase(AddVisit.rejected, (state, action) => {
                state.addVisitState.status = 'failed';
                state.addVisitState.error = action.payload ? action.payload : action.error.message;
                console.log(action, 'addVisitState error');
            });
    },
});

export const { resetStatus } = AddVisitSlice.actions;
export default AddVisitSlice.reducer;
