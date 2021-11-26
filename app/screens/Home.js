import React, { useEffect, useState } from 'react';
import { Card } from 'react-native-elements';
import { useFonts } from 'expo-font';
import { View, Image, Platform, TouchableWithoutFeedback, Animated, TouchableOpacity } from 'react-native';
import { Box, Heading, HStack, ScrollView } from "native-base";
import Svg, { Path } from 'react-native-svg';

const Home = ({ navigation, loggedInUser }) => {
  const [bookmarkedOne, setBookmarkedOne] = useState(false)
  const [bookmarkedTwo, setBookmarkedTwo] = useState(false)
  const [bookmarkedThree, setBookmarkedThree] = useState(false)
  const [bookmarkedFour, setBookmarkedFour] = useState(false)
  const [bookmarkedFive, setBookmarkedFive] = useState(false)
  const [loop, setLoop] = useState(true)
  const [animatedValue] = useState(new Animated.Value(1))
  const [animatedValueLoop] = useState(new Animated.Value(1))
  const animatedStyle = { transform: [{ scale: animatedValue }] }
  const animatedStyleLoop = { transform: [{ scale: animatedValueLoop }] }

  const toggleBookmarked = async (id) => {
    // console.log("clicked id is :", id);
    let user = loggedInUser;
    // console.log(user);
    if(user) {
      const response = await fetch(`http://54.148.107.164/backend-users/users/${user.sub}`);
      // const response = await fetch(`http://192.168.0.18:3003/users/${user.sub}`);
      const data = await response.json();
      // console.log("user from db :", data)
      
      let condition;
      if (id === "1") {
        // console.log("user is :", user)
        condition = data.favouriteArticles.findIndex((element) => element === "1")
        if(condition === -1) {
          setBookmarkedOne(true)
          // console.log("inside line 70",condition)
          data.favouriteArticles.push(id);
          // console.log("after pushing : ", data)
          const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ favouriteArticles: data.favouriteArticles }),
          };
          const response2 = await fetch(`http://54.148.107.164/backend-users/users/${data.sub}`,
          // const response2 = await fetch(`http://192.168.0.18:3003/users/${data.sub}`,
            requestOptions
          );
          const data2 = await response2.json();
          // console.log("inside favouriteArticles :", data2)
        } else {
          setBookmarkedOne(false);
          let condition = data.favouriteArticles.findIndex((element) => element === id)
          if (condition !== -1) {
            data.favouriteArticles.splice(data.favouriteArticles.findIndex((element) => element === id), 1);
            const requestOptions = {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ favouriteArticles: data.favouriteArticles }),
            };

            const response = await fetch(`http://54.148.107.164/backend-users/users/${data.sub}`,
            // const response = await fetch(`http://192.168.0.18:3003/users/${data.sub}`,
              requestOptions
            );
            const data2 = await response.json();
            // console.log("after removing", data2)
          }
        }
      } else if(id === "2") {
        condition = data.favouriteArticles.findIndex((element) => element === "2")
        if(condition === -1) {
          setBookmarkedTwo(true)
          // console.log("inside line 70",condition)
          data.favouriteArticles.push(id);
          // console.log("after pushing : ", data)
          const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ favouriteArticles: data.favouriteArticles }),
          };
          const response2 = await fetch(`http://54.148.107.164/backend-users/users/${data.sub}`,
          // const response2 = await fetch(`http://192.168.0.18:3003/users/${data.sub}`,
            requestOptions
          );
          const data2 = await response2.json();
          // console.log("inside favouriteArticles :", data2)
        } else {
          setBookmarkedTwo(false);
          let condition = data.favouriteArticles.findIndex((element) => element === id)
          if (condition !== -1) {
            data.favouriteArticles.splice(data.favouriteArticles.findIndex((element) => element === id), 1);
            const requestOptions = {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ favouriteArticles: data.favouriteArticles }),
            };
            const response = await fetch(`http://54.148.107.164/backend-users/users/${data.sub}`,
            // const response = await fetch(`http://192.168.0.18:3003/users/${data.sub}`,
              requestOptions
            );
            const data2 = await response.json();
            // console.log("after removing", data2)
          }
        }
      } else if(id === "3") {
        condition = data.favouriteArticles.findIndex((element) => element === "3")
        if(condition === -1) {
          setBookmarkedThree(true)
          // console.log("inside line 70",condition)
          data.favouriteArticles.push(id);
          // console.log("after pushing : ", data)
          const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ favouriteArticles: data.favouriteArticles }),
          };
          const response2 = await fetch(`http://54.148.107.164/backend-users/users/${data.sub}`,
          // const response2 = await fetch(`http://192.168.0.18:3003/users/${data.sub}`,
            requestOptions
          );
          const data2 = await response2.json();
          // console.log("inside favouriteArticles :", data2)
        } else {
          setBookmarkedThree(false);
          let condition = data.favouriteArticles.findIndex((element) => element === id)
          if (condition !== -1) {
            data.favouriteArticles.splice(data.favouriteArticles.findIndex((element) => element === id), 1);
            const requestOptions = {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ favouriteArticles: data.favouriteArticles }),
            };
            const response = await fetch(`http://54.148.107.164/backend-users/users/${data.sub}`,
            // const response = await fetch(`http://192.168.0.18:3003/users/${data.sub}`,
              requestOptions
            );
            const data2 = await response.json();
            // console.log("after removing", data2)
          }
        } 
      } else if(id === "4") {
        condition = data.favouriteArticles.findIndex((element) => element === "4")
        if(condition === -1){
          setBookmarkedFour(true)
          // console.log("inside line 70",condition)
          data.favouriteArticles.push(id);
          // console.log("after pushing : ", data)
          const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ favouriteArticles: data.favouriteArticles }),
          };
          const response2 = await fetch(`http://54.148.107.164/backend-users/users/${data.sub}`,
          // const response2 = await fetch(`http://192.168.0.18:3003/users/${data.sub}`,
            requestOptions
          );
          const data2 = await response2.json();
          // console.log("inside favouriteArticles :", data2)
        } else {
          setBookmarkedFour(false);
          let condition = data.favouriteArticles.findIndex((element) => element === id)
          if (condition !== -1) {
            data.favouriteArticles.splice(data.favouriteArticles.findIndex((element) => element === id), 1);
            const requestOptions = {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ favouriteArticles: data.favouriteArticles }),
            };
            const response = await fetch(`http://54.148.107.164/backend-users/users/${data.sub}`,
            // const response = await fetch(`http://192.168.0.18:3003/users/${data.sub}`,
              requestOptions
            );
            const data2 = await response.json();
            // console.log("after removing", data2)
          }
        }
      } else {
        condition = data.favouriteArticles.findIndex((element) => element === "5")
        if(condition === -1) {
          setBookmarkedFive(true)
          // console.log("inside line 70",condition)
          data.favouriteArticles.push(id);
          // console.log("after pushing : ", data)
          const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ favouriteArticles: data.favouriteArticles }),
          };
          const response2 = await fetch(`http://54.148.107.164/backend-users/users/${data.sub}`,
          // const response2 = await fetch(`http://192.168.0.18:3003/users/${data.sub}`,
            requestOptions
          );
          const data2 = await response2.json();
          // console.log("inside favouriteArticles :", data2)
        } else {
          setBookmarkedFive(false);
          let condition = data.favouriteArticles.findIndex((element) => element === id)
          if (condition !== -1) {
            data.favouriteArticles.splice(data.favouriteArticles.findIndex((element) => element === id), 1);
            const requestOptions = {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ favouriteArticles: data.favouriteArticles }),
            };
            const response = await fetch(`http://54.148.107.164/backend-users/users/${data.sub}`,
            // const response = await fetch(`http://192.168.0.18:3003/users/${data.sub}`,
              requestOptions
            );
            const data2 = await response.json();
            // console.log("after removing", data2)
          }
        }
      }
    }
  }

  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      toValue: 0.9,
      useNativeDriver: true
    }).start()
  }
  
  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 70,
      useNativeDriver: true
    }).start(() => navigation.navigate('IndoorOutdoor'))
  }

  const shrink = () => { 
    Animated.timing(animatedValueLoop, {
      toValue: 0.8,
      duration: 1000,
      useNativeDriver: true
    }).start(() => expand())
  }
  
  const expand = () => { 
    Animated.timing(animatedValueLoop, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start(() => shrink())
  }

  useEffect(() => {
    if(loop) {
      setLoop(false)
      shrink()
    }
  }, [loop])

  const [loaded] = useFonts({
    DMSerifText: require('../assets/fonts/DMSerifText-Regular.ttf'),
    QuickSandBold: require('../assets/fonts/Quicksand-Bold.ttf'),
    QuickSandRegular: require('../assets/fonts/Quicksand-Regular.ttf')
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={{backgroundColor: "#FCFAF7", marginTop: 24}}>
      <ScrollView containerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Heading style={{fontFamily: 'DMSerifText', marginTop: 60, fontWeight: 'normal', color: "#827344", fontSize: 32, lineHeight: 38.4, paddingHorizontal: 16, textAlign: 'center'}}>Tap to get plant suggestions</Heading>
        <Box style={{height: 200, alignItems: 'center', marginTop: 56}}>
          <View>
            <Animated.Image source={require('../assets/animatedEllipse.png')} style={{width: 200, height: 200}, animatedStyleLoop} />
            <Box style={{position: 'absolute', top: 23, left: 23, zIndex: 10}}>
              <TouchableWithoutFeedback onPressIn={() => handlePressIn()} onPressOut={() => handlePressOut()}>
                <Animated.Image source={require('../assets/plantSuggestions.png')} style={{width: 200, height: 200}, animatedStyle} />
              </TouchableWithoutFeedback>
            </Box>
          </View>
        </Box>
        <Heading style={{fontFamily: 'DMSerifText', fontSize: 32, fontWeight: 'normal', color: "#827344", width: '100%', textAlign: 'left', marginTop: 80, lineHeight: 38.4, marginLeft: 16}}>Gardening Tips</Heading>
        <View style={{height: 316, marginTop: 8}}>
          <ScrollView 
            horizontal 
            decelerationRate={0} 
            snapToInterval={316} 
            snapToAlignment="center" 
            contentInset={{ top: 0, left: 4, bottom: 0, right: 4}}
            contentContainerStyle={{paddingHorizontal: Platform.OS === 'android' ? 4 : 0, marginHorizontal: 18}}
          >
            <Card containerStyle={{width: 286, height: 274, borderWidth: 0, borderRadius: 20, padding: 0, shadowColor: '#000000', shadowOffset: { width: 2, height: 2}, shadowOpacity: 0.12, elevation: 8}}>
              <Card.Image source={require('../assets/articles/gardening101.png')} style={{width: 286, height: 196, borderTopLeftRadius: 20, borderTopRightRadius: 20}} />
              <HStack style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, height: 78}}>
                <Card.Title style={{textAlign: 'left', fontFamily: 'QuickSandBold', fontWeight: 'normal', color: "#666666", fontSize: 20, width: '86%', marginTop: 12}}>Gardening 101: A Beginner’s Guide To...</Card.Title>
                <TouchableOpacity onPress={() => {toggleBookmarked("1")}}>
                  <Svg width="32" height="32" viewBox="0 0 32 32" fill={bookmarkedOne ? "#827344" : "none"} xmlns="http://www.w3.org/2000/svg">
                    <Path d="M7 27.0137V27.0134V6.97179C7 6.16567 7.30288 5.40331 7.82547 4.84982C8.34621 4.29828 9.0398 4 9.75 4H22.25C22.9602 4 23.6538 4.29828 24.1745 4.84982C24.6971 5.40331 25 6.16567 25 6.97179V27.0134V27.0137C25.0001 27.1972 24.9545 27.3744 24.8714 27.5272C24.7886 27.6797 24.6733 27.7994 24.5427 27.8797C24.4126 27.9597 24.2697 27.9995 24.1279 28C23.9861 28.0005 23.8432 27.9619 23.7128 27.883C23.7128 27.883 23.7127 27.8829 23.7126 27.8829L17.1378 23.9033L17.1376 23.9032C16.7951 23.6959 16.4028 23.5844 16 23.5844C15.5972 23.5844 15.2049 23.6959 14.8624 23.9032L14.8622 23.9033L8.28736 27.8829C8.2873 27.8829 8.28724 27.883 8.28719 27.883C8.15679 27.9619 8.01387 28.0005 7.87211 28C7.73027 27.9995 7.58742 27.9597 7.45734 27.8797C7.32674 27.7994 7.21142 27.6797 7.12856 27.5272C7.04554 27.3744 6.99994 27.1972 7 27.0137Z" stroke={bookmarkedOne ? "#827344" : "#BBBBBB"} strokeWidth="2"/>
                  </Svg>
                </TouchableOpacity>
              </HStack>
            </Card>
            <Card containerStyle={{width: 286, height: 274, borderWidth: 0, borderRadius: 20, padding: 0, shadowColor: '#000000', shadowOffset: { width: 2, height: 2}, shadowOpacity: 0.12, elevation: 8}}>
              <Card.Image source={require('../assets/articles/growingPlantsIndoors.png')} style={{width: 286, height: 196, borderTopLeftRadius: 20, borderTopRightRadius: 20}} />
              <HStack style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, height: 78}}>
                <Card.Title style={{textAlign: 'left', fontFamily: 'QuickSandBold', fontWeight: 'normal', color: "#666666", fontSize: 20, width: '86%', marginTop: 12}}>Growing Plants Indoors: A Beginner's...</Card.Title>
                <TouchableOpacity onPress={() => {toggleBookmarked("2")}}>
                  <Svg width="32" height="32" viewBox="0 0 32 32" fill={bookmarkedTwo ? "#827344" : "none"} xmlns="http://www.w3.org/2000/svg">
                    <Path d="M7 27.0137V27.0134V6.97179C7 6.16567 7.30288 5.40331 7.82547 4.84982C8.34621 4.29828 9.0398 4 9.75 4H22.25C22.9602 4 23.6538 4.29828 24.1745 4.84982C24.6971 5.40331 25 6.16567 25 6.97179V27.0134V27.0137C25.0001 27.1972 24.9545 27.3744 24.8714 27.5272C24.7886 27.6797 24.6733 27.7994 24.5427 27.8797C24.4126 27.9597 24.2697 27.9995 24.1279 28C23.9861 28.0005 23.8432 27.9619 23.7128 27.883C23.7128 27.883 23.7127 27.8829 23.7126 27.8829L17.1378 23.9033L17.1376 23.9032C16.7951 23.6959 16.4028 23.5844 16 23.5844C15.5972 23.5844 15.2049 23.6959 14.8624 23.9032L14.8622 23.9033L8.28736 27.8829C8.2873 27.8829 8.28724 27.883 8.28719 27.883C8.15679 27.9619 8.01387 28.0005 7.87211 28C7.73027 27.9995 7.58742 27.9597 7.45734 27.8797C7.32674 27.7994 7.21142 27.6797 7.12856 27.5272C7.04554 27.3744 6.99994 27.1972 7 27.0137Z" stroke={bookmarkedTwo ? "#827344" : "#BBBBBB"} strokeWidth="2"/>
                  </Svg>
                </TouchableOpacity>
              </HStack>
            </Card>
            <Card containerStyle={{width: 286, height: 274, borderWidth: 0, borderRadius: 20, padding: 0, shadowColor: '#000000', shadowOffset: { width: 2, height: 2}, shadowOpacity: 0.12, elevation: 8}}>
              <Card.Image source={require('../assets/articles/gardenPests.png')} style={{width: 286, height: 196, borderTopLeftRadius: 20, borderTopRightRadius: 20}} />
              <HStack style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, height: 78}}>
                <Card.Title style={{textAlign: 'left', fontFamily: 'QuickSandBold', fontWeight: 'normal', color: "#666666", fontSize: 20, width: '86%', marginTop: 12}}>How To Get Rid Of Garden Pests?</Card.Title>
                <TouchableOpacity onPress={() => {toggleBookmarked("3")}}>
                  <Svg width="32" height="32" viewBox="0 0 32 32" fill={bookmarkedThree ? "#827344" : "none"} xmlns="http://www.w3.org/2000/svg">
                    <Path d="M7 27.0137V27.0134V6.97179C7 6.16567 7.30288 5.40331 7.82547 4.84982C8.34621 4.29828 9.0398 4 9.75 4H22.25C22.9602 4 23.6538 4.29828 24.1745 4.84982C24.6971 5.40331 25 6.16567 25 6.97179V27.0134V27.0137C25.0001 27.1972 24.9545 27.3744 24.8714 27.5272C24.7886 27.6797 24.6733 27.7994 24.5427 27.8797C24.4126 27.9597 24.2697 27.9995 24.1279 28C23.9861 28.0005 23.8432 27.9619 23.7128 27.883C23.7128 27.883 23.7127 27.8829 23.7126 27.8829L17.1378 23.9033L17.1376 23.9032C16.7951 23.6959 16.4028 23.5844 16 23.5844C15.5972 23.5844 15.2049 23.6959 14.8624 23.9032L14.8622 23.9033L8.28736 27.8829C8.2873 27.8829 8.28724 27.883 8.28719 27.883C8.15679 27.9619 8.01387 28.0005 7.87211 28C7.73027 27.9995 7.58742 27.9597 7.45734 27.8797C7.32674 27.7994 7.21142 27.6797 7.12856 27.5272C7.04554 27.3744 6.99994 27.1972 7 27.0137Z" stroke={bookmarkedThree ? "#827344" : "#BBBBBB"} strokeWidth="2"/>
                  </Svg>
                </TouchableOpacity>
              </HStack>
            </Card>
            <Card containerStyle={{width: 286, height: 274, borderWidth: 0, borderRadius: 20, padding: 0, shadowColor: '#000000', shadowOffset: { width: 2, height: 2}, shadowOpacity: 0.12, elevation: 8}}>
              <Card.Image source={require('../assets/articles/compostingGuide.png')} style={{width: 286, height: 196, borderTopLeftRadius: 20, borderTopRightRadius: 20}} />
              <HStack style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, height: 78}}>
                <Card.Title style={{textAlign: 'left', fontFamily: 'QuickSandBold', fontWeight: 'normal', color: "#666666", fontSize: 20, width: '86%', marginTop: 12}}>The Ultimate Guide To Composting For B...</Card.Title>
                <TouchableOpacity onPress={() => {toggleBookmarked("4")}}>
                  <Svg width="32" height="32" viewBox="0 0 32 32" fill={bookmarkedFour ? "#827344" : "none"} xmlns="http://www.w3.org/2000/svg">
                    <Path d="M7 27.0137V27.0134V6.97179C7 6.16567 7.30288 5.40331 7.82547 4.84982C8.34621 4.29828 9.0398 4 9.75 4H22.25C22.9602 4 23.6538 4.29828 24.1745 4.84982C24.6971 5.40331 25 6.16567 25 6.97179V27.0134V27.0137C25.0001 27.1972 24.9545 27.3744 24.8714 27.5272C24.7886 27.6797 24.6733 27.7994 24.5427 27.8797C24.4126 27.9597 24.2697 27.9995 24.1279 28C23.9861 28.0005 23.8432 27.9619 23.7128 27.883C23.7128 27.883 23.7127 27.8829 23.7126 27.8829L17.1378 23.9033L17.1376 23.9032C16.7951 23.6959 16.4028 23.5844 16 23.5844C15.5972 23.5844 15.2049 23.6959 14.8624 23.9032L14.8622 23.9033L8.28736 27.8829C8.2873 27.8829 8.28724 27.883 8.28719 27.883C8.15679 27.9619 8.01387 28.0005 7.87211 28C7.73027 27.9995 7.58742 27.9597 7.45734 27.8797C7.32674 27.7994 7.21142 27.6797 7.12856 27.5272C7.04554 27.3744 6.99994 27.1972 7 27.0137Z" stroke={bookmarkedFour ? "#827344" : "#BBBBBB"} strokeWidth="2"/>
                  </Svg>
                </TouchableOpacity>
              </HStack>
            </Card>
            <Card containerStyle={{width: 286, height: 274, borderWidth: 0, borderRadius: 20, padding: 0, shadowColor: '#000000', shadowOffset: { width: 2, height: 2}, shadowOpacity: 0.12, elevation: 8}}>
              <Card.Image source={require('../assets/articles/plantsPoisonousPets.png')} style={{width: 286, height: 196, borderTopLeftRadius: 20, borderTopRightRadius: 20}} />
              <HStack style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, height: 78}}>
                <Card.Title style={{textAlign: 'left', fontFamily: 'QuickSandBold', fontWeight: 'normal', color: "#666666", fontSize: 20, width: '86%', marginTop: 12}}>What Plants Are Poisonous To Cats & ...</Card.Title>
                <TouchableOpacity onPress={() => {toggleBookmarked("5")}}>
                  <Svg width="32" height="32" viewBox="0 0 32 32" fill={bookmarkedFive ? "#827344" : "none"} xmlns="http://www.w3.org/2000/svg">
                    <Path d="M7 27.0137V27.0134V6.97179C7 6.16567 7.30288 5.40331 7.82547 4.84982C8.34621 4.29828 9.0398 4 9.75 4H22.25C22.9602 4 23.6538 4.29828 24.1745 4.84982C24.6971 5.40331 25 6.16567 25 6.97179V27.0134V27.0137C25.0001 27.1972 24.9545 27.3744 24.8714 27.5272C24.7886 27.6797 24.6733 27.7994 24.5427 27.8797C24.4126 27.9597 24.2697 27.9995 24.1279 28C23.9861 28.0005 23.8432 27.9619 23.7128 27.883C23.7128 27.883 23.7127 27.8829 23.7126 27.8829L17.1378 23.9033L17.1376 23.9032C16.7951 23.6959 16.4028 23.5844 16 23.5844C15.5972 23.5844 15.2049 23.6959 14.8624 23.9032L14.8622 23.9033L8.28736 27.8829C8.2873 27.8829 8.28724 27.883 8.28719 27.883C8.15679 27.9619 8.01387 28.0005 7.87211 28C7.73027 27.9995 7.58742 27.9597 7.45734 27.8797C7.32674 27.7994 7.21142 27.6797 7.12856 27.5272C7.04554 27.3744 6.99994 27.1972 7 27.0137Z" stroke={bookmarkedFive ? "#827344" : "#BBBBBB"} strokeWidth="2"/>
                  </Svg>
                </TouchableOpacity>
              </HStack>
            </Card>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  )
};

export default Home;