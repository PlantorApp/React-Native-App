import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, Image, ScrollView } from 'react-native';
import { Box } from 'native-base';
import { useFonts } from 'expo-font';
import { Audio } from 'expo-av';

const Completion = ({ navigation, route }) => {
  const [sound, setSound] = useState()

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require('../../assets/flowCompletion.mp3'))
    setSound(sound)
    await sound.playAsync()
    setTimeout(function() {navigation.navigate('Suggestions', {outdoor: route.params.outdoor, city: route.params.city, temp: route.params.temp, date: route.params.date, lightDir: route.params.lightDir, petFriendly: route.params.petFriendly})}, 3000)
  }

  useEffect(() => {
    playSound()
    return ( sound ? (
      () => { 
        sound.unloadAsync();
      }) : undefined )
  }, [])

  const [loaded] = useFonts({
    DMSerifText: require('../../assets/fonts/DMSerifText-Regular.ttf')
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={{backgroundColor: "#FCFAF7"}}>
      <ScrollView>
        <View style={{ flex: 1, minHeight: Dimensions.get('window').height, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#FCFAF7', paddingTop: 88, paddingBottom: 28}}>
          <Box style={{width: Dimensions.get('window').width - 32}}>
            <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontFamily: 'DMSerifText', color: '#827344', fontSize: 32, textAlign: 'center', marginTop: 12 }}>Completed!</Text>
              <Text style={{fontFamily: 'DMSerifText', color: '#827344', fontSize: 32, textAlign: 'center', marginTop: 12 }}>Getting Suggestions...</Text>
              <Image style={{marginTop: 32}} source={require('../../assets/flowCompletion.gif')} alt="animated logo" />
            </View>
          </Box>
        </View>
      </ScrollView>
    </View>
  )
}

export default Completion