import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from './core/configureStore';
import Header from './components/header/Header';
import { Routers } from './core/routes';
import 'normalize.css';

const store = configureStore();

function App() {
  return (
    <Provider store={store} >
      <BrowserRouter>
        <Header />
        {Routers}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
