import React from 'react';
import App from './App'
import { Provider } from 'react-redux';
import store from './src/store';

const Contex = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Contex;