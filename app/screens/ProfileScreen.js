import React, { useState,useEffect } from "react";
import { View, Text, Button, StyleSheet, Switch } from "react-native";
import { Box, Image, Heading, HStack, VStack } from "native-base";
import { useFonts } from "expo-font";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { color } from "react-native-reanimated";
import { borderColor } from "styled-system";
import Login from "../components/login/Login";

const ProfileScreen = ({ navigation }) => {
    const [name,setName] = useState('user')
    const [email, setEmail] = useState('tomholland@gmail.com')
    const [profilePictureUri, setProfilePictureUri] = useState("")

    const setUser = (name, email,profilePicture) => {
      setName(name)
      setEmail(email)
      setProfilePictureUri(profilePicture)
      console.log("in profile :" , name, email, profilePicture)
    }

  const [loaded] = useFonts({
    DMSerifText: require("../assets/fonts/DMSerifText-Regular.ttf"),
    QuickSandBold: require("../assets/fonts/Quicksand-Bold.ttf"),
  });

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <Box w={{ base: "100%", md: "25%" }}>
      <Login setUser = {setUser}/>
      <Heading
        style={{ fontFamily: "DMSerifText", padding: 4, paddingBottom: 3 }}
      >
        Profile
      </Heading>
      <View>
        <Box mt={5}>
          <Image
            source={{
              uri: profilePictureUri,
            }}
            alt="Img"
            width="90"
            height="90"
            // resizeMode="cover"
            borderRadius="90"
          />
        </Box>

        {/* ----------------------------------------- */}

        <VStack width="100%">
          <HStack justifyContent="flex-start" space={2} style={styles.border}>
            <FontAwesome5 name="envelope" size={24} color="black" />
            <Text fontSize="sm">{email}</Text>
          </HStack>

          <HStack
            width="100%"
            justifyContent="space-between"
            style={styles.border}
          >
            <Text fontSize="md">Notifications Settings</Text>

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
          <Text fontSize="md">Saved Articles</Text>
          <FontAwesome5 name="chevron-right" size={24} color="black" />
        </HStack>

        <Button
          title="Log Out"
          style={styles.bc}
          onPress={() => alert("Button Clicked!")}
        />
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
});
