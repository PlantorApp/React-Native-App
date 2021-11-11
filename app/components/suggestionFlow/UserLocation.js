import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import * as Location from 'expo-location';

const UserLocation = ({ navigation }) => {
    const [text, setText] = useState("");
    const [bool, setBool] = useState(true);
    const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState("");

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
            let postal;
            for (let item of response) {
                let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
                setDisplayCurrentAddress(item.city);
                if (address.length > 0) {
                    setTimeout(() => {
                        if(item.postalCode) {
                            postal = item.postalCode;
                        } else if(item.name === "Langara College") {
                            postal = "V5Y 2Z6"
                        } else {
                            postal = item.name;
                        }
                        setText(postal);
                    }, 300);
                }
            }
        }
    };

    const getLocation = () => {
        CheckIfLocationEnabled();
        GetCurrentLocation();
    }

    const getCityFromPostal = async () => {
        // console.log(text)
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${text}&key=AIzaSyDZFbQUBmIom77z-BJilZWZ39617HAGmps`)
        const completeResponseObject = await response.json();
        if(!completeResponseObject) {
            return "Invalid Postal"
        }
        const city = completeResponseObject.results[0].formatted_address.split(',');
        return city[0];
    }

    return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>You are currently Located in...</Text>
                <TextInput
                    style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, width: 100, textAlign: 'center' }}
                    onChangeText={setText}
                    placeholder="POSTAL CODE"
                    defaultValue={text}
                />
                <Text>OR</Text>
                <Button title="Locate Me!" onPress={getLocation} />
                <Button title="Next" disabled={bool} onPress={ async () => {
                    if(!displayCurrentAddress) {
                        const cityName = await getCityFromPostal();
                        console.log(cityName);
                        navigation.navigate('Climate', {
                            address: cityName
                        })
                    } else {
                        navigation.navigate('Climate', {
                            address: displayCurrentAddress
                        })
                    }
                }} />
            </View>
        )
}

export default UserLocation

const cities = [
    {
        "id": 1,
        "location": "Vancouver",
        "month": "January",
        "dayLight": "9:22",
        "hourlyMeanTemperature": "5.4"
    },
    {
        "id": 2,
        "location": "Vancouver",
        "month": "February",
        "dayLight": "10:57",
        "hourlyMeanTemperature": "3.5"
    },
    {
        "id": 3,
        "location": "Vancouver",
        "month": "March",
        "dayLight": "13:11",
        "hourlyMeanTemperature": "6.5"
    },
    {
        "id": 4,
        "location": "Vancouver",
        "month": "April",
        "dayLight": "14:35",
        "hourlyMeanTemperature": "9.8"
    },
    {
        "id": 5,
        "location": "Vancouver",
        "month": "May",
        "dayLight": "15:56",
        "hourlyMeanTemperature": "12.7"
    },
    {
        "id": 6,
        "location": "Vancouver",
        "month": "June",
        "dayLight": "16:16",
        "hourlyMeanTemperature": "17.7"
    },
    {
        "id": 7,
        "location": "Vancouver",
        "month": "July",
        "dayLight": "16:11",
        "hourlyMeanTemperature": "19.2"
    },
    {
        "id": 8,
        "location": "Vancouver",
        "month": "August",
        "dayLight": "15.08",
        "hourlyMeanTemperature": "18.7"
    },
    {
        "id": 9,
        "location": "Vancouver",
        "month": "September",
        "dayLight": "13.27",
        "hourlyMeanTemperature": "14.9"
    },
    {
        "id": 10,
        "location": "Vancouver",
        "month": "October",
        "dayLight": "11.38",
        "hourlyMeanTemperature": "11.5"
    },
    {
        "id": 11,
        "location": "Vancouver",
        "month": "November",
        "dayLight": "9:50",
        "hourlyMeanTemperature": "6.6"
    },
    {
        "id": 12,
        "location": "Vancouver",
        "month": "December",
        "dayLight": "8.37",
        "hourlyMeanTemperature": "5.4"
    },

    {
        "id": 13,
        "location": "West Vancouver",
        "month": "January",
        "dayLight": "9:22",
        "hourlyMeanTemperature": "5"
    },
    {
        "id": 14,
        "location": "West Vancouver",
        "month": "February",
        "dayLight": "10:56",
        "hourlyMeanTemperature": "2.8"
    },
    {
        "id": 15,
        "location": "West Vancouver",
        "month": "March",
        "dayLight": "13:12",
        "hourlyMeanTemperature": "6.1"
    },
    {
        "id": 16,
        "location": "West Vancouver",
        "month": "April",
        "dayLight": "14:35",
        "hourlyMeanTemperature": "9.9"
    },
    {
        "id": 17,
        "location": "West Vancouver",
        "month": "May",
        "dayLight": "15:57",
        "hourlyMeanTemperature": "12.2"
    },
    {
        "id": 18,
        "location": "West Vancouver",
        "month": "June",
        "dayLight": "16:17",
        "hourlyMeanTemperature": "18.3"
    },
    {
        "id": 19,
        "location": "West Vancouver",
        "month": "July",
        "dayLight": "16:11",
        "hourlyMeanTemperature": "19.6"
    },
    {
        "id": 20,
        "location": "West Vancouver",
        "month": "August",
        "dayLight": "15.08",
        "hourlyMeanTemperature": "18.7"
    },
    {
        "id": 21,
        "location": "Vancouver",
        "month": "September",
        "dayLight": "13.27",
        "hourlyMeanTemperature": "14.6"
    },
    {
        "id": 22,
        "location": "West Vancouver",
        "month": "October",
        "dayLight": "11.38",
        "hourlyMeanTemperature": "10.9"
    },
    {
        "id": 23,
        "location": "West Vancouver",
        "month": "November",
        "dayLight": "9:50",
        "hourlyMeanTemperature": "6.1"
    },
    {
        "id": 24,
        "location": "West Vancouver",
        "month": "December",
        "dayLight": "8.37",
        "hourlyMeanTemperature": "5.2"
    },

    {
        "id": 25,
        "location": "Richmond",
        "month": "January",
        "dayLight": "9:22",
        "hourlyMeanTemperature": "5.4"
    },
    {
        "id": 26,
        "location": "Richmond",
        "month": "February",
        "dayLight": "10:57",
        "hourlyMeanTemperature": "3.5"
    },
    {
        "id": 27,
        "location": "Richmond",
        "month": "March",
        "dayLight": "13:12",
        "hourlyMeanTemperature": "6.5"
    },
    {
        "id": 28,
        "location": "Richmond",
        "month": "April",
        "dayLight": "14:34",
        "hourlyMeanTemperature": "9.8"
    },
    {
        "id": 29,
        "location": "Richmond",
        "month": "May",
        "dayLight": "15:55",
        "hourlyMeanTemperature": "12.7"
    },
    {
        "id": 30,
        "location": "Richmond",
        "month": "June",
        "dayLight": "16:15",
        "hourlyMeanTemperature": "17.7"
    },
    {
        "id": 31,
        "location": "Richmond",
        "month": "July",
        "dayLight": "16:09",
        "hourlyMeanTemperature": "19.2"
    },
    {
        "id": 32,
        "location": "Richmond",
        "month": "August",
        "dayLight": "15.08",
        "hourlyMeanTemperature": "18.7"
    },
    {
        "id": 33,
        "location":"Richmond",
        "month": "September",
        "dayLight": "13.27",
        "hourlyMeanTemperature": "14.9"
    },
    {
        "id": 34,
        "location": "Richmond",
        "month": "October",
        "dayLight": "11.38",
        "hourlyMeanTemperature": "11.5"
    },
    {
        "id": 35,
        "location": "Richmond",
        "month": "November",
        "dayLight": "9:51",
        "hourlyMeanTemperature": "6.6"
    },
    {
        "id": 36,
        "location": "Richmond",
        "month": "December",
        "dayLight": "8.37",
        "hourlyMeanTemperature": "5.4"
    }
]