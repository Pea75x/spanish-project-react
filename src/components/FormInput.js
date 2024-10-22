import React from 'react';

function FormInput({
  label,
  inline = false,
  multiline = false,
  ...otherProps
}) {
  const Component = multiline ? 'textarea' : 'input';

  return (
    <div className={inline ? 'grid grid-cols-3 my-4' : 'my-2'}>
      <div className={inline ? 'col-span-1 text-right mx-4 my-auto' : 'my-2'}>
        {label && <label data-testid='label'>{label}</label>}
      </div>
      {React.createElement(Component, {
        className:
          'block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-gray-300 col-span-2',
        ...otherProps,
        'data-testid': 'input'
      })}
    </div>
  );
}

export default FormInput;
