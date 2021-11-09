import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

import { Box, Heading, FlatList, Image, HStack, VStack,} from 'native-base'


const NotificationScreen = ({navigation}) => {

    const [loaded] = useFonts({
        DMSerifText: require('../assets/fonts/DMSerifText-Regular.ttf'),
        QuickSandBold: require('../assets/fonts/Quicksand-Bold.ttf')
    });

    if (!loaded) {
        return null;
    }

    const data = [
        {
            "id" : 1,
            "title" : "Rainfall Warning",
            "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim.",
            "date":"12/09/2021"
        },
        {
            "id" : 2,
            "title" : "Heat Wave Warning",
            "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim.",
            "date":"12/09/2021"
        },
        {
            "id" : 3,
            "title" : "Winter is coming",
            "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim.",
            "date":"12/09/2021"
        },
        {
            "id" : 4,
            "title" : "Heavy Storm Warning",
            "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim.",
            "date":"12/09/2021"
        },
             ]

             const handlePress = (option) => {
                console.log('Pressed')
                setShowModal(option)
            }

    return (
        <Box w={{ base: "100%", md: "25%",}}>
           
        <Heading style={{fontFamily: 'DMSerifText', padding: 4, paddingBottom: 3}}>
            Notifications
        </Heading>
       
        <HStack justifyContent="space-evenly"   style={{fontFamily: 'DMSerifText', padding: 6, paddingBottom: 4,}}>
            
           <Button style={styles.button}
                title="All"
                onPress={() => alert('Button Clicked!')}
            />
               <Button 
                title="Seasonal"
                onPress={() => alert('Button Clicked!')}
            />
               <Button 
                title="Warnings"
                onPress={() => alert('Button Clicked!')}
            />
               <Button 
                title="Hazards"
                onPress={() => alert('Button Clicked!')}
            />
        
                         
                      </HStack>
                      

        <FlatList
  data={data}
  renderItem={({ item }) => (
              <Box my="2" mx="0" pl="4" pr="5" w={{ base: "75%", md: "25%",}}>
                  <VStack width="100%">
                      <HStack justifyContent="space-between" >
                          <Text fontSize="2xl" >{item.title}</Text>
                         
                      </HStack>

                      <HStack width="100%" space={2} justifyContent="flex-start">
                          <Image  source ={{
                                   uri: "https://wallpaperaccess.com/full/317501.jpg",
                          }}  w="100px" h="100px" backgroundColor="rgb(200,150,139)" alt={item.title} paddingTop="5"/>
                          <VStack space={2}>
                             
                              <HStack justifyContent="flex-start" space={2}>
                                  <Text fontSize="md">
                                     {item.description}
                                  </Text>
                                  
                              </HStack>
                                  <Text fontSize="md">
                                  {item.date}
                              </Text>
                          </VStack>
                      </HStack>
                  </VStack>
              </Box>
       )}
       keyExtractor={(item) => item.id}
            // <Button 
            //     title="Click here"
            //     onPress={() => alert('Button Clicked!')}
            // />
        />
        </Box>
    );
};

export default NotificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
    button: {
    backgroundColor: "gray",
    padding: 20,
    borderRadius: 90
}

});