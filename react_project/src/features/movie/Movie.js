import React from 'react';
import ChosenFilm from '../../components/chosenFilm/ChosenFilm';
import styles from './movie.module.scss';

function Movie() {
  return (
    <section className={styles.singleFims}>
      <ChosenFilm />
    </section>
  );
}

export default Movie;
