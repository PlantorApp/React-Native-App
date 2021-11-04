import { Card } from 'react-native-elements';
import React, { useState } from 'react';
import { Text, View, HStack } from "native-base";
import { TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';

const PetFriendly = ({ navigation }) => {
    const [friendly, setFriendly] = useState(false)

    const DismissKeyboard = ({ children }) => (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
    );

    return (
        <DismissKeyboard>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Would you like us to suggest only pet friendly plants?</Text>
                <HStack>
                    <TouchableOpacity onPress={() => {navigation.navigate('Suggestions'); setFriendly(true)}}>
                        <Card>
                        <Card.Image source={require('../../assets/cardImage.svg')} />
                        <Card.Title>Yes please!</Card.Title>
                    </Card>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate('Suggestions'); setFriendly(false);}}>
                        <Card>
                        <Card.Image source={require('../../assets/cardImage.svg')} />
                        <Card.Title>No thanks</Card.Title>
                    </Card>
                    </TouchableOpacity>
                </HStack>
            </View>
        </DismissKeyboard>
    )
}

export default PetFriendly