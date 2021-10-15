import React from 'react';
import HomeScreen from '../../screens/HomeScreen';
import SavedScreen from '../../screens/SavedScreen';
import NotificationsScreen from '../../screens/NotificationsScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Nav = () => {
    
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Saved" component={SavedScreen} />
            <Tab.Screen name="Notifications" component={NotificationsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
}

export default Nav