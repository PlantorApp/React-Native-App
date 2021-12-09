import { Card } from 'react-native-elements';
import React, { useState } from 'react';
import { Text, View, HStack } from "native-base";
import { TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';

const Lighting = ({ navigation }) => {
    const [natural, setNatural] = useState(false)
    const [artificial, setArtificial] = useState(false)

    const DismissKeyboard = ({ children }) => (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
    );

    return (
        <DismissKeyboard>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Will you plants have exposure to natural or artificial light?</Text>
                <HStack>
                    <TouchableOpacity onPress={() => {navigation.navigate('NaturalLight'); setNatural(true)}}>
                        <Card>
                        {/* <Card.Image source={require('../../assets/cardImage.svg')} /> */}
                        <Card.Title>Natural Light</Card.Title>
                    </Card>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate('ArtificialLight'); setArtificial(true);}}>
                        <Card>
                        {/* <Card.Image source={require('../../assets/cardImage.svg')} /> */}
                        <Card.Title>Artificial Light</Card.Title>
                    </Card>
                    </TouchableOpacity>
                </HStack>
            </View>
        </DismissKeyboard>
    )
}

export default Lighting