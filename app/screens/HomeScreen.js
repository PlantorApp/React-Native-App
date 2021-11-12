import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { useFonts } from 'expo-font';
import { View, Image, Platform, TouchableOpacity } from 'react-native';
import IndoorOutdoor from "../components/suggestionFlow/IndoorOutdoor";
import Temperature from "../components/suggestionFlow/Temperature";
import UserLocation from "../components/suggestionFlow/UserLocation";
import Lighting from "../components/suggestionFlow/Lighting";
import NaturalLight from "../components/suggestionFlow/NaturalLight";
import NaturalLightDirection from "../components/suggestionFlow/NaturalLightDirection";
import ArtificialLight from "../components/suggestionFlow/ArtificialLight";
import { Card } from 'react-native-elements';
import { Box, Heading, HStack, ScrollView } from "native-base";
import Svg, { Path } from 'react-native-svg';
import PetFriendly from "../components/suggestionFlow/PetFriendly";
import Suggestions from "../components/suggestionFlow/Suggestions";
import Climate from "../components/suggestionFlow/Climate";
// const  = Svg;

const Stack = createNativeStackNavigator();

const Home = ({ navigation }) => {
    const [bookmarked, setBookmarked] = useState(false)

    const [loaded] = useFonts({
        DMSerifText: require('../assets/fonts/DMSerifText-Regular.ttf'),
        QuickSandBold: require('../assets/fonts/Quicksand-Bold.ttf')
    });

    if (!loaded) {
        return null;
    }

    const bookmark = () => {
        if (!bookmarked) {
            setBookmarked(true)
            /* 
            * Code to save this article to user's object
            */
        } else {
            setBookmarked(false)
            /* 
            * Code to remove this article from user's object
            */
        }
    }

    return (
        <ScrollView containerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Heading style={{fontFamily: 'DMSerifText', marginTop: 60, paddingHorizontal: 80, textAlign: 'center'}}>Tap to get plant suggestions</Heading>
            {/* <Button 
                title="Get Plant Suggestions"
                onPress={() => navigation.navigate('IndoorOutdoor')}
            /> */}
            <Box style={{height: 200, alignItems: 'center', marginTop: 60}}>
                <TouchableOpacity onPress={() => navigation.navigate('IndoorOutdoor')}>
                    <Image source={require('../assets/plantSuggestions.png')} style={{width: 200, height: 200}} />
                </TouchableOpacity>
            </Box>
            <Heading style={{fontFamily: 'DMSerifText', width: '100%', textAlign: 'left', marginTop: 60, paddingLeft: 24}}>Gardening Tips</Heading>
            <View style={{height: 300}}>
            <ScrollView 
                horizontal 
                decelerationRate={0} 
                snapToInterval={302} 
                snapToAlignment="center" 
                contentInset={{ top: 0, left: 8, bottom: 0, right: 8}} 
                contentContainerStyle={{paddingHorizontal: Platform.OS === 'android' ? 8 : 0}}
            >
                <Card containerStyle={{width: 286, height: 274, borderWidth: 0, borderRadius: 20, padding: 0}}>
                    <Card.Image source={require('../assets/cardImage.svg')} style={{width: 286, height: 196, borderTopLeftRadius: 20, borderTopRightRadius: 20}} />
                    <HStack style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 16, paddingVertical: 12}}>
                        <Card.Title style={{textAlign: 'left', fontFamily: 'QuickSandBold', fontSize: 20, width: '80%'}}>Gardening 101: A Beginner’s Guide To...</Card.Title>
                        <Svg onPress={bookmark} width="25" height="45" viewBox="0 10 55 45" fill={bookmarked ? "#eee" : "none"} xmlns="http://www.w3.org/2000/svg">
                            <Path d="M1.51322 7.50442C1.51322 4.7175 2.36616 2 7.57305 2H48.1322C50.7654 2 53.3391 2.61491 53.3044 7.06308C53.2696 11.5112 53.3044 66.2777 53.3044 67.8646C53.3044 70.6714 52.1688 74.2567 47.2495 70.1259C42.3302 65.9951 30.771 55.1598 29.6502 54.1184C28.5295 53.0771 27.3146 52.4473 25.2963 54.1829C23.278 55.9185 7.69702 69.6945 7.69702 69.6945C7.69702 69.6945 1.50331 75.1493 1.51322 68.306C1.48347 63.6049 1.51322 10.2913 1.51322 7.50442Z" stroke="#231F20" strokeWidth="3" strokeMiterlimit="10"/>
                        </Svg>
                    </HStack>
                </Card>
                <Card containerStyle={{width: 286, height: 274, borderWidth: 0, borderRadius: 20, padding: 0}}>
                    <Card.Image source={require('../assets/cardImage.svg')} style={{width: 286, height: 196, borderTopLeftRadius: 20, borderTopRightRadius: 20}} />
                    <HStack style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 16, paddingVertical: 12}}>
                        <Card.Title style={{textAlign: 'left', fontFamily: 'QuickSandBold', fontSize: 20, width: '80%'}}>Gardening 101: A Beginner’s Guide To...</Card.Title>
                        <Svg onPress={bookmark} width="25" height="45" viewBox="0 10 55 45" fill={bookmarked ? "#eee" : "none"} xmlns="http://www.w3.org/2000/svg">
                            <Path d="M1.51322 7.50442C1.51322 4.7175 2.36616 2 7.57305 2H48.1322C50.7654 2 53.3391 2.61491 53.3044 7.06308C53.2696 11.5112 53.3044 66.2777 53.3044 67.8646C53.3044 70.6714 52.1688 74.2567 47.2495 70.1259C42.3302 65.9951 30.771 55.1598 29.6502 54.1184C28.5295 53.0771 27.3146 52.4473 25.2963 54.1829C23.278 55.9185 7.69702 69.6945 7.69702 69.6945C7.69702 69.6945 1.50331 75.1493 1.51322 68.306C1.48347 63.6049 1.51322 10.2913 1.51322 7.50442Z" stroke="#231F20" strokeWidth="3" strokeMiterlimit="10"/>
                        </Svg>
                    </HStack>
                </Card>
                <Card containerStyle={{width: 286, height: 274, borderWidth: 0, borderRadius: 20, padding: 0}}>
                    <Card.Image source={require('../assets/cardImage.svg')} style={{width: 286, height: 196, borderTopLeftRadius: 20, borderTopRightRadius: 20}} />
                    <HStack style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 16, paddingVertical: 12}}>
                        <Card.Title style={{textAlign: 'left', fontFamily: 'QuickSandBold', fontSize: 20, width: '80%'}}>Gardening 101: A Beginner’s Guide To...</Card.Title>
                        <Svg onPress={bookmark} width="25" height="45" viewBox="0 10 55 45" fill={bookmarked ? "#eee" : "none"} xmlns="http://www.w3.org/2000/svg">
                            <Path d="M1.51322 7.50442C1.51322 4.7175 2.36616 2 7.57305 2H48.1322C50.7654 2 53.3391 2.61491 53.3044 7.06308C53.2696 11.5112 53.3044 66.2777 53.3044 67.8646C53.3044 70.6714 52.1688 74.2567 47.2495 70.1259C42.3302 65.9951 30.771 55.1598 29.6502 54.1184C28.5295 53.0771 27.3146 52.4473 25.2963 54.1829C23.278 55.9185 7.69702 69.6945 7.69702 69.6945C7.69702 69.6945 1.50331 75.1493 1.51322 68.306C1.48347 63.6049 1.51322 10.2913 1.51322 7.50442Z" stroke="#231F20" strokeWidth="3" strokeMiterlimit="10"/>
                        </Svg>
                    </HStack>
                </Card>
                <Card containerStyle={{width: 286, height: 274, borderWidth: 0, borderRadius: 20, padding: 0}}>
                    <Card.Image source={require('../assets/cardImage.svg')} style={{width: 286, height: 196, borderTopLeftRadius: 20, borderTopRightRadius: 20}} />
                    <HStack style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 16, paddingVertical: 12}}>
                        <Card.Title style={{textAlign: 'left', fontFamily: 'QuickSandBold', fontSize: 20, width: '80%'}}>Gardening 101: A Beginner’s Guide To...</Card.Title>
                        <Svg onPress={bookmark} width="25" height="45" viewBox="0 10 55 45" fill={bookmarked ? "#eee" : "none"} xmlns="http://www.w3.org/2000/svg">
                            <Path d="M1.51322 7.50442C1.51322 4.7175 2.36616 2 7.57305 2H48.1322C50.7654 2 53.3391 2.61491 53.3044 7.06308C53.2696 11.5112 53.3044 66.2777 53.3044 67.8646C53.3044 70.6714 52.1688 74.2567 47.2495 70.1259C42.3302 65.9951 30.771 55.1598 29.6502 54.1184C28.5295 53.0771 27.3146 52.4473 25.2963 54.1829C23.278 55.9185 7.69702 69.6945 7.69702 69.6945C7.69702 69.6945 1.50331 75.1493 1.51322 68.306C1.48347 63.6049 1.51322 10.2913 1.51322 7.50442Z" stroke="#231F20" strokeWidth="3" strokeMiterlimit="10"/>
                        </Svg>
                    </HStack>
                </Card>
                <Card containerStyle={{width: 286, height: 274, borderWidth: 0, borderRadius: 20, padding: 0}}>
                    <Card.Image source={require('../assets/cardImage.svg')} style={{width: 286, height: 196, borderTopLeftRadius: 20, borderTopRightRadius: 20}} />
                    <HStack style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 16, paddingVertical: 12}}>
                        <Card.Title style={{textAlign: 'left', fontFamily: 'QuickSandBold', fontSize: 20, width: '80%'}}>Gardening 101: A Beginner’s Guide To...</Card.Title>
                        <Svg onPress={bookmark} width="25" height="45" viewBox="0 10 55 45" fill={bookmarked ? "#eee" : "none"} xmlns="http://www.w3.org/2000/svg">
                            <Path d="M1.51322 7.50442C1.51322 4.7175 2.36616 2 7.57305 2H48.1322C50.7654 2 53.3391 2.61491 53.3044 7.06308C53.2696 11.5112 53.3044 66.2777 53.3044 67.8646C53.3044 70.6714 52.1688 74.2567 47.2495 70.1259C42.3302 65.9951 30.771 55.1598 29.6502 54.1184C28.5295 53.0771 27.3146 52.4473 25.2963 54.1829C23.278 55.9185 7.69702 69.6945 7.69702 69.6945C7.69702 69.6945 1.50331 75.1493 1.51322 68.306C1.48347 63.6049 1.51322 10.2913 1.51322 7.50442Z" stroke="#231F20" strokeWidth="3" strokeMiterlimit="10"/>
                        </Svg>
                    </HStack>
                </Card>
            </ScrollView>
            </View>
        </ScrollView>
    );
};

const HomeScreen = ({ navigation }) => {

    return (
        <Stack.Navigator initialRouteName="PlantsSuggestion">
            <Stack.Screen name="Default" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="IndoorOutdoor" component={IndoorOutdoor} />
            <Stack.Screen name="UserLocation" component={UserLocation} />
            <Stack.Screen name="Climate" component={Climate} />
            <Stack.Screen name="Temperature" component={Temperature} />
            <Stack.Screen name="Lighting" component={Lighting} />
            <Stack.Screen name="NaturalLight" component={NaturalLight} />
            <Stack.Screen name="NaturalLightDirection" component={NaturalLightDirection} />
            <Stack.Screen name="ArtificialLight" component={ArtificialLight} />
            <Stack.Screen name="PetFriendly" component={PetFriendly} />
            <Stack.Screen name="Suggestions" component={Suggestions} />
        </Stack.Navigator>
    );
};

export default HomeScreen;
