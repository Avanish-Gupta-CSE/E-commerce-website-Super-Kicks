import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-2 text-8xl font-bold text-primary">404</h1>
      <h2 className="mb-4 text-2xl font-semibold text-gray-700">
        Page Not Found
      </h2>
      <p className="mb-8 max-w-md text-lg text-muted">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="button"
      >
        Back to Home
      </Link>
    </div>
  );
};
