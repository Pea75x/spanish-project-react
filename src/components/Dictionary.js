import React from 'react';
import { getAllItems } from '../api/items';
import themes from '../data/themes.json';

function Dictionary() {
  const [words, setWords] = React.useState({});
  const [filteredWords, setFilteredWords] = React.useState({});

  React.useEffect(() => {
    const getData = async () => {
      try {
        const allWords = await getAllItems('words');
        setWords(allWords.data);
        setFilteredWords(allWords.data);

        console.log(allWords.data[7].themes);
      } catch (error) {
        console.log('error', error);
      }
    };
    getData();
  }, []);

  function chooseTheme(theme) {
    const filteredValues = words.filter((word) => word.themes.includes(theme));
    setFilteredWords(filteredValues);
  }

  function handleSearch(event) {
    const filteredValues = words.filter((word) =>
      word.word.includes(event.target.value)
    );
    setFilteredWords(filteredValues);
  }

  return (
    <div className='main-container'>
      <h1 className='title is-1'>Dictionary</h1>
      <div className='sub-container'>
        <div className='categories-box'>
          {themes.map((theme) => (
            <button
              key={theme.code}
              className='button m-2'
              onClick={() => chooseTheme(theme.code)}
            >
              {theme.value}
            </button>
          ))}
        </div>
        <div className='search-box'>
          <div className='mx-6 my-5 search-input'>
            <input
              type='text'
              onChange={handleSearch}
              name='name'
              placeholder='search'
              className='input'
            />
          </div>
          <div className='words-list mx-6 my-2'>
            {filteredWords.length && (
              <div className=''>
                {filteredWords.map((word) => (
                  <div className='m-2 link' key={word.id}>
                    {word.word}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dictionary;
