import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, ScrollView, Dimensions, Pressable, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import Svg, { Line } from 'react-native-svg';
import { Box, HStack } from 'native-base';
import { useFonts } from 'expo-font';
import uuid from 'react-native-uuid';


const EnvironmentName = ({ navigation, route, loggedInUser}) => {
    // console.log("in env name", loggedInUser)
    const currentEnvironment = route.params;
    const [text, setText] = useState(currentEnvironment.title ? currentEnvironment.title : "garden...");
    const [bool, setBool] = useState(true);
    // console.log("env object ", currentEnvironment)
    const [header,setHeader] = useState(currentEnvironment.title ? "Rename Environment" : "Name your new environment...")
    
    const handlePress = async () => {

        

        const environmentToSave = {
            id: currentEnvironment.id ? currentEnvironment.id : uuid.v4(),
            title : text,
            outdoor : currentEnvironment.outdoor,
            city : currentEnvironment.city,
            temp : currentEnvironment.temp,
            date : currentEnvironment.date,
            season : currentEnvironment.season,
            cityLightingDuration : currentEnvironment.cityLightingDuration,
            petFriendly : currentEnvironment.petFriendly
        }

        // console.log("before uodate : ", loggedInUser)
        
        const index = loggedInUser.savedEnvironments.findIndex((el) => el.id === currentEnvironment.id)
        console.log("index is : ", index)
        if(index >= 0){
            loggedInUser.savedEnvironments.splice(index,1,environmentToSave)
        }else{
            loggedInUser.savedEnvironments.push(environmentToSave)
        }

        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ savedEnvironments: loggedInUser.savedEnvironments }),
        };
        const response2 = await fetch(`https://app.plantor.app/backend-users/users/${loggedInUser.sub}`,
        // const response2 = await fetch(`http://192.168.0.18:3003/users/${loggedInUser.sub}`,
          requestOptions
        );
        const data2 = await response2.json();
        // console.log("after update: ", data2)
        navigation.goBack()
      }

      useEffect(() => {
        if(text) {
          if (text.length > 0) {
            setBool(false)
          } else {
            setBool(true)
          }
        }
      }, [text]);
  

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
              <Box style={{flex: 1, height: 6, backgroundColor: '#E3DECE', marginLeft: 8, borderRadius: 7}}></Box>
              <Box style={{flex: 1, height: 6, backgroundColor: '#E3DECE', marginLeft: 8, borderRadius: 7}}></Box>
              <Box style={{flex: 1, height: 6, backgroundColor: '#E3DECE', marginLeft: 8, borderRadius: 7}}></Box>
            </HStack>
            <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 36}}>
              <Text style={{fontFamily: 'DMSerifText', color: '#827344', fontSize: 32, textAlign: 'center', marginTop: 12 }}>{header}</Text>
              <TextInput
                style={{fontFamily: 'DMSerifText', color: '#666666', fontSize: 50, marginTop: 90, padding: 10, textAlign: 'center', borderBottomColor: '#BBBBBB', borderBottomWidth: 1 }}
                onChangeText={text => setText(text)}
                placeholder="Name"
                value = {text}
              />
            </View>
          </Box>
         
          <Pressable style={{borderRadius: 50, borderWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center', height: 48, width: 270, backgroundColor: bool ? '#E3DECE' : "#827344", position: 'absolute', bottom: 24}} disabled={bool} onPress={handlePress}>
            <Text style={{fontFamily: 'QuickSandBold', fontWeight: 'normal', fontSize: 20, lineHeight: 24, color: '#FFFFFF', textAlign: 'center'}}>Save Environment</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  )
}

export default EnvironmentName

