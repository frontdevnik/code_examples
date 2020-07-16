import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import EditFilm from '../EditFilm';
import EditFilmForm from '../EditFilmForm';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('<EditFilm />', () => {
  const mockStore = configureStore();
  const initialState = {
    choosenFilmReducer: {
      choosenFilm: {
        title: 'Title',
        posterUrl: 'posterUrl',
        stars: '4',
        likes: '3',
        genres: ['Genres'],
        director: 'Director',
        actorsIds: [1, 2, 3],
        description: 'Description',
        id: 1,
      },
    },
  };

  const props = {
    goBack: () => {},
    onSubmit: function updatePost() {},
    initialValues: {},
  }

  it('should render correct editFilmUI', () => {
    const store = mockStore(initialState);
    const wrapper = shallow(<EditFilm store={store} />);
    const wrapper2 = shallow(<EditFilmForm {...props} />);
    expect(wrapper.dive().dive().dive().debug()).toEqual(wrapper2.debug());
  });
});
