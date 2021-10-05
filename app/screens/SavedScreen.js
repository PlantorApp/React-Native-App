import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';

const SavedScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <Button 
                title="Click here"
                onPress={() => alert('Button Clicked!')}
            />
        </View>
    );
};

export default SavedScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    }
});