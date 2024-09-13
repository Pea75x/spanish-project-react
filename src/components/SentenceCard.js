import React, { useEffect, useRef } from 'react';

function SentenceCard({ sentence, getAnswers, words, sentenceIndex }) {
  const [filteredWords, setFilteredWords] = React.useState(words);
  const [playersAnswer, setPlayersAnswer] = React.useState(
    new Array(sentence.words.length).fill('')
  );
  const [visibleInputIndex, setVisibleInputIndex] = React.useState(null);
  const containerRef = useRef(null);
  const inputRefs = useRef([]);

  function handleChange(event, wordIndex) {
    const newValue = event.target.value;
    const updatedAnswer = playersAnswer.map((answer, index) =>
      index === wordIndex ? newValue : answer
    );
    console.log('handle change:', updatedAnswer);
    setPlayersAnswer(updatedAnswer);
    setFilteredWords(words.filter((word) => word.word.includes(newValue)));
  }

  function onInputClick(wordIndex) {
    console.log('input click', playersAnswer);
    setFilteredWords(words);
    setVisibleInputIndex(wordIndex);
  }

  function onWordClick(playersValue, wordIndex) {
    const updatedAnswer = playersAnswer.map((word, index) =>
      index === wordIndex ? playersValue : word
    );
    console.log('onWordClick', updatedAnswer);
    setPlayersAnswer(updatedAnswer);
    getAnswers(updatedAnswer, sentenceIndex);
    setVisibleInputIndex(null); // Hide the list after a word is clicked
  }

  function handleClickOutside(event) {
    console.log('HandleClickOutside1: ', playersAnswer);
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      console.log('HandleClickOutside2: ', playersAnswer);
      setVisibleInputIndex(null); // Hide the list if clicking outside
    }
  }

  function handleKeyDown(event, wordIndex) {
    if (event.key === 'Tab') {
      console.log('handlekeydown', playersAnswer);
      event.preventDefault();
      const nextIndex = (wordIndex + 1) % sentence.words.length;
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }
      setVisibleInputIndex(wordIndex + 1);
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
              onKeyDown={(event) => handleKeyDown(event, wordIndex)}
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
