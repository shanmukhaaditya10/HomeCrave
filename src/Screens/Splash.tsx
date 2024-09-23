import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
// import Logo from "../Assets/Logo.svg"
const Splash = () => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }} >
      {/* <Logo width={scale(200)} height={scale(200)} />
       */}
      <Text 
        style={{fontSize:scale(36), fontWeight:'bold', marginTop:scale(100), marginBottom:scale(100)}}
      >GharKaKhana</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})