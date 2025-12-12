import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hoverEffect = false 
}) => {
  return (
    <div 
      className={`
        backdrop-blur-xl 
        bg-white/5 
        border border-white/10 
        shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] 
        rounded-2xl 
        ${hoverEffect ? 'transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(52,211,153,0.1)]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
