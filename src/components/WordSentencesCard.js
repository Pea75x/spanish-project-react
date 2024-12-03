import React from 'react'
import { useNavigate } from 'react-router-dom';

function WordSentencesCard({sentences, centered}) {
  const navigate = useNavigate();

  return (
    <div className={`md:w-2/3 border rounded-lg p-2 bg-amber-50 shadow-lg ${centered ? 'm-auto my-4' : 'm-4 md:ml-8'}`}>
      <h2 className='text-3xl font-semibold'>Sentence examples</h2>
      <div className='border rounded-lg h-[calc(100%-3rem)] min-h-28 m-2 bg-white overflow-y-scroll'>
        {sentences.map((sentence) => (
          <div
            className="border-dashed border-b hover:font-semibold"
            onClick={() =>
              navigate(`/sentence-show`, {
                state: { id: sentence.id }
              })
            }
          >
            {sentence.sentence}
          </div>
        ))}
      </div>
    </div>
  )
}

export default WordSentencesCard;