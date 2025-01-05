import React from 'react';
import medal from '../medal.png';
import { useNavigate } from 'react-router-dom';
import Frog from '../frog.png'

function GameOver({ gameScore, game }) {
  const navigate = useNavigate();
  return (
    <div className='text-center w-full bg-orange-100'>
      <div className='flex flex-col md:flex-row justify-around items-center md:items-stretch lg:w-2/3 mx-auto my-2' 
          style={{ height: window.innerWidth >= 768 ? `calc(100vh - 320px)` : '500%'}}>
        <div className="md:w-1/2 w-full h-90 flex flex-col justify-between">
          <div className='flex items-center justify-center h-44'>
            <img src={Frog} width="180px" className='m-6'/>
            <h2 className='speech-bubble text-3xl font-bold text-center inline-block p-4 rounded-xl bg-white relative'>
              You scored {gameScore.game_points}
            </h2>
          </div>
          <div className='rounded-xl bg-white w-11/12 mx-auto my-6 md:my-0 p-2 h-40'>
            <h2 className='text-2xl font-bold text-center'>words to practice</h2>
            <div className='w-11/12 mx-auto flex flex-wrap justify-around items-center overflow-y-scroll' style={{'height': 'calc(100% - 30px)'}}>
              <div className='inline-block m-2 border border-amber-600 bg-orange-100 px-2 rounded-full text-amber-600'>word 1</div>
              <div className='inline-block m-2 border border-amber-600 bg-orange-100 px-2 rounded-full text-amber-600'>word 2</div>
              <div className='inline-block m-2 border border-amber-600 bg-orange-100 px-2 rounded-full text-amber-600'>word 3</div>
              {/* <div className='inline-block m-2 border border-amber-600 bg-orange-100 px-2 rounded-full text-amber-600'>word 4</div>
              <div className='inline-block m-2 border border-amber-600 bg-orange-100 px-2 rounded-full text-amber-600'>word 5</div>
              <div className='inline-block m-2 border border-amber-600 bg-orange-100 px-2 rounded-full text-amber-600'>word 6</div>
              <div className='inline-block m-2 border border-amber-600 bg-orange-100 px-2 rounded-full text-amber-600'>word 7</div>
              <div className='inline-block m-2 border border-amber-600 bg-orange-100 px-2 rounded-full text-amber-600'>word 8</div>
              <div className='inline-block m-2 border border-amber-600 bg-orange-100 px-2 rounded-full text-amber-600'>word 9</div> */}
            </div>
          </div>
        </div>
        <div className='w-full md:w-1/2 h-90'>
          <div className='bg-white rounded-lg w-1/2 md:w-11/12 h-full mx-auto p-4 text-center'>
            <h2 className='text-4xl font-bold'>Leaderboard</h2>
            <img src={medal} width='50px' className='mx-auto'/>
            <div className='h-2/3 flex flex-col content-center justify-around'>
              {game.leaderboard.map((position) => (
                <div className='flex justify-around text-2xl'>
                  <div>{position.position}</div>
                  <div>{position.user}</div>
                  <div>{position.game_points} points</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='w-full'>
        <button
          className='w-1/4 border border-gray-400 rounded-lg shadow p-2 my-2 hover:bg-amber-50'
          onClick={() => navigate(`/`)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default GameOver;
