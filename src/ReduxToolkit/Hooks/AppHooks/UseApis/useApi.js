// import { useDispatch, useSelector } from 'react-redux';
// import { GetHostLocation } from '../../../Slices/ApiSlices/AppApis/GetHostLocation/getHostLocation';
// import { fetchHostActiveLocation } from '../../../Slices/ApiSlices/AppApis/GetActiveHostLocation/getHostActiveLocation';
// import { GetWindowTimeList } from '../../../Slices/ApiSlices/AppApis/GetWindowTimeLocation/getWindowTimeList';
// import { GetInvites } from '../../../Slices/ApiSlices/AppApis/GetInvites/getInvites';
// import { GetConfiguration } from '../../../Slices/ApiSlices/AppApis/GetConfiguration/getConfiguration';
// import { GetPurposeList } from '../../../Slices/ApiSlices/AppApis/GetPurposeList/getPurposeList';
// import { AddVisit } from '../../../Slices/ApiSlices/AppApis/AddVisits/addVisit';
// import { GetHostInvitedLocation } from '../../../Slices/ApiSlices/AppApis/GetHostInvitedLocationList/getHostInvitedLocation';
// import { getVisit } from '../../../Slices/ApiSlices/AppApis/GetVisits/GetVisits';
// import { GetVisitDetail } from '../../../Slices/ApiSlices/AppApis/GetVisitDetails/GetVisitDetails';
// import { getWhereImHost } from '../../../Slices/ApiSlices/AppApis/getWhereImhost/getWhereImhost';
// import { getprofileDetails } from '../../../Slices/ApiSlices/AppApis/getProfileDetails/getProfileDetails';
import useAppStates from '../useAppStates/useAppStates';
import { bUrl } from '../../../../Utils/BUrl/BUrl';

