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
    <div className="bg-black min-h-screen flex items-center justify-center font-medium text-yellow-500 animate-pulse">
      Cargando habitaciones...
    </div>
  );

  return (
    <div className="bg-black min-h-screen text-white font-sans flex flex-col">
      <div className="sticky top-0 z-50 w-full bg-black min-h-24 flex items-center border-b border-gray-900">
        <Navbar />
      </div>

      <div className="grow max-w-6xl mx-auto w-full py-12 px-6">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2 text-white">Mis Habitaciones</h1>
          <p className="text-gray-400 text-sm font-medium">Gestiona las habitaciones de tus alojamientos</p>
        </div>

        <div className="mb-8 flex items-center gap-3 bg-[#080808] p-3 rounded-xl border border-gray-900 w-fit">
          <Filter size={16} className="text-gray-500 ml-1" />
          <select
            className="bg-transparent text-gray-300 text-sm font-medium rounded-lg p-1.5 focus:outline-none cursor-pointer"
            value={filterAcc}
            onChange={(e) => setFilterAcc(e.target.value)}
          >
            <option value="all" className="bg-gray-900">Todos los alojamientos</option>
            {uniqueAccommodations.map((acc) => (
              <option key={acc.uuid} value={acc.uuid} className="bg-gray-900">{acc.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-6">
          {filteredRooms.map((room) => (
            <div key={room.uuid} className="bg-[#080808] border border-gray-900 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl transition-all hover:border-gray-800">
              <div className="relative w-full md:w-72 h-64 md:h-auto shrink-0 bg-gray-900">
                <img src={room.photos?.[0]} alt={room.type} className="w-full h-full object-cover opacity-80" />
                <div className="absolute top-4 left-4">
                  <span className="bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded text-[11px] font-medium border border-white/10">
                    {room.type}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col grow justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Habitación {room.type}</h3>
                      <div className="flex items-center gap-1.5 text-gray-400 mt-1.5">
                        <Home size={14} className="text-yellow-500" />
                        <span className="text-sm font-medium">{room.nameAccommodation} | {room.city}</span>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <div className="flex items-end gap-1">
                        <span className="text-2xl font-bold text-yellow-500 leading-none">{room.price}</span>
                        <span className="text-lg font-bold text-yellow-500 leading-none mb-1px">€</span>
                      </div>
                      <span className="text-xs text-gray-500 mt-1.5">/ noche</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-gray-900/60 mb-6 mt-2">
                    <div className="flex flex-col gap-1.5 text-center md:text-left">
                      <div className="flex items-center gap-2 text-yellow-500 justify-center md:justify-start">
                        <BedDouble size={16} />
                        <span className="text-sm font-medium text-gray-200">{room.beds}</span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium">Camas</p>
                    </div>
                    <div className="flex flex-col gap-1.5 text-center md:text-left">
                      <div className="flex items-center gap-2 text-yellow-500 justify-center md:justify-start">
                        <Users size={16} />
                        <span className="text-sm font-medium text-gray-200">{room.capacity}</span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium">Personas</p>
                    </div>
                    <div className="flex flex-col gap-1.5 text-center md:text-left">
                      <div className="flex items-center gap-2 text-yellow-500 justify-center md:justify-start">
                        <Maximize size={16} />
                        <span className="text-sm font-medium text-gray-200">{room.areaInSquareMeters}</span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium">m²</p>
                    </div>
                    <div className="flex flex-col gap-1.5 text-center md:text-left">
                      <div className="flex items-center gap-2 text-yellow-500 justify-center md:justify-start">
                        <Home size={16} />
                        <span className="text-sm font-medium text-gray-200">{room.room}</span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium">Estancia</p>
                    </div>
                  </div>

                  {room.status === "Closed" && (
                    <div className="mt-2 mb-6 p-3 bg-gray-950/50 border border-gray-900 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <CalendarDays size={16} className="text-gray-500" />
                        <span className="text-sm font-medium text-gray-400">Bloqueo activo</span>
                        <span className="bg-orange-500/10 text-orange-500 text-[10px] font-medium px-2 py-1 rounded border border-orange-500/20 ml-2">Bloqueado</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <button onClick={() => navigate(`/Modificar-Habitacion/${room.uuid}`)} className="flex-1 border border-gray-800 hover:bg-gray-900 text-gray-300 hover:text-white font-medium py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                    <Edit2 size={16} /> Modificar
                  </button>
                  <button onClick={() => handleOpenBlocks(room)} className="flex-1 bg-[#111] border border-gray-800 hover:bg-gray-900 text-white font-medium py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                    <Lock size={16} /> Gestionar bloqueos
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