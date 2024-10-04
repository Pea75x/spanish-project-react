import React from 'react';
import medal from '../medal.png';
import { useNavigate } from 'react-router-dom';

function GameOver({ gameScore, game }) {
  const navigate = useNavigate();
  return (
    <div className='absolute flex items-center flex-col w-full mt-4'>
      <div className='bg-white w-1/3 border border-gray-400 rounded-lg shadow text-center'>
        <div className=''>
          <h1 className='pt-4 text-3xl font-bold'>GAME OVER</h1>
          <h2 className='text-2xl'>{gameScore.game_points} points</h2>
          {gameScore.leaderboard_ranking && (
            <div className='flex flex-col items-center'>
              <div className='player-ranking'>
                {gameScore.leaderboard_ranking}
              </div>
              <img src={medal} alt='medal' width='60px' />
            </div>
          )}
        </div>
        <div className='w-full'>
          <div className='text-xl font-bold'>Leaderboard</div>
          <div className='m-6 flex flex-col content-center'>
            {game.leaderboard.map((position) => (
              <div className='flex justify-around'>
                <div>{position.position}</div>
                <div>{position.user}</div>
                <div>{position.game_points} points</div>
              </div>
            ))}
          </div>
        </div>
        <button
          className='w-1/3 border border-gray-400 rounded-lg shadow p-1 mb-4 hover:bg-amber-50'
          onClick={() => navigate(`/`)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default GameOver;
