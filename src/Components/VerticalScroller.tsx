import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FoodCard from './FoodCard';
import {moderateScale} from 'react-native-size-matters';
import LargeFoodCard from './LargeFoodCard';
import usePosts from '../ServerHooks/usePosts';

const VerticalScroller = () => {
  const {postData,isLoading:postsLoading} = usePosts()
  return (
    <View
      style={{
        width: '100%',
        overflow: 'scroll',
      }}>
      <FlatList
        data={postData}
        scrollEnabled
        renderItem={({item}) => (
          <View
            style={{
                paddingBottom: moderateScale(25),

            }}>
            <LargeFoodCard postData={item} />
          </View>
        )}
       ></FlatList>
    </View>
  );
};

export default VerticalScroller;

const styles = StyleSheet.create({});
