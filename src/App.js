import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './navigation';
import {initalizeInventories} from './crud';

const App = () => {
  useEffect(() => {
    initalizeInventories();
  }, []);

  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
};

export default App;
