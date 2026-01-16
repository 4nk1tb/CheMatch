
import React from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { MapPin, Box, Droplets, Zap, CheckCircle, XCircle, Beaker } from 'lucide-react';
import { WasteItem } from '../types';
import { GlassCard } from './ui/GlassCard';

interface SwipeCardProps {
  item: WasteItem;
  onSwipe: (direction: 'left' | 'right') => void;
  isFront: boolean;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({ item, onSwipe, isFront }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-250, -150, 0, 150, 250], [0, 1, 1, 1, 0]);
  
  const rejectOpacity = useTransform(x, [-100, -20], [1, 0]);
  const likeOpacity = useTransform(x, [20, 100], [0, 1]);
  const boxBorderColor = useTransform(
    x,
    [-150, 0, 150],
    ['rgba(239, 68, 68, 0.3)', 'rgba(255, 255, 255, 0.08)', 'rgba(16, 185, 129, 0.3)']
  );

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 120) {
      onSwipe('right');
    } else if (info.offset.x < -120) {
      onSwipe('left');
    }
  };

  if (!isFront) {
    return (
      <div className="absolute top-0 w-full h-full scale-95 opacity-40 z-0 pointer-events-none transform translate-y-6">
        <GlassCard className="w-full h-full p-6 bg-gray-900/40">
           <div className="h-48 bg-white/5 rounded-2xl w-full mb-4 animate-pulse"></div>
           <div className="h-8 bg-white/5 rounded-lg w-3/4 mb-4"></div>
           <div className="h-4 bg-white/5 rounded-lg w-1/2"></div>
        </GlassCard>
      </div>
    );
  }

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="absolute top-0 w-full h-full z-10 cursor-grab active:cursor-grabbing"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.1, opacity: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    >
      <motion.div 
        className="w-full h-full glass-shine bg-gray-900/95 border-2 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col"
        style={{ borderColor: boxBorderColor }}
      >
        {/* Swipe Overlays con diseño más minimalista */}
        <motion.div style={{ opacity: likeOpacity }} className="absolute inset-0 bg-emerald-500/10 z-20 pointer-events-none flex items-center justify-center">
            <div className="border-4 border-emerald-400 text-emerald-400 px-6 py-2 rounded-2xl font-black text-5xl rotate-[-12deg]">MATCH</div>
        </motion.div>
        <motion.div style={{ opacity: rejectOpacity }} className="absolute inset-0 bg-red-500/10 z-20 pointer-events-none flex items-center justify-center">
            <div className="border-4 border-red-500 text-red-500 px-6 py-2 rounded-2xl font-black text-5xl rotate-[12deg]">DESCARTAR</div>
        </motion.div>

        {/* Header Visual */}
        <div className="h-[42%] bg-gradient-to-br from-gray-800 to-gray-950 flex items-center justify-center relative">
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '24px 24px' }}></div>
           
           <div className="relative group">
              <div className="absolute -inset-4 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/30 transition-all"></div>
              <div className="w-28 h-28 bg-gray-900 rounded-3xl flex items-center justify-center border border-white/10 shadow-inner relative z-10">
                <Beaker className="w-14 h-14 text-emerald-400" />
              </div>
           </div>

           {/* AI Confidence Gauge */}
           <div className="absolute top-6 right-6 z-20">
              <div className="flex flex-col items-end gap-1">
                 <div className="bg-black/60 backdrop-blur-xl border border-violet-500/30 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                    <Zap className="w-3.5 h-3.5 text-violet-400 fill-violet-400" />
                    <span className="text-xs font-bold text-violet-100 uppercase tracking-tighter">AI Match {item.compatibilityScore}%</span>
                 </div>
              </div>
           </div>

           <div className="absolute bottom-4 left-6 flex gap-2">
              <span className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg text-[10px] font-bold text-gray-300 uppercase tracking-widest flex items-center gap-1.5">
                <Droplets className="w-3 h-3 text-emerald-400" /> {item.purity}% PUREZA
              </span>
           </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 flex flex-col justify-between bg-gray-900">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Subproducto</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight leading-none">{item.name}</h2>
            <p className="text-sm font-semibold text-gray-500 mb-6 uppercase tracking-wider">{item.generator}</p>

            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-gray-400">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-gray-500" />
                </div>
                <span className="text-sm font-medium">{item.location}</span>
              </div>
              
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                 <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                   {item.description}
                 </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
             <div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1 block">Precio Mercado</span>
                <span className="text-2xl font-black text-white tracking-tight">{item.price}</span>
             </div>
             <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 flex items-center justify-center border border-emerald-500/20 group">
                <Box className="text-emerald-400 w-6 h-6 group-hover:scale-110 transition-transform" />
             </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
