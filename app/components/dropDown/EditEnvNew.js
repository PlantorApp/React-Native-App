import React, { useRef } from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import Svg, { Circle } from 'react-native-svg';

const EditEnvNew = () => {
  let actionSheet = useRef();
  var optionArray = ['Rename', 'Delete', 'Cancel'];

  const showActionSheet = () => {
    //To show the Bottom ActionSheet
    actionSheet.current.show();
  };

  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity onPress={showActionSheet}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Circle cx="12" cy="6" r="1.5" fill="#666666"/>
            <Circle cx="12" cy="12" r="1.5" fill="#666666"/>
            <Circle cx="12" cy="18" r="1.5" fill="#666666"/>
          </Svg>
        </TouchableOpacity>
        <ActionSheet
          ref={actionSheet}
          // Title of the Bottom Sheet
          // title={'Which one do you like ?'}
          // Options Array to show in bottom sheet
          options={optionArray}
          // Define cancel button index in the option array
          // This will take the cancel option in bottom
          // and will highlight it
          cancelButtonIndex={2}
          // Highlight any specific option
          destructiveButtonIndex={1}
          onPress={(index) => {
            // Clicking on the option will give you alert
            // if(index === 1) alert(optionArray[index]);
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export default EditEnvNew;
