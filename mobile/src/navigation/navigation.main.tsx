import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import style from '../style';
import MainContainer from '../container/container.main';
import MessageContainer from '../container/container.message';

const Stack = createStackNavigator();
const MainNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: style.app.card
            }}
        >
            <Stack.Screen
                name="main"
                component={MainContainer}
            />
            <Stack.Screen
                name="message"
                component={MessageContainer}
            />
        </Stack.Navigator>
    )
}

export default MainNavigation;