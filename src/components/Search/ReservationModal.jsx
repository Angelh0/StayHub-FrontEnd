import React from "react";
import { BedDouble, Calendar, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

const ReservationModal = ({ isOpen, onClose, room, searchData, accommodation, nights }) => {
  const navigate = useNavigate();

  if (!isOpen || !room) return null;

  const handleConfirm = async () => {
    try {
      await authService.createReservation(room.uuid);
      alert("¡Reserva confirmada con éxito!");
      onClose();
      navigate("/");
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      alert("Hubo un error al intentar crear la reserva.");
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-3xl w-full max-w-md p-6 text-white shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-black text-yellow-500 tracking-tight mb-1 uppercase">Confirmar Reserva</h2>
            <p className="text-xs font-bold text-gray-400 flex items-center gap-1 uppercase tracking-widest">
              <Home size={12} className="text-yellow-500" /> {accommodation?.name}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-white transition-colors text-xl p-1"
          >
            ✕
          </button>
        </div>

        <div className="bg-[#141414] border border-gray-800 rounded-2xl p-5 mb-6 flex justify-between items-center shadow-inner">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-500/10 p-3 rounded-xl border border-yellow-500/20">
               <BedDouble size={24} className="text-yellow-500" />
            </div>
            <div>
              <h3 className="font-black text-lg text-white uppercase tracking-tight">{room.type}</h3>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Hasta {room.capacity} personas</p>
            </div>
          </div>
          <div className="text-right flex flex-col">
            <span className="font-black text-2xl text-yellow-500">{room.price}€</span>
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">/noche</span>
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Calendar size={12} /> Detalles de tu estancia
          </h4>
          <div className="bg-[#141414] border border-gray-800 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400 font-bold text-xs uppercase">Check-in</span>
              <span className="font-black text-white">{searchData?.checkIn}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400 font-bold text-xs uppercase">Check-out</span>
              <span className="font-black text-white">{searchData?.checkOut}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400 font-bold text-xs uppercase">Huéspedes</span>
              <span className="font-black text-white">{searchData?.capacity} persona(s)</span>
            </div>
            
            <div className="border-t border-gray-800/60 my-2"></div>
            
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-300 font-black text-xs uppercase tracking-widest">Total ({nights} noches)</span>

              <span className="text-3xl font-black text-white tracking-tight">{room.totalPrice}€</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-4 px-4 rounded-xl font-black text-[11px] text-white bg-transparent border border-gray-800 hover:bg-gray-900 hover:border-gray-700 uppercase tracking-widest"
          >
            Cancelar
          </button>
          <button 
            onClick={handleConfirm}
            className="flex-1 py-4 px-4 rounded-xl font-black text-[11px] text-black bg-yellow-400 hover:bg-yellow-500 uppercase tracking-widest"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;