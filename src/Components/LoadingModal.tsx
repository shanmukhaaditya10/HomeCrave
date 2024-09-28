import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LoadingModal = ({visible}:{visible: boolean}) => {
  return (
    <Modal
      transparent={true} visible={visible} >
      <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}
      >
        <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
         
        }}
        >
            <ActivityIndicator size={"large"} >

            </ActivityIndicator>
        </View>

      </View>
    </Modal>
  )
}

export default LoadingModal

const styles = StyleSheet.create({})