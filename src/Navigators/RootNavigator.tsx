import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import LoggedInNavigator from './LoggedInNavigator';
import {focusManager} from '@tanstack/react-query';
import auth from '@react-native-firebase/auth';
import useUserStore, {initializeUserState} from '../Stores/useUserStore';
import Splash from '../Screens/Splash';
const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  const user = useUserStore(state => state.user);
  const initializing = useUserStore(state => state.initializing);


  useEffect(() => {
    const unsubscribe = initializeUserState();
    // console.log(user);

    return () => unsubscribe();
  }, []);

  if (initializing) {
    return (
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>

        <RootStack.Screen name="Splash" component={Splash} />
        </RootStack.Navigator>
    );
  }
  return (
    <>
      {user ? (
        <>
          <RootStack.Navigator
            screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
            <RootStack.Screen
              name="LoggedInNavigator"
              component={LoggedInNavigator}
            />
          </RootStack.Navigator>
        </>
      ) : (
        <>
          <RootStack.Navigator
            screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
            <RootStack.Screen name="AuthNavigator" component={AuthNavigator} />
          </RootStack.Navigator>
        </>
      )}
    </>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
