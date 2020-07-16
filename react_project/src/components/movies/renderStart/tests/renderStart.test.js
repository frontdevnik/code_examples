import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import RenderStart from '../RenderStart';

describe('<RenderStart />', () => {
  let wrapper;
  const mockStore = configureStore();
  const initialState = {
    setRatingStars: jest.fn(),
    changeSelectedMovieStars: jest.fn(),
  }

  const props = {
    star: 5,
    movie: {},
    id: 2,
  }

  beforeEach(() => {
    const store = mockStore(initialState);
    wrapper = shallow(<RenderStart store={store} {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
  
  it('should render the correct number of stars', () => {
    expect(wrapper.dive().find('div').length).toBe(5);
  });
});
