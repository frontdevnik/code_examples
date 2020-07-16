import React from 'react';
import { shallow } from 'enzyme';
import Error from '../Error';

describe('<Error />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Error />);
  });

  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render text correctly', () => {
    expect(wrapper.find('h1').text()).toEqual('Sorry, the service is not available now, try visiting later');
  });
});
