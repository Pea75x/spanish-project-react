import React from 'react';
import logo from '../logo.png';
import ButtonsContainer from './ButtonsContainer';
import { selectCurrentUser } from '../store/users/user.selector';
import { useSelector } from 'react-redux';
import Logout from './Logout';

function MainPage() {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div className='main-container'>
      <img src={logo} alt='logo' className='logo-large mt-6' />
      {currentUser ? (
        <ButtonsContainer buttons={['words', 'sentences', 'games']} />
      ) : (
        <ButtonsContainer buttons={['login', 'signup']} />
      )}
      {currentUser && <Logout />}
    </div>
  );
}

export default MainPage;
