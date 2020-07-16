import React from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../constans';
import withTranslation from '../../hocs/withTranslation';
import styles from './login.module.scss';

function LoginUI(props) {
  const { loginUser, login_title, login_name, login_password, login_button, form_noAccount, form_title, link_to_registration, login_name_placeholder, login_password_placeholder } = props;

  return (
    <section className={styles.login}>
      <h1 className={styles.header}>{form_title}</h1>
      <form className={styles.form}>
        <h2 className={styles.formTitle}>{login_title}</h2>
        <label>
          {login_name}
          <input id="name" placeholder={login_name_placeholder} />
        </label>
        <label>
          {login_password}
          <input id="password" type="password" placeholder={login_password_placeholder} />
        </label>
        <p id="incorrect" className={styles.incorrect}></p>
        <button onClick={loginUser}>{login_button}</button>
        <p className={styles.register}>
          {form_noAccount}
          <Link to={Routes.REGISTRATION}> {link_to_registration}</Link>
        </p>
      </form>
    </section>
  );
};

const withTranslationWorlds = withTranslation(['login_title', 'login_name', 'login_password', 'login_button', 'form_noAccount', 'form_title', 'link_to_registration', 'login_name_placeholder', 'login_password_placeholder']);

export default withTranslationWorlds(LoginUI);
