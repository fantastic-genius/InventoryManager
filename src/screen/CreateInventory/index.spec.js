import React from 'react';
import renderer from 'react-test-renderer';
import CreateInventory from './index';

describe('CreateInventory', () => {
  it('renders screen as expected', async () => {
    const component = renderer.create(<CreateInventory />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
