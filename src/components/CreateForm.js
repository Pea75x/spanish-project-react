import React from 'react'
import { titleCase } from '../utils/stringUtils'
import { createNewItem } from '../api/items';
import { selectToken } from '../store/users/user.selector';
import { useSelector } from 'react-redux';
import FormInput from './FormInput';
import SearchableInput from './SearchableInput';

function CreateForm({itemName, emptyItem, setMessage, getData, formData, words}) {
  const [item, setItem] = React.useState(emptyItem)
  const token = useSelector(selectToken);

  function handleChange(event, item, setItem) {
    setItem({ ...item, [event.target.name]: event.target.value });
  }

  function toggleCheckbox(value, item, setItem) {
    setItem({ ...item, [value]: !item[value] });
  }

  function createItem(event, itemName, itemData) {
    event.preventDefault();

    const createData = async () => {
      try {
        await createNewItem(itemName, itemData, token);
        await getData();
        setMessage(`Successfully created ${itemName}`);
        setItem(emptyItem);
      } catch (error) {
        error.response.status === 500
          ? setMessage(error.message)
          : setMessage(error.response.data);
      }
    };
    createData();
  }

  return (
    <div className='m-4 w-96 min-w-80 rounded-lg flex border flex-col items-center shadow-lg'>
      <h2 className='text-4xl bg-amber-50 border-b rounded-t-lg w-full py-2'>
        {titleCase(itemName)}
      </h2>
      <div className='py-5 w-full'>
        <form onSubmit={(event) => createItem(event, itemName, item)}>
          {formData.map((formField) => (
            <div key={formField.label}>
              
              {formField.type == "text" && (<div className='w-3/4 mx-auto'>
                <FormInput
                  label={titleCase(formField.label)}
                  type='text'
                  inline
                  onChange={(event) =>
                    handleChange(event, item, setItem)
                  }
                  name={formField.label}
                  value={item[formField.label]}
                  multiline={formField.multiline}
                />
              </div>)}
              {formField.type == "checkbox" && (
                <label className='inline-flex items-center cursor-pointer mb-4'>
                  <input
                    type='checkbox'
                    checked={item[formField.label]}
                    onChange={(event) =>
                      toggleCheckbox(formField.label, item, setItem)
                    }
                    name={formField.label}
                    className='sr-only peer'
                  />
                  <span className='mx-4 font-medium text-gray-900 dark:text-gray-300'>
                    {titleCase(formField.label)}
                  </span>
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-600"></div>
                </label> 
              )}
              {!item.type_verb && formField.not_verb && formField.type === "searchable" && (
                <SearchableInput
                  searchList={words.filter((word) => word.type_verb)}
                  value='word'
                  name={formField.label}
                  code='id'
                  setNewItem={setItem}
                  newItem={item}
                  inputClass='w-3/4 mx-auto'
                  singleSearch
                />
              )}
              {formField.type === "searchable" && !formField.not_verb && <SearchableInput
                searchList={formField.searchlist}
                value={formField.value}
                name={formField.label}
                code={formField.code}
                setNewItem={setItem}
                newItem={item}
                unique={formField.unique}
                inputClass='w-3/4 mx-auto'
                singleSearch={formField.singleSearch}
              />}
            </div>
          ))}
          <button
            type='submit'
            className='w-1/4 h-10 text-center hover:bg-orange-200 text-gray-800 font-semibold border border-gray-400 rounded shadow mt-2'
          >
            Create
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateForm