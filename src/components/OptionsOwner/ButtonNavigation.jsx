import React from "react";

const ButtonNavigation = ({
  step,
  prevStep,
  nextStep,
  handleCreate,
  handleUpdate,
  accommodationId,
  isStep1Valid,
  isCreating,
  formData,
  onDraftClick,
  isStepsValid,
  handleSaveAndExit
}) => {
  return (
    <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-800">
      <div>
        {step > 1 && (
          <button
            onClick={prevStep}
            className="px-6 py-2 rounded font-bold text-white border border-gray-600 hover:bg-gray-800 transition-colors"
          >
            Atrás
          </button>
        )}
      </div>

      <div className="flex gap-4">
        {step === 1 && !accommodationId && (
          <>
            <button
              onClick={onDraftClick} 
              disabled={!isStep1Valid || isCreating}
              className={`px-6 py-2 rounded font-bold text-gray-400 border border-gray-700 hover:text-white hover:bg-gray-800 transition-colors ${
                !isStep1Valid || isCreating
                  ? "text-gray-600 border-gray-800 cursor-not-allowed"
                  : "text-gray-400 hover:text-white cursor-pointer"
              }`}
            >
              {isCreating ? "Guardando..." : "Guardar borrador"}
            </button>
            
            <button
              onClick={() => handleCreate(false)} 
              disabled={!isStep1Valid || isCreating}
              className={`px-6 py-2 rounded font-bold transition-colors ${
                !isStep1Valid
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-yellow-400 text-black hover:bg-yellow-500 shadow-lg"
              }`}
            >
              {isCreating ? "Creando..." : "Ir a los siguientes pasos"}
            </button>
          </>
        )}

        {accommodationId && (
          <>
            <button
              onClick={handleSaveAndExit}
              className="px-6 py-2 rounded font-bold text-white border border-gray-600 hover:bg-gray-800 transition-colors"
            >
              Guardar y salir 
            </button>

            {step < 5 && (
              <button
                onClick={nextStep}
                className="px-8 py-2 rounded font-bold bg-yellow-400 text-black hover:bg-yellow-500 transition-colors shadow-lg"
              >
                Siguiente
              </button>
            )}

            {step === 5 && (
              <button
                onClick={handleUpdate} 
                disabled={!isStepsValid} 
                className={`px-8 py-2 rounded font-bold transition-all duration-300 ${
                  !isStepsValid
                    ? "bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-700" 
                    : "bg-yellow-400 text-black hover:bg-yellow-500 shadow-[0_0_20px_rgba(250,204,21,0.4)] scale-105 cursor-pointer"
                }`}
              >
                Publicar
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ButtonNavigation;
