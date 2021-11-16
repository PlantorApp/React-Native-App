import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import Nav from './app/components/nav/Nav';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import HomeScreen from './app/screens/HomeScreen';


export default function App() {
  useEffect(()=>{
    registerForPushNotification().then(token=>console.log(token)).catch(err => console.log(err))
    
    }, [])
    
      async function registerForPushNotification(){
      const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      if (status!='granted'){
        const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    
      }
      if (status !='granted'){
        alert('Fail to get the push token');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      return token
    
      }

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
      <StatusBar style='dark' />
    </NativeBaseProvider>
);
}

