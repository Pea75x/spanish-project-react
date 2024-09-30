import React from 'react';
import { userId } from '../api/auth';
import logo from '../logo.png';
import ButtonsContainer from './ButtonsContainer';

function MainPage() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    setLoggedIn(userId);
  }, [userId]);

  return (
    <div className='flex items-center flex-col h-screen'>
      <img src={logo} alt='logo' className='w-60 m-6' />
      {loggedIn ? (
        <ButtonsContainer buttons={['words', 'sentences', 'games']} />
      ) : (
        <ButtonsContainer buttons={['login', 'signup']} />
      )}
    </div>
  );
}

export default MainPage;
