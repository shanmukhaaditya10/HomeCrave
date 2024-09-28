import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import GlobalStyles from '../constants/GlobalStyles';
import HomeHeader from '../Components/HomeHeader';
import {moderateScale} from 'react-native-size-matters';
import {SmallText} from '../Components/Wrappers/CustomText';
import SectionScroller from '../Components/SectionScroller';
import VerticalScroller from '../Components/VerticalScroller';
import useUser from '../ServerHooks/useUser';
import usePosts from '../ServerHooks/usePosts';
const Home = () => {
  const Main = () => {
    const {userData} = useUser();
  const {postData,isLoading:postsLoading} = usePosts()

    return (
      <TouchableWithoutFeedback
        style={[GlobalStyles.container]}
        onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={[GlobalStyles.container]}
          behavior="padding">
          <ScrollView>
            <HomeHeader />
            <View
              style={{
                paddingVertical: moderateScale(20),
                rowGap: moderateScale(15),
              }}>
              <View style={[styles.section]}>
                <SmallText
                  style={{
                    fontWeight: 'bold',
                    fontSize: moderateScale(17),
                    fontFamily: 'serif',
                    letterSpacing: moderateScale(0.1),
                    paddingHorizontal: moderateScale(10),
                    color: 'white',
                  }}>
                  From Top Sellers
                </SmallText>
                <SectionScroller postId={postData} />
              </View>
              <View style={[styles.section]}>
                <SmallText
                  style={{
                    fontWeight: 'bold',
                    fontSize: moderateScale(17),
                    fontFamily: 'serif',
                    letterSpacing: moderateScale(0.1),
                    paddingHorizontal: moderateScale(10),
                    color: 'white',
                  }}>
                  Recents
                </SmallText>
                <View
                style={{
                  paddingHorizontal: moderateScale(10),
                }}
                >

                <VerticalScroller />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <FlatList
      data={[]}
      renderItem={({item}) => <></>}
      ListHeaderComponent={<Main></Main>}></FlatList>
  );
};

export default Home;

const styles = StyleSheet.create({
  section: {
    width: '100%',
    rowGap: moderateScale(10),
    paddingHorizontal: moderateScale(5),
  },
});
