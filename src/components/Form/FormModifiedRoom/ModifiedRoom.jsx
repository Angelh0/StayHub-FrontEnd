import React, { useState, useEffect } from "react";
import Navbar from "../../Home/Navbar";
import Footer from "../../Home/Footer";
import Step5Rooms from "../AccommodationForm/Step5Rooms";
import { useNavigate, useParams } from "react-router-dom";
import { authService } from "../../../services/authService";

const ModifiedRoom = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    habitaciones: "",
    capacidad: "",
    camas: "",
    tipoHabitacion: "Double",
    precio: "",
    metros: "",
    fotosHabitacion: [],
  });

  useEffect(() => {
    const RoomData = async () => {
      try {
        const data = await authService.getRooms(uuid);
        setFormData({
          habitaciones: data?.room || "",
          capacidad: data?.capacity || "",
          camas: data?.beds || "",
          tipoHabitacion: data?.type || "Double",
          precio: data?.price || "",
          metros: data?.areaInSquareMeters || "",
          fotosHabitacion: data?.photos || [],
        });
      } catch (error) {
        alert("Error al cargar los datos de la habitación");
        navigate("/Mis-Habitaciones");
      } finally {
        setIsLoading(false);
      }
    };
    if (uuid) RoomData();
  }, [uuid, navigate]);

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

  const handleUpdate = async () => {
    if (formData.fotosHabitacion.length === 0 || !formData.precio) {
      alert("La habitación debe tener al menos una foto y un precio.");
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

      await authService.updateRooms(uuid, payload);
      alert("¡Habitación actualizada con éxito!");
      navigate("/Mis-Habitaciones");
    } catch (error) {
      console.error("Error updating room:", error);
      alert("Error al actualizar la habitación.");
    } finally {
      setIsSaving(false);
    }
  };

  const inputClasses =
    "w-full p-3 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors";
  const labelClasses =
    "block text-sm font-bold mb-1 text-gray-300 uppercase tracking-tighter";

  if (isLoading)
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-yellow-400 font-black uppercase animate-pulse">
        Cargando datos de la habitación...
      </div>
    );

  return (
    <div className="bg-black font-sans text-white">
      <div className="min-h-screen flex flex-col">
        <div className="sticky top-0 z-50 w-full bg-black min-h-24 flex items-center justify-center border-b border-gray-800 shadow-xl">
          <Navbar />
        </div>

        <div className="grow flex w-full max-w-6xl mx-auto py-10 px-4 justify-center">
          <div className="flex flex-col w-full md:w-3/4 bg-gray-950 p-8 border border-gray-800 shadow-2xl rounded-2xl justify-between">
            <div>
              <div className="flex justify-between items-end mb-10 border-b border-gray-900 pb-6">
                <div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                    Modificar Habitación
                  </h2>
                </div>
                <p className="text-yellow-400 font-black text-[10px] uppercase pb-1">
                  Edición de habitación
                </p>
              </div>

              <Step5Rooms
                formData={formData}
                handleChange={handleChange}
                labelClasses={labelClasses}
                inputClasses={inputClasses}
                openRoomWidget={openRoomWidget}
                removeRoomPhoto={removeRoomPhoto}
                isSinglePage={true}
                isEditing={true}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-10 pt-8 border-t border-gray-800">
              <button
                onClick={() => navigate("/Mis-Habitaciones")}
                className="flex-1 bg-transparent border border-gray-700 text-gray-400 font-bold py-4 rounded-xl hover:bg-gray-900 transition-colors uppercase text-xs tracking-widest"
              >
                Cancelar
              </button>

              <button
                onClick={handleUpdate}
                disabled={isSaving}
                className="flex-2 bg-yellow-400 text-black font-black py-4 rounded-xl hover:bg-yellow-500 shadow-lg shadow-yellow-400/10 transition-all active:scale-95 uppercase text-xs tracking-widest"
              >
                {isSaving ? "Guardando..." : "Finalizar y Guardar"}
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

export default ModifiedRoom;
