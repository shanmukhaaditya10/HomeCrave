import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale, scale } from 'react-native-size-matters'
import COLORS from '../constants/colors'
import { BigText, SmallText } from './Wrappers/CustomText'
import DiamIcon from "../Assets/DiamIcon.svg"
import { useMutation } from '@tanstack/react-query'
import { BASE_URL } from '../constants/Routes'
import { getUserPublicKey, getUserSecretKey } from '../utils/localStorage'
import useUser from '../ServerHooks/useUser'
import useUserStore from '../Stores/useUserStore'
import firestore from '@react-native-firebase/firestore';
import { queryClient } from '../../App'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types'

const OrderModal = ({isVisible, servings,setIsVisible,quantity,setQuantity,price,postData}:{
    isVisible: boolean,
    servings: string,
    title?: string,
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>,
    quantity: number,
    setQuantity: React.Dispatch<React.SetStateAction<number>>,
    price: string,
    postData: any
}) => {
    const Intservings = parseInt(servings)
    const Intprice = parseInt(price.toString())
    const {user} = useUserStore( state => state)
    const secret = getUserSecretKey(user?.uid)
    const publicKey = getUserPublicKey(user?.uid)
  const navigation = useNavigation<NativeStackNavigatorProps>()

    
    const {mutateAsync:makeTransaction, isPending} = useMutation({
        mutationFn: async () => {
            try {
                
          
            const userDocument = await firestore()
        .collection('UsersData').doc(postData?.userId)
        .get()
        console.log(userDocument.data()?.publicKey);
        
        const recieverPublicKey = userDocument.data()?.publicKey
            const res = await fetch(`${BASE_URL}/transaction`,
      {
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          secret:secret,
          recieverPublicKey:recieverPublicKey,
          amount:`${quantity*postData.price}`.toString(),
        })
      }
      );
      const jsonData = await res.json();
      console.log(jsonData);
      queryClient.invalidateQueries({
        queryKey:[`account-${publicKey}`]
      })
      Toast.show({
        type:"success",
        text1:"Payment Successful"
    })
      return res
    } catch (error) {
     console.log(error);
     Toast.show({
        type:"error",
        text1:"something went wrong"
    })
                
    }
        },
        mutationKey: ['makeTransaction'],
    })
  return (
    <Modal

      animationType="slide"
      transparent={true}
      visible={isVisible}
    >
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:"rgba(1,1,1,0.5)",paddingHorizontal:scale(20)}}>
            <View style={{backgroundColor: "#fafafa", padding: 20, borderRadius: scale(20),alignItems:'center'}} >
            <BigText style={{
                marginBottom:moderateScale(10),
                fontWeight:"400",
                textAlign:"center",
                color:"black"
            }} >
                Order Now
            </BigText>
            <SmallText
            style={{
                color:"black",
                marginBottom:moderateScale(10),
            }}
            >
                Adjust Quantity
            </SmallText>
           <View
           style={{
               flexDirection:'row',
               justifyContent:"center",
               alignItems:"center",
               columnGap:moderateScale(10),
           }}
           >
            <TouchableOpacity
            style={{
                backgroundColor:"#5d5d5d",
                alignItems:"center",
                justifyContent:"center",
                paddingVertical:moderateScale(-10),
                paddingHorizontal:moderateScale(10),
                borderRadius:moderateScale(10)
            }}
            onPress={() => {
                if(quantity > 1){
                    setQuantity(quantity - 1)
                }
                
            }}
            >
            <SmallText 
            style={{
                color:"#ffffff",
                fontWeight:"800",
                fontSize:moderateScale(20),
                textAlign:"center",
                
            }}
            >
                -
            </SmallText>
            </TouchableOpacity>
            <SmallText 
            style={{
                color:"black",
         
            }}
            >
                {quantity}
            </SmallText>
            <TouchableOpacity
             style={{
                backgroundColor:"#34a300",
                alignItems:"center",
                justifyContent:"center",
                paddingVertical:moderateScale(-10),
                paddingHorizontal:moderateScale(10),
                borderRadius:moderateScale(10)
            }}
            onPress={() => {
                if (quantity < Intservings ) {
                    
                    setQuantity(quantity + 1)
                }
            }}
            >
                 <SmallText 
            style={{
                color:"#ffffff",
                fontWeight:"700",
                fontSize:moderateScale(20),
                textAlign:"center"
            }}
        
            >
                +
            </SmallText>

            </TouchableOpacity>

           </View>
            <View 
            style={{
                flexDirection:'row',
                justifyContent:"center",
                alignItems:"center",
            }}
            >
                <BigText
                style={{
                    color:"black",
                    fontWeight:"600",
                    fontSize:moderateScale(20),
                }}
                >
                    Total: {quantity * Intprice}
                </BigText>
                <DiamIcon width={moderateScale(22)} height={moderateScale(22)} />
            </View>
            <View style={{
                flexDirection:'row',
                columnGap:scale(10)
            }} >

            <TouchableOpacity style={{
               paddingHorizontal:scale(20),
               paddingVertical:moderateScale(6),
                borderColor:COLORS.DELAYED,
                borderWidth:2,
                borderRadius:moderateScale(10),
                justifyContent:"center",
                alignItems:"center",
                marginTop:scale(20)

            }} onPress={()=>{
                setIsVisible(false)
            }} 
            disabled={isPending}
            >

            <SmallText style={{
                fontSize:moderateScale(20),
                fontWeight:"500",
                color:COLORS.DELAYED
            }} >
                Cancel
            </SmallText >
            </TouchableOpacity>
            <TouchableOpacity style={{
               paddingHorizontal:scale(20),
               paddingVertical:moderateScale(6),
                borderColor:COLORS.COMPLETED,
                borderWidth:2,
                borderRadius:moderateScale(10),
                justifyContent:"center",
                alignItems:"center",
                marginTop:scale(20)

            }} onPress={async()=>{
                await makeTransaction()
                setIsVisible(false)
                navigation.navigate("Home")
              
            }}
            disabled={isPending}
            
            >

            <SmallText style={{
                fontSize:moderateScale(15),
                fontWeight:"500",
                color:COLORS.COMPLETED
            }} >
                Confirm Payment
            </SmallText >
            </TouchableOpacity>
            </View>

            </View>
        </View>
    </Modal>
  )
}

export default OrderModal

const styles = StyleSheet.create({})