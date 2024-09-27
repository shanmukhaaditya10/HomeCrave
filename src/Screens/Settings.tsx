import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import GlobalStyles from '../constants/GlobalStyles';
import InputWithLabel from '../Components/InputWithLabel';
import {moderateScale} from 'react-native-size-matters';
import {SmallText} from '../Components/Wrappers/CustomText';
import {getUserPublicKey, getUserSecretKey} from '../utils/localStorage';
import useUserStore from '../Stores/useUserStore';
import Clipboard from '@react-native-clipboard/clipboard';
import auth from '@react-native-firebase/auth';
import CustomButton from '../Components/CustomButton';

const Settings = () => {
  const [details, setDetails] = useState({});
  const {user} = useUserStore();

  return (
    <View style={[GlobalStyles.container]}>
      <ScrollView
        style={{
          width: '100%',
          paddingHorizontal: moderateScale(10),
          paddingVertical: moderateScale(10),
        }}>
        <View>
          <SmallText style={{fontWeight: 'bold'}}>Secret Key</SmallText>
          <View
            style={{
              width: '100%',
              backgroundColor: 'white',
              paddingHorizontal: moderateScale(10),
              borderColor: '#2E3192',
              borderWidth: 1.5,
            }}>
            <SmallText
              style={{
                color: 'black',
              }}>
              {getUserSecretKey(user?.uid)}
            </SmallText>
          </View>
        </View>
        <View>
          <SmallText style={{fontWeight: 'bold'}}>Public Key</SmallText>
          <View
            style={{
              width: '100%',
              backgroundColor: 'white',
              paddingHorizontal: moderateScale(10),
              borderColor: '#2E3192',
              borderWidth: 1.5,
            }}>
            <SmallText
              style={{
                color: 'black',
              }}>
              {getUserPublicKey(user?.uid)}
            </SmallText>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            const text = getUserPublicKey(user?.uid);
            if (typeof text === 'string') {
              Clipboard.setString(text);
            }
            Alert.alert('Copied to clipboard!');
          }}>
          <SmallText>copy public</SmallText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const text = getUserSecretKey(user?.uid);
            if (typeof text === 'string') {
              Clipboard.setString(text);
            }
            Alert.alert('Copied to clipboard!');
          }}>
          <SmallText>copy secret</SmallText>
        </TouchableOpacity>

        <View>
          <CustomButton
            text="Logout"
            bgColor="#991110"
            height={moderateScale(40)}
            fontSize={moderateScale(16)}
            styleProps={{marginTop: moderateScale(10)}}
            color="white"
            disabled={false}
            onPress={async () => {
              await auth()
                .signOut()
                .then(() => console.log('User signed out!'));
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
