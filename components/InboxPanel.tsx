import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ArrowLeft, MoreVertical, Paperclip, Sparkles, CheckCheck } from 'lucide-react';
import { MOCK_MATCHES } from '../data/mockData';
import { MatchProfile, Message } from '../types';

interface InboxPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InboxPanel: React.FC<InboxPanelProps> = ({ isOpen, onClose }) => {
  const [selectedMatch, setSelectedMatch] = useState<MatchProfile | null>(null);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim() || !selectedMatch) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'me',
      text: inputText,
      timestamp: 'Ahora'
    };

    // In a real app, this would update state properly via context/redux
    selectedMatch.messages.push(newMessage);
    setInputText('');
  };

  const aiSuggestions = [
    "Solicitar Ficha de Seguridad (FDS)",
    "Proponer fecha de recogida",
    "Confirmar precio del transporte"
  ];

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

          {/* Side Panel (Right Side) */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#0a0a0f] border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            <AnimatePresence mode="wait">
              {!selectedMatch ? (
                // VIEW 1: MATCH LIST
                <motion.div 
                  key="list"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col h-full"
                >
                  {/* Header */}
                  <div className="p-5 border-b border-white/10 flex items-center justify-between bg-gray-900/50">
                    <h2 className="text-xl font-bold text-white">Negociaciones</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                      <X className="w-6 h-6 text-gray-400" />
                    </button>
                  </div>

                  {/* New Matches Row */}
                  <div className="p-5 border-b border-white/5">
                    <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">Nuevos Matches</p>
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                      {[1, 2, 3].map((_, i) => (
                        <div key={i} className="flex flex-col items-center space-y-2 min-w-[70px]">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-violet-600 p-[2px]">
                            <div className="w-full h-full bg-gray-900 rounded-[14px] flex items-center justify-center">
                              <span className="font-bold text-white text-lg">CP</span>
                            </div>
                          </div>
                          <span className="text-xs text-gray-400 truncate w-full text-center">ChemPro</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Conversation List */}
                  <div className="flex-1 overflow-y-auto p-2">
                    {MOCK_MATCHES.map((match) => (
                      <button
                        key={match.id}
                        onClick={() => setSelectedMatch(match)}
                        className="w-full flex items-center gap-4 p-4 hover:bg-white/5 rounded-xl transition-colors text-left group"
                      >
                        <div className="relative">
                          <div className="w-14 h-14 rounded-full bg-gray-800 border border-white/10 flex items-center justify-center text-emerald-400 font-bold text-lg group-hover:border-emerald-500/50 transition-colors">
                            {match.companyName.substring(0, 2).toUpperCase()}
                          </div>
                          {match.dealStatus === 'new' && (
                             <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-black"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-semibold text-white truncate pr-2">{match.companyName}</h3>
                            <span className="text-xs text-gray-500">{match.messages[match.messages.length - 1].timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-400 truncate">{match.lastMessage}</p>
                          <div className="flex items-center gap-2 mt-2">
                             <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 border border-gray-700">
                               {match.wasteName}
                             </span>
                             {match.dealStatus === 'closed' && (
                               <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-900/30 text-emerald-400 border border-emerald-500/20">
                                 Cerrado
                               </span>
                             )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                // VIEW 2: CHAT INTERFACE
                <motion.div 
                  key="chat"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col h-full bg-gray-950"
                >
                  {/* Chat Header */}
                  <div className="p-4 border-b border-white/10 bg-gray-900/80 backdrop-blur flex items-center gap-3 shadow-sm z-10">
                    <button onClick={() => setSelectedMatch(null)} className="p-2 -ml-2 hover:bg-white/10 rounded-full">
                      <ArrowLeft className="w-5 h-5 text-gray-300" />
                    </button>
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-sm">{selectedMatch.companyName}</h3>
                      <p className="text-xs text-emerald-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Match al 92% • {selectedMatch.wasteName}
                      </p>
                    </div>
                    <button className="p-2 hover:bg-white/10 rounded-full">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                     <div className="flex justify-center my-4">
                        <span className="text-xs text-gray-500 bg-gray-900 px-3 py-1 rounded-full border border-white/5">
                          Simbiosis detectada hoy
                        </span>
                     </div>
                     {selectedMatch.messages.map((msg) => (
                       <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                         <div 
                           className={`
                             max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed
                             ${msg.sender === 'me' 
                               ? 'bg-emerald-600 text-white rounded-br-none shadow-lg shadow-emerald-900/20' 
                               : 'bg-gray-800 text-gray-200 rounded-bl-none border border-white/5'}
                           `}
                         >
                           {msg.text}
                           <div className={`text-[10px] mt-1 flex items-center justify-end gap-1 ${msg.sender === 'me' ? 'text-emerald-200' : 'text-gray-500'}`}>
                             {msg.timestamp}
                             {msg.sender === 'me' && <CheckCheck className="w-3 h-3" />}
                           </div>
                         </div>
                       </div>
                     ))}
                  </div>

                  {/* AI Suggestions */}
                  <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
                    {aiSuggestions.map((suggestion, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setInputText(suggestion)}
                        className="whitespace-nowrap px-3 py-1.5 bg-violet-500/10 border border-violet-500/30 rounded-full text-xs text-violet-300 hover:bg-violet-500/20 transition-colors flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3 h-3" />
                        {suggestion}
                      </button>
                    ))}
                  </div>

                  {/* Input Area */}
                  <div className="p-4 bg-gray-900 border-t border-white/10">
                    <div className="flex items-center gap-2 bg-gray-800/50 rounded-xl p-2 border border-white/5 focus-within:border-emerald-500/50 transition-colors">
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <input 
                        type="text" 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <button 
                        onClick={handleSendMessage}
                        className={`p-2 rounded-lg transition-all ${inputText.trim() ? 'bg-emerald-500 text-white shadow-lg' : 'bg-gray-700 text-gray-500'}`}
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
