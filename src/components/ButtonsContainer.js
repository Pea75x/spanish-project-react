import React from 'react';
import { Link } from 'react-router-dom';
import { titleCase } from '../utils/stringUtils';

function ButtonsContainer({ buttons }) {
  return (
    <div className='w-full flex justify-center items-center flex-col lg:flex-row'>
      {buttons.map((button) => (
        <Link
          className='lg:w-1/6 w-1/2 h-14 text-center hover:bg-amber-100 text-gray-800 font-semibold py-4 px-4 border border-gray-400 rounded shadow m-3'
          to={`/${button}`}
        >
          {titleCase(button)}
        </Link>
      ))}
    </div>
  );
}

export default ButtonsContainer;
