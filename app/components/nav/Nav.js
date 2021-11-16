import React from 'react';
import Home from '../../screens/Home';
import SavedScreen from '../../screens/SavedScreen';
import NotificationsScreen from '../../screens/NotificationsScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Nav = (props) => {
    
    return (
        <Tab.Navigator>
           // <Tab.Screen name="Home" options={{ headerShown: false }} >
           // {() => <HomeScreen isLogged={props.isLogged} setLoggedInUser = {props.setLoggedInUser} loggedInUser={props.loggedInUser}/>}
           // </Tab.Screen>

            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />

            <Tab.Screen name="Saved" component={SavedScreen} />
            <Tab.Screen name="Notifications" component={NotificationsScreen} />
            <Tab.Screen name="Profile">
            {() => <ProfileScreen isLogged={props.isLogged} setIsLogged={props.setIsLogged} setLoggedInUser = {props.setLoggedInUser}/>}
            </Tab.Screen>
        </Tab.Navigator>
    )
}

export default Nav