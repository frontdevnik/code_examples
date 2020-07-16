import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../Loading';
import styles from '../loading.module.scss';

describe('<Loading />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Loading />);
  });

  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should has main class', () => {
    expect(wrapper.find('div').hasClass(styles.loader)).toEqual(true);
  });

  it('should render text correctly', () => {
    expect(wrapper.find('span').text()).toEqual('Loading...');
  });
});
