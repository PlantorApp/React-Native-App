import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Switch, Pressable } from "react-native";
import { Box, Image, Heading, HStack, VStack } from "native-base";
import { useFonts } from "expo-font";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import Login from "../components/login/Login";
// import propic from "../assets/plantImage.png";

const ProfileScreen = (props) => {
    
    const [name,setName] = useState('user')
    const [email, setEmail] = useState('user12345@gmail.com')
    // const [profilePictureUri, setProfilePictureUri] = useState(propic)

    const setUser = (name, email,profilePicture) => {
      setName(name)
      setEmail(email)
      // setProfilePictureUri(profilePicture)
      // console.log("in profile :" , name, email, profilePicture)
    }

  const [loaded] = useFonts({
    DMSerifText: require("../assets/fonts/DMSerifText-Regular.ttf"),
    QuickSandBold: require("../assets/fonts/Quicksand-Bold.ttf"),
  });

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <Box w={{ base: "100%", md: "25%" }}>
      <Login setUser = {setUser} setIsLogged={props.setIsLogged} setLoggedInUser={props.setLoggedInUser}/>
      <Heading 
        style={styles.mainTitle} 
      >
        Profile
      </Heading>
      <View>
        <Box mt={5}>
          {/* <Image
            source={{
              uri: profilePictureUri,
            }}
            alt="Img"
            width="90"
            height="90"
            // resizeMode="cover"
            borderRadius="90"
          /> */}
        </Box>

        {/* ----------------------------------------- */}

        <VStack width="100%">
          <HStack justifyContent="flex-start" space={2} style={styles.border}>
            <FontAwesome5 name="envelope" size={24} color="#B7A878" />
            <Text fontSize="sm" style={styles.emailStyle}>{email}</Text>
          </HStack>

          <HStack
            width="100%"
            justifyContent="space-between"
            style={styles.border}
          >
            <Text fontSize="md" style={styles.normalText}>Notifications Settings</Text>

            <Switch
              trackColor={{ false: "#767577", true: "#B7A878" }}
              thumbColor={isEnabled ? "#827344" : "#D3D3D3"}
              ios_backgroundColor="#B7A878"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </HStack>
        </VStack>

        <HStack
          width="100%"
          justifyContent="space-between"
          style={styles.border}
        >
          <Text fontSize="md" style={styles.normalText}>Saved Articles</Text>
          <FontAwesome5 name="chevron-right" size={24} color="black" />
        </HStack>


        <Box my="9" mx="0" pl="3" pr="3" w={{ base: "100%"}}>
        <Pressable style={styles.button}>
          <Text>Logout</Text>
        </Pressable> 
        </Box>
      
      </View>
    </Box>
  );
};

export default ProfileScreen;

// style={{borderBottomWidth:1, borderBottom: 1}}
const styles = StyleSheet.create({
  container: {
    fontFamily: "DMSerifText",
    padding: 30,
    paddingBottom: 5,
  },

  border: {
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    paddingBottom: "8%",
    paddingTop: "8%",
    padding: "4%",
  },

  bc: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "orange",
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 90,
    elevation: 1,
    backgroundColor: 'white',
    borderColor: '#827344',
    width: "100%",


   
},
mainTitle: {
  fontFamily: "DMSerifText", padding: 14, paddingBottom: 15, color: "#827344", fontSize: 32
},

normalText: {
  color: "#666666",
  fontSize: 20,
  fontFamily: "Quicksand"
},

emailStyle: {
  color: "#666666"
}
});
