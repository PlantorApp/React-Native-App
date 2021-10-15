import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';
import IndoorOutdoor from "../components/suggestionFlow/IndoorOutdoor";
import Temperature from "../components/suggestionFlow/Temperature";
import UserLocation from "../components/suggestionFlow/UserLocation";

const Stack = createNativeStackNavigator();

const Home = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',zIndex: 100 }}>
            <Text>Plant suggestion</Text>
            <Button 
                title="Get Plant Suggestions"
                onPress={() => navigation.navigate('Question1')}
            />
        </View>
    );
};

const HomeScreen = ({ navigation }) => {

    return (
        <Stack.Navigator initialRouteName="PlantsSuggestion">
            <Stack.Screen name="Default" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Question1" component={IndoorOutdoor} />
            <Stack.Screen name="Question2" component={UserLocation} />
            <Stack.Screen name="Question3" component={Temperature} />
        </Stack.Navigator>
    );
};

export default HomeScreen;
