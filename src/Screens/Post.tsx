import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import GlobalStyles from '../constants/GlobalStyles'
import CustomButton from '../Components/CustomButton'
import { useMutation } from '@tanstack/react-query'
import { getUserPublicKey, getUserSecretKey } from '../utils/localStorage'
import useUserStore from '../Stores/useUserStore'
import InputWithLabel from '../Components/InputWithLabel'
import { moderateScale, scale } from 'react-native-size-matters'
import { queryClient } from '../../App'
import { BigText, SmallText } from '../Components/Wrappers/CustomText'
import {RichEditor, RichToolbar, actions} from 'react-native-pell-rich-editor';
import { BASE_URL } from '../constants/Routes'


const Post = () => {
  const {user} = useUserStore(state => state)
  const secret = getUserSecretKey(user?.uid)
  const publicKey = getUserPublicKey(user?.uid)
  const RichText = useRef<any>();
  const [recieverPublicKey,setRecieverPublicKey] = useState({
    key:'',
  })
  const [details,setDetails] = useState({
    title:'',
    price:'',
    description:'',
    servings:'',

  })

  const {mutateAsync:makeTransaction,isPending} = useMutation({
    mutationKey:['makeTransaction'],
    mutationFn: async() => {
      const res = await fetch(`${BASE_URL}/transaction`,
      {
        method:"POST",
        headers: {
          'Content-Type': 'application/json', 
        },
        body:JSON.stringify({
          secret:secret,
          recieverPublicKey:recieverPublicKey.key,
          amount:"2"
        })
      }
      );
      const jsonData = await res.json();
      console.log(jsonData);
      queryClient.invalidateQueries({
        queryKey:[`account-${publicKey}`]
      })  
      return res
    }
  })
  const handleInputChange = (field: string, text: string) => {
    setDetails((prevDetails: any) => ({...prevDetails, [field]: text }));
  };
  return (
    <View 
      style={[GlobalStyles.container]}
    > 
    <ScrollView
    style={[GlobalStyles.container,{
      paddingHorizontal:moderateScale(15),
      paddingVertical:moderateScale(10),
    }]}
    >

      {/* <InputWithLabel
      label="reciever public key"
      placeholder="reciever public key"
      field="key"
      details={recieverPublicKey}
      setDetails={setRecieverPublicKey}
      />
      <CustomButton
      text='send 2 diams'
      isLoading={isPending}
      height={moderateScale(40)}
      bgColor='#2E3192'
      onPress={async() => {
        await makeTransaction()
      }}
      
      /> */}
      <View 
      style={{
        paddingVertical:moderateScale(10),
        borderBottomWidth:1
      }}
      >

      <BigText style={{
        color:"#000000",
        fontSize:moderateScale(18),
        fontWeight:'500'
      }} >
        Sell What You have cooked today..

      </BigText>
      </View>
     
        <View
        style={{
          width:"100%",
        }}
        >
          <SmallText
          style={{
            color:"#000000",
            fontSize:moderateScale(18),
            fontWeight:'400'
          }}
          >
            Title
          </SmallText>
         <TextInput
          placeholder={"What is it?"}
          placeholderTextColor={'#4e4e4e'}
          style={styles.input}
          onChangeText={(text) => handleInputChange('title', text)}
          value={details['title']}
        />


        </View>
        <View
        style={{
          width:"100%",
        }}
        >
          <SmallText
          style={{
            color:"#000000",
            fontSize:moderateScale(18),
            fontWeight:'400'
          }}
          >
            Price( in diams )
          </SmallText>
         <TextInput
          placeholder={"How much is it ?"}
          placeholderTextColor={'#4e4e4e'}
          style={styles.input}
          onChangeText={(text) => handleInputChange('price', text)}
          value={details['price']}
          keyboardType='numeric'
        />


        </View>
        <View
        style={{
          width:"100%",
        }}
        >
          <SmallText
          style={{
            color:"#000000",
            fontSize:moderateScale(18),
            fontWeight:'400'
          }}
          >
            Number of Servings
          </SmallText>
         <TextInput
          placeholder={"Number of Servings"}
          placeholderTextColor={'#4e4e4e'}
          style={styles.input}
          onChangeText={(text) => handleInputChange('servings', text)}
          value={details['servings']}
          keyboardType='numeric'

        />


        </View>
        <View
        style={{
          width:"100%",
        }}
        >
          <SmallText
          style={{
            color:"#000000",
            fontSize:moderateScale(18),
            fontWeight:'400'
          }}
          >
            Description
          </SmallText>
        
          <RichToolbar
                  style={[styles.richBar]}
                  editor={RichText}
                  disabled={false}
                  iconTint={'purple'}
                  selectedIconTint={'pink'}
                  disabledIconTint={'purple'}
                  iconSize={scale(20)}
                  actions={[
                    actions.setBold,
                    actions.setItalic,
                    actions.blockquote,
                    actions.setUnderline,
                    actions.setStrikethrough,
                    actions.alignCenter,
                    actions.insertBulletsList,
                    actions.insertOrderedList,
                  ]}
                />
                <RichEditor
                  ref={RichText}
                  disabled={false}
                  initialHeight={200}
                  style={[styles.editor]}
                  placeholder={'Start Writing Here'}
                  onChange={text => setDetails(prev=> ({...prev, 'description':text}))}
                />

        </View>
        <View>
          <CustomButton
          text='Post'
          isLoading={isPending}
          height={moderateScale(40)}
          bgColor='#2e9236'
          onPress={async() => {
            await makeTransaction()
          }}
          color='#ffffff'
          
          />
        </View>
      
      </ScrollView>
    </View>
  )
}

export default Post

const styles = StyleSheet.create({
  input: {
    fontSize: moderateScale(15),
    width: '100%',
    color: '#000000',
    backgroundColor:"#eaeaea",
    paddingHorizontal:moderateScale(5),
    borderRadius:scale(10),
    borderColor:"black",
    borderWidth:1.5,
  },
  editor: {
    backgroundColor: 'black',
    borderColor: 'black',
    borderWidth: 1,
  },
  rich: {
    minHeight: 300,
    flex: 1,
    textAlign: 'left',
  },
  richBar: {
    backgroundColor: '#F5FCFF',
  },
})