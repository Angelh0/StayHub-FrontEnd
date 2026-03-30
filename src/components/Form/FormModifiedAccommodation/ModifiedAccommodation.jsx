import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Home/Navbar";
import Footer from "../../Home/Footer";
import Step1BasicInfo from "../AccommodationForm/Step1BasicInfo";
import Step2StayConfig from "../AccommodationForm/Step2StayConfig";
import Step3Calendar from "../AccommodationForm/Step3Calendar";
import Step4Photos from "../AccommodationForm/Step4Photos";
import ButtonNavigation from "../AccommodationForm/ButtonNavigation";
import LeftMenu from "../AccommodationForm/LeftMenu";
import { authService } from "../../../services/authService";

const ModifiedAccommodation = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
  });

  useEffect(() => {
    const fetchAccommodationData = async () => {
      try {
        const data = await authService.getAccommodationWithUuid(uuid);
        setFormData({
          nombre: data?.name || "",
          tipo: data?.type || "Apartment",
          pais: data?.country || "España",
          ciudad: data?.city || "",
          descripcion: data?.description || "",
          minStay: data?.minStay || "",
          maxStay: data?.maxStay || "",
          meses: data?.availabilityCalendar?.calendarMonth || [],
          fotos: data?.photos || [],
        });
      } catch (error) {
        alert("Error al cargar los datos");
        navigate("/Mis-Alojamientos");
      } finally {
        setIsLoading(false);
      }
    };
    if (uuid) fetchAccommodationData();
  }, [uuid, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMonthToggle = (mes) => {
    setFormData((prev) => ({
      ...prev,
      meses: (prev.meses || []).includes(mes)
        ? prev.meses.filter((m) => m !== mes)
        : [...(prev.meses || []), mes],
    }));
  };

  const openWidget = () => {
    if (!window.cloudinary) return;
    const myWidget = window.cloudinary.createUploadWidget(
      { cloudName: "dcau2huan", uploadPreset: "ml_default", theme: "dark", multiple: true },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setFormData((prev) => ({ ...prev, fotos: [...prev.fotos, result.info.secure_url] }));
        }
      }
    );
    myWidget.open();
  };

  const removePhoto = (indexToRemove) => {
    setFormData((prev) => ({ ...prev, fotos: prev.fotos.filter((_, index) => index !== indexToRemove) }));
  };

  const saveCurrentStepData = async () => {
    try {
      if (step === 1 && formData.descripcion.trim() !== "") {
        await authService.updateAccommodation(uuid, {
          name: formData.nombre,
          description: formData.descripcion,
        });
      } else if (step === 2 && (Number(formData.minStay) > 0)) {
        const minS = Number(formData.minStay);
        const maxS = Number(formData.maxStay) || minS;
        await authService.stayConfig(uuid, {
          minStay: minS,
          maxStay: maxS >= minS ? maxS : minS,
        });
      } else if (step === 3 && formData.meses.length > 0) {
        await authService.availabilityCalendar(uuid, {
          availabilityCalendar: { calendarMonth: formData.meses },
        });
      } else if (step === 4 && formData.fotos.length > 0) {
        await authService.addPhotos(uuid, { photos: formData.fotos });
      }
    } catch (error) {
      console.error("Error silencioso al guardar paso:", error);
    }
  };

  const handleUpdate = async () => {
    setIsCreating(true);
    await saveCurrentStepData(); 
    if (step < 4) {
      setStep(step + 1);
    } else {
      navigate("/Mis-Alojamientos");
    }
    setIsCreating(false);
  };

  const handleSaveAndExit = async (e) => {
    if (e) e.preventDefault();
    setIsCreating(true);
    await saveCurrentStepData();
    navigate("/Mis-Alojamientos");
  };

  if (isLoading) return (
    <div className="min-h-screen bg-black flex justify-center items-center text-yellow-400 font-bold uppercase animate-pulse">
      Abriendo Borrador...
    </div>
  );

  const stepMenu = ["1. Info Básica", "2. Estancia", "3. Calendario", "4. Fotos"];
  const inputClasses = "w-full p-3 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-yellow-400 transition-colors";
  const labelClasses = "block text-sm font-bold mb-1 text-gray-300";
  const mesesDelAño = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  return (
    <div className="bg-black font-sans text-white min-h-screen flex flex-col">
      <div className="sticky top-0 z-50 w-full bg-black min-h-24 flex items-center justify-center border-b border-gray-800 shadow-xl">
        <Navbar />
      </div>

      <div className="grow flex w-full max-w-6xl mx-auto py-10 px-4 gap-8">
        <LeftMenu stepMenu={stepMenu} step={step} handleMenuClick={() => {}} />

        <div className="flex flex-col w-full md:w-3/4 bg-gray-950 p-8 border border-gray-800 shadow-2xl rounded-2xl justify-between">
          <div className="min-h-100">
            {step === 1 && <Step1BasicInfo formData={formData} handleChange={handleChange} labelClasses={labelClasses} inputClasses={inputClasses} totalSteps={4} isEditing={true} />}
            {step === 2 && <Step2StayConfig formData={formData} handleChange={handleChange} labelClasses={labelClasses} inputClasses={inputClasses} totalSteps={4} />}
            {step === 3 && <Step3Calendar formData={formData} handleMonthToggle={handleMonthToggle} totalSteps={4} mesesDelAño={mesesDelAño} />}
            {step === 4 && <Step4Photos openWidget={openWidget} formData={formData} removePhoto={removePhoto} totalSteps={4} />}
          </div>

          <ButtonNavigation
            step={step}
            prevStep={() => setStep(step - 1)}
            handleUpdate={handleUpdate}
            handleSaveAndExit={handleSaveAndExit}
            accommodationId={uuid}
            isCreating={isCreating}
            maxSteps={4}
            isStepsValid={true} 
          />
        </div>
      </div>

      <div className="w-full min-h-24 bg-black flex items-center justify-center border-t border-gray-800">
        <Footer />
      </div>
    </div>
  );
};

export default ModifiedAccommodation;