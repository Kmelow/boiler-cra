import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../test/testUtil';

import App from './App';

Enzyme.configure({ adapter: new Adapter() });

test('renders App', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.length).toBe(1);
});
