import React, { useState } from 'react';
import { Text, View, HStack, Box } from "native-base";
import { TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { useFonts } from 'expo-font';

const PetFriendly = ({ navigation, route }) => {
  const [friendly, setFriendly] = useState(false);

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
              <Box style={{flex: 1, height: 6, backgroundColor: '#B7A878', marginLeft: 8, borderRadius: 7}}></Box>
            </HStack>
            <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontFamily: 'DMSerifText', color: '#827344', fontSize: 32, textAlign: 'center', marginTop: 40, lineHeight: 38 }}>Would you like us to suggest only pet friendly plants?</Text>
              <HStack style={{marginTop: 78}}>
                <TouchableOpacity style={{flex: 1, height: 204, backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, marginRight: 8, borderColor: '#DDDDDD', shadowColor: '#000000', shadowOffset: { width: 2, height: 2}, shadowOpacity: 0.12, elevation: 8}} onPress={() => { setFriendly(true); navigation.navigate('Suggestions', {outdoor: route.params.outdoor, city: route.params.city, temp: route.params.temp, date: route.params.date, lightDir: route.params.lightDir, petFriendly: true});}}>
                  <Box style={{justifyContent: 'center', alignItems: 'center', height: 156, backgroundColor: '#FCFAF7', borderTopLeftRadius: 12, borderTopRightRadius: 12}}>
                    <Image style={{width: 86, height: 86}} source={require('../../assets/illusPets.png')} />
                  </Box>
                  <Box style={{height: 48, justifyContent: 'center'}}>
                    <Text style={{fontFamily: 'QuickSandBold', fontWeight: 'normal', textAlign: 'center', fontSize: 20, color: '#666666'}}>Yes please!</Text>
                  </Box>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1, height: 204, backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, marginLeft: 8, borderColor: '#DDDDDD', shadowColor: '#000000', shadowOffset: { width: 2, height: 2}, shadowOpacity: 0.12, elevation: 8}} onPress={() => { setFriendly(false); navigation.navigate('Suggestions', {outdoor: route.params.outdoor, city: route.params.city, temp: route.params.temp, date: route.params.date, season: route.params.season ,lightDir: route.params.lightDir, petFriendly: false});}}>
                  <Box style={{justifyContent: 'center', alignItems: 'center', height: 156, backgroundColor: '#FCFAF7', borderTopLeftRadius: 12, borderTopRightRadius: 12}}>
                    <Image style={{width: 86, height: 86}} source={require('../../assets/illusNoPets.png')} />
                  </Box>
                  <Box style={{height: 48, justifyContent: 'center'}}>
                    <Text style={{fontFamily: 'QuickSandBold', fontWeight: 'normal', textAlign: 'center', fontSize: 20, color: '#666666'}}>No thanks</Text>
                  </Box>
                </TouchableOpacity>
              </HStack>
            </View>
          </Box>
        </View>
      </ScrollView>
    </View>
  )
}

export default PetFriendly