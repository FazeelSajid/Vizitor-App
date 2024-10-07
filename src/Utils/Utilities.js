import NetInfo from '@react-native-community/netinfo';
// import RNFS from 'react-native-fs';

/**
 * Function to check network connectivity
 * @returns {Promise<boolean>} - Returns true if connected to the internet, false otherwise
 */
const checkNetworkConnectivity = () => {
  return NetInfo.fetch().then(state => state.isConnected);
};

/**
 * Function to execute an API call with a network check
 * @param {Function} apiCall - The API call to execute if the network is available
 * @param {Function} setNetworkErrorState - The function to set network error state in your component
 * @returns {Promise<void>} - Returns early if there's no network, otherwise executes the API call
 */
export const WithNetworkCheck = async (apiCall, setNetworkErrorState) => {
  setNetworkErrorState({isLoading: true});
  // console.log(apiCall);
  

  const isConnected = await checkNetworkConnectivity();

  if (!isConnected) {
    // Set network error state when not connected
    setNetworkErrorState({
      errorPop: true,
      isLoading: false,
      errorPopMsg: 'Please check your internet connection',
    });

    // Optionally hide the error after a timeout
    setTimeout(() => {
      setNetworkErrorState({errorPop: false});
    }, 5000);

    return; // Return early if network is not available
  }

  setNetworkErrorState({isLoading: false});
  await apiCall();
  // try {
  //   // Execute the API call when connected to the network
  //   await apiCall();

  //   // Reset network error state
  //   setNetworkErrorState({errorPop: false});
  // } catch (error) {
  //   console.error('Error executing API call:', error);
  //   // Optionally, you could set an error state here if needed.
  // }
};


// export const base64ToFile = async (base64, fileName) => {
//   try {
//       const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
//       await RNFS.writeFile(filePath, base64, 'base64');
//       return filePath;
//   } catch (error) {
//       console.error("Error writing base64 to file:", error);
//       throw new Error("Failed to convert base64 to file");
//   }
// };
