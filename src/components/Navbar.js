import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/users/user.selector';
import { setCurrentUser } from '../store/users/user.action';
import logo from '../logo.png';
import tiles from '../tiles.jpg'

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  function logout() {
    dispatch(setCurrentUser({ currentUser: null, token: null }));
    navigate('/');
  }
  return (
    <div className='w-full h-12' style={{backgroundImage: "url(" + tiles + ")"}}>
      <a href='/'>
        <img src={logo} alt='logo' className='w-12 pt-1 ml-3' />
      </a>
      {currentUser && currentUser.admin && (
        <button
          className='absolute left-20 top-1 text-xl rounded-lg py-1 px-5 bg-orange-100 hover:bg-orange-200'
          onClick={() => navigate(`/create`)}
        >
          + Create
        </button>
      )}
      {currentUser && (
        <button
          onClick={logout}
          className='absolute right-10 top-1 text-2xl rounded-lg py-1 px-5 text-white bg-blue-700 hover:bg-blue-800 shadow'
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default Navbar;
