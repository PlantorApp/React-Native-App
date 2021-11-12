import { Button } from 'native-base';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
 
const Login = (props) => {

    const [name,setName] = useState('user')
    const [email, setEmail] = useState('email Id')
    const [profilePictureUri, setProfilePictureUri] = useState('')

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

            console.log("user data", data)
            setName(data.name);
            setEmail(data.email);
            setProfilePictureUri(data.picture.data.url);
            console.log("profile pic :" , data.picture.data.url)

            props.setUser(data.name,data.email,data.picture.data.url)

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
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
            console.log("google", result)
            setName(result.user.name);
            setEmail(result.user.email);
            setProfilePictureUri(result.user.photoUrl);

            props.setUser(result.user.name,result.user.email,result.user.photoUrl)
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }

      }
 
return (
    <>
    <Button onPress = {logInFb}>Login with facebook</Button>
    <Button onPress = {logInGl}>Login with google</Button>
    </>
)

}
 
export default Login