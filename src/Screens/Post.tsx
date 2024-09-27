import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useRef, useState} from 'react';
import GlobalStyles from '../constants/GlobalStyles';
import CustomButton from '../Components/CustomButton';
import {useMutation} from '@tanstack/react-query';
import {getUserPublicKey, getUserSecretKey} from '../utils/localStorage';
import useUserStore from '../Stores/useUserStore';
import InputWithLabel from '../Components/InputWithLabel';
import {moderateScale, scale} from 'react-native-size-matters';
import {queryClient} from '../../App';
import {BigText, SmallText} from '../Components/Wrappers/CustomText';
import {RichEditor, RichToolbar, actions} from 'react-native-pell-rich-editor';
import {BASE_URL} from '../constants/Routes';
import firestore from '@react-native-firebase/firestore';
import useUser from '../ServerHooks/useUser';
import COLORS from '../constants/colors';
import DocPicker from '../Components/DocPicker';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';
import storage from '@react-native-firebase/storage';
const Post = () => {
  const {user} = useUserStore(state => state);
  const {userData} = useUser();
  const secret = getUserSecretKey(user?.uid);
  const publicKey = getUserPublicKey(user?.uid);
  const RichText = useRef<any>();
  const [recieverPublicKey, setRecieverPublicKey] = useState({
    key: '',
  });
  const [details, setDetails] = useState({
    title: '',
    price: '',
    description: '',
    servings: '',
  });
  const [files, setFiles] = useState<any>({
    Files: [],
  });

  const id = `PostImages/${nanoid()}`;
  const reference = storage().ref(id);

  const {mutateAsync: PostFood, isPending} = useMutation({
    mutationKey: ['PostFood'],
    mutationFn: async () => {
      try {
        const pathToFile = files?.Files[0].uri;
      
          const response = await fetch(pathToFile);
          const blob = await response.blob();
          const ref = storage().ref().child(`/PostImages/${Date.now()}`);
  
          await ref.put(blob);

          const url = await ref.getDownloadURL();
          
          
          console.log(url);
          await firestore()
          .collection('Posts')
          .add({
            title: details.title,
            name: userData?.name,
            userId: user?.uid,
            price: details.price,
            description: details.description,
            servings: details.servings,
            imageUri: url,
          })
          .then(() => {
            console.log('User added!');
          }).catch(error => {
            console.log(error);
          })
       
      } catch (error) {
        console.log(error);
      }

    

      // const res = await fetch(`${BASE_URL}/transaction`,
      // {
      //   method:"POST",
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body:JSON.stringify({
      //     secret:secret,
      //     recieverPublicKey:recieverPublicKey.key,
      //     amount:"2"
      //   })
      // }
      // );
      // const jsonData = await res.json();
      // console.log(jsonData);
      // queryClient.invalidateQueries({
      //   queryKey:[`account-${publicKey}`]
      // })
      // return res
    },
  });
  const handleInputChange = (field: string, text: string) => {
    setDetails((prevDetails: any) => ({...prevDetails, [field]: text}));
  };
  return (
    <View style={[GlobalStyles.container]}>
      <ScrollView
        style={[
          GlobalStyles.container,
          {
            paddingHorizontal: moderateScale(15),
            paddingVertical: moderateScale(10),
          },
        ]}>
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
            paddingVertical: moderateScale(10),
            borderBottomWidth: 1,
          }}>
          <BigText
            style={{
              color: '#ffffff',
              fontSize: moderateScale(22),
              fontWeight: '600',
              alignSelf: 'center',
              fontFamily: 'serif',
            }}>
            UPLOAD YOUR DISH
          </BigText>
        </View>
        <View
          style={{
            paddingVertical: moderateScale(10),
            borderBottomWidth: 1,
            width: '100%',
            paddingHorizontal: moderateScale(10),
            backgroundColor: '#343030',
            borderRadius: moderateScale(10),
            rowGap: moderateScale(10),
          }}>
          <View
            style={{
              width: '100%',
            }}>
            <SmallText
              style={{
                color: '#ffffff',
                fontSize: moderateScale(15),
                fontWeight: '400',
              }}>
              Title
            </SmallText>
            <TextInput
              placeholder={'Title'}
              placeholderTextColor={'#ababab'}
              style={styles.input}
              onChangeText={text => handleInputChange('title', text)}
              value={details['title']}
            />
          </View>
          <View
            style={{
              width: '100%',
            }}>
            <SmallText
              style={{
                color: '#ffffff',
                fontSize: moderateScale(15),
                fontWeight: '400',
              }}>
              Price
            </SmallText>
            <TextInput
              placeholder={'(in Diams)'}
              placeholderTextColor={'#ababab'}
              style={styles.input}
              onChangeText={text => handleInputChange('price', text)}
              value={details['price']}
              keyboardType="numeric"
            />
          </View>
          <View
            style={{
              width: '100%',
            }}>
            <SmallText
              style={{
                color: '#ffffff',
                fontSize: moderateScale(15),
                fontWeight: '400',
              }}>
              Number of Servings
            </SmallText>
            <TextInput
              placeholder={'No. of Serves'}
              placeholderTextColor={'#ababab'}
              style={styles.input}
              onChangeText={text => handleInputChange('servings', text)}
              value={details['servings']}
              keyboardType="numeric"
            />
          </View>
          <View>
            <SmallText
              style={{
                color: '#ffffff',
                fontSize: moderateScale(15),
                fontWeight: '400',
              }}>
              Image
            </SmallText>
            <DocPicker setFormData={setFiles}></DocPicker>
          </View>
          <View
            style={{
              width: '100%',
            }}>
            <SmallText
              style={{
                color: '#ffffff',
                fontSize: moderateScale(15),
                fontWeight: '400',
              }}>
              Description
            </SmallText>
            <TextInput
              placeholder={'Ingridients, Combos, etc'}
              placeholderTextColor={'#ababab'}
              style={[styles.input, {height: moderateScale(100)}]}
              onChangeText={text => handleInputChange('description', text)}
              value={details['description']}
              multiline={true}
              numberOfLines={20}
              textAlign="left"
              textAlignVertical="top"
            />
          </View>
          <View>
            <CustomButton
              color="#000000"
              width={'100%'}
              height={moderateScale(45)}
              bgColor={COLORS.PRIMARY}
              fontSize={moderateScale(17)}
              text="Post"
              onPress={PostFood}
              disabled={isPending || !details.title || !details.description || !details.price || !details.servings || !files}
              isLoading={isPending}
              // styleProps={{
              //   opacity:
              //     isLoading || !values.email || !values.password ? 0.7 : 1,
              // }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  input: {
    fontSize: moderateScale(13),
    width: '100%',
    color: '#ffffff',
    backgroundColor: '#5D5A5A',
    paddingHorizontal: moderateScale(5),
    borderRadius: scale(10),
    height: moderateScale(42),
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
});
