import { Card } from 'react-native-elements';
import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { HStack } from 'native-base';
import UserLocation from './UserLocation';

const IndoorOutdoor = ({ navigation }) => {
    // const [indoor, setIndoor] = useState(false)
    // const [outdoor, setOutdoor] = useState(false)

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30, textAlign: 'center' }}>Will the plant be growing Indoor or Outdoor?</Text>
            <HStack>
                <TouchableOpacity onPress={() => navigation.navigate('Question2')}>
                    <Card>
                    <Card.Image source={require('../../assets/cardImage.svg')} />
                    <Card.Title>Grow Indoor</Card.Title>
                </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Question2')}>
                    <Card>
                    <Card.Image source={require('../../assets/cardImage.svg')} />
                    <Card.Title>Grow Outdoor</Card.Title>
                </Card>
                </TouchableOpacity>
            </HStack>
            {/* <Button onPress={() => navigation.goBack()} title="Dismiss" /> */}
        </View>
    )
}

export default IndoorOutdoor