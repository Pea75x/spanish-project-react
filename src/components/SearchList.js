import React from 'react';
import { getAllItems } from '../api/items';
import themes from '../data/themes.json';
import { titleCase } from '../utils/stringUtils';

function SearchList({ item, name }) {
  const [list, setList] = React.useState({});
  const [filteredList, setFilteredList] = React.useState({});
  const [searchFilter, setSearchFilter] = React.useState('');

  React.useEffect(() => {
    const getData = async () => {
      try {
        const allItems = await getAllItems(item);
        setList(allItems.data);
        setFilteredList(allItems.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    getData();
  }, []);

  function chooseTheme(theme) {
    const filteredValues = list.filter(
      (value) =>
        value.themes.includes(theme) && value[name].includes(searchFilter)
    );
    setFilteredList(filteredValues);
  }

  function handleSearch(event) {
    setSearchFilter(event.target.value);
    const filteredValues = list.filter((value) =>
      value[name].toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredList(filteredValues);
  }

  function reset() {
    setFilteredList(list.filter((value) => value[name].includes(searchFilter)));
  }

  return (
    <div className='main-container'>
      <h1 className='title is-1'>{titleCase(item)}</h1>
      <div className='sub-container'>
        <div className='categories-box'>
          <button
            className='button column is-two-thirds m-2 py-1'
            onClick={reset}
          >
            All
          </button>
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
              name='searchFilter'
              value={searchFilter}
              placeholder='search'
              className='input'
            />
          </div>
          <div className='words-list mx-6 my-2'>
            {filteredList.length && (
              <div>
                {filteredList.map((value) => (
                  <div className='m-2 link' key={value.id}>
                    {value[name]}
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

export default SearchList;
