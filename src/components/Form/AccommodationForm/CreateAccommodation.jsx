import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Home/Navbar";
import Footer from "../../Home/Footer";
import Step1BasicInfo from "./Step1BasicInfo";
import Step2StayConfig from "./Step2StayConfig";
import Step3Calendar from "./Step3Calendar";
import Step4Photos from "./Step4Photos";
import Step5Rooms from "./Step5Rooms";
import ButtonNavigation from "./ButtonNavigation";
import LeftMenu from "./LeftMenu";
import { authService } from "../../../services/authService";
import ConfirmModal from "../../Objects/confirmModal";

const CreateAccommodation = () => {
  const [showDraftModal, setShowDraftModal] = useState(false);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [accommodationUuid, setAccommodationUuid] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "Apartment",
    pais: "España",
    ciudad: "",
    descripcion: "",
    minStay: "",
    maxStay: "",
    meses: [],
    fotos: [],
    habitaciones: "",
    capacidad: "",
    camas: "",
    tipoHabitacion: "Double",
    precio: "",
    metros: "",
    fotosHabitacion: [],
  });

  React.useEffect(() => {
    if (step === 5) {
      setShowInfoModal(true);
    }
  }, [step]);

  const openRoomWidget = () => {
    if (!window.cloudinary) return;
    const mywidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dcau2huan",
        uploadPreset: "ml_default",
        theme: "dark",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const url = result.info.secure_url;
          setFormData((prev) => ({
            ...prev,
            fotosHabitacion: [...prev.fotosHabitacion, url],
          }));
        }
      }
    );
    mywidget.open();
  };

  const openWidget = () => {
    if (!window.cloudinary) return;
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dcau2huan",
        uploadPreset: "ml_default",
        source: ["local", "url", "camera"],
        multiple: true,
        theme: "dark",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const url = result.info.secure_url;
          setFormData((prev) => ({
            ...prev,
            fotos: [...prev.fotos, url],
          }));
        }
      }
    );
    myWidget.open();
  };

  const removePhoto = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      fotos: prev.fotos.filter((_, index) => index !== indexToRemove),
    }));
  };

  const removeRoomPhoto = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      fotosHabitacion: prev.fotosHabitacion.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMonthToggle = (mes) => {
    setFormData((prev) => ({
      ...prev,
      meses: prev.meses.includes(mes)
        ? prev.meses.filter((m) => m !== mes)
        : [...prev.meses, mes],
    }));
  };

  const isStep1Valid =
    formData.nombre.trim() !== "" &&
    formData.ciudad.trim() !== "" &&
    formData.descripcion.trim() !== "";

  const isStepsValid = () => {
    switch (step) {
      case 1: return isStep1Valid;
      case 2: return Number(formData.minStay) > 0 && Number(formData.maxStay) >= Number(formData.minStay);
      case 3: return formData.meses.length > 0;
      case 4: return formData.fotos.length > 0;
      case 5: return formData.habitaciones > 0 && formData.capacidad > 0 && formData.camas > 0 && formData.precio > 1 && formData.metros > 10 && formData.fotosHabitacion.length > 0;
      default: return true;
    }
  };

  const hasDataInCurrentStep = () => {
    switch (step) {
      case 1:
        return formData.nombre.trim() !== "" || formData.descripcion.trim() !== "" || formData.ciudad.trim() !== "";
      case 2:
        return Number(formData.minStay) > 0 || Number(formData.maxStay) > 0;
      case 3:
        return formData.meses.length > 0;
      case 4:
        return formData.fotos.length > 0;
      case 5:
        return formData.habitaciones > 0 || formData.capacidad > 0 || formData.camas > 0 || formData.precio > 0 || formData.metros > 0 || formData.fotosHabitacion.length > 0;
      default:
        return false;
    }
  };

  const saveCurrentStepData = async () => {
    if (!hasDataInCurrentStep() || !accommodationUuid) return;

    try {
      if (step === 1) {
      } else if (step === 2) {
        await authService.stayConfig(accommodationUuid, {
          minStay: Number(formData.minStay) || 0,
          maxStay: Number(formData.maxStay) || 0,
        });
      } else if (step === 3) {
        await authService.availabilityCalendar(accommodationUuid, {
          availabilityCalendar: { calendarMonth: formData.meses },
        });
      } else if (step === 4) {
        await authService.addPhotos(accommodationUuid, { photos: formData.fotos });
      } else if (step === 5) {
        const payload = {
          room: Number(formData.habitaciones) || 0,
          capacity: Number(formData.capacidad) || 0,
          beds: Number(formData.camas) || 0,
          type: formData.tipoHabitacion,
          price: Number(formData.precio) || 0,
          areaInSquareMeters: Number(formData.metros) || 0,
          status: "Available",
          photos: formData.fotosHabitacion,
        };
        await authService.addRooms(accommodationUuid, payload);
      }
    } catch (error) {
      console.error("Error saving step:", error);
    }
  };

  const handleUpdate = async () => {
    if (!accommodationUuid) return;
    setIsCreating(true);

    try {
      await saveCurrentStepData();

      if (step < 5) {
        setStep(step + 1);
      } else if (step === 5) {
        navigate("/");
      }
    } catch (error) {
      alert("Hubo un error al guardar los datos.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleCreate = async (isDraft = false) => {
    setIsCreating(true);
    try {
      const payload = {
        name: formData.nombre,
        type: formData.tipo,
        country: formData.pais,
        city: formData.ciudad,
        description: formData.descripcion,
      };
      const dataBackend = await authService.createAccommodation(payload);
      
      if (isDraft) {
        navigate("/");
        return;
      }
      
      setAccommodationUuid(dataBackend.uuid);
      setStep(2);
    } catch (error) {
      alert("Hubo un error al crear");
    } finally {
      setIsCreating(false);
    }
  };

  const handleSaveAndExit = async (e) => {
    if (e) e.preventDefault();
    if(accommodationUuid) {
        setIsCreating(true);
        await saveCurrentStepData();
        navigate("/");
    } else {
        navigate("/");
    }
  };

  const prevStep = () => setStep(step - 1);

  const mesesDelAño = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];

  const stepMenu = [
    "1. Creación",
    "2. Configuración de estancia",
    "3. Calendario de disponibilidad",
    "4. Fotos",
    "5. Habitaciones",
  ];

  const inputClasses =
    "w-full p-3 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors";

  const labelClasses = "block text-sm font-bold mb-1 text-gray-300";

  return (
    <div className="bg-black font-sans text-white">
      <div className="min-h-screen flex flex-col">
        <div className="sticky top-0 z-50 w-full bg-black min-h-24 flex items-center justify-center border-b border-gray-800 shadow-xl">
          <Navbar />
        </div>

        <div className="grow flex w-full max-w-6xl mx-auto py-10 px-4 gap-8">
          <LeftMenu
            stepMenu={stepMenu}
            step={step}
            accommodationId={accommodationUuid}
          />

          <div className="flex flex-col w-full md:w-3/4 bg-gray-950 p-8 border-gray-800 shadow-2xl rounded-2xl justify-between">
            <div className="min-h-100">
              {step === 1 && (
                <Step1BasicInfo
                  formData={formData}
                  handleChange={handleChange}
                  labelClasses={labelClasses}
                  inputClasses={inputClasses}
                />
              )}
              {step === 2 && (
                <Step2StayConfig
                  formData={formData}
                  handleChange={handleChange}
                  labelClasses={labelClasses}
                  inputClasses={inputClasses}
                />
              )}
              {step === 3 && (
                <Step3Calendar
                  formData={formData}
                  handleMonthToggle={handleMonthToggle}
                  mesesDelAño={mesesDelAño}
                />
              )}
              {step === 4 && (
                <Step4Photos
                  openWidget={openWidget}
                  formData={formData}
                  removePhoto={removePhoto}
                />
              )}
              {step === 5 && (
                <Step5Rooms
                  formData={formData}
                  handleChange={handleChange}
                  labelClasses={labelClasses}
                  inputClasses={inputClasses}
                  openRoomWidget={openRoomWidget}
                  removeRoomPhoto={removeRoomPhoto}
                />
              )}
            </div>

            <ButtonNavigation
              step={step}
              prevStep={prevStep}
              handleCreate={handleCreate}
              handleUpdate={handleUpdate}
              handleSaveAndExit={handleSaveAndExit}
              accommodationId={accommodationUuid}
              isStep1Valid={isStep1Valid}
              isCreating={isCreating}
              onDraftClick={() => setShowDraftModal(true)}
            />
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showInfoModal}
        isClose={() => setShowInfoModal(false)}
        isConfirm={() => setShowInfoModal(false)}
        title="Informacion sobre habitaciones"
        message="En este paso es necesario crear minimo una habitacion para poder publicar tu alojamiento. Puedes añadir tantas habitaciones como quieras ahora o acceder una vez creado el alojamiento a Mis Alojamientos > Alojamientos > Añadir una habitación"
        confirmText="Entendido"
      />

      <ConfirmModal
        isOpen={showDraftModal}
        isClose={() => setShowDraftModal(false)}
        isConfirm={() => handleCreate(true)}
        title="¿Guardar como borrador?"
        message="Tu alojamiento se guardará como borrador. Para continuar con su creción accede a Mis Alojamientos > Alojamiento"
        confirmText="Si, guardar y salir"
        cancelText="Volver al formulario"
      />

      <div className="w-full min-h-24 bg-black flex items-center justify-center border-t border-gray-800">
        <Footer />
      </div>
    </div>
  );
};

export default CreateAccommodation;