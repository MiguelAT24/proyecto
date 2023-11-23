import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Nav from '../components/Navbar';


jest.mock('axios');

describe('Nav component', () => {
  it('renders loading state correctly', async () => {
    render(<Nav />);

      expect(screen.getByText('Sistema De Ventas De Boletos')).toBeInTheDocument();
    });
  });
