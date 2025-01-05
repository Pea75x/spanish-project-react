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
  const [game, setGame] = React.useState({});
  const [sentences, setSentences] = React.useState([]);
  const [words, setWords] = React.useState(null);
  const [score, setScore] = React.useState(100);
  const [gameOver, setGameOver] = React.useState(false);
  const [gameScore, setGameScore] = React.useState({});
  const [message, setMessage] = React.useState('');
  const [progress, setProgress] = React.useState(0)

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
      } catch (error) {
        console.log('error', error);
      }
    };
    getData();
  }, []);

  function getAnswer(answer, sentenceIndex) {
    let currentScore = score;
    let wrongAnswers = false;

    const updatedWords = sentences[sentenceIndex].words.map((word, wordIndex) => {
        const playerAnswer = answer[wordIndex];
        const isCorrect = playerAnswer === word.word;
        if (!isCorrect) {
          currentScore -= 1;
          wrongAnswers = true;
        }
        return {
          ...word,
          correct: isCorrect
        };
      });

    const updatedSentences = sentences.map((sentence, index) =>
      index === sentenceIndex ? {...sentence, words: updatedWords} : sentence
    );

    setSentences(updatedSentences)
    setScore(currentScore)

    if (wrongAnswers === false) {
      progress >= sentences.length - 1 ? endGame(currentScore) : setProgress(progress + 1)
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
    <div className='bg-orange-100 py-4' style={{'height': 'calc(100vh - 50px)'}}>
      {sentences && <div className='w-2/3 border border-black bg-white mx-auto my-2 rounded-xl h-[20px]'>
        <div className={`h-full bg-amber-600 rounded-l-xl ${progress === 100 && 'rounded-xl'}`} style={{ width: `${(progress / sentences.length) * 100}%` }}></div>
      </div>}
      <h1 className='md:text-5xl text-3xl font-bold text-center py-[20px] h-[90px]'>{game.name}</h1>
      <p className='text-xl text-center h-[40px]'>
        Please fill in the boxes below with the spanish tanslation
      </p>
      {message && (
        <div className='absolute w-full flex'>
          <div className='p-2 rounded-full mx-auto bg-amber-600 text-amber-50 font-bold inline-block'>
            {message}
          </div>
        </div>
      )}
      {
        sentences[0] ? (
          <div className='flex justify-center items-start' style={{'height': 'calc(100vh - 230px)'}}>
            {gameOver ? (
              <GameOver gameScore={gameScore} game={game}/> ) : (
              <div>
                <SentenceCard sentence={sentences[progress]}
                  words={words}
                  markAnswer={getAnswer}
                  sentenceIndex={progress}/>
                <div className="absolute bottom-0 right-0 p-6 text-5xl text-amber-600">{progress + 1}/{sentences.length}</div>
              </div>
            )}
          </div>
        ) : (
          <div>Loading...</div>
        )
      }
    </div>
  );
}

export default Game;
