import React, { useEffect, useState } from "react";
import Navbar from "../../Home/Navbar";
import Footer from "../../Home/Footer";
import { 
  MapPin, 
  BedDouble, 
  Calendar, 
  Plus, 
  CheckCircle2, 
  FileText, 
  ArrowRight,
  Home
} from "lucide-react";
import { authService } from "../../../services/authService";
import { useNavigate } from "react-router-dom";

const MyAccommodations = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Draft");
  const navigate = useNavigate();

  useEffect(() => {
    const Accommodations = async () => {
      try {
        setLoading(true);
        const data = await authService.getMyAccommodations();
        setAccommodations(data);
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    Accommodations();
  }, []);

  const publicados = accommodations.filter(acc => acc.status === "Active" || acc.status === "Published");
  const borradores = accommodations.filter(acc => acc.status === "Draft");
  const displayList = filter === "Active" ? publicados : borradores;

  const getMonthName = (monthNumber) => {
    const month = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    return month[monthNumber - 1] || monthNumber;
  };

  const getMissingItems = (acc) => {
    const missing = [];
    if (!acc.minStay || !acc.maxStay || (acc.minStay === 0 && acc.maxStay === 0)) {
      missing.push("Configuración de estancia");
    }
    if (!acc.availabilityCalendar?.calendarMonth || acc.availabilityCalendar.calendarMonth.length === 0) {
      missing.push("Calendario de disponibilidad");
    }
    if (!acc.photos || acc.photos.length === 0) {
      missing.push("Fotos del alojamiento");
    }
    if (!acc.rooms || acc.rooms.length === 0) {
      missing.push("Al menos 1 habitación");
    }
    return missing;
  };

  if (loading) return (
    <div className="bg-black min-h-screen flex items-center justify-center font-black uppercase text-yellow-400 animate-bounce">
      Cargando datos...
    </div>
  );

  return (
    <div className="bg-black min-h-screen text-white font-sans flex flex-col">
      <div className="sticky top-0 z-50 bg-black border-b border-gray-900 h-24 flex items-center">
        <Navbar />
      </div>

      <div className="grow max-w-400 mx-auto w-full py-12 px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight">Mis Alojamientos</h1>
            <p className="text-gray-500 text-sm mt-2 font-medium">Gestiona tus alojamientos publicados y borradores</p>
          </div>
          <button onClick={() => navigate("/CreateAccommodation")} className="bg-yellow-400 cursor-pointer text-black font-black px-6 py-3 rounded-xl flex items-center gap-2 text-xs uppercase">
            <Plus size={18} strokeWidth={3} /> Crear alojamiento
          </button>
        </div>

        <div className="flex gap-3 mb-12">
          <button 
            onClick={() => setFilter("Active")}
            className={`flex items-center gap-3 border px-6 py-3.5 rounded-2xl transition-all ${filter === "Active" ? "bg-black border-gray-700" : "bg-transparent border-gray-900 opacity-50"}`}
          >
            <CheckCircle2 size={18} className="text-green-500" />
            <span className="text-xs font-black uppercase tracking-wider">Publicados ({publicados.length})</span>
          </button>
          <button 
            onClick={() => setFilter("Draft")}
            className={`flex items-center gap-3 border px-6 py-3.5 rounded-2xl transition-all ${filter === "Draft" ? "bg-black border-gray-700" : "bg-transparent border-gray-900 opacity-50"}`}
          >
            <FileText size={18} className="text-yellow-500" />
            <span className="text-xs font-black uppercase tracking-wider">Borradores ({borradores.length})</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayList.map((acc) => {
            const isDraft = acc.status === 'Draft';
            const missingItems = getMissingItems(acc);
            const mainPhoto = acc.photos?.[0] || acc.rooms?.[0]?.photos?.[0];

            return (
              <div key={acc.uuid} className="bg-black border border-gray-900 rounded-2xl overflow-hidden flex flex-col shadow-2xl transition-all hover:border-gray-800">
                
                <div className="relative h-60 bg-black flex items-center justify-center">
                  {mainPhoto ? (
                    <img 
                      src={mainPhoto} 
                      className="w-full h-full object-cover brightness-90" 
                      alt={acc.name}
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-gray-600">
                      <Home size={48} strokeWidth={1.5} />
                      <span className="text-sm font-medium">Sin fotos</span>
                    </div>
                  )}
                  
                  <div className="absolute top-4 left-4">
                    <span className={`px-4 py-1.5 rounded-lg text-xs font-bold ${isDraft ? 'bg-yellow-400 text-black' : 'bg-green-500 text-black'}`}>
                      {isDraft ? 'Borrador' : 'Publicado'}
                    </span>
                  </div>
                </div>

                <div className="p-7 flex flex-col gap-5 grow">
                  <div>
                    <span className="text-white font-bold text-xs bg-gray-900 px-3 py-1 rounded-md mb-3 inline-block">
                      {acc.type || "Alojamiento"}
                    </span>
                    <h3 className="text-2xl font-black tracking-tight mb-2">{acc.name || "Sin nombre"}</h3>
                    <div className="flex items-center gap-1.5 text-yellow-500">
                      <MapPin size={16} strokeWidth={2.5} />
                      <span className="text-sm font-medium text-gray-400">{acc.city || "Sin ciudad"}</span>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 min-h-10">
                    {acc.description || "Sin descripción..."}
                  </p>

                  <div className="flex items-center gap-8 py-2">
                    <div className="flex items-center gap-2">
                      <BedDouble size={20} className="text-yellow-400" />
                      <span className="text-sm text-gray-300 font-medium">{acc.rooms?.length || 0} habitaciones</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={20} className="text-yellow-400" />
                      <span className="text-sm text-gray-300 font-medium">
                        {acc.minStay === 0 && acc.maxStay === 0 ? "Sin completar" : `${acc.minStay}-${acc.maxStay} días`}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-[9px] text-gray-600 font-black uppercase mb-3 tracking-widest italic">Meses activos:</p>
                    <div className="flex flex-wrap gap-2">
                      {acc.availabilityCalendar?.calendarMonth?.length > 0 ? (
                        [...acc.availabilityCalendar.calendarMonth]
                          .sort((a, b) => a - b)
                          .map(mesNum => (
                          <span key={mesNum} className="bg-yellow-500/5 text-yellow-500 border border-yellow-500/20 px-2 py-1 rounded-md text-[9px] font-black uppercase">
                            {getMonthName(mesNum)}
                          </span>
                        ))
                      ) : (
                        <span className="text-[9px] text-gray-700 font-bold uppercase">Calendario no configurado</span>
                      )}
                    </div>
                  </div>

                  {isDraft && missingItems.length > 0 && (
                    <div className="bg-black border border-yellow-600/30 rounded-xl p-5 mt-2">
                      <h4 className="text-yellow-500 font-bold text-sm mb-2">Falta por completar:</h4>
                      <ul className="text-gray-400 text-sm flex flex-col gap-1">
                        {missingItems.map(item => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {isDraft && missingItems.length === 0 && (
                    <div className="bg-[#001a09] border border-green-600/30 rounded-xl p-5 mt-2">
                      <h4 className="text-green-500 font-bold text-sm mb-2">¡Todo listo!</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Tu alojamiento ya esta listo, será visible en el momento que se realice una búsqueda en la que deba aparecer tu alojamiento
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3 mt-auto pt-6">
                    {isDraft && missingItems.length > 0 ? (
                      <>
                        <button 
                          onClick={() => navigate(`/Edit-Draft/${acc.uuid}`)}
                          className="flex-1 flex bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3.5 rounded-xl text-sm items-center justify-center gap-2"
                        >
                          Completar <ArrowRight size={18} />
                        </button>
                        <button 
                          onClick={() => navigate(`/Add-Room/${acc.uuid}`)}
                          className="flex-1 bg-black border border-gray-800 hover:bg-gray-900 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2"
                        >
                          <Plus size={18} /> Añadir habitación
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => navigate(`/Modified-Accommodation/${acc.uuid}`)}
                          className="flex-1 bg-yellow-400 text-black font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2"
                        >
                          Modificar <ArrowRight size={18} />
                        </button>
                        <button 
                          onClick={() => navigate(`/Add-Room/${acc.uuid}`)}
                          className="flex-1 bg-black border border-gray-800 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2"
                        >
                          <Plus size={18} /> Añadir habitación
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyAccommodations;