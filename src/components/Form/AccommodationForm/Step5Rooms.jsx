import React from "react";

const Step5Rooms = ({
  formData,
  handleChange,
  labelClasses,
  inputClasses,
  openRoomWidget,
  removeRoomPhoto,
  totalSteps=5,
  isSinglePage = false,
}) => {

  return (
    <div className="space-y-4 flex-col">
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <h2 className="text-2xl font-bold border-b-4 border-yellow-400 inline-block pb-1 text-white">
          {isSinglePage ? "Nueva Habitación" : "Añade las habitaciones a tu alojamiento"}
        </h2>
        <span className="text-yellow-400/50 px-5">Paso 5 de {totalSteps}</span>
      </div>

      <h2 className="text-gray-400/50 py-3">
        Selecciona las fotos para tu habitacion
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
              value={formData.tipoHabitacion}
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

      <div
        onClick={openRoomWidget}
        className="border-2 border-dashed border-gray-700 rounded-2xl p-10 flex flex-col items-center justify-center bg-gray-900 hover:border-yellow-400 cursor-pointer transition-colors"
      >
        <div className="w-5 h-5 bg-gray-800 border-gray-700 rounded-2xl flex items-center justify-center mb-4 ">
          <span className="text-yellow-400 text-3xl font-light">+</span>
        </div>
        <p className="text-white font-semibold">
          Haz clic para añadir las fotos de tu alojamiento
        </p>
      </div>

      {formData.fotosHabitacion && formData.fotosHabitacion.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-white mb-3">
            Fotos subidas ({formData.fotosHabitacion.length})
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {formData.fotosHabitacion.map((url, index) => (
              <div
                key={index}
                className="relative group aspect-square rounded-xl overflow-hidden border border-gray-700 bg-gray-900"
              >
                <img
                  src={url}
                  alt={`Habitacion ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeRoomPhoto(index);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs cursor-pointer z-10"
                  title="Eliminar foto"
                >
                  ✕
                </button>

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="text-white text-xs">Foto {index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div> 
  );
};

export default Step5Rooms;
