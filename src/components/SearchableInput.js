import React from 'react';

function SearchableInput({ searchList, newItem, name, value, setNewItem }) {
  const [list, setList] = React.useState(searchList);
  const [inputItem, setInputItem] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  function handleChange(event) {
    setInputItem(event.target.value);

    let filteredList = searchList.filter((searchItem) =>
      searchItem[value].toLowerCase().includes(event.target.value.toLowerCase())
    );
    setList(filteredList);
  }

  function selectItem(item) {
    setNewItem((newItem) => {
      if (!newItem.themes.includes(item)) {
        return {
          ...newItem,
          themes: [...newItem.themes, item]
        };
      } else {
        return newItem;
      }
    });
    setInputItem('');
    setVisible(false);
  }

  return (
    <div>
      <div className='grid grid-cols-3'>
        <label className='text-right mx-4 my-auto col-span-1'>{name}</label>
        <div className='relative col-span-2'>
          <input
            value={inputItem}
            className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-gray-300'
            onClick={() => setVisible(!visible)}
            type='text'
            onChange={(event) => handleChange(event)}
          />
          {list && visible && (
            <ul className='absolute w-full bg-white border rounded-b-md h-28 overflow-y-auto'>
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
          newItem.themes.map((item) => (
            <div
              className='rounded-full bg-amber-50 border border-amber-600 text-amber-600 px-4 m-1'
              key={item}
            >
              {item}
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchableInput;
