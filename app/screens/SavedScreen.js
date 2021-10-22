import React,{useState} from "react";
import { Text,
    Box,
    FlatList,
    Image,
    Heading,
    HStack,
    VStack, } from 'native-base';

import { MaterialCommunityIcons,MaterialIcons,FontAwesome5 } from '@expo/vector-icons';
import EditEnv from "../components/dropDown/EditEnv";

const SavedScreen = ({navigation}) => {

    const [showModal, setShowModal] = useState(false)

    const data = [
        {
            "id" : 1,
            "title" : "Home Balcony",
            "season" : "winter",
            "location" : "Vancouver",
            "temperature": "20C",
            "light":"Artificial light",
            "date":"12/09/2021"
        },
        {
            "id" : 2,
            "title" : "Home Living Room",
            "season" : "winter",
            "location" : "Vancouver",
            "temperature": "20C",
            "light":"Artificial light",
            "date":"12/09/2021"
        },
        {
            "id" : 3,
            "title" : "Office Desk",
            "season" : "winter",
            "location" : "Vancouver",
            "temperature": "20C",
            "light":"Artificial light",
            "date":"12/09/2021"
        },
        {
            "id" : 4,
            "title" : "Dining Room",
            "season" : "winter",
            "location" : "Vancouver",
            "temperature": "20C",
            "light":"Artificial light",
            "date":"12/09/2021"
        },
        {
            "id" : 5,
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
            <Heading fontSize="2xl" p="4" pb="3">
                Saved
            </Heading>
            
            <FlatList
                data={data}
                renderItem={({ item }) => (
                            <Box my="2" mx="3" pl="4" pr="5" py="2">
                                <VStack width="100%">
                                    <HStack justifyContent="space-between">
                                        <Text fontSize="2xl">{item.title}</Text>
                                        <EditEnv />
                                    </HStack>

                                    <HStack width="100%" space={2} justifyContent="space-between">
                                        <Image  source ={{
                                            uri: item.avatarUrl
                                        }}  w="100px" h="100px" backgroundColor="rgb(200,150,139)" alt={item.title}/>
                                        <VStack space={3}>
                                            <HStack justifyContent="space-around" space={2}>
                                                <Text fontSize="lg">
                                                    <MaterialCommunityIcons name="weather-cloudy" size={24} color="black"/>
                                                    {item.season}
                                                </Text>
                                                <Text fontSize="lg">
                                                    <MaterialIcons name="location-on" size={24} color="black" />
                                                    {item.light}
                                                </Text>
                                            </HStack>

                                            <HStack justifyContent="space-around"  space={2}>
                                                <Text fontSize="lg">
                                                    <FontAwesome5 name="temperature-high" size={24} color="black" />
                                                    {item.temperature}
                                                </Text>
                                                <Text fontSize="lg">
                                                    <MaterialCommunityIcons name="weather-sunny" size={24} color="black" />
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



// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#8fcbbc'
//     }
// });

export default SavedScreen;
