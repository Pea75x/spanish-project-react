import React from 'react';
import { titleCase } from '../utils/stringUtils';
import pronouns from '../data/pronouns.json';

function VerbTenseCard({ tense }) {
  return (
    <div className='rounded-lg border shadow-lg m-3 flex flex-col justify-between'>
      <div className='h-20 flex items-center justify-items-center bg-amber-50'>
        <h1 className='text-xl font-bold w-full'>{titleCase(tense.name)}</h1>
      </div>
      <div className='mt-4'>
        {pronouns.map((pronoun) => (
          <div className='flex items-center justify-around m-1' key={pronoun}>
            {!tense?.participle && <div className='font-bold'>{pronoun}</div>}
            <div className=''>{tense[pronoun].word}</div>
            {tense?.participle && (
              <div className='font-bold'>{tense.participle.word}</div>
            )}
          </div>
        ))}
        <div className='h-20 flex flex-col justify-center mt-4 mx-1'>
          {tense.sentences.length > 0 && (
            <div>
              <div className='font-bold'>{tense.sentences[0].sentence}</div>
              <div className='text-sm'>{tense.sentences[0].translation}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerbTenseCard;
