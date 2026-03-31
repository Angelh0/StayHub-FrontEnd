import React, { useState, useEffect } from 'react';
import { X, Calendar, Trash2, Plus } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const BlockRoom = ({ room, isOpen, onClose, onAddBlock, onDeleteBlock, blocks }) => {
  const [activeTab, setActiveTab] = useState('list');
  
  const initialState = {
    blockType: 'Maintenance',
    blockStartDate: new Date(),
    endStartDate: new Date(),
    reason: ''
  };

  const [newBlock, setNewBlock] = useState(initialState);

  useEffect(() => {
    if (!isOpen) {
      setNewBlock(initialState);
      setActiveTab('list');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isFinalizado = (dateStr) => {
    if (!dateStr) return false;
    const parts = dateStr.split(/[/ -]/);
    const date = parts[0].length === 4 
      ? new Date(parts[0], parts[1] - 1, parts[2]) 
      : new Date(parts[2], parts[1] - 1, parts[0]);
    return date < new Date();
  };

  const handleCreate = () => {
    if (!newBlock.blockStartDate || !newBlock.endStartDate) return;

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const payload = {
      blockStartDate: formatDate(newBlock.blockStartDate),
      endStartDate: formatDate(newBlock.endStartDate),
      reason: newBlock.reason,
      blockType: newBlock.blockType
    };

    onAddBlock(payload);
    
    setNewBlock(initialState);
    setActiveTab('list');
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-100 flex items-center justify-center p-4">
      <div className="bg-gray-950 border border-gray-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
        
        <div className="p-6 border-b border-gray-900 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 text-yellow-400 mb-1">
              <h2 className="text-xl font-bold uppercase tracking-tight">Gestionar Bloqueos</h2>
            </div>
            <p className="text-gray-500 text-sm">
              Habitación <span className="text-white font-medium">{room?.type}</span> de {room?.nameAccommodation}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-4 bg-gray-900/30 flex gap-2">
          <button 
            type="button"
            onClick={() => setActiveTab('list')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl font-bold text-sm border ${activeTab === 'list' ? 'bg-gray-800 border-yellow-400 text-white' : 'bg-transparent border-gray-800 text-gray-500'}`}
          >
            <Calendar size={16} /> Bloqueos <span className="ml-1 bg-gray-700 px-1.5 rounded text-[10px]">{blocks?.length || 0}</span>
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('create')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl font-bold text-sm transition-all border ${activeTab === 'create' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-transparent border-gray-800 text-gray-500'}`}
          >
            <Plus size={16} /> Crear nuevo
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'list' ? (
            <div className="space-y-4">
              {!blocks || blocks.length === 0 ? (
                <div className="text-center py-10 text-gray-600">No hay bloqueos registrados.</div>
              ) : (
                blocks.map((block) => (
                  <div key={block.uuid} className="bg-gray-900/50 border border-gray-800 p-4 rounded-xl relative group">
                    <div className="flex gap-2 mb-2">
                      <span className="bg-yellow-400/10 text-yellow-500 text-[10px] font-black uppercase px-2 py-0.5 rounded">
                        {block.blockType}
                      </span>
                      {isFinalizado(block.blockEndDate) && (
                        <span className="bg-gray-800 text-gray-400 text-[10px] font-black uppercase px-2 py-0.5 rounded">
                          Finalizado
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm font-medium">
                      {block.blockStartDate} — {block.blockEndDate}
                    </p>
                    {block.reason && (
                      <p className="text-gray-500 text-xs mt-2">"{block.reason}"</p>
                    )}
                    <button 
                      onClick={() => onDeleteBlock(block.uuid)}
                      className="absolute top-4 right-4 text-gray-700 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label htmlFor="blockType" className="block text-xs font-black uppercase text-gray-500 mb-2 tracking-widest">Tipo de bloqueo</label>
                <select 
                  id="blockType"
                  name="blockType"
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-yellow-400"
                  value={newBlock.blockType}
                  onChange={(e) => setNewBlock({...newBlock, blockType: e.target.value})}
                >
                  <option value="Maintenance">Mantenimiento</option>
                  <option value="Personal">Uso personal</option>
                  <option value="Seasonal_Closure">Cierre por temporada</option>
                  <option value="Other">Otros</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-gray-500 mb-2 tracking-widest">Rango de fechas</label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <DatePicker
                      id="blockStartDate"
                      name="blockStartDate"
                      selected={newBlock.blockStartDate}
                      onChange={(date) => setNewBlock({...newBlock, blockStartDate: date})}
                      className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-white text-sm outline-none"
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                  <div className="flex-1">
                    <DatePicker
                      id="endStartDate"
                      name="endStartDate"
                      selected={newBlock.endStartDate}
                      onChange={(date) => setNewBlock({...newBlock, endStartDate: date})}
                      className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-white text-sm outline-none"
                      dateFormat="dd/MM/yyyy"
                      minDate={newBlock.blockStartDate}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="reason" className="block text-xs font-black uppercase text-gray-500 mb-2 tracking-widest">Motivo</label>
                <textarea 
                  id="reason"
                  name="reason"
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-white text-sm h-24 resize-none focus:border-yellow-400 outline-none"
                  value={newBlock.reason}
                  onChange={(e) => setNewBlock({...newBlock, reason: e.target.value})}
                />
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-900 flex gap-3">
          <button 
            type="button"
            onClick={onClose} 
            className="flex-1 py-3 text-gray-400 font-bold uppercase text-xs"
          >
            Cancelar
          </button>
          {activeTab === 'create' && (
            <button 
              type="button"
              onClick={handleCreate}
              className="flex-2 py-3 bg-yellow-400 text-black font-black uppercase text-xs rounded-xl"
            >
              Crear bloqueo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlockRoom;