import React, { useState, useEffect } from "react";
import {
  MapPin,
  Star,
  Wifi,
  Snowflake,
  Bath,
  BedDouble,
  Waves,
  Tv,
  Users,
  Palmtree,
  ChevronLeft,
  ChevronRight,
  ConciergeBell,
  CigaretteOff,
  Building2,
  CookingPot,
  CircleParking,
  ArrowUpDown,
  PawPrint,
  Armchair

} from "lucide-react";

const mockFeatured = [
  {
    id: 1,
    title: "Eurostars Atlantida",
    city: "Santa Cruz de Tenerife",
    price: 150,
    rating: 8.4,
    pax: 2,
    rooms: 1,
    images: [
      "/featuredImages/Eurostars1.jpg",
      "/featuredImages/Eurostars2.jpg",
      "/featuredImages/Eurostars3.jpg",
    ],
    amenities: ["parking", "nosmoke", "elevator", "ac", "wifi", , "bath", "tv"],
  },
  {
    id: 2,
    title: "Hotel Bilbao",
    city: "Bilbao",
    price: 68,
    rating: 8.6,
    pax: 2,
    rooms: 1,
    images: [
      "/featuredImages/HotelBilbao.jpg",
      "/featuredImages/HotelBilbao2.jpg",
      "/featuredImages/HotelBilbao3.jpg",
    ],
    amenities: ["ac", "wifi", "tv", "nosmoke", "bath", "terrace", "animal"],
  },
  {
    id: 3,
    title: "Suites Del Pintor",
    city: "Malaga",
    price: 89,
    rating: 8.7,
    pax: 4,
    rooms: 1,
    images: [
      "/featuredImages/SuitesDelPintor.jpg",
      "/featuredImages/SuitesDelPintor2.jpg",
      "/featuredImages/SuitesDelPintor3.jpg",
    ],
    amenities: ["wifi", "ac", "ConciergeBell", "nosmoke", "bath", "building", "kitchen", "tv"],
  },
  {
    id: 4,
    title: "Marbella Centro",
    city: "Marbella",
    price: 100,
    rating: 9.6,
    pax: 4,
    rooms: 2,
    images: [
      "/featuredImages/MarbellaCentro.jpg",
      "/featuredImages/MarbellaCentro2.jpg",
      "/featuredImages/MarbellaCentro3.jpg",
    ],
    amenities: ["wifi", "tv", "bath", "nosmoke", "bath", "terrace", "animal", "ac"],
  },
  {
    id: 5,
    title: "Dorma Plaza",
    city: "Barcelona",
    price: 137,
    rating: 8.5,
    pax: 2,
    rooms: 1,
    images: [
      "/featuredImages/DormaPlaza.jpg",
      "/featuredImages/DormaPlaza2.jpg",
      "/featuredImages/DormaPlaza3.jpg",
    ],
    amenities: ["wifi", "bath", "terrace", "ac", "ConciergelBell", "elevator", "nosmoke"]
  },
  {
    id: 6,
    title: "Suites Gran Via",
    city: "Granada",
    price: 69,
    rating: 8.5,
    pax: 3,
    rooms: 1,
    images: [
      "/featuredImages/SuitesGranVia.jpg",
      "/featuredImages/SuitesGranVia2.jpg",
      "/featuredImages/SuitesGranVia3.jpg",
    ],
    amenities: ["wifi", "kitchen", "bath", "ac", "elevator", "nosmoke"],
  },
];

