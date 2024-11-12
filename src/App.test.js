import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { useSelector, useDispatch } from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

test('renders learn react link', () => {
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);
  useSelector.mockReturnValue({ admin: false });

  render(<App />);

  const totalScore = screen.getByText(/Total score/i);
  expect(totalScore).toBeInTheDocument();
});
