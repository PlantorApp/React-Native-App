import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import NotificationScreen from "./app/screens/NotificationsScreen";
// import * as Permissions from 'expo-permissions';
import HomeScreen from "./app/screens/HomeScreen";

import Constants from "expo-constants";
import { navigationRef } from "./root";
import * as navigation from "./root";
// import AppLoading from "expo-app-loading";
import NotificationsContainer from "./app/screens/NotificationsContainer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState();
  const [envList, setEnvList] = useState([]);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  let targetScreen;

  // console.log("logged in user is : ", loggedInUser);
  // console.log("value of is logged is: ", isLogged);
  // console.log("App.js has setLoggedInUser ", setLoggedInUser)
  // useEffect(() => {
  //   registerForPushNotification().then(token => console.log(token)).catch(err => console.log(err))
  // }, []);

  useEffect(() => {
    targetScreen = notification && notification.request.content.data.screen;
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        // alert(JSON.stringify(notification.request.content.data))
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("clicked");
        navigation.navigate("NotificationScreen");
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [notification]);

  const getUser = async () => {
<<<<<<< HEAD
    const response = await fetch(
      `http://54.148.107.164/backend-users/users/${loggedInUser.sub}`
    );
    const data = await response.json();
    setLoggedInUser(data);
    console.log("user from mongo", loggedInUser);
  };
  if (loggedInUser) {
=======
            const response = await fetch(`http://54.148.107.164/backend-users/users/${loggedInUser.sub}`);
            const data = await response.json();
            if(!loggedInUser) {
              setLoggedInUser(data)
            }
            console.log("user from mongo" , loggedInUser)
        }
  if(loggedInUser){
>>>>>>> 8fc507b478abcc564d73e74387d5b4d681e0b462
    getUser();
  }

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Heavy Rainfall!",
        body: "Floods in British Columbia",
        data: { screen: "NotificationsScreen" },
      },
      trigger: { seconds: 2 },
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  const Stack = createNativeStackNavigator();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  // async function registerForPushNotification() {
  //   const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  //   if (status!='granted') {
  //     const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //   }
  //   if (status !='granted') {
  //     alert('Fail to get the push token');
  //     return;
  //   }
  //   token = (await Notifications.getExpoPushTokenAsync()).data;
  //   return token;
  // }

  return (
    <NativeBaseProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
        <Stack.Screen name="HomeScreen">
          {(props) => (<HomeScreen {...props}
          schedulePushNotification={schedulePushNotification} /> )}
          </Stack.Screen>
          <Stack.Screen name="NotificationsContainer">
            {(props) => (
              <NotificationsContainer
                {...props}
                schedulePushNotification={schedulePushNotification}
                notification={notification}
                expoPushToken={expoPushToken}
              />
            )}
          </Stack.Screen>
      
          <Stack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
          />
          {/* <Stack.Screen name="Features" component={FeaturesScreen} /> */}
          {/* <HomeScreen isLogged={isLogged} setIsLogged={setIsLogged} setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} setEnvList = {setEnvList} envList = {envList}/> */}
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="dark" />
    </NativeBaseProvider>
  );
}
