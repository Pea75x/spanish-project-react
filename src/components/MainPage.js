import React from 'react';
import { userId } from '../api/auth';
import logo from '../logo.png';
import ButtonsContainer from './ButtonsContainer';
import { selectCurrentUser } from '../store/users/user.selector';
import { useSelector } from 'react-redux';

function MainPage() {
  const currentUser = useSelector(selectCurrentUser);
  const [loggedIn, setLoggedIn] = React.useState(false);

  console.log('current user:', currentUser);

  React.useEffect(() => {
    setLoggedIn(userId);
  }, [userId]);

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
