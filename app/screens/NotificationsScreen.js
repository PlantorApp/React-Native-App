import React from "react";
import { View, Text, Button, StyleSheet, Pressable } from "react-native";
import { useFonts } from "expo-font";

import { Box, Heading, FlatList, Image, HStack, VStack } from "native-base";
import { width } from "styled-system";

const NotificationScreen = ({ navigation }) => {
  const [loaded] = useFonts({
    DMSerifText: require("../assets/fonts/DMSerifText-Regular.ttf"),
    QuickSandBold: require("../assets/fonts/Quicksand-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const data = [
    {
      id: 1,
      image: require("../assets/png/1872.png"),
      title: "Rainfall Warning",
      description:
        "Lorem ipsum dolor sit amet, elit, sed do incididunt ut labore et.",
      date: "12/09/2021",
    },
    {
      id: 2,
      image: require("../assets/png/1875.png"),
      title: "Heat Wave Warning",
      description:
        "Lorem ipsum dolor sit amet, elit, sed do incididunt ut labore et.",
      date: "12/09/2021",
    },
    {
      id: 3,
      image: require("../assets/png/1871.png"),
      title: "Winter is coming",
      description:
        "Lorem ipsum dolor sit amet, elit, sed do incididunt ut labore et.",
      date: "12/09/2021",
    },
    {
      id: 4,
      image: require("../assets/png/1870.png"),
      title: "Heavy Storm Warning",
      description:
        "Lorem ipsum dolor sit amet, elit, sed do incididunt ut labore et.",
      date: "12/09/2021",
    },
  ];

  const handlePress = (option) => {
    console.log("Pressed");
    setShowModal(option);
  };

  return (
    <Box w={{ base: "100%", md: "25%" }}>
      <Heading
        style={styles.mainTitle}
      >
        Notifications
      </Heading>

      <HStack
        justifyContent="space-evenly"
        style={{ fontFamily: "DMSerifText", paddingBottom: 4 }}
       
      >
        <Pressable style={styles.button}>
          <Text style={styles.text}>All</Text>
        </Pressable>

        <Pressable style={styles.button}>
          <Text style={styles.text}>Seasonal</Text>
        </Pressable>

        <Pressable style={styles.button}>
          <Text style={styles.text}>Warnings</Text>
        </Pressable>

        <Pressable style={styles.button}>
          <Text style={styles.text}>Hazards</Text>
        </Pressable>
      </HStack>

<View  style={styles.border}>
</View>


      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Box my="2" mx="0" pl="4" pr="5" w={{ base: "75%", md: "25%" }}>
            <VStack width="100%">
              <HStack justifyContent="space-between">
                <Text fontSize="2xl" style={styles.titleText}>
                  {item.title}
                </Text>
              </HStack>

              <HStack width="100%" space={2} justifyContent="flex-start">
                <Image source={item.image} />
                {/* <Image  source ={{
                                   uri: "https://wallpaperaccess.com/full/317501.jpg",
                          }}  w="100px" h="100px" backgroundColor="rgb(200,150,139)" alt={item.title} paddingTop="5"/> */}

                <VStack space={2}>
                  <HStack justifyContent="flex-start" space={2}>
                    <Text fontSize="md" style={styles.descriptionnddateText}>
                      {item.description}
                    </Text>
                  </HStack>
                  <Text fontSize="md" style={styles.descriptionnddateText}>
                    {item.date}
                  </Text>
                </VStack>
                
              </HStack>
              
            </VStack>
            <View style={styles.border}></View>

          </Box>
          
          
        )}
        keyExtractor={(item) => item.id}
     
      />

    </Box>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },

  mainTitle: {
    fontFamily: "DMSerifText", padding: 14, paddingBottom: 15
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 90,
    elevation: 3,
    backgroundColor: "#B7A878",
  },

  text: {
    fontSize: 14,
    lineHeight: 19,

    color: "white",
  },

  titleText: {
    fontSize: 20,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "#666666",
    fontFamily: "QuickSandBold",
    paddingBottom: 16,
  },
  descriptionnddateText: {
    fontSize: 14,
    lineHeight: 19.9,
    letterSpacing: 0.25,
    color: "#666666",
    fontFamily: "QuickSandBold",
  },
  border: {
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    paddingBottom: "8%",
    paddingTop: "5%",
    width: "130%",
  },
});
