import { apiUser } from "../api/axios";

export const authService = {
  getGuestAccess: async () => {
    try {
      const response = await apiUser.post("/guestAccess");
      return response.data;
    } catch (error) {
      console.error("Error en authService (getGuestAccess):", error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await apiUser.post("/signUp", userData);
      return response.data;
    } catch (error) {
      console.error("Error en el registro", error.response?.data || error.message);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await apiUser.post("/login", credentials);
      return response.data;
    } catch (error) {
      console.error("Error en el login: ", error.response?.data || error.message);
      throw error;
    }
  },

  signUpOwner: async (userData) => {
    try {
      const token = localStorage.getItem("stayhub_token");
      const response = await apiUser.post("/signUpOwner", userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error en registrarse como propietario ", error.response?.data || error.message);
      throw error;
    }
  }
};
