import React from 'react';
import { useSelector } from 'react-redux';
import logo from '../logo.png';
import BaseButton from './BaseButton';
import { getAllItems } from '../api/items';
import { selectCurrentUser, selectToken } from '../store/users/user.selector';

function Homepage() {
  const currentUser = useSelector(selectCurrentUser);
  const token = useSelector(selectToken);
  const [games, setGames] = React.useState({});

  React.useEffect(() => {
    const getData = async () => {
      try {
        const gameData = await getAllItems('games', token);
        setGames(gameData.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    currentUser && getData();
  }, []);

  return (
    <div>
      {currentUser ? (
        <div className='md:flex md:flex-row grid grid-cols-2 content-start h-screen items-center lg:w-10/12 mx-auto mt-5 md:mt-0'>
          <div className='w-full flex justify-center items-center flex-col ml-6'>
            <BaseButton
              text='total score'
              column
              input={currentUser.total_score}
            />
            <BaseButton
              text='mistakes'
              column
              input='0'
              link={0 === 9 ? 'mistakes' : ''}
            />
          </div>
          <div className='w-full text-center lg:mt-6'>
            <img src={logo} alt='logo' className='md:w-60 w-40 my-6 mx-auto' />
            <h1 className='text-3xl font-bold'>{currentUser.username}</h1>
          </div>
          <div className='w-full flex justify-center items-center flex-col col-span-2'>
            <BaseButton text='search' column link='search' />
            <BaseButton text='games' column subHeadings={games} />
          </div>
        </div>
      ) : (
        <div className='flex items-center flex-col h-screen'>
          <img src={logo} alt='logo' className='w-60 m-6' />
          <div className='flex w-full justify-center lg:flex-row flex-col items-center'>
            <BaseButton text='login' link='login' />
            <BaseButton text='signup' link='signup' />
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;
