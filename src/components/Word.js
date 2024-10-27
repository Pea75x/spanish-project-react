import React from 'react';
import { useLocation } from 'react-router-dom';
import { getItemByName, getItemById } from '../api/items';
import { titleCase } from '../utils/stringUtils';
import VerbTenseCard from './VerbTenseCard';
import WordCard from './WordCard';

function Word() {
  const { state } = useLocation();
  const { id } = state;
  const [wordId, setWordId] = React.useState(id);
  const [word, setWord] = React.useState({});
  const [verbTenses, setVerbTenses] = React.useState({});

  React.useEffect(() => {
    const getData = async () => {
      try {
        const wordData = await getItemById('words', wordId);
        setWord(wordData);

        if (wordData.type_verb) {
          const verbTenseData = await getItemByName(
            'verb_tenses',
            'verb',
            wordId
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
        <div className='mt-4'>
          <h1 className='text-5xl font-bold'>{titleCase(word.word)}</h1>
          <h2 className='text-4xl text-amber-800'>{word.translation}</h2>
          <div className=''>
            {verbTenses.length && (
              <div className='flex flex-wrap justify-evenly'>
                {verbTenses.map((tense) => (
                  <VerbTenseCard tense={tense} key={tense.id} />
                ))}
              </div>
            )}
            {!word.type_verb && (
              <WordCard word={word} handleClick={setWordId} />
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
