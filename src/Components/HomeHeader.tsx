import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {moderateScale, scale} from 'react-native-size-matters';
import Animated, {
  SlideInDown,
  SlideInRight,
  SlideInUp,
} from 'react-native-reanimated';
import LogoMain from '../Assets/LogoMain.svg';
import {BigText, SmallText} from './Wrappers/CustomText';
import InputWithLabel from './InputWithLabel';
import {TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import AntIcon from 'react-native-vector-icons/AntDesign';
import DiamIcon from '../Assets/DiamIcon.svg';
import {useMutation, useQuery} from '@tanstack/react-query';
import useGlobalStore from '../Stores/useGlobalStore';
import {getUserPublicKey} from '../utils/localStorage';
import useUserStore from '../Stores/useUserStore';
import {BASE_URL} from '../constants/Routes';
import LottieView from 'lottie-react-native';
import COLORS from '../constants/colors';
const HomeHeader = () => {
  const [search, setSearch] = useState({});
  const {user} = useUserStore();
  const publicKey = getUserPublicKey(user?.uid);
  const [tokens, setTokens] = useState<null | any[]>(null);
  const {data: accountData, isLoading: accountLoading} = useQuery({
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/getaccount/${publicKey}`);
      const jsonData = await res.json();
      setTokens(jsonData?.balances);
      return jsonData;
    },
    queryKey: [`account-${publicKey}`],
    enabled: !!publicKey && !!user,
  });

  return (
    <Animated.View
      entering={SlideInUp.duration(500)}
      style={{
        width: '100%',
        height: moderateScale(132),
        backgroundColor: COLORS.PRIMARY,
        paddingHorizontal: moderateScale(15),
        borderBottomRightRadius: moderateScale(30),
        borderBottomLeftRadius: moderateScale(30),
        paddingVertical: scale(10),
        rowGap: moderateScale(12),
      }}>
      {/* <View style={{
        position:'absolute',
        bottom:0,
        left:-20
      }} >
        <LottieView source={require('../Assets/Animation - 1727035272988.json')} autoPlay loop style={{width:moderateScale(150),height:moderateScale(150)}} />
      </View> */}
      <View
        style={{
          flexDirection: 'row',
          width: '100%',

          paddingVertical: moderateScale(5),
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
              width: moderateScale(65),
              marginTop: -15,
            }}>
            <LottieView
              source={require('../Assets/LoginAnimation.json')}
              autoPlay
              loop
              style={{
                width: moderateScale(77),
                height: moderateScale(77),
                position: 'absolute',
              }}
            />
          </View>
          <View>
            <Text
              style={[
                {
                  color: '#000000',
                  fontWeight: '700',
                  fontSize: scale(20),
                  letterSpacing: -0.9,
                  fontFamily: 'serif',
                },
              ]}>
              Home Crave
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            columnGap: moderateScale(5),
            marginTop: moderateScale(7),
            alignItems: 'center',
          }}>
          {!accountLoading ? (
            <SmallText
              style={{
                color: '#000000',
                fontWeight: '500',
              }}>
              ~
              {accountData?.balances
                ?.find((balance: any) => balance.asset_type === 'native')
                .balance.substring(0, 6)}
            </SmallText>
          ) : (
            <>
              <View
                style={{
                  position: 'relative',
                  borderWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: moderateScale(25),
                  height: moderateScale(25),
                  borderRadius: moderateScale(30),
                }}>
                <LottieView
                  source={require('../Assets/loadingLottie.json')}
                  autoPlay
                  loop
                  style={{
                    width: moderateScale(60),
                    height: moderateScale(60),
                    position: 'absolute',
                  }}
                />
              </View>
            </>
          )}
          <DiamIcon width={moderateScale(22)} height={moderateScale(22)} />
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          shadowColor: 'black',
          elevation: 10, 
          marginTop: scale(10),
          backgroundColor: 'black',
          borderRadius: moderateScale(5),
        }}>
        <AntIcon
          style={{
            position: 'absolute',
            transform: [{translateX: scale(10)}],
            zIndex: 1,
          }}
          name="search1"
          size={moderateScale(23)}
          color="#000000"
        />
        <TextInput
          placeholder={'Search your craving... '}
          placeholderTextColor={'#4b4b4b'}
          style={styles.input}
          // onChangeText={(text) => handleInputChange(field, text)}
          // value={details[field]}
          autoCapitalize="none"
        />
      </View>
    </Animated.View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#cecdcdff',
    width: '100%',
    alignSelf: 'center',
    borderRadius: moderateScale(5),
    paddingLeft: moderateScale(35),
    fontSize: moderateScale(16),
    color: 'black',
  },
});
