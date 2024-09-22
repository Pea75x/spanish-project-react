import { render, screen } from '@testing-library/react';
import FormInput from './FormInput';

test('renders the input element', () => {
  render(<FormInput />);
  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toBeInTheDocument();
});

test('renders label when provided', () => {
  render(<FormInput label='Username' onChange={console.log('hello')} />);
  const labelElement = screen.getByText('Username');
  expect(labelElement).toBeInTheDocument();
});

test('does not render label when none provided', () => {
  render(<FormInput />);
  const labelElement = screen.queryByText('Username');
  expect(labelElement).not.toBeInTheDocument();
});

test('passes props to input element', () => {
  render(
    <FormInput
      label='Username'
      onChange={console.log('hello')}
      name='password'
      value='test-value'
    />
  );
  const inputElement = screen.getByTestId('input');
  expect(inputElement.value).toBe('test-value');
});

test('applies the correct class names', () => {
  render(
    <FormInput
      label='Username'
      value='test value'
      onChange={console.log('hello')}
    />
  );

  const inputElement = screen.getByTestId('input');
  const labelElement = screen.getByTestId('label');
  expect(inputElement).toHaveClass('input');
  expect(labelElement).toHaveClass('form-input-label');
});
