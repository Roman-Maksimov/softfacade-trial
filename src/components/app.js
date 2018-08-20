import React from 'react';
import { Provider } from 'react-redux';
import Main from 'components/main';
import store from 'redux/store';

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default App;
