import React, { useEffect } from 'react';
import { View } from "native-base";
import { useState } from "react";
import { Text } from "react-native";

// const { SensorManager } = NativeModules;
const ArtificialLight = () => {
    const [lightValue, setLightValue] = useState("LUX")

    // console.log(NativeModules)

    useEffect(() => {
        // SensorManager.startLightSensor(100);
        // DeviceEventEmitter.addListener('LightSensor', function (data) {
        //     console.log(data.light)
        // });
        // SensorManager.stopLightSensor();
    })

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Place phone at plant location and record light value</Text>
            <Text style={{borderWidth: 1, backgroundColor: "white", width: 100}}>{lightValue}</Text>
        </View>
    )
}

export default ArtificialLight