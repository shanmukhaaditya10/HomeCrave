import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FoodCard from './FoodCard';
import {moderateScale} from 'react-native-size-matters';
import usePosts from '../ServerHooks/usePosts';

const SectionScroller = ({postId}:{postId:string|number}) => {
  const {postData,isLoading:postsLoading} = usePosts()
  
  return (
    <View
      style={{
        width: '100%',
        overflow: 'scroll',
      }}>
      <FlatList
        data={postData}
        horizontal
        scrollEnabled
        renderItem={({item}) => (
          <View
            style={{
              paddingRight: moderateScale(10),
            }}>
            <FoodCard  postData={item} />
          </View>
        )}
       ></FlatList>
    </View>
  );
};

export default SectionScroller;

const styles = StyleSheet.create({});
