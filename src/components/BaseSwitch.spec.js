import { render, screen, fireEvent } from '@testing-library/react';
import BaseSwitch from './BaseSwitch';

// Option A and b props
test('renders both options as text', () => {
  render(<BaseSwitch optionA='apples' optionB='bananas' />);

  const optionAText = screen.getByText('Apples');
  const optionBText = screen.getByText('Bananas');

  expect(optionAText).toBeInTheDocument();
  expect(optionBText).toBeInTheDocument();
});

// currentOption props
test('current option is selected', () => {
  render(
    <BaseSwitch optionA='apples' optionB='bananas' currentOption='bananas' />
  );
  const currentOption = screen.getByTestId('current-option');
  expect(currentOption).toHaveTextContent('Bananas');
});

test('applies the correct class for option B', () => {
  render(
    <BaseSwitch optionA='apples' optionB='bananas' currentOption='bananas' />
  );
  const currentOption = screen.getByTestId('current-option');
  expect(currentOption).toHaveClass('left-1/2 -ml-1');
});

test('applies the correct class for option A', () => {
  render(
    <BaseSwitch optionA='apples' optionB='bananas' currentOption='apples' />
  );
  const currentOption = screen.getByTestId('current-option');
  expect(currentOption).toHaveClass('left-1');
});

// handleClick props
test('Handle click is called with the current option as props', () => {
  const handleClick = jest.fn();

  render(
    <BaseSwitch
      optionA='apples'
      optionB='bananas'
      currentOption='bananas'
      handleClick={handleClick}
    />
  );
  fireEvent.click(screen.getByText('Apples'));
  expect(handleClick).toHaveBeenCalledWith('apples');
});
//
