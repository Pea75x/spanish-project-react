import React from 'react';

function FormInput({ label, ...otherProps }) {
  return (
    <div className='my-2'>
      {label && <label data-testid='label'>{label}</label>}
      <input
        className='block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-gray-300'
        {...otherProps}
        data-testid='input'
      />
    </div>
  );
}

export default FormInput;
