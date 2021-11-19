import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import HomeScreen from './app/screens/HomeScreen';

export default function App() {

  const [isLogged, setIsLogged] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState();
  const [envList, setEnvList] = useState([]);
  // console.log("logged in user is : ", loggedInUser);
  // console.log("value of is logged is: ", isLogged);

  useEffect(() => {
    registerForPushNotification().then(token=>console.log(token)).catch(err => console.log(err))    
  }, []);


  const getUser = async () => {
            const response = await fetch(`http://54.148.107.164/backend-users/users/${loggedInUser.sub}`);
            const data = await response.json();
            setLoggedInUser(data)
            setEnvList(data.savedEnvironments)
            console.log("list ah aa:" , envList)
        }
  if(loggedInUser){
    getUser();
  }


//   useEffect(() => {
//     const getUser = async () => {
//         const response = await fetch(`http://54.148.107.164/backend-users/users/${loggedInUser.sub}`);
//         const data = await response.json();
//         setLoggedInUser(data)
//         setEnvList(data.savedEnvironments)
//         console.log("list ah aa:" , envList)
//     }
//     getUser()
// },[loggedInUser])
    
  async function registerForPushNotification() {
    const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status!='granted') {
      const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
    if (status !='granted') {
      alert('Fail to get the push token');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  }

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <HomeScreen isLogged={isLogged} setIsLogged={setIsLogged} setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} envList={envList}/>
      </NavigationContainer>
      <StatusBar style='dark' />
    </NativeBaseProvider>
  )
}

