import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import api from '../../core/callApi';
import { Routes } from '../../constans';
import EditFilmForm from './EditFilmForm';

function EditFilm(props) {
  const { movie } = props;

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const updatePost = async (data) => {
    const updatedMovie = { ...movie, ...data };
    await api(`movies/${movie.id}`, 'put', updatedMovie);
    history.push(Routes.HOMEPAGE);
  };

  return (
    <EditFilmForm goBack={goBack} onSubmit={updatePost} initialValues={movie} />
  );
}

EditFilm.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    posterUrl: PropTypes.string,
    stars: PropTypes.number,
    likes: PropTypes.number,
    genres: PropTypes.array,
    actorsIds: PropTypes.array,
    director: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  movie: state.choosenFilmReducer.choosenFilm,
});

const withConnect = connect(mapStateToProps);

export default withConnect(EditFilm);
