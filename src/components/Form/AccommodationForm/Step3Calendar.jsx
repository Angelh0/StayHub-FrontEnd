import React from "react";

const Step3Calendar = ({ formData, handleMonthToggle, mesesDelAño, totalSteps = 5 }) => {
  return (
    <div className="space-y-4 flex-col">
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <h2 className="text-2xl font-bold border-b-4 border-yellow-400 inline-block pb-1 text-white">
          Configuración de estancia
        </h2>
        <span className="text-yellow-400/50 px-5">Paso 3 de {totalSteps}</span>
      </div>

      <h2 className="text-gray-400/50 py-3">
        Elige los meses de actividad de tu alojamiento
      </h2>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {mesesDelAño.map((meses, index) => (
          <button
            key={index}
            onClick={() => handleMonthToggle(index + 1)}
            className={`p-3 border rounded-2xl text-sm font-bold ${
              formData.meses.includes(index + 1)
                ? `bg-yellow-400 text-black border-yellow-400 hover:scale-[1.03]`
                : `bg-gray-900 text-white border-gray-700 hover:border-yellow-400 hover:text-yellow-400`
            }`}
          >
            {meses}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step3Calendar;