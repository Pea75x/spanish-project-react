import React from 'react';
import FormInput from './FormInput';
import { getAllItems } from '../api/items';
import themes from '../data/themes.json';
import SearchableInput from './SearchableInput';

function Create() {
  const [newWord, setNewWord] = React.useState({
    word: '',
    translation: '',
    typeVerb: false,
    themes: []
  });

  const [newSentence, setNewSentence] = React.useState({
    sentence: '',
    translation: '',
    themes: [],
    word_ids: []
  });

  const [words, setWords] = React.useState({});

  React.useEffect(() => {
    const getData = async () => {
      try {
        const allWords = await getAllItems('words');
        setWords(allWords.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    getData();
  }, []);

  function handleChange(event, item, setItem) {
    setItem({ ...item, [event.target.name]: event.target.value });
    console.log('word:', newWord);
  }

  function toggleCheckbox(value, item, setItem) {
    setItem({ ...item, typeVerb: value });
    console.log('word:', newWord);
  }

  return (
    <div className='text-center'>
      <h1 className='m-4 text-5xl font-bold w-full my-5 text-center'>Create</h1>
      <div className='flex flex-col lg:flex-row justify-around w-11/12 mx-auto'>
        <div className='w-full border flex flex-col items-center py-5'>
          <h2 className='text-4xl'>Words</h2>
          <div className='w-3/4'>
            <form onSubmit={() => console.log('hello')}>
              <FormInput
                label='Word'
                type='text'
                inline
                required
                onChange={(event) => handleChange(event, newWord, setNewWord)}
                name='word'
                value={newWord.word}
              />
              <FormInput
                label='Translation'
                type='text'
                required
                inline
                onChange={(event) => handleChange(event, newWord, setNewWord)}
                name='translation'
                value={newWord.translation}
              />
              <label className='inline-flex items-center cursor-pointer mb-4'>
                <input
                  type='checkbox'
                  value={newWord.typeVerb}
                  onChange={(event) =>
                    toggleCheckbox(!newWord.typeVerb, newWord, setNewWord)
                  }
                  name='typeVerb'
                  className='sr-only peer'
                />
                <span className='mx-4 font-medium text-gray-900 dark:text-gray-300'>
                  Verb
                </span>
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-600"></div>
              </label>

              <SearchableInput
                searchList={themes}
                value='value'
                name='theme'
                setNewItem={setNewWord}
                newItem={newWord}
              />

              <button
                type='submit'
                className='w-1/3 h-10 text-center hover:bg-amber-100 text-gray-800 font-semibold border border-gray-400 rounded shadow mt-4'
              >
                Create
              </button>
            </form>
          </div>
        </div>
        <div className='border border-black w-full'>sentence</div>
      </div>
    </div>
  );
}

export default Create;
