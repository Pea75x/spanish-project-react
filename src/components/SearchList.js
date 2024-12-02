import React from 'react';
import { getAllItems } from '../api/items';
import themes from '../data/themes.json';
import { useNavigate } from 'react-router-dom';
import BaseSwitch from './BaseSwitch';
import BaseButton from './BaseButton';
import { selectCurrentUser, selectToken } from '../store/users/user.selector';
import { useSelector } from 'react-redux';

function SearchList() {
  const [words, setWords] = React.useState([]);
  const [sentences, setSentences] = React.useState([]);
  const [filteredList, setFilteredList] = React.useState({});
  const [searchFilter, setSearchFilter] = React.useState('');
  const [selectedTheme, setSelectedTheme] = React.useState('');
  const [selectedTab, setSelectedTab] = React.useState('word');
  const [language, setLanguage] = React.useState('spanish');

  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const token = useSelector(selectToken);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const allWords = await getAllItems('words', token);
        const allSentences = await getAllItems('sentences', token);
        setSentences(allSentences.data);
        setWords(allWords.data);
        setFilteredList(allWords.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    currentUser && getData();
  }, []);

  React.useEffect(() => {
    let filteredValues = [];

    let list = selectedTab === 'word' ? words : sentences;
    let searchColumn = language === 'spanish' ? selectedTab : 'translation';

    filteredValues = list.filter((value) =>
      value[searchColumn].toLowerCase().includes(searchFilter.toLowerCase())
    );

    if (selectedTheme.length) {
      filteredValues = filteredValues.filter((value) =>
        value.themes.includes(selectedTheme)
      );
    }

    setFilteredList(filteredValues);
  }, [selectedTheme, searchFilter, selectedTab, language]);

  return (
    <div className='flex items-center flex-col h-screen'>
      <h1 className='text-5xl font-bold w-full my-5 text-center'>Search</h1>
      {currentUser ? (
        <div className='flex w-11/12 h-fit border rounded-lg shadow-lg'>
          <div className='relative h-[77vh] overflow-y-auto md:w-2/5 w-1/3'>
            <div className='grid grid-flow-row-dense lg:grid-cols-4 md:grid-cols-2 grid-cols-1 bg-amber-50 h-fit p-2 rounded-l-lg'>
              <button
                className={`text-sm h-14 text-center hover:bg-orange-100 text-gray-800 border border-gray-400 rounded-lg shadow m-2 title ${
                  selectedTheme === '' && 'bg-orange-100 border-2'
                }`}
                onClick={() => setSelectedTheme('')}
              >
                All
              </button>
              {themes.map((theme) => (
                <button
                  key={theme.code}
                  className={`text-xs h-14 text-center hover:bg-orange-100 text-gray-800 border border-gray-400 rounded-lg shadow m-2 title ${
                    selectedTheme === theme.code && 'bg-orange-100 border-2'
                  }`}
                  onClick={() => setSelectedTheme(theme.code)}
                >
                  {theme.value}
                </button>
              ))}
            </div>
          </div>

          <div className='md:w-3/5 w-2/3'>
            <div className='flex w-full justify-around text-center'>
              <div
                onClick={() => setSelectedTab('word')}
                className={`w-full py-2 border-r ${
                  selectedTab === 'sentence' && 'border-b bg-gray-50'
                }`}
              >
                Words
              </div>
              <div
                onClick={() => setSelectedTab('sentence')}
                className={`w-full py-2 ${
                  selectedTab === 'word' && 'border-b bg-gray-50'
                }`}
              >
                Sentences
              </div>
            </div>
            <div className='w-full mt-2'>
              <div className='flex'>
                <div className='rounded-md border ml-4 m-2 text-gray-900 ring-1 ring-gray-300 w-7/12 md:w-9/12 flex'>
                  <i
                    className='fa-solid fa-magnifying-glass m-3'
                    style={{ color: '#c4c4c4' }}
                  />
                  <input
                    type='text'
                    onChange={(event) => setSearchFilter(event.target.value)}
                    name='searchFilter'
                    value={searchFilter}
                    placeholder='Search'
                    className='w-full p-2'
                  />
                </div>
                <BaseSwitch
                  optionA='english'
                  optionB='spanish'
                  currentOption={language}
                  handleClick={setLanguage}
                />
              </div>
              <div className='h-[60vh] overflow-y-auto pl-4'>
                {filteredList.length ? (
                  <div>
                    {filteredList.map((value) => (
                      <div
                        className='p-1'
                        key={value.id}
                        onClick={() =>
                          navigate(`/${selectedTab}-show`, {
                            state: { id: value.id }
                          })
                        }
                      >
                        {
                          value[
                            language === 'spanish' ? selectedTab : 'translation'
                          ]
                        }
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
      ) : (
        <div className='flex items-center flex-col'>
          <div>Please Log in to use the search function</div>
          <BaseButton text='login' link='login' />
        </div>
      )}
    </div>
  );
}

export default SearchList;
