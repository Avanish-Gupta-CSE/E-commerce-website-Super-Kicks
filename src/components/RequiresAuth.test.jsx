import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { RequiresAuth } from './RequiresAuth';

vi.mock('../contexts/LoginProvider', () => ({
  useLoginContext: vi.fn(),
}));

import { useLoginContext } from '../contexts/LoginProvider';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />
        <Route
          path="/protected"
          element={
            <RequiresAuth>
              <div>Protected Content</div>
            </RequiresAuth>
          }
        />
      </Routes>
    </MemoryRouter>
  );
};

describe('RequiresAuth', () => {
  it('renders children when logged in', () => {
    useLoginContext.mockReturnValue({ login: true });
    renderWithRouter(null, { route: '/protected' });
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to login when not authenticated', () => {
    useLoginContext.mockReturnValue({ login: false });
    renderWithRouter(null, { route: '/protected' });
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
