import { Keyboard, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import GlobalStyles from '../constants/GlobalStyles'
import HomeHeader from '../Components/HomeHeader'
import { moderateScale } from 'react-native-size-matters'
import { SmallText } from '../Components/Wrappers/CustomText'
import FoodCard from '../Components/FoodCard'
import SectionScroller from '../Components/SectionScroller'
const Home = () => {

  
  return (
    <TouchableWithoutFeedback 
    style={[GlobalStyles.container]}
    onPress={Keyboard.dismiss}

    >
      <KeyboardAvoidingView
        style={[GlobalStyles.container]}
        behavior="padding"
        
      >

     <HomeHeader/>
     <View 
     style={{
       paddingVertical:moderateScale(20),
     }}
     >
      <View style={[styles.section]} >
      <SmallText
      style={{fontWeight:'bold',fontSize:moderateScale(17),fontFamily:'serif',letterSpacing:moderateScale(0.1),paddingHorizontal:moderateScale(10),color:'white'}}
      >
        From Trusted Sellers
      </SmallText>
     <SectionScroller/>
      </View>


     </View>
    
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default Home

const styles = StyleSheet.create({
  section: {
    width: '100%',
    rowGap:moderateScale(10),
    paddingHorizontal:moderateScale(5),
  }
})