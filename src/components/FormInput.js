import React from 'react';

function FormInput({ label, ...otherProps }) {
  return (
    <div className='field'>
      {label && <label className='form-input-label'>{label}</label>}
      <input className='input' {...otherProps} />
    </div>
  );
}

export default FormInput;
