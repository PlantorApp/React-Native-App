import React, { useState } from "react";
import { View, Image, Text, StyleSheet, Switch, Pressable, Dimensions, ScrollView } from "react-native";
import { Box, Heading, HStack } from "native-base";
import { useFonts } from "expo-font";
import Login from "../components/login/Login";
import Svg, { Path } from "react-native-svg";

const ProfileScreen = ({ isLogged, setIsLogged, setLoggedInUser, schedulePushNotification }) => {
  const [email, setEmail] = useState('email@example.com')
  const [profilePictureUri, setProfilePictureUri] = useState()

  const setUser = (name, email, profilePicture) => {
    setEmail(email)
    setProfilePictureUri(profilePicture)
  }

  const [loaded] = useFonts({
    DMSerifText: require("../assets/fonts/DMSerifText-Regular.ttf"),
    QuickSandBold: require("../assets/fonts/Quicksand-Bold.ttf"),
    QuickSandRegular: require("../assets/fonts/Quicksand-Regular.ttf"),
  });

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = async() => {
    if(!isEnabled) {
      await schedulePushNotification();
    }
    setIsEnabled((previousState) => !previousState);
    };

  return (
    <View style={{backgroundColor: "#FCFAF7", marginTop: 24}}>
      <ScrollView>
        <View style={{ flex: 1, minHeight: Dimensions.get('window').height, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#FCFAF7', paddingTop: 20, paddingBottom: 28}}>
          <Box style={{width: Dimensions.get('window').width - 32}}>
            <Login setUser={setUser} isLogged={isLogged} setIsLogged={setIsLogged} setLoggedInUser={setLoggedInUser} />
            <Heading 
              style={styles.mainTitle} 
            >
              Profile
            </Heading>
            <View>
              <Box mt={4}>
                {profilePictureUri ? <Image source={{ uri: profilePictureUri }} alt="Profile Image" style={{width: 99, height: 99, borderRadius: 99}} />
                : <Image source={require('../assets/plantImage.png')} alt="Profile Image" style={{width: 99, height: 99, borderRadius: 99}} />}
              </Box>
              <HStack justifyContent="flex-start" space={2} style={styles.border} >
              <Svg width="22" height="22" viewBox="0 -1 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M17.6502 6H4.34981C3.60433 6 3 6.60433 3 7.34981V15.5379C3 16.2834 3.60433 16.8877 4.34981 16.8877H17.6502C18.3957 16.8877 19 16.2834 19 15.5379V7.34981C19 6.60433 18.3957 6 17.6502 6Z" stroke="#B7A878" strokeWidth="1.5" strokeMiterlimit="10" strokeLinejoin="round"/>
                <Path d="M3.44531 6.46875L9.12446 12.23C9.12446 12.23 10.8586 14.4338 12.8342 12.23C14.8097 10.0263 18.5579 6.46875 18.5579 6.46875" stroke="#B7A878" strokeWidth="1.5" strokeMiterlimit="10" strokeLinejoin="round"/>
                <Path d="M3.44531 16.4181L8.44398 11.5391" stroke="#B7A878" strokeWidth="1.5" strokeMiterlimit="10" strokeLinejoin="round"/>
                <Path d="M18.5567 16.4192L13.5195 11.4844" stroke="#B7A878" strokeWidth="1.5" strokeMiterlimit="10" strokeLinejoin="round"/>
              </Svg>
                <Text style={styles.emailStyle}>{email}</Text>
              </HStack>
              <HStack 
                width="100%"
                justifyContent="space-between"
                alignItems="center"
                style={styles.border}
              >
                <Text style={styles.normalText}>Notifications Settings</Text>
                <Switch
                  trackColor={{ false: "#DDDDDD", true: "#B7A878" }}
                  thumbColor={isEnabled ? "#827344" : "#FFFFFF"}
                  ios_backgroundColor={isEnabled ? "#B7A878" : "#DDDDDD"}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </HStack>
              <HStack
                width="100%"
                justifyContent="space-between"
                style={styles.border}
              >
                <Text style={styles.normalText}>Saved Articles</Text>
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M9.29244 6.29376C9.19974 6.38628 9.12619 6.49616 9.07601 6.61714C9.02583 6.73811 9 6.86779 9 6.99876C9 7.12973 9.02583 7.25941 9.07601 7.38039C9.12619 7.50136 9.19974 7.61125 9.29244 7.70376L13.1724 11.5838L9.29244 15.4638C9.10547 15.6507 9.00042 15.9043 9.00042 16.1688C9.00042 16.4332 9.10547 16.6868 9.29244 16.8738C9.47942 17.0607 9.73302 17.1658 9.99744 17.1658C10.2619 17.1658 10.5155 17.0607 10.7024 16.8738L15.2924 12.2838C15.3851 12.1912 15.4587 12.0814 15.5089 11.9604C15.5591 11.8394 15.5849 11.7097 15.5849 11.5788C15.5849 11.4478 15.5591 11.3181 15.5089 11.1971C15.4587 11.0762 15.3851 10.9663 15.2924 10.8738L10.7024 6.28376C10.3224 5.90376 9.68244 5.90376 9.29244 6.29376Z" fill="#666666"/>
                </Svg>
              </HStack>
              <Box my="9" mx="0" pl="3" pr="3" w={{ base: "100%"}}>
              <Pressable style={styles.button}>
                <Text style={{fontFamily: 'QuickSandBold', fontWeight: 'normal', fontSize: 20, lineHeight: 24, color: '#827344'}}>Logout</Text>
              </Pressable> 
              </Box>            
            </View>
          </Box>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    fontFamily: "DMSerifText",
    padding: 30,
    paddingBottom: 5,
  },

  border: {
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    paddingBottom: 20,
    paddingTop: 20,
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
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 90,
    elevation: 1,
    height: 48,
    backgroundColor: 'white',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    width: 270,
  },
  mainTitle: {
    fontFamily: "DMSerifText",
    color: "#827344",
    fontSize: 32,
    fontWeight: 'normal',
    lineHeight: 38
  },
  normalText: {
    color: "#827344",
    fontSize: 20,
    fontFamily: "QuickSandBold",
    lineHeight: 24
  },
  emailStyle: {
    color: "#666666",
    fontSize: 16,
    fontFamily: "QuickSandRegular",
    marginBottom: 20
  }
});
