import React from 'react';
import { userId } from '../api/auth';
import logo from '../logo.png';
import ButtonsContainer from './ButtonsContainer';

function MainPage() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    setLoggedIn(userId);
  }, [userId]);

  console.log(userId());
  return (
    <div className='main-container'>
      <img src={logo} alt='logo' className='logo-large mt-6' />
      {loggedIn ? (
        <ButtonsContainer buttons={['words', 'sentences', 'games']} />
      ) : (
        <ButtonsContainer buttons={['login', 'signup']} />
      )}
    </div>
  );
}

export default MainPage;
