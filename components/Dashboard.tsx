
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RefreshCw, Menu, MessageSquareText, MapPin, Globe, Sparkles } from 'lucide-react';
import { SwipeCard } from './SwipeCard';
import { MatchModal } from './MatchModal';
import { MobileMenu } from './MobileMenu';
import { InboxPanel } from './InboxPanel';
import { MOCK_WASTE_ITEMS } from '../data/mockData';
import { WasteItem } from '../types';

interface DashboardProps {
  userCountry: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ userCountry }) => {
  const [cards, setCards] = useState<WasteItem[]>([]);
  const [lastMatchedItem, setLastMatchedItem] = useState<WasteItem | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);

  useEffect(() => {
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
  }, [userCountry]);

  const activeCard = cards[0];
  const nextCard = cards[1];

  const handleSwipe = (direction: 'left' | 'right') => {
    const swipedCard = cards[0];
    setCards(current => current.slice(1));
    if (direction === 'right') {
      setLastMatchedItem(swipedCard);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col font-sans">
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <InboxPanel isOpen={isInboxOpen} onClose={() => setIsInboxOpen(false)} />

      <header className="px-6 py-6 flex items-center justify-between z-30 bg-black/50 backdrop-blur-lg border-b border-white/5">
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-400" />
        </button>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h1 className="text-lg font-black tracking-tighter uppercase italic">ChemMatch</h1>
          </div>
          <div className="flex items-center justify-center gap-1 opacity-50">
             <MapPin className="w-2.5 h-2.5" />
             <span className="text-[9px] font-black uppercase tracking-widest">{userCountry} Hub</span>
          </div>
        </div>
        
        <button 
          onClick={() => setIsInboxOpen(true)}
          className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
        >
          <MessageSquareText className="w-5 h-5 text-gray-400" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-black"></span>
          </span>
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center relative w-full max-w-lg mx-auto px-4 pb-20">
        <div className="w-full h-[620px] relative">
          <AnimatePresence>
            {cards.length > 0 ? (
              <>
                {nextCard && <SwipeCard key={nextCard.id} item={nextCard} isFront={false} onSwipe={() => {}} />}
                <SwipeCard key={activeCard.id} item={activeCard} isFront={true} onSwipe={handleSwipe} />
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full h-full flex flex-col items-center justify-center text-center p-12 border border-white/10 rounded-[3rem] bg-gray-900/40 backdrop-blur-md shadow-2xl"
              >
                <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-8 border border-emerald-500/20">
                  <Globe className="w-12 h-12 text-emerald-500" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Fin del Inventario</h3>
                <p className="text-gray-500 mb-10 text-sm leading-relaxed font-medium">
                  Has revisado todos los subproductos industriales disponibles para el nodo <span className="text-emerald-400">{userCountry}</span>.
                </p>
                <button 
                  onClick={() => setCards(MOCK_WASTE_ITEMS)}
                  className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform"
                >
                  <RefreshCw className="w-4 h-4" /> Resetear Radio
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {cards.length > 0 && (
          <div className="flex items-center gap-10 mt-12 z-20">
            <button 
              onClick={() => handleSwipe('left')}
              className="w-20 h-20 rounded-full bg-gray-900 border-2 border-white/5 flex items-center justify-center text-red-500 hover:scale-110 active:scale-95 transition-all shadow-xl group"
              aria-label="Reject"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            
            <button 
              onClick={() => handleSwipe('right')}
              className="w-24 h-24 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-emerald-500/20 group"
              aria-label="Match"
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
          </div>
        )}
      </main>

      <MatchModal item={lastMatchedItem} onClose={() => setLastMatchedItem(null)} />
    </div>
  );
};
