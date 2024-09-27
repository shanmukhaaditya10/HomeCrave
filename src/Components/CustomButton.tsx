import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';

// Define the types for the props
interface CustomButtonProps {
  fontSize?: number;
  styleProps?: object; 
  color?: string;
  width?: number | string;
  height?: number;
  bgColor?: string;
  text: string;
  isLoading?: boolean;
  disabled?: boolean;
  [key: string]: any; }

const CustomButton: React.FC<CustomButtonProps> = ({
  fontSize,
  styleProps,
  color,
  width,
  height,
  bgColor,
  text,
  isLoading,
  disabled=true,
 ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          width,
          height,
          backgroundColor: bgColor,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: moderateScale(11),
          borderWidth: 1.5,
        },
        styleProps,
      ]}
      {...props}
      disabled={disabled}
    >
      <Text style={{ color, fontSize,fontWeight:'500' }}>{text}</Text>

      { isLoading && <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} >

      <ActivityIndicator color={"white"} ></ActivityIndicator>
      </View>}
    </TouchableOpacity>
  );
};

export default CustomButton;
