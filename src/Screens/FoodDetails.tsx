import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import GlobalStyles from '../constants/GlobalStyles';
import {moderateScale} from 'react-native-size-matters';
import {BigText, SmallText} from '../Components/Wrappers/CustomText';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';
import COLORS from '../constants/colors';
import CustomButton from '../Components/CustomButton';
import { useRoute } from '@react-navigation/native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import OrderModal from '../Components/OrderModal';
const FoodDetails = () => {
  const route = useRoute<NativeStackNavigatorProps>()
  const {postData} = route.params
  const [modalVisible, setModalVisible] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1)
  return (
    <TouchableWithoutFeedback
      style={[GlobalStyles.container]}
      onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={[GlobalStyles.container]} behavior="padding">
        <ScrollView>
          <View
            style={{
              width: '100%',
              height: moderateScale(250),
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: 'white',
              backgroundColor: 'white',
            }}>
            <Image
              source={{uri: postData?.imageUri}}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                aspectRatio: 16 / 9,
              }}
            />
          </View>
          <View
            style={{
              paddingHorizontal: moderateScale(15),
              paddingVertical: moderateScale(10),
            }}>
            <View>
              <BigText
                style={{
                  fontSize: moderateScale(30),
                  fontFamily: 'serif',
                }}>
                {postData?.title}
              </BigText>
              <SmallText
                style={{
                  fontSize: moderateScale(13),
                  color: '#a4a4a4',
                }}>
                By{' '}
                <SmallText
                  style={{
                    fontSize: moderateScale(13),
                    color: '#b0b0b0',
                    fontWeight: 'bold',
                    textDecorationLine: 'underline',
                  }}>
                  {postData?.name}
                </SmallText>
              </SmallText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: moderateScale(5),
                borderBottomWidth: 1,
                borderColor: '#5b5b5b',
                marginHorizontal: moderateScale(7),
                columnGap: moderateScale(10),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: moderateScale(10),
                  columnGap: moderateScale(2),
                }}>
                <View>
                  <Icon
                    name="time-outline"
                    size={moderateScale(20)}
                    color={COLORS.PRIMARY}
                  />
                </View>
                <SmallText
                  style={{
                    fontSize: moderateScale(13),
                  }}>
                  25min
                </SmallText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: moderateScale(10),
                  columnGap: moderateScale(2),
                  // borderColor: COLORS.PRIMARY,
                  // borderWidth:1,
                  // borderRadius:moderateScale(10)
                }}>
                <View>
                  <Icon2
                    name="bowl"
                    size={moderateScale(17)}
                    color={COLORS.PRIMARY}
                  />
                </View>
                <SmallText
                  style={{
                    fontSize: moderateScale(13),
                  }}>
                  {postData?.servings} Servings
                </SmallText>
              </View>
            </View>
            <View
           >
              <BigText
                style={{
                  fontSize: moderateScale(22),
                  fontFamily: 'serif',
                }}>
                Description
              </BigText>
              <SmallText
                style={{
                  fontSize: moderateScale(13),
                  color: '#b0b0b0',
                }}>
                {postData?.description}
              </SmallText>
            </View>
          
          </View>
        </ScrollView>
        <View
              style={{
                width: '100%',
                position: 'absolute',
                bottom: 20,
                paddingHorizontal: moderateScale(15),
               
              }}>
              <CustomButton
                color="#000000"
                width={'100%'}
                height={moderateScale(45)}
                bgColor={COLORS.PRIMARY}
                fontSize={moderateScale(17)}
                text="Order Now"
                disabled={false}
                onPress={() => setModalVisible(true)}
                // disabled={isLoading || !values.email || !values.password || !values.secretKey}
                // isLoading={isLoading}
                // styleProps={{
                //   opacity:
                //     isLoading || !values.email || !values.password ? 0.7 : 1,
                // }}
              />
            </View>
            <OrderModal isVisible={modalVisible} setIsVisible={setModalVisible} quantity={quantity} setQuantity={setQuantity}  servings={postData?.servings} price={postData?.price} postData={postData} />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default FoodDetails;

const styles = StyleSheet.create({});
