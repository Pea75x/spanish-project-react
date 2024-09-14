import React, { useEffect, useRef } from 'react';

function SentenceCard({ sentence, getAnswers, words, sentenceIndex }) {
  const [filteredWords, setFilteredWords] = React.useState(words);
  const [playersAnswer, setPlayersAnswer] = React.useState(
    new Array(sentence.words.length).fill('')
  );
  const [visibleInputIndex, setVisibleInputIndex] = React.useState(-1);
  const containerRef = useRef(null);
  const inputRefs = useRef([]);

  function handleChange(event, wordIndex) {
    const newValue = event.target.value;
    const updatedAnswer = playersAnswer.map((answer, index) =>
      index === wordIndex ? newValue : answer
    );
    setPlayersAnswer(updatedAnswer);
    getAnswers(updatedAnswer, sentenceIndex);
    setFilteredWords(words.filter((word) => word.word.includes(newValue)));
  }

  function onInputClick(wordIndex) {
    setFilteredWords(words);
    setVisibleInputIndex(wordIndex);
  }

  function onWordClick(playersValue, wordIndex) {
    const updatedAnswer = playersAnswer.map((word, index) =>
      index === wordIndex ? playersValue : word
    );
    setPlayersAnswer(updatedAnswer);
    getAnswers(updatedAnswer, sentenceIndex);
    setVisibleInputIndex(null); // Hide the list after a word is clicked
  }

  function handleClickOutside(event) {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setVisibleInputIndex(null); // Hide the list if clicking outside
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='m-5' ref={containerRef}>
      <h2 className='title --bulma-danger-dark'>{sentence.translation}</h2>
      <div className='sentences-container'>
        {sentence.words.map((word, wordIndex) => (
          <div className='sentence-container' key={wordIndex}>
            <input
              value={playersAnswer[wordIndex]}
              className={`answer-input input ${
                word.correct === false && 'is-danger'
              }`}
              onClick={() => onInputClick(wordIndex)}
              type='text'
              id='myInput'
              onChange={(event) => handleChange(event, wordIndex)}
              ref={(el) => (inputRefs.current[wordIndex] = el)}
            />
            {visibleInputIndex === wordIndex && filteredWords && (
              <ul className='filtered-list'>
                {filteredWords.length ? (
                  filteredWords.map((word) => (
                    <li
                      className='selected-word'
                      key={word.word}
                      onClick={() => onWordClick(word.word, wordIndex)}
                    >
                      {word.word}
                    </li>
                  ))
                ) : (
                  <div>No results found</div>
                )}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SentenceCard;
