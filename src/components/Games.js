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
        console.log(gameData.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    getData();
  }, []);

  return (
    <div className='main-container'>
      <img src={logo} alt='logo' className='logo-large mt-6' />
      {games.length ? (
        <div>
          {games.map((game) => (
            <button
              className='button large-button'
              onClick={() => navigate('/game', { state: { gameName: game } })}
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
