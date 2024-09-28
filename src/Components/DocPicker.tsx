import { Image, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import { scale } from 'react-native-size-matters';
import { isCancel, pick,types } from 'react-native-document-picker';
import { SmallText } from './Wrappers/CustomText';


interface DocumentPickerResult {
  uri: string;
}

const DocPicker = ({setFormData,styleProps}:{setFormData:any,styleProps?:StyleProp<ViewStyle>}) => {
  const [responses, setResponses] = useState<any>([]);
  const selectMultipleFiles = async () => {
    try {
      const results = await pick({
        allowMultiSelection: false,
        copyTo: "cachesDirectory",
        type: [types.images],
       
      })
      
      
       
      
      let selectedFiles: {name: string | null; uri: string | null; size: number | null; type: string | null}[] = [];
      results.forEach(result => {
        const {name, uri, size, type,fileCopyUri} = result;
        selectedFiles.push({name, uri:fileCopyUri, size, type});

      });
      setFormData((prev: any) => ({...prev, Files: selectedFiles}));
      
    } catch (err) {
      if (isCancel(err)) {
        console.log("User cancelled");
      } else {
        console.error(err);
      }
    }
  };
  
  
 

  return (
    <View>
      <TouchableOpacity
        onPress={selectMultipleFiles}
        style={[{
          backgroundColor: '#5D5A5A',
          borderRadius: scale(10),
          paddingHorizontal: scale(10),
          paddingVertical: scale(8),
          
        },styleProps]}
      >
        <SmallText
          style={{
            fontSize: scale(17),
            fontWeight: '600',
            color: '#ababab',
            textAlign: 'center',
          }}
        >
         +Upload Image
        </SmallText>
      </TouchableOpacity>
     
    </View>
  );
};

export default DocPicker;

const styles = StyleSheet.create({});
