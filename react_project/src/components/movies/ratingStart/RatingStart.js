import React from 'react';
import PropTypes from 'prop-types';
import RenderStar from '../renderStart/RenderStart';
import style from './ratingStart.module.scss';

function RatingStart(props) {
  const { stars, id, movie } = props;

  return (
    <div className={style.stars}>
      <RenderStar star={stars} id={id} movie={movie} />
    </div>
  );
}

RatingStart.propTypes = {
  id: PropTypes.number.isRequired,
  stars: PropTypes.number.isRequired,
};

export default RatingStart;
