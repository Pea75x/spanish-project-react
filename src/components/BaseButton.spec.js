import { render, screen, fireEvent } from '@testing-library/react';
import BaseButton from './BaseButton';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

beforeEach(() => {
  useNavigate.mockClear();
});

// text props
test('renders the button text', () => {
  render(
    <MemoryRouter>
      <BaseButton text='button' />
    </MemoryRouter>
  );
  const buttonText = screen.getByText('Button');
  expect(buttonText).toBeInTheDocument();
});

test('navigates to correct text path', () => {
  const mockNavigate = jest.fn();

  useNavigate.mockReturnValue(mockNavigate);

  render(
    <MemoryRouter>
      <BaseButton
        text='button'
        subHeadings={[{ name: 'Subheading', id: '123' }]}
      />
    </MemoryRouter>
  );

  const subHeading = screen.getByText('Subheading');

  fireEvent.click(subHeading);

  expect(mockNavigate).toHaveBeenCalledWith('/button', {
    state: { gameId: '123' }
  });
});

// Subheadings prop
test('does not render subHeadings when subHeadings is empty', () => {
  render(
    <MemoryRouter>
      <BaseButton text='button' subHeadings={[]} />
    </MemoryRouter>
  );

  const subheadingElements = screen.queryAllByRole('button');
  expect(subheadingElements.length).toBe(0);
});

// Link props
test('renders link and navigates when clicked', () => {
  const mockNavigate = jest.fn();
  useNavigate.mockReturnValue(mockNavigate);

  render(
    <MemoryRouter>
      <BaseButton text='button' link='path/to/target' />
    </MemoryRouter>
  );

  const linkElement = screen.getByRole('link', { name: 'Button' });

  fireEvent.click(linkElement);
  expect(mockNavigate).toHaveBeenCalledWith('/path/to/target');
});

// Column props
test('renders with column layout when column prop is true', () => {
  render(
    <MemoryRouter>
      <BaseButton text='button' column={true} />
    </MemoryRouter>
  );

  const button = screen.getByTestId('button-container');
  expect(button).toHaveClass('w-10/12');
});

test('renders original layout when column prop is false', () => {
  render(
    <MemoryRouter>
      <BaseButton text='button' />
    </MemoryRouter>
  );

  const button = screen.getByTestId('button-container');
  expect(button).toHaveClass('lg:w-1/6 w-1/2');
});

// Input props
test('renders input when input prop is passed', () => {
  render(
    <MemoryRouter>
      <BaseButton text='button' input='Test Input' />
    </MemoryRouter>
  );

  const inputElement = screen.getByText('Test Input');
  expect(inputElement).toBeInTheDocument();
});
