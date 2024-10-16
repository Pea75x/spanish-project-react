import React from 'react';
import logo from '../logo.png';
import { getAllItems } from '../api/items';
import { titleCase } from '../utils/stringUtils';
import { useNavigate } from 'react-router-dom';

function Games() {
  const [games, setGames] = React.useState({});
  const navigate = useNavigate();

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
    <div className='flex items-center flex-col h-screen'>
      <img src={logo} alt='logo' className='w-60 m-6' />
      {games.length ? (
        <div className='w-full flex justify-center'>
          {games.map((game) => (
            <button
              className='w-1/6 h-14 text-center hover:bg-amber-100 text-gray-800 font-semibold py-4 px-4 border border-gray-400 rounded shadow m-3'
              onClick={() => navigate('/game', { state: { gameId: game.id } })}
            >
              {titleCase(game.name)}
            </button>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Games;
