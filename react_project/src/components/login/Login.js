import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import api from '../../core/callApi';
import { allowLogin } from './actions';
import LoginUI from './LoginUI';

function Login(props) {
  const history = useHistory();
  const { allowLogin } = props;

  if (+localStorage.getItem('isLoggin')) {
    allowLogin();
    history.push('/home');
  }

  const loginUser = async (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const password = document.querySelector('#password').value;

    const { data: user } = await api(`users?name=${name}&password=${password}`);

    if (user.length) {
      allowLogin();
      localStorage.setItem('isLoggin', 1);
      history.push('/home');
    } else {
      const incorrectText = document.querySelector('#incorrect');
      incorrectText.textContent = 'Username or password is invalid';
    }
  };

  return (
    <LoginUI loginUser={loginUser} />
  );
}

Login.propTypes = {
  allowLogin: PropTypes.func,
};

const mapDispatchToProps = ({
  allowLogin,
});

const withConnect = connect(null, mapDispatchToProps);

export default withConnect(Login);
