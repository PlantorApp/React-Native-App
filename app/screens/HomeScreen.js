import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import IndoorOutdoor from "../components/suggestionFlow/IndoorOutdoor";
import Temperature from "../components/suggestionFlow/Temperature";
import UserLocation from "../components/suggestionFlow/UserLocation";
import Lighting from "../components/suggestionFlow/Lighting";
import NaturalLight from "../components/suggestionFlow/NaturalLight";
import NaturalLightDirection from "../components/suggestionFlow/NaturalLightDirection";
import ArtificialLight from "../components/suggestionFlow/ArtificialLight";
import PetFriendly from "../components/suggestionFlow/PetFriendly";
import Suggestions from "../components/suggestionFlow/Suggestions";
import Climate from "../components/suggestionFlow/Climate";
import PlantDetail from "../components/suggestionFlow/PlantDetail";
import InformationDescription from '../components/informationDescription/InformationDescription';
import Nav from "../components/nav/Nav";
import EnvironmentName from "../components/suggestionFlow/EnvironmentName";
import SavedScreen from "./SavedScreen";


const Stack = createNativeStackNavigator();

const HomeScreen = (props) => {
  // console.log("HomeScreen.js has setLoggedInUser ", props.setLoggedInUser)
  return (
    <Stack.Navigator initialRouteName="PlantsSuggestion" screenOptions={{ headerShown: false }}>
      <Stack.Group>

        <Stack.Screen name="Nav">
          {() => <Nav isLogged={props.isLogged} setIsLogged={props.setIsLogged} setLoggedInUser={props.setLoggedInUser} loggedInUser={props.loggedInUser} envList={props.envList} schedulePushNotification={props.schedulePushNotification}/>} 
        </Stack.Screen>
        <Stack.Screen name="IndoorOutdoor" component={IndoorOutdoor} />
        <Stack.Screen name="UserLocation" component={UserLocation} />
        <Stack.Screen name="Climate" component={Climate} />
        <Stack.Screen name="Temperature" component={Temperature} />
        <Stack.Screen name="Lighting" component={Lighting} />
        <Stack.Screen name="NaturalLight" component={NaturalLight} />
        <Stack.Screen name="NaturalLightDirection" component={NaturalLightDirection} />
        <Stack.Screen name="ArtificialLight" component={ArtificialLight} />
        <Stack.Screen name="PetFriendly" component={PetFriendly} />
        <Stack.Screen name="Suggestions">
          {(pro) => <Suggestions {...pro} loggedInUser={props.loggedInUser} setEnvList={props.setEnvList}/>} 
        </Stack.Screen>
        <Stack.Screen name="EnvironmentName">
          { (pro) => <EnvironmentName {...pro} loggedInUser={props.loggedInUser}/>}
          </Stack.Screen>
        <Stack.Screen name="SavedScreen">
          { () => <SavedScreen envList = {props.envList} setEnvList={props.setEnvList}/>}
        </Stack.Screen>
        <Stack.Screen name="PlantDetail" component={PlantDetail} options={{headerShown: false}} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal'}}>
        <Stack.Screen name="InformationDescription" component={InformationDescription} options={{headerShown: false}} />
      </Stack.Group>
    </Stack.Navigator>
  )
};
  
export default HomeScreen;
  