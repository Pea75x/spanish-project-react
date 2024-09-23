import React from 'react';
import { createUser } from '../api/auth';
import FormInput from './FormInput';
import logo from '../logo.png';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState('');

  const [user, setUser] = React.useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  function handleSubmit(event) {
    event.preventDefault();

    if (user.password !== user.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    const getData = async () => {
      try {
        await createUser(user);
        navigate(`/`);
      } catch (error) {
        if (error.response?.data) {
          setErrorMessage(error.response.data);
        } else if (error.message) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('Error');
        }
      }
    };
    getData();
  }

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  return (
    <div className='p-4 login-container'>
      <img src={logo} alt='logo' className='logo-small' />
      <div className='card'>
        <div className='card-header'>
          <h1 className='title pl-6 py-4'>Sign Up</h1>
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
            label='Email'
            type='text'
            required
            onChange={handleChange}
            name='email'
            value={user.email}
          />
          <FormInput
            label='Password'
            type='password'
            required
            onChange={handleChange}
            name='password'
            value={user.password}
          />
          <FormInput
            label='Confirm password'
            type='password'
            required
            onChange={handleChange}
            name='confirmPassword'
            value={user.confirmPassword}
          />
          <div className='error has-text-danger'>{errorMessage}</div>
          <button type='submit' className='button'>
            Sign up
          </button>
        </form>
        <p className='has-text-centered pb-3'>
          Have an account?
          <a className='m-2' href='/login'>
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
