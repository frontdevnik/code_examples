import React from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../core/callApi';
import RegistrationUI from './RegistrationUI';

function Registration() {
  const history = useHistory();

  let users = api('users').then(({ data }) => users = data);

  const regUser = async (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const password = document.querySelector('#password').value;
    const incorrectText = document.querySelector('#incorrect');

    if (!/.{3,}/.test(name)) {
      incorrectText.textContent = 'The name must have at least 3 characters';
      return;
    }

    if (!/^[A-Z]\w{3,}$/.test(password)) {
      incorrectText.textContent = 'The password must have at least 4 characters and start with a capital letter';
      return;
    }

    if (Array.isArray(users) && users.some(user => user.name === name && user.password === password)) {
      incorrectText.textContent = 'User already exist';
      return;
    }

    await api('users', 'post', { name, password });
    history.push('/home');
  }

  return (
    <RegistrationUI regUser={regUser} />
  )
}

export default Registration;
