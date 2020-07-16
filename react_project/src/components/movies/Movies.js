import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RatingStart from './ratingStart/RatingStart';
import Likes from './likes/Likes';
import Loading from '../loading/Loading';
import Error from '../error/Error';
import { fetchMovies, fetchActors, removeMovieReducer } from './action';
import style from './movies.module.scss';

function Movies(props) {
  const { movies, fetchMovies, fetchActors, removeMovieReducer, loading, error } = props;
  const history = useHistory();

  useEffect(() => {
    fetchMovies();
    fetchActors();
    removeMovieReducer();
  }, [fetchMovies, fetchActors, removeMovieReducer]);

  if (loading && !movies) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <section className={style.movies}>
      {movies.map((movie) => (
        <article key={movie.id} className={style.movie}>
          <img className={style.img} src={movie.posterUrl} alt={movie.title} />
          <h2
            className={style.title}
            onClick={() => {
              history.push('/movie/' + movie.id);
            }}>
            {movie.title}
          </h2>
          <Likes likes={movie.likes} id={movie.id} movie={movie} />
          <RatingStart stars={movie.stars} id={movie.id} movie={movie} />
        </article>
      ))}
    </section>
  );
}

Movies.propTypes = {
  movies: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null]),
  ]),
};

const mapStateToProps = (state) => ({
  movies: state.moviesReducer.movies,
  loading: state.moviesReducer.loading,
  error: state.moviesReducer.error,
});

const mapDispatchToProps = ({
  fetchMovies,
  fetchActors,
  removeMovieReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
