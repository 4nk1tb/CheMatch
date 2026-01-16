
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RefreshCw, Menu, MessageSquareText, MapPin, Globe, Sparkles, X } from 'lucide-react';
import { SwipeCard } from './SwipeCard';
import { MatchModal } from './MatchModal';
import { MobileMenu } from './MobileMenu';
import { InboxPanel } from './InboxPanel';
import { MOCK_WASTE_ITEMS } from '../data/mockData';
import { WasteItem } from '../types';
import { analyzeCompatibility } from '../services/aiService';

interface DashboardProps {
  userCountry: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ userCountry }) => {
  const [cards, setCards] = useState<WasteItem[]>([]);
  const [lastMatchedItem, setLastMatchedItem] = useState<WasteItem | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<{ [key: string]: any }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Carga inicial de datos mock
    let sortedItems = [...MOCK_WASTE_ITEMS];
    if (userCountry && userCountry !== 'Otro / Global') {
      sortedItems = sortedItems.sort((a, b) => {
        const aIsLocal = a.location.includes(userCountry);
        const bIsLocal = b.location.includes(userCountry);
        if (aIsLocal && !bIsLocal) return -1;
        if (!aIsLocal && bIsLocal) return 1;
        return 0;
      });
    }
    setCards(sortedItems);
    setIsLoading(false);
  }, [userCountry]);

  useEffect(() => {
    // Simulación de "IA analizando" el card actual para feedback visual
    if (cards.length > 0 && !aiAnalysis[cards[0].id]) {
      const runAnalysis = async () => {
        const result = await analyzeCompatibility(cards[0], userCountry);
        setAiAnalysis(prev => ({ ...prev, [cards[0].id]: result }));
      };
      runAnalysis();
    }
  }, [cards, userCountry, aiAnalysis]);

  const activeCard = cards[0];
  const nextCard = cards[1];

  const handleSwipe = (direction: 'left' | 'right') => {
    const swipedCard = cards[0];
    setCards(current => current.slice(1));
    if (direction === 'right') {
      setLastMatchedItem(swipedCard);
    }
  };

  if (isLoading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
      <p className="text-emerald-500 font-black tracking-widest uppercase text-xs">Iniciando Nodo...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col font-sans">
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <InboxPanel isOpen={isInboxOpen} onClose={() => setIsInboxOpen(false)} />

      <header className="px-6 py-4 flex items-center justify-between z-30 bg-black/50 backdrop-blur-lg border-b border-white/5">
        <button onClick={() => setIsMenuOpen(true)} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
          <Menu className="w-6 h-6 text-gray-400" />
        </button>
        <div className="text-center">
          <h1 className="text-lg font-black tracking-tighter uppercase italic bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent">ChemMatch</h1>
          <div className="flex items-center justify-center gap-1 opacity-50">
             <MapPin className="w-2.5 h-2.5" />
             <span className="text-[9px] font-black uppercase tracking-widest">{userCountry} Hub</span>
          </div>
        </div>
        <button onClick={() => setIsInboxOpen(true)} className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
          <MessageSquareText className="w-6 h-6 text-gray-400" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500 border border-black"></span>
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center relative w-full max-w-lg mx-auto px-4 pb-12">
        <div className="w-full h-[580px] relative">
          <AnimatePresence mode="popLayout">
            {cards.length > 0 ? (
              <>
                {nextCard && <SwipeCard key={nextCard.id} item={nextCard} isFront={false} onSwipe={() => {}} />}
                <SwipeCard 
                  key={activeCard.id} 
                  item={{...activeCard, compatibilityScore: aiAnalysis[activeCard.id]?.score || activeCard.compatibilityScore}} 
                  isFront={true} 
                  onSwipe={handleSwipe} 
                />
              </>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full h-full flex flex-col items-center justify-center text-center p-8 border border-white/10 rounded-[2.5rem] bg-gray-900/40 backdrop-blur-md">
                <Globe className="w-16 h-16 text-emerald-500/50 mb-6" />
                <h3 className="text-2xl font-black mb-2">Inventario Agotado</h3>
                <p className="text-gray-500 text-sm mb-8">No hay más subproductos disponibles en tu radio actual.</p>
                <button onClick={() => setCards(MOCK_WASTE_ITEMS)} className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform">
                  <RefreshCw className="w-4 h-4" /> Resetear Radio
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {cards.length > 0 && (
          <div className="flex items-center gap-12 mt-8 z-20">
            <button onClick={() => handleSwipe('left')} className="w-16 h-16 rounded-full border-2 border-white/5 bg-gray-900 text-red-500 flex items-center justify-center hover:bg-red-500/10 transition-all active:scale-90">
              <X className="w-8 h-8" strokeWidth={3} />
            </button>
            <button onClick={() => handleSwipe('right')} className="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-110 transition-all active:scale-90">
              <Sparkles className="w-10 h-10" fill="currentColor" />
            </button>
          </div>
        )}
      </main>
      <MatchModal item={lastMatchedItem} onClose={() => setLastMatchedItem(null)} />
    </div>
  );
};
