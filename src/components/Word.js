import React from 'react';
import { useLocation } from 'react-router-dom';
import { getItemByName, getItemById } from '../api/items';
import { titleCase } from '../utils/stringUtils';
import VerbTenseCard from './VerbTenseCard';
import WordCard from './WordCard';

function Word() {
  const { state } = useLocation();
  const { id } = state;
  const [word, setWord] = React.useState({});
  const [verbTenses, setVerbTenses] = React.useState({});

  React.useEffect(() => {
    const getData = async () => {
      try {
        const wordData = await getItemById('words', id);
        setWord(wordData);

        if (wordData?.type_verb) {
          const verbTenseData = await getItemByName('verb_tenses', 'verb', id);
          setVerbTenses(verbTenseData.data);
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    getData();
  }, []);

  return (
    <div className='main-container'>
      {word?.word ? (
        <div className='has-text-centered'>
          <h1 className='title m-5 is-1'>{titleCase(word.word)}</h1>
          <h2 className='title is-1 has-text-grey-light'>{word.translation}</h2>
          {verbTenses.length && (
            <div className='is-flex verb-tense-container'>
              {verbTenses.map((tense) => (
                <VerbTenseCard tense={tense} key={tense.id} />
              ))}
            </div>
          )}
          {!word.type_verb && <WordCard word={word} />}
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}

export default Word;
