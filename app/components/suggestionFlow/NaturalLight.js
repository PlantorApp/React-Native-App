import React, { useState } from 'react';
import { View } from "native-base"
import { Button, Text } from "react-native"

const NaturalLight = () => {
    const [lightDirection, setLightDirection] = useState("")
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Please orient your phone towards the natural light source</Text>
            <Text style={{borderWidth: 1, backgroundColor: "white", width: 100}}>{lightDirection}</Text>
            <Button title="OK, got it!" />
        </View>
    )
}

export default NaturalLight