import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  CalendarDays,
  Users,
  Search,
  BedDouble,
  Mouse,
} from "lucide-react";
import { authService } from "../../services/authService";

const cities = [
  { name: "Madrid", url: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=2070" },
  { name: "Sevilla", url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2070" },
  { name: "Granada", url: "https://images.unsplash.com/photo-1523428096881-5bd79d043006?q=80&w=2070" },
  { name: "Palma", url: "https://images.unsplash.com/photo-1516815231560-8f41ec531527?q=80&w=2070" },
  { name: "Cataluña", url: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80" },
  { name: "Malaga", url: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&q=80" },
  { name: "Valencia", url: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=2070" },
  { name: "Tenerife", url: "https://images.unsplash.com/photo-1602521715918-e50cc83f7326?q=80&w=764" }
];

const Hero = ({ minimal = false, showScrollHint = true }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [ubication, setUbication] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [room, setRoom] = useState(1);

  useEffect(() => {
    const loadLastSearch = async () => {
      try {
        const lastSearch = await authService.getLastSearch();
        if (lastSearch) {
          setUbication(lastSearch.city || "");
          setCapacity(lastSearch.capacity || 1);
          setRoom(lastSearch.room || 1);

          const formatDateForInput = (dateStr) => {
            if (!dateStr) return "";
            if (dateStr.includes('/')) {
              const [d, m, y] = dateStr.split('/');
              return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
            }
            return dateStr;
          };

          setCheckIn(formatDateForInput(lastSearch.checkIn));
          setCheckOut(formatDateForInput(lastSearch.checkOut));
        }
      } catch (error) {
        console.error("Error recuperando Last Search:", error);
      }
    };
    loadLastSearch();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const dataSearch = {
      city: ubication,
      checkIn: checkIn,
      checkOut: checkOut,
      capacity: capacity,
      room: room,
    };
    navigate("/Busqueda-Alojamientos", { state: dataSearch });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === cities.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full overflow-hidden bg-black font-sans ${minimal ? 'h-full' : 'h-165'}`}>
      {cities.map((city, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-center bg-cover ${
            index === current ? "opacity-60" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${city.url})` }}
        ></div>
      ))}

      {minimal && <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/40 to-black"></div>}

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white w-full">
        
        {!minimal && (
          <>
            <h1 className="flex items-center cursor-pointer select-none text-6xl md:text-6xl font-black leading-[0.9] tracking-tighter uppercase drop-shadow-2xl">
              Descubre España con St
              <MapPin size={49} className="text-yellow-400" />
              yHub
            </h1>
            <p className="mt-4 text-xl md:text-2xl font-bold text-yellow-400 tracking-tight max-w-2xl">
              ¿Cuál es tu próximo destino?
            </p>
          </>
        )}

        <form 
          onSubmit={handleSubmit}
          className={`${minimal ? "mt-0" : "mt-12"} w-full max-w-7xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 flex flex-col lg:flex-row items-center`}
        >
          <div className="flex items-center gap-4 flex-1 p-5 w-full">
            <MapPin className="text-yellow-400 size-6" />
            <div className="flex flex-col items-start w-full">
              <span className="font-black uppercase text-white/60 text-[10px] tracking-widest">Destino</span>
              <input
                type="text"
                value={ubication}
                onChange={(e) => setUbication(e.target.value)}
                placeholder="¿A dónde vas?"
                className="bg-transparent text-white font-bold text-lg placeholder:text-white/40 outline-none w-full"
              />
            </div>
          </div>

          <div className="h-10 w-px bg-white/20 hidden lg:block"></div>

          <div className="flex items-center gap-4 flex-1 p-5 w-full">
            <CalendarDays className="text-yellow-400 size-6" />
            <div className="flex flex-col items-start w-full">
              <span className="font-black uppercase text-white/60 text-[10px] tracking-widest">CheckIn</span>
              <input
                type="date"
                value={checkIn}
                className="bg-transparent text-white font-bold outline-none cursor-pointer w-full"
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
          </div>

          <div className="h-10 w-px bg-white/20 hidden lg:block"></div>

          <div className="flex items-center gap-4 flex-1 p-5 w-full">
            <CalendarDays className="text-yellow-400 size-6" />
            <div className="flex flex-col items-start w-full">
              <span className="font-black uppercase text-white/60 text-[10px] tracking-widest">CheckOut</span>
              <input
                type="date"
                value={checkOut}
                className="bg-transparent text-white font-bold outline-none cursor-pointer w-full"
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>

          <div className="h-10 w-px bg-white/20 hidden lg:block"></div>

          <div className="flex items-center gap-4 flex-1 p-5 w-full">
            <Users className="text-yellow-400 size-6" />
            <div className="flex flex-col items-start w-full">
              <span className="font-black uppercase text-white/60 text-[10px] tracking-widest">Huéspedes</span>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="bg-transparent text-white font-bold outline-none w-full"
              />
            </div>
          </div>

          <div className="h-10 w-px bg-white/20 hidden lg:block"></div>

          <div className="flex items-center gap-4 flex-1 p-5 w-full">
            <BedDouble className="text-yellow-400 size-6" />
            <div className="flex flex-col items-start w-full">
              <span className="font-black uppercase text-white/60 text-[10px] tracking-widest">Habitaciones</span>
              <input
                type="number"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="bg-transparent text-white font-bold outline-none w-full"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-yellow-400 hover:bg-white text-blue-950 p-6 rounded-2xl transition-all shadow-lg lg:ml-4 w-full lg:w-auto flex items-center justify-center group cursor-pointer"
          >
            <Search className="size-7 group-hover:scale-110 transition-transform" strokeWidth={3} />
          </button>
        </form>

        {!minimal && (
          <>
            <div className="mt-10 flex flex-wrap justify-center gap-4 md:gap-8 opacity-80">
              {["Tenerife", "Barcelona", "Madrid", "Sevilla", "Valencia", "Bilbao"].map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setUbication(city)}
                  className="text-xs font-black uppercase tracking-widest border-b-2 border-transparent hover:border-yellow-400 hover:text-white pb-1 transition-all cursor-pointer"
                >
                  {city}
                </button>
              ))}
            </div>

            {showScrollHint && (
              <div className="flex flex-col gap-5 absolute text-center items-center bottom-10">
                <h2 className="text-xl text-white font-bold italic drop-shadow-md">
                  Desliza para conocer alguno de nuestros mejores alojamientos
                </h2>
                <Mouse className="text-yellow-400 animate-bounce size-8 drop-shadow-lg" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Hero;