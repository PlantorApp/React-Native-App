import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import React, {useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import HomeScreen from './app/screens/HomeScreen';

export default function App() {

  const [isLogged, setIsLogged] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});

  
  // console.log("logged in user is : ", loggedInUser);
  // console.log("value of is logged is: ", isLogged);
  // console.log("App.js has setLoggedInUser ", setLoggedInUser)
  useEffect(() => {
    registerForPushNotification().then(token => console.log(token)).catch(err => console.log(err))    
  }, []);
    
  async function registerForPushNotification() {
    const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status!='granted') {
      const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
    if (status !='granted') {
      alert('Fail to get the push token');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  }

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <HomeScreen isLogged={isLogged} setIsLogged={setIsLogged} setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
      </NavigationContainer>
      <StatusBar style='dark' />
    </NativeBaseProvider>
  )
}

