import React from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../constans';
import withTranslation from '../../hocs/withTranslation';
import styles from './registration.module.scss';

function RegistrationUI(props) {
  const { regUser, registration_title, registration_name, registration_password, registration_button, form_noAccount, form_title, link_to_login, registration_name_placeholder, registration_password_placeholder } = props;

  return (
    <section className={styles.login}>
      <h1 className={styles.header}>{form_title}</h1>
      <form className={styles.form}>
        <h2 className={styles.formTitle}>{registration_title}</h2>
        <label>
          {registration_name}
          <input id="name" placeholder={registration_name_placeholder} />
        </label>
        <label>
          {registration_password}
          <input id="password" type='password' placeholder={registration_password_placeholder} />
        </label>
        <p id="incorrect" className={styles.incorrect}></p>
        <button onClick={regUser}>{registration_button}</button>
        <p className={styles.register}>
          {form_noAccount}
          <Link to={Routes.LOGIN}> {link_to_login}</Link></p>
      </form>
    </section>
  );
}

const withTranslationWorlds = withTranslation(['registration_title', 'registration_name', 'registration_password', 'registration_button', 'form_noAccount', 'form_title', 'link_to_login', 'registration_name_placeholder', 'registration_password_placeholder']);

export default withTranslationWorlds(RegistrationUI);
