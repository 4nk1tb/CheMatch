import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Recycle, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

interface LandingPageProps {
  onStart: () => void;
}

const StatCounter: React.FC<{ value: string; label: string; delay: number }> = ({ value, label, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200 mb-2">
        {value}
      </div>
      <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">{label}</div>
    </motion.div>
  );
};

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-6">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content */}
      <div className="max-w-5xl w-full z-10 flex flex-col items-center space-y-12">
        
        {/* Header/Nav (Mock) */}
        <div className="absolute top-6 left-6 md:left-12 flex items-center gap-2">
           <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
             <Activity className="text-emerald-400 w-6 h-6" />
           </div>
           <span className="text-xl font-bold tracking-tight text-white">ChemMatch</span>
        </div>

        {/* Hero Copy */}
        <div className="text-center space-y-6 max-w-3xl mx-auto mt-12 md:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs md:text-sm font-semibold tracking-wide uppercase mb-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            IA Industrial Engine v2.0
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
            Tu residuo es el <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              tesoro de otro.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Deja de pagar por gestionar desechos. La primera plataforma que utiliza 
            <span className="text-violet-400 font-medium"> Inteligencia Artificial </span> 
            para monetizar tu subproducto industrial en segundos.
          </p>
        </div>

        {/* CTA */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-violet-600 rounded-lg blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <button 
            onClick={onStart}
            className="relative flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-lg font-bold text-lg shadow-2xl hover:bg-gray-50 transition-colors"
          >
            Empezar a buscar Match
            <ArrowRight className="w-5 h-5 text-emerald-600" />
          </button>
        </motion.div>

        {/* Stats Section */}
        <GlassCard className="w-full p-8 md:p-10 mt-8 border-t border-white/10 bg-white/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <StatCounter value="500 Ton" label="Residuos Salvados" delay={0.2} />
            <StatCounter value="2M€" label="Ahorro Generado" delay={0.4} />
            <StatCounter value="98%" label="Precisión del Match" delay={0.6} />
          </div>
        </GlassCard>

        {/* FOMO Text */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-gray-500 text-sm mt-8"
        >
          Estás perdiendo <span className="text-red-400 font-bold underline decoration-red-500/30">oportunidades de negocio</span> cada minuto que no estás aquí.
        </motion.p>
      </div>
    </div>
  );
};
