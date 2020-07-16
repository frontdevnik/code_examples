import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Routes } from '../../constans';
import withTranslation from '../../hocs/withTranslation';
import styles from './header.module.scss';

function Header(props) {
  let homeLink = <div />;
  let loginLink;
  const { isLoggin, header_home_link, header_logout_link, header_login_link, header_registration_link, header_title } = props;

  const logOut = () => {
    localStorage.setItem('isLoggin', 0);
    window.location.reload(true);
  };

  const changeLang = (lang) => () => {
    localStorage.setItem('selectedLanguage', lang);
    window.location.reload(true);
  }

  if (isLoggin) {
    homeLink = (
      <div>
        <NavLink className={styles.link} to={Routes.HOMEPAGE}>{header_home_link}</NavLink>
      </div>
    );
    loginLink = (
      <p onClick={logOut} className={styles.link}>{header_logout_link}</p>
    );
  } else {
    loginLink = (
      <div>
        <NavLink className={styles.link} activeClassName={styles.active} to={Routes.REGISTRATION}>{header_registration_link}</NavLink>
        <NavLink className={styles.link} activeClassName={styles.active} to={Routes.LOGIN}>{header_login_link}</NavLink>
      </div>
    );
  }
  return (
    <>
      <header className={styles.header}>
        <div className={styles.langContainer}>
          <span onClick={changeLang('ukr')} className={styles.lang}>ukr </span>/
          <span onClick={changeLang('eng')} className={styles.lang}> eng</span>
        </div>
        {homeLink}
        {loginLink}
      </header>
      {isLoggin ? <h1 className={styles.title}>{header_title}</h1> : null}
    </>
  );
}

Header.propTypes = {
  isLoggin: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isLoggin: state.loginReducer.isLoggin,
});

const withConnect = connect(mapStateToProps);
const withTranslationWords = withTranslation(['header_home_link', 'header_logout_link', 'header_login_link', 'header_registration_link', 'header_title']);

export default withTranslationWords(withConnect(Header));
