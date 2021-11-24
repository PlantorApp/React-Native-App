import { useFonts } from "expo-font";
import { Box, HStack, Stack } from "native-base";
import React, { useEffect, useState } from "react";
import { Text, View, Image, Pressable, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Svg, { Circle, Line, Path } from "react-native-svg";

const Suggestions = ({ navigation, route, loggedInUser, setEnvList }) => {
  const [entries, setEntries] = useState([])
  const [Cities, setCities] = useState([])
  const [callFetch, setCallFetch] = useState(true);

  // const outdoor = route.params.outdoor;
  const outdoor = true;
  // const city = route.params.city;
  const city = "Vancouver"
  // const temp = route.params.temp;
  const temp = 22;
  // const date = route.params.date;
  const date = "April";
  const cityLightingDuration = cities.length > 0 && cities.filter(el => el.location === city).filter(el => el.month === date)[0].dayLight;
  // console.log(cityLightingDuration);
  let lightDirLighting;
  if(route?.params?.lightDir === "South") {
    lightDirLighting = route.params.lightDir;
  } 
  // const cityLightingDuration = "South"
  // const petFriendly = route.params.petFriendly;
  const petFriendly = true

  const envToSave = {
    outdoorField : outdoor,
    cityField : city,
    tempField : temp,
    dateField : date,
    cityLightingDurationField : cityLightingDuration,
    petFriendlyField : petFriendly 
  }

  const handlePress = async () => {
    console.log("pressssssd")

    const environmentArray = loggedInUser.savedEnvironments;
    environmentArray.push(envToSave)

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ savedEnvironments: environmentArray }),
    };
    // const response2 = await fetch(`http://54.148.107.164/backend-users/users/${loggedInUser.sub}`,
    const response2 = await fetch(`http://192.168.0.18:3003/users/${loggedInUser.sub}`,
      requestOptions
    );
    const data2 = await response2.json();
    setEnvList(data2.savedEnvironments)
  }
  
  let yourPlants = [];
  if(outdoor) {
    plants.forEach((plant) => {
      if(plant.startSeason.includes(date)) {
        if(plant.temperatureMinimum < temp && plant.temperatureMaximum > temp) {
          if(parseInt(plant.lightingDurationMaximum) < parseInt(cityLightingDuration)) {
            if(plant.petFriendly === petFriendly) {//console.log(plant.image)
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
  //console.log(yourPlants.length);

  const [carousel, setCarousel] = useState('0')

  const fetchData = () => {
    if(callFetch) {
      fetchCityDate();
      fetchPlantsData();
      // console.log("callFetch is true: ", callFetch)
      setCallFetch(false);
    }
  }
  
  const fetchCityDate = async () => {
    const url = 'http://54.148.107.164/backend-cities/cities'
    const api_call = await fetch(url);
    const response = await api_call.json();
    setCities(response);
  }
  
  const fetchPlantsData = async () => {
    const url = 'http://54.148.107.164/backend-plants/plants'
    const api_call = await fetch(url);
    const response = await api_call.json();
    setEntries(response);
  }

  useEffect(() => {
    fetchData();
  }, [callFetch])

  const [loaded] = useFonts({
    DMSerifText: require('../../assets/fonts/DMSerifText-Regular.ttf'),
    QuickSandBold: require('../../assets/fonts/Quicksand-Bold.ttf'),
    QuickSandRegular: require('../../assets/fonts/Quicksand-Regular.ttf')
  });

  if (!loaded) {
    return null;
  }

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => {navigation.navigate('PlantDetail', {plant: item})}}>
        <View style={{borderRadius: 20, height: 356, width: 270, marginLeft: 32, marginRight: 32, marginTop: 18, backgroundColor: '#FFFFFF', shadowColor: '#000000', shadowOffset: {width: 2, height: 2}, shadowOpacity: 0.12, shadowRadius: 8}}>
          <Box style={{backgroundColor: '#FCFAF7', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
            {/* <Image source={{uri: item.image}} style={{width: 230, height: 199, margin: 20}} alt={item.plantName} /> */}
          <Image source={require('../../assets/spiderPlant.png')} style={{width: 230, height: 199, margin: 20}} alt={item.plantName} />
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
            <Text style={{fontFamily: 'DMSerifText', color: '#827344', fontSize: 32, textAlign: 'center' }}>New Environment</Text>
            <View style={{flex: 1, flexDirection:'row', justifyContent: 'center', paddingBottom: 8}}>
              <Carousel
                layout={"default"}
                ref={ref => setCarousel(ref)}
                // data={plants}
                data={yourPlants}
                sliderWidth={324}
                itemWidth={276}
                renderItem={_renderItem}
                onSnapToItem = {(index) => { setCarousel(index) }} containerCustomStyle={{paddingBottom: 16}} />
              </View>
              {/* <Button title="Save Environment" /> */}
            {/* </SafeAreaView> */}
          </Box>
          <Pressable style={{borderRadius: 50, borderWidth: 1, borderColor: '#DDDDDD', padding: 14, width: 270, backgroundColor: '#827344', position: 'absolute', bottom: 24}} onPress={handlePress} >
            <Text style={{fontFamily: 'QuickSandBold', fontSize: 20, color: '#FFFFFF', textAlign: 'center'}}>Save Environment</Text>
        </Pressable>
        </View>
      </ScrollView>
    </View>
  )
}

export default Suggestions

const plants = [
  {
      "startSeason": [
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October"
      ],
      "_id": "618f1174f46ad6044adf08ca",
      "sub": 1,
      "plantName": "Astro Arugula",
      "rootVegetable": false,
      "lightingRequirement": "Partial Shade",
      "lightingDurationMinimum": 3,
      "lightingDurationMaximum": 6,
      "lightingIntensityMinimum": 10000,
      "lightingIntensityMaximum": 35000,
      "hardinessZoneMinimum": 3,
      "hardinessZoneMaximum": 11,
      "temperatureMinimum": 10,
      "temperatureMaximum": 20,
      "difficulty": "Easy",
      "duration": 40,
      "petFriendly": true,
      "edible": true,
      "potSize": 5,
      "createdDate": "2021-11-18T01:07:50.304Z",
      "image": "../../assets/spiderPlant.png"
  },
  {
      "startSeason": [
          "April",
          "May",
          "June",
          "July",
          "August"
      ],
      "_id": "618f1174f46ad6044adf08cb",
      "sub": 2,
      "plantName": "Beets",
      "rootVegetable": true,
      "lightingRequirement": "Partial Shade",
      "lightingDurationMinimum": 3,
      "lightingDurationMaximum": 6,
      "lightingIntensityMinimum": 10000,
      "lightingIntensityMaximum": 35000,
      "temperatureMinimum": 10,
      "temperatureMaximum": 21,
      "difficulty": "Easy",
      "duration": 50,
      "petFriendly": true,
      "createdDate": "2021-11-18T01:07:50.304Z",
      "image": "../../assets/spiderPlant.png"
  },
  {
      "startSeason": [
          "March",
          "April",
          "May",
          "June",
          "July"
      ],
      "_id": "618f1174f46ad6044adf08cc",
      "sub": 3,
      "plantName": "Broccoli",
      "rootVegetable": false,
      "lightingRequirement": "Full Sun",
      "lightingDurationMinimum": 6,
      "lightingDurationMaximum": 10,
      "lightingIntensityMinimum": 35000,
      "lightingIntensityMaximum": 50000,
      "temperatureMinimum": 18,
      "temperatureMaximum": 26,
      "difficulty": "Hard",
      "duration": 70,
      "petFriendly": true,
      "createdDate": "2021-11-18T01:07:50.304Z",
      "image": "../../assets/spiderPlant.png"
  },
  {
      "startSeason": [
          "March",
          "April",
          "May",
          "June",
          "July"
      ],
      "_id": "618f1174f46ad6044adf08cd",
      "sub": 4,
      "plantName": "Cabbage",
      "rootVegetable": false,
      "lightingRequirement": "Full Sun",
      "lightingDurationMinimum": 6,
      "lightingDurationMaximum": 10,
      "lightingIntensityMinimum": 35000,
      "lightingIntensityMaximum": 50000,
      "temperatureMinimum": 10,
      "temperatureMaximum": 24,
      "difficulty": "Medium",
      "duration": 80,
      "petFriendly": true,
      "createdDate": "2021-11-18T01:07:50.304Z",
      "image": "../../assets/spiderPlant.png"
  },
  {
      "startSeason": [
          "April",
          "May",
          "June",
          "July",
          "August"
      ],
      "_id": "618f1174f46ad6044adf08ce",
      "sub": 5,
      "plantName": "Carrots",
      "rootVegetable": true,
      "lightingRequirement": "Full Sun",
      "lightingDurationMinimum": 6,
      "lightingDurationMaximum": 10,
      "lightingIntensityMinimum": 35000,
      "lightingIntensityMaximum": 50000,
      "temperatureMinimum": 4,
      "temperatureMaximum": 26,
      "difficulty": "Medium",
      "duration": 70,
      "petFriendly": true,
      "createdDate": "2021-11-18T01:07:50.304Z",
      "image": "../../assets/spiderPlant.png"
  },
  {
      "startSeason": [
          "March",
          "April",
          "May",
          "June",
          "July"
      ],
      "_id": "618f1174f46ad6044adf08cf",
      "sub": 6,
      "plantName": "Cauliflower",
      "rootVegetable": false,
      "lightingRequirement": "Full Sun",
      "lightingDurationMinimum": 6,
      "lightingDurationMaximum": 10,
      "lightingIntensityMinimum": 35000,
      "lightingIntensityMaximum": 50000,
      "temperatureMinimum": 15,
      "temperatureMaximum": 24,
      "difficulty": "Medium",
      "duration": 75,
      "petFriendly": false,
      "createdDate": "2021-11-18T01:07:50.305Z",
      "image": "../../assets/spiderPlant.png"
  },
  {
      "startSeason": [
          "March",
          "April",
          "May",
          "June"
      ],
      "_id": "618f1174f46ad6044adf08d0",
      "sub": 7,
      "plantName": "Celery",
      "rootVegetable": false,
      "lightingRequirement": "Full Sun",
      "lightingDurationMinimum": 6,
      "lightingDurationMaximum": 10,
      "lightingIntensityMinimum": 35000,
      "lightingIntensityMaximum": 50000,
      "temperatureMinimum": 4,
      "temperatureMaximum": 21,
      "difficulty": "Hard",
      "duration": 100,
      "petFriendly": true,
      "createdDate": "2021-11-18T01:07:50.305Z",
      "image": "../../assets/spiderPlant.png"
  },
  {
      "startSeason": [
          "April",
          "May",
          "June",
          "July",
          "August",
          "September"
      ],
      "_id": "618f1174f46ad6044adf08d1",
      "sub": 8,
      "plantName": "Collards",
      "rootVegetable": false,
      "lightingRequirement": "Full Sun",
      "lightingDurationMinimum": 6,
      "lightingDurationMaximum": 10,
      "lightingIntensityMinimum": 35000,
      "lightingIntensityMaximum": 50000,
      "temperatureMinimum": 3,
      "temperatureMaximum": 24,
      "difficulty": "Easy",
      "duration": 85,
      "petFriendly": true,
      "createdDate": "2021-11-18T01:07:50.305Z",
      "image": "../../assets/spiderPlant.png"
  },
  {
      "startSeason": [
          "April",
          "May",
          "June"
      ],
      "_id": "618f1174f46ad6044adf08d2",
      "sub": 9,
      "plantName": "Eggplant",
      "rootVegetable": false,
      "lightingRequirement": "Full Sun",
      "lightingDurationMinimum": 6,
      "lightingDurationMaximum": 10,
      "lightingIntensityMinimum": 35000,
      "lightingIntensityMaximum": 50000,
      "temperatureMinimum": 15,
      "temperatureMaximum": 29,
      "difficulty": "Easy",
      "duration": 100,
      "petFriendly": false,
      "createdDate": "2021-11-18T01:07:50.305Z",
      "image": "../../assets/spiderPlant.png"
  },
  {
      "startSeason": [
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September"
      ],
      "_id": "618f1174f46ad6044adf08d3",
      "sub": 10,
      "plantName": "Lettuce",
      "rootVegetable": false,
      "lightingRequirement": "Partial Shade",
      "lightingDurationMinimum": 3,
      "lightingDurationMaximum": 6,
      "lightingIntensityMinimum": 10000,
      "lightingIntensityMaximum": 35000,
      "temperatureMinimum": 0,
      "temperatureMaximum": 30,
      "difficulty": "Easy",
      "duration": 30,
      "petFriendly": true,
      "createdDate": "2021-11-18T01:07:50.305Z",
      "image": "../../assets/spiderPlant.png"
  },
  {
      "startSeason": [
          "January",
          "February",
          "March",
          "April",
          "May"
      ],
      "_id": "618f1174f46ad6044adf08d4",
      "sub": 11,
      "plantName": "Sweet Onions",
      "rootVegetable": false,
      "lightingRequirement": "Full Sun",
      "lightingDurationMinimum": 6,
      "lightingDurationMaximum": 10,
      "lightingIntensityMinimum": 35000,
      "lightingIntensityMaximum": 50000,
      "temperatureMinimum": 12,
      "temperatureMaximum": 23,
      "difficulty": "Easy",
      "duration": 90,
      "petFriendly": false,
      "createdDate": "2021-11-18T01:07:50.305Z",
      "image": "../../assets/spiderPlant.png"
  },
  {
      "startSeason": [
          "April",
          "May",
          "June",
          "July",
          "August",
          "September"
      ],
      "_id": "618f1174f46ad6044adf08d5",
      "sub": 12,
      "plantName": "Scallions",
      "rootVegetable": false,
      "lightingRequirement": "Partial Shade",
      "lightingDurationMinimum": 3,
      "lightingDurationMaximum": 6,
      "lightingIntensityMinimum": 10000,
      "lightingIntensityMaximum": 35000,
      "temperatureMinimum": 7,
      "temperatureMaximum": 26,
      "difficulty": "Easy",
      "duration": 80,
      "petFriendly": false,
      "createdDate": "2021-11-18T01:07:50.306Z",
      "image": "../../assets/spiderPlant.png"
  },
  {
      "startSeason": [
          "May",
          "June"
      ],
      "_id": "618f1174f46ad6044adf08d6",
      "sub": 13,
      "plantName": "Parsley",
      "rootVegetable": false,
      "lightingRequirement": "Partial Shade",
      "lightingDurationMinimum": 3,
      "lightingDurationMaximum": 6,
      "lightingIntensityMinimum": 10000,
      "lightingIntensityMaximum": 35000,
      "temperatureMinimum": 7,
      "temperatureMaximum": 26,
      "difficulty": "Easy",
      "duration": 80,
      "petFriendly": true,
      "createdDate": "2021-11-18T01:07:50.306Z",
      "image": "../../assets/spiderPlant.png"
  },
  {
      "startSeason": [
          "March",
          "April",
          "May",
          "June"
      ],
      "_id": "618f1174f46ad6044adf08d7",
      "sub": 14,
      "plantName": "Peppers",
      "rootVegetable": false,
      "lightingRequirement": "Full Sun",
      "lightingDurationMinimum": 6,
      "lightingDurationMaximum": 10,
      "lightingIntensityMinimum": 35000,
      "lightingIntensityMaximum": 50000,
      "temperatureMinimum": 16,
      "temperatureMaximum": 35,
      "difficulty": "Easy",
      "duration": 75,
      "petFriendly": true,
      "createdDate": "2021-11-18T01:07:50.306Z",
      "image": "../../assets/spiderPlant.png"
  },
  {
      "startSeason": [
          "April",
          "May",
          "June",
          "July",
          "August",
          "September"
      ],
      "_id": "618f1174f46ad6044adf08d8",
      "sub": 15,
      "plantName": "Radish",
      "rootVegetable": true,
      "lightingRequirement": "Full Sun",
      "lightingDurationMinimum": 6,
      "lightingDurationMaximum": 10,
      "lightingIntensityMinimum": 35000,
      "lightingIntensityMaximum": 50000,
      "temperatureMinimum": 4,
      "temperatureMaximum": 29,
      "difficulty": "Easy",
      "duration": 45,
      "petFriendly": true,
      "createdDate": "2021-11-18T01:07:50.306Z",
      "image": "../../assets/spiderPlant.png"
  },
  {
      "startSeason": [
          "April",
          "May",
          "June",
          "September",
          "October"
      ],
      "_id": "618f1174f46ad6044adf08d9",
      "sub": 16,
      "plantName": "Spinach",
      "rootVegetable": false,
      "lightingRequirement": "Partial Shade",
      "lightingDurationMinimum": 3,
      "lightingDurationMaximum": 6,
      "lightingIntensityMinimum": 10000,
      "lightingIntensityMaximum": 35000,
      "temperatureMinimum": 1,
      "temperatureMaximum": 24,
      "difficulty": "Easy",
      "duration": 45,
      "petFriendly": true,
      "createdDate": "2021-11-18T01:07:50.306Z",
      "image": "../../assets/spiderPlant.png"
  },
  {
      "startSeason": [
          "April",
          "May",
          "June"
      ],
      "_id": "618f1174f46ad6044adf08da",
      "sub": 17,
      "plantName": "Tomatoes",
      "rootVegetable": false,
      "lightingRequirement": "Full Sun",
      "lightingDurationMinimum": 6,
      "lightingDurationMaximum": 10,
      "lightingIntensityMinimum": 35000,
      "lightingIntensityMaximum": 50000,
      "temperatureMinimum": 13,
      "temperatureMaximum": 27,
      "difficulty": "Easy",
      "duration": 80,
      "petFriendly": false,
      "createdDate": "2021-11-18T01:07:50.307Z",
      "image": "../../assets/spiderPlant.png"
  },
  {
      "startSeason": [
          "April",
          "May",
          "June",
          "July",
          "August"
      ],
      "_id": "618f1174f46ad6044adf08db",
      "sub": 18,
      "plantName": "Turnips",
      "rootVegetable": true,
      "lightingRequirement": "Full Sun",
      "lightingDurationMinimum": 6,
      "lightingDurationMaximum": 10,
      "lightingIntensityMinimum": 35000,
      "lightingIntensityMaximum": 50000,
      "temperatureMinimum": 4,
      "temperatureMaximum": 24,
      "difficulty": "Easy",
      "duration": 45,
      "petFriendly": true,
      "createdDate": "2021-11-18T01:07:50.307Z",
      "image": "../../assets/spiderPlant.png"
  },
  {
      "startSeason": [
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
      ],
      "_id": "618f1174f46ad6044adf08dc",
      "sub": 19,
      "plantName": "Spider Plants",
      "rootVegetable": false,
      "lightingRequirement": "Low Sun",
      "lightingDurationMinimum": 0,
      "lightingDurationMaximum": 3,
      "lightingIntensityMinimum": 0,
      "lightingIntensityMaximum": 10000,
      "temperatureMinimum": 13,
      "temperatureMaximum": 27,
      "difficulty": "Easy",
      "duration": 100,
      "petFriendly": true,
      "createdDate": "2021-11-18T01:07:50.307Z",
      "image": "../../assets/spiderPlant.png"
  },
  {
      "startSeason": [
          "April",
          "May",
          "June",
          "July"
      ],
      "_id": "618f1174f46ad6044adf08dd",
      "sub": 20,
      "plantName": "Peace Lily",
      "rootVegetable": false,
      "lightingRequirement": "Low Sun",
      "lightingDurationMinimum": 0,
      "lightingDurationMaximum": 3,
      "lightingIntensityMinimum": 0,
      "lightingIntensityMaximum": 10000,
      "temperatureMinimum": 14,
      "temperatureMaximum": 29,
      "difficulty": "Easy",
      "duration": 180,
      "petFriendly": false,
      "createdDate": "2021-11-18T01:07:50.307Z",
      "image": "../../assets/spiderPlant.png"
  },
  {
      "startSeason": [
          "April",
          "May",
          "June",
          "July",
          "August",
          "September"
      ],
      "_id": "618f1174f46ad6044adf08de",
      "sub": 21,
      "plantName": "Bromeliad",
      "rootVegetable": false,
      "lightingRequirement": "Low Sun",
      "lightingDurationMinimum": 0,
      "lightingDurationMaximum": 3,
      "lightingIntensityMinimum": 0,
      "lightingIntensityMaximum": 10000,
      "temperatureMinimum": 10,
      "temperatureMaximum": 32,
      "difficulty": "Easy",
      "duration": 720,
      "petFriendly": true,
      "createdDate": "2021-11-18T01:07:50.307Z",
      "image": "../../assets/spiderPlant.png"
  },
  {
      "startSeason": [
          "April",
          "May",
          "June",
          "July",
          "August",
          "September"
      ],
      "_id": "618f1174f46ad6044adf08df",
      "sub": 22,
      "plantName": "Chinese Evergreen",
      "rootVegetable": false,
      "lightingRequirement": "Low Sun",
      "lightingDurationMinimum": 0,
      "lightingDurationMaximum": 3,
      "lightingIntensityMinimum": 0,
      "lightingIntensityMaximum": 10000,
      "temperatureMinimum": 13,
      "temperatureMaximum": 25,
      "difficulty": "Easy",
      "duration": 720,
      "petFriendly": false,
      "createdDate": "2021-11-18T01:07:50.308Z",
      "image": "../../assets/spiderPlant.png"
  },
  {
      "startSeason": [
          "April",
          "May",
          "June",
          "July",
          "August",
          "September"
      ],
      "_id": "618f1174f46ad6044adf08e0",
      "sub": 23,
      "plantName": "Cast Iron Plant",
      "rootVegetable": false,
      "lightingRequirement": "Low Sun",
      "lightingDurationMinimum": 0,
      "lightingDurationMaximum": 3,
      "lightingIntensityMinimum": 0,
      "lightingIntensityMaximum": 10000,
      "temperatureMinimum": 7,
      "temperatureMaximum": 29,
      "difficulty": "Easy",
      "duration": 720,
      "petFriendly": true,
      "createdDate": "2021-11-18T01:07:50.308Z",
      "image": "../../assets/spiderPlant.png"
  },
  {
      "startSeason": [
          "April",
          "May",
          "June",
          "July",
          "August",
          "September"
      ],
      "_id": "618f1174f46ad6044adf08e1",
      "sub": 24,
      "plantName": "Peacock Plant",
      "rootVegetable": false,
      "lightingRequirement": "Low Sun",
      "lightingDurationMinimum": 0,
      "lightingDurationMaximum": 3,
      "lightingIntensityMinimum": 0,
      "lightingIntensityMaximum": 10000,
      "temperatureMinimum": 16,
      "temperatureMaximum": 24,
      "difficulty": "Easy",
      "duration": 720,
      "petFriendly": true,
      "createdDate": "2021-11-18T01:07:50.308Z",
      "image": "../../assets/spiderPlant.png"
  }
]

const cities = [
  {
      "_id": "618f0d859df1faa2f95ec9ea",
      "sub": 1,
      "location": "Vancouver",
      "month": "January",
      "dayLight": "9:22",
      "hourlyMeanTemperature": "5.4",
      "createdDate": "2021-11-18T08:42:17.796Z"
  },
  {
      "_id": "618f0d859df1faa2f95ec9eb",
      "sub": 2,
      "location": "Vancouver",
      "month": "February",
      "dayLight": "10:57",
      "hourlyMeanTemperature": "3.5",
      "createdDate": "2021-11-18T08:42:17.796Z"
  },
  {
      "_id": "618f0d859df1faa2f95ec9ec",
      "sub": 3,
      "location": "Vancouver",
      "month": "March",
      "dayLight": "13:11",
      "hourlyMeanTemperature": "6.5",
      "createdDate": "2021-11-18T08:42:17.796Z"
  },
  {
      "_id": "618f0d859df1faa2f95ec9ed",
      "sub": 4,
      "location": "Vancouver",
      "month": "April",
      "dayLight": "14:35",
      "hourlyMeanTemperature": "9.8",
      "createdDate": "2021-11-18T08:42:17.796Z"
  },
  {
      "_id": "618f0d859df1faa2f95ec9ee",
      "sub": 5,
      "location": "Vancouver",
      "month": "May",
      "dayLight": "15:56",
      "hourlyMeanTemperature": "12.7",
      "createdDate": "2021-11-18T08:42:17.796Z"
  },
  {
      "_id": "618f0d859df1faa2f95ec9ef",
      "sub": 6,
      "location": "Vancouver",
      "month": "June",
      "dayLight": "16:16",
      "hourlyMeanTemperature": "17.7",
      "createdDate": "2021-11-18T08:42:17.796Z"
  },
  {
      "_id": "618f0d859df1faa2f95ec9f0",
      "sub": 7,
      "location": "Vancouver",
      "month": "July",
      "dayLight": "16:11",
      "hourlyMeanTemperature": "19.2",
      "createdDate": "2021-11-18T08:42:17.797Z"
  },
  {
      "_id": "618f0d859df1faa2f95ec9f1",
      "sub": 8,
      "location": "Vancouver",
      "month": "August",
      "dayLight": "15.08",
      "hourlyMeanTemperature": "18.7",
      "createdDate": "2021-11-18T08:42:17.797Z"
  },
  {
      "_id": "618f0d859df1faa2f95ec9f2",
      "sub": 9,
      "location": "Vancouver",
      "month": "September",
      "dayLight": "13.27",
      "hourlyMeanTemperature": "14.9",
      "createdDate": "2021-11-18T08:42:17.797Z"
  },
  {
      "_id": "618f0d859df1faa2f95ec9f3",
      "sub": 10,
      "location": "Vancouver",
      "month": "October",
      "dayLight": "11.38",
      "hourlyMeanTemperature": "11.5",
      "createdDate": "2021-11-18T08:42:17.797Z"
  },
  {
      "_id": "618f0d859df1faa2f95ec9f4",
      "sub": 11,
      "location": "Vancouver",
      "month": "November",
      "dayLight": "9:50",
      "hourlyMeanTemperature": "6.6",
      "createdDate": "2021-11-18T08:42:17.797Z"
  },
  {
      "_id": "618f0d859df1faa2f95ec9f5",
      "sub": 12,
      "location": "Vancouver",
      "month": "December",
      "dayLight": "8.37",
      "hourlyMeanTemperature": "5.4",
      "createdDate": "2021-11-18T08:42:17.797Z"
  },
  {
      "_id": "618f0d859df1faa2f95ec9f6",
      "sub": 13,
      "location": "West Vancouver",
      "month": "January",
      "dayLight": "9:22",
      "hourlyMeanTemperature": "5",
      "createdDate": "2021-11-18T08:42:17.797Z"
  },
  {
      "_id": "618f0d859df1faa2f95ec9f7",
      "sub": 14,
      "location": "West Vancouver",
      "month": "February",
      "dayLight": "10:56",
      "hourlyMeanTemperature": "2.8",
      "createdDate": "2021-11-18T08:42:17.797Z"
  },
  {
      "_id": "618f0d859df1faa2f95ec9f8",
      "sub": 15,
      "location": "West Vancouver",
      "month": "March",
      "dayLight": "13:12",
      "hourlyMeanTemperature": "6.1",
      "createdDate": "2021-11-18T08:42:17.797Z"
  },
  {
      "_id": "618f0d859df1faa2f95ec9f9",
      "sub": 16,
      "location": "West Vancouver",
      "month": "April",
      "dayLight": "14:35",
      "hourlyMeanTemperature": "9.9",
      "createdDate": "2021-11-18T08:42:17.797Z"
  },
  {
      "_id": "618f0d859df1faa2f95ec9fa",
      "sub": 17,
      "location": "West Vancouver",
      "month": "May",
      "dayLight": "15:57",
      "hourlyMeanTemperature": "12.2",
      "createdDate": "2021-11-18T08:42:17.798Z"
  },
  {
      "_id": "618f0d859df1faa2f95ec9fb",
      "sub": 18,
      "location": "West Vancouver",
      "month": "June",
      "dayLight": "16:17",
      "hourlyMeanTemperature": "18.3",
      "createdDate": "2021-11-18T08:42:17.798Z"
  },
  {
      "_id": "618f0d859df1faa2f95ec9fc",
      "sub": 19,
      "location": "West Vancouver",
      "month": "July",
      "dayLight": "16:11",
      "hourlyMeanTemperature": "19.6",
      "createdDate": "2021-11-18T08:42:17.798Z"
  },
  {
      "_id": "618f0d859df1faa2f95ec9fd",
      "sub": 20,
      "location": "West Vancouver",
      "month": "August",
      "dayLight": "15.08",
      "hourlyMeanTemperature": "18.7",
      "createdDate": "2021-11-18T08:42:17.798Z"
  },
  {
      "_id": "618f0d859df1faa2f95ec9fe",
      "sub": 21,
      "location": "Vancouver",
      "month": "September",
      "dayLight": "13.27",
      "hourlyMeanTemperature": "14.6",
      "createdDate": "2021-11-18T08:42:17.798Z"
  },
  {
      "_id": "618f0d859df1faa2f95ec9ff",
      "sub": 22,
      "location": "West Vancouver",
      "month": "October",
      "dayLight": "11.38",
      "hourlyMeanTemperature": "10.9",
      "createdDate": "2021-11-18T08:42:17.798Z"
  },
  {
      "_id": "618f0d859df1faa2f95eca00",
      "sub": 23,
      "location": "West Vancouver",
      "month": "November",
      "dayLight": "9:50",
      "hourlyMeanTemperature": "6.1",
      "createdDate": "2021-11-18T08:42:17.798Z"
  },
  {
      "_id": "618f0d859df1faa2f95eca01",
      "sub": 24,
      "location": "West Vancouver",
      "month": "December",
      "dayLight": "8.37",
      "hourlyMeanTemperature": "5.2",
      "createdDate": "2021-11-18T08:42:17.798Z"
  },
  {
      "_id": "618f0d859df1faa2f95eca02",
      "sub": 25,
      "location": "Richmond",
      "month": "January",
      "dayLight": "9:22",
      "hourlyMeanTemperature": "5.4",
      "createdDate": "2021-11-18T08:42:17.798Z"
  },
  {
      "_id": "618f0d859df1faa2f95eca03",
      "sub": 26,
      "location": "Richmond",
      "month": "February",
      "dayLight": "10:57",
      "hourlyMeanTemperature": "3.5",
      "createdDate": "2021-11-18T08:42:17.799Z"
  },
  {
      "_id": "618f0d859df1faa2f95eca04",
      "sub": 27,
      "location": "Richmond",
      "month": "March",
      "dayLight": "13:12",
      "hourlyMeanTemperature": "6.5",
      "createdDate": "2021-11-18T08:42:17.799Z"
  },
  {
      "_id": "618f0d859df1faa2f95eca05",
      "sub": 28,
      "location": "Richmond",
      "month": "April",
      "dayLight": "14:34",
      "hourlyMeanTemperature": "9.8",
      "createdDate": "2021-11-18T08:42:17.799Z"
  },
  {
      "_id": "618f0d859df1faa2f95eca06",
      "sub": 29,
      "location": "Richmond",
      "month": "May",
      "dayLight": "15:55",
      "hourlyMeanTemperature": "12.7",
      "createdDate": "2021-11-18T08:42:17.799Z"
  },
  {
      "_id": "618f0d859df1faa2f95eca07",
      "sub": 30,
      "location": "Richmond",
      "month": "June",
      "dayLight": "16:15",
      "hourlyMeanTemperature": "17.7",
      "createdDate": "2021-11-18T08:42:17.799Z"
  },
  {
      "_id": "618f0d859df1faa2f95eca08",
      "sub": 31,
      "location": "Richmond",
      "month": "July",
      "dayLight": "16:09",
      "hourlyMeanTemperature": "19.2",
      "createdDate": "2021-11-18T08:42:17.799Z"
  },
  {
      "_id": "618f0d859df1faa2f95eca09",
      "sub": 32,
      "location": "Richmond",
      "month": "August",
      "dayLight": "15.08",
      "hourlyMeanTemperature": "18.7",
      "createdDate": "2021-11-18T08:42:17.799Z"
  },
  {
      "_id": "618f0d859df1faa2f95eca0a",
      "sub": 33,
      "location": "Richmond",
      "month": "September",
      "dayLight": "13.27",
      "hourlyMeanTemperature": "14.9",
      "createdDate": "2021-11-18T08:42:17.800Z"
  },
  {
      "_id": "618f0d859df1faa2f95eca0b",
      "sub": 34,
      "location": "Richmond",
      "month": "October",
      "dayLight": "11.38",
      "hourlyMeanTemperature": "11.5",
      "createdDate": "2021-11-18T08:42:17.800Z"
  },
  {
      "_id": "618f0d859df1faa2f95eca0c",
      "sub": 35,
      "location": "Richmond",
      "month": "November",
      "dayLight": "9:51",
      "hourlyMeanTemperature": "6.6",
      "createdDate": "2021-11-18T08:42:17.800Z"
  },
  {
      "_id": "618f0d859df1faa2f95eca0d",
      "sub": 36,
      "location": "Richmond",
      "month": "December",
      "dayLight": "8.37",
      "hourlyMeanTemperature": "5.4",
      "createdDate": "2021-11-18T08:42:17.800Z"
  }
]