import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//screens
import Home from '../screen/Home';
import CreateInventory from '../screen/CreateInventory';
import EditInventory from '../screen/EditInventory';

const Navigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: 'Inventories', headerLeft: null}}
      />
      <Stack.Screen
        name="CreateInventory"
        component={CreateInventory}
        options={{title: 'Add New Inventory'}}
      />
      <Stack.Screen
        name="EditInventory"
        component={EditInventory}
        options={{title: 'Edit Inventory'}}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
