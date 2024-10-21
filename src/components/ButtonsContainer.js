import React from 'react';
import { Link } from 'react-router-dom';
import { titleCase } from '../utils/stringUtils';

function ButtonsContainer({ buttons, column = false }) {
  return (
    <div
      className={`w-full flex justify-center items-center ${
        column ? 'flex-col' : 'lg:flex-row flex-col'
      }`}
    >
      {buttons.map((button) => (
        <Link
          className={`h-14 text-center hover:bg-amber-100 text-gray-800 font-semibold py-4 px-4 border border-gray-400 rounded shadow m-3 ${
            column ? 'w-2/3' : 'lg:w-1/6 w-full'
          }`}
          to={`/${button}`}
        >
          {titleCase(button)}
        </Link>
      ))}
    </div>
  );
}

export default ButtonsContainer;
