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
};

