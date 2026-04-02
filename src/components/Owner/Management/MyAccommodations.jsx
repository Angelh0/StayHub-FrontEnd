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
    const month = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
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
    <div className="bg-black min-h-screen flex items-center justify-center font-medium text-yellow-500 animate-pulse">
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
            <h1 className="text-3xl font-bold">Mis Alojamientos</h1>
            <p className="text-gray-400 text-sm mt-2">Gestiona tus alojamientos publicados y borradores</p>
          </div>
          <button onClick={() => navigate("/CreateAccommodation")} className="bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-black font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm transition-colors">
            <Plus size={18} strokeWidth={2.5} /> Crear alojamiento
          </button>
        </div>

        <div className="flex gap-3 mb-12">
          <button 
            onClick={() => setFilter("Active")}
            className={`flex items-center gap-2.5 border px-5 py-2.5 rounded-xl transition-all cursor-pointer ${filter === "Active" ? "bg-[#111] border-gray-700" : "bg-transparent border-gray-900 text-gray-500 hover:text-white"}`}
          >
            <CheckCircle2 size={18} className={filter === "Active" ? "text-green-500" : ""} />
            <span className="text-sm font-medium">Publicados ({publicados.length})</span>
          </button>
          <button 
            onClick={() => setFilter("Draft")}
            className={`flex items-center gap-2.5 border px-5 py-2.5 rounded-xl transition-all cursor-pointer ${filter === "Draft" ? "bg-[#111] border-gray-700" : "bg-transparent border-gray-900 text-gray-500 hover:text-white"}`}
          >
            <FileText size={18} className={filter === "Draft" ? "text-yellow-500" : ""} />
            <span className="text-sm font-medium">Borradores ({borradores.length})</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayList.map((acc) => {
            const isDraft = acc.status === 'Draft';
            const missingItems = getMissingItems(acc);
            const mainPhoto = acc.photos?.[0] || acc.rooms?.[0]?.photos?.[0];

            return (
              <div key={acc.uuid} className="bg-[#080808] border border-gray-900 rounded-2xl overflow-hidden flex flex-col shadow-2xl transition-all hover:border-gray-800">
                
                <div className="relative h-60 bg-black flex items-center justify-center">
                  {mainPhoto ? (
                    <img 
                      src={mainPhoto} 
                      className="w-full h-full object-cover brightness-90" 
                      alt={acc.name}
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-gray-600">
                      <Home size={40} strokeWidth={1.5} />
                      <span className="text-sm font-medium">Sin fotos</span>
                    </div>
                  )}
                  
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1.5 rounded-md text-[11px] font-medium ${isDraft ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-500' : 'bg-green-500/10 border border-green-500/20 text-green-500'}`}>
                      {isDraft ? 'Borrador' : 'Publicado'}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col gap-4 grow">
                  <div>
                    <span className="text-gray-300 font-medium text-xs bg-gray-900/60 border border-gray-800 px-2.5 py-1 rounded text-[11px] mb-3 inline-block">
                      {acc.type || "Alojamiento"}
                    </span>
                    <h3 className="text-xl font-bold mb-1.5">{acc.name || "Sin nombre"}</h3>
                    <div className="flex items-center gap-1.5 text-yellow-500">
                      <MapPin size={14} strokeWidth={2.5} />
                      <span className="text-sm font-medium text-gray-400">{acc.city || "Sin ciudad"}</span>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 min-h-10">
                    {acc.description || "Sin descripción..."}
                  </p>

                  <div className="flex items-center gap-8 py-2 border-y border-gray-900/60">
                    <div className="flex items-center gap-2">
                      <BedDouble size={18} className="text-yellow-500" />
                      <span className="text-sm text-gray-300 font-medium">{acc.rooms?.length || 0} habitaciones</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-yellow-500" />
                      <span className="text-sm text-gray-300 font-medium">
                        {acc.minStay === 0 && acc.maxStay === 0 ? "Sin completar" : `${acc.minStay}-${acc.maxStay} días`}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-2 italic">Meses activos:</p>
                    <div className="flex flex-wrap gap-2">
                      {acc.availabilityCalendar?.calendarMonth?.length > 0 ? (
                        [...acc.availabilityCalendar.calendarMonth]
                          .sort((a, b) => a - b)
                          .map(mesNum => (
                          <span key={mesNum} className="bg-yellow-500/5 text-yellow-500 border border-yellow-500/20 px-2.5 py-1 rounded text-[11px] font-medium">
                            {getMonthName(mesNum)}
                          </span>
                        ))
                      ) : (
                        <span className="text-[11px] text-gray-500 font-medium">Calendario no configurado</span>
                      )}
                    </div>
                  </div>

                  {isDraft && missingItems.length > 0 && (
                    <div className="bg-[#111] border border-yellow-600/30 rounded-xl p-4 mt-2">
                      <h4 className="text-yellow-500 font-medium text-sm mb-2">Falta por completar:</h4>
                      <ul className="text-gray-400 text-sm flex flex-col gap-1.5">
                        {missingItems.map(item => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {isDraft && missingItems.length === 0 && (
                    <div className="bg-[#001a09] border border-green-600/30 rounded-xl p-4 mt-2">
                      <h4 className="text-green-500 font-medium text-sm mb-2">¡Todo listo!</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Tu alojamiento ya está listo, será visible en los resultados de búsqueda.
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3 mt-auto pt-6">
                    {isDraft && missingItems.length > 0 ? (
                      <>
                        <button 
                          onClick={() => navigate(`/Edit-Draft/${acc.uuid}`)}
                          className="flex-1 flex bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-xl text-sm items-center justify-center gap-2 transition-colors"
                        >
                          Completar <ArrowRight size={18} />
                        </button>
                        <button 
                          onClick={() => navigate(`/Add-Room/${acc.uuid}`)}
                          className="flex-1 bg-transparent border border-gray-800 hover:bg-gray-900 text-white font-medium py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"
                        >
                          <Plus size={18} /> Añadir habitación
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => navigate(`/Modified-Accommodation/${acc.uuid}`)}
                          className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"
                        >
                          Modificar <ArrowRight size={18} />
                        </button>
                        <button 
                          onClick={() => navigate(`/Add-Room/${acc.uuid}`)}
                          className="flex-1 bg-transparent border border-gray-800 hover:bg-gray-900 text-white font-medium py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"
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