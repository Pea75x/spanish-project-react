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
    <div className='flex items-center flex-col h-screen text-gray-700'>
      <img src={logo} alt='logo' className='w-32 m-6' />
      <div className='w-1/4 rounded-lg border shadow-lg flex flex-col justify-between px-12 py-5'>
        <h1 className='text-4xl font-bold w-full mb-3'>Sign Up</h1>
        <form onSubmit={handleSubmit}>
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
          <div
            className={`bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-6 rounded relative ${
              !errorMessage && 'error-message'
            }`}
          >
            {errorMessage}
          </div>
          <button
            type='submit'
            className='w-1/3 h-10 text-center hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow mt-4'
          >
            Sign up
          </button>
        </form>
        <p className='mt-5'>
          Have an account?
          <a className='ml-2 font-bold' href='/login'>
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
