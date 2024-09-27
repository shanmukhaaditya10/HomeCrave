import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {BigText, SmallText} from './Wrappers/CustomText';
import DiamIcon from '../Assets/DiamIcon.svg';
import UserIcon from '../Assets/UserIcon.svg';
const FoodCard = () => {
  return (
    <TouchableOpacity
      style={{
        height: moderateScale(210),
        width: moderateScale(180),
        elevation: 10,
        borderWidth: 1.5,
        shadowColor: 'black',
        backgroundColor: '#fffbed',
        borderRadius: moderateScale(10),
        overflow: 'hidden',
      }}>
      <View
        style={{
          width: '100%',
          height: '65%',
        }}>
        <Image
          source={require('../Assets/Food.jpg')}
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
          Food...
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
            <DiamIcon width={moderateScale(20)} height={moderateScale(20)} />
            <BigText
              style={{
                fontSize: moderateScale(15),
              }}>
              {' '}
              200
            </BigText>
          </View>
          <View>
            <SmallText
              style={{
                fontSize: moderateScale(12),
                fontWeight: '400',
              }}>
              Upto 2 servings
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
            >Name</SmallText>
        </View>  
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FoodCard;

const styles = StyleSheet.create({});
