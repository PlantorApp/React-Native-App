import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const UserLocation = ({ navigation }) => {
    const [text, setText] = useState("");
    const [bool, setBool] = useState(true);

    useEffect(() => {
        if(text) {
            if (text.length === 6) {
                setBool(false)
            } else {
                setBool(true)
            }
        }
    }, [text]
    );

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Input Location</Text>
            <TextInput
                style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
                onChangeText={setText}
                placeholder="POSTAL CODE"
            />
            <Text>OR</Text>
            <Button title="Locate Me!" />
            <Button title="Next" disabled={bool} onPress={() => navigation.navigate('Question3')} />

        </View>
    )
}

export default UserLocation