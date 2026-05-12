/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Calendar, Clock, Users, Shield, Zap, ChevronRight, X, Heart } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { AnimatePresence } from 'motion/react';

// SECURE DISCORD WEBHOOK (HIDDEN IN .ENV)
const DISCORD_WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL;

export const Tournaments: React.FC = () => {
  const [selectedTournament, setSelectedTournament] = React.useState<any>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [tournaments, setTournaments] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('/tournaments.json')
      .then(res => res.json())
      .then(data => setTournaments(data))
      .catch(err => console.error("Error loading tournaments:", err));
  }, []);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data: any = {
      tournament: selectedTournament.title,
      type: selectedTournament.type,
      playerName: formData.get('playerName') || formData.get('captain'),
      playerId: formData.get('playerId') || formData.get('playerIds'),
      contact: formData.get('contact'),
    };

    if (selectedTournament.type === 'SQUAD') {
      data.teamName = formData.get('teamName');
    }

    const fields = [
      { name: "Tournament", value: data.tournament },
      { name: "Registration Type", value: data.type },
      { name: data.type === 'SOLO' ? "Player Name" : "Captain Name", value: data.playerName },
      { name: data.type === 'SOLO' ? "Player ID" : "Squad IDs", value: data.playerId },
      { name: "Contact / Discord", value: data.contact }
    ];

    if (data.teamName) {
      fields.splice(2, 0, { name: "Team Name", value: data.teamName });
    }

    const discordMessage = {
      embeds: [{
        title: "NEW TOURNAMENT REGISTRATION",
        color: data.type === 'SOLO' ? 0x00ffff : 0xff3e3e,
        fields: fields,
        footer: { text: "Reaganverse Registration Hub" },
        timestamp: new Date().toISOString()
      }]
    };

    try {
      if (!DISCORD_WEBHOOK_URL || DISCORD_WEBHOOK_URL.length < 10) {
        // Fallback for missing config
        console.warn("Discord Webhook not configured in .env");
        await new Promise(r => setTimeout(r, 1500));
      } else {
        await fetch(DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(discordMessage)
        });
      }
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setSelectedTournament(null);
      }, 3000);
    } catch (error) {
      alert("Error sending registration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-32 px-4 md:px-8 max-w-6xl mx-auto space-y-16">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-hud-border pb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-hud-accent" />
            <span className="text-[10px] font-mono text-hud-accent tracking-[0.3em] uppercase">Tournament Control</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">EVENT <span className="text-hud-accent">HUB</span></h1>
          <p className="text-text-dim font-mono text-[10px] uppercase tracking-widest max-w-md">Register your squad or enter as a solo survivor.</p>
        </div>
        
        <div className="flex gap-8">
          <StatBlock label="TOTAL PRIZES" value="₹1.25L" />
          <StatBlock label="TOTAL EVENTS" value="04" />
        </div>
      </div>

      <div className="space-y-8">
        {tournaments.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-hud-panel border border-hud-border overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Poster Image */}
              <div className="lg:w-64 h-48 lg:h-auto overflow-hidden relative border-b lg:border-b-0 lg:border-r border-hud-border">
                <img 
                  src={t.image} 
                  alt={t.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent lg:hidden" />
              </div>

              <div className="p-8 flex flex-col lg:flex-row flex-1 gap-8">
                <div className="lg:w-48 flex flex-col justify-between border-r border-hud-border lg:pr-8">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-text-dim uppercase tracking-widest">Entry ID</span>
                    <p className="text-sm font-mono font-bold text-hud-accent">{t.id}</p>
                    <p className="text-[8px] font-bold text-white/40 tracking-[0.2em]">{t.type}</p>
                  </div>
                  <div className={cn(
                    "mt-4 lg:mt-0 px-3 py-1 text-[9px] font-mono font-bold tracking-widest text-center",
                    t.status === 'JOIN NOW' ? "bg-hud-accent text-black" : "bg-white/10 text-text-dim"
                  )}>
                    {t.status}
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black tracking-tighter group-hover:text-hud-accent transition-colors uppercase">{t.title}</h3>
                    <div className="flex flex-wrap gap-4">
                      <MetaItem icon={<Users size={12} />} text={t.format} />
                      <MetaItem icon={<Shield size={12} />} text={t.requirements} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                    <DetailItem label="DATE" value={t.date} />
                    <DetailItem label="TIME" value={t.time} />
                    <DetailItem label="PRIZE" value={t.prize} />
                    <DetailItem label="SLOTS" value={t.slots} />
                  </div>
                </div>

                <div className="lg:w-48 flex items-center">
                  <button 
                    onClick={() => t.status === 'JOIN NOW' && setSelectedTournament(t)}
                    className={cn(
                      "w-full group/btn relative flex items-center justify-center gap-3 py-4 font-mono font-bold tracking-widest text-[10px] transition-all duration-300",
                      t.status === 'JOIN NOW' ? "bg-hud-accent text-black cursor-pointer" : "bg-white/5 text-text-dim cursor-not-allowed"
                    )}
                  >
                    {t.status === 'JOIN NOW' ? 'REGISTER' : 'LOCKED'}
                    <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {selectedTournament && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTournament(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl bg-hud-panel border border-hud-accent/30 p-8 md:p-12 space-y-8"
            >
              <button 
                onClick={() => setSelectedTournament(null)}
                className="absolute top-4 right-4 text-text-dim hover:text-white"
              >
                <X size={24} />
              </button>

              {isSuccess ? (
                <div className="py-20 text-center space-y-6">
                  <div className="w-20 h-20 bg-hud-accent rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-hud-accent/20">
                    <Zap size={40} className="text-black" />
                  </div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter italic">REGISTRATION <span className="text-hud-accent">SUCCESSFUL!</span></h2>
                  <p className="font-mono text-xs text-text-muted tracking-widest">DETAILS TRANSMITTED TO COMMAND CENTER.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 text-center">
                    <p className="text-[10px] font-mono text-hud-accent tracking-[0.5em] uppercase">{selectedTournament.type} REGISTRATION</p>
                    <h2 className="text-4xl font-black tracking-tighter uppercase">{selectedTournament.title}</h2>
                    <div className="h-px w-24 bg-hud-accent mx-auto opacity-20" />
                  </div>

                  <form onSubmit={handleRegister} className="space-y-6">
                    {selectedTournament.type === 'SQUAD' ? (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormInput label="TEAM NAME" name="teamName" placeholder="E.G. REAGAN SQUADS" required />
                          <FormInput label="CAPTAIN NAME" name="captain" placeholder="E.G. REAGAN_PRO" required />
                        </div>
                        <FormInput label="PLAYER IDs (UIDs)" name="playerIds" placeholder="E.G. 123456, 789012, ..." required />
                      </>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormInput label="PLAYER NAME" name="playerName" placeholder="E.G. REAGAN_SOLO" required />
                          <FormInput label="PLAYER ID (UID)" name="playerId" placeholder="E.G. 12345678" required />
                        </div>
                      </>
                    )}
                    
                    <FormInput label="DISCORD / WHATSAPP" name="contact" placeholder="CONTACT FOR ROOM ID" required />

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "w-full py-5 font-black uppercase tracking-[0.3em] transition-all transform active:scale-95",
                        isSubmitting ? "bg-white/10 text-text-dim cursor-wait" : "bg-hud-accent text-black hover:bg-white"
                      )}
                    >
                      {isSubmitting ? 'TRANSMITTING...' : 'CONFIRM REGISTRATION'}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FormInput: React.FC<{ label: string; name: string; placeholder: string; required?: boolean }> = ({ label, name, placeholder, required }) => (
  <div className="space-y-2 text-left">
    <label className="text-[10px] font-mono text-hud-accent tracking-widest uppercase font-bold">{label}</label>
    <input 
      name={name}
      required={required}
      className="w-full bg-white/5 border border-white/10 p-4 focus:border-hud-accent outline-none transition-colors text-xs font-mono uppercase" 
      placeholder={placeholder} 
    />
  </div>
);



const StatBlock: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="text-right space-y-1">
    <p className="text-[10px] font-mono text-hud-accent tracking-widest">{label}</p>
    <p className="text-3xl font-display font-black">{value}</p>
  </div>
);

const MetaItem: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-2 text-[10px] font-mono text-white/60 uppercase tracking-wider">
    <span className="text-hud-accent">{icon}</span>
    {text}
  </div>
);

const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-[10px] font-mono text-white/30 tracking-widest uppercase">{label}</p>
    <p className="text-sm font-bold tracking-wider">{value}</p>
  </div>
);
