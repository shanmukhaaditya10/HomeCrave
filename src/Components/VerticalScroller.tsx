import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FoodCard from './FoodCard';
import {moderateScale} from 'react-native-size-matters';
import LargeFoodCard from './LargeFoodCard';

const VerticalScroller = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7];
  return (
    <View
      style={{
        width: '100%',
        overflow: 'scroll',
      }}>
      <FlatList
        data={arr}
        scrollEnabled
        renderItem={({item}) => (
          <View
            style={{
                paddingBottom: moderateScale(25),

            }}>
            <LargeFoodCard />
          </View>
        )}
       ></FlatList>
    </View>
  );
};

export default VerticalScroller;

const styles = StyleSheet.create({});
