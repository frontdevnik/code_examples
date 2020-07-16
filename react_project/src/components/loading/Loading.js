import React from 'react';
import styles from './loading.module.scss';

function Loading() {
  return (
    <div className={styles.loader}>
      <span>Loading...</span>
    </div>
  );
}

export default Loading;
