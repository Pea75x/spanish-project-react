import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../store/users/user.action';
import { removeToken } from '../utils/authUtils';

function Logout() {
  const dispatch = useDispatch();

  function logout() {
    removeToken();
    dispatch(setCurrentUser({ currentUser: null, token: null }));
  }

  return (
    <button onClick={logout} className='absolute right-10 top-5 text-2xl'>
      Logout
    </button>
  );
}

export default Logout;
