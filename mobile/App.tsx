import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import LoginContainer from './src/container/container.login';
import MainContainer from './src/container/container.main';
import MessageContainer from './src/container/container.message';
import style from './src/style';

const Stack = createStackNavigator();
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={style.app.wrap}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyle: style.app.card
            }}
          >
            <Stack.Screen
              name="login"
              component={LoginContainer}
            />
            {/* <Stack.Screen
              name="main"
              component={MainContainer}
            /> */}
            {/* <Stack.Screen
              name="message"
              component={MessageContainer}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

export default App;
