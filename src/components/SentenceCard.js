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
    <div className='m-5 w-9/10' ref={containerRef}>
      <h2 className='text-xl font-bold m-2'>{sentence.translation}</h2>
      <div className='flex justify-start'>
        {sentence.words.map((word, wordIndex) => (
          <div key={wordIndex} className='m-1'>
            <input
              value={playersAnswer[wordIndex]}
              className={`rounded-md border-0 p-2 text-gray-900 ring-1 ring-amber-500 h-7 w-full ${
                word.correct === false &&
                'border-2 border-red-500 bg-red-50 text-red-600'
              }`}
              onClick={() => onInputClick(wordIndex)}
              type='text'
              id='myInput'
              onChange={(event) => handleChange(event, wordIndex)}
              ref={(el) => (inputRefs.current[wordIndex] = el)}
            />
            {visibleInputIndex === wordIndex && filteredWords && (
              <ul className='absolute bg-white h-28 w-full overflow-y-auto'>
                {filteredWords.length ? (
                  filteredWords.map((word) => (
                    <li
                      className=''
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
