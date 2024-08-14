const BASE_ROUTE = {
  AUTH: "/auth",
  USER: "/user",
  STORE: "/store",
  STORE_MENU: "/store/menu",
  HOME: "/home",
  BIOMETRICS: "/biometrics",
};
const API_VERSION = "/v1";
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
  CATEGORIES: "/categories",
  STORE_REGISTER: "/register",
  USER: "/user",
  OPTIONS: "/options",
  CHOICE: "/choice",
  PROFILE: "/profile",
  CHANGE_LANGUAGE: "/change-language",
  CHANGE_PASSWORD: "/change-password",
  FOOD_TYPE: "/food-type",
  STORE_FOOD_TYPE: "/store-food-type",
  STORE_TIMING: "/store-timing",
  HOME_STORE_PRIMARY_DETAILS: "/home-store-primary-details",
  HOME_STORE_CATEGORY: "/home-store-category",
  HOME_STORE_MENU: "/home-store-menu",
  CART: "/cart",
  ORDER: "/order",
  ORDER_STATUS: "/order-status",
  CHECKOUT: "/checkout",
  PAYMENTS: "/payments",
  BANK_ACCOUNT  : "/bank-account",
  VERIFY_2FA: "/verify-2fa",
  ENABLE_2FA: "/enable-2fa",
  DISABLE_2FA: "/disable-2fa",
  TWO_FA_STATUS: "/two-fa-status",
  REGISTER_BIOMETRIC: "/register",
  REGISTER_OPTIONS: "/register-options",
  GET_AUTHENTICATE_OPTIONS: "/get-authenticate-options",
  AUTHENTICATE_BIOMETRIC: "/authenticate",
  DISABLE_BIOMETRIC: "/disable",
  PLACE_ORDER: "/place-order",
  ACCEPT_ORDER: "/accept-order",
  CANCEL_ORDER: "/cancel-order",
  STORE_ORDERS: "/store-orders",
  OUT_FOR_DELIVERY: "/out-for-delivery",
  OVERVIEW_METRICS: "/overview-metrics",
  ORDER_STATS: "/order-stats",
  REVENUE_TRENDS: "/revenue-trends",
  MOST_ORDERED: "/most-ordered",
};
const BROWSER_ROUTE = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password/:token",
  LOGIN_SUCCESS: "/login-success",
  HOME: "/",
  USER_STORE_DETAIL: "/:name/:id",
  PROFILE: "/profile",
  ORDERS: "/orders",
  MANAGE_ADDRESS: "/manage-address",
  SETTINGS: "/settings",
  PRIVACY_POLICY: "/privacy-policy",
  TERMS_AND_CONDITIONS: "/terms-and-conditions",
  CHECKOUT: "/checkout",
  PAYMENT_METHODS: "/payment-methods",
  

  STORE_REGISTER: "/store-register",
  STORE_DASHBOARD: "/store/dashboard",
  STORE_ORDERS: "/store/orders",
  STORE_PAYMENTS : "/store/payments",
  STORE_SETTINGS: "/store/settings",
  STORE_EDIT_PROFILE: "/store/edit-profile",
  STORE_PROFILE: "/store/profile",
  STORE_MENU: "/store/menu",
  STORE_MENU_DETAILS: "/store/menu/:id",
};


export { BASE_ROUTE, ENDPOINTS, BROWSER_ROUTE, API_VERSION };
