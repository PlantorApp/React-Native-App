import React, { useState, useEffect } from 'react';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import { Dimensions, Pressable, Text, View } from 'react-native';
import { Box } from 'native-base';
import { useFonts } from 'expo-font';
 
const Login = (props) => {

  let user = {
    sub: "111"
  };
  const [callFetch, setCallFetch] = useState(true);

  const [name, setName] = useState('user')
  const [email, setEmail] = useState('email Id')
  const [profilePicUri, setProfilePicUri] = useState('')

  async function logInFb() {
    try {
      await Facebook.initializeAsync({
        appId: '1058696194895644',
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile','email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`);
        // console.log('Logged in!', `Hi ${JSON.stringify((await response.json()))}!`);
        const data = await response.json();

        //console.log("user data", data)
        setName(data.name);
        setEmail(data.email);
        setProfilePicUri(data.picture.data.url);

        props.setUser(data.name,data.email,data.picture.data.url)

        user = {
          sub: data.id,
          email: data.email,
          profilePicUri: data.picture.data.url,
          family_name: data.name,
          given_name: data.name
        }
        props.setIsLogged(true)
        // console.log(user)
        props.setLoggedInUser(user)
        const curUser = await fetchUser();
        //console.log("inside useeffect :", curUser)
        if(curUser){
          props.setUserInfo(curUser);
        }else{
          // console.log("user is being created")
          const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(user)
          };

          const response = await fetch('https://app.plantor.app/backend-users/users', requestOptions);
          // const response = await fetch('http://192.168.0.18:3003/users', requestOptions);
          const data = await response.json();
          //console.log("replied with :" , data)
        }

      } else {
            // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  const logInGl = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: '651674954421-5a6cadejpmdbnlam73hub6f4e12ll869.apps.googleusercontent.com',
        androidClientId: '651674954421-v6253d1hotla3scuqvt6mc65l5hi86kg.apps.googleusercontent.com',
        scopes: ['profile', 'email', 'openid'],
        });
        // console.log(result)
      if (result.type === 'success') {      
        // console.log("google", result.user)
        setEmail(result.user.email);
        setProfilePicUri(result.user.photoUrl);
        props.setUser(result.user.name, result.user.email, result.user.photoUrl)
        user = {
          sub: result.user.id,
          email: result.user.email,
          profilePicUri: result.user.photoUrl,
          family_name: result.user.familyName,
          given_name: result.user.givenName
        }
        // console.log("user", props)
        props.setIsLogged(true)
        props.setLoggedInUser(user)

        const curUser = await fetchUser(result.idToken);
        //console.log("inside useeffect :", curUser)
        if(curUser) {
          props.setMongoLoggedInUser(curUser);
          props.setUserInfo(curUser);
        } else {
          // console.log("user is being created")
          const requestOptions = {
            method: 'POST',
            // headers: { 'Content-Type': 'application/json' },
            headers: { 'Content-Type': 'application/json', 'Authorization': result.idToken },
            body: JSON.stringify(user)
          };
          const response = await fetch('https://app.plantor.app/backend-users/users', requestOptions);
          // const response = await fetch('http://localhost:3003/users', requestOptions);
          const data = await response.json();
          //console.log("replied with :" , data)
        }
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  const fetchUser = async (idToken) => {
    // console.log("token from google", idToken);
    const requestOptions = {
      method: 'GET',
      // headers: { 'Content-Type': 'application/json' },
      headers: { 'Content-Type': 'application/json', 'Authorization': idToken },
    };
    const res = await fetch(`https://app.plantor.app/backend-users/users/${user?.sub}`, requestOptions);
    // const res = await fetch(`http://192.168.0.18:3003/users/${user?.sub}`, requestOptions);
    const data = await res.json();
    // console.log(data)
    return data
  }
  
  const [loaded] = useFonts({
    DMSerifText: require("../../assets/fonts/DMSerifText-Regular.ttf"),
    QuickSandBold: require("../../assets/fonts/Quicksand-Bold.ttf"),
    QuickSandRegular: require("../../assets/fonts/Quicksand-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
 
  return (
    <View style={{minHeight: Dimensions.get('window').height - 174, justifyContent: 'center'}}>
      <Box style={{justifyContent: 'center', alignItems: 'center'}}>
        <Pressable style={{borderRadius: 50, borderWidth: 1, borderColor: '#DDDDDD', padding: 14, width: 270, backgroundColor: '#827344'}} android_ripple={{color: '#DDDDDD', radius:4, foreground: true}} onPress={logInFb} >
            <Text style={{fontFamily: 'QuickSandBold', fontSize: 20, lineHeight: 24, color: '#FFFFFF', textAlign: 'center'}}>Login with Facebook</Text>
        </Pressable>
      </Box>
      <Box style={{justifyContent: 'center', alignItems: 'center', marginTop: 24}}>
        <Pressable style={{borderRadius: 50, borderWidth: 1, borderColor: '#DDDDDD', padding: 14, width: 270, backgroundColor: '#827344'}} android_ripple={{color: '#DDDDDD', radius:4, foreground: true}} onPress={logInGl} >
            <Text style={{fontFamily: 'QuickSandBold', fontSize: 20, lineHeight: 24, color: '#FFFFFF', textAlign: 'center'}}>Login with Google</Text>
        </Pressable>
      </Box>
    </View>
  )
}
 
export default Login