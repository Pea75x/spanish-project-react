import React from 'react';
import { getAllItems } from '../api/items';
import SentenceCard from './SentenceCard';
import Popup from './Popup';

function Game() {
  const [sentences, setSentences] = React.useState([]);
  const [playersSentences, setPlayersSentences] = React.useState([]);
  const [words, setWords] = React.useState(null);
  const [score, setScore] = React.useState(100);
  const [gameOver, setGameOver] = React.useState(false);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const allSentences = await getAllItems('sentences');
        const allWords = await getAllItems('words');

        setSentences(allSentences.data);
        setWords(allWords.data);
        setPlayersSentences(new Array(allSentences.data.length).fill([]));
      } catch (err) {
        console.log('error', err);
      }
    };
    getData();
  }, []);

  function getAnswers(answer, sentenceIndex) {
    const updatedGuesses = playersSentences.map((sentence, i) =>
      i === sentenceIndex ? answer : sentence
    );
    setPlayersSentences(updatedGuesses);
  }

  function markAnswers() {
    let currentScore = score;
    let gameEnd = true;
    const updatedSentences = sentences.map((sentence, sentenceIndex) => {
      const updatedWords = sentence.words.map((word, wordIndex) => {
        const playerAnswer = playersSentences[sentenceIndex][wordIndex];
        const isCorrect = playerAnswer === word.word;
        if (!isCorrect) {
          currentScore -= 1;
          gameEnd = false;
        }
        return {
          ...word,
          correct: isCorrect
        };
      });

      return {
        ...sentence,
        words: updatedWords
      };
    });
    setScore(currentScore);
    setSentences(updatedSentences);
    setGameOver(gameEnd);
  }

  return (
    <div>
      <h1 className='title is-1 has-text-centered'>
        Pretérito Indefinido vs Pretérito Imperfecto
      </h1>
      {gameOver && <Popup score={score} />}
      {sentences ? (
        <div>
          {sentences.map((sentence, index) => (
            <div key={sentence.id}>
              <SentenceCard
                sentence={sentence}
                words={words}
                getAnswers={getAnswers}
                sentenceIndex={index}
              />
            </div>
          ))}
          <button className='button m-5' onClick={markAnswers}>
            Submit answers
          </button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Game;
