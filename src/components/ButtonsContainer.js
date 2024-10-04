import React from 'react';
import { Link } from 'react-router-dom';
import { titleCase } from '../utils/stringUtils';

function ButtonsContainer({ buttons }) {
  return (
    <div className='w-full flex justify-center'>
      {buttons.map((button) => (
        <Link
          className='w-1/6 h-14 text-center hover:bg-gray-100 text-gray-800 font-semibold py-4 px-4 border border-gray-400 rounded shadow m-3'
          to={`/${button}`}
        >
          {titleCase(button)}
        </Link>
      ))}
    </div>
  );
}

export default ButtonsContainer;
