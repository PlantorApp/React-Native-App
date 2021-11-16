import { Button } from 'native-base';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
 
const Login = (props) => {

    let user = {
      sub: "111"
    };

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

            //console.log("user data", data)
            setName(data.name);
            setEmail(data.email);
            setProfilePictureUri(data.picture.data.url);

            props.setUser(data.name,data.email,data.picture.data.url)

            user = {
              sub : data.id,
              email: data.email,
              family_name : data.name,
              given_name : data.name
            }
            props.setIsLogged(true)
            props.setLoggedInUser(user)
            const curUser = await fetchUser();
            //console.log("inside useeffect :", curUser)
            if(curUser){
              console.log("User exist")
            }else{
              console.log("user is being created")
              const requestOptions = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(user)
              };

              const response = await fetch('http://54.148.107.164/backend-users/users', requestOptions);
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
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
            
            console.log("google", result)
            setName(result.user.name);
            setEmail(result.user.email);
            setProfilePictureUri(result.user.photoUrl);

            props.setUser(result.user.name,result.user.email,result.user.photoUrl)

            user = {
              sub : result.user.id,
              email: result.user.email,
              family_name : result.user.familyName,
              given_name : result.user.givenName
            }

            props.setIsLogged(true)
            props.setLoggedInUser(user)

            const curUser = await fetchUser();
            //console.log("inside useeffect :", curUser)
            if(curUser){
              console.log("User exist")
            }else{
              console.log("user is being created")
              const requestOptions = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(user)
              };

              const response = await fetch('http://54.148.107.164/backend-users/users', requestOptions);
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

      const fetchUser = async () => {
        const res = await fetch(`http://54.148.107.164/backend-users/users/${user?.sub}`)
        const data = await res.json();
        return data
    }

//     useEffect(() => {
//       const getUser = async () => {
//           const curUser = await fetchUser();
//           console.log("inside useeffect :", curUser)
//           if(curUser){
//             console.log("User exist")
//           }else{
//             console.log("user is being created")
//             const requestOptions = {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(user)
//             };

//             const response = await fetch('http://54.148.107.164/backend-users/users', requestOptions);
//             const data = await response.json();
//             console.log("replied with :" , data)
//           }
//       }
//       getUser();    
// },[user]);
 
return (
    <>
    <Button onPress = {logInFb}>Login with facebook</Button>
    <Button onPress = {logInGl}>Login with google</Button>
    </>
)

}
 
export default Login