import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

import { findComponentWithAttr } from '../../utils/testUtils';

describe('<App />', () => {
  test('renders without error', () => {
    const wrapper = shallow(
      <App currentUser={{}} token="token" alerts={[]} loadUser={() => {}} />
    );
    const component = findComponentWithAttr(wrapper, 'component-app');
    expect(component.exists()).toBeTruthy();
  });
});
