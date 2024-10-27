import React from 'react';
import { removeSnakeCase, titleCase } from '../utils/stringUtils';
import { useNavigate } from 'react-router-dom';

function WordCard({ word, handleClick }) {
  const navigate = useNavigate();

  return (
    <div className='flex w-11/12 mx-auto flex-col md:flex-row justify-around'>
      <div className='md:w-1/3 flex md:inline justify-between'>
        {word.verb && (
          <div className='border rounded-lg m-4 w-full md:mr-4 p-2 shadow-lg'>
            <h2 className='text-3xl font-semibold'>Verb</h2>
            <div
              className='flex flex-col md:flex-row justify-around w-1/2 mx-auto text-xl m-2'
              onClick={() => handleClick(word.verb.id)}
            >
              <p className='font-bold text-amber-600'>
                {titleCase(word.verb.word)}
              </p>
              <p>{word.verb.translation}</p>
            </div>
          </div>
        )}
        <div className='border rounded-lg m-4 w-full p-2 shadow-lg'>
          <h2 className='text-3xl font-semibold'>Themes</h2>
          <div className='flex m-2 flex-wrap justify-center'>
            {word.themes.map((theme) => (
              <div className='rounded-full bg-amber-50 border border-amber-600 text-amber-600 m-1 px-3'>
                {removeSnakeCase(theme)}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='md:w-2/3 border rounded-lg m-4 md:ml-8 p-2 bg-amber-50 shadow-lg'>
        <h2 className='text-3xl font-semibold'>Sentence examples</h2>
        <div className='border rounded-lg h-[calc(100%-3rem)] min-h-28 m-2 bg-white'>
          {word.sentences.map((sentence) => (
            <div
              onClick={() =>
                navigate(`/sentence-show`, {
                  state: { id: sentence.id }
                })
              }
            >
              {sentence.sentence}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WordCard;
