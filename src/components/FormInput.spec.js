import { render, screen, fireEvent } from '@testing-library/react';
import FormInput from './FormInput';

// Multiline prop
test('renders an input element by default', () => {
  render(<FormInput />);
  const inputElement = screen.getByRole('textbox');
  expect(inputElement.tagName).toBe('INPUT');
  expect(inputElement).toBeInTheDocument();
});

test('renders a textarea element when multiline is true', () => {
  render(<FormInput multiline />);
  const textareaElement = screen.getByRole('textbox');
  expect(textareaElement.tagName).toBe('TEXTAREA');
  expect(textareaElement).toBeInTheDocument();
});

// Inline prop
test('applies inline styles when inline is true', () => {
  render(<FormInput label='Username' inline />);
  const container = screen.getByTestId('label-container');
  const labelElement = screen.getByTestId('label');

  expect(container).toHaveClass('grid grid-cols-3 my-4');
  expect(labelElement).toHaveClass('col-span-1 text-right mr-4 my-auto');
});

test('applies default styles when inline is false', () => {
  render(<FormInput label='Username' />);
  const container = screen.getByTestId('label-container');
  const labelElement = screen.getByTestId('label');

  expect(container).toHaveClass('my-2');
  expect(labelElement).not.toHaveClass('col-span-1 text-right mr-4 my-auto');
});

// Label prop
test('renders label when provided', () => {
  render(<FormInput label='Username' />);
  const labelElement = screen.getByText('Username');
  expect(labelElement).toBeInTheDocument();
});

test('does not render label when none provided', () => {
  render(<FormInput />);
  const labelElement = screen.queryByText('Username');
  expect(labelElement).not.toBeInTheDocument();
});

// ...otherProps
test('passes props to input element and calls onChange handler on change', () => {
  render(
    <FormInput
      label='Username'
      onChange={() => {}}
      name='password'
      defaultValue='test-value'
    />
  );
  const inputElement = screen.getByTestId('input');
  expect(inputElement.value).toBe('test-value');
});
