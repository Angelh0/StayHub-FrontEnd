import React from "react";
import { ArrowRight, MapPin } from "lucide-react";

const Destinations = () => {
  const smallDestinations = [
    { name: "Zaragoza", image: "/DestinationsImage/zaragoza.jpg" },
    { name: "Granada", image: "/DestinationsImage/granada.jpg" },
    { name: "Alicante", image: "/DestinationsImage/calpe.jpg" },
    { name: "Málaga", image: "/DestinationsImage/malaga.jpg" },
    { name: "Bilbao", image: "/DestinationsImage/bilbao.jpg" },
  ];

  return (
    <div className="w-full bg-white px-6 py-24 flex flex-col items-center">
      <div className="text-center max-w-3xl mx-auto flex flex-col items-center mb-16">
        <span className="text-sm font-bold text-yellow-500 uppercase flex items-center gap-2 mb-4 tracking-widest">
          <MapPin size={16} /> Destinos
        </span>
        <h2 className="text-5xl font-bold text-black font-sans mb-5">
          Conoce las Mejores <br /> Ciudades de España
        </h2>
        <h3 className="text-base font-medium text-gray-500">
          Desde Canarias y Baleares hasta cualquier rincón de la península
        </h3>
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="relative h-100 md:h-112.5 w-full rounded-2xl overflow-hidden group cursor-pointer bg-gray-200">
            <img src="/DestinationsImage/barcelona.jpg" alt="Barcelona" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 p-8 md:p-10 flex flex-col items-start z-10 w-full">
              <span className="text-yellow-500 font-bold text-xs uppercase mb-2 drop-shadow-md">Cataluña</span>
              <h2 className="text-white font-bold text-3xl md:text-4xl font-serif mb-1">Barcelona</h2>
              <span className="text-yellow-500 text-sm flex items-center gap-2 group-hover:gap-4 transition-all duration-500">
                Descubre Barcelona <ArrowRight size={16} />
              </span>
            </div>
          </div>

          <div className="relative h-100 md:h-112.5 w-full rounded-2xl overflow-hidden group cursor-pointer bg-gray-200">
            <img src="/DestinationsImage/madrid.jpg" alt="Madrid" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 p-8 md:p-10 flex flex-col items-start z-10 w-full">
              <span className="text-yellow-500 font-bold text-xs uppercase mb-2 drop-shadow-md">Comunidad de Madrid</span>
              <h2 className="text-white font-bold text-3xl md:text-4xl font-serif mb-1">Madrid</h2>
              <span className="text-yellow-500 text-sm flex items-center gap-2 group-hover:gap-4 transition-all duration-500">
                Descubre Madrid <ArrowRight size={16} />
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {smallDestinations.map((city, index) => (
            <div key={index} className="relative h-50 md:h-68 w-full rounded-3xl overflow-hidden group cursor-pointer shadow-md bg-gray-100">
              <img src={city.image} alt={city.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/10 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 p-5 flex flex-col items-start z-10 w-full">
                <h3 className="text-white text-xl font-serif font-bold">{city.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;