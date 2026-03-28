import React, { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";

import Step1BasicInfo from "./Step1BasicInfo";
import Step2StayConfig from "./Step2StayConfig";
import Step3Calendar from "./Step3Calendar";
import Step4Photos from "./Step4Photos";
import Step5Rooms from "./Step5Rooms";
import ButtonNavigation from "./ButtonNavigation";
import LeftMenu from "./LeftMenu";
import { authService } from "../../services/authService";

const CreateAccommodation = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [accommodationUuid, setAccommodationUuid] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

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

  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "Apartment",
    pais: "España",
    ciudad: "",
    descripcion: "",
    minStay: 2,
    maxStay: 30,
    meses: [],
    fotos: [],
    habitaciones: 1,
    capacidad: 1,
    camas: 1,
    tipoHabitacion: "Double",
    precio: 0,
    metros: 0,
  });

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

  const handleUpdate = async () => {
    if (step === 2) {
        setIsCreating(true);
        try {
            const payload = {
                minStay: Number(formData.minStay),
                maxStay: Number(formData.maxStay)
            }

            if (!accommodationUuid) {
               console.error("¡Falta el UUID del alojamiento!");
               alert("Error interno: No se ha guardado el ID del alojamiento.");
               return;
            }

            await authService.stayConfig(accommodationUuid, payload)
            setStep(3);
        } catch (error) {
            alert("Hubo un error al guardar la configuración de la estancia ")
        } finally {
            setIsCreating(false);
        }
    }
    else if (step === 3) {
        setIsCreating(true);
        try {
            const payload = {
                availabilityCalendar: {
                    calendarMonth: formData.meses
                }
            }

            await authService.availabilityCalendar(accommodationUuid, payload)
            setStep(4);
        } catch (error) {
            alert("Hubo un error al guardar el calendario de disponibilidad")
        } finally {
            setIsCreating(false)
        }
    }
    else if (step === 4) {
        setIsCreating(true);
        try {
            const payload = {
                photos: formData.fotos    
            }
            await authService.addPhotos(accommodationUuid, payload)
            setStep(5)
        } catch (error) {
            alert("Hubo un error al añadir las fotos")
        }finally{
            setIsCreating(false)
        }
    }
    else if (step == 5) {
        setIsCreating(true);
        try {
            const payload = {
                room: formData.habitaciones,
                capacity: formData.capacidad,
                beds: formData.camas,
                type: formData.tipoHabitacion,
                price: formData.precio,
                areaInSquareMeters: formData.metros,
                status: "Available"
            }
            await authService.addRooms(accommodationUuid, payload)
            alert("¡Alojamiento publicado y finalizado con éxito!");
            navigate("/")
        } catch (error) {
            alert("Hubo un error al guardar las habitaciones añadidas")
        } finally {
            setIsCreating(false)
        }
    } else {
        setStep(4+1)
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleMenuClick = (targetStep) => {
    if (targetStep === 1 || accommodationUuid) {
      setStep(targetStep);
    }
  };

  const handleCreate = async () => {
    setIsCreating(true);
    try {
        const payload = {
            name: formData.nombre,
            type: formData.tipo,
            country: formData.pais,
            city: formData.ciudad,
            description: formData.descripcion
        }
        const dataBackend = await authService.createAccommodation(payload);
        const uuid = dataBackend.uuid;
        setAccommodationUuid(uuid);
        setStep(2);
    } catch (error) {
        alert("Hubo un error al crear")
        setIsCreating(false)
    }
  };

  const mesesDelAño = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
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
            handleMenuClick={handleMenuClick}
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
              {step === 4 && <Step4Photos openWidget={openWidget} formData={formData}/>}
              {step === 5 && (
                <Step5Rooms
                  formData={formData}
                  handleChange={handleChange}
                  labelClasses={labelClasses}
                  inputClasses={inputClasses}
                />
              )}
            </div>

            <ButtonNavigation
              step={step}
              prevStep={prevStep}
              nextStep={nextStep}
              handleCreate={handleCreate}
              handleUpdate={handleUpdate}
              accommodationId={accommodationUuid}
              isStep1Valid={isStep1Valid}
              isCreating={isCreating}
              formData={formData}
            />
          </div>
        </div>
      </div>

      <div className="w-full min-h-24 bg-black flex items-center justify-center border-t border-gray-800">
        <Footer />
      </div>
    </div>
  );
};

export default CreateAccommodation;