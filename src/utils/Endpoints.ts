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
};
const BROWSER_ROUTE = {
  LOGIN: "/login",
  SIGNUP: "/signup",

  HOME: "/",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password/:token",
  PROFILE: "/profile",
  EDIT_PROFILE: "/edit-profile",
  ORDERS: "/orders",
  MANAGE_ADDRESS: "/manage-address",
  SETTINGS: "/settings",
  VERIFY_EMAIL: "/verify-email",
  VERIFY_PHONE: "/verify-phoneNumber",


  STORE_REGISTER: "/store/register",
};
export { BASE_ROUTE, ENDPOINTS, BROWSER_ROUTE };
