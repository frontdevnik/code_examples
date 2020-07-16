import React from 'react';
import { shallow } from 'enzyme';
import ChosenFilmUI from '../ChosenFilmUI';
import ChosenFilm from '../ChosenFilm';
import configureStore from 'redux-mock-store';
import styles from './chosenFilm.module.scss';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  useParams: () => ({
    id: 1,
  }),
}));

describe('<ChosenFilmUI />', () => {
  let wrapper;

  const props = {
    editMovie: jest.fn(),
    removeMovieById: jest.fn(),
    removeMovie: jest.fn(() => props.removeMovieById),
    choosenFilm_edit: 'Edit',
    choosenFilm_delete: 'Delete',
    actors: [],
    choosenFilm_likes: 'Likes',
    choosenFilm_director: 'Director',
    choosenFilm_actors: 'Actors',
    choosenFilm_genres: 'Genres',
    choosenFilm_description: 'Description',
    movie: {
      title: 'Title',
      posterUrl: 'posterUrl',
      stars: '4',
      likes: '3',
      genres: ['Genres'],
      director: 'Director',
      description: 'Description',
      id: 1,
    }
  }

  beforeEach(() => {
    wrapper = shallow(<ChosenFilmUI {...props} />).dive();
    jest.clearAllMocks();
  })

  it('should render correctly', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should invoke editMovie after button click', () => {
    const button = wrapper.find('button').at(0);
    button.simulate('click');
    expect(props.editMovie).toBeCalledTimes(1);
    expect(button.text()).toEqual(props.choosenFilm_edit);
  });

  it('should invoke removeMovie after button click', () => {
    const button = wrapper.find('button').at(1);
    button.simulate('click');
    expect(props.removeMovie()).toBeCalledTimes(1);
    expect(button.text()).toEqual(props.choosenFilm_delete);
  });
});

describe('<ChosenFilm />', () => {
  let wrapper;
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
      loading: false,
      error: null,
      movie: {},
    },
    actorsReducer: {
      actors: []
    },
  };

  const props = {
    fetchingMovie: jest.fn(),
  };

  beforeEach(() => {
    const store = mockStore(initialState);
    wrapper = shallow(<ChosenFilm store={store} {...props} />);
    jest.clearAllMocks();
  });

  it('should render loading', () => {
    const initialState = {
      choosenFilmReducer: {
        loading: true,
        error: null,
        movie: {},
      },
      actorsReducer: {
        actors: []
      },
    };
    const store = mockStore(initialState);
    wrapper = shallow(<ChosenFilm store={store} {...props} />);
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.dive().dive().dive().find('span').text()).toEqual('Loading...');
  });

  it('should render error', () => {
    const initialState = {
      choosenFilmReducer: {
        loading: false,
        error: 'error',
        movie: {},
      },
      actorsReducer: {
        actors: []
      },
    };
    const store = mockStore(initialState);
    wrapper = shallow(<ChosenFilm store={store} {...props} />);
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.dive().dive().dive().find('h1').text()).toEqual('Sorry, the service is not available now, try visiting later');
  });
});
