import React from 'react';
import logo from '../logo.png';
import ButtonsContainer from './ButtonsContainer';
import { selectCurrentUser } from '../store/users/user.selector';
import { useSelector } from 'react-redux';
import Logout from './Logout';

function MainPage() {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div>
      {currentUser ? (
        <div className='flex items-center justify-center h-screen'>
          <ButtonsContainer buttons={['words', 'sentences']} column />
          <img src={logo} alt='logo' className='w-60 m-6' />
          <ButtonsContainer buttons={['games']} column />
        </div>
      ) : (
        <div className='flex items-center flex-col h-screen'>
          <img src={logo} alt='logo' className='w-60 m-6' />
          <ButtonsContainer buttons={['login', 'signup']} />
        </div>
      )}
      {currentUser && <Logout />}
    </div>
  );
}

export default MainPage;
