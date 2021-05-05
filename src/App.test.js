import { render, screen } from '@testing-library/react';
import App from './App';

test('renders nav link', () => {
  render(<App />);
  const linkElement1 = screen.getByText('User Id');
  expect(linkElement1).toBeInTheDocument();
});
