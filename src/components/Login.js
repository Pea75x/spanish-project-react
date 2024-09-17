import React from 'react';
import { loginUser } from '../api/auth';
import FormInput from './FormInput';
import logo from '../logo.png';

function Login() {
  const [errorMessage, setErrorMessage] = React.useState('');

  const [user, setUser] = React.useState({
    username: '',
    password: ''
  });

  function handleSubmit(event) {
    event.preventDefault();

    const getData = async () => {
      try {
        await loginUser(user);
      } catch (error) {
        setErrorMessage(error.response.data);
      }
    };
    getData();
  }

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
    console.log('user', user);
  }

  return (
    <div className='p-4 login-container'>
      <img src={logo} alt='logo' className='logo' />
      <div className='card'>
        <div className='card-header'>
          <h1 className='title pl-6 py-4'>Login</h1>
        </div>
        <form onSubmit={handleSubmit} className='px-6 py-5'>
          <FormInput
            label='Username'
            type='text'
            required
            onChange={handleChange}
            name='username'
            value={user.username}
          />
          <FormInput
            label='Password'
            type='password'
            required
            onChange={handleChange}
            name='password'
            value={user.password}
          />
          <div className='error has-text-danger'>{errorMessage}</div>
          <button type='submit' className='button'>
            Login
          </button>
        </form>
        <p className='has-text-centered pb-3'>
          Dont have an account?
          <a className='m-2' href='/sign-up'>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
