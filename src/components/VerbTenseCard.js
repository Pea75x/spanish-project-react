import React from 'react';
import { titleCase } from '../utils/stringUtils';
import pronouns from '../data/pronouns.json';

function VerbTenseCard({ tense }) {
  return (
    <div className="card-container m-4">
      <div className='card'>
        <div className='card-front flex flex-col justify-between rounded-lg border shadow-md'>
          <div className='h-20 flex items-center justify-items-center rounded-t-lg bg-amber-50'>
            <h1 className='text-xl font-bold w-full'>{titleCase(tense.name)}</h1>
          </div>
          <div className='py-4'>
            {pronouns.map((pronoun) => (
              <div className='flex items-center justify-around m-1' key={pronoun}>
                {!tense?.participle && <div className='font-bold'>{pronoun}</div>}
                <div className=''>{tense[pronoun].word}</div>
                {tense?.participle && (
                  <div className='font-bold'>{tense.participle.word}</div>
                )}
              </div>
            ))}
          </div>
          <div className='h-20 flex flex-col justify-center border-t text-amber-600 bg-amber-50 rounded-b-lg'>
            {tense.sentences.length > 0 && (
              <div>
                <div className='font-bold'>{tense.sentences[0].sentence}</div>
              </div>
            )}
          </div>
        </div>
        <div className='card-back flex flex-col justify-between rounded-lg border shadow-md'>
          <div className='h-20 flex items-center justify-items-center rounded-t-lg bg-amber-50 w-full'>
            <h1 className='text-xl font-bold w-full'>{titleCase(tense.name)}</h1>
          </div>
          <div className='py-4'>
            {pronouns.map((pronoun) => (
              <div className='flex items-center justify-around m-1' key={pronoun}>
                <div>{tense[pronoun].translation}</div>
              </div>
            ))}
          </div>
          <div className='h-20 flex flex-col justify-center border-t text-amber-600 bg-amber-50 rounded-b-lg'>
            {tense.sentences.length > 0 && (
              <div>
                <div className='font-bold'>{tense.sentences[0].translation}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerbTenseCard;
