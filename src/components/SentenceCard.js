import React, { useEffect, useRef } from 'react';
import Frog from '../frog.png'

function SentenceCard({ sentence, markAnswer, words, sentenceIndex }) {
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
    setVisibleInputIndex(null); // Hide the list after a word is clicked
  }

  function handleClickOutside(event) {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setVisibleInputIndex(null); // Hide the list if clicking outside
    }
  }

  function submitAnswer() {
    setVisibleInputIndex(-1);
    markAnswer(playersAnswer, sentenceIndex)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setPlayersAnswer(new Array(sentence.words.length).fill(''));
    setVisibleInputIndex(-1);
  }, [sentenceIndex]);

  return (
    <div className='py-6 flex flex-col items-center justify-end' style={{'height': 'calc(100vh - 270px)'}}>
      <div className="flex justify-center items-start">
        <img src={Frog} width="200px"/>
        <h2 className='speech-bubble text-xl font-bold text-center inline-block p-4 rounded-xl bg-white relative'>
          {sentence.translation}
        </h2>
      </div>  
      <div className='flex justify-center my-6 w-full' ref={containerRef}>
        {sentence.words.map((word, wordIndex) => (
          <div key={wordIndex} className='m-1 relative'>
            <input
              value={playersAnswer[wordIndex] || ''}
              className={`rounded-md border-0 p-2 text-gray-900 ring-1 ring-black h-7 w-full ${
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
              <ul className='absolute bg-white max-h-28 w-full overflow-y-auto z-10 border rounded-b text-left'>
                {filteredWords.length ? (
                  filteredWords.map((word) => (
                    <li
                      className='p-1 hover:bg-orange-50'
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
      <button 
        className='w-40 h-12 bg-white text-2xl text-center hover:bg-amber-600 hover:text-white hover:border-amber-600 font-bold border border-black rounded shadow'
        onClick={submitAnswer}>
        Next
      </button>
    </div>
  );
}

export default SentenceCard;
