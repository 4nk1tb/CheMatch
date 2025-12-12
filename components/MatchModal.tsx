import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, MessageSquare, Phone } from 'lucide-react';
import { WasteItem } from '../types';

interface MatchModalProps {
  item: WasteItem | null;
  onClose: () => void;
}

export const MatchModal: React.FC<MatchModalProps> = ({ item, onClose }) => {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.5, y: 100, rotateX: 45 }}
            animate={{ scale: 1, y: 0, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className="relative w-full max-w-md bg-gradient-to-b from-gray-800 to-gray-900 border border-emerald-500/50 rounded-3xl p-1 shadow-[0_0_50px_rgba(16,185,129,0.2)]"
          >
            {/* Confetti simulation elements (CSS based) */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 -right-6 w-4 h-4 bg-violet-500 rounded-full animate-pulse"></div>

            <div className="bg-gray-900 rounded-[22px] p-6 text-center overflow-hidden relative">
              {/* Background Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-emerald-500/20 blur-[60px] pointer-events-none"></div>

              <h2 className="font-black text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 italic mb-2">
                It's a Match!
              </h2>
              <p className="text-gray-300 font-medium mb-8">
                ¡Simbiosis Detectada con <span className="text-white font-bold">{item.generator}</span>!
              </p>

              <div className="flex justify-center gap-6 mb-8">
                 <div className="w-24 h-24 rounded-full bg-gray-700 border-4 border-emerald-500 overflow-hidden shadow-lg">
                    {/* Placeholder for User Avatar */}
                    <div className="w-full h-full bg-emerald-900/50 flex items-center justify-center text-xs text-center p-2">
                      EcoWater
                    </div>
                 </div>
                 <div className="w-24 h-24 rounded-full bg-gray-700 border-4 border-violet-500 overflow-hidden shadow-lg">
                    {/* Placeholder for Waste Gen Avatar */}
                     <div className="w-full h-full bg-violet-900/50 flex items-center justify-center text-xs text-center p-2">
                      {item.generator.split(' ')[0]}
                    </div>
                 </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-4 mb-6 border border-white/5">
                 <p className="text-sm text-gray-400 mb-1">Residuo:</p>
                 <p className="text-white font-bold text-lg">{item.name}</p>
                 <p className="text-emerald-400 font-bold mt-1">{item.price}</p>
              </div>

              <div className="space-y-3">
                <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">
                   <MessageSquare className="w-5 h-5" />
                   Iniciar Negociación
                </button>
                <button 
                  onClick={onClose}
                  className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-xl font-semibold transition-colors border border-white/5"
                >
                  Seguir buscando
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
