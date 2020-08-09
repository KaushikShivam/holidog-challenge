import React from 'react';
import { shallow } from 'enzyme';
import { AuthorPage } from './AuthorPage';

import { findComponentWithAttr } from '../../utils/testUtils';

describe('<AuthorPage />', () => {
  it('renders without error', () => {
    const wrapper = shallow(
      <AuthorPage
        fetchAllAuthors={() => {}}
        updateAuthor={() => {}}
        deleteAuthor={() => {}}
        createAuthor={() => {}}
        authors={[]}
      />
    );
    const component = findComponentWithAttr(wrapper, 'page-author');
    expect(component.exists()).toBeTruthy();
    expect(component.find('h2.heading-2').text()).toBe('Create an Author');
  });

  it('renders without error', () => {
    const wrapper = shallow(
      <AuthorPage
        fetchAllAuthors={() => {}}
        updateAuthor={() => {}}
        deleteAuthor={() => {}}
        createAuthor={() => {}}
        authors={[]}
      />
    );
    const component = findComponentWithAttr(wrapper, 'page-author');
    expect(component.exists()).toBeTruthy();
    expect(component.find('h2.heading-2').text()).toBe('Create an Author');
  });
});
