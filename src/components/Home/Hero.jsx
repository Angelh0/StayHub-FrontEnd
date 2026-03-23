import React, { useState, useEffect } from "react";
import {
  MapPin,
  CalendarDays,
  Users,
  Search,
  ChevronDown,
  BedDouble,
  Mouse,
} from "lucide-react";

const cities = [
  {
    name: "Madrid",
    url: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=2070",
  },
  {
    name: "Sevilla",
    url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2070",
  },
  {
    name: "Granada",
    url: "https://images.unsplash.com/photo-1523428096881-5bd79d043006?q=80&w=2070",
  },
  {
    name: "Palma",
    url: "https://images.unsplash.com/photo-1516815231560-8f41ec531527?q=80&w=2070",
  },
  {
    name: "Cataluña",
    url: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
  },
  {
    name: "Malaga",
    url: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&q=80",
  },
  {
    name: "Valencia",
    url: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=2070",
  },
  {
    name:"Tenerife",
    url: "https://images.unsplash.com/photo-1602521715918-e50cc83f7326?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [Ubication, setUbication] = useState("");
  const [CheckIn, setCheckIn] = useState("");
  const [CheckOut, setCheckOut] = useState("");
  const [Capacity, setCapacity] = useState(1);
  const [Room, setRoom] = useState(1);

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (!Ubication) {
      alert("Debes introducir la ubicacion");
      return;
    }

    if (!CheckIn) {
      alert("¿Cuando quieres hospedarte?");
      return;
    }

    if (!CheckOut) {
      alert("Introduce la fecha de salida");
    }

    const dataSearch = {
      city: Ubication,
      checkIn: CheckIn,
      checkOut: CheckOut,
      capacity: Capacity,
      room: Room,
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === cities.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black font-sans">
      {cities.map((city, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-150 ease-in-out  bg-center bg-cover ${index === current ? "opacity-40" : "opacity-0"}`}
          style={{ backgroundImage: `url(${city.url})` }}
        ></div>
      ))}

    <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-yellow-400">
        <h1 className="flex items-center cursor-pointer select-none text-6xl md:text-6xl font-black leading-[0.9] tracking-tighter uppercase  drop-shadow-2xl">
          Descubre España con St
          <MapPin
            size={49}
            className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]"
          />
          yHub
        </h1>
        <p className="mt-4 text-xl md:text-2xl font-bold text-white tracking-tight max-w-2xl">
          ¿Cuál es tu proximo destino?
        </p>

        <div className="mt-12 w-full max-w-7xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 flex flex-col lg:flex-row items-center">
          <div className="flex items-center gap-4 flex-1 p-5 w-full">
            <MapPin className="text-yellow-400 size-6" />
            <div className="flex flex-col items-start">
              <span className="font-black uppercase text-white/60 tracking-widest">
                Destino
              </span>
              <input
                type="text"
                onChange={(e) => setUbication(e.target.value)}
                placeholder="¿A dónde vas?"
                className="bg-transparent text-white font-bold text-lg placeholder:text-white/40 outline-none w-full"
              />
            </div>
          </div>
          <div className="h-10 w-1 bg-white/20 hidden lg:block"></div>

          <div className="flex items-center gap-4 flex-1 p-5 w-full">
            <CalendarDays className="text-yellow-400 size-6" />
            <div className="flex flex-col items-start">
              <span className="text-10px font-black uppercase text-white/60 tracking-widest">
                CheckIn
              </span>
              <input
                type="date"
                onChange={(e) => setCheckIn(e.target.value)}
              ></input>
            </div>
          </div>

          <div className="h-10 w-1 bg-white/20 hidden lg:block"></div>

          <div className="flex items-center gap-4 flex-1 p-5 w-full">
            <CalendarDays className="text-yellow-400 size-6" />
            <div className="flex flex-col items-start">
              <span className="text-10px font-black uppercase text-white/60 tracking-widest">
                CheckOut
              </span>
              <input
                type="date"
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>

          <div className="h-10 w-1 bg-white/20 hidden lg:block"></div>

          <div className="flex items-center gap-4 flex-1 p-5 w-full">
            <Users className="text-yellow-400 size-6" />
            <div className="flex flex-col items-start">
              <span className="text-10px font-black uppercase text-white/60 tracking-widest">
                Huéspedes
              </span>
              <input
                type="number"
                min={1}
                max={20}
                value={Capacity}
                onChange={(e) => setCapacity(e.target.value)}
              ></input>
            </div>
          </div>

          <div className="h-10 w-1 bg-white/20 hidden lg:block"></div>

          <div className="flex items-center gap-4 flex-1 p-5 w-full">
            <BedDouble className="text-yellow-400 size-6" />
            <div className="flex flex-col items-start">
              <span className="text-10px font-black uppercase text-white/60 tracking-widest">
                Habitaciones
              </span>
              <input
                type="number"
                min={1}
                max={10}
                value={Room}
                onChange={(e) => setRoom(e.target.value)}
              />
            </div>
          </div>

          <button
            className="bg-yellow-400 hover:bg-white text-blue-950 p-6 rounded-2xl transition-all shadow-lg lg:ml-4 w-full lg:w-auto flex items-center justify-center group"
            onClick={HandleSubmit}
          >
            <Search
              className="size-7 group-hover:scale-110 transition-transform"
              strokeWidth={3}
            />
          </button>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4 md:gap-8 opacity-80">
          {[
            "Tenerife",
            "Barcelona",
            "Madrid",
            "Sevilla",
            "Valencia",
            "Bilbao",
          ].map((city) => (
            <button
              key={city}
              className="text-xs font-black uppercase tracking-widest border-b-2 border-transparent hover:border-yellow-400 hover:text-white pb-1 transition-all"
            >
              {city}
            </button>
          ))}
        </div>


        <div className="flex flex-col gap-5 absolute text-center items-center bottom-35">
          <h2 className="text-2xl text-white font-bold italic shadow-2xl">
            Desliza para conocer alguno de nuestros mejores alojamientos
          </h2>
          <Mouse className="text-yellow-400 animate-bounce size-8 drop-shadow-lg"></Mouse>
        </div>
      </div>
    </div>
  );
};

export default Hero;
