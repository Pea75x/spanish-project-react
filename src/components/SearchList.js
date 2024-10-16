import React from 'react';
import { getAllItems } from '../api/items';
import themes from '../data/themes.json';
import { titleCase } from '../utils/stringUtils';
import { useNavigate } from 'react-router-dom';

function SearchList({ item, name }) {
  const [list, setList] = React.useState([]);
  const [filteredList, setFilteredList] = React.useState({});
  const [searchFilter, setSearchFilter] = React.useState('');
  const [selectedTheme, setSelectedTheme] = React.useState('');

  const navigate = useNavigate();

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

  React.useEffect(() => {
    let filteredValues = [];

    filteredValues = list.filter((value) => value[name].includes(searchFilter));

    if (selectedTheme.length) {
      filteredValues = filteredValues.filter((value) =>
        value.themes.includes(selectedTheme)
      );
    }

    setFilteredList(filteredValues);
  }, [selectedTheme, searchFilter]);

  return (
    <div className='flex items-center flex-col h-screen'>
      <h1 className='text-5xl font-bold w-full my-5 text-center'>
        {titleCase(item)}
      </h1>
      <div className='flex w-11/12 h-fit border rounded-lg'>
        <div className='relative h-[77vh] overflow-y-auto md:w-2/5 w-1/3'>
          <div className='grid grid-flow-row-dense lg:grid-cols-4 md:grid-cols-2 grid-cols-1 bg-amber-50 h-fit p-2 rounded-lg'>
            <button
              className='text-sm h-14 text-center hover:bg-orange-50 text-gray-800 border border-gray-400 rounded-lg shadow m-2 title'
              onClick={() => setSelectedTheme('')}
            >
              All
            </button>
            {themes.map((theme) => (
              <button
                key={theme.code}
                className='text-sm h-14 text-center hover:bg-orange-100 text-gray-800 border border-gray-400 rounded-lg shadow m-2 title'
                onClick={() => setSelectedTheme(theme.code)}
              >
                {theme.value}
              </button>
            ))}
          </div>
        </div>

        <div className='md:w-3/5 w-2/3 p-2'>
          <div className='rounded-md border ml-4 m-2 text-gray-900 ring-1 ring-gray-300'>
            <input
              type='text'
              onChange={(event) => setSearchFilter(event.target.value)}
              name='searchFilter'
              value={searchFilter}
              placeholder='search'
              className='w-full p-2'
            />
          </div>
          <div className='h-[66vh] overflow-y-auto pl-4'>
            {filteredList.length ? (
              <div>
                {filteredList.map((value) => (
                  <div
                    className='p-1 w-1/2'
                    key={value.id}
                    onClick={() =>
                      navigate(`/${item}-show`, {
                        state: { id: value.id }
                      })
                    }
                  >
                    {value[name]}
                  </div>
                ))}
              </div>
            ) : (
              <div>No entries found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchList;
