import React, { useState, useEffect } from 'react';
import { View } from "native-base";
import { Button, Text } from "react-native";
import { Magnetometer } from 'expo-sensors';

const round = (n) => {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}

const NaturalLightDirection = ({ navigation }) => {
  const [lightDirection, setLightDirection] = useState("");
  const [captured, setCaptured] = useState("");
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);
  let timeout = false;

  const _slow = () => {
    Magnetometer.setUpdateInterval(500);
  };

  const _direction = (degree) => {
    if (degree >= 22.5 && degree < 67.5) {
      return 'NE';
    }
    else if (degree >= 67.5 && degree < 112.5) {
      return 'E';
    }
    else if (degree >= 112.5 && degree < 157.5) {
      return 'SE';
    }
    else if (degree >= 157.5 && degree < 202.5) {
      return 'S';
    }
    else if (degree >= 202.5 && degree < 247.5) {
      return 'SW';
    }
    else if (degree >= 247.5 && degree < 292.5) {
      return 'W';
    }
    else if (degree >= 292.5 && degree < 337.5) {
      return 'NW';
    }
    else {
      return 'N';
    }
  };

  const _angle = (magnetometer) => {
    if (magnetometer) {
      let {x, y, z} = magnetometer;
      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      }
      else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }
    let dir = _direction(Math.round(angle));
    setLightDirection(dir);
    if(timeout === true){
      setCaptured(dir)
      timeout = false
    }
  }

  const updateDirection = () => {
    setTimeout(() => {
      timeout = true;
    }, 3000)
  }

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener(result => {
        setData(result);
        _angle(result);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    updateDirection();
    _subscribe();
    _slow();
    return () => _unsubscribe();
  }, []);

  const { x, y, z } = data;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Please orient your phone towards the natural light source</Text>
      <Text style={{borderWidth: 1, backgroundColor: "white", width: 100, marginTop: 24}}>Current Direction: {lightDirection}</Text>
      <Text style={{borderWidth: 1, backgroundColor: "white", width: 100, marginTop: 24, marginBottom: 24}}>Captured Direction: {captured}</Text>
      <Button title="Next" onPress={() => {
        navigation.navigate('PetFriendly', {
          lightDir: captured
        })
      }} />
    </View>
  )
}

export default NaturalLightDirection