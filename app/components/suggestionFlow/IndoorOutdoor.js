import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Box, HStack } from 'native-base';
import Svg, { Line } from 'react-native-svg';
import { useFonts } from 'expo-font';

const IndoorOutdoor = ({ navigation }) => {
    const [indoor, setIndoor] = useState(false)
    const [outdoor, setOutdoor] = useState(false)

    const [loaded] = useFonts({
      DMSerifText: require('../../assets/fonts/dmseriftext-regular.ttf'),
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
          <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontFamily: 'DMSerifText', color: '#827344', fontSize: 32, textAlign: 'center', marginTop: 12 }}>Will the plant be growing indoor or outdoor?</Text>
            <HStack style={{marginTop: 78}}>
              <TouchableOpacity style={{flex: 1, height: 204, backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, marginRight: 8, borderColor: '#DDDDDD', shadowColor: '#000000', shadowOffset: {width: 2, height: 2}, shadowOpacity: 0.12, shadowRadius: 8}} onPress={() => { setIndoor(true); setOutdoor(false); navigation.navigate('Temperature', { indoor: true }); }}>
                <Box style={{justifyContent: 'center', alignItems: 'center', height: 156, backgroundColor: '#FCFAF7', borderTopLeftRadius: 12, borderTopRightRadius: 12}}>
                  <Image style={{width: 86, height: 86}} source={require('../../assets/illusIndoor.png')} />
                </Box>
                <Box style={{height: 48, justifyContent: 'center'}}>
                  <Text style={{fontFamily: 'QuickSandBold', fontWeight: 'normal', textAlign: 'center', fontSize: 20, color: '#666666'}}>Indoor</Text>
                </Box>
              </TouchableOpacity>
              <TouchableOpacity style={{flex: 1, height: 204, backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, marginLeft: 8, borderColor: '#DDDDDD', shadowColor: '#000000', shadowOffset: {width: 2, height: 2}, shadowOpacity: 0.12, shadowRadius: 8}} onPress={() => { setIndoor(false); setOutdoor(true); navigation.navigate('UserLocation', { outdoor: true }); }}>
                <Box style={{justifyContent: 'center', alignItems: 'center', height: 156, backgroundColor: '#FCFAF7', borderTopLeftRadius: 12, borderTopRightRadius: 12}}>
                  <Image style={{width: 86, height: 86}} source={require('../../assets/illusOutdoor.png')} />
                </Box>
                <Box style={{height: 48, justifyContent: 'center'}}>
                  <Text style={{fontFamily: 'QuickSandBold', fontWeight: 'normal', textAlign: 'center', fontSize: 20, color: '#666666'}}>Outdoor</Text>
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

export default IndoorOutdoor