import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, scale } from 'react-native-size-matters'
import Animated, { SlideInDown, SlideInRight, SlideInUp } from 'react-native-reanimated'
import LogoMain from "../Assets/LogoMain.svg"
import { BigText, SmallText } from './Wrappers/CustomText'
import InputWithLabel from './InputWithLabel'
import { TextInput } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome6"
import AntIcon from "react-native-vector-icons/AntDesign"
import DiamanteLogo from '../Assets/DiamanteLogo.svg'
import { useMutation, useQuery } from '@tanstack/react-query'
import useGlobalStore from '../Stores/useGlobalStore'
import { getUserPublicKey } from '../utils/localStorage'
import useUserStore from '../Stores/useUserStore'
import { BASE_URL } from '../constants/Routes'
import LottieView from 'lottie-react-native';
const HomeHeader = () => {
  const [search,setSearch] = useState({})
  const {user} = useUserStore()
  const publicKey = getUserPublicKey(user?.uid)
    
  const {data:accountData,isLoading:accountLoading} = useQuery({
    queryFn:async()=>{
      const res = await fetch(`${BASE_URL}/getaccount/${publicKey}`)
      const jsonData = await res.json()
      
      return jsonData
    },
    queryKey:[`account-${publicKey}`],
    enabled:!!publicKey,
  })

  

  
  return (
    
    <Animated.View
        entering={SlideInUp.duration(500)}
        
      style={{

        width: '100%',
        height: moderateScale(150),
        backgroundColor: '#fffbed',
        paddingHorizontal: moderateScale(15),
        borderBottomRightRadius: moderateScale(30),
        borderBottomLeftRadius: moderateScale(30),
        paddingVertical:scale(10),
        rowGap:moderateScale(12),
      }}
    >
      <View style={{
        position:'absolute',
        bottom:0,
        left:-20
      }} >
        <LottieView source={require('../Assets/Animation - 1727035272988.json')} autoPlay loop style={{width:moderateScale(150),height:moderateScale(150)}} />
      </View>
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
        <LogoMain width={moderateScale(55)} height={moderateScale(55)} fill={"white"} stroke={"white"} color={"#010101"} />
        </View>
        <View>
        <BigText style={{
          color:"#000000",
          fontSize:moderateScale(15),
          fontWeight:"500",
          letterSpacing:0.2
        }} >Ghar Ka Khana</BigText>
        <SmallText
        style={{
          color:"#000000",
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
        alignItems:"center"
     

      }}
      >{ !accountLoading ?
        <SmallText 
        style={{
          color:"#000000",
        }}
        >
           ~{accountData?.balances?.find((balance: any) => balance.asset_type === "native").balance.substring(0, 6)}
      
        </SmallText>
        :<>
        <View
        style={{
        position:"relative",
        borderWidth:2,
        justifyContent:"center",
        alignItems:"center",
        width:moderateScale(25),
        height:moderateScale(25),
        borderRadius:moderateScale(30),
        
         
        }}
        >

        <LottieView source={require('../Assets/loadingLottie.json')} autoPlay loop style={{width:moderateScale(60),height:moderateScale(60),position:"absolute"}} />
        </View>
      </>  
      } 
        <DiamanteLogo width={moderateScale(30)} height={moderateScale(30)} />
      </View>

      </View>
      <View
      style={{
        justifyContent:"center",
      }}
      >
        <AntIcon style={{
          position:"absolute",
          transform: [{ translateX: scale(47) }],
          zIndex:1,
          
        }} name="search1" size={moderateScale(23)} color="#c25e00"  />
        <TextInput
          placeholder={"Search"}
          placeholderTextColor={'#4b4b4b'}
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
    backgroundColor:"#29292980",
    width:moderateScale(250),
    alignSelf:"center",
    borderRadius:moderateScale(8),
    paddingLeft:moderateScale(35),
    fontSize:moderateScale(18),
    color:"black"
  }
})