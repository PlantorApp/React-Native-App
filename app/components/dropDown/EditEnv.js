import React from "react";
import { Divider, Actionsheet, useDisclose } from "native-base";
import { useFonts } from 'expo-font';
import Svg, { Circle } from "react-native-svg";
import { TouchableOpacity } from "react-native";

const EditEnv = () => {
  const { isOpen, onOpen, onClose } = useDisclose()

  const [loaded] = useFonts({
    DMSerifText: require('../../assets/fonts/DMSerifText-Regular.ttf'),
    QuickSandBold: require('../../assets/fonts/Quicksand-Bold.ttf')
  });

  if (!loaded) {
    return null;
  }

  return (
    <>
      <TouchableOpacity onPress={onOpen} style={{marginTop: 8}}>
        <Svg width="24" height="24" viewBox="0 -1 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Circle cx="12" cy="6" r="1.5" fill="#666666"/>
          <Circle cx="12" cy="12" r="1.5" fill="#666666"/>
          <Circle cx="12" cy="18" r="1.5" fill="#666666"/>
        </Svg>
      </TouchableOpacity>
      <Actionsheet isOpen={isOpen} onClose={onClose} style={{fontFamily: 'QuickSandBold', fontWeight: 'bold'}}>
        <Actionsheet.Content>
          <Actionsheet.Item style={{justifyContent: "center", fontFamily: 'QuickSandBold', fontWeight: 'bold'}}>
            Rename Environment
          </Actionsheet.Item>
          <Divider borderColor="gray.300" />
          <Actionsheet.Item style={{justifyContent: "center", fontFamily: 'QuickSandBold', fontWeight: 'normal'}}>
            Delete Environment
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  )
}

export default EditEnv;
