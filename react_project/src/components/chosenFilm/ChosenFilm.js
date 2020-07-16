import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes, { number } from 'prop-types';
import { Routes } from '../../constans';
import { fetchingMovie } from './actions';
import api from '../../core/callApi';
import Loading from '../loading/Loading';
import Error from '../error/Error';
import ChosenFilmUI from './ChosenFilmUI';
import style from './chosenFilm.module.scss';

function ChosenFilm(props) {
  const history = useHistory();
  const { id } = useParams();
  const { fetchingMovie, loading, movie, error } = props;

  useEffect(() => {
    fetchingMovie(id);
  }, [fetchingMovie, id]);

  if (loading && !movie) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const { actorsIds } = movie;
  const actorsArr = props.actors;
  const actors = [];

  actorsArr.forEach((actor) => {
    if (actorsIds.some(id => actor.id === id)) {
      actors.push(<span key={actor.id} onClick={showActor(actor)} className={style.actor}>{actor.name}</span>);
    }
  });

  const editMovie = () => {
    history.push(history.location.pathname + '/edit');
  };

  const removeMovie = (id) => async () => {
    await api(`movies/${id}`, 'delete');
    history.push(Routes.HOMEPAGE);
  };

  function showActor(actor) {
    return () => {
      history.push(Routes.ACTOR + `/${actor.id}`);
    };
  }

  return (
    <ChosenFilmUI movie={movie} actors={actors} editMovie={editMovie} removeMovie={removeMovie}/>
  );
}

ChosenFilm.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    posterUrl: PropTypes.string,
    stars: PropTypes.number,
    likes: PropTypes.number,
    genres: PropTypes.array,
    actorsIds: PropTypes.arrayOf(number),
    director: PropTypes.string,
    description: PropTypes.string,
  }),
  actors: PropTypes.array.isRequired,
  fetchingMovie: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null]),
  ]),
};

const mapStateToProps = (state) => ({
  movie: state.choosenFilmReducer.choosenFilm,
  loading: state.choosenFilmReducer.loading,
  error: state.choosenFilmReducer.error,
  actors: state.actorsReducer.actors,
});

const mapDispatchToProps = ({
  fetchingMovie,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(ChosenFilm);
