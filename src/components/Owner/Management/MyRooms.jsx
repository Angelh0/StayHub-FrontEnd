import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Home/Navbar";
import Footer from "../../Home/Footer";
import {
  BedDouble, Users, Maximize, Home, Lock, Edit2, Filter, CalendarDays
} from "lucide-react";
import { authService } from "../../../services/authService";
import BlockRoom from "../../BlockRoom/BlockRoom";

const MyRooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterAcc, setFilterAcc] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomForBlocks, setRoomForBlocks] = useState(null);

  const Rooms = async () => {
    try {
      setLoading(true);
      const data = await authService.getMyRooms();
      setRooms(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const BlocksRoom = async () => {
    try {
      const data = await authService.getBlock();
      setBlocks(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Rooms();
    BlocksRoom();
  }, []);

  const handleOpenBlocks = (room) => {
    setRoomForBlocks(room);
    setIsModalOpen(true);
  };

  const handleAddBlock = async (payload) => {
    try {
      const response = await authService.createRoomBlock(roomForBlocks.uuid, payload);
      
      if (response && response.available === false) {
        alert(response.message);
        return;
      }

      await BlocksRoom();
      await Rooms();
    } catch (error) {
      const backendMessage = error.response?.data?.message || error.response?.data || "Error al crear el bloqueo. Verifica las fechas.";
      alert(backendMessage);
    }
  };

  const handleDeleteBlock = async (uuidBlock) => {
    try {
      await authService.cancelBlock(uuidBlock);
      await BlocksRoom();
      await Rooms();
    } catch (error) {
      alert("Error al cancelar el bloqueo");
    }
  };

  const uniqueAccommodations = rooms.reduce((acc, room) => {
    if (!acc.find((item) => item.uuid === room.uuidAccommodation)) {
      acc.push({ uuid: room.uuidAccommodation, name: room.nameAccommodation });
    }
    return acc;
  }, []);

  const filteredRooms = filterAcc === "all" ? rooms : rooms.filter((room) => room.uuidAccommodation === filterAcc);

  if (loading) return (
    <div className="bg-black min-h-screen flex items-center justify-center font-black uppercase text-yellow-400 animate-pulse">
      Cargando Habitaciones...
    </div>
  );

  return (
    <div className="bg-black min-h-screen text-white font-sans flex flex-col">
      <div className="sticky top-0 z-50 w-full bg-black min-h-24 flex items-center border-b border-gray-900">
        <Navbar />
      </div>

      <div className="grow max-w-6xl mx-auto w-full py-12 px-6">
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tight mb-2 uppercase text-white">Mis Habitaciones</h1>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-tighter">Gestiona las habitaciones de tus alojamientos</p>
        </div>

        <div className="mb-8 flex items-center gap-4 bg-gray-950/50 p-4 rounded-2xl border border-gray-900 w-fit">
          <Filter size={18} className="text-gray-500" />
          <select
            className="bg-black border border-gray-800 text-white text-xs font-black rounded-lg p-2 focus:border-yellow-400 outline-none uppercase cursor-pointer"
            value={filterAcc}
            onChange={(e) => setFilterAcc(e.target.value)}
          >
            <option value="all">Todos los alojamientos</option>
            {uniqueAccommodations.map((acc) => (
              <option key={acc.uuid} value={acc.uuid}>{acc.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-8">
          {filteredRooms.map((room) => (
            <div key={room.uuid} className="bg-[#0a0c10] border border-gray-900 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl transition-all hover:border-gray-700">
              <div className="relative w-full md:w-80 h-64 md:h-auto shrink-0 bg-gray-900">
                <img src={room.photos?.[0]} alt={room.type} className="w-full h-full object-cover opacity-70" />
                <div className="absolute top-4 left-4">
                  <span className="bg-black/90 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-[10px] font-black border border-white/10 uppercase tracking-widest">{room.type}</span>
                </div>
              </div>

              <div className="p-8 flex flex-col grow justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-1">{room.type}</h3>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Home size={14} className="text-yellow-500" />
                        <span className="text-[11px] font-bold uppercase tracking-tight">{room.nameAccommodation} | {room.city}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-black text-yellow-400 tracking-tighter">{room.price} €</span>
                      <span className="text-ms text-gray-600">/noche</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-gray-900/50 mb-6">
                    <div className="flex flex-col gap-1 text-center md:text-left">
                      <div className="flex items-center gap-2 text-yellow-500 justify-center md:justify-start">
                        <BedDouble size={16} />
                        <span className="text-sm font-black text-white">{room.beds}</span>
                      </div>
                      <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Camas</p>
                    </div>
                    <div className="flex flex-col gap-1 text-center md:text-left">
                      <div className="flex items-center gap-2 text-yellow-500 justify-center md:justify-start">
                        <Users size={16} />
                        <span className="text-sm font-black text-white">{room.capacity}</span>
                      </div>
                      <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Personas</p>
                    </div>
                    <div className="flex flex-col gap-1 text-center md:text-left">
                      <div className="flex items-center gap-2 text-yellow-500 justify-center md:justify-start">
                        <Maximize size={16} />
                        <span className="text-sm font-black text-white">{room.areaInSquareMeters}</span>
                      </div>
                      <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">m²</p>
                    </div>
                    <div className="flex flex-col gap-1 text-center md:text-left">
                      <div className="flex items-center gap-2 text-yellow-500 justify-center md:justify-start">
                        <Home size={16} />
                        <span className="text-sm font-black text-white">{room.room}</span>
                      </div>
                      <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Estancia</p>
                    </div>
                  </div>

                  {room.status === "Closed" && (
                    <div className="mt-2 mb-6 p-4 bg-gray-950 border border-gray-900 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CalendarDays size={16} className="text-gray-500" />
                        <span className="text-xs font-black text-gray-400 uppercase tracking-tighter">Bloqueo activo</span>
                        <span className="bg-orange-500/10 text-orange-500 text-[9px] font-black px-2 py-0.5 rounded border border-orange-500/20 uppercase">Bloqueado</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <button onClick={() => navigate(`/Modificar-Habitacion/${room.uuid}`)} className="flex-1 border border-gray-800 hover:bg-gray-900 text-white font-black py-3 rounded-xl text-[11px] uppercase tracking-widest flex items-center justify-center gap-2">
                    <Edit2 size={14} /> Modificar
                  </button>
                  <button onClick={() => handleOpenBlocks(room)} className="flex-1 bg-black border border-gray-800 hover:bg-gray-900 text-white font-black py-3 rounded-xl text-[11px] uppercase tracking-widest flex items-center justify-center gap-2">
                    <Lock size={14} /> Gestionar bloqueos
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full min-h-25 bg-black border-t border-gray-900 flex items-center justify-center">
        <Footer />
      </div>

      {isModalOpen && roomForBlocks && (
        <BlockRoom
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          room={roomForBlocks}
          blocks={blocks.filter(b => b.roomUuid === roomForBlocks.uuid || b.uuidRoom === roomForBlocks.uuid)}
          onAddBlock={handleAddBlock}
          onDeleteBlock={handleDeleteBlock}
        />
      )}
    </div>
  );
};

export default MyRooms;