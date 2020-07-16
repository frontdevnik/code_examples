import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setRatingStars, changeSelectedMovieStars } from './actions';
import style from '../ratingStart/ratingStart.module.scss';

function RenderStar(props) {
  const { star, setRatingStars, changeSelectedMovieStars, movie } = props;
  
  const stars = [];

  let starsCount = star;

  const setStars = (i) => () => {
    setRatingStars({ ...movie, stars: i });
    changeSelectedMovieStars({ ...movie, stars: i });
  };

  for (let i = 1; i < 6; i++) {
    starsCount > 0
      ? stars.push(<div key={i} onClick={setStars(i)} className={style.starActive} />)
      : stars.push(<div key={i} onClick={setStars(i)} className={style.star} />);
    starsCount--;
  }

  return stars;
}

RenderStar.propTypes = {
  id: PropTypes.number.isRequired,
  star: PropTypes.number.isRequired,
  setRatingStars: PropTypes.func.isRequired,
  changeSelectedMovieStars: PropTypes.func.isRequired,
};

const mapDispatchToProps = ({
  setRatingStars,
  changeSelectedMovieStars,
});

export default connect(null, mapDispatchToProps)(RenderStar);
