import React from 'react';
import FormInput from './FormInput';
import { getAllItems, createNewItem } from '../api/items';
import themes from '../data/themes.json';
import SearchableInput from './SearchableInput';
import { selectCurrentUser, selectToken } from '../store/users/user.selector';
import { useSelector } from 'react-redux';
import BaseButton from './BaseButton';

function Create() {
  const currentUser = useSelector(selectCurrentUser);
  const token = useSelector(selectToken);

  const emptyWord = {
    word: '',
    translation: '',
    type_verb: false,
    themes: [],
    verb_id: null
  };

  const emptySentence = {
    sentence: '',
    translation: '',
    themes: [],
    word_ids: []
  };

  const [newWord, setNewWord] = React.useState(emptyWord);
  const [newSentence, setNewSentence] = React.useState(emptySentence);
  const [words, setWords] = React.useState([]);
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    currentUser && getData();
  }, []);

  const getData = async () => {
    try {
      const allWords = await getAllItems('words', token);
      setWords(allWords.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  function handleChange(event, item, setItem) {
    setItem({ ...item, [event.target.name]: event.target.value });
  }

  function toggleCheckbox(value, item, setItem) {
    setItem({ ...item, type_verb: value });
  }

  function createItem(event, itemName, itemData) {
    event.preventDefault();

    const createData = async () => {
      try {
        await createNewItem(itemName, itemData, token);
        await getData();
        setMessage(`Successfully created ${itemName}`);
        setNewWord(emptyWord);
        setNewSentence(emptySentence);
      } catch (error) {
        error.response.status === 500
          ? setMessage(error.message)
          : setMessage(error.response.data);
      }
    };
    createData();
  }

  React.useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className='text-center'>
      <h1 className='m-4 text-5xl font-bold my-5 text-center'>Create</h1>
      {message && (
        <div className='absolute w-full'>
          <div className='p-2 rounded-full mx-auto bg-amber-600 text-amber-50 font-bold inline-block'>
            {message}
          </div>
        </div>
      )}
      {currentUser && currentUser.admin ? (
        <div className='flex lg:flex-row flex-col lg:items-start justify-around items-center lg:w-11/12 w-full mx-auto'>
          <div className='m-8 w-96 rounded-lg flex border flex-col items-center shadow-lg'>
            <h2 className='text-4xl bg-amber-50 border-b rounded-t-lg w-full py-2'>
              Words
            </h2>
            <div className='py-5 w-full'>
              <form onSubmit={(e) => createItem(e, 'word', newWord)}>
                <div className='w-3/4 mx-auto'>
                  <FormInput
                    label='Word'
                    type='text'
                    inline
                    onChange={(event) =>
                      handleChange(event, newWord, setNewWord)
                    }
                    name='word'
                    value={newWord.word}
                  />
                </div>

                <div className='w-3/4 mx-auto'>
                  <FormInput
                    label='Translation'
                    type='text'
                    inline
                    onChange={(event) =>
                      handleChange(event, newWord, setNewWord)
                    }
                    name='translation'
                    value={newWord.translation}
                  />
                </div>

                <label className='inline-flex items-center cursor-pointer mb-4'>
                  <input
                    type='checkbox'
                    value={newWord.type_verb}
                    onChange={(event) =>
                      toggleCheckbox(!newWord.type_verb, newWord, setNewWord)
                    }
                    name='type_verb'
                    className='sr-only peer'
                  />
                  <span className='mx-4 font-medium text-gray-900 dark:text-gray-300'>
                    Verb
                  </span>
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-600"></div>
                </label>

                {!newWord.type_verb && (
                  <SearchableInput
                    searchList={words.filter((word) => word.type_verb)}
                    value='word'
                    name='verb_id'
                    code='id'
                    setNewItem={setNewWord}
                    newItem={newWord}
                    inputClass='w-3/4 mx-auto'
                    singleSearch
                  />
                )}

                <SearchableInput
                  searchList={themes}
                  value='value'
                  name='themes'
                  code='code'
                  setNewItem={setNewWord}
                  newItem={newWord}
                  unique
                  inputClass='w-3/4 mx-auto'
                />

                <button
                  type='submit'
                  className='w-1/4 h-10 text-center hover:bg-amber-100 text-gray-800 font-semibold border border-gray-400 rounded shadow mt-2'
                >
                  Create
                </button>
              </form>
            </div>
          </div>
          <div className='m-8 w-96 rounded-lg border flex flex-col items-center shadow-lg'>
            <h2 className='text-4xl bg-amber-50 border-b rounded-t-lg w-full py-2'>
              Sentences
            </h2>
            <div className='py-5 w-full'>
              <form onSubmit={(e) => createItem(e, 'sentence', newSentence)}>
                <div className='w-3/4 mx-auto'>
                  <FormInput
                    label='Sentence'
                    type='text'
                    inline
                    required
                    onChange={(event) =>
                      handleChange(event, newSentence, setNewSentence)
                    }
                    name='sentence'
                    value={newSentence.sentence}
                    multiline
                  />
                </div>
                <div className='w-3/4 mx-auto'>
                  <FormInput
                    label='Translation'
                    type='text'
                    inline
                    required
                    onChange={(event) =>
                      handleChange(event, newSentence, setNewSentence)
                    }
                    name='translation'
                    value={newSentence.translation}
                    multiline
                  />
                </div>

                <SearchableInput
                  searchList={words}
                  value='word'
                  name='word_ids'
                  code='id'
                  setNewItem={setNewSentence}
                  newItem={newSentence}
                  inputClass='w-3/4 mx-auto'
                />

                <SearchableInput
                  searchList={themes}
                  value='value'
                  name='themes'
                  code='code'
                  setNewItem={setNewSentence}
                  newItem={newSentence}
                  unique
                  inputClass='w-3/4 mx-auto'
                />
                <button
                  type='submit'
                  className='w-1/4 h-10 text-center hover:bg-amber-100 text-gray-800 font-semibold border border-gray-400 rounded shadow mt-4'
                >
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex items-center flex-col'>
          <div>Please Log in as an admin to use the create function</div>
          <BaseButton text='login' link='login' />
        </div>
      )}
    </div>
  );
}

export default Create;
