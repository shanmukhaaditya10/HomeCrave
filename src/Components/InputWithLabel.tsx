import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { scale, moderateScale } from 'react-native-size-matters';
import Visible from '../Assets/Visible.svg';
import NotVisible from '../Assets/NotVisible.svg';

// Define the shape of the props
interface InputWithLabelProps {
  label: string;
  placeholder: string;
  field: string;
  isPassword?: boolean; 
  details: Record<string, string>; 
  setDetails: React.Dispatch<React.SetStateAction<{
    email: string;
    password: string;
}>>
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  placeholder,
  field,
  isPassword,
  details,
  setDetails,
 ...props
}) => {
  const handleInputChange = (field: string, text: string) => {
    setDetails((prevDetails) => ({...prevDetails, [field]: text }));
  };

  const [isVisible, setIsVisible] = useState<boolean>(true);

  return (
    <View style={inputStyles.container}>
      <Text style={inputStyles.label}>{label}</Text>
      <View style={inputStyles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={'#263238'}
          style={inputStyles.input}
          onChangeText={(text) => handleInputChange(field, text)}
          value={details[field]}
          secureTextEntry={isPassword && isVisible}
          autoCapitalize="none"
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 2,
              top: '50%',
              bottom: '50%',
              transform: [{ translateY: -15 }],
            }}
            onPressIn={() => setIsVisible(!isVisible)}
          >
            {!isVisible? (
              <NotVisible width={30} height={30} />
            ) : (
              <Visible width={30} height={30} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const inputStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: moderateScale(13),
    color: '#263238',
    fontWeight: 'bold',
    marginBottom: scale(5),
  },
  inputContainer: {
    position: 'relative',
    marginBottom: scale(10),
    height: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2E3192',
    borderRadius: scale(6),
  },
  input: {
    fontSize: moderateScale(15),
    width: '90%',
    color: 'black',
  },
});

export default InputWithLabel;
