import React, { useState, useEffect } from 'react';
import { Box, HStack, View } from "native-base";
import { Dimensions, Pressable, ScrollView, Text, TouchableOpacity } from "react-native";
import { Magnetometer } from 'expo-sensors';
import Svg, { Line } from 'react-native-svg';
import { useFonts } from 'expo-font';

const round = (n) => {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}

const NaturalLightDirection = ({ navigation, route }) => {
  const [lightDirection, setLightDirection] = useState(" ");
  const [captured, setCaptured] = useState(" ");
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [subscription, setSubscription] = useState(null);
  const [bool, setBool] = useState(true);
  let timeout = false;
  let angle;

  const _slow = () => {
    Magnetometer.setUpdateInterval(500);
  };

  const _direction = (degree) => {
    if (degree >= 22.5 && degree < 67.5) {
      return 'NE';
    }
    else if (degree >= 67.5 && degree < 112.5) {
      return 'E';
    }
    else if (degree >= 112.5 && degree < 157.5) {
      return 'SE';
    }
    else if (degree >= 157.5 && degree < 202.5) {
      return 'S';
    }
    else if (degree >= 202.5 && degree < 247.5) {
      return 'SW';
    }
    else if (degree >= 247.5 && degree < 292.5) {
      return 'W';
    }
    else if (degree >= 292.5 && degree < 337.5) {
      return 'NW';
    }
    else {
      return 'N';
    }
  };

  const _angle = (magnetometer) => {
    if (magnetometer) {
      let {x, y, z} = magnetometer;
      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      }
      else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }
    let dir = _direction(Math.round(angle));
    setLightDirection(dir);
    if(timeout === true) {
      switch(dir) {
        case "N":
          setCaptured("North")
          break;
        case "NW":
          setCaptured("North West")
          break;
        case "W":
          setCaptured("West")
          break;
        case "SW":
          setCaptured("South West")
          break;
        case "S":
          setCaptured("South")
          break;
        case "SE":
          setCaptured("South East")
          break;
        case "E":
          setCaptured("East")
          break;
        case "NE":
          setCaptured("North East")
          break;
        default :
          setCaptured("No Magnetometer")
          break;
      }
      timeout = false
      setBool(false)
    }
  }

  const updateDirection = () => {
    setTimeout(() => {
      timeout = true;
    }, 3000)
  }

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener(result => {
        setData(result);
        _angle(result);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const { x, y, z } = data;
  
  useEffect(() => {
    updateDirection();
    _subscribe();
    _slow();
    return () => _unsubscribe();
  }, []);

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
              <Text style={{fontFamily: 'DMSerifText', color: '#827344', fontSize: 32, textAlign: 'center', marginTop: 40 }}>The direction of your light source is...</Text>
              <Text style={{fontFamily: 'DMSerifText', color: '#666666', fontSize: 64, marginTop: 96, textAlign: 'center'}}>{lightDirection}</Text>
              <Text style={{fontFamily: 'DMSerifText', color: '#666666', fontSize: 32, textAlign: 'center', marginTop: 12 }}>{captured}</Text>
            </View>
          </Box>
          <Pressable style={{borderRadius: 50, borderWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center', height: 48, width: 270, backgroundColor: bool ? '#E3DECE' : '#827344', position: 'absolute', bottom: 24}} disabled={bool} onPress={() => { navigation.navigate('PetFriendly', { outdoor: route.params.outdoor, city: route.params.city, temp: route.params.temp, date: route.params.date, lightDir: captured }) }} >
            <Text style={{fontFamily: 'QuickSandBold', fontSize: 20, color: '#FFFFFF', textAlign: 'center'}}>Save Measurement</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  )
}

export default NaturalLightDirection