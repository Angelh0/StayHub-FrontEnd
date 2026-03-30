import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Home/Navbar";
import Footer from "../../Home/Footer";
import Step5Rooms from "../AccommodationForm/Step5Rooms";
import { authService } from "../../../services/authService";

const AddRoom = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const initialFormState = {
    habitaciones: 1,
    capacidad: 1,
    camas: 1,
    tipoHabitacion: "Double",
    precio: "",
    metros: "",
    fotosHabitacion: [],
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openRoomWidget = () => {
    if (!window.cloudinary) return;
    window.cloudinary
      .createUploadWidget(
        { cloudName: "dcau2huan", uploadPreset: "ml_default", theme: "dark" },
        (error, result) => {
          if (!error && result && result.event === "success") {
            setFormData((prev) => ({
              ...prev,
              fotosHabitacion: [
                ...prev.fotosHabitacion,
                result.info.secure_url,
              ],
            }));
          }
        },
      )
      .open();
  };

  const removeRoomPhoto = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      fotosHabitacion: prev.fotosHabitacion.filter(
        (_, i) => i !== indexToRemove,
      ),
    }));
  };

  const handleSave = async (stayInPage = false) => {
    if (formData.fotosHabitacion.length === 0 || !formData.precio) {
      alert("Por favor, sube al menos una foto y define un precio.");
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        room: Number(formData.habitaciones),
        capacity: Number(formData.capacidad),
        beds: Number(formData.camas),
        type: formData.tipoHabitacion,
        price: Number(formData.precio),
        areaInSquareMeters: Number(formData.metros),
        status: "Available",
        photos: formData.fotosHabitacion,
      };

      await authService.addRooms(uuid, payload);

      if (stayInPage) {
        setFormData(initialFormState);
        alert("¡Habitación añadida con éxito! Puedes añadir otra ahora.");
      } else {
        alert("¡Habitación añadida con éxito!");
        navigate("/Mis-Alojamientos");
      }
    } catch (error) {
      console.error("Error saving room:", error);
      alert("Error al guardar la habitación.");
    } finally {
      setIsSaving(false);
    }
  };

  const inputClasses =
    "w-full p-3 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors";
  const labelClasses = "block text-sm font-bold mb-1 text-gray-300";

  return (
    <div className="bg-black font-sans text-white">
      <div className="min-h-screen flex flex-col">
        <div className="sticky top-0 z-50 w-full bg-black min-h-24 flex items-center justify-center border-b border-gray-800 shadow-xl">
          <Navbar />
        </div>

        <div className="grow flex w-full max-w-6xl mx-auto py-10 px-4 justify-center">
          <div className="flex flex-col w-full md:w-3/4 bg-gray-950 p-8 border border-gray-800 shadow-2xl rounded-2xl justify-between">
            <div className="min-h-100">
              <Step5Rooms
                formData={formData}
                handleChange={handleChange}
                labelClasses={labelClasses}
                inputClasses={inputClasses}
                openRoomWidget={openRoomWidget}
                removeRoomPhoto={removeRoomPhoto}
                isSinglePage={true}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-10 pt-8 border-t border-gray-800">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 bg-transparent border border-gray-700 text-gray-400 font-bold py-4 rounded-xl hover:bg-gray-900 transition-colors"
              >
                Cancelar
              </button>

              <button
                onClick={() => handleSave(true)}
                disabled={isSaving}
                className="flex-1 bg-black border border-yellow-400 text-yellow-400 font-bold py-4 rounded-xl hover:bg-yellow-400 hover:text-black transition-all"
              >
                {isSaving ? "Guardando..." : "Guardar y añadir otra"}
              </button>

              <button
                onClick={() => handleSave(false)}
                disabled={isSaving}
                className="flex-1 bg-yellow-400 text-black font-black py-4 rounded-xl hover:bg-yellow-500 shadow-lg shadow-yellow-400/10 transition-all active:scale-95"
              >
                {isSaving ? "Guardando..." : "Finalizar"}
              </button>
            </div>
          </div>
        </div>

        <div className="w-full bg-black flex items-center justify-center border-t border-gray-800">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AddRoom;