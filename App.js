import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Nav from './app/components/nav/Nav';


export default function App() {


  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Nav />
      </NavigationContainer>
      <StatusBar style='dark' />
    </NativeBaseProvider>
);
}

