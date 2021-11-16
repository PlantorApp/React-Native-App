import React from 'react';
import { Box, HStack, View } from "native-base";
import { Button, Dimensions, Image, Pressable, ScrollView, Text, TouchableOpacity } from "react-native";
import Svg, { Line } from 'react-native-svg';
import { useFonts } from 'expo-font';

const NaturalLight = ({ navigation }) => {
  const [loaded] = useFonts({
    DMSerifText: require('../../assets/fonts/DMSerifText-Regular.ttf'),
    QuickSandBold: require('../../assets/fonts/Quicksand-Bold.ttf'),
    QuickSandRegular: require('../../assets/fonts/Quicksand-Regular.ttf')
  });

  if (!loaded) {
    return null;
  }
    
  return (
    <ScrollView>
      <View style={{ flex: 1, minHeight: Dimensions.get('window').height, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#FFFFFF', paddingTop: 60, paddingBottom: 28}}>
        <Box style={{width: Dimensions.get('window').width - 32}}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Svg style={{alignSelf: 'flex-end'}} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Line x1="8" y1="22.8787" x2="22.8492" y2="8.02944" stroke="#B7A878" strokeWidth="3" strokeLinecap="round"/>
              <Line x1="8.12132" y1="8" x2="22.9706" y2="22.8492" stroke="#B7A878" strokeWidth="3" strokeLinecap="round"/>
            </Svg>
          </TouchableOpacity>
          <HStack style={{marginTop: 12}}>
            <Box style={{flex: 1, height: 6, backgroundColor: '#B7A878', borderRadius: 7}}></Box>
            <Box style={{flex: 1, height: 6, backgroundColor: '#B7A878', marginLeft: 8, borderRadius: 7}}></Box>
            <Box style={{flex: 1, height: 6, backgroundColor: '#B7A878', marginLeft: 8, borderRadius: 7}}></Box>
            <Box style={{flex: 1, height: 6, backgroundColor: '#E3DECE', marginLeft: 8, borderRadius: 7}}></Box>
          </HStack>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{fontFamily: 'DMSerifText', color: '#827344', fontSize: 32, textAlign: 'center', marginTop: 40 }}>Please orient your phone towards the natural light source</Text>
            <Image source={require('../../assets/phoneOrientOne.png')} style={{marginTop: 24}} />
            {/* <Button title="OK, got it!" onPress={() => navigation.navigate('NaturalLightDirection')} /> */}
          </View>
        </Box>
        <Pressable style={{borderRadius: 50, borderWidth: 1, borderColor: '#DDDDDD', padding: 14, width: 270, backgroundColor: '#827344', position: 'absolute', bottom: 16}} onPress={() => navigation.navigate('NaturalLightDirection')}>
          <Text style={{fontFamily: 'QuickSandBold', fontSize: 20, color: '#FFFFFF', textAlign: 'center'}}>OK, got it!</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

export default NaturalLight