const useApis = () => {

  const { PersistedAuth } = useAppStates();

  // const getHostLocation = authToken => {
  //   dispatch(GetHostLocation(PersistedAuth.authToken));
  // };
  // const getHostInvitedLocation = (authToken) => {
  //   dispatch(GetHostInvitedLocation(authToken));
  // };
  // const getHostActiveLocation = authToken => {
  //   dispatch(fetchHostActiveLocation(authToken));
  // };
  // const getWindowTimeList = authToken => {
  //   dispatch(GetWindowTimeList(authToken));
  // };

  // const getInvites = body => {
  //   dispatch(GetInvites(body));
  // };

  // const getConfiguration = body => {
  //   dispatch(GetConfiguration(body));
  // };

  // const addVisit = body => {
  //   dispatch(AddVisit(body));
  // };

  // const getPurposeList = body => {
  //   dispatch(GetPurposeList(body));
  // };

  // const getVisits = body => {
  //   dispatch(getVisit(body));
  // };
  // const getVisitDetails = body => {
  //   dispatch(GetVisitDetail(body));
  // };

  // const getWhereIamHost = body => {
  //   dispatch(getWhereImHost(body));
  // };
  // const getProfileDetails = body => {
  //   dispatch(getprofileDetails(body));
  // };

  // const editProfile = async (body, authToken, setState) => {
  //   const request = `${bUrl}/api/common/VizitrUserProfile/Edit`;

  //   try {
  //     const response = await fetch(request, {
  //       method: 'POST',
  //       headers: {
  //         "Authorization": `Bearer ${authToken}`,
  //         'Content-Type': 'multipart/form-data',
  //       },
  //       body: body,
  //     });

  //     // Check if the response is OK (status code 200 or 201)
  //     if (response.status === 200) {
  //       // Successfully processed request
  //       const jsonResponse = await response.json();
  //       return jsonResponse;
  //     } else if (response.status === 400) {
  //       const errorData = await response.json();

  //       setState({
  //         isLoading: false,
  //         errorPop: true,
  //         errorPopMsg: `Bad Request: ${errorData.message || 'Invalid data sent.'}`,
  //       });
  //     } else if (response.status === 401) {
  //       // Unauthorized - invalid or missing token
  //       setState({
  //         isLoading: false,
  //         errorPop: true,
  //         errorPopMsg: 'Unauthorized: Invalid or missing token.'
  //       });
  //       throw new Error('Unauthorized: Invalid or missing token.');
  //     } else if (response.status === 403) {
  //       setState({
  //         isLoading: false,
  //         errorPop: true,
  //         errorPopMsg: 'Forbidden: You do not have permission to perform this action.'
  //       });
  //       // Forbidden - you do not have permission
  //       // throw new Error('Forbidden: You do not have permission to perform this action.');
  //     } else if (response.status === 404) {
  //       setState({
  //         isLoading: false,
  //         errorPop: true,
  //         errorPopMsg: 'Not Found: The requested resource was not found.'
  //       });
  //       // Not Found - invalid URL
  //       // throw new Error('Not Found: The requested resource was not found.');
  //     } else if (response.status === 500) {
  //       setState({
  //         isLoading: false,
  //         errorPop: true,
  //         errorPopMsg: 'Server Error: An error occurred on the server.'
  //       });
  //       // Internal Server Error - server-side error
  //       // throw new Error('Server Error: An error occurred on the server.');
  //     } else {
  //       setState({
  //         isLoading: false,
  //         errorPop: true,
  //         errorPopMsg: `Unexpected error: ${response.statusText}`
  //       });
  //       // Handle other status codes
  //       // throw new Error(`Unexpected error: ${response.statusText}`);
  //     }
  //   } catch (error) {
  //     setState({
  //       isLoading: false,
  //       errorPop: true,
  //       errorPopMsg: `Error during fetch request:', ${error.message}`
  //     });
  //     // Catch network errors or any unexpected issues
  //     // console.error('Error during fetch request:', error.message);
  //     throw error;  // Rethrow the error to be handled elsewhere (if needed)
  //   }
  // };

  // const editSelfieCamera = async (body, setState) => {
  //   const request = `${bUrl}/api/common/VizitrUserProfile/ProfilePictureSave`;

  //   const payload = {
  //     "Data": {
  //       "SelfieCaptured": body.Selfie
  //     },
  //     "ClientId": "89248",
  //     "OrgId": "65",
  //     "RoleId": "66",
  //     "IsPlatform": false
  //   }

  //   const formData = new FormData();
  //   formData.append('Request', JSON.stringify(payload))
  //   try {


  //     const response = await fetch(request, {
  //       method: 'POST',
  //       headers: {
  //         "Authorization": `Bearer ${body.authToken}`,
  //         'Content-Type': 'multipart/form-data',
  //       },
  //       body: formData,

  //     });
  //     // Check if the response is OK (status code 200 or 201)
  //     if (response.status === 200) {
  //       // Successfully processed request
  //       const jsonResponse = await response.json();
  //       return jsonResponse;
  //     } else if (response.status === 400) {
  //       const errorData = await response.json();

  //       setState({
  //         isLoading: false,
  //         errorPop: true,
  //         errorPopMsg: `Bad Request: ${errorData.message || 'Invalid data sent.'}`,
  //       });
  //     } else if (response.status === 401) {
  //       // Unauthorized - invalid or missing token
  //       setState({
  //         isLoading: false,
  //         errorPop: true,
  //         errorPopMsg: 'Unauthorized: Invalid or missing token.'
  //       });
  //       throw new Error('Unauthorized: Invalid or missing token.');
  //     } else if (response.status === 403) {
  //       setState({
  //         isLoading: false,
  //         errorPop: true,
  //         errorPopMsg: 'Forbidden: You do not have permission to perform this action.'
  //       });
  //       // Forbidden - you do not have permission
  //       // throw new Error('Forbidden: You do not have permission to perform this action.');
  //     } else if (response.status === 404) {
  //       setState({
  //         isLoading: false,
  //         errorPop: true,
  //         errorPopMsg: 'Not Found: The requested resource was not found.'
  //       });
  //       // Not Found - invalid URL
  //       // throw new Error('Not Found: The requested resource was not found.');
  //     } else if (response.status === 500) {
  //       setState({
  //         isLoading: false,
  //         errorPop: true,
  //         errorPopMsg: 'Server Error: An error occurred on the server.'
  //       });
  //       // Internal Server Error - server-side error
  //       // throw new Error('Server Error: An error occurred on the server.');
  //     } else {
  //       setState({
  //         isLoading: false,
  //         errorPop: true,
  //         errorPopMsg: `Unexpected error: ${response.statusText}`
  //       });
  //       // Handle other status codes
  //       // throw new Error(`Unexpected error: ${response.statusText}`);
  //     }
  //   } catch (error) {
  //     setState({
  //       isLoading: false,
  //       errorPop: true,
  //       errorPopMsg: `Error during fetch request:', ${error.message}`
  //     });
  //     // Catch network errors or any unexpected issues
  //     // console.error('Error during fetch request:', error.message);
  //     throw error;  // Rethrow the error to be handled elsewhere (if needed)
  //   }
  // };

  // const editSelfieGallery = async (body, setState) => {
  //   const request = `${bUrl}/api/common/VizitrUserProfile/ProfilePictureSave`;

  //   const payload = {
  //     "Data": {
  //       "SelfieCaptured": ""
  //     },
  //     "ClientId": "89248",
  //     "OrgId": "65",
  //     "RoleId": "66",
  //     "IsPlatform": false
  //   }
  //   const formData = new FormData();

  //   formData.append('IdFile', {
  //     uri: body.Selfie,
  //     type: 'image/jpeg',
  //     name: 'id.jpg',
  //   })




  //   formData.append('Request', JSON.stringify(payload))


  //   try {


  //     const response = await fetch(request, {
  //       method: 'POST',
  //       headers: {
  //         "Authorization": `Bearer ${body.authToken}`,
  //         'Content-Type': 'multipart/form-data', // Optional, can be removed
  //       },
  //       body: formData,
  //     });


  //     // Check if the response is OK (status code 200 or 201)
  //     if (response.status === 200) {
  //       // Successfully processed request
  //       const jsonResponse = await response.json();
  //       return jsonResponse;
  //     } else if (response.status === 400) {
  //       const errorData = await response.json();

  //       setState({
  //         isLoading: false,
  //         errorPop: true,
  //         errorPopMsg: `Bad Request: ${errorData.message || 'Invalid data sent.'}`,
  //       });
  //     } else if (response.status === 401) {
  //       // Unauthorized - invalid or missing token
  //       setState({
  //         isLoading: false,
  //         errorPop: true,
  //         errorPopMsg: 'Unauthorized: Invalid or missing token.'
  //       });
  //       throw new Error('Unauthorized: Invalid or missing token.');
  //     } else if (response.status === 403) {
  //       setState({
  //         isLoading: false,
  //         errorPop: true,
  //         errorPopMsg: 'Forbidden: You do not have permission to perform this action.'
  //       });
  //       // Forbidden - you do not have permission
  //       // throw new Error('Forbidden: You do not have permission to perform this action.');
  //     } else if (response.status === 404) {
  //       setState({
  //         isLoading: false,
  //         errorPop: true,
  //         errorPopMsg: 'Not Found: The requested resource was not found.'
  //       });
  //       // Not Found - invalid URL
  //       // throw new Error('Not Found: The requested resource was not found.');
  //     } else if (response.status === 500) {
  //       setState({
  //         isLoading: false,
  //         errorPop: true,
  //         errorPopMsg: 'Server Error: An error occurred on the server.'
  //       });
  //       // Internal Server Error - server-side error
  //       // throw new Error('Server Error: An error occurred on the server.');
  //     } else {
  //       setState({
  //         isLoading: false,
  //         errorPop: true,
  //         errorPopMsg: `Unexpected error: ${response.statusText}`
  //       });
  //       // Handle other status codes
  //       // throw new Error(`Unexpected error: ${response.statusText}`);
  //     }
  //   } catch (error) {
  //     setState({
  //       isLoading: false,
  //       errorPop: true,
  //       errorPopMsg: `Error during fetch request:', ${error.message}`
  //     });
  //     // Catch network errors or any unexpected issues
  //     // console.error('Error during fetch request:', error.message);
  //     throw error;  // Rethrow the error to be handled elsewhere (if needed)
  //   }
  // };


  const fetchApis = async (endPoint, header, payload, setState) => {
    const request = `${bUrl}${endPoint}`;


    console.log('Fetching apis...');
    




    try {
      const response = await fetch(request, {
        method: 'POST',
        headers: header,
        body: payload  // Convert payload to JSON string
      });
      // console.log('Fetched apis...', response);
      // Check if the response is OK (status code 200 or 201)
      if (response.status === 200) {
        
        // Successfully processed request
        const jsonResponse = await response.json();
        // console.log(jsonResponse.Response.apiResponse, 'jsonResponse');

        return jsonResponse;
      } else if (response.status === 400) {
        const errorData = await response.json();

        setState({
          isLoading: false,
          errorPop: true,
          errorPopMsg: `Bad Request: ${errorData.message || 'Invalid data sent.'}`,
        });
        console.log( errorData.message);
        
      } else if (response.status === 401) {
        // Unauthorized - invalid or missing token
        setState({
          isLoading: false,
          errorPop: true,
          errorPopMsg: 'Unauthorized: Invalid or missing token.'
        });
        console.log('fetchapi func, Unauthorized: Invalid or missing token');
        
        throw new Error('Unauthorized: Invalid or missing token.');
      } else if (response.status === 403) {
        setState({
          isLoading: false,
          errorPop: true,
          errorPopMsg: 'Forbidden: You do not have permission to perform this action.'
        });
        console.log('fetchapi func, Forbidden: You do not have permission to perform this action.' )
        
        // Forbidden - you do not have permission
        // throw new Error('Forbidden: You do not have permission to perform this action.');
      } else if (response.status === 404) {
        setState({
          isLoading: false,
          errorPop: true,
          errorPopMsg: 'Not Found: The requested resource was not found.'
        });
        console.log('fetchapi func, Not Found: The requested resource was not found.');
        
        // Not Found - invalid URL
        // throw new Error('Not Found: The requested resource was not found.');
      } else if (response.status === 500) {
        setState({
          isLoading: false,
          errorPop: true,
          errorPopMsg: 'Server Error: An error occurred on the server.'
        });
        console.log('Server Error: An error occurred on the server.');
        
        // Internal Server Error - server-side error
        // throw new Error('Server Error: An error occurred on the server.');
      } else {
        setState({
          isLoading: false,
          errorPop: true,
          errorPopMsg: `Unexpected error: ${response.statusText}`
        });
        // Handle other status codes
        // throw new Error(`Unexpected error: ${response.statusText}`);
        console.log(`Unexpected error: ${response.statusText}`);
        
      }

      setTimeout(() => {
        setState({
          isLoading: false,
          errorPop: false,
          errorPopMsg: ``
        });
      }, 1000);

    } catch (error) {
      console.log(error instanceof TypeError);

      if (error instanceof TypeError  && error.TypeError === 'Network request failed') {
      console.log(error, 'error');

        setState({
          isLoading: false,
          errorPop: true,
          errorPopMsg: `Please check your internet connection.`
        });
        setTimeout(() => {
          setState({
            isLoading: false,
            errorPop: false,
            errorPopMsg: ``
          });
        }, 1000);
        return
      }


    }
    //   // Check if the response is OK (status code 200 or 201)
    //   if (response.status === 200) {
    //     // Successfully processed request
    //     const jsonResponse = await response.json();
    //     return jsonResponse;
    //   } else if (response.status === 400) {
    //     // Bad Request - client-side error
    //     const errorData = await response.json();
    //     throw new Error(`Bad Request: ${errorData.message || 'Invalid data sent.'}`);
    //   } else if (response.status === 401) {
    //     // Unauthorized - invalid or missing token
    //     throw new Error('Unauthorized: Invalid or missing token.');
    //   } else if (response.status === 403) {
    //     // Forbidden - you do not have permission
    //     throw new Error('Forbidden: You do not have permission to perform this action.');
    //   } else if (response.status === 404) {
    //     // Not Found - invalid URL
    //     throw new Error('Not Found: The requested resource was not found.');
    //   } else if (response.status === 500) {
    //     // Internal Server Error - server-side error
    //     throw new Error('Server Error: An error occurred on the server.');
    //   } else {
    //     // Handle other status codes
    //     throw new Error(`Unexpected error: ${response.statusText}`);
    //   }
    // } catch (error) {
    //   // Catch network errors or any unexpected issues
    //   console.error('Error during fetch request:', error.message);
    //   throw error;  // Rethrow the error to be handled elsewhere (if needed)
    // }
  };


  // const getHostInvitedLocation = async authToken => {
  //   const requestUrl = `${bUrl}/api/general/VizitrUserMyVisit/GetHostInvitedLocationList`;

  //   try {
  //     const body = {
  //       IsPlatform: false,
  //       ClientId: '89248',
  //       OrgId: '65',
  //       RoleId: '66',
  //     };

  //     const headers = {
  //       Authorization: `Bearer ${authToken}`,
  //       'Content-Type': 'application/json',
  //     };
  //     const response = await fetch(requestUrl, {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(body),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       // response.ok is true for status codes in the range 200-299
  //       return data;
  //     } else {
  //       // Handle errors if the response is not successful
  //       console.error('Error: ', data);
  //       return null;
  //     }
  //   } catch (err) {
  //     console.error('Check Error exist or not', err);
  //     throw err;
  //   }
  // };

  // const hostLocation = useSelector(state => state.getHostLocation.hostLocation);
  // const hostInvitedLocation = useSelector(
  //   state => state.getHostInvitedLocation.hostLocation,
  // );
  // const hostActiveLocation = useSelector(
  //   state => state.getHostActiveLocation.hostActiveLocation,
  // );
  // const windowTimeList = useSelector(
  //   state => state.getWindowTimeList.windowTimeList,
  // );
  // const invites = useSelector(state => state.getInvites.Invites);
  // const getConfigurationState = useSelector(
  //   state => state.getConfiguration.getConfigState,
  // );
  // const getPurposeListState = useSelector(
  //   state => state.getPurposeList.getPurposeListState,
  // );
  // const addVisitState = useSelector(state => state.addVisit.addVisitState);
  // const getVisitsState = useSelector(state => state.GetVisits.Visits);
  // const visitDetails = useSelector(state => state.GetVisitDetails.visitDetails);
  // const whereImHost = useSelector(state => state.getWhereImhost.whereImHost)
  // const ProfileDetails = useSelector(state => state.getProfileDetails.profileDetails)


  return {
    // getHostLocation,
    // hostLocation,
    // getHostActiveLocation,
    // hostActiveLocation,
    // getWindowTimeList,
    // windowTimeList,
    // getInvites,
    // invites,
    // getConfiguration,
    // getConfigurationState,
    // getPurposeList,
    // getPurposeListState,
    // addVisit,
    // addVisitState,
    // getHostInvitedLocation,
    // hostInvitedLocation,
    // getVisits,
    // getVisitsState,
    // getVisitDetails,
    // visitDetails,
    // getWhereIamHost,
    // whereImHost,
    // getProfileDetails,
    // ProfileDetails,
    // editProfile,
    // editSelfieGallery,
    // editSelfieCamera,
    fetchApis,

  };
};

export default useApis;
