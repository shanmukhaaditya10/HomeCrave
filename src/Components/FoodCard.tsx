import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {BigText, SmallText} from './Wrappers/CustomText';
import DiamIconWhite from '../Assets/DiamIconWhite.svg';
import UserIcon from '../Assets/UserIcon.svg';
import COLORS from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import usePosts from '../ServerHooks/usePosts';
const FoodCard = ({postData}:{postData:any}) => {
  const navigation = useNavigation<NativeStackNavigatorProps>()
  return (
    <TouchableOpacity
      style={{
        height: moderateScale(210),
        width: moderateScale(190),
        elevation: 10,
        borderWidth: 1,
        shadowColor: '#ffffff',
        backgroundColor: '#151515',
        borderRadius: moderateScale(10),
        overflow: 'hidden',
        borderColor:COLORS.PRIMARY
      }}
      onPress={() => {
        navigation.navigate('FoodDetails',{
          postData
        })
      }}
      >
      <View
        style={{
          width: '100%',
          height: '65%',
        }}>
        <Image
          source={{uri: postData?.imageUri}}
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
      </View>
      <View
        style={{
          paddingHorizontal: moderateScale(5),
        }}>
        <BigText
          style={{
            fontSize: moderateScale(15),
          }}>
          {postData?.title}
        </BigText>
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        >
            
      
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <DiamIconWhite width={moderateScale(20)} height={moderateScale(20)} />
            <BigText
              style={{
                fontSize: moderateScale(15),
              }}>
              {' '}
              {postData.price}
            </BigText>
          </View>
          <View>
            <SmallText
              style={{
                fontSize: moderateScale(11),
                fontWeight: '400',
              }}>
              Upto {postData.servings} servings
            </SmallText>
          </View>
        </View>
        <View 
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        >
            <UserIcon width={moderateScale(40)} height={moderateScale(40)}   />
            <SmallText
            style={{
              fontSize: moderateScale(10),
              fontWeight: '400',
              marginTop:moderateScale(-7)
            }}
            >{postData.name?.split(" ")[0]}</SmallText>
        </View>  
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FoodCard;

const styles = StyleSheet.create({});
