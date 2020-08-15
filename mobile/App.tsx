import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import style from './src/style';
import AuthNavigation from './src/navigation/navigation.auth';
import * as api from "./src/api";
import { IApp } from './src/interface/interface.component';
import { connect } from 'react-redux';
import { initialize } from './src/action/action.app';
import { IStoreState } from './src/interface/interface.data';
import AsyncStorage from '@react-native-community/async-storage';

const App = ({ initialize, app }: IApp) => {
  // Mounted effect
  useEffect(() => {
    // Init api and reducer
    api.initialize();
    initialize();
  }, []);
  console.log(app)

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

export default connect(({ app }: IStoreState) => ({ app }), { initialize })(App);
