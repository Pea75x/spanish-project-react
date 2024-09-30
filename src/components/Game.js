import React from 'react';
import { getAllItems, createNewItem, getItemById } from '../api/items';
import SentenceCard from './SentenceCard';
import GameOver from './GameOver';
import { userId } from '../api/auth';
import { useLocation } from 'react-router-dom';

function Game() {
  const { state } = useLocation();
  const { gameId } = state;
  const [sentences, setSentences] = React.useState([]);
  const [playersSentences, setPlayersSentences] = React.useState([]);
  const [words, setWords] = React.useState(null);
  const [score, setScore] = React.useState(100);
  const [gameOver, setGameOver] = React.useState(false);
  const [game, setGame] = React.useState({});
  const [gameScore, setGameScore] = React.useState({});

  React.useEffect(() => {
    const getData = async () => {
      try {
        const gameData = await getItemById('games', gameId);
        const allSentences = await getAllItems('sentences');
        const allWords = await getAllItems('words');

        let themeSentences = [];

        gameData.themes.forEach((theme) =>
          allSentences.data.forEach(
            (sentence) =>
              sentence.themes.includes(theme) &&
              !themeSentences.includes(sentence) &&
              themeSentences.push(sentence)
          )
        );

        setGame(gameData);
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
      <h1 className='text-5xl font-bold text-center py-4 bg-amber-50'>
        {game.name}
      </h1>
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
          <button
            className='p-2 text-center hover:bg-amber-50 text-gray-800 font-semibold border border-gray-400 rounded shadow ml-5 mb-5'
            onClick={markAnswers}
          >
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
