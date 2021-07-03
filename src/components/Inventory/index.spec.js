import React from 'react';
import renderer from 'react-test-renderer';
import Inventory from './index';

describe('Inventory', () => {
  it('renders component as expected', async () => {
    const component = renderer.create(<Inventory />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
