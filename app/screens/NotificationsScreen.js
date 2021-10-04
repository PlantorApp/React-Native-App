import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';

const NotificationScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Notification</Text>
            <Button 
                title="Click here"
                onPress={() => alert('Button Clicked!')}
            />
        </View>
    );
};

export default NotificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor= '#8fcbbc'
    }
});