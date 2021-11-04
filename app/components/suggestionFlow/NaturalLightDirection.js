import React, { useState, useEffect } from 'react';
import { View } from "native-base";
import { Button, Text, TouchableOpacity } from "react-native";
import { Magnetometer } from 'expo-sensors';
import LPF from 'lpf';


const round = (n) => {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}

const NaturalLightDirection = ({ navigation }) => {
  const [lightDirection, setLightDirection] = useState("");
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [subscription, setSubscription] = useState(null);

  const _slow = () => {
    Magnetometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Magnetometer.setUpdateInterval(200);
  };

  const _angle = (magnetometer) => {
    if (magnetometer) {
      let { x, y, z } = magnetometer

      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI)
      } else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI)
      }
    }

    return Math.round(LPF.next(angle))
  }

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener(result => {
        setData(result);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const { x, y, z } = data;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Please orient your phone towards the natural light source</Text>
      <Text>x: {round(x)} y: {round(y)} z: {round(z)}</Text>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe}>
          <Text>{subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
      <Text style={{borderWidth: 1, backgroundColor: "white", width: 100}}>{lightDirection}</Text>
      <Button title="OK, got it!" onPress={() => navigation.navigate('PetFriendly')} />
    </View>
  )
}

export default NaturalLightDirection