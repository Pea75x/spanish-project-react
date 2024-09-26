import React from 'react';
import { titleCase } from '../utils/stringUtils';
import pronouns from '../data/pronouns.json';

function VerbTenseCard({ tense }) {
  console.log(tense.sentences);
  return (
    <div className='card has-text-centered verb-tense-card'>
      <h1 className='verb-tense-title m-0'>{titleCase(tense.name)}</h1>
      <div className='py-2 verb-card-content'>
        {pronouns.map((pronoun) => (
          <div
            className='is-flex is-justify-content-space-evenly'
            key={pronoun}
          >
            {!tense?.participle && (
              <div className='m-1 has-text-weight-bold'>{pronoun}</div>
            )}
            <div className='m-1'>{tense[pronoun].word}</div>
            {tense?.participle && (
              <div className='m-1 has-text-weight-bold'>
                {tense.participle.word}
              </div>
            )}
          </div>
        ))}
        <div className='verb-card-sentence my-1'>
          {tense.sentences.length > 0 && (
            <div>
              <div className='has-text-weight-bold'>
                {tense.sentences[0].sentence}
              </div>
              <div>{tense.sentences[0].translation}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerbTenseCard;
