import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Truck, BrainCircuit, Users, DollarSign, FileCheck, ChevronDown, ChevronUp, ShieldCheck, AlertTriangle, Globe2, FileKey, Stamp } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuItem: React.FC<{ 
  icon: React.ElementType, 
  title: string, 
  children: React.ReactNode,
  isPremium?: boolean,
  isSpecial?: boolean
}> = ({ icon: Icon, title, children, isPremium, isSpecial }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <div className="flex items-center gap-3 text-gray-200 group-hover:text-emerald-400 transition-colors">
          <div className={`p-2 rounded-lg transition-colors ${
            isPremium ? 'bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20' : 
            isSpecial ? 'bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20' :
            'bg-white/5 group-hover:bg-emerald-500/10'
          }`}>
            <Icon className="w-5 h-5" />
          </div>
          <span className={`font-semibold ${
            isPremium ? 'text-violet-200' : 
            isSpecial ? 'text-amber-200' : ''
          }`}>{title}</span>
        </div>
        {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-[3.25rem] pr-2 text-sm text-gray-400 leading-relaxed space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-[90%] md:w-[85%] max-w-sm bg-[#0a0a0f] border-r border-white/10 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-emerald-900/20 to-transparent">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">ChemMatch</h2>
                <div className="flex items-center gap-1.5 mt-1">
                   <Globe2 className="w-3 h-3 text-emerald-400" />
                   <p className="text-xs text-emerald-400 font-medium uppercase tracking-wider">Global Network</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              <div className="flex flex-col">
                
                <MenuItem icon={FileCheck} title="Compliance Legal Global">
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg mb-2">
                    <p className="text-red-200 text-xs font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3" />
                      Riesgo Transfronterizo
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Mover residuos entre regiones implica normativas dispares (EPA, UE-EWC, Convenio de Basilea) y riesgo de multas millonarias.
                    </p>
                  </div>
                  <p className="text-white font-medium">
                    Gestión Multi-Jurisdicción:
                  </p>
                  <p>
                    Nuestra IA detecta la ubicación de las partes y genera automáticamente la documentación exigida por la autoridad local correspondiente (e.g., Anexos VII para traslados UE, Manifiestos EPA en USA).
                  </p>
                  <p className="text-emerald-400 text-xs italic">
                    "Cumplimiento normativo instantáneo en +40 países."
                  </p>
                </MenuItem>

                <MenuItem icon={FileKey} title="Permisos Especiales (NPT)" isSpecial={true}>
                  <p>
                    Para residuos complejos o traslados que requieren <strong>Notificación Previa de Traslado (NPT)</strong>, la automatización no es suficiente.
                  </p>
                  <div className="bg-amber-500/5 border border-amber-500/20 p-3 rounded-lg mt-2">
                     <div className="flex items-center gap-2 mb-1">
                        <Stamp className="w-4 h-4 text-amber-500" />
                        <span className="text-amber-200 font-bold text-xs">Servicio Concierge Regulatorio</span>
                     </div>
                     <p className="text-xs text-gray-400">
                       Nuestro equipo de consultores ambientales gestiona manualmente las autorizaciones ante los Ministerios de Medio Ambiente de origen y destino.
                     </p>
                  </div>
                  <p className="mt-2 text-xs text-gray-400">
                    *Imprescindible para residuos Tóxicos Agudos o movimientos fuera de zona OCDE.
                  </p>
                </MenuItem>

                <MenuItem icon={ShieldCheck} title='Escrow Internacional' isPremium={true}>
                  <p>
                    El comercio internacional de químicos requiere confianza absoluta. 
                    <strong>¿Qué pasa si importas desde Rotterdam y el producto no cumple especificaciones?</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-2 bg-white/5 p-3 rounded-lg border border-white/5">
                    <li><span className="text-white">Hold Seguro:</span> ChemMatch retiene los fondos en cuentas Escrow neutrales.</li>
                    <li><span className="text-white">Verificación:</span> Liberación contra certificado de análisis (CoA) en destino.</li>
                  </ul>
                  <p className="text-violet-300 font-medium text-xs">
                    Operamos con bancos Tier-1 para garantizar transacciones SWIFT/SEPA seguras.
                  </p>
                </MenuItem>

                <MenuItem icon={BrainCircuit} title="Algoritmo de Equivalencias">
                  <p>
                    Nuestro motor <strong>ChemMatch Core™</strong> traduce automáticamente los códigos de residuo.
                  </p>
                  <p>
                    Si vendes en Europa (Código LER) y compras en América (Código RCRA), la IA valida la equivalencia química y legal para permitir el "Match" transoceánico.
                  </p>
                </MenuItem>

                <MenuItem icon={Truck} title="Logística Multimodal">
                  <p>
                    Coordinamos transporte terrestre, marítimo (IMO) y aéreo. Nuestra red incluye agentes de aduanas especializados en mercancías peligrosas.
                  </p>
                  <p>
                    Seguimiento satelital en tiempo real desde la planta de origen hasta el destino final.
                  </p>
                </MenuItem>

                <MenuItem icon={DollarSign} title="Modelo de Negocio">
                  <p>
                    <strong>Transparencia Total</strong>
                  </p>
                  <p>
                    Facilitamos el comercio circular global reduciendo fricción burocrática.
                  </p>
                  <ul className="list-disc list-inside space-y-1 mt-1 text-xs">
                    <li>Registro Global: <span className="text-white">Gratis</span>.</li>
                    <li>Success Fee: Variable según volumen y riesgo.</li>
                    <li>
                      <span className="text-amber-400">Expedientes Complejos:</span> Tarifa fija por gestión de permisos especiales (NPT/Autorizaciones).
                    </li>
                  </ul>
                </MenuItem>

                <MenuItem icon={Users} title="Sobre Nosotros">
                  <p>
                    Somos la plataforma líder en <strong>Simbiosis Industrial Global</strong>. 
                    Conectamos los polos industriales de Europa, América y Asia para cerrar el círculo de la economía mundial.
                  </p>
                </MenuItem>

              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black/20">
              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold shadow-lg shadow-emerald-900/40 transition-all flex items-center justify-center gap-2">
                <BrainCircuit className="w-5 h-5" />
                Contactar Ventas Global
              </button>
              <p className="text-center text-xs text-gray-600 mt-4">
                v2.2.0 (Global Beta) &copy; 2025 ChemMatch Inc.
              </p>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
