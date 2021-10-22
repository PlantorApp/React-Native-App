import React, { useEffect } from 'react';
import { View } from "native-base";
import { useState } from "react";
import { Text } from "react-native";
import { WebView } from 'react-native-webview';
// import { AmbientLightSensor } from 'window';

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
            <WebView
                // source={require('./resources/index.html')}
                injectedJavaScript={'(async function(){ const {state} = await navigator.permissions.query({ name: "ambient-light-sensor" }); if (state !== "granted") {console.warn("You havent granted permission to use the light sensor");return;} const sensor = new AmbientLightSensor(); sensor.addEventListener("reading", () => { console.log(sensor.illuminance); }); sensor.addEventListener("error", err => { console.error(err); }); sensor.start(); }());'}
                onNavigationStateChange={(navEvent)=> console.log(navEvent.jsEvaluationValue)}
            />
            <Text style={{borderWidth: 1, backgroundColor: "white", width: 100}}>{lightValue}</Text>
        </View>
    )
}

export default ArtificialLight