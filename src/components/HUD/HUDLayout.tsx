/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useLocation } from 'react-router-dom';
import { AchievementFeed } from './BroadcasterComponents';

export const HUDLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isYouTubePage = location.pathname === '/youtube';

  return (
    <div className="relative min-h-screen bg-hud-bg text-white overflow-hidden selection:bg-hud-accent selection:text-white flex flex-col lg:flex-row">
      {/* Background Layers */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute inset-0 noise-bg pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
        
        {/* Ambient Moving Glows - OPTIMIZED */}
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[50%] h-[50%] bg-hud-accent/10 blur-[60px] rounded-full pointer-events-none will-change-transform" 
        />
        <motion.div 
          animate={{ 
            opacity: [0.05, 0.15, 0.05],
            scale: [1.1, 1, 1.1] 
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[50%] h-[50%] bg-blue-500/10 blur-[60px] rounded-full pointer-events-none will-change-transform" 
        />
      </div>

      {/* CRT & Scanline Effects */}
      <div className="crt-overlay pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
        <div className="scanline" />
      </div>

      {/* Dynamic HUD Decorations */}
      <HUDDecorations />

      {/* Sidebar (Left) */}
      {!isYouTubePage && (
        <aside className="hidden lg:flex w-[70px] flex-col items-center py-10 border-r border-hud-border bg-white/[0.01] backdrop-blur-md z-50">
          <div className="vertical-brand text-hud-accent font-black text-3xl tracking-[0.4em] [writing-mode:vertical-rl] rotate-180 opacity-90 hud-text-glow">
            REAGANVERSE
          </div>
          <div className="mt-auto flex flex-col items-center gap-6 font-mono text-[9px] text-text-dim">
            <div className="relative">
              <div className="w-2 h-2 bg-hud-accent rounded-full hud-glow animate-pulse" />
              <div className="absolute inset-x-0 -inset-y-2 border border-hud-accent/50 rounded-full animate-ping opacity-20" />
            </div>
            <span className="[writing-mode:vertical-rl] rotate-180 tracking-widest text-hud-accent font-bold">ONLINE</span>
            <span className="tracking-tighter font-bold text-white/40">LIVE</span>
          </div>
        </aside>
      )}

      {/* Main Console (Middle) */}
      <div className="flex-1 flex flex-col relative overflow-y-auto z-10 custom-scrollbar">
        {/* HUD Frame Brackets */}
        <div className="absolute inset-8 pointer-events-none z-50">
          <CornerBracket position="top-left" />
          <CornerBracket position="top-right" />
          <CornerBracket position="bottom-left" />
          <CornerBracket position="bottom-right" />
        </div>

        <main className="relative flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};


const HUDDecorations = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
    <motion.div 
      className="absolute -top-20 -left-20 w-80 h-80 border border-hud-accent/30 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute top-1/2 left-0 w-4 h-px bg-hud-accent" />
      <div className="absolute top-1/2 right-0 w-4 h-px bg-hud-accent" />
    </motion.div>
    
    <motion.div 
      className="absolute -bottom-40 -right-40 w-[600px] h-[600px] border border-hud-accent/20 rounded-full"
      animate={{ rotate: -360 }}
      transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute top-0 left-1/2 w-px h-8 bg-hud-accent" />
      <div className="absolute bottom-0 left-1/2 w-px h-8 bg-hud-accent" />
    </motion.div>
  </div>
);

const PanelLabel: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center gap-4 font-mono text-[10px] text-text-dim tracking-[0.4em] font-bold opacity-80">
    <span>{label}</span>
    <div className="h-[2px] flex-1 bg-gradient-to-r from-hud-line to-transparent" />
  </div>
);

const NodeItem: React.FC<{ label: string; status: string; value: string }> = ({ label, status, value }) => (
  <div className="flex items-center justify-between p-4 border border-white/5 bg-white/[0.01] hover:bg-hud-accent-muted hover:border-hud-accent/30 transition-all duration-300 cursor-pointer group rounded-sm">
    <div className="flex flex-col gap-0.5">
      <span className="text-[12px] font-black tracking-widest uppercase text-white group-hover:text-hud-accent transition-colors">{label}</span>
      <span className="text-[9px] font-mono text-text-muted font-bold">{value}</span>
    </div>
    <span className="font-mono text-[9px] text-hud-accent font-bold group-hover:hud-text-glow transition-all">{status}</span>
  </div>
);

const CornerBracket: React.FC<{ position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }> = ({ position }) => {
  const classes = {
    'top-left': 'top-0 left-0 border-t border-l',
    'top-right': 'top-0 right-0 border-t border-r',
    'bottom-left': 'bottom-0 left-0 border-b border-l',
    'bottom-right': 'bottom-0 right-0 border-b border-r',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.5 }}
      animate={{ opacity: 0.4, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className={cn("absolute w-12 h-12 md:w-20 md:h-20 border-hud-accent", classes[position])}
    >
      <div className={cn("absolute w-1 h-1 bg-hud-accent", position.includes('top') ? 'top-0' : 'bottom-0', position.includes('left') ? 'left-0' : 'right-0')} />
    </motion.div>
  );
};


const SideLabel: React.FC<{ label: string; value: string; align?: 'left' | 'right' }> = ({ label, value, align = 'left' }) => {
  return (
    <div className={cn("flex flex-col gap-1", align === 'right' ? "items-end text-right" : "items-start text-left")}>
      <span className="text-[10px] font-mono text-hud-accent opacity-50 tracking-[0.2em]">{label}</span>
      <span className="text-xs font-mono font-bold tracking-widest">{value}</span>
    </div>
  );
};
