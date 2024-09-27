import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View, KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Logo from '../Assets/Logo.svg';
import InputWithLabel from '../Components/InputWithLabel';
import { moderateScale, scale } from 'react-native-size-matters';
import CustomButton from '../Components/CustomButton';
import { useMutation } from '@tanstack/react-query';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import useUserStore from '../Stores/useUserStore';
import { SmallText } from '../Components/Wrappers/CustomText';


const Login = () => {
  const navigation = useNavigation<NativeStackNavigatorProps>()
  const [values, setValues] = useState<{email: string; password: string}>({
    email: '',
    password: '',
  });
  const [isError,setIsError] = useState(false)

  const setUser = useUserStore((state) => state.setUser);
  // Step 1: Set up the mutation
  const {isPending: isLoading, mutateAsync: loginMutation} = useMutation({
    mutationKey: ['login'],
    mutationFn: async (values: {email: string; password: string}) => {
      const {email, password} = values;
      try {
         const res = await auth().signInWithEmailAndPassword(email, password);
        setUser(res.user);
      } catch (error) {
      setIsError(true)

      }
    },
    
    
  });

  const handleLogin = async () => {
    await loginMutation(values);
    setValues({email: '', password: ''});
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      
      <KeyboardAvoidingView
        style={styles.container}
        behavior={'padding'}
        keyboardVerticalOffset={20}
        >
           <ScrollView
                style={{width:"100%"}}
            >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Logo height={130} width={130} />
          <Text
            style={[
              styles.text,
              {fontWeight: '600', fontSize: scale(24), letterSpacing: 1.8,fontStyle:"italic",fontFamily:"serif"},
            ]}>
            Ghar Ka Khana
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            width: '100%',
            paddingTop: scale(20),
            paddingHorizontal: moderateScale(15),
          }}>
          
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.text}>LOGIN</Text>
          </View>
          
          <View style={{paddingBottom: 10, rowGap: 10}}>
            <InputWithLabel
              details={values}
              setDetails={setValues}
              field="email"
              label="Email ID"
              placeholder="Enter Email"
            />
            <InputWithLabel
              details={values}
              setDetails={setValues}
              field="password"
              label="Password"
              placeholder="Enter Password"
              isPassword={true}
            />
            <InputWithLabel
              details={values}
              setDetails={setValues}
              field="PublicKey"
              label="Public Key"
              placeholder="Enter Password"
            />
            <SmallText style={{
              marginTop:-20,
              fontWeight:"400",
              fontSize:moderateScale(12),
              textDecorationLine:"underline",
            }} >
              <SmallText style={{color:"red"}} >
                *
              </SmallText>
            leave public key empty if signed Up from this device
            <SmallText style={{color:"red"}} >
                *
              </SmallText>
            </SmallText>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomButton
              color="white"
              width={'100%'}
              height={moderateScale(45)}
              bgColor="#2E3192"
              fontSize={moderateScale(17)}
              text="LOGIN"
              onPress={handleLogin}
              disabled={isLoading || !values.email || !values.password}
              isLoading={isLoading}
              styleProps={{
                opacity:
                  isLoading || !values.email || !values.password ? 0.7 : 1,
              }}
            />
            {isError && 
          <SmallText style={{color: 'red', fontSize: 16,fontWeight:"400"}}>*Invalid Email or Password*</SmallText>}
          </View>
          
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop:scale(5)
        }} >
              
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={{color: '#2E3192', fontSize: scale(15),textDecorationLine:"underline"}}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Login;


const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: scale(26),
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: scale(25),
    paddingHorizontal: 10,
    backgroundColor: 'white',
    paddingBottom: 10,
  },
});
