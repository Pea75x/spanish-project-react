import React from 'react';
import { removeSnakeCase } from '../utils/stringUtils';

function SearchableInput({
  searchList,
  newItem,
  name,
  code,
  value,
  setNewItem,
  unique = false,
  inputClass = '',
  singleSearch = false
}) {
  const [list, setList] = React.useState(searchList);
  const [inputItem, setInputItem] = React.useState('');

  function handleChange(event) {
    setInputItem(event.target.value);

    let filteredList = searchList.filter((searchItem) =>
      searchItem[value].toLowerCase().includes(event.target.value.toLowerCase())
    );
    setList(filteredList);
  }

  function selectItem(item) {
    setNewItem((newItem) => {
      if (singleSearch) {
        return {
          ...newItem,
          [name]: item
        };
      } else if (newItem[name].includes(item) && unique) {
        return newItem;
      } else {
        return {
          ...newItem,
          [name]: [...newItem[name], item]
        };
      }
    });
    setInputItem('');
  }

  function removeItem(index) {
    const newValue = singleSearch
      ? null
      : newItem[name].filter((arrayItem, arrayIndex) => arrayIndex !== index);

    setNewItem((newItem) => ({
      ...newItem,
      [name]: newValue
    }));
  }

  function findNameOf(item) {
    return searchList.find((listItem) => listItem[code] === item)[value];
  }

  return (
    <div className=''>
      <div className={`grid grid-cols-3 ${inputClass}`}>
        <label className='text-right mx-4 my-auto col-span-1'>
          {removeSnakeCase(name)}
        </label>
        <div className='relative col-span-2'>
          <input
            value={inputItem}
            disabled={singleSearch && newItem[name]}
            className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-gray-300'
            type='text'
            onChange={(event) => handleChange(event)}
          />

          {list && inputItem && (
            <ul className='text-left px-2 absolute w-full drop-shadow bg-white border rounded-b-md max-h-28 overflow-y-auto z-10 text-nowrap'>
              {list.length ? (
                list.map((searchItem) => (
                  <li
                    key={searchItem[value]}
                    onClick={() => selectItem(searchItem[code])}
                  >
                    {searchItem[value]}
                  </li>
                ))
              ) : (
                <div>No results found</div>
              )}
            </ul>
          )}
        </div>
      </div>
      <div className='w-full px-2 flex flex-wrap justify-center my-2'>
        {singleSearch && newItem[name] && (
          <div className='rounded-full bg-amber-50 border border-amber-600 text-amber-600 px-4 m-1'>
            {findNameOf(newItem[name])}
            <span className='p-1' onClick={() => removeItem()}>
              x
            </span>
          </div>
        )}
        {!singleSearch &&
          newItem &&
          newItem[name].map((item, index) => (
            <div
              key={`${item}-${index}`}
              className='rounded-full bg-amber-50 border border-amber-600 text-amber-600 px-4 m-1'
            >
              {findNameOf(item)}
              <span className='p-1' onClick={() => removeItem(index)}>
                x
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchableInput;
