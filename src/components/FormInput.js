import React from 'react';

function FormInput({ label, ...otherProps }) {
  return (
    <div className='field'>
      {label && (
        <label className='form-input-label' data-testid='label'>
          {label}
        </label>
      )}
      <input className='input' {...otherProps} data-testid='input' />
    </div>
  );
}

export default FormInput;
