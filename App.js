import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import NotificationScreen from "./app/screens/NotificationsScreen";
import HomeScreen from "./app/screens/HomeScreen";
import Constants from "expo-constants";
import { navigationRef } from "./root";
import * as navigation from "./root";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState();
  const [mongoLoggedInUser, setMongoLoggedInUser] = useState();
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
        // console.log("clicked");
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
    const response = await fetch(
      `http://54.148.107.164/backend-users/users/${loggedInUser.sub}`
    );
    const data = await response.json();
    setMongoLoggedInUser(data);
    // console.log("user from mongo", mongoLoggedInUser);
  };
  if (loggedInUser) {
    if(!mongoLoggedInUser) {
      getUser();
    }
  }

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Rainfall Warning",
        body: "Short description about alert & how it will impact the garden so that use...",
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
      // console.log(token);
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
        <Stack.Screen name="HomeScreen" options={{
          headerShown: false
        }}>
          {(props) => (<HomeScreen {...props}
          schedulePushNotification={schedulePushNotification}
          isLogged={isLogged}
          setIsLogged={setIsLogged}
          setLoggedInUser={setLoggedInUser}
          loggedInUser={mongoLoggedInUser}
          setEnvList={setEnvList}
          envList={envList} />)}
        </Stack.Screen>
        <Stack.Screen
          name="NotificationScreen" options={{
            headerShown: false
          }}
          component={NotificationScreen}
        />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="dark" />
    </NativeBaseProvider>
  );
}
