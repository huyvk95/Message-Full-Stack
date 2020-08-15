import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import style from './src/style';
import AuthNavigation from './src/navigation/navigation.auth';
import * as api from "./src/api";
import { IApp } from './src/interface/interface.component';

const App = ({}:IApp) => {
  api.initialize();
  // initialize();
  
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={style.app.wrap}>
        <NavigationContainer>
          <AuthNavigation />
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

export default App;
