import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FoodCard from './FoodCard';
import {moderateScale} from 'react-native-size-matters';

const SectionScroller = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7];
  return (
    <View
      style={{
        width: '100%',
        overflow: 'scroll',
      }}>
      <FlatList
        data={arr}
        horizontal
        scrollEnabled
        renderItem={({item}) => (
          <View
            style={{
              paddingRight: moderateScale(10),
            }}>
            <FoodCard />
          </View>
        )}
       ></FlatList>
    </View>
  );
};

export default SectionScroller;

const styles = StyleSheet.create({});
