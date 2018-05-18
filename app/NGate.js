import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './stores/appStore';
import NGateNavigation from './components/NGateNavigation';
import { AsyncStorage } from 'react-native';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native


const NGate = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NGateNavigation/>
    </PersistGate>
  </Provider>
);

export default NGate;
