import React from 'react';
import { Box, HStack, View } from "native-base";
import { Dimensions, Image, Pressable, ScrollView, Text, TouchableOpacity } from "react-native";
import Svg, { Line } from 'react-native-svg';
import { useFonts } from 'expo-font';

const NaturalLight = ({ navigation, route }) => {
  const [loaded] = useFonts({
    DMSerifText: require('../../assets/fonts/DMSerifText-Regular.ttf'),
    QuickSandBold: require('../../assets/fonts/Quicksand-Bold.ttf'),
    QuickSandRegular: require('../../assets/fonts/Quicksand-Regular.ttf')
  });

  if (!loaded) {
    return null;
  }
    
  return (
    <View style={{backgroundColor: "#FCFAF7"}}>
      <Box style={{position: 'absolute', top: 40, right: 16, zIndex: 10}}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Svg style={{alignSelf: 'flex-end'}} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Line x1="8" y1="22.8787" x2="22.8492" y2="8.02944" stroke="#B7A878" strokeWidth="3" strokeLinecap="round"/>
            <Line x1="8.12132" y1="8" x2="22.9706" y2="22.8492" stroke="#B7A878" strokeWidth="3" strokeLinecap="round"/>
          </Svg>
        </TouchableOpacity>
      </Box>
      <ScrollView>
        <View style={{ flex: 1, minHeight: Dimensions.get('window').height, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#FCFAF7', paddingTop: 88, paddingBottom: 28}}>
          <Box style={{width: Dimensions.get('window').width - 32}}>
            <HStack style={{marginTop: 12}}>
              <Box style={{flex: 1, height: 6, backgroundColor: '#B7A878', borderRadius: 7}}></Box>
              <Box style={{flex: 1, height: 6, backgroundColor: '#B7A878', marginLeft: 8, borderRadius: 7}}></Box>
              <Box style={{flex: 1, height: 6, backgroundColor: '#B7A878', marginLeft: 8, borderRadius: 7}}></Box>
              <Box style={{flex: 1, height: 6, backgroundColor: '#E3DECE', marginLeft: 8, borderRadius: 7}}></Box>
            </HStack>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{fontFamily: 'DMSerifText', color: '#827344', fontSize: 32, textAlign: 'center', marginTop: 40 }}>Please orient your phone towards the natural light source</Text>
              <Image source={require('../../assets/phoneOrient.gif')} style={{marginTop: 24}} alt="phone orient" />
            </View>
          </Box>
          <Pressable style={{borderRadius: 50, borderWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center', height: 48, width: 270, backgroundColor: '#827344', position: 'absolute', bottom: 24}} android_ripple={{color: '#DDDDDD', radius:4, foreground: true}} onPress={() => navigation.navigate('NaturalLightDirection', {outdoor: route.params.outdoor, city: route.params.city, temp: route.params.temp, date: route.params.date})}>
            <Text style={{fontFamily: 'QuickSandBold', fontWeight: 'normal', fontSize: 20, lineHeight: 24, color: '#FFFFFF', textAlign: 'center'}}>OK, got it!</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  )
}

export default NaturalLight