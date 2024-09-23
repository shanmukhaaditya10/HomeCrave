import {StyleSheet, Text, TextStyle, View} from 'react-native';
import React from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import {scale} from 'react-native-size-matters';

export const SmallText = ({
  children,
  style,
}: {
  children?: React.ReactNode;
  style?: Partial<TextStyle>;
}) => {
  return <Text style={[GlobalStyles.text, style]}>{children}</Text>;
};
export const BigText = ({
  children,
  style,
}: {
  children?: React.ReactNode;
  style?: Partial<TextStyle>;
}) => {
  return <Text style={[GlobalStyles.BigText, style]}>{children}</Text>;
};
export const DynamicText = ({
  children,
  style,
  isLoading,
  width,
  height,
  borderRadius,
  highlightolor='#f0f0f0'
}: {
  children?: React.ReactNode;
  style?: Partial<TextStyle>;
  isLoading: boolean;
  width?: number;
  height?: number;
  borderRadius?: number;
  highlightolor?:string
}) => {
  return (
    <>
      {isLoading ? (
       <Text
         style={{color:"black"}}
       >Loading...</Text>
      ) : (
        <View>{children}</View>
      )}
    </>
  );
};

const styles = StyleSheet.create({});
