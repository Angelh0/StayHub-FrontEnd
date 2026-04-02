import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import Hero from "../Home/Hero";
import { MapPin, BedDouble, Search, ArrowRight, Calendar } from "lucide-react";
import { authService } from "../../services/authService";

const SearchAdvanced = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [accommodations, setAccommodations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useState(null);

  useEffect(() => {
    const fetchAccommodations = async () => {
      setIsLoading(true);
      try {
        let dataToUse = location.state;

        if (!dataToUse || !dataToUse.city) {
          dataToUse = await authService.getLastSearch();
        }

        if (!dataToUse || !dataToUse.city || !dataToUse.checkIn || !dataToUse.checkOut) {
          setIsLoading(false);
          return;
        }

        setSearchParams(dataToUse);

        const formatToBackendDate = (dateStr) => {
          if (!dateStr) return "";
          const cleanDate = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
          
          let date;
          if (cleanDate.includes('-')) {
            const parts = cleanDate.split('-');
            date = parts[0].length === 4 ? new Date(parts[0], parts[1] - 1, parts[2]) : new Date(cleanDate);
          } else if (cleanDate.includes('/')) {
            const parts = cleanDate.split('/');
            date = new Date(parts[2], parts[1] - 1, parts[0]);
          } else {
            date = new Date(cleanDate);
          }

          return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        };

        const formattedCheckIn = formatToBackendDate(dataToUse.checkIn);
        const formattedCheckOut = formatToBackendDate(dataToUse.checkOut);

        const data = await authService.searchAdvanced(
          dataToUse.city,
          dataToUse.room || 1,
          dataToUse.capacity || 1,
          formattedCheckIn,
          formattedCheckOut
        );

        setAccommodations(data || []);
      } catch (error) {
        setAccommodations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccommodations();
  }, [location.state]);

  const getMonthName = (monthNumber) => {
    const month = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    return month[monthNumber - 1];
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans">
      <div className="sticky top-0 z-50 w-full bg-black min-h-24 flex items-center border-b border-gray-900">
        <Navbar />
      </div>
      <div className="grow flex flex-col">
        <div className="w-full h-[35vh] border-b border-gray-900">
          <Hero minimal={true} />
        </div>
        <div className="grow w-full max-w-400 mx-auto py-12 px-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-32">
              <div className="text-yellow-500 font-medium animate-pulse flex items-center gap-3">
                <Search size={24} className="animate-spin" /> Buscando alojamientos...
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-end mb-10 pb-4 border-b border-gray-900/60">
                <h1 className="text-3xl font-bold text-white">
                  Resultados en {searchParams?.city || "tu búsqueda"}
                </h1>
                <span className="text-gray-500 font-medium text-sm mb-1">
                  {accommodations.length} alojamientos
                </span>
              </div>
              {accommodations.length === 0 ? (
                <div className="text-center py-20 border border-gray-900 border-dashed rounded-2xl">
                  <span className="text-gray-600 font-medium">No hemos encontrado habitaciones disponibles</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {accommodations.map((acc) => {
                    const activeMonthsList = acc.availabilityCalendar?.calendarMonth || [];
                    return (
                      <div key={acc.uuid} className="bg-[#080808] border border-gray-900 rounded-2xl overflow-hidden flex flex-col shadow-2xl transition-all hover:border-gray-800">
                        <div className="relative h-60 bg-black">
                          <img src={acc.photos[0]} className="w-full h-full object-cover brightness-90" alt={acc.name} />
                        </div>
                        <div className="p-6 flex flex-col gap-4 grow">
                          <div>
                            <span className="text-gray-300 font-medium text-xs bg-gray-900/60 border border-gray-800 px-2.5 py-1 rounded text-[11px] mb-3 inline-block">{acc.type}</span>
                            <h3 className="text-xl font-bold mb-1.5">{acc.name}</h3>
                            <div className="flex items-center gap-1.5 text-yellow-500">
                              <MapPin size={14} strokeWidth={2.5} /><span className="text-sm font-medium text-gray-400">{acc.city}</span>
                            </div>
                          </div>
                          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 min-h-10">{acc.description}</p>
                          <div className="flex items-center gap-8 py-2">
                            <div className="flex items-center gap-2">
                              <BedDouble size={18} className="text-yellow-500" />
                              <span className="text-sm text-gray-300 font-medium">{acc.availability} habitaciones</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar size={18} className="text-yellow-500" />
                              <span className="text-sm text-gray-300 font-medium">{acc.minStay}-{acc.maxStay} días</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-2 italic">Meses activos:</p>
                            <div className="flex flex-wrap gap-2">
                              {[...activeMonthsList].sort((a, b) => a - b).map(m => (
                                <span key={m} className="bg-yellow-500/5 text-yellow-500 border border-yellow-500/20 px-2.5 py-1 rounded text-[11px] font-medium">{getMonthName(m)}</span>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-3 mt-auto pt-6">
                            <button onClick={() => navigate(`/Busqueda-Habitaciones/${acc.uuid}`)} className="flex-1 flex bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-xl text-sm items-center justify-center gap-2 transition-colors cursor-pointer">
                              Ver habitaciones <ArrowRight size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="w-full bg-black flex items-center justify-center mt-auto border-t border-gray-900">
        <Footer />
      </div>
    </div>
  );
};

export default SearchAdvanced;