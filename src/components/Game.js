import React from 'react';
import { getAllItems, createNewItem } from '../api/items';
import SentenceCard from './SentenceCard';
import GameOver from './GameOver';
import { userId } from '../api/auth';
import { useLocation } from 'react-router-dom';

function Game() {
  const { state } = useLocation();
  const { gameName } = state;
  const [sentences, setSentences] = React.useState([]);
  const [playersSentences, setPlayersSentences] = React.useState([]);
  const [words, setWords] = React.useState(null);
  const [score, setScore] = React.useState(100);
  const [gameOver, setGameOver] = React.useState(false);
  const [game, setGame] = React.useState(gameName);
  const [gameScore, setGameScore] = React.useState({});

  React.useEffect(() => {
    const getData = async () => {
      try {
        const allSentences = await getAllItems('sentences');
        const allWords = await getAllItems('words');
        console.log('game', game);
        let themeSentences = [];

        game.themes.forEach((theme) =>
          allSentences.data.forEach(
            (sentence) =>
              sentence.themes.includes(theme) &&
              !themeSentences.includes(sentence) &&
              themeSentences.push(sentence)
          )
        );
        console.log('theme sentences', themeSentences);
        setSentences(themeSentences);
        setWords(allWords.data);
        setPlayersSentences(new Array(allSentences.data.length).fill([]));
      } catch (err) {
        console.log('error', err);
      }
    };
    getData();
  }, []);

  function getAnswers(answer, sentenceIndex) {
    const updatedAnswer = playersSentences.map((sentence, i) =>
      i === sentenceIndex ? answer : sentence
    );

    setPlayersSentences(updatedAnswer);
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
    if (!!gameEnd) {
      endGame(currentScore);
    }
  }

  function endGame(score) {
    setGameOver(true);

    const getScoreData = {
      game_points: score,
      user_id: userId(),
      game_id: game.id
    };

    const createGameScore = async () => {
      try {
        const getGameScore = await createNewItem('game_scores', getScoreData);
        setGameScore(getGameScore);
      } catch (error) {
        console.log(error);
      }
    };
    createGameScore();
  }

  return (
    <div>
      <h1 className='title is-1 has-text-centered p-4'>{game.name}</h1>
      {gameOver && <GameOver gameScore={gameScore} game={game} />}
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
