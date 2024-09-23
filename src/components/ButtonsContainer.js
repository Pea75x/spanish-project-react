import React from 'react';
import { Link } from 'react-router-dom';
import { titleCase } from '../utils/stringUtils';

function ButtonsContainer({ buttons }) {
  return (
    <div className='home-buttons-container'>
      {buttons.map((button) => (
        <Link className='button large-button' to={`/${button}`}>
          {titleCase(button)}
        </Link>
      ))}
    </div>
  );
}

export default ButtonsContainer;
