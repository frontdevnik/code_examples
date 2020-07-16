import React, { Component } from 'react';
import Sorting from '../../components/sorting/Sorting';
import Movies from '../../components/movies/Movies';
import style from './home.module.scss';

class Home extends Component {
  render() {
    return (
      <main>
        <section className={style.films}>
          <Sorting />
          <Movies />
        </section>
      </main>
    );
  }
}

export default Home;
