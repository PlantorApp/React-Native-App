import React,{useState} from "react";
import { Text, Box, FlatList, Image, Heading, HStack, VStack, } from 'native-base';
import { useFonts } from 'expo-font';
import { StyleSheet } from 'react-native';

import { MaterialCommunityIcons,MaterialIcons,FontAwesome5 } from '@expo/vector-icons';
import EditEnv from "../components/dropDown/EditEnv";

const SavedScreen = ({navigation}) => {

    const [showModal, setShowModal] = useState(false)
    
    const [loaded] = useFonts({
        DMSerifText: require('../assets/fonts/DMSerifText-Regular.ttf'),
        QuickSandBold: require('../assets/fonts/Quicksand-Bold.ttf')
    });

    if (!loaded) {
        return null;
    }

    const data = [
        {
            "id" : "1",
            "image": require("../assets/savedpage/illusOutdoorSaved.png"),
            "title" : "Home Balcony",
            "season" : "winter",
            "location" : "Vancouver",
            "temperature": "20C",
            "light":"Artificial light",
            "date":"12/09/2021"
        },
        {
            "id" : "2",
            "image": require("../assets/savedpage/illusIndoorSaved.png"),
            "title" : "Home Living Room",
   
            "season" : "winter",
            "location" : "Vancouver",
            "temperature": "20C",
            "light":"Artificial light",
            "date":"12/09/2021"
        },
        {
            "id" : "3",
            "image": require("../assets/savedpage/illusIndoorSaved.png"),
            "title" : "Office Desk",
            "season" : "winter",
            "location" : "Vancouver",
            "temperature": "20C",
            "light":"Artificial light",
            "date":"12/09/2021"
        },
        {
            "id" : "4",
            "image": require("../assets/savedpage/illusIndoorSaved.png"),
            "title" : "Dining Room",
            "season" : "winter",
            "location" : "Vancouver",
            "temperature": "20C",
            "light":"Artificial light",
            "date":"12/09/2021"
        },
        {
            "id" : "5",
            "image": require("../assets/savedpage/illusIndoorSaved.png"),
            "title" : "Bed Room",
            "season" : "winter",
            "location" : "Vancouver",
            "temperature": "20C",
            "light":"Artificial light",
            "date":"12/09/2021"
        }
      ]


      const handlePress = (option) => {
          console.log('Pressed')
          setShowModal(option)
      }

    return (
        <Box w={{ base: "100%", md: "25%",}}>
      <Heading 
        style={styles.mainTitle} 
      >
      Saved
      </Heading>

            
            <FlatList
                data={data}
                renderItem={({ item }) => (
                            <Box my="2" mx="3" pl="4" pr="5" py="2">
                                <VStack width="100%">
                                    <HStack justifyContent="space-between">
                                        <Text fontSize="2xl" style={styles.titleStyle}>{item.title}</Text>
                                        <EditEnv />
                                    </HStack>

                                    <HStack width="100%" space={2} justifyContent="space-between">
                                        {/* <Image  source ={{
                                            uri: item.avatarUrl
                                        }}  w="100px" h="100px"  alt={item.image}    /> */}
                                        
                                        <Image source={item.image} />
                                        
                                        <VStack space={3}>
                                            <HStack justifyContent="space-around" space={2} alignItems="center" >
                                                <Text fontSize="lg">
                                                    <MaterialCommunityIcons name="weather-cloudy" size={24} color="#B7A878"/>
                                                    {item.season}
                                                </Text>
                                                <Text fontSize="lg">
                                                    <MaterialIcons name="location-on" size={24} color="#B7A878" />
                                                    {item.light}
                                                </Text>
                                            </HStack>

                                            <HStack justifyContent="space-around"  space={2} alignItems="center">
                                                <Text fontSize="lg">
                                                    <FontAwesome5 name="temperature-high" size={24} color="#B7A878" />
                                                    {item.temperature}
                                                </Text>
                                                <Text fontSize="lg">
                                                    <MaterialCommunityIcons name="weather-sunny" size={24} color="#B7A878" />
                                                    {item.location}
                                                </Text>
                                            </HStack>

                                            <Text fontSize="lg">
                                                {item.date}
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </VStack>
                            </Box>
                     )}
                keyExtractor={(item) => item.id}
      />
      
    </Box>


    );
};




export default SavedScreen;


const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     backgroundColor: 'pink'
    // },

mainTitle: {
    fontFamily: "DMSerifText", padding: 14, paddingBottom: 15, color: "#827344", fontSize: 32
  },

titleStyle: {
    color: "#666666",
    fontSize: 20,
    fontFamily: "QuickSandBold"
}
});