import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getInventories,
  addInventory,
  updateInventory,
  deleteInventory,
} from './index';

describe('Inventories CRUD', () => {
  const inventories = [
    {
      uuid: 'hshdjdj-ndnjj-jjfj-fjjjjf',
      name: 'bag',
      desciption: 'bag for school students',
      price: 4000,
      stock: 23,
    },
  ];
  beforeEach(async () => {
    await AsyncStorage.setItem('inventories', JSON.stringify(inventories));
  });

  afterEach(async () => {
    await AsyncStorage.setItem('inventories', JSON.stringify([]));
  });

  it('the inventories are fetched correctly', async () => {
    const result = await getInventories();
    expect(AsyncStorage.getItem).toBeCalledWith('inventories');
    expect(result[0].name).toBe('bag');
  });

  it('the inventory was succesfully added', async () => {
    const inventory = {
      name: 'Black shoe',
      desciption: 'its a shinny black shoe',
      price: 5500,
      stock: 12,
    };
    let result = await addInventory(inventory);
    expect(AsyncStorage.setItem).toHaveBeenLastCalledWith(
      'inventories',
      JSON.stringify(result)
    );
    expect(result.length).toEqual(2);
    expect(result[1].name).toBe(inventory.name);
  });

  it('the inventory was succesfully update', async () => {
    let initialResult = await AsyncStorage.getItem('inventories');
    const inventory = {
      name: 'school bag',
      desciption: 'bag for school students',
      price: 5000,
      stock: 23,
    };
    initialResult = JSON.parse(initialResult);
    let result = await updateInventory(initialResult[0].uuid, inventory);
    expect(AsyncStorage.setItem).toHaveBeenLastCalledWith(
      'inventories',
      JSON.stringify(result)
    );
    expect(result.length).toEqual(1);
    expect(result[0].name).toBe(inventory.name);
  });

  it('the inventory was succesfully deleted', async () => {
    let initialResult = await AsyncStorage.getItem('inventories');
    initialResult = JSON.parse(initialResult);
    let result = await deleteInventory(initialResult[0].uuid);
    expect(AsyncStorage.setItem).toHaveBeenLastCalledWith(
      'inventories',
      JSON.stringify(result)
    );
    expect(result.length).toEqual(0);
  });
});
