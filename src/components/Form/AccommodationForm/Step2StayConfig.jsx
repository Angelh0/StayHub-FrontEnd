import React from "react";

const Step2StayConfig = ({ formData, handleChange, labelClasses, inputClasses, totalSteps = 5 }) => {
  return (
    <div className="space-y-4 flex-col">
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <h2 className="text-2xl font-bold border-b-4 border-yellow-400 inline-block pb-1 text-white">
          Configuración de estancia
        </h2>
        <span className="text-yellow-400/50 px-5">Paso 2 de {totalSteps}</span>
      </div>

      <h2 className="text-gray-400/50 py-3">
        Elige los tiempos de estancia estimados para tus clientes
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className={labelClasses}>Minimo de dias</label>
          <input
            type="number"
            name="minStay"
            min="1"
            value={formData.minStay}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div className="flex flex-col">
          <label className={labelClasses}>Maximo de dias</label>
          <input
            type="number"
            name="maxStay"
            min={formData.minStay}
            value={formData.maxStay}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
      </div>
    </div>
  );
};

export default Step2StayConfig;