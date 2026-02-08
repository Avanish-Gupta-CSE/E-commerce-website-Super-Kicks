import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { RequiresAuth } from "./RequiresAuth";

vi.mock("../contexts/AuthProvider", () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from "../contexts/AuthProvider";

const renderWithRouter = (ui, { route = "/" } = {}) => {
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

describe("RequiresAuth", () => {
  it("renders children when authenticated", () => {
    useAuth.mockReturnValue({ isAuthenticated: true, loading: false });
    renderWithRouter(null, { route: "/protected" });
    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("redirects to login when not authenticated", () => {
    useAuth.mockReturnValue({ isAuthenticated: false, loading: false });
    renderWithRouter(null, { route: "/protected" });
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});
