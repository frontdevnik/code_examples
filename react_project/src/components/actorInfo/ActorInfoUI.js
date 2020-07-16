import React from 'react';
import PropTypes from 'prop-types';
import withTranslation from '../../hocs/withTranslation';
import styles from './actorInfo.module.scss';

function ActorInfoUI(props) {
  const { name, imgUrl, biography } = props.actor;
  const { actor_name, actor_biography } = props;

  return (
    <div className={styles.aboutActor}>
      <img className={styles.profileImg} alt={name} src={imgUrl} />
      <div>
        <p className={styles.actorInfo}>
          <b>{actor_name}: </b>
          {name}
        </p>
        <p className={styles.actorInfo}>
          <b>{actor_biography}: </b>
          {biography}
        </p>
      </div>
    </div>
  )
};

ActorInfoUI.propTypes = {
  actor: PropTypes.shape({
    name: PropTypes.string,
    imgUrl: PropTypes.string,
    biography: PropTypes.string,
    actor_name: PropTypes.string,
    actor_biography: PropTypes.string,
  })
};

const withTranslationWorlds = withTranslation(['actor_name', 'actor_biography']);

export default withTranslationWorlds(ActorInfoUI);
