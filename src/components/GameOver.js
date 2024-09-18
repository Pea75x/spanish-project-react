import React from 'react';
import medal from '../medal.png';

function GameOver({ gameScore, game }) {
  return (
    <div className='popup-container'>
      <div className=''>
        <h1 className='title m-0'>GAME OVER</h1>
        <h2 className='subtitle m-0'>{gameScore.game_points} points</h2>
        {gameScore.leaderboard_ranking && (
          <div>
            <div className='player-position'>
              {gameScore.leaderboard_ranking}
            </div>
            <img src={medal} alt='medal' width='60px' />
          </div>
        )}
      </div>
      <div className='leaderboard p-2'>
        <div className='title is-5 m-0'>Leaderboard</div>
        <div className='px-4'>
          {game.leaderboard.map((position) => (
            <div className='leaderboard-user-points'>
              <div>{position.position}</div>
              <div>{position.user}</div>
              <div>{position.game_points} points</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GameOver;
