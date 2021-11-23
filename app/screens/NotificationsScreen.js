import React from "react";
import { View, Text, Button, StyleSheet, Pressable, ScrollView, Dimensions } from "react-native";
import { useFonts } from "expo-font";

import { Box, Heading, FlatList, Image, HStack, VStack } from "native-base";
import { width } from "styled-system";

const NotificationScreen = ({ navigation }) => {
  const [loaded] = useFonts({
    DMSerifText: require("../assets/fonts/dmseriftext-regular.ttf"),
    QuickSandBold: require("../assets/fonts/Quicksand-Bold.ttf"),
    QuickSandRegular: require("../assets/fonts/Quicksand-Regular.ttf")
  });

  if (!loaded) {
    return null;
  }

  const data = [
    {
      id: "1",
      image: require("../assets/png/1872.png"),
      title: "Rainfall Warning",
      description:
        "Short description about alert & how it will impact the garden so that use...",
      date: "12/09/2021",
    },
    {
      id: "2",
      image: require("../assets/png/1875.png"),
      title: "Heat Wave Warning",
      description:
        "Short description about alert & how it will impact the garden so that use...",
      date: "12/09/2021",
    },
    {
      id: "3",
      image: require("../assets/png/1871.png"),
      title: "Winter is coming!",
      description:
        "Short description about alert & how it will impact the garden so that use...",
      date: "12/09/2021",
    },
    {
      id: "4",
      image: require("../assets/png/1870.png"),
      title: "Fall is coming!",
      description:
        "Short description about alert & how it will impact the garden so that use...",
      date: "12/09/2021",
    },
  ];

  const handlePress = (option) => {
    console.log("Pressed");
    setShowModal(option);
  };

  return (
    <View style={{ flex: 1, minHeight: Dimensions.get('window').height, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#FCFAF7', paddingTop: 44, paddingBottom: 28}}>
        <Box style={{width: Dimensions.get('window').width - 32}}>
          <Heading style={styles.mainTitle} >Notifications</Heading>
          <Box style={styles.border}>
            <HStack space={2} >
              <Pressable style={styles.firstButton}>
                <Text style={styles.firstButtonText}>All</Text>
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
          </Box>
          <FlatList
            data={data} style={{height: "100%"}}
            renderItem={({ item }) => (
              <Box style={{marginTop: 24}} >
                <Text style={styles.titleText}>{item.title}</Text>
                <HStack justifyContent="flex-start" style={{marginTop: 8}}>
                  <Image source={item.image} alt="notification illustration" width="70" height="70" />
                  <Box style={{marginLeft: 16, width: Dimensions.get('window').width - 118}}>
                    <Text style={styles.descriptionText}>
                      {item.description}
                    </Text>
                    <Text style={styles.descriptiondateText}>
                    {item.date}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            )}
            keyExtractor={(item) => item.id}
          />
        </Box>
    </View>
  )
};

export default NotificationScreen;

const styles = StyleSheet.create({
  mainTitle: {
    fontFamily: "DMSerifText",
    lineHeight: 38,
    color: "#827344",
    fontSize: 32,
    fontWeight: 'normal'
  },
  firstButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 90,
    elevation: 3,
    backgroundColor: "#B7A878",
    borderColor: "#B7A878",
    borderWidth: 1
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 90,
    elevation: 3,
    backgroundColor: "#FCFAF7",
    borderColor: "#B7A878",
    borderWidth: 1
  },
  firstButtonText: {
    fontSize: 14,
    fontFamily: 'QuickSandRegular',
    color: "#FCFAF7",
  },
  text: {
    fontSize: 14,
    fontFamily: 'QuickSandRegular',
    color: "#827344",
  },
  titleText: {
    fontSize: 20,
    lineHeight: 28,
    color: "#666666",
    fontFamily: "QuickSandBold"
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#666666",
    fontFamily: "QuickSandRegular",
  },
  descriptiondateText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 22,
    color: "#AAAAAA",
    fontFamily: "QuickSandRegular",
  },
  border: {
    borderBottomWidth: 1,
    borderColor: "#EEEEEE",
    paddingVertical: 22,
  },
});
