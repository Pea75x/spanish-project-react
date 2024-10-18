import React from 'react';

function SearchableInput({ searchList, newItem, name, value, setNewItem }) {
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
      if (!newItem[name].includes(item)) {
        return {
          ...newItem,
          [name]: [...newItem[name], item]
        };
      } else {
        return newItem;
      }
    });
    setInputItem('');
  }

  function removeItem(item) {
    const newArray = newItem[name].filter((arrayItem) => arrayItem !== item);

    setNewItem((newItem) => ({
      ...newItem,
      [name]: newArray
    }));
  }

  return (
    <div>
      <div className='grid grid-cols-3'>
        <label className='text-right mx-4 my-auto col-span-1'>{name}</label>
        <div className='relative col-span-2'>
          <input
            value={inputItem}
            className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-gray-300'
            type='text'
            onChange={(event) => handleChange(event)}
          />
          {list && inputItem && (
            <ul className='absolute w-full bg-white border rounded-b-md max-h-28 overflow-y-auto'>
              {list.length ? (
                list.map((searchItem) => (
                  <li
                    key={searchItem[value]}
                    onClick={() => selectItem(searchItem.code)}
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
      <div className='w-full flex flex-wrap justify-end my-2'>
        {newItem &&
          newItem[name].map((item) => (
            <div
              key={item}
              className='rounded-full bg-amber-50 border border-amber-600 text-amber-600 px-4 m-1'
            >
              {item}{' '}
              <span className='p-1' onClick={() => removeItem(item)}>
                x
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchableInput;
