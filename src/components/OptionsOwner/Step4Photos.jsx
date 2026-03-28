import React from "react";

const Step4Photos = ({ openWidget, formData }) => {
  return (
    <div className="space-y-4 flex-col">
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <h2 className="text-2xl font-bold border-b-4 border-yellow-400 inline-block pb-1 text-white">
          Fotos
        </h2>
        <span className="text-yellow-400/50 px-5">Paso 4 de 5</span>
      </div>

      <h2 className="text-gray-400/50 py-3">
        Selecciona las fotos para tu alojamiento
      </h2>

      <div 
        onClick={openWidget}
        className="border-2 border-dashed border-gray-700 rounded-2xl p-10 flex flex-col items-center justify-center bg-gray-900 hover:border-yellow-400 cursor-pointer transition-colors"
      >
        <div className="w-16 h-16 bg-gray-800 border-gray-700 rounded-2xl flex items-center justify-center mb-4 ">
          <span className="text-yellow-400 text-3xl font-light">+</span>
        </div>
        <p className="text-white font-semibold">
          Haz clic o arrastra tus fotos aquí
        </p>
      </div>

      {formData.fotos && formData.fotos.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">Fotos subidas ({formData.fotos.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.fotos.map((url, index) => (
              <div key={index} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-700 bg-gray-900">
                <img 
                  src={url} 
                  alt={`Alojamiento ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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

export default Step4Photos;