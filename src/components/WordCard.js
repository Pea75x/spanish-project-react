import React from 'react';
import { titleCase } from '../utils/stringUtils';
import WordSentencesCard from './WordSentencesCard';

function WordCard({ word, handleClick }) {
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
                {titleCase(theme)}
              </div>
            ))}
          </div>
        </div>
      </div>
      <WordSentencesCard sentences={word.sentences}/>
    </div>
  );
}

export default WordCard;
