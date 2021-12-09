import { useFonts } from "expo-font";
import { Box, HStack, Stack } from "native-base";
import React, { useEffect, useState } from "react";
import { Text, View, Image, Pressable, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Svg, { Circle, Line, Path } from "react-native-svg";
import uuid from 'react-native-uuid';

const Suggestions = ({ navigation, route, loggedInUser, setEnvList }) => {
  const [entries, setEntries] = useState([])
  const [Cities, setCities] = useState([])
  const [callFetch, setCallFetch] = useState(true);
  let carousel;
  const alreadySaved = route.params.alreadySaved ? route.params.alreadySaved : false;
  const outdoor = route.params.outdoor;
  const city = route.params.city;
  const temp = route.params.temp;
  const date = route.params.date;
  const season = route.params.season;
  const cityLightingDuration = Cities.length > 0 && Cities.filter(el => el.location === city).filter(el => el.month === date)[0].dayLight;
  const petFriendly = route.params.petFriendly;
  let lightDirLighting;

  switch(route.params.lightDir) {
    case "North":
      lightDirLighting = "North"
      break;
    case "North West":
      lightDirLighting = "North West"
      break;
    case "West":
      lightDirLighting = "West"
      break;
    case "South West":
      lightDirLighting = "South West"
      break;
    case "South":
      lightDirLighting = "South"
      break;
    case "South East":
      lightDirLighting = "South East"
      break;
    case "East":
      lightDirLighting = "East"
      break;
    case "North East":
      lightDirLighting = "North East"
      break;
    default :
      lightDirLighting = "No Magnetometer"
      break;
  } 

  let yourPlants = [];
  if(outdoor) {
    entries.forEach((plant) => {
      if(plant.startSeason.includes(date)) {
        if(plant.temperatureMinimum < temp && plant.temperatureMaximum > temp) {
          if(parseInt(plant.lightingDurationMaximum) < parseInt(cityLightingDuration)) {
            if(plant.petFriendly === petFriendly) {
              // if(plant.lightingRequirement === lightDirLighting) {
                yourPlants.push(plant)
              // }
            }
          }
        }
      }  
    })
  } else {
    /*
    Code for indoor
    breaks into 2 cases again natural light or artificial light
    */
  }

  const envToSave = {
    outdoor : outdoor,
    city : city,
    temp : temp,
    date : date,
    cityLightingDuration : cityLightingDuration,
    petFriendly : petFriendly,
    lightDirLighting : lightDirLighting
  }
  
  const [activeIndex, setActiveIndex] = useState(0)

  const fetchData = () => {
    if(callFetch) {
      fetchCityDate();
      fetchPlantsData();
      setCallFetch(false);
    }
  }
  
  const fetchCityDate = async () => {
    const url = 'https://app.plantor.app/backend-cities/cities'
    const api_call = await fetch(url);
    const response = await api_call.json();
    setCities(response);
  }
  
  const fetchPlantsData = async () => {
    const url = 'https://app.plantor.app/backend-plants/plants'
    const api_call = await fetch(url);
    const response = await api_call.json();
    setEntries(response);
  }

  useEffect(() => {
    fetchData();
  }, [])

  const [loaded] = useFonts({
    DMSerifText: require('../../assets/fonts/DMSerifText-Regular.ttf'),
    QuickSandBold: require('../../assets/fonts/Quicksand-Bold.ttf'),
    QuickSandRegular: require('../../assets/fonts/Quicksand-Regular.ttf')
  });

  if (!loaded) {
    return null;
  }

  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity style={{paddingBottom: 16}} onPress={() => {navigation.navigate('PlantDetail', {plant: item})}}>
        <View style={{borderRadius: 20, height: 356, width: 270, marginLeft: 32, marginRight: 32, marginTop: 18, backgroundColor: '#FFFFFF', shadowColor: '#000000', shadowOffset: { width: 2, height: 2}, shadowOpacity: 0.12, elevation: 8}}>
          <Box style={{backgroundColor: '#FCFAF7', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
            <Image source={{uri: item.image}} style={{width: 230, height: 199, margin: 20}} alt={item.plantName} />
          </Box>
          <Text style={{fontFamily: 'QuickSandBold', fontWeight: 'normal', fontSize: 20, marginLeft: 20, lineHeight: 28, marginTop: 12, color: '#827344'}}>{item.plantName}</Text>
          <Stack style={{marginLeft: 20}}>
              <HStack style={{marginTop: 8}}>
                <Svg width="22" height="22" viewBox="0 3 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M6.53955 12.6523H3V18.9449H6.53955V12.6523Z" stroke="#B7A878" strokeWidth="1.25" strokeMiterlimit="10" strokeLinejoin="round"/>
                  <Path d="M12.7974 8.71875H9.25781V18.9441H12.7974V8.71875Z" stroke="#B7A878" strokeWidth="1.25" strokeMiterlimit="10" strokeLinejoin="round"/>
                  <Path d="M19.0005 4H15.4609V18.9435H19.0005V4Z" fill="white" stroke="#B7A878" strokeWidth="1.25" strokeMiterlimit="10" strokeLinejoin="round"/>
                </Svg>
                <Text style={{marginLeft: 4, fontFamily: 'QuickSandRegular', fontSize: 14, color: '#666666'}}>
                  {item.difficulty}
                </Text>
                <Svg style={{marginLeft: 20}} width="22" height="22" viewBox="0 3 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M3.07076 11.7405C3.16654 11.285 3.32687 10.8712 3.68814 10.5769C4.2545 10.1172 5.204 9.96333 5.89633 9.73039C6.80731 9.41843 6.95827 8.62915 7.89527 8.41077C8.96865 8.16016 9.96708 8.54804 10.8937 9.00767C12.2471 9.67736 12.9155 10.6143 13.4964 12.0556C13.7786 12.7565 13.7047 13.7735 13.3143 14.4224C12.9748 14.9881 12.4543 15.4768 12.1492 16.0623C11.8931 16.5531 11.9108 17.3185 11.6547 17.8083C11.205 18.6662 10.0171 19.1144 9.05923 18.9729C8.10141 18.8315 7.44967 17.9466 6.97701 17.1011C6.72298 16.6553 6.43477 16.2297 6.11497 15.8283C5.4903 15.0578 4.54497 14.9912 3.83389 14.2966C2.90835 13.3991 2.93333 12.3936 3.07076 11.7405Z" fill="white" stroke="#B7A878" strokeWidth="1.25" strokeMiterlimit="10"/>
                  <Path d="M7.22491 3.31131C6.52274 2.73894 5.36574 2.99753 4.61961 3.74672C3.71915 4.64309 3.69156 6.09752 4.31299 6.61368C4.98654 7.17481 6.28561 7.32914 7.35574 6.04131C8.00477 5.26146 7.90358 3.86426 7.22491 3.31131Z" fill="white" stroke="#B7A878" strokeWidth="1.25" strokeMiterlimit="10"/>
                  <Path d="M14.5265 3.31083C13.8243 2.73846 12.6673 2.99909 11.9181 3.74522C11.0187 4.64261 10.99 6.09602 11.6115 6.6132C12.284 7.17432 13.5841 7.32866 14.6532 6.04083C15.3063 5.26098 15.2051 3.86276 14.5265 3.31083Z" fill="white" stroke="#B7A878" strokeWidth="1.25" strokeMiterlimit="10"/>
                  <Path d="M18.4325 7.20398C17.7313 6.63161 16.5733 6.89735 15.8251 7.63939C14.9247 8.53576 14.896 9.99019 15.5185 10.5063C16.191 11.0675 17.4911 11.2218 18.5612 9.93398C19.2133 9.15412 19.1121 7.75795 18.4325 7.20398Z" fill="white" stroke="#B7A878" strokeWidth="1.25" strokeMiterlimit="10"/>
                  <Path d="M18.0985 13.8798C17.3963 13.3074 16.2393 13.5731 15.4911 14.3152C14.5907 15.2115 14.562 16.666 15.1845 17.177C15.857 17.7381 17.1571 17.8925 18.2273 16.6046C18.8793 15.8309 18.7782 14.4348 18.0985 13.8798Z" fill="white" stroke="#B7A878" strokeWidth="1.25" strokeMiterlimit="10"/>
                </Svg>
                <Text style={{marginLeft: 4, fontFamily: 'QuickSandRegular', fontSize: 14, color: '#666666'}}>
                  {item.petFriendly ? "Pet Friendly" : "Not Pet Friendly"}
                </Text>
              </HStack>
              <HStack style={{marginTop: 8}}>
              <Svg width="22" height="22" viewBox="0 3 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M11 12.7452V7.98438" stroke="#B7A878" strokeWidth="1.25" strokeLinecap="round"/>
                <Circle cx="10.8862" cy="11.7925" r="6.58152" stroke="#B7A878" strokeWidth="1.25"/>
                <Path d="M7.98828 3H13.4293" stroke="#B7A878" strokeWidth="1.25" strokeLinecap="round"/>
                <Path d="M3 7.07928L4.81366 5.26562" stroke="#B7A878" strokeWidth="1.25" strokeLinecap="round"/>
              </Svg>
                <Text style={{marginLeft: 4, fontFamily: 'QuickSandRegular', fontSize: 14, color: '#666666'}}>
                  {item.duration}
                </Text>
                <Svg style={{marginLeft: 20}} width="22" height="22" viewBox="0 3 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M7 3V19" stroke="#B7A878" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <Path d="M4.25 3.39844V7.73177C4.25 9.89844 7 9.89844 7 9.89844C7 9.89844 9.75 9.89844 9.75 7.73177V3.39844" stroke="#B7A878" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <Path d="M15.4004 9.80078V19.0008" stroke="#B7A878" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <Path d="M17.8 6.25C17.8 8.04481 16.7256 9.5 15.4 9.5C14.0744 9.5 13 8.04481 13 6.25C13 4.45519 14.0744 3 15.4 3C16.7256 3 17.8 4.45519 17.8 6.25Z" stroke="#B7A878" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </Svg>
                <Text style={{marginLeft: 4, fontFamily: 'QuickSandRegular', fontSize: 14, color: '#666666'}}>
                  {item.edible ? "Edible" : "Not Edible"}
                </Text>
              </HStack>
          </Stack>
        </View>
      </TouchableOpacity>
    );
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
          <Box style={{width: Dimensions.get('window').width}}>
            <Text style={{fontFamily: 'DMSerifText', color: '#827344', fontSize: 32, textAlign: 'center' }}>{alreadySaved ? "Saved" : "New"} Environment</Text>
            <View style={{flex: 1, flexDirection:'row', justifyContent: 'center', paddingBottom: 8}}>
              {yourPlants && <Carousel
                layout={"default"}
                ref={ref => carousel = ref}
                data={yourPlants}
                sliderWidth={308}
                itemWidth={276}
                renderItem={_renderItem}
                onSnapToItem = {(index) => { setActiveIndex(index) }} />}
              </View>
          </Box>
          <Pressable style={{borderRadius: 50, borderWidth: 1, borderColor: '#DDDDDD', padding: 14, width: 270, backgroundColor: '#827344', position: 'absolute', bottom: 24}} android_ripple={{color: '#DDDDDD', radius:4, foreground: true}} onPress={ () => navigation.navigate('EnvironmentName',{
            id : uuid.v4(),
            outdoor : outdoor,
            city : city,
            temp : temp,
            date : date,
            season : season,
            cityLightingDuration : cityLightingDuration,
            petFriendly : petFriendly,
            lightDirLighting : lightDirLighting
          })} >
            <Text style={{fontFamily: 'QuickSandBold', fontSize: 20, lineHeight: 24, color: '#FFFFFF', textAlign: 'center'}}>{alreadySaved ? "Rename" : "Save"} Environment</Text>
        </Pressable>
        </View>
      </ScrollView>
    </View>
  )
}

export default Suggestions
