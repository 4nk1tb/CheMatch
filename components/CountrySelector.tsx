import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, ShieldCheck, ArrowRight, Truck } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

interface CountrySelectorProps {
  onSelect: (country: string) => void;
}

const COUNTRIES = [
  { code: 'ES', name: 'España', region: 'UE (ADR/LER)', flag: '🇪🇸' },
  { code: 'MX', name: 'México', region: 'NOM-052', flag: '🇲🇽' },
  { code: 'US', name: 'USA', region: 'EPA / RCRA', flag: '🇺🇸' },
  { code: 'DE', name: 'Deutschland', region: 'UE (ADR/LER)', flag: '🇩🇪' },
  { code: 'FR', name: 'France', region: 'UE (ADR/LER)', flag: '🇫🇷' },
  { code: 'NL', name: 'Netherlands', region: 'UE (ADR/LER)', flag: '🇳🇱' },
  { code: 'CN', name: 'China', region: 'MEE Order 31', flag: '🇨🇳' },
  { code: 'Global', name: 'Otro / Global', region: 'Intl. Maritime (IMO)', flag: '🌍' },
];

export const CountrySelector: React.FC<CountrySelectorProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full z-10 space-y-8"
      >
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-sm font-semibold mb-2">
            <Truck className="w-4 h-4" />
            Configuración Logística
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            ¿Dónde está tu base operativa?
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Selecciona tu país para que la IA adapte automáticamente la normativa legal (DCS/Manifiestos) y calcule las rutas de transporte.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {COUNTRIES.map((country, index) => (
            <motion.div
              key={country.code}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => onSelect(country.name)}
                className="w-full group relative overflow-hidden"
              >
                <GlassCard className="p-4 flex items-center justify-between group-hover:bg-white/10 transition-all border-white/5 group-hover:border-emerald-500/30">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl" role="img" aria-label={`Bandera de ${country.name}`}>
                      {country.flag}
                    </span>
                    <div className="text-left">
                      <h3 className="text-white font-bold group-hover:text-emerald-400 transition-colors">
                        {country.name}
                      </h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        {country.region}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-emerald-400 transform group-hover:translate-x-1 transition-all" />
                </GlassCard>
              </button>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
            <p className="text-xs text-gray-600 mt-8">
                * ChemMatch verifica las licencias de operación automáticamente según la jurisdicción seleccionada.
            </p>
        </div>
      </motion.div>
    </div>
  );
};
