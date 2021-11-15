import React, { useEffect, useState } from 'react';
import { View } from "native-base";
import { Text, Button, Image } from 'react-native';

const images = {
  Clear: 'http://ayay.co.uk/mobiles/weather/strange/northern-lights.jpg',
  Clouds:
    'https://www.princeton.edu/sites/default/files/styles/full_2x/public/images/2018/01/clouds-19.jpg?itok=7jputHX1',
  Rain: 'https://i.pinimg.com/736x/54/59/d7/5459d741279e8d72661990f52774473f--cell-phone-wallpapers-gif-photos.jpg'
}

const Climate = ({ navigation, route }) => {
  const [temp, setTemp] = useState('')
  const [weather, setWeather] = useState('')

  const city = route.params.address;
  let today = new Date();

  // Get season
  var seasonArray = [
    {name: 'Spring', date: new Date(today.getFullYear(),2,(today.getFullYear() % 4 === 0) ? 19 : 20).getTime()},
    {name: 'Summer', date: new Date(today.getFullYear(),5,(today.getFullYear() % 4 === 0) ? 20 : 21).getTime()},
    {name: 'Fall', date: new Date(today.getFullYear(),8,(today.getFullYear() % 4 === 0) ? 22 : 23).getTime()},
    {name: 'Winter', date: new Date(today.getFullYear(),11,(today.getFullYear() % 4 === 0) ? 20 : 21).getTime()}
];

const season = seasonArray.filter(({ date }) => date <= today).slice(-1)[0] || {name: "Winter"}
// console.log(new Date(today).toLocaleDateString(), season.name); 
  fetchData = () => {
    fetchCityData(city)
  }

  fetchCityData = async (city) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0b7450916cb8baf57718f05e386d0379&units=metric`
    const api_call = await fetch(url)

    const response = await api_call.json()
    // console.log('response', response)

    setTemp(response.main.temp)
    setWeather(response.weather[0].main)
  }

  useEffect(() => {
    fetchData();
  })

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{ uri: images[weather] }} style={{position: 'absolute', height: '100%', width: '100%'}} />
      <Text>Climate information of {city}</Text>
      <Text>{weather}</Text>
      <Text>{temp} °C</Text>
      <Text style={{marginTop: 24, marginBottom: 24}}>{season.name}</Text>
      <Button title="Next" onPress={() => navigation.navigate('NaturalLight')} />
    </View>
  )
}

export default Climate