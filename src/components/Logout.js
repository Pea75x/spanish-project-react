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
    <button onClick={logout} className='absolute bg-rose-100'>
      Logout
    </button>
  );
}

export default Logout;
