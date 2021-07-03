import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent, act} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './index';
import * as crud from '../../crud';

describe('Home', () => {
  const inventories = [
    {
      uuid: 'hshdjdj-ndnjj-jjfj-fjjjjf',
      name: 'bag',
      desciption: 'bag for school students',
      price: 4000,
      stock: 23,
    },
  ];
  beforeAll(async () => {
    await AsyncStorage.setItem('inventories', JSON.stringify(inventories));
  });

  afterAll(async () => {
    await AsyncStorage.setItem('inventories', JSON.stringify([]));
  });

  it('renders screen as expected', async () => {
    let component;
    renderer.act(async () => {
      component = renderer.create(<Home />);
    });
    component.toJSON();
    expect(component).toMatchSnapshot();
  });

  // it('navigates to edit screen when an inventory is clicked', async () => {
  //   const navigate = jest.fn();
  //   jest.mock('../../crud');
  //   crud.getInventories = jest.fn(() => inventories);
  //   const component = render(<Home />);
  //   const {getByTestId} = component;
  //   expect(crud.getInventories).toHaveBeenCalled();
  //   fireEvent.press(getByTestId(inventories[0].uuid));
  //   expect(navigate).toHaveBeenCalledWith('EditInventory', {inventory: inventories[0]});
  // });
});
