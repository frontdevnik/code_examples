import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchingActor, removeActor } from './actions';
import Loading from '../loading/Loading';
import Error from '../error/Error';
import ActorInfoUI from './ActorInfoUI';

function ActorInfo(props) {
  const { id } = useParams();
  const { fetchingActor, removeActor, actor, loading, error } = props;

  useEffect(() => {
    fetchingActor(id);

    return () => {
      removeActor();
    };
  }, [fetchingActor, removeActor, id]);

  if (loading && !actor) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <ActorInfoUI actor={actor} />
  );
}

ActorInfo.propTypes = {
  actor: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null]),
  ]),
  fetchingActor: PropTypes.func,
  removeActor: PropTypes.func,
};

const mapStateToProps = (state) => ({
  actor: state.actorReducer.actor,
  loading: state.actorReducer.loading,
  error: state.actorReducer.error,
});

const mapDispatchToProps = {
  fetchingActor,
  removeActor,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(ActorInfo);
