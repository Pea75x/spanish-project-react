import React from 'react';
import { useLocation } from 'react-router-dom';
import { titleCase } from '../utils/stringUtils';
import { getItemById } from '../api/items';
import { useNavigate } from 'react-router-dom';
import { removeSnakeCase } from '../utils/stringUtils';

function Sentence() {
  const { state } = useLocation();
  const { id } = state;
  const [sentenceId, setSentenceId] = React.useState(id);
  const [sentence, setSentence] = React.useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    const getData = async () => {
      try {
        const sentenceData = await getItemById('sentences', sentenceId);
        setSentence(sentenceData);
      } catch (error) {
        console.log('error', error);
      }
    };
    getData();
  }, [sentenceId]);

  return (
    <div className='text-center'>
      {sentence.sentence && (
        <div>
          <div className='m-6'>
            <h1 className='text-5xl font-bold'>
              {titleCase(sentence.sentence)}
            </h1>
            <h2 className='text-4xl font-semibold text-amber-600'>
              {titleCase(sentence.translation)}
            </h2>
          </div>
          <div className='md:w-2/3 mx-auto flex justify-between'>
            <div className='border rounded-lg m-4 w-full md:mr-4 p-2 shadow-lg'>
              <h2 className='text-3xl font-semibold'>Themes</h2>
              <div className='flex m-2 flex-wrap justify-center'>
                {sentence.themes.map((theme) => (
                  <div className='rounded-full bg-amber-50 border border-amber-600 text-amber-600 m-1 px-3'>
                    {removeSnakeCase(theme)}
                  </div>
                ))}
              </div>
            </div>
            <div className='border rounded-lg m-4 w-full p-2 shadow-lg'>
              <h2 className='text-3xl font-semibold'>Words</h2>
              <div className='flex m-2 flex-wrap justify-center'>
                {sentence.words.map((word) => (
                  <div
                    className='rounded-full bg-amber-50 border border-amber-600 text-amber-600 m-1 px-3 hover:bg-amber-100 hover:font-semibold'
                    onClick={() =>
                      navigate(`/word-show`, {
                        state: { id: word.id }
                      })
                    }
                  >
                    {word.word}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='relative'>
            <div
              className='absolute right-10 m-4 flex flex-col'
              onClick={() => navigate(`/search`)}
            >
              <i
                className='fa-solid fa-circle-left text-4xl'
                style={{ color: '#d97706' }}
              />
              <span className='text-amber-600 font-bold'>Back</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sentence;
