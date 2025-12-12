import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RefreshCw, Search, Menu, MessageSquareText, MapPin, Globe } from 'lucide-react';
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

  // Initialize and Sort Cards based on User Country
  useEffect(() => {
    let sortedItems = [...MOCK_WASTE_ITEMS];
    
    if (userCountry && userCountry !== 'Otro / Global') {
      // Prioritize items that match the user's country in their location string
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
    
    // Remove card from stack
    setCards(current => current.slice(1));

    if (direction === 'right') {
      // Trigger Match Modal
      setLastMatchedItem(swipedCard);
    }
  };

  const resetCards = () => {
    setCards(MOCK_WASTE_ITEMS);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* Mobile Menu Overlay (Left) */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {/* Inbox Panel Overlay (Right) */}
      <InboxPanel isOpen={isInboxOpen} onClose={() => setIsInboxOpen(false)} />

      {/* Top Navigation */}
      <header className="px-6 pt-4 pb-2 flex items-center justify-between z-20 bg-gradient-to-b from-black/90 to-transparent">
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <Menu className="w-6 h-6 text-gray-400" />
        </button>
        
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-violet-400">
            ChemMatch
          </h1>
          {/* Country Indicator */}
          <div className="flex items-center gap-1 mt-1">
             <MapPin className="w-3 h-3 text-emerald-500" />
             <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
               Base: {userCountry}
             </span>
          </div>
        </div>
        
        <button 
          onClick={() => setIsInboxOpen(true)}
          className="relative p-2 -mr-2 rounded-full hover:bg-white/10 transition-colors group"
        >
          <MessageSquareText className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
          {/* Notification Dot */}
          <span className="absolute top-2 right-1.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-black"></span>
          </span>
        </button>
      </header>

      {/* Main Card Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative w-full max-w-lg mx-auto px-4 pb-12">
        <div className="w-full h-[600px] relative">
          <AnimatePresence>
            {cards.length > 0 ? (
              <>
                {/* Background Card (Next in stack) */}
                {nextCard && (
                  <SwipeCard 
                    key={nextCard.id} 
                    item={nextCard} 
                    isFront={false} 
                    onSwipe={() => {}} 
                  />
                )}
                
                {/* Foreground Card (Active) */}
                <SwipeCard 
                  key={activeCard.id} 
                  item={activeCard} 
                  isFront={true} 
                  onSwipe={handleSwipe} 
                />
              </>
            ) : (
              // Empty State
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-full flex flex-col items-center justify-center text-center p-8 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-md"
              >
                <div className="w-20 h-20 bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
                  <Globe className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Búsqueda Global Completada</h3>
                <p className="text-gray-400 mb-8 max-w-xs mx-auto">
                  Has revisado todas las oportunidades logísticamente viables para {userCountry} hoy.
                </p>
                <button 
                  onClick={resetCards}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full font-semibold transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Expandir Radio
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls (Visual Only for this demo, functionality is in swipe) */}
        {cards.length > 0 && (
          <div className="flex items-center gap-6 mt-8 z-20">
            <button 
              onClick={() => handleSwipe('left')}
              className="w-16 h-16 rounded-full bg-gray-900/80 border border-red-500/50 text-red-500 flex items-center justify-center hover:scale-110 hover:bg-red-500/20 transition-all duration-200 shadow-lg shadow-red-900/20"
              aria-label="Reject"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            
            <button 
              onClick={() => handleSwipe('right')}
              className="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:scale-110 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-200 shadow-xl"
              aria-label="Match"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
          </div>
        )}
      </div>

      <MatchModal 
        item={lastMatchedItem} 
        onClose={() => setLastMatchedItem(null)} 
      />
    </div>
  );
};
