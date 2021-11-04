import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Box, Image, Heading } from "native-base";
import { useFonts } from "expo-font";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  const [loaded] = useFonts({
    DMSerifText: require("../assets/fonts/DMSerifText-Regular.ttf"),
    QuickSandBold: require("../assets/fonts/Quicksand-Bold.ttf"),
  });

  return (
    <Box w={{ base: "100%", md: "25%" }}>
      <Heading
        style={{ fontFamily: "DMSerifText", padding: 4, paddingBottom: 3 }}
      >
        Profile
      </Heading>
      <View style={styles.container}>
      
        <Box mt={5}>
          <Image
            source={{
              uri: "https://wallpaperaccess.com/full/317501.jpg",
            }}
            alt="Img"
            width="90"
            height="90"
            // resizeMode="cover"
          />
        </Box>

        <Text fontSize="md" style={styles.container}>Notifications Settings</Text>
        <Text fontSize="md" style={styles.container}>Saved Articles</Text>
        <Button title="Log Out" onPress={() => alert("Button Clicked!")} />
      </View>
    </Box>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    fontFamily: "DMSerifText", padding: 4, paddingBottom: 3
  },
});
