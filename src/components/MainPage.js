import React from 'react';
import { isAdmin, userId } from '../api/auth';
import logo from '../logo.png';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div className='main-container'>
      <img src={logo} alt='logo' className='logo-large mt-6' />
      {userId === false ? (
        <div className='home-buttons-container'>
          <Link className='button large-button' to='/words'>
            Words
          </Link>
          <Link className='button large-button' to='/sentences'>
            Sentences
          </Link>
          <Link className='button large-button' to='/games'>
            Games
          </Link>
        </div>
      ) : (
        <div>
          <Link className='button large-button' to='/login'>
            Log in
          </Link>
          <Link className='button large-button' to='/sign-up'>
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
}

export default MainPage;
