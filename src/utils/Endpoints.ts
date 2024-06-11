const BASE_ROUTE = {
  AUTH: "/auth",
  USER: "/user",
  STORE: "/store",
};
const ENDPOINTS = {
  LOGIN: "/login",
  LOGOUT: "/logout",
  SIGNUP: "/signup",
  REFRESH_TOKEN: "/refresh-token",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  ADDRESS: "/address",
  MARK_ADDRESS_AS_DEFAULT: "/address/default",
  UPDATE_PHONE_NUMBER: "/update-phone-number",
  SEND_OTP: "/send-phoneNumber-otp",
  VERIFY_OTP: "/verify-phoneNumber-otp",
  RESEND_OTP: "/resend-phoneNumber-otp",
  SEND_EMAIL_OTP: "/send-email-otp",
  VERIFY_EMAIL_OTP: "/verify-email-otp",
  RESEND_EMAIL_OTP: "/resend-email-otp",

  STORE_REGISTER: "/register",
  USER: "/user",
};
const BROWSER_ROUTE = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password/:token",
  
  HOME: "/",
  PROFILE: "/profile",
  ORDERS: "/orders",
  MANAGE_ADDRESS: "/manage-address",
  SETTINGS: "/settings",

  STORE_REGISTER: "/store-register",
  STORE_DASHBOARD: "/store",
  STORE_ORDERS: "/store/orders",
  STORE_SETTINGS: "/store/settings",
  STORE_EDIT_PROFILE: "/store/edit-profile",
  STORE_PROFILE: "/store/profile",
  STORE_MENU: "/store/menu",
};
export { BASE_ROUTE, ENDPOINTS, BROWSER_ROUTE };
