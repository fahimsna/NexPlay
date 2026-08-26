import {
  loginService,
  registerService,
  logoutService,
} from "../services/authService";

// ======================
// Login Controller
// ======================
export const login = async (credentials, auth) => {
  try {
    const data = await loginService(credentials);

    auth.login(data.user, data.token);

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Login failed",
    };
  }
};

// ======================
// Register Controller
// ======================
export const register = async (formData) => {
  try {
    const data = await registerService(formData);

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || error.message || "Registration failed",
    };
  }
};

// ======================
// Logout Controller
// ======================
export const logout = async (auth) => {
  try {
    await logoutService();

    auth.logout();

    return {
      success: true,
    };
  } catch (error) {
    auth.logout();

    return {
      success: true,
    };
  }
};
