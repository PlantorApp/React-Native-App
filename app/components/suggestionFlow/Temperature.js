import React, { useState, useEffect } from 'react';
import { Text, View } from "native-base"
import { TextInput, Button, Keyboard, TouchableWithoutFeedback } from 'react-native';

const Temperature = ({ navigation }) => {
    const [text, setText] = useState("")
    const [bool, setBool] = useState(true);

    useEffect(() => {
        if(text) {
            if (text) {
                setBool(false)
            } else {
                setBool(true)
            }
        }
    }, [text]);

    const DismissKeyboard = ({ children }) => (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
    );

    return (
        <DismissKeyboard>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>What is the average temperature indoors at your place?</Text>
                <TextInput
                    style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, width: 100, textAlign: 'center' }}
                    onChangeText={setText}
                    placeholder="°C"
                    defaultValue={text}
                    keyboardType='number-pad'
                />
                <Button title="Next" disabled={bool} onPress={() => navigation.navigate('Lighting')} />
            </View>
        </DismissKeyboard>
    )
}

export default Temperature