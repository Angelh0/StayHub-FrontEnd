import React from "react";

const ButtonNavigation = ({
  step,
  prevStep,
  handleCreate,
  handleUpdate,
  accommodationId,
  isStep1Valid,
  isCreating,
  onDraftClick,
  handleSaveAndExit,
  maxSteps = 5
}) => {
  return (
    <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-800">
      <div>
        {step > 1 && (
          <button
            type="button"
            onClick={prevStep}
            disabled={isCreating}
            className="px-6 py-2 rounded font-bold text-white border border-gray-600 hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            Atrás
          </button>
        )}
      </div>

      <div className="flex gap-4">
        {step === 1 && !accommodationId && (
          <>
            <button
              type="button"
              onClick={handleSaveAndExit}
              disabled={isCreating}
              className="px-6 py-2 rounded font-bold text-red-400 border border-red-900/30 hover:bg-red-900/20 hover:text-red-300 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="button"
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
              type="button"
              onClick={() => handleCreate(false)}
              disabled={!isStep1Valid || isCreating}
              className={`px-6 py-2 rounded font-bold transition-colors ${
                !isStep1Valid || isCreating
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-yellow-400 text-black hover:bg-yellow-500 shadow-lg"
              }`}
            >
              {isCreating ? "Creando..." : "Siguiente"}
            </button>
          </>
        )}

        {accommodationId && (
          <>
            <button
              type="button"
              onClick={handleSaveAndExit}
              disabled={isCreating}
              className="px-6 py-2 rounded font-bold text-white border border-gray-600 hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              Salir al inicio
            </button>

            {step < maxSteps && (
              <button
                type="button"
                onClick={handleUpdate}
                disabled={isCreating}
                className={`px-8 py-2 rounded font-bold transition-colors shadow-lg ${
                  isCreating
                    ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                    : "bg-yellow-400 text-black hover:bg-yellow-500 cursor-pointer"
                }`}
              >
                {isCreating ? "Guardando..." : "Siguiente"}
              </button>
            )}

            {step === maxSteps && (
              <button
                type="button"
                onClick={handleUpdate}
                disabled={isCreating}
                className={`px-8 py-2 rounded font-bold transition-all duration-300 ${
                  isCreating
                    ? "bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-700"
                    : "bg-yellow-400 text-black hover:bg-yellow-500 shadow-[0_0_20px_rgba(250,204,21,0.4)] scale-105 cursor-pointer"
                }`}
              >
                {isCreating ? "Publicando..." : "Finalizar y Publicar"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ButtonNavigation;