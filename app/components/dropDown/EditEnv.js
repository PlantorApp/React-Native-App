import React from "react";
import { Divider, Actionsheet, useDisclose } from "native-base";
import { useFonts } from 'expo-font';
import { AntDesign} from '@expo/vector-icons';

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
      {/* <Button onPress={onOpen}>Actionsheet</Button> */}
      <AntDesign name="ellipsis1" size={24} color="black" onPress={onOpen}/>

      <Actionsheet isOpen={isOpen} onClose={onClose} style={{fontFamily: 'QuickSandBold'}}>
        <Actionsheet.Content>
          <Actionsheet.Item style={{ justifyContent: "center", fontFamily: 'QuickSandBold' }}>
            Rename Environment
          </Actionsheet.Item>
          <Divider borderColor="gray.300" />
          <Actionsheet.Item style={{ justifyContent: "center", fontFamily: 'QuickSandBold' }}>
            Delete Environment
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  )
}

export default EditEnv;
