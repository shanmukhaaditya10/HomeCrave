import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Logo from '../Assets/Logo.svg';
import InputWithLabel from '../Components/InputWithLabel';
import {moderateScale, scale} from 'react-native-size-matters';
import CustomButton from '../Components/CustomButton';
import {useMutation} from '@tanstack/react-query';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import useUserStore from '../Stores/useUserStore';
import {SmallText} from '../Components/Wrappers/CustomText';
import GlobalStyles from '../constants/GlobalStyles';
import LottieView from 'lottie-react-native';
import COLORS from '../constants/colors';

const Login = () => {
  const navigation = useNavigation<NativeStackNavigatorProps>();
  const [values, setValues] = useState<{email: string; password: string, secretKey?: string}>({
    email: '',
    password: '',
    secretKey: '',
  });
  const [isError, setIsError] = useState(false);

  const setUser = useUserStore(state => state.setUser);
  // Step 1: Set up the mutation
  const {isPending: isLoading, mutateAsync: loginMutation} = useMutation({
    mutationKey: ['login'],
    mutationFn: async (values: {email: string; password: string}) => {
      const {email, password} = values;
      try {
        const res = await auth().signInWithEmailAndPassword(email, password);
        setUser(res.user);
      } catch (error) {
        setIsError(true);
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
        style={[GlobalStyles.container, styles.container]}
        behavior={'padding'}
        keyboardVerticalOffset={20}>
        <ScrollView style={{width: '100%'}}>
          <View
            style={{
              alignItems: 'center',
              marginTop: moderateScale(-30),
            }}>
            <LottieView
              source={require('../Assets/LoginAnimation.json')}
              autoPlay
              loop
              style={{width: moderateScale(190), height: moderateScale(190)}}
            />
            <Text
              style={[
                styles.text,
                {
                  fontWeight: '600',
                  fontSize: scale(24),
                  letterSpacing: 0.2,
                  fontStyle: 'italic',
                  fontFamily: 'serif',
                  marginTop: moderateScale(-15),
                },
              ]}>
              Home Crave
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              width: '100%',
              paddingTop: scale(5),
              paddingHorizontal: moderateScale(15),
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={[styles.text,{
                fontFamily:"serif"
              }]}>LOGIN</Text>
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
                field="secretKey"
                label="Secret Key"
                placeholder="Enter Secret Key"
              />
              <InputWithLabel
                details={values}
                setDetails={setValues}
                field="publicKey"
                label="Public Key"
                placeholder="Enter Public Key"
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomButton
                color="#000000"
                width={'100%'}
                height={moderateScale(45)}
                bgColor={COLORS.PRIMARY}
                fontSize={moderateScale(17)}
                text="LOGIN"
                onPress={handleLogin}
                disabled={isLoading || !values.email || !values.password || !values.secretKey}
                isLoading={isLoading}
                styleProps={{
                  opacity:
                    isLoading || !values.email || !values.password ? 0.7 : 1,
                }}
              />
              {isError && (
                <SmallText
                  style={{color: '#ff4141', fontSize: 16, fontWeight: '400'}}>
                  *Invalid Email or Password*
                </SmallText>
              )}
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: scale(5),
              }}>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text
                  style={{
                    color: '#ffffff',
                    fontSize: scale(15),
                    textDecorationLine: 'underline',
                  }}>
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
    color: '#ffffff',
    fontSize: scale(24),
  },
  container: {
    paddingTop: scale(-200),
  },
});
