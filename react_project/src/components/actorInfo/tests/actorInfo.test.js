import React from 'react';
import enzyme, { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ActorInfo from '../ActorInfo';
import * as actions from '../actions';
import * as types from '../types';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    match: {
      params: { id: 1 }
    }
  }),
}));

describe('<ActorInfo />', () => {
  let wrapper;
  let instance;
  let store;
  const initialState = {
    actorReducer: {
      actor: null,
      loading: true,
      error: null,
    },
  };
  const mockStore = configureStore();

  const props = {
    id: 3,
  }

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<Provider store={store}><ActorInfo {...props} /></Provider>);
    instance = wrapper.instance();
  });

  it('should render loading', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render error', () => {
    store = mockStore({
      actorReducer: {
        actor: null,
        loading: false,
        error: true,
      },
    });
    wrapper = shallow(<Provider store={store}><ActorInfo {...props} /></Provider>);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render actor', () => {
    store = mockStore({
      actorReducer: {
        actor: {},
        loading: false,
        error: null,
      },
    });
    wrapper = shallow(<Provider store={store}><ActorInfo {...props} /></Provider>);
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('actions', () => {
    it('should remove actor from store', () => {
      const expectedAction = {
        type: types.REMOVE_ACTOR,
      };
      expect(actions.removeActor()).toEqual(expectedAction);
    });
  });
});
