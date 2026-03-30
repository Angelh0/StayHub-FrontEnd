import React from "react";

const Step1BasicInfo = ({ formData, handleChange, labelClasses, inputClasses, totalSteps = 5, isEditing=false}) => {

  const disabled = "bg-gray-800 text-gray-500 cursor-not-allowed border-gray-800/70" 

  return (
    <div className="space-y-4 flex-col">
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <h2 className="text-2xl font-bold border-b-4 border-yellow-400 inline-block pb-1 text-white">
          Información Básica
        </h2>
        <span className="text-yellow-400/50 px-5">Paso 1 de {totalSteps}</span>
      </div>
      <p className="text-gray-500/50 py-3">
        Este paso crea el alojamiento, una vez completes todos los datos, se publicara el alojamiento
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <label className={labelClasses}>Nombre del Alojamiento</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Eurostars Atlantida"
          ></input>
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className={labelClasses}>Tipo</label>
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            disabled={isEditing}
            className={`${inputClasses} appearance-none ${isEditing ? disabled : ""}`}
          >
            <option value="Apartment" className="bg-gray-950">
              Apartamento
            </option>
            <option value="Hotel" className="bg-gray-950">
              Hotel
            </option>
          </select>
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className={labelClasses}>País</label>
          <input
            type="text"
            name="pais"
            value={formData.pais}
            readOnly
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-gray-500 cursor-not-allowed"
          />
        </div>
      </div>
      <div className="col-span-2 md:col-span-1">
        <label className={labelClasses}>Ciudad</label>
        <input
          type="text"
          name="ciudad"
          value={formData.ciudad}
          onChange={handleChange}
          disabled={isEditing}
          className={`${inputClasses} appearance-none ${isEditing ? disabled : ""}`}
          placeholder="Madrid"
        ></input>
      </div>
      <div className="col-span-2">
        <label className={labelClasses}>Descripcion</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          rows="4"
          className={inputClasses}
          placeholder="Describe tu alojamiento..."
        ></textarea>
      </div>
    </div>
  );
};

export default Step1BasicInfo;