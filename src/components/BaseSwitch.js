import React from 'react';
import { titleCase } from '../utils/stringUtils';

function BaseSwitch({ optionA, optionB }) {
  const [selected, setSelected] = React.useState(optionB);

  return (
    <div className='w-2/12 min-w-32 flex flex-col mx-2 text-center'>
      <div className='w-full rounded bg-white h-auto m-auto shadow flex flex-col rounded-xl'>
        <div className='relative w-full rounded-md border h-10 bg-gray-200'>
          <div className='relative w-full h-full flex items-center'>
            <div
              onClick={() => setSelected(optionA)}
              className='w-full flex justify-center text-gray-400 cursor-pointer'
            >
              English
            </div>
            <div
              onClick={() => setSelected(optionB)}
              className='w-full flex justify-center text-gray-400 cursor-pointer'
            >
              Spanish
            </div>
          </div>

          <span
            className={`${
              selected === optionA ? 'left-1' : 'left-1/2 -ml-1'
            } bg-white shadow text-sm flex items-center justify-center w-1/2 rounded h-[1.88rem] transition-all duration-150 ease-linear top-[4px] absolute`}
          >
            {titleCase(selected)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BaseSwitch;
