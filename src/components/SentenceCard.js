import React from 'react';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from '@reach/combobox';
import '@reach/combobox/styles.css';

function SentenceCard({ sentence, getAnswers, words, sentenceIndex }) {
  const [filteredWords, setFilteredWords] = React.useState(words);
  const [playersAnswer, setPlayersAnswer] = React.useState(
    new Array(sentence.words.length).fill('')
  );

  function handleChange(event) {
    setFilteredWords(
      words.filter((word) => word.word.includes(event.target.value))
    );
  }

  function onClick(playersValue, index) {
    const updatedGuesses = playersAnswer.map((word, i) =>
      i === index ? playersValue : word
    );
    setPlayersAnswer(updatedGuesses);
    getAnswers(updatedGuesses, sentenceIndex);
  }

  return (
    <div className='m-5'>
      <h2 className='title --bulma-danger-dark'>{sentence.translation}</h2>
      <div className='sentences-container'>
        {sentence.words.map((word, wordIndex) => (
          <div className='sentence-container' key={wordIndex}>
            <Combobox aria-label='Words'>
              <ComboboxInput
                onChange={handleChange}
                className={`word-input input ${
                  word.correct === false && 'is-danger'
                }`}
              />
              {filteredWords && (
                <ComboboxPopover className='shadow-popup'>
                  {filteredWords.length > 0 ? (
                    <ComboboxList>
                      {filteredWords.slice(0, 10).map((result, index) => (
                        <ComboboxOption
                          key={index}
                          value={result.word}
                          onClick={(e) => onClick(result.word, wordIndex)}
                        />
                      ))}
                    </ComboboxList>
                  ) : (
                    <span style={{ display: 'block', margin: 8 }}>
                      No results found
                    </span>
                  )}
                </ComboboxPopover>
              )}
            </Combobox>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SentenceCard;
