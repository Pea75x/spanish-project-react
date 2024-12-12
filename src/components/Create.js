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

  const emptyTense = {
    name: '',
    verb_id: '',
    yo_id: '',
    tu_id: '',
    el_id: '',
    nosotros_id: '',
    ellos_id: '',
    participle_id: ''
  }

  const [words, setWords] = React.useState([]);
  const [message, setMessage] = React.useState('');

  const formArray = [
    {
      formModel: "word",
      emptyValue: emptyWord,
      formData: [ 
        {label: "word", type: "text"},
        {label: "translation", type: "text"},
        {label: "type_verb", type: "checkbox"},
        {label: "verb_id", type: "searchable", not_verb: true},
        {label: "themes", type: "searchable", searchlist: themes, value: "value", code: "code", unique: true}
      ]
    },
    {
      formModel: "sentence",
      emptyValue: emptySentence,
      formData: [
        {label: "sentence", type: "text", multiline: true},
        {label: "translation", type: "text", multiline: true},
        {label: "word_ids", type: "searchable", searchlist: words, value:'word', code:'id'},
        {label: "themes", type: "searchable", searchlist: themes, value:'value', code:'code', unique: true}
      ]
    },
    {
      formModel: "verb_tense",
      emptyValue: emptyTense,
      formData: [
        {label: "name", type: "text" },
        {label: "verb_id", type: "searchable", singleSearch: true, value:'word', code:'id', searchlist: words},
        {label: "yo_id", type: "searchable", singleSearch: true, value:'word', code:'id', searchlist: words},
        {label: "tu_id", type: "searchable", singleSearch: true, value:'word', code:'id', searchlist: words},
        {label: "el_id", type: "searchable", singleSearch: true, value:'word', code:'id', searchlist: words},
        {label: "nosotros_id", type: "searchable", singleSearch: true, value:'word', code:'id', searchlist: words},
        {label: "ellos_id", type: "searchable", singleSearch: true, value:'word', code:'id', searchlist: words},
        {label: "participle_id", type: "searchable", singleSearch: true, value:'word', code:'id', searchlist: words}
      ]
    }
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
          {formArray.map((form) => <CreateForm itemName={form.formModel} emptyItem={form.emptyValue} setMessage={setMessage} getData={getData} formData={form.formData} words={words}/>)}
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
