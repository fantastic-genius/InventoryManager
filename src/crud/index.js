import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export const initalizeInventories = async () => {
  try {
    let inventories = await AsyncStorage.getItem('inventories');
    if (!inventories) {
      inventories = [];
      AsyncStorage.setItem('inventories', JSON.stringify(inventories));
    }
  } catch (error) {
    console.log(error);
  }
};

export const addInventory = async inventory => {
  try {
    let inventories = await AsyncStorage.getItem('inventories');
    inventories = JSON.parse(inventories);
    inventories.push({
      uuid: uuid.v4(),
      ...inventory,
    });
    await AsyncStorage.setItem('inventories', JSON.stringify(inventories));
    return inventories;
  } catch (error) {
    console.log(error);
  }
};

export const getInventories = async () => {
  try {
    let inventories = await AsyncStorage.getItem('inventories');
    inventories = JSON.parse(inventories);
    return inventories;
  } catch (error) {
    console.log(error);
  }
};

export const deleteInventory = async inventoryUuid => {
  try {
    let inventories = await AsyncStorage.getItem('inventories');
    inventories = JSON.parse(inventories);
    const newInventories = inventories.filter(
      inventory => inventory.uuid !== inventoryUuid
    );
    await AsyncStorage.setItem('inventories', JSON.stringify(newInventories));
    return newInventories;
  } catch (error) {
    console.log(error);
  }
};

export const updateInventory = async (inventoryUuid, value) => {
  try {
    let inventories = await AsyncStorage.getItem('inventories');
    inventories = JSON.parse(inventories);
    inventories = inventories.map(inventory => {
      if (inventory.uuid === inventoryUuid) {
        return {
          uuid: inventoryUuid,
          ...value,
        };
      }
      return inventory;
    });
    await AsyncStorage.setItem('inventories', JSON.stringify(inventories));
    return inventories;
  } catch (error) {
    console.log(error);
  }
};

export const inventoryNameExist = async (name, inventoryUuid) => {
  try {
    let inventories = await AsyncStorage.getItem('inventories');
    inventories = JSON.parse(inventories);
    let filteredInventories = [];

    if (inventoryUuid) {
      filteredInventories = inventories.filter(
        inventory =>
          inventory.name === name && inventory.uuid !== inventoryUuid
      );
    } else {
      filteredInventories = inventories.filter(
        inventory => inventory.name === name
      );
    }
    
    if (filteredInventories.length) {
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
  }
};
