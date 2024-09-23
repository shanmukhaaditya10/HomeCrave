import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import GlobalStyles from '../constants/GlobalStyles'
import HomeHeader from '../Components/HomeHeader'

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
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default Home

const styles = StyleSheet.create({})