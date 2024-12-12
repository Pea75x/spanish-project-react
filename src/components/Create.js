import React from 'react';
import FormInput from './FormInput';
import { getAllItems, createNewItem } from '../api/items';
import themes from '../data/themes.json';
import SearchableInput from './SearchableInput';
import { selectCurrentUser, selectToken } from '../store/users/user.selector';
import { useSelector } from 'react-redux';
import BaseButton from './BaseButton';
import CreateForm from './CreateForm'

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

  const wordForm = [
    {label: "word", type: "text"},
    {label: "translation", type: "text"},
    {label: "type_verb", type: "checkbox"},
    {label: "verb_id", type: "searchable", not_verb: true},
    {label: "themes", type: "searchable", searchlist: themes, value: "value", code: "code", unique: true}
  ]

  const sentenceForm = [
    {label: "sentence", type: "text", multiline: true},
    {label: "translation", type: "text", multiline: true},
    {label: "word_ids", type: "searchable", searchlist: words, value:'word', code:'id'},
    {label: "themes", type: "searchable", searchlist: themes, value:'value', code:'code', unique: true}
  ]

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
    setItem({ ...item, [value]: !item[value] });
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
          <CreateForm itemName="word" emptyItem={emptyWord} setMessage={setMessage} getData={getData} formData={wordForm} words={words}/>
          <CreateForm itemName="sentence" emptyItem={emptySentence} setMessage={setMessage} getData={getData} formData={sentenceForm} words={words}/>
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
