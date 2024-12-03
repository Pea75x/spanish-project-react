import React from 'react';
import { useLocation } from 'react-router-dom';
import { getItemByName, getItemById } from '../api/items';
import { titleCase } from '../utils/stringUtils';
import VerbTenseCard from './VerbTenseCard';
import WordCard from './WordCard';
import { useNavigate } from 'react-router-dom';
import { selectToken } from '../store/users/user.selector';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/users/user.selector';
import WordSentencesCard from './WordSentencesCard';

function Word() {
  const { state } = useLocation();
  const { id } = state;
  const [wordId, setWordId] = React.useState(id);
  const [word, setWord] = React.useState({});
  const [verbTenses, setVerbTenses] = React.useState({});
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const currentUser = useSelector(selectCurrentUser);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const wordData = await getItemById('words', wordId, token);
        setWord(wordData);

        if (wordData.type_verb) {
          const verbTenseData = await getItemByName(
            'verb_tenses',
            'verb',
            wordId,
            token
          );
          setVerbTenses(verbTenseData.data);
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    getData();
  }, [wordId]);

  return (
    <div className='text-center'>
      {word?.word ? (
        <div className='mt-4 relative'>
          <h1 className='text-5xl font-bold'>{titleCase(word.word)}</h1>
          <h2 className='text-4xl text-amber-800'>{word.translation}</h2>
          <div
            className='absolute right-10 top-0 flex flex-col text-amber-600 hover:text-amber-500'
            onClick={() => navigate(`/search`)}
          >
            <i
              className='fa-solid fa-circle-left text-4xl'
            />
            <span className='font-bold'>Back</span>
          </div>
          <div>
            {verbTenses.length ? (
              <div className='flex flex-wrap justify-evenly'>
                {verbTenses.map((tense) => (
                  <VerbTenseCard tense={tense} key={tense.id} />
                ))}
              </div>
            ) : (
              <div>
                {word.type_verb && currentUser.admin && (
                  <div>
                    <p className="mt-5">No tenses set for this word. Please add more</p>
                    <button
                      className='text-xl rounded-lg py-1 px-5 m-5 bg-orange-100 hover:bg-orange-200'
                      onClick={() => navigate(`/create`)}
                    >
                      + Create
                    </button>
                  </div>
                )}
              </div>
            )}
            {!word.type_verb ? (
              <WordCard word={word} handleClick={setWordId} />
            ) : (
              <WordSentencesCard sentences={word.sentences} centered/>
            )}
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}

export default Word;
