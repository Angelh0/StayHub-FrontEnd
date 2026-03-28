import { apiUser } from "../api/axios";
import { apiAccommodation } from "../api/axios";

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
  },

  createAccommodation: async (accommodationData) => {
    try {
      const token = localStorage.getItem("stayhub_token");

      const response = await apiAccommodation.post("/create", accommodationData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data;
    } catch (error) {
      console.log("Error al crear el alojamiento: ", error.response?.data || error.message);
      throw error;
    }
  },

  stayConfig: async (uuid, stayData) => {
    try {
      const token = localStorage.getItem("stayhub_token");
      
      const response = await apiAccommodation.patch(`/stayConfiguration/${uuid}`, stayData, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      })
      return response.data
    } catch (error) {
      console.error("Error al actualizar estancia: ", error.response?.data || error.message);
      throw error;
    }
  },

  availabilityCalendar: async (uuid, calendarData) => {
    try {
      const token = localStorage.getItem("stayhub_token");

      const response = await apiAccommodation.patch(`/availabilityCalendar/${uuid}`, calendarData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.error("Error al actualizar calendario: ", error.response?.data || error.message);
      throw error;
    }
  },


  addPhotos: async (uuid, photosData) => {
    try {
      const token = localStorage.getItem("stayhub_token");

      const response = await apiAccommodation.patch(`/addPhotos/${uuid}`, photosData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      } )
      return response.data
    } catch (error) {
      console.error("Error a la hora de añadir fotos: ", error.response?.data || error.message);
      throw error;
    }
  },

  addRooms: async (uuid, roomsData) => {
    try {
      const token = localStorage.getItem("stayhub_token");

      const response = await apiAccommodation.post(`/createRoom/${uuid}`, roomsData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.error("Error al añadir habitaciones: ", error.response?.data || error.message);
      throw error;
    }
  }



};
