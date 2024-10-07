// import { useDispatch, useSelector } from "react-redux";
// import { UserExistOrnot, resetUserExistOrNotStatus } from "../../../Slices/ApiSlices/AuthApis/UserExistOrNotSlice/UserExistOrNotSlice";
// import { signin , resetSigninStatus} from "../../../Slices/ApiSlices/AuthApis/SignInSlice/SignInSlice";
// import { signup, resetSignupStatus } from "../../../Slices/ApiSlices/AuthApis/SignUpSlice/SignUpSlice";
import { bUrl } from "../../../../Utils/BUrl/BUrl";



const useAuthApis = () => {


const authFunc = async ( endPoint,header,payload, setState) => {
    // console.log(payload, 'payload');



    
    const request = `${bUrl}${endPoint}`;
    try {
        const response = await fetch(request, {
            method: 'POST',
            headers: header,
            body: payload,
        });

        // Check if the response is OK (status code 200 or 201)
        if (response.status === 200) {
            // Successfully processed request
            const jsonResponse = await response.json();
            return jsonResponse;
          } 
          else if (response.status === 400) {
            const errorData = await response.json();
    
            setState({
              isLoading: false,
              errorPop: true,
              errorPopMsg: `Please check your email and password`,
            });

            console.log(errorData, 'error');
            
          } 
          else if (response.status === 401) {
            // Unauthorized - invalid or missing token
            setState({
              isLoading: false,
              errorPop: true,
              errorPopMsg: 'Unauthorized: Invalid or missing token.'
            });
            // throw new Error('Unauthorized: Invalid or missing token.');
          } else if (response.status === 403) {
            setState({
              isLoading: false,
              errorPop: true,
              errorPopMsg: 'Forbidden: You do not have permission to perform this action.'
            });
            // Forbidden - you do not have permission
            // throw new Error('Forbidden: You do not have permission to perform this action.');
          } else if (response.status === 404) {
            setState({
              isLoading: false,
              errorPop: true,
              errorPopMsg: 'Not Found: The requested resource was not found.'
            });
            // Not Found - invalid URL
            // throw new Error('Not Found: The requested resource was not found.');
          } else if (response.status === 500) {
            setState({
              isLoading: false,
              errorPop: true,
              errorPopMsg:  'Server error, please try again later'
            });
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
          }


          setTimeout(() => {
            setState({
                isLoading: false,
                errorPop: false,
                errorPopMsg: ``
              });
          }, 1000);

        } catch (error) {
            // Check if it's a network-related error (no internet)
            // if (error instanceof TypeError && error.message === 'Failed to fetch') {
            //     setState({
            //         isLoading: false,
            //         errorPop: true,
            //         errorPopMsg: `No internet connection. Please check your network.`
            //       });
            //       setTimeout(() => {
            //         setState({
            //             isLoading: false,
            //             errorPop: false,
            //             errorPopMsg: ``
            //           });
            //       }, 1000);
            //       return
            // }

            // console.log(error instanceof TypeError);
            // console.log(error )
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
            
            // setState({
            //     isLoading: false,
            //     errorPop: true,
            //     errorPopMsg: `Error during fetch request:', ${error.message}`
            //   });
            // // Other errors (like parsing, bad requests, etc.)
            // console.error('Error during fetch request:', error.message);
            // throw error;  // Rethrow the error to be handled elsewhere
          }
};


  return {

    authFunc,

  }
}

export default useAuthApis

