import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';

const Stack = createNativeStackNavigator();
export type AuthStackParamList = {
     Login: undefined;

   }

function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login"  screenOptions={{headerShown: false,animation:'slide_from_right',
  
    
    }} >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      {/* <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: true,headerTitle:'Forgot Password'}}  /> */}
    </Stack.Navigator>
  );
}

export default AuthNavigator