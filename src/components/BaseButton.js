import React from 'react';
import { Link } from 'react-router-dom';
import { titleCase } from '../utils/stringUtils';
import { useNavigate } from 'react-router-dom';

function BaseButton({ text, link = '', column = false, input, subHeadings }) {
  const navigate = useNavigate();

  return (
    <div
      data-testid='button-container'
      className={` ${
        column ? 'w-10/12 bg:w-7/12' : 'lg:w-1/6 w-1/2'
      }  bg-orange-100 m-3 rounded-lg ${
        link && 'hover:bg-orange-200'
      }`}
    >
      <Link
        className='h-16 flex items-center text-center text-gray-800 font-semibold text-2xl'
        to={`/${link}`}
      >
        <div className='w-full text-center text-gray-800 font-semibold text-2xl'>
          {titleCase(text)}
        </div>
        {input && (
          <span className='py-1 m-2 w-28 rounded-lg bg-orange-200  md:text-4xl text-3xl'>
            {input}
          </span>
        )}
      </Link>
      <div>
        {subHeadings && (
          <div className='flex flex-col items-center text-center text-gray-800 font-semibold text-2xl border-t border-gray-400 rounded-b-lg shadow'>
            {subHeadings.length &&
              subHeadings.map((heading) => (
                <div
                  key={heading.name}
                  onClick={() =>
                    navigate(`/${text}`, { state: { gameId: heading.id } })
                  }
                  className='h-12 flex items-center w-full justify-center hover:bg-orange-200 rounded-b-lg'
                >
                  {titleCase(heading.name)}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BaseButton;
