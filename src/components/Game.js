import React from 'react';
import { getAllItems, createNewItem, getItemById } from '../api/items';
import SentenceCard from './SentenceCard';
import GameOver from './GameOver';
import { useLocation } from 'react-router-dom';
import { selectCurrentUser, selectToken } from '../store/users/user.selector';
import { useSelector } from 'react-redux';

function Game() {
  const currentUser = useSelector(selectCurrentUser);
  const token = useSelector(selectToken);
  const { state } = useLocation();
  const { gameId } = state;
  const [sentences, setSentences] = React.useState([]);
  const [playersSentences, setPlayersSentences] = React.useState([]);
  const [words, setWords] = React.useState(null);
  const [score, setScore] = React.useState(100);
  const [gameOver, setGameOver] = React.useState(false);
  const [game, setGame] = React.useState({});
  const [gameScore, setGameScore] = React.useState({});
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    const getData = async () => {
      try {
        const gameData = await getItemById('games', gameId, token);
        const allSentences = await getAllItems('sentences', token, {
          themes: gameData.themes
        });
        const allWords = await getAllItems('words', token);

        setGame(gameData);
        setSentences(allSentences.data);
        setWords(allWords.data);
        setPlayersSentences(new Array(allSentences.data.length).fill([]));
      } catch (error) {
        console.log('error', error);
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
    const getScoreData = {
      game_points: score,
      user_id: currentUser.id,
      game_id: game.id
    };

    const createGameScore = async () => {
      try {
        const getGameScore = await createNewItem('game_score', getScoreData, token);
        setGameScore(getGameScore);
        setGameOver(true);
      } catch (error) {
        setMessage('Error saving game');
        console.log("error", error);
      }
    };
    createGameScore();
  }

  return (
    <div>
      <h1 className='text-5xl font-bold text-center py-4'>{game.name}</h1>
      <p className='text-xl text-center'>
        Please fill in the boxes below with the spanish tanslation for each
        sentence
      </p>
      {message && (
        <div className='absolute w-full flex'>
          <div className='p-2 rounded-full mx-auto bg-amber-600 text-amber-50 font-bold inline-block'>
            {message}
          </div>
        </div>
      )}
      {gameOver && <GameOver gameScore={gameScore} game={game} />}
      {sentences ? (
        <div className='flex flex-col items-center bg-amber-50 w-11/12 mx-auto rounded-lg shadow-lg my-4'>
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
            className='p-2 text-center hover:bg-amber-600 hover:text-white hover:border-amber-600 font-semibold border border-black rounded shadow ml-5 mb-5'
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
