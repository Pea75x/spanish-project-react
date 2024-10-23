import React from 'react';
import { useSelector } from 'react-redux';
import logo from '../logo.png';
import ButtonsContainer from './ButtonsContainer';
import { getAllItems } from '../api/items';
import { selectCurrentUser } from '../store/users/user.selector';

function Homepage() {
  const currentUser = useSelector(selectCurrentUser);
  const [games, setGames] = React.useState({});

  React.useEffect(() => {
    const getData = async () => {
      try {
        const gameData = await getAllItems('games');
        setGames(gameData.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      {currentUser ? (
        <div className='md:flex md:flex-row grid grid-cols-2 content-start h-screen items-center lg:w-10/12 mx-auto mt-5 md:mt-0'>
          <div className='w-full flex justify-center items-center flex-col ml-6'>
            <ButtonsContainer
              button='total score'
              column
              input={currentUser.total_score}
            />
            <ButtonsContainer button='mistakes' column link='mistakes' />
          </div>
          <div className='w-full text-center lg:mt-6'>
            <img src={logo} alt='logo' className='md:w-60 w-40 my-6 mx-auto' />
            <h1 className='text-3xl font-bold'>{currentUser.username}</h1>
          </div>
          <div className='w-full flex justify-center items-center flex-col col-span-2'>
            <ButtonsContainer button='search' column link='search' />
            <ButtonsContainer button='games' column subHeadings={games} />
          </div>
        </div>
      ) : (
        <div className='flex items-center flex-col h-screen'>
          <img src={logo} alt='logo' className='w-60 m-6' />
          <ButtonsContainer button='login' link='login' />
          <ButtonsContainer button='signup' link='signup' />
        </div>
      )}
    </div>
  );
}

export default Homepage;
