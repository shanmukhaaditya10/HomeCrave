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
import useGlobalStore from '../Stores/useGlobalStore';
import {MMKV} from 'react-native-mmkv';
import {setUserPublicKey, setUserSecretKey} from '../utils/localStorage';
import {BASE_URL} from '../constants/Routes';
import GlobalStyles from '../constants/GlobalStyles';
import COLORS from '../constants/colors';
import LottieView from 'lottie-react-native';
import firestore from '@react-native-firebase/firestore';

const SignUp = () => {
  const navigation = useNavigation<NativeStackNavigatorProps>();
  const [values, setValues] = useState<{
    email: string;
    password: string;
    name: string;
  }>({
    email: '',
    password: '',
    name: '',
  });
  const [isError, setIsError] = useState(false);
  const {user, setUser} = useUserStore(state => state);
  const {publicKey, setPublicKey} = useGlobalStore(state => state);
  // Step 1: Set up the mutation
  const {isPending: isLoading, mutateAsync: signupMutation} = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (values: {
      email: string;
      password: string;
      name: string;
    }) => {
      const {email, password} = values;
      try {
        const res = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        const setUpAccont = await fetch(`${BASE_URL}/api`);
        const jsonData = await setUpAccont.json();
         setUserPublicKey(jsonData.pair, res.user.uid);
         setUserSecretKey(jsonData.secret, res.user.uid);

        await firestore()
          .collection('UsersData')
          .doc(res.user.uid)
          .set({
            name: values.name,
            userId: res.user.uid,
            email: values.email,
            publicKey:jsonData.pair

          })
          .then(() => {
            console.log('User added!');
          });

        setUser(res.user);
        console.log(publicKey);
        
      } catch (error) {
        setIsError(true);
        console.log(error);
      }
    },
  });

  const handleLogin = async () => {
    await signupMutation(values);
    setValues({email: '', password: '', name: ''});
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={[GlobalStyles.container]}
        behavior={'padding'}
        keyboardVerticalOffset={20}>
        <ScrollView style={{width: '100%'}}>
          <View
            style={{
              marginTop: moderateScale(-20),
              alignItems: 'center',
            }}>
            <LottieView
              source={require('../Assets/LoginAnimation.json')}
              autoPlay
              loop
              style={{width: moderateScale(220), height: moderateScale(220)}}
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
              paddingTop: scale(20),
              paddingHorizontal: moderateScale(15),
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.text}>Sign Up</Text>
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
                field="name"
                label="Display Name"
                placeholder="Enter Name"
              />
              <InputWithLabel
                details={values}
                setDetails={setValues}
                field="password"
                label="Password"
                placeholder="Enter Password"
                isPassword={true}
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
                text="Sign Up"
                onPress={handleLogin}
                disabled={isLoading || !values.email || !values.password}
                isLoading={isLoading}
                styleProps={{
                  opacity:
                    isLoading || !values.email || !values.password ? 0.7 : 1,
                }}
              />
              {isError && (
                <SmallText
                  style={{color: 'red', fontSize: 16, fontWeight: '400'}}>
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
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{
                    color: '#ffffff',
                    fontSize: scale(12),
                    textDecorationLine: 'underline',
                  }}>
                  Already a member? Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  text: {
    color: '#ffffff',
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