const ChangePhotos = ({ images, price }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentPhoto((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentPhoto((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative h-64 overflow-hidden group/img select-none">
      <img
        src={images[currentPhoto]}
        alt="Alojamiento"
        className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
      />

      <div className="absolute px-1 inset-0 flex items-center justify-between opacity-0 group-hover/img:opacity-100 transition-opacity z-20">
        <button
          onClick={prevImage}
          className="bg-white/80 p-1 rounded-full text-blue-950"
        >
          <ChevronLeft size={20}></ChevronLeft>
        </button>
        <button
          onClick={nextImage}
          className="bg-white/80 p-1 rounded-full text-blue-950 shadow-md"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              index === currentPhoto ? "bg-white w-6" : "bg-white/50 w-1.5"
            }`}
          />
        ))}
      </div>

      <div className="flex right-5 justify-end absolute top-5 bg-white/90 px-3 py-1 rounded-full font-black text-blue-950 z-10">
        {price}€<p className="text-xs text-gray-500">/ noche</p>
      </div>
    </div>
  );
};

const Featured = () => {
  return (
    <div className="w-full bg-gray-50 py-20 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-yellow-400 uppercase tracking-tighter italic">
          ¿No sabes donde hospedarte?
        </h2>
        <h2 className="text-xl  font-black uppercase py-2">
          Descubre alguno de nuestros alojamientso destacados
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {mockFeatured.map((hotel) => (
          <div 
            key={hotel.id} 
            className="bg-white rounded-3xl overflow-hidden duration-600 group border border-gray-100 flex flex-col h-full translate-y-0 hover:-translate-y-2"
          >
            <ChangePhotos images={hotel.images} price={hotel.price} />

            <div className="p-8 flex flex-col flex-grow: 1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-extrabold text-blue-950 leading-tight">
                  {hotel.title}
                </h3>
                <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-2xl text-sm font-black ">
                  <Star className="size-3.5 fill-yellow-500 text-yellow-500" />
                  {hotel.rating}
                </div>
              </div>

              <div className="flex items-center gap-1 text-gray-400 text-xs font-black uppercase tracking-widest mb-6">
                <MapPin className="size-3.5" />
                {hotel.city}, España
              </div>

              <div className="flex gap-6 mb-6 text-gray-500 border-b border-gray-100 pb-6">
                <div className="flex items-center gap-2">
                  <Users className="size-4 text-gray-300"/>
                  <span className="text-xs font-bold">{hotel.pax} Max</span>
                </div>
                <div className="flex items-center gap-2">
                  <BedDouble className="size-4 text-gray-300"/>
                  <span className="text-xs font-bold">{hotel.rooms} Hab</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto pt-2">
                <div className="flex gap-2.5">
                  {hotel.amenities.includes("pool") && <Waves className="size-5 text-gray-300" />}
                  {hotel.amenities.includes("ac") && <Snowflake className="size-5 text-gray-300" />}
                  {hotel.amenities.includes("wifi") && <Wifi className="size-5 text-gray-300" />}
                  {hotel.amenities.includes("palmtree") && <Palmtree className="size-5 text-gray-300" />}
                  {hotel.amenities.includes("tv") && <Tv className="size-5 text-gray-300" />}
                  {hotel.amenities.includes("bath") && <Bath className="size-5 text-gray-300" />}
                  {hotel.amenities.includes("building") && <Building2 className="size-5 text-gray-300" />}
                  {hotel.amenities.includes("nosmoke") && <CigaretteOff className="size-5 text-gray-300" />}
                  {hotel.amenities.includes("ConciergeBell") && <ConciergeBell className="size-5 text-gray-300" />}
                  {hotel.amenities.includes("kitchen") && <CookingPot className="size-5 text-gray-300" />}
                  {hotel.amenities.includes("elevator") && <ArrowUpDown className="size-5 text-gray-300" />}
                  {hotel.amenities.includes("parking") && <CircleParking className="size-5 text-gray-300" />}
                  {hotel.amenities.includes("animal") && <PawPrint className="size-5 text-gray-300" />}
                  {hotel.amenities.includes("terrace") && <Armchair className="size-5 text-gray-300" />}
                </div>
                
                <button className="text-xs font-black uppercase  text-yellow-500 hover:text-blue-950 transition-colors border-b-2 border-transparent hover:border-yellow-500 pb-1">
                  Ver más
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
