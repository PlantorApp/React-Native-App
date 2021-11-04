import React from 'react';
import { View } from "native-base"
import { Button, Image, Text } from "react-native"

const NaturalLight = ({ navigation }) => {
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Please orient your phone towards the natural light source</Text>
            <Image source={require('../../assets/cardImage.svg')} style={{width: 200, height: 200}} />
            <Button title="OK, got it!" onPress={() => navigation.navigate('NaturalLightDirection')} />
        </View>
    )
}

export default NaturalLight