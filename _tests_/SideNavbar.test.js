import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SideNavbar from '../components/SideNavbar';

jest.mock('axios');

describe('SideNavbar', () => {
  it('should render the sidebar with all options', () => {
    render(
      <MemoryRouter>
        <SideNavbar />
      </MemoryRouter>
    );

    const navbarItems = screen.getAllByRole('button');
    expect(navbarItems.length).toBe(7);

    for (const navbarItem of navbarItems) {
      expect(navbarItem).toBeInTheDocument();
    }
  });
});
