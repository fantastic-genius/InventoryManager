import React from 'react';
import renderer from 'react-test-renderer';
import {Alert} from 'react-native';
import {render, fireEvent} from '@testing-library/react-native';
import EditInventory from './index';

describe('EditInventory', () => {
  const inventory = {
    uuid: 'hshdjdj-ndnjj-jjfj-fjjjjf',
    name: 'bag',
    desciption: 'bag for school students',
    price: 4000,
    stock: 23,
  };

  it('renders screen as expected', async () => {
    const component = renderer
      .create(
        <EditInventory
          route={{
            params: {
              inventory,
            },
          }}
        />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('confirmation popup shows when delete inventory is triggered', async () => {
    Alert.alert = jest.fn();
    const {getByText} = render(
      <EditInventory
        route={{
          params: {
            inventory,
          },
        }}
      />
    );

    fireEvent.press(getByText('Delete'));
    expect(Alert.alert).toHaveBeenCalled();
  });
});
