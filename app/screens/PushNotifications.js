import React from "react";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import NotificationsScreen from "./NotificationsScreen";
import Home from "./Home";
import SavedScreen from "./SavedScreen";
import ProfileScreen from "./ProfileScreen";
import Svg, { Circle, Path } from "react-native-svg";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const PushNotifications = ({ navigation }) => {
  const [loaded] = useFonts({
    DMSerifText: require("../assets/fonts/DMSerifText-Regular.ttf"),
    QuickSandBold: require("../assets/fonts/Quicksand-Bold.ttf"),
    QuickSandRegular: require("../assets/fonts/Quicksand-Regular.ttf"),
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
      date: "19/06/2021",
    },
    {
      id: "3",
      image: require("../assets/png/1871.png"),
      title: "Winter is coming!",
      description:
        "Short description about alert & how it will impact the garden so that use...",
      date: "22/08/2021",
    },
    {
      id: "4",
      image: require("../assets/png/1870.png"),
      title: "Fall is coming!",
      description:
        "Short description about alert & how it will impact the garden so that use...",
      date: "24/06/2021",
    },
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { paddingTop: 6, height: 64 },
      }}
    >
    
      <Tab.Screen
        name="Home"
        component={Home}
        
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M6 27.1816H5C5 27.7339 5.44772 28.1816 6 28.1816V27.1816ZM26.3302 27.1816V28.1816C26.8825 28.1816 27.3302 27.7339 27.3302 27.1816H26.3302ZM18.9374 27.1816H17.9374C17.9374 27.7339 18.3851 28.1816 18.9374 28.1816V27.1816ZM13.3928 27.1816V28.1816C13.9451 28.1816 14.3928 27.7339 14.3928 27.1816H13.3928ZM26.1608 13.8086L26.8219 13.0584L26.1608 13.8086ZM15.8345 5.29132L15.1734 4.54107L15.8345 5.29132ZM16.4957 5.29132L17.1568 4.54107L16.4957 5.29132ZM6.16942 13.8086L5.50827 13.0584L6.16942 13.8086ZM7 27.1816V14.1838H5V27.1816H7ZM6.83058 14.5589L16.4957 6.04157L15.1734 4.54107L5.50827 13.0584L6.83058 14.5589ZM15.8345 6.04157L25.4996 14.5589L26.8219 13.0584L17.1568 4.54107L15.8345 6.04157ZM25.3302 14.1838V27.1816H27.3302V14.1838H25.3302ZM26.3302 26.1816H18.9374V28.1816H26.3302V26.1816ZM19.9374 27.1816V21.2096H17.9374V27.1816H19.9374ZM6 28.1816H13.3928V26.1816H6V28.1816ZM14.3928 27.1816V21.2096H12.3928V27.1816H14.3928ZM14.3928 21.2096C14.3928 20.4221 15.1096 19.6502 16.1651 19.6502V17.6502C14.1585 17.6502 12.3928 19.1701 12.3928 21.2096H14.3928ZM16.1651 19.6502C17.2207 19.6502 17.9374 20.4221 17.9374 21.2096H19.9374C19.9374 19.1701 18.1718 17.6502 16.1651 17.6502V19.6502ZM25.4996 14.5589C25.3919 14.464 25.3302 14.3273 25.3302 14.1838H27.3302C27.3302 13.7531 27.1451 13.3432 26.8219 13.0584L25.4996 14.5589ZM16.4957 6.04157C16.3067 6.20807 16.0235 6.20807 15.8345 6.04157L17.1568 4.54107C16.59 4.04157 15.7402 4.04157 15.1734 4.54107L16.4957 6.04157ZM7 14.1838C7 14.3273 6.93829 14.464 6.83058 14.5589L5.50827 13.0584C5.18514 13.3432 5 13.7531 5 14.1838H7Z"
                fill={color}
              />
            </Svg>
          ),
   
          tabBarActiveTintColor: "#827344",
          tabBarInactiveTintColor: "#BBBBBB",
          tabBarLabelStyle: {
            paddingBottom: 8,
            fontSize: 12,
            fontFamily: "QuickSandBold",
            fontWeight: "normal",
          },
        }}
      />
      <Tab.Screen
        name="Saved"
      
        component={SavedScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M10 5C6.6868 5 4 7.6592 4 10.94C4 13.5884 5.05 21.0943 15.3856 27.4483C15.5707 27.5609 15.7833 27.6205 16 27.6205C16.2167 27.6205 16.4293 27.5609 16.6144 27.4483C26.95 21.0943 28 13.5884 28 10.94C28 7.6592 25.3132 5 22 5C18.6868 5 16 8.46441 16 8.46441C16 8.46441 13.3132 5 10 5Z"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          ),
          tabBarActiveTintColor: "#827344",
          tabBarInactiveTintColor: "#BBBBBB",
          tabBarLabelStyle: {
            paddingBottom: 8,
            fontSize: 12,
            fontFamily: "QuickSandBold",
            fontWeight: "normal",
          },
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerShown: false,
       

          tabBarIcon: ({ color }) => (
            <Svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M6 27.1816H5C5 27.7339 5.44772 28.1816 6 28.1816V27.1816ZM26.3302 27.1816V28.1816C26.8825 28.1816 27.3302 27.7339 27.3302 27.1816H26.3302ZM18.9374 27.1816H17.9374C17.9374 27.7339 18.3851 28.1816 18.9374 28.1816V27.1816ZM13.3928 27.1816V28.1816C13.9451 28.1816 14.3928 27.7339 14.3928 27.1816H13.3928ZM26.1608 13.8086L26.8219 13.0584L26.1608 13.8086ZM15.8345 5.29132L15.1734 4.54107L15.8345 5.29132ZM16.4957 5.29132L17.1568 4.54107L16.4957 5.29132ZM6.16942 13.8086L5.50827 13.0584L6.16942 13.8086ZM7 27.1816V14.1838H5V27.1816H7ZM6.83058 14.5589L16.4957 6.04157L15.1734 4.54107L5.50827 13.0584L6.83058 14.5589ZM15.8345 6.04157L25.4996 14.5589L26.8219 13.0584L17.1568 4.54107L15.8345 6.04157ZM25.3302 14.1838V27.1816H27.3302V14.1838H25.3302ZM26.3302 26.1816H18.9374V28.1816H26.3302V26.1816ZM19.9374 27.1816V21.2096H17.9374V27.1816H19.9374ZM6 28.1816H13.3928V26.1816H6V28.1816ZM14.3928 27.1816V21.2096H12.3928V27.1816H14.3928ZM14.3928 21.2096C14.3928 20.4221 15.1096 19.6502 16.1651 19.6502V17.6502C14.1585 17.6502 12.3928 19.1701 12.3928 21.2096H14.3928ZM16.1651 19.6502C17.2207 19.6502 17.9374 20.4221 17.9374 21.2096H19.9374C19.9374 19.1701 18.1718 17.6502 16.1651 17.6502V19.6502ZM25.4996 14.5589C25.3919 14.464 25.3302 14.3273 25.3302 14.1838H27.3302C27.3302 13.7531 27.1451 13.3432 26.8219 13.0584L25.4996 14.5589ZM16.4957 6.04157C16.3067 6.20807 16.0235 6.20807 15.8345 6.04157L17.1568 4.54107C16.59 4.04157 15.7402 4.04157 15.1734 4.54107L16.4957 6.04157ZM7 14.1838C7 14.3273 6.93829 14.464 6.83058 14.5589L5.50827 13.0584C5.18514 13.3432 5 13.7531 5 14.1838H7Z"
                fill={color}
              />
            </Svg>
          ),
          tabBarActiveTintColor: "#827344",
          tabBarInactiveTintColor: "#BBBBBB",
          tabBarLabelStyle: {
            paddingBottom: 8,
            fontSize: 12,
            fontFamily: "QuickSandBold",
            fontWeight: "normal",
          },
        }}
      />
      <Tab.Screen
        name="Profile"
     
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Circle
                cx="16.1416"
                cy="10.2725"
                r="5.2725"
                fill="white"
                stroke={color}
                strokeWidth="2"
              />
              <Path
                d="M16.6176 15.5683C16.6445 15.5651 16.6684 15.5619 16.6892 15.559C16.7032 15.5585 16.7186 15.5578 16.7354 15.5569C16.8086 15.5531 16.9085 15.5459 17.029 15.532C17.2686 15.5043 17.5983 15.4494 17.9667 15.3389C18.4552 15.1923 19.0513 14.9354 19.5889 14.4828C23.0605 17.393 24.2395 20.9076 24.2395 22.7208C24.2395 23.3422 23.6439 24.3998 22.1211 25.3728C20.667 26.3019 18.575 27.0007 16.1197 27.0007C13.6645 27.0007 11.5725 26.3019 10.1184 25.3728C8.59562 24.3998 8 23.3422 8 22.7208C8 19.5642 9.83756 16.6701 12.6729 14.4358C13.49 15.1058 14.3772 15.4031 15.1023 15.5242C15.5664 15.6018 15.9707 15.609 16.2626 15.5965C16.4093 15.5902 16.5297 15.5788 16.6176 15.5683Z"
                fill="white"
                stroke={color}
                strokeWidth="2"
              />
            </Svg>
          ),
          tabBarActiveTintColor: "#827344",
          tabBarInactiveTintColor: "#BBBBBB",
          tabBarLabelStyle: {
            paddingBottom: 8,
            fontSize: 12,
            fontFamily: "QuickSandBold",
            fontWeight: "normal",
          },
        }}
      />
    </Tab.Navigator>
   
  );
};

export default PushNotifications;

const styles = StyleSheet.create({
  mainTitle: {
    fontFamily: "DMSerifText",
    lineHeight: 38,
    color: "#827344",
    fontSize: 32,
    fontWeight: "normal",
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
    borderWidth: 1,
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
    borderWidth: 1,
  },
  firstButtonText: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "QuickSandRegular",
    color: "#FCFAF7",
  },
  text: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "QuickSandRegular",
    color: "#827344",
  },
  titleText: {
    fontSize: 20,
    lineHeight: 28,
    color: "#666666",
    fontFamily: "QuickSandBold",
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
