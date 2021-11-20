import React,{useEffect, useState} from "react";
import { Text, Box, FlatList, Image, Heading, HStack, VStack, } from 'native-base';
import { useFonts } from 'expo-font';

import { MaterialCommunityIcons,MaterialIcons,FontAwesome5 } from '@expo/vector-icons';
import EditEnv from "../components/dropDown/EditEnv";
import { getUserIDAsync } from "expo-facebook";

const SavedScreen = (props) => {


    const [showModal, setShowModal] = useState(false);    
    const [loaded] = useFonts({
        DMSerifText: require('../assets/fonts/DMSerifText-Regular.ttf'),
        QuickSandBold: require('../assets/fonts/Quicksand-Bold.ttf')
    });


    // useEffect(() => {
    //     const getUser = async () => {
    //         const response = await fetch(`http://54.148.107.164/backend-users/users/${props.loggedInUser.sub}`);
    //         const data = await response.json();
    //         setUser(data)
    //         setEnvList(data.savedEnvironments)
    //         console.log("list ah aa:" , envList)
    //     }
    //     getUser()
    // },[])

    if (!loaded) {
        return null;
    }

    // const data = [
    //     {
    //         "id" : "1",
    //         "title" : "Home Balcony",
    //         "season" : "winter",
    //         "location" : "Vancouver",
    //         "temperature": "20C",
    //         "light":"Artificial light",
    //         "date":"12/09/2021"
    //     },
    //     {
    //         "id" : "2",
    //         "title" : "Home Living Room",
    //         "season" : "winter",
    //         "location" : "Vancouver",
    //         "temperature": "20C",
    //         "light":"Artificial light",
    //         "date":"12/09/2021"
    //     },
    //     {
    //         "id" : "3",
    //         "title" : "Office Desk",
    //         "season" : "winter",
    //         "location" : "Vancouver",
    //         "temperature": "20C",
    //         "light":"Artificial light",
    //         "date":"12/09/2021"
    //     },
    //     {
    //         "id" : "4",
    //         "title" : "Dining Room",
    //         "season" : "winter",
    //         "location" : "Vancouver",
    //         "temperature": "20C",
    //         "light":"Artificial light",
    //         "date":"12/09/2021"
    //     },
    //     {
    //         "id" : "5",
    //         "title" : "Bed Room",
    //         "season" : "winter",
    //         "location" : "Vancouver",
    //         "temperature": "20C",
    //         "light":"Artificial light",
    //         "date":"12/09/2021"
    //     }
    //   ]

    const data = props.envList;

    //   const list = []
    //   envList.forEach(element => {
    //     list.push(data[element])    
    //   });
      
      const handlePress = (option) => {
          console.log('Pressed')
          setShowModal(option)
      }

    return (
        <Box w={{ base: "100%", md: "25%",}}>
            <Heading style={{fontFamily: 'DMSerifText', padding: 4, paddingBottom: 3}}>
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



export default SavedScreen;
