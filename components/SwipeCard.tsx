import React from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { MapPin, Box, Droplets, Zap, CheckCircle, XCircle } from 'lucide-react';
import { WasteItem } from '../types';
import { GlassCard } from './ui/GlassCard';

interface SwipeCardProps {
  item: WasteItem;
  onSwipe: (direction: 'left' | 'right') => void;
  isFront: boolean;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({ item, onSwipe, isFront }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  // Visual cues for swipe direction
  const rejectOpacity = useTransform(x, [-100, 0], [1, 0]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const boxBorderColor = useTransform(
    x,
    [-150, 0, 150],
    ['rgba(239, 68, 68, 0.5)', 'rgba(255, 255, 255, 0.1)', 'rgba(16, 185, 129, 0.5)']
  );

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      onSwipe('right');
    } else if (info.offset.x < -100) {
      onSwipe('left');
    }
  };

  if (!isFront) {
    return (
      <div className="absolute top-0 w-full h-full scale-95 opacity-50 z-0 pointer-events-none transform translate-y-4">
        <GlassCard className="w-full h-full p-6 flex flex-col relative overflow-hidden bg-gray-900/40">
           {/* Skeleton content for background card */}
           <div className="h-48 bg-gray-700/30 rounded-lg w-full mb-4 animate-pulse"></div>
           <div className="h-8 bg-gray-700/30 rounded w-3/4 mb-2"></div>
           <div className="h-4 bg-gray-700/30 rounded w-1/2"></div>
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
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.05, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="w-full h-full backdrop-blur-xl bg-gray-900/80 border rounded-3xl shadow-2xl relative overflow-hidden flex flex-col"
        style={{ borderColor: boxBorderColor }}
      >
        {/* Swipe Overlays */}
        <motion.div 
          style={{ opacity: likeOpacity }}
          className="absolute top-8 left-8 border-4 border-emerald-500 rounded-lg px-4 py-2 z-20 transform -rotate-12 pointer-events-none"
        >
          <span className="text-4xl font-black text-emerald-500 uppercase tracking-widest">MATCH</span>
        </motion.div>
        
        <motion.div 
          style={{ opacity: rejectOpacity }}
          className="absolute top-8 right-8 border-4 border-red-500 rounded-lg px-4 py-2 z-20 transform rotate-12 pointer-events-none"
        >
          <span className="text-4xl font-black text-red-500 uppercase tracking-widest">NOPE</span>
        </motion.div>

        {/* AI Badge */}
        <div className="absolute top-0 right-0 p-4 z-20">
          <div className="flex items-center gap-2 bg-violet-600/20 backdrop-blur-md border border-violet-500/40 px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.3)]">
            <Zap className="w-4 h-4 text-violet-400 fill-violet-400 animate-pulse" />
            <span className="text-xs font-bold text-violet-200">
              IA Match: {item.compatibilityScore}%
            </span>
          </div>
        </div>

        {/* Card Content - Top Visual (Simulated Image/Icon area) */}
        <div className="h-2/5 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative p-6">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
           <div className="w-24 h-24 bg-gray-700/50 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner">
             <Box className="w-12 h-12 text-emerald-400/80" />
           </div>
           
           {/* Purity Badge */}
           <div className="absolute bottom-4 left-6">
              <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-900/30 px-3 py-1 rounded-md border border-emerald-500/20">
                <Droplets className="w-4 h-4" />
                <span className="text-sm font-semibold">{item.purity}% Pureza</span>
              </div>
           </div>
        </div>

        {/* Card Info */}
        <div className="flex-1 p-6 flex flex-col justify-between bg-gradient-to-b from-gray-900/90 to-gray-950/90">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1 leading-tight">{item.name}</h2>
            <div className="flex items-center gap-2 text-gray-400 mb-4 text-sm">
              <span className="font-medium text-gray-300">{item.generator}</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span>{item.location}</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed border-l-2 border-emerald-500/30 pl-3">
                {item.description}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/5">
             <div className="flex items-end justify-between">
                <div>
                   <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Precio Estimado</span>
                   <span className="text-2xl font-bold text-white">{item.price}</span>
                </div>
                <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                   <Box className="text-emerald-400 w-5 h-5" />
                </div>
             </div>
          </div>
        </div>

        {/* Action Hint (Bottom) */}
        <div className="absolute bottom-6 left-0 w-full flex justify-center gap-8 pointer-events-none opacity-40 md:opacity-0">
           <XCircle className="w-10 h-10 text-red-500" />
           <CheckCircle className="w-10 h-10 text-emerald-500" />
        </div>

      </motion.div>
    </motion.div>
  );
};
