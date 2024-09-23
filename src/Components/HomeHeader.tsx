import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { moderateScale } from 'react-native-size-matters'
import Animated, { SlideInDown, SlideInRight, SlideInUp } from 'react-native-reanimated'
import LogoMain from "../Assets/LogoMain.svg"
import { BigText, SmallText } from './Wrappers/CustomText'
import InputWithLabel from './InputWithLabel'
import { TextInput } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome6"
import AntIcon from "react-native-vector-icons/AntDesign"

const HomeHeader = () => {
  const [search,setSearch] = useState({})
  return (
    
    <Animated.View
        entering={SlideInUp.duration(500)}
        
      style={{
        position:'absolute',
        top:0,
        width: '100%',
        height: moderateScale(150),
        backgroundColor: 'black',
        paddingHorizontal: moderateScale(15),
        borderBottomRightRadius: moderateScale(30),
        borderBottomLeftRadius: moderateScale(30),
        paddingVertical:moderateScale(7),
        rowGap:moderateScale(12),
      }}
    >
      <View
        style={{
            flexDirection:"row",
            width:"100%",
            // borderBottomWidth:2,
            // borderColor:"white",
            paddingVertical:moderateScale(5),
            justifyContent:"space-between"
        }}
      > 
      <View 
      style={{
        flexDirection:'row',
        columnGap:moderateScale(5),
      }}
      >
        <View>
        <LogoMain width={moderateScale(55)} height={moderateScale(55)} fill={"white"} stroke={"white"} color={"white"} />
        </View>
        <View>
        <BigText style={{
          color:"white",
          fontSize:moderateScale(15),
          fontWeight:"500",
          letterSpacing:0.2
        }} >Ghar Ka Khana</BigText>
        <SmallText
        style={{
          color:"white",
          fontSize:moderateScale(12),
          fontWeight:"300",
          letterSpacing:0.5,
          textAlign:"center"
        }}
        >
        Pure and Secure
        </SmallText>
        </View>
      </View>
      <View
      style={{
        flexDirection:"row",
        columnGap:moderateScale(5),
        marginTop:moderateScale(7),
      }}
      >
        <SmallText
        style={{
          color:"white",
          fontSize:moderateScale(14),
          fontWeight:"500",
          textAlign:"center"
        }}
        >
        Location
        </SmallText>
        <Icon name="location-dot" size={moderateScale(15)} color="white" />
      </View>

      </View>
      <View
      style={{
        justifyContent:"center",
      }}
      >
        <AntIcon style={{
          position:"absolute",
          transform: [{ translateX: 45 }],
          zIndex:1,
          
        }} name="search1" size={moderateScale(23)} color="#c25e00"  />
        <TextInput
          placeholder={"Search"}
          placeholderTextColor={'gray'}
          style={styles.input}
          // onChangeText={(text) => handleInputChange(field, text)}
          // value={details[field]}
          autoCapitalize="none"
          
        />
      </View>
      
    </Animated.View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
  input:{
    backgroundColor:"white",
    width:moderateScale(250),
    alignSelf:"center",
    borderRadius:moderateScale(8),
    paddingLeft:moderateScale(35),
    fontSize:moderateScale(20),
    height:moderateScale(45),
  }
})