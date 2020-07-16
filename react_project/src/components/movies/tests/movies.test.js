import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Movies from '../Movies';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('<Movies />', () => {
  let wrapper;
  const mockStore = configureStore();
  const initialState = {
    fetchMovies: jest.fn(),
    fetchActors: jest.fn(),
    removeMovieReducer: jest.fn(),
    moviesReducer: {
      movies: [{
        title: 'Title',
        posterUrl: 'posterUrl',
        stars: '4',
        likes: '3',
        genres: ['Genres'],
        director: 'Director',
        actorsIds: [1, 2, 3],
        description: 'Description',
        id: 1,
      }],
      loading: false,
      error: null,
    },
  };

  beforeEach(() => {
    const store = mockStore(initialState);
    wrapper = shallow(<Movies store={store} />);
  });

  it('should render loading', () => {
    const initialState = {
      fetchMovies: jest.fn(),
      fetchActors: jest.fn(),
      removeMovieReducer: jest.fn(),
      moviesReducer: {
        movies: null,
        loading: true,
        error: null,
      },
    };
    const store = mockStore(initialState);
    wrapper = shallow(<Movies store={store} />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render error', () => {
    const initialState = {
      fetchMovies: jest.fn(),
      fetchActors: jest.fn(),
      removeMovieReducer: jest.fn(),
      moviesReducer: {
        movies: [],
        loading: false,
        error: 'error',
      },
    };
    const store = mockStore(initialState);
    wrapper = shallow(<Movies store={store} />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    expect(wrapper.dive().dive().debug()).toMatchSnapshot();
  });
});
