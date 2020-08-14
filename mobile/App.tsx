import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import LoginContainer from './src/container/container.login';
import MainContainer from './src/container/container.main';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
          {/* <MainContainer /> */}
          <LoginContainer />
      </SafeAreaView>
    </>
  );
};

export default App;
