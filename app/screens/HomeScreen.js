import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, Button } from 'react-native';
import IndoorOutdoor from "../components/suggestionFlow/IndoorOutdoor";
import Temperature from "../components/suggestionFlow/Temperature";
import UserLocation from "../components/suggestionFlow/UserLocation";
import Lighting from "../components/suggestionFlow/Lighting";
import NaturalLight from "../components/suggestionFlow/NaturalLight";
import ArtificialLight from "../components/suggestionFlow/ArtificialLight";

const Stack = createNativeStackNavigator();

const Home = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',zIndex: 100 }}>
            <Text>Plant suggestion</Text>
            <Button 
                title="Get Plant Suggestions"
                onPress={() => navigation.navigate('IndoorOutdoor')}
            />
        </View>
    );
};

const HomeScreen = ({ navigation }) => {

    return (
        <Stack.Navigator initialRouteName="PlantsSuggestion">
            <Stack.Screen name="Default" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="IndoorOutdoor" component={IndoorOutdoor} />
            <Stack.Screen name="UserLocation" component={UserLocation} />
            <Stack.Screen name="Temperature" component={Temperature} />
            <Stack.Screen name="Lighting" component={Lighting} />
            <Stack.Screen name="NaturalLight" component={NaturalLight} />
            <Stack.Screen name="ArtificialLight" component={ArtificialLight} />
        </Stack.Navigator>
    );
};

export default HomeScreen;
