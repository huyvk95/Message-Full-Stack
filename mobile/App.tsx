import React, { useEffect, useState } from 'react';
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
import { navigationRef } from './src/navigation';

const App = ({ initialize }: IApp) => {
  let [inited, setInited] = useState(false);
  /* __MOUNTED EFFECT__ */
  useEffect(() => {
    (async () => {
      // Init api and reducer
      api.initialize();
      await initialize();
      setInited(true);
    })()
  }, []);

  /* __RENDER__ */
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={style.app.wrap}>
        <NavigationContainer ref={navigationRef as any}>
          {!inited ? <></> : <AuthNavigation />}
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

export default connect(null, { initialize })(App);
