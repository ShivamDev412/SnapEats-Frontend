const BASE_ROUTE = {
  AUTH: "/auth",
  USER: "/user",
};
const ENDPOINTS = {
  LOGIN: "/login",
  LOGOUT: "/logout",
  SIGNUP: "/signup",
  REFRESH_TOKEN: "/refresh-token",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
};
const BROWSER_ROUTE = {
  LOGIN: "/login",
  SIGNUP: "/signup",

  HOME: "/",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password/:token",
  PROFILE: "/profile",
  SETTINGS: "/settings",

  STORE_REGISTER: "/store-register",
};
export { BASE_ROUTE, ENDPOINTS, BROWSER_ROUTE };
