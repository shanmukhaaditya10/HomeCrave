import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import Logo from '../Assets/Logo.svg';
import Home from '../Screens/Home';
import Post from '../Screens/Post';
import Settings from '../Screens/Settings';
import TabBar from '../Components/TabBar';
import FoodDetails from '../Screens/FoodDetails';
const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

export type LoggedInStackParamList = {
  Login: undefined;
};

// linking










function DefaultUser() {
  return (
    <BottomTab.Navigator
    tabBar={(props)=> <TabBar {...props}/>}
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        position: 'absolute',
        bottom: 20,
        width: '90%',
        left: "5%",
        height: 60,
        borderRadius: moderateScale(18),
      },
      tabBarShowLabel: false,
      
      tabBarHideOnKeyboard: true,
    }}
  >
      <BottomTab.Screen name="Home"  component={Home} 
    
      />
      <BottomTab.Screen name="Post" component={Post} 
         options={{
           
          }}
      />
      <BottomTab.Screen name="Settings" component={Settings}
        options={{
           
          }}
      />
    </BottomTab.Navigator>
  );
}

function LoggedInNavigator() {
  return (
    <>

    <Stack.Navigator
      initialRouteName="Drawer"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="DefaultUser" component={DefaultUser} />
      <Stack.Screen name="FoodDetails" component={FoodDetails} />



    </Stack.Navigator>
        </>
  );
}
export default LoggedInNavigator;
