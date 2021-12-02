import React, { useEffect, useState } from 'react';
import { Box, HStack, View } from "native-base";
import { Text, Image, ScrollView, Dimensions, Pressable, TouchableOpacity } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { useFonts } from 'expo-font';

const images = {
  Clear: require('../../assets/clear.gif'),
  Clouds: require('../../assets/cloud.gif'),
  Rain: require('../../assets/rain.gif'),
  Snow: require('../../assets/snow.gif')
}

const Climate = ({ navigation, route }) => {
  const [temp, setTemp] = useState('')
  const [weather, setWeather] = useState('')
  const [headerText, setHeaderText] = useState('Climate information of')

  const city = route.params.address;
  const cityWithCountryCode = route.params.cityWithCountryCode;
  const today = new Date();
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const curMonth = month[today.getMonth()];

  // Get season
  var seasonArray = [
    {name: 'Spring', date: new Date(today.getFullYear(),2,(today.getFullYear() % 4 === 0) ? 19 : 20).getTime()},
    {name: 'Summer', date: new Date(today.getFullYear(),5,(today.getFullYear() % 4 === 0) ? 20 : 21).getTime()},
    {name: 'Fall', date: new Date(today.getFullYear(),8,(today.getFullYear() % 4 === 0) ? 22 : 23).getTime()},
    {name: 'Winter', date: new Date(today.getFullYear(),11,(today.getFullYear() % 4 === 0) ? 20 : 21).getTime()}
  ];

  const season = seasonArray.filter(({ date }) => date <= today).slice(-1)[0] || {name: "Winter"}
  // console.log(new Date(today).toLocaleDateString(), season.name); 
  
  const fetchData = () => {
    fetchCityData(cityWithCountryCode)
  }
  
  const fetchCityData = async (city) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0b7450916cb8baf57718f05e386d0379&units=metric`
    const api_call = await fetch(url)

    const response = await api_call.json()
    // console.log('response', response)

    setTemp(parseInt(response.main.temp))
    setWeather(response.weather[0].main)
    if(response.weather[0].main === "Clouds") {
      setHeaderText("Sky is cloudy")
    } else if(response.weather[0].main === "Rain") {
      setHeaderText("Currently raining")
    } else if(response.weather[0].main === "Clear") {
      setHeaderText("Sky is clear")
    } else if(response.weather[0].main === "Snow") {
      setHeaderText("Currently snowing")
    } else {
      setHeaderText("Climate information of")
    }
  }

  useEffect(() => {
    fetchData();
  })

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
          <Image source={ images[weather] } style={{position: 'absolute', top: 60, left: 0, height: '100%', width: '100%'}} />
          <Box style={{width: Dimensions.get('window').width - 32}}>
            <HStack style={{marginTop: 12}}>
              <Box style={{flex: 1, height: 6, backgroundColor: '#B7A878', borderRadius: 7}}></Box>
              <Box style={{flex: 1, height: 6, backgroundColor: '#B7A878', marginLeft: 8, borderRadius: 7}}></Box>
              <Box style={{flex: 1, height: 6, backgroundColor: '#E3DECE', marginLeft: 8, borderRadius: 7}}></Box>
              <Box style={{flex: 1, height: 6, backgroundColor: '#E3DECE', marginLeft: 8, borderRadius: 7}}></Box>
            </HStack>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{fontFamily: 'DMSerifText', color: '#827344', fontSize: 32, textAlign: 'center', marginTop: 40 }}>{headerText} in {city}</Text>
              <Text style={{fontFamily: 'DMSerifText', color: '#666666', fontSize: 64, marginTop: 96, textAlign: 'center'}}>{temp} °C</Text>
              <Text style={{fontFamily: 'DMSerifText', color: '#666666', fontSize: 32, textAlign: 'center', marginTop: 12 }}>{season.name}</Text>
            </View>
          </Box>
          <Pressable style={{borderRadius: 50, borderWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center', height: 48, width: 270, backgroundColor: '#827344', position: 'absolute', bottom: 24}} android_ripple={{color: '#DDDDDD', radius:4, foreground: true}} onPress={() => navigation.navigate('NaturalLight', {city: city, outdoor: route.params.outdoor, temp: temp, date: curMonth})}>
            <Text style={{fontFamily: 'QuickSandBold', fontWeight: 'normal', fontSize: 20, lineHeight: 24, color: '#FFFFFF', textAlign: 'center'}}>Next</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  )
}

export default Climate