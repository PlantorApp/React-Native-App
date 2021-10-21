import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as Location from 'expo-location';

const UserLocation = ({ navigation }) => {
    const [text, setText] = useState("");
    const [bool, setBool] = useState(true);
    const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState('Fetching location...');

    useEffect(() => {
        if(text) {
            if (text.length === 6 || text.length === 7) {
                setBool(false)
            } else {
                setBool(true)
            }
        }
    }, [text]);

    // Checking if location permitted or not

    const CheckIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
    
        if (!enabled) {
            Alert.alert(
                'Location Service not enabled',
                'Please enable your location services to continue',
                [{ text: 'OK' }],
                { cancelable: false }
            );
        } else {
            setLocationServiceEnabled(enabled);
        }
    };

    const GetCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
      
        if (status !== 'granted') {
            Alert.alert(
                'Permission not granted',
                'Allow the app to use location service.',
                [{ text: 'OK' }],
                { cancelable: false }
            );
        }

        let { coords } = await Location.getCurrentPositionAsync();
        if (coords) {
            const { latitude, longitude } = coords;
            let response = await Location.reverseGeocodeAsync({ latitude, longitude });

            for (let item of response) {
                let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
                setDisplayCurrentAddress(address);
                if (address.length > 0) {
                    setTimeout(() => {
                        setText(item.postalCode);
``                    }, 300);
                }
            }
        }
    };

    const getLocation = () => {
        CheckIfLocationEnabled();
        GetCurrentLocation();
    }

    const DismissKeyboard = ({ children }) => (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
    );

    return (
        <DismissKeyboard>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Input Location</Text>
                <Text>{displayCurrentAddress}</Text>
                <TextInput
                    style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, width: 100, textAlign: 'center' }}
                    onChangeText={setText}
                    placeholder="POSTAL CODE"
                    defaultValue={text}
                />
                <Text>OR</Text>
                <Button title="Locate Me!" onPress={getLocation} />
                <Button title="Next" disabled={bool} onPress={() => navigation.navigate('Temperature')} />
            </View>
        </DismissKeyboard>
    )
}

export default UserLocation