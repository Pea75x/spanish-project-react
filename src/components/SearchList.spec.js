import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchList from './SearchList';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllItems } from '../api/items';
import BaseButton from './BaseButton';

// Mocks
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));
jest.mock('react-redux', () => ({
  useSelector: jest.fn()
}));
jest.mock('../api/items', () => ({
  getAllItems: jest.fn()
}));
jest.mock('../data/themes.json', () => [
  { code: 'theme1', value: 'Theme 1' },
  { code: 'theme2', value: 'Theme 2' }
]);

jest.mock('./BaseButton', () => {
  return jest.fn(() => <div>Login</div>);
});

describe('SearchList', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  test('renders login prompt when user is not logged in', () => {
    useSelector.mockReturnValue(null);

    render(<SearchList />);

    expect(
      screen.getByText('Please Log in to use the search function')
    ).toBeInTheDocument();
  });

  test('renders search list when user is logged in', async () => {
    useSelector.mockReturnValue({ id: 1 }); // logged in user

    getAllItems
      .mockResolvedValueOnce({
        data: [{ word: 'hola', translation: 'hello' }]
      })
      .mockResolvedValueOnce({
        data: [{ sentence: 'sentence', translation: 'translation' }]
      });

    render(<SearchList />);

    const englishWord = await screen.findByText('hola');
    expect(englishWord).toBeInTheDocument();
  });

  test('renders list of themes', async () => {
    useSelector.mockReturnValue({ id: 1 });

    render(<SearchList />);

    const themeButton = await screen.findByText('Theme 1');
    expect(themeButton).toBeInTheDocument();
  });

  test('filters the list by search query', async () => {
    getAllItems
      .mockResolvedValueOnce({
        data: [
          { word: 'hola', translation: 'hello' },
          { word: 'adios', text: 'bye' }
        ]
      })
      .mockResolvedValueOnce({
        data: [{ sentence: 'sentence', translation: 'translation' }]
      });

    useSelector.mockReturnValue({ id: 1 });

    render(<SearchList />);

    const englishWord = await screen.findByText('adios');
    expect(englishWord).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Search'), {
      target: { value: 'Hola' }
    });
    expect(screen.getByText('hola')).toBeInTheDocument();
    expect(englishWord).not.toBeInTheDocument();
  });

  test('filters the list by theme', async () => {
    getAllItems
      .mockResolvedValueOnce({
        data: [
          { word: 'hola', translation: 'hello', themes: ['theme1'] },
          { word: 'adios', text: 'bye', themes: [] }
        ]
      })
      .mockResolvedValueOnce({
        data: [{ sentence: 'sentence', translation: 'translation' }]
      });

    useSelector.mockReturnValue({ id: 1 });

    render(<SearchList />);

    const englishWord = await screen.findByText('adios');
    expect(englishWord).toBeInTheDocument();

    fireEvent.click(screen.getByText('Theme 1'));
    expect(screen.getByText('hola')).toBeInTheDocument();
    expect(englishWord).not.toBeInTheDocument();
  });
});
