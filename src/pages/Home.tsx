/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Youtube, Disc as Discord, Instagram, Radio, Play, Trophy, Users, MessageSquare, ChevronRight, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { fetchLatestVideos, type YouTubeVideo } from '@/src/services/youtube';
import { AudioWaveform, RadarStats, HypeTicker, Soundboard, SoundEffect } from '@/src/components/HUD/BroadcasterComponents';
import { Link } from 'react-router-dom';

const HomeFooter = ({ onSoundTrigger }: { onSoundTrigger: (text: string, color: string) => void }) => (
  <footer className="pt-20 space-y-20">
    <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10 text-center">
      <p className="text-[10px] font-mono text-hud-accent tracking-[0.5em] font-bold uppercase">Viral Soundboard</p>
      <Soundboard onTrigger={onSoundTrigger} />
    </div>
    <div className="relative z-50">
      <HypeTicker />
    </div>
  </footer>
);

export const Home: React.FC = () => {
  const [activeEffect, setActiveEffect] = React.useState<{ text: string; color: string } | null>(null);

  return (
    <motion.div 
      className="pb-0"
      animate={activeEffect ? { x: [-2, 2, -1, 1, 0], y: [1, -1, 2, -2, 0] } : {}}
      transition={{ duration: 0.2, repeat: 2 }}
    >
      <HeroSection />
      <div className="px-4 md:px-8 max-w-7xl mx-auto space-y-32">
        <LinksSection />
        <TournamentSection />
        <ProfileSection />
        <ContactSection />
      </div>
      <HomeFooter onSoundTrigger={(text, color) => setActiveEffect({ text, color })} />

      <AnimatePresence>
        {activeEffect && (
          <SoundEffect 
            text={activeEffect.text} 
            color={activeEffect.color}
            onComplete={() => setActiveEffect(null)} 
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const HeroSection = () => {

  return (
    <section className="relative overflow-hidden min-h-[60vh] md:min-h-[85vh] flex flex-col justify-center p-8 md:p-16 border-b border-hud-border pt-24 md:pt-32">
      <img
        src="/hero_bg.png"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-40"
        alt="Reaganverse Hero"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-black/80 -z-10" />
      
      {/* Corner Brackets */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-hud-accent z-10" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-hud-accent z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 space-y-8"
      >
        <h1 className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase hud-text-glow">
          REAGAN<br />VERSE
          <span className="block text-lg md:text-2xl font-normal tracking-[0.5em] text-text-dim mt-4">OFFICIAL CASTER</span>
        </h1>

        <div className="flex flex-wrap gap-4 pt-4">
          <Tag label="Competitive Pro" />
          <Tag label="Tournament Host" />
          <Tag label="YouTube Caster" />
        </div>

        <div className="pt-8 flex flex-wrap items-center gap-10">
          <div className="flex flex-wrap gap-4 sm:gap-6 w-full sm:w-auto">
            <Link to="/youtube" className="w-full sm:w-auto">
              <CTAButton icon={<Play size={18} />} label="WATCH MY STREAMS" />
            </Link>
            <Link to="/tournaments" className="w-full sm:w-auto">
              <CTAButton icon={<Trophy size={18} />} label="SEE TOURNAMENTS" variant="outline" />
            </Link>
          </div>
          
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono text-hud-accent tracking-widest uppercase">Voice Level</span>
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }} 
              transition={{ duration: 2, repeat: Infinity }}
            >
              <AudioWaveform />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const Tag: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center gap-2 px-4 py-2 border border-hud-border bg-white/[0.03] text-[10px] uppercase tracking-widest">
    <div className="w-1 h-1 bg-hud-accent" />
    {label}
  </div>
);

const CTAButton: React.FC<{ icon: React.ReactNode; label: string; variant?: 'primary' | 'outline' }> = ({ icon, label, variant = 'primary' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "group relative flex items-center justify-center gap-3 px-8 py-4 font-mono font-bold tracking-widest text-[10px] transition-all duration-300 overflow-hidden cursor-pointer",
        variant === 'primary' 
          ? "bg-hud-accent text-black hover:bg-white" 
          : "border border-hud-border text-white hover:bg-white/5"
      )}
    >
      <div className="relative z-10 flex items-center gap-3">
        {icon}
        {label}
      </div>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-white/20 group-hover:animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </motion.button>
  );
};

const LinksSection = () => {
  const links = [
    { name: 'YouTube', icon: <Youtube />, url: 'https://youtube.com/@caster_reagan' },
    { name: 'Discord', icon: <Discord />, url: 'https://discord.gg/reaganverse' },
    { name: 'Instagram', icon: <Instagram />, url: 'https://www.instagram.com/reaganverse_official' },
    { name: 'Broadcast', icon: <Radio />, url: 'https://www.instagram.com/channel/AbbZBo-BgJgvOBm8' },
  ];

  return (
    <section className="space-y-12">
      <SectionHeader title="Find Me On" subtitle="Connect with me everywhere" id="01" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {links.map((link, i) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ delay: i * 0.1 }}
            className="group relative p-8 border border-hud-border bg-hud-panel overflow-hidden transition-all duration-300 hover:border-hud-accent/50 hover:bg-hud-accent/5"
          >
            <div className="relative z-10 flex flex-col gap-6">
              <div 
                className="w-12 h-12 flex items-center justify-center bg-white/[0.05] group-hover:bg-hud-accent group-hover:text-black transition-colors"
              >
                {link.icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black uppercase tracking-tighter group-hover:text-hud-accent transition-colors">{link.name}</h3>
                <p className="text-[10px] font-mono text-text-dim uppercase tracking-widest">Connect_Link_0{i+1}</p>
              </div>
              <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={16} className="text-hud-accent" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};


const TournamentSection = () => {
  const tournaments = [
    { 
      title: 'REAGANVERSE ELITE CUP', 
      format: 'Squad / Battle Royale', 
      date: 'APR 25, 2024', 
      time: '18:00 IST', 
      prize: '₹50,000', 
      status: 'REGISTRATION OPEN' 
    },
    { 
      title: 'FREE FIRE SNIPER SHOWDOWN', 
      format: 'Solo / Sniper Only', 
      date: 'MAY 02, 2024', 
      time: '20:00 IST', 
      prize: '₹10,000', 
      status: 'UPCOMING' 
    },
  ];

  return (
    <section className="space-y-12">
      <SectionHeader title="Tournament Info" subtitle="Where I am casting next" id="02" />
      
      {/* Featured Tournament */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="relative p-1 border border-hud-accent/30 bg-hud-accent/5 overflow-hidden group"
      >
        <div className="absolute top-0 right-0 px-4 py-1 bg-hud-accent text-black font-mono text-[10px] font-black tracking-widest">FEATURED EVENT</div>
        <div className="p-8 md:p-12 flex flex-col xl:flex-row justify-between items-center gap-10 text-center xl:text-left">
          <div className="space-y-4">
            <h3 className="text-4xl md:text-6xl xl:text-7xl font-black tracking-tighter uppercase italic leading-none">FREE FIRE <span className="text-hud-accent">WORLD CUP</span></h3>
            <p className="text-text-dim font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em]">Grand Finale • Caster Live on Main Stage</p>
          </div>
          <Link to="/tournaments" className="w-full sm:w-auto px-10 py-5 bg-white text-black font-black tracking-widest text-xs sm:text-sm hover:bg-hud-accent transition-colors text-center">WATCH LIVE PREVIEW</Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {tournaments.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative bg-hud-panel border border-hud-border p-8 flex flex-col md:flex-row gap-8 overflow-hidden"
          >
            <div className="absolute top-0 right-0 px-4 py-1 bg-hud-accent/10 border-b border-l border-hud-border">
              <span className="text-[9px] font-mono font-bold text-hud-accent tracking-widest animate-pulse">{t.status}</span>
            </div>

            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tighter uppercase">{t.title}</h3>
                <p className="text-[10px] font-mono text-text-dim uppercase tracking-[0.3em]">{t.format}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <InfoBlock label="DATE" value={t.date} />
                <InfoBlock label="TIME" value={t.time} />
                <InfoBlock label="PRIZE POOL" value={t.prize} />
                <InfoBlock label="ENTRY" value="FREE" />
              </div>

              <div className="pt-4">
                <button className="w-full py-3 border border-hud-accent/30 text-hud-accent font-mono font-bold text-[10px] tracking-[0.3em] hover:bg-hud-accent hover:text-black transition-all duration-300">
                  SIGN UP NOW
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ProfileSection = () => {
  const stats = [
    { label: 'MATCHES DONE', value: '500+' },
    { label: 'EVENTS HOSTED', value: '45' },
    { label: 'FANS', value: '150K+' },
    { label: 'YEARS ACTIVE', value: '4' },
  ];

  return (
    <section className="space-y-12">
      <SectionHeader title="About Reagan" subtitle="Learn more about me" id="03" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        <div className="lg:col-span-1 relative aspect-square border border-hud-border p-4 bg-hud-panel">
          <img 
            src="https://yt3.googleusercontent.com/xlF7VAVl99blCOVg3xJwT2VCyE1bt14bd51yXZBcdIzGscBAzs_OmC1QDQpqJzTz4jIqqQ0POw=s900-c-k-c0x00ffffff-no-rj" 
            alt="Reagan" 
            className="w-full h-full object-cover filter brightness-75 contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h2 className="text-6xl font-signature text-hud-accent opacity-60 -rotate-12 translate-y-20">Reaganverse</h2>
          </div>
          <div className="absolute inset-0 border border-hud-accent opacity-20 m-8 animate-pulse" />
          <div className="absolute top-4 right-4 animate-bounce">
            <div className="px-2 py-0.5 border border-hud-accent text-[8px] font-bold text-hud-accent">PRO_CASTER</div>
          </div>
        </div>

        <div className="lg:col-span-1 flex justify-center">
          <div className="space-y-4 text-center">
            <p className="text-[10px] font-mono text-hud-accent tracking-[0.3em] font-bold">MY CASTER STATS</p>
            <RadarStats />
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <div className="space-y-4">
            <h3 className="text-3xl font-black tracking-tighter uppercase">THE VOICE OF COMPETITIVE FREE FIRE</h3>
            <p className="text-text-dim leading-relaxed font-mono text-xs uppercase tracking-wider">
              REAGAN IS A PROFESSIONAL ESPORTS CASTER AND TOURNAMENT HOST FOR FREE FIRE MAX. 
              KNOWN FOR HIS HIGH-ENERGY COMMENTARY AND DEEP GAME KNOWLEDGE, 
              HE IS ONE OF THE MOST FAMOUS VOICES IN THE ESPORTS WORLD.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(stat => (
              <div key={stat.label} className="space-y-1">
                <p className="text-[9px] font-mono text-hud-accent tracking-widest uppercase">{stat.label}</p>
                <p className="text-2xl font-black">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section className="space-y-12">
      <SectionHeader title="Get In Touch" subtitle="Message me or join my community" id="04" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-1 space-y-6">
          <ContactCard icon={<MessageSquare />} label="DISCORD" value="REAGAN#0001" />
          <ContactCard icon={<Instagram />} label="INSTAGRAM" value="@reaganverse_official" />
          <ContactCard icon={<Users />} label="BROADCAST" value="JOIN CHANNEL" />
        </div>
        
        {/* Contact Form */}
        <div className="md:col-span-2 glass-panel p-8 md:p-12 space-y-8 bg-white/[0.02] border border-white/5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-hud-accent tracking-widest uppercase font-bold">Your Name</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 p-4 focus:border-hud-accent outline-none transition-colors text-xs font-mono" placeholder="ENTER NAME" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-hud-accent tracking-widest uppercase font-bold">Email Address</label>
              <input type="email" className="w-full bg-white/5 border border-white/10 p-4 focus:border-hud-accent outline-none transition-colors text-xs font-mono" placeholder="ENTER EMAIL" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-hud-accent tracking-widest uppercase font-bold">Your Message</label>
            <textarea className="w-full bg-white/5 border border-white/10 p-4 h-32 focus:border-hud-accent outline-none transition-colors text-xs font-mono resize-none" placeholder="TYPE YOUR MESSAGE"></textarea>
          </div>
          <button className="w-full bg-hud-accent text-black py-5 font-black tracking-[0.3em] uppercase hover:bg-white transition-all transform active:scale-[0.98] cursor-pointer">
            SEND BROADCAST
          </button>
        </div>
      </div>
    </section>
  );
};


const SectionHeader: React.FC<{ title: string; subtitle: string; id: string }> = ({ title, subtitle, id }) => {
  return (
    <div className="relative flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <span className="text-xs font-mono text-hud-accent font-bold tracking-widest">{id}</span>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-[2px] bg-hud-accent/40" 
        />
      </div>
      <div className="flex flex-col">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">{title}</h2>
        <p className="text-[10px] font-mono text-text-dim uppercase tracking-[0.4em]">{subtitle}</p>
      </div>
    </div>
  );
};

const InfoBlock: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-[9px] font-mono text-hud-accent tracking-widest uppercase">{label}</p>
    <p className="text-xs font-bold tracking-wider uppercase">{value}</p>
  </div>
);

const ContactCard: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-hud-panel border border-hud-border p-6 flex flex-col items-center text-center gap-4 group hover:border-hud-accent transition-all"
  >
    <div className="p-4 bg-white/5 rounded-full text-hud-accent group-hover:hud-glow transition-all">
      {icon}
    </div>
    <div className="space-y-1">
      <p className="text-[9px] font-mono text-text-dim tracking-widest uppercase">{label}</p>
      <p className="text-[10px] font-bold tracking-widest uppercase">{value}</p>
    </div>
  </motion.div>
);
