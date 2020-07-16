import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from '../NotFoundPage';
import styles from './notFoundPage.module.scss';

describe('<NotFoundPage />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NotFoundPage />);
  });

  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('div must have correct class', () => {
    expect(wrapper.find('div').hasClass(styles.main)).toBeTruthy();
  });

  it('h1 should render correctly', () => {
    expect(wrapper.find('h1').hasClass(styles.text)).toBeTruthy();
    expect(wrapper.find('h1').text()).toEqual('Page not found');
  });
});
