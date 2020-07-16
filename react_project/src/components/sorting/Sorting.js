import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SortByName from './SortByName';
import { sorByLikes, sortByRating, resetSorting } from './actions';
import style from './sorting.module.scss';
import withTranslation from '../../hocs/withTranslation';

function Sorting(props) {
  const { sorByLikes, sortByRating, resetSorting, sort_title, sort_by_likes, sort_by_rating, sort_reset, sort_search } = props;

  return (
    <div className={style.sorting}>
      <h3>{sort_title}</h3>
      <button type="button" onClick={sorByLikes}>{sort_by_likes}</button>
      <button type="button" onClick={sortByRating}>{sort_by_rating}</button>
      <button type="button" onClick={resetSorting}>{sort_reset}</button>
      <SortByName placeholder={sort_search} />
    </div>
  );
}

Sorting.propTypes = {
  sorByLikes: PropTypes.func.isRequired,
  sortByRating: PropTypes.func.isRequired,
  resetSorting: PropTypes.func.isRequired,
};

const mapDispatchToProps = ({
  sorByLikes,
  sortByRating,
  resetSorting,
});

const withConnect = connect(null, mapDispatchToProps);
const withTranslationWords = withTranslation(['sort_title', 'sort_by_likes', 'sort_by_rating', 'sort_reset', 'sort_search']);

export default withTranslationWords(withConnect(Sorting));
