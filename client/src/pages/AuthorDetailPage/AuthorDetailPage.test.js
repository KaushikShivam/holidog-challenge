import React from 'react';
import { shallow } from 'enzyme';
import { AuthorDetailPage } from './AuthorDetailPage';

import { findComponentWithAttr } from '../../utils/testUtils';

jest.mock('react-router-dom', () => ({
  useParams: () => ({
    push: jest.fn(),
  }),
}));

describe('<AuthorDetailPage />', () => {
  it('renders without error', () => {
    const wrapper = shallow(<AuthorDetailPage fetchAuthor={() => {}} />);
    const component = findComponentWithAttr(wrapper, 'page-author-detail');
    expect(component.exists()).toBeTruthy();
  });
});
