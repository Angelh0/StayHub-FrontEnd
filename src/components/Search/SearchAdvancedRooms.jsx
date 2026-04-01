import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import { MapPin, BedDouble, Users, Maximize, Calendar, ArrowLeft, Home } from "lucide-react";
import { authService } from "../../services/authService";
import ReservationModal from "./ReservationModal";

const SearchAdvancedRoom = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [accommodation, setAccommodation] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [searchData, setSearchData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  useEffect(() => {
    const loadAllData = async () => {
      setIsLoading(true);
      try {
        const lastSearch = await authService.getLastSearch();
        setSearchData(lastSearch);

        const accData = await authService.getAccommodationWithUuid(uuid);
        const advancedRoomsData = await authService.searchAdvancedRoom(uuid);

        if (advancedRoomsData && advancedRoomsData.length > 0) {
          const roomsWithPrices = await Promise.all(
            advancedRoomsData.map(async (advRoom) => {
              try {
                const baseRoomArray = await authService.getRooms(advRoom.uuid);
                const baseRoom = Array.isArray(baseRoomArray) ? baseRoomArray[0] : baseRoomArray;
                return {
                  ...advRoom,
                  basePrice: baseRoom ? baseRoom.price : advRoom.price
                };
              } catch (error) {
                return { ...advRoom, basePrice: advRoom.price };
              }
            })
          );
          setRooms(roomsWithPrices);
        } else {
          setRooms([]);
        }

        setAccommodation(accData);
      } catch (error) {
        setAccommodation(null);
        setRooms([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (uuid) loadAllData();
  }, [uuid]);

  const getNights = () => {
    if (!searchData?.checkIn || !searchData?.checkOut) return 1;
    const parseDate = (str) => {
      const clean = str.split('T')[0];
      const parts = clean.includes('-') ? clean.split('-') : clean.split('/');
      return parts[0].length === 4 ? new Date(parts[0], parts[1] - 1, parts[2]) : new Date(parts[2], parts[1] - 1, parts[0]);
    };
    const start = parseDate(searchData.checkIn);
    const end = parseDate(searchData.checkOut);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const nights = getNights();
  const mainPhoto = accommodation?.photos?.[0];

  return (
    <div className="flex flex-col min-h-screen bg-black relative text-white">
      <div className="sticky top-0 z-50 w-full bg-black min-h-24 flex items-center border-b border-gray-900">
        <Navbar />
      </div>

      {mainPhoto && (
        <div className="fixed inset-0 z-0 pointer-events-none mt-24">
          <img src={mainPhoto} alt="bg" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/90 to-black"></div>
        </div>
      )}

      <div className="grow w-full py-12 px-6 relative z-10">
        <div className="max-w-300 mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 bg-gray-950 border border-gray-800 px-4 py-2.5 rounded-xl text-xs font-black uppercase text-gray-400  cursor-pointer">
              <ArrowLeft size={16} /> Volver
            </button>

            {searchData && (
              <div className="flex-1 max-w-3xl flex items-center bg-black border border-gray-800 rounded-2xl px-6 py-4 shadow-2xl">
                <div className="flex items-center gap-3 border-r border-gray-800 pr-6 shrink-0">
                  <MapPin size={18} className="text-yellow-500" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Destino</span>
                    <span className="text-sm font-bold">{searchData.city}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 border-r border-gray-800 px-6 shrink-0">
                  <Calendar size={18} className="text-yellow-500" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Estancia</span>
                    <span className="text-sm font-bold">{searchData.checkIn} - {searchData.checkOut}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 border-r border-gray-800 px-6 shrink-0">
                  <Users size={18} className="text-yellow-500" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Huéspedes</span>
                    <span className="text-sm font-bold">{searchData.capacity} pers</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 pl-6 shrink-0">
                  <Home size={18} className="text-yellow-500" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Habitaciones</span>
                    <span className="text-sm font-bold">{searchData.room} hab</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-32 text-yellow-400 font-black uppercase animate-pulse">Cargando...</div>
          ) : !accommodation ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <h2 className="text-2xl font-black text-red-500 uppercase mb-3">Algo ha salido mal</h2>
              <button onClick={() => navigate("/")} className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-black uppercase text-xs">Volver al inicio</button>
            </div>
          ) : (
            <>
              <div className="bg-[#0a0c10]/80 backdrop-blur-xl border border-gray-900 rounded-3xl p-8 mb-12 shadow-2xl">
                <span className="text-yellow-400 border px-3 py-1.5 rounded-md text-xs font-black uppercase mb-4 inline-block tracking-widest">
                  {accommodation.type}
                </span>
                <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">{accommodation.name}</h1>
                <p className="text-gray-400 text-sm leading-relaxed border-b border-gray-900 pb-8 mb-8">{accommodation.description}</p>
                <div>
                  <h4 className="text-white font-black text-[10px] uppercase mb-4 tracking-widest">Meses disponibles:</h4>
                  <div className="flex flex-wrap gap-2">
                    {accommodation.availabilityCalendar?.calendarMonth?.sort((a,b)=>a-b).map(m => (
                      <span key={m} className="text-yellow-400 border px-3 py-1.5 rounded-lg text-xs font-bold uppercase">
                        {months[m-1]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                {rooms.map((room) => (
                  <div key={room.uuid} className="bg-black/80 border border-gray-900 rounded-3xl p-6 flex flex-col md:flex-row gap-8 shadow-2xl">
                    <img src={room.photos?.[0] || mainPhoto} className="w-full md:w-80 h-60 object-cover rounded-2xl shrink-0" alt="room" />
                    <div className="grow flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl font-black uppercase tracking-tight">Habitación {room.type}</h3>
                          <span className="text-xs text-gray-500 flex items-center gap-1 mt-1"><Home size={12}/> {accommodation.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-black text-gray-500 uppercase block mb-1">{nights} noches x {room.basePrice}€</span>
                          <div className="text-4xl font-black text-yellow-400">{room.totalPrice}€</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4 py-8 border-y border-gray-900/50 mt-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <BedDouble size={20} className="text-yellow-500" />
                          <span className="text-sm">{room.beds} Camas</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <Users size={20} className="text-yellow-500" />
                          <span className="text-sm">{room.capacity} Pers</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <Maximize size={20} className="text-yellow-500" />
                          <span className="text-sm">{room.areaInSquareMeters} m²</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <Home size={20} className="text-yellow-500" />
                          <span className="text-sm">{room.room} Estancia</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          setSelectedRoom(room);
                          setIsModalOpen(true);
                        }}
                        className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-black py-4 rounded-xl text-xs uppercase tracking-widest transition-all cursor-pointer"
                      >
                        Reservar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
      
      <ReservationModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRoom(null);
        }} 
        room={selectedRoom}
        searchData={searchData}
        accommodation={accommodation}
        nights={nights}
      />
    </div>
  );
};

export default SearchAdvancedRoom;