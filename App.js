import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store, {persistor} from './src/ReduxToolkit/Store/Store';
import useAuthStates from './src/ReduxToolkit/Hooks/AuthHooks/StateHooks/useAuthStates';
import AuthStack from './src/Navigations/AuthStack/AuthStack';
import MainStack from './src/Navigations/MainStack/MainStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';

import useAppStates from './src/ReduxToolkit/Hooks/AppHooks/useAppStates/useAppStates';

const RootNavigator = () => {
  const { authState } = useAuthStates();
  const {PersistedAuth} = useAppStates()
    const isAuthenticated = PersistedAuth.authToken;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

<StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />    
      <NavigationContainer>
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <RootNavigator />
      </PersistGate>
      
    </Provider>
  );
};

export default App;
