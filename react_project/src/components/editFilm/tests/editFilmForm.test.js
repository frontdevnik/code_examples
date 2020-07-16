import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EditFilmForm from '../EditFilmForm';
import styles from '../editFilm.module.scss';

describe('<EditFilmForm />', () => {
  let wrapper;
  let store;
  const mockStore = configureStore();
  const initialState = {
    actorReducer: {
      actor: null,
      loading: true,
      error: null,
    },
  };

  const props = {
    editFilm_title: 'Title', 
    editFilm_img: 'Img url', 
    editFilm_director: 'Director', 
    editFilm_genres: 'Genres', 
    editFilm_description: 'Description', 
    editFilm_submit: jest.fn(),
    goBack: jest.fn(),
    editFilm_goBack: 'Go back',
  }

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<Provider store={store}><EditFilmForm {...props} /></Provider>);
  });

  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
