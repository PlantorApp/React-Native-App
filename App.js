import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import Navigation from './app/components/navigation/Navigation';
import NavigationBar from 'react-native-navigation-bar';
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hi!</Text>
      <StatusBar style="auto" />
      <NavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
