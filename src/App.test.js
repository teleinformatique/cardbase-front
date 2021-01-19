import { render, screen } from '@testing-library/react';
import App from './App';
import TestRenderer from 'react-test-renderer';
import AddCar from './components/AddCar';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Cardatabase/i);
  expect(linkElement).toBeInTheDocument();
});

it('Render a snapshot', () => {
  const tree = TestRenderer.create(<AddCar />).toJSON()
  expect(tree).toMatchSnapshot()
})