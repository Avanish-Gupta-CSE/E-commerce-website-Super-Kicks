import { Response } from "miragejs";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";

// Mock JWT secret -- in production, this must be server-side only
const MOCK_JWT_SECRET = "super-kicks-mock-secret-dev-only";

export const requiresAuth = function (request) {
  const encodedToken = request.requestHeaders.authorization;
  try {
    const decodedToken = jwt_decode(encodedToken, MOCK_JWT_SECRET);
    if (decodedToken) {
      const user = this.db.users.findBy({ email: decodedToken.email });
      if (user) {
        return user._id;
      }
    }
  } catch (error) {
    console.error("[Auth] Token validation failed:", error.message);
  }
  return new Response(
    401,
    {},
    { errors: ["The token is invalid. Unauthorized access error."] }
  );
};

export const formatDate = () => dayjs().format("YYYY-MM-DDTHH:mm:ssZ");

export const MOCK_JWT_KEY = MOCK_JWT_SECRET;
