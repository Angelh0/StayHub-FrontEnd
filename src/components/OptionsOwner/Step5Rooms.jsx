import React from "react";

const Step5Rooms = ({ formData, handleChange, labelClasses, inputClasses }) => {
  return (
    <div className="space-y-4 flex-col">
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <h2 className="text-2xl font-bold border-b-4 border-yellow-400 inline-block pb-1 text-white">
          Añade las habitaciones a tu alojamiento
        </h2>
        <span className="text-yellow-400/50 px-5">Paso 5 de 5</span>
      </div>

      <h2 className="text-gray-400/50 py-3">
        Selecciona las fotos para tu alojamiento
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className={labelClasses}>Nº Habitaciones</label>
          <input
            type="number"
            min="1"
            name="habitaciones"
            value={formData.habitaciones}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Capacidad de personas</label>
          <input
            type="number"
            min="1"
            name="capacidad"
            value={formData.capacidad}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Nº de camas</label>
          <input
            type="number"
            min="1"
            name="camas"
            value={formData.camas}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <div className="col-span md:col-span-1">
            <label className={labelClasses}>Tipo Habitacion</label>
            <select
              name="tipoHabitacion"
              value={formData.habitaciones}
              onChange={handleChange}
              className={`${inputClasses} appearance-none`}
            >
              <option value="Single" className="bg-gray-950">
                Single
              </option>
              <option value="Double" className="bg-gray-950">
                Double
              </option>
              <option value="Suite" className="bg-gray-950">
                Suite
              </option>
              <option value="Loft" className="bg-gray-950">
                Loft
              </option>
              <option value="Studio" className="bg-gray-950">
                Estudio
              </option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClasses}>Precio/noche</label>
          <input
            type="number"
            min="1"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Metros cuadrados</label>
          <input
            type="number"
            min="10"
            name="metros"
            value={formData.metros}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
      </div>
    </div>
  );
};

export default Step5Rooms;