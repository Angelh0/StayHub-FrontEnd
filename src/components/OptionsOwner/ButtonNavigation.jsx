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
            <button className="px-6 py-2 rounded font-bold text-gray-400 border border-gray-700 hover:text-white hover:bg-gray-800 transition-colors">
              Guardar borrador
            </button>
            <button
              onClick={handleCreate}
              disabled={!isStep1Valid || isCreating}
              className={`px-6 py-2 rounded font-bold transition-colors ${
                !isStep1Valid
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-yellow-400 text-black hover:bg-yellow-500 shadow-lg"
              }`}
            >
              {isCreating ? "Creando..." : "Crear e Ir a los siguientes pasos"}
            </button>
          </>
        )}

        {accommodationId && (
          <>
            <button
              onClick={handleUpdate}
              className="px-6 py-2 rounded font-bold text-white border border-gray-600 hover:bg-gray-800 transition-colors"
            >
              Guardar
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
                onClick={() => console.log("Finalizado!", formData)}
                className="px-8 py-2 rounded font-bold bg-yellow-400 text-black hover:bg-yellow-500 transition-colors shadow-lg"
              >
                Finalizar
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ButtonNavigation;