import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {BigText, SmallText} from './Wrappers/CustomText';
import DiamIconWhite from '../Assets/DiamIconWhite.svg';
import UserIcon from '../Assets/UserIcon.svg';
import COLORS from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
const LargeFoodCard = () => {
  const navigation = useNavigation<NativeStackNavigatorProps>()
  return (
    <TouchableOpacity
      style={{
        height: moderateScale(150),
        width: '100%',
        elevation: 10,
        borderWidth: 1.5,
        borderColor: COLORS.PRIMARY,
        shadowColor: 'black',
        backgroundColor: '#151515',
        borderRadius: moderateScale(10),
        overflow: 'hidden',
        paddingVertical: moderateScale(17),
        
      }}
      onPress={() => {
        navigation.navigate('FoodDetails')
      }}
      >
        <View
        style={{
            flexDirection: 'row',
            justifyContent:"space-between",
            paddingHorizontal:moderateScale(20)
        }}
        >
            <View
            style={{
              width:"60%"
            }}
            >
                <BigText 
                style={{
                    fontSize:moderateScale(22),
                }}
                >
                Masala Dosa         
                </BigText>
                <SmallText 
                style={{
                  fontSize:moderateScale(13),
                }}
                >
                ingridients: onions, potato, tomato,peas...
                
                </SmallText>
               <View
               style={{
                flexDirection:'row',
                alignItems:'center',
                columnGap:4
               }}
               >
               <BigText 
                style={{
                    fontSize:moderateScale(18)
                }}
                >
                60         
                </BigText>
               
                <DiamIconWhite width={moderateScale(26)} height={moderateScale(26)} />
                
               </View>
               <SmallText
               style={{
                fontSize:moderateScale(12),
                color:COLORS.PRIMARY
               }}
               >
                  Upto 5 servings

                </SmallText>
            </View>
            <View>
                <Image source={require('../Assets/Dosa.jpg')} style={{width:moderateScale(100),height:moderateScale(100),objectFit:'cover',
                borderRadius:moderateScale(20),


              }}/>

            </View>

        </View>
      {/* <View
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
                fontSize: moderateScale(11),
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
      </View> */}
    </TouchableOpacity>
  );
};

export default LargeFoodCard;

const styles = StyleSheet.create({});
