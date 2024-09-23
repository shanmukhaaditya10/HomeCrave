import { ActivityIndicator, Alert, Linking, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/Navigators/RootNavigator';
import useGlobalStore from './src/Stores/useGlobalStore';
import Toast from 'react-native-toast-message';
const queryClient = new QueryClient()
import {PermissionsAndroid} from 'react-native';
const App = () => {
  
 





  return (
    <NavigationContainer  >
      
    <QueryClientProvider client={queryClient}>
   <RootNavigator/>
    </QueryClientProvider>
    <Toast/>
    </NavigationContainer>
  )
}

export default App
  export {queryClient}

const styles = StyleSheet.create({})