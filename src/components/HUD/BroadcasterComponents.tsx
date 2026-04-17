import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

/**
 * Animated Audio Waveform for the Hero section
 */
export const AudioWaveform: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-[2px] h-12">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-hud-accent/60 will-change-[height]"
          animate={{ 
            height: [10, (i % 3 === 0 ? 40 : 25) + Math.sin(i) * 5, 10],
          }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: i * 0.05
          }}
        />
      ))}
    </div>
  );
};

/**
 * Kill-feed style achievement logger
 */
export const AchievementFeed: React.FC = () => {
  const achievements = [
    { text: "REAGANVERSE casted ELITE CUP", time: "2m ago" },
    { text: "150K FANS REACHED", time: "1h ago" },
    { text: "STREAMED FOR 5 HOURS", time: "3h ago" },
    { text: "NEW VIDEO UPLOADED", time: "5h ago" },
  ];

  return (
    <div className="space-y-2 pointer-events-none">
      {achievements.map((item, i) => (
        <motion.div
          key={i}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: i * 0.5 }}
          className="flex items-center gap-3 bg-hud-accent/10 border-l-2 border-hud-accent p-2 text-[9px] font-bold tracking-widest uppercase italic"
        >
          <span className="text-white/40">{item.time}</span>
          <span className="text-white">{item.text}</span>
        </motion.div>
      ))}
    </div>
  );
};

/**
 * Simple Radar Chart for Caster Skills
 */
export const RadarStats: React.FC = () => {
  const skills = [
    { name: "ENERGY", value: 95 },
    { name: "GAMING", value: 88 },
    { name: "HYPE", value: 98 },
    { name: "TACTICS", value: 85 },
    { name: "ANALYSIS", value: 92 },
    { name: "VOICE", value: 97 },
  ];

  const size = 200;
  const center = size / 2;
  const radius = 80;

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / skills.length - Math.PI / 2;
    const r = (radius * value) / 100;
    return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
  };

  const points = skills.map((s, i) => getPoint(i, s.value)).join(' ');

  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={size} className="drop-shadow-glow">
        {/* Background Hexagon */}
        <polygon
          points={skills.map((_, i) => getPoint(i, 100)).join(' ')}
          className="fill-white/5 stroke-white/10 stroke-1"
        />
        {/* Grid lines */}
        {[25, 50, 75].map(v => (
          <polygon
            key={v}
            points={skills.map((_, i) => getPoint(i, v)).join(' ')}
            className="fill-none stroke-white/5 stroke-1"
          />
        ))}
        {/* Skill Area */}
        <motion.polygon
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          points={points}
          className="fill-hud-accent/30 stroke-hud-accent stroke-2"
        />
        {/* Labels */}
        {skills.map((s, i) => {
          const p = getPoint(i, 115);
          const [x, y] = p.split(',').map(Number);
          return (
            <text
              key={s.name}
              x={x}
              y={y}
              className="fill-white/40 font-mono text-[8px] font-bold"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {s.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * Scrolling Fan Hype Ticker
 */
export const HypeTicker: React.FC = () => {
  const messages = [
    "REAGANVERSE IS LIVE NOW", "BOOYAH! 150K SUBS REACHED", "NEXT TOURNAMENT: ELITE CUP", 
    "OP CASTING BRO!", "JOIN THE DISCORD FOR EXCLUSIVE CONTENT", "REAGANVERSE - THE VOICE OF FF",
    "NEW VIDEO OUT ON YOUTUBE!", "BEST FREE FIRE CASTER 2024", "REGISTER FOR COMMUNITY CUP",
    "FOLLOW ON INSTAGRAM @REAGANVERSE_OFFICIAL"
  ];

  return (
    <div className="w-full bg-hud-accent/5 border-y border-hud-accent/10 py-4 overflow-hidden flex whitespace-nowrap backdrop-blur-sm">
      <div className="flex animate-marquee gap-16 whitespace-nowrap">
        {[...messages, ...messages].map((msg, i) => (
          <div key={i} className="flex items-center gap-12">
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 bg-hud-accent rotate-45 hud-glow" />
              <div className="w-1.5 h-1.5 bg-white rotate-45" />
            </div>
            <span className="text-xs font-mono font-black tracking-[0.4em] text-white/90 uppercase italic">
              {msg}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Interactive Soundboard for Caster Hype
 */
export const Soundboard: React.FC<{ onTrigger?: (text: string, color: string) => void }> = ({ onTrigger }) => {
  const sounds = [
    { label: "BOOYAH!", color: "bg-[#FF3E3E] text-black", glow: "rgba(255, 62, 62, 1)" },
    { label: "HEADSHOT!", color: "border border-[#00FFFF] text-[#00FFFF]", glow: "rgba(0, 255, 255, 1)" },
    { label: "GODLIKE!", color: "bg-[#7000FF] text-white", glow: "rgba(112, 0, 255, 1)" },
    { label: "TEAM WIPE!", color: "border border-[#FFD700] text-[#FFD700]", glow: "rgba(255, 215, 0, 1)" },
    { label: "OP CAST!", color: "bg-[#00FF41] text-black", glow: "rgba(0, 255, 65, 1)" },
    { label: "UNREAL!", color: "border border-[#FF00FF] text-[#FF00FF]", glow: "rgba(255, 0, 255, 1)" },
    { label: "INSANE!", color: "bg-[#FF8C00] text-black", glow: "rgba(255, 140, 0, 1)" },
    { label: "CLUTCH!", color: "border border-white text-white", glow: "rgba(255, 255, 255, 1)" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
      {sounds.map((sound, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTrigger?.(sound.label, sound.glow)}
          className={cn(
            "p-5 font-black italic tracking-tighter text-sm transition-all shadow-xl uppercase cursor-pointer cyber-button",
            sound.color,
            "hover:brightness-125"
          )}
        >
          <div className="relative z-10">{sound.label}</div>
          <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
        </motion.button>
      ))}
    </div>
  );
};

const HelmetBreak = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
        animate={{ 
          scale: [0, 1, 0.5],
          x: (Math.random() - 0.5) * 400,
          y: (Math.random() - 0.5) * 400,
          rotate: Math.random() * 360,
          opacity: [1, 1, 0]
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="shatter-piece"
      />
    ))}
  </div>
);

const TrophyRain = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: -100, x: (i * 200) - 800, rotate: 0 }}
        animate={{ 
          y: 1200, 
          rotate: 360,
          x: (i * 200) - 800 + (Math.random() * 100)
        }}
        transition={{ duration: 1.5, delay: i * 0.1, ease: "linear" }}
        className="absolute"
      >
        <TrophyIcon size={48} className="text-hud-accent/40" />
      </motion.div>
    ))}
  </div>
);

import { Trophy as TrophyIcon, Zap, ShieldAlert, Target, Crown, Flame, Heart, Swords } from 'lucide-react';

/**
 * Animated Word Overlay for Soundboard triggers with unique effects
 */
export const SoundEffect: React.FC<{ text: string; color: string; onComplete: () => void }> = ({ text, color, onComplete }) => {
  const getIcon = () => {
    switch(text) {
      case "BOOYAH!": return <TrophyIcon className="w-32 h-32 md:w-64 md:h-64" />;
      case "HEADSHOT!": return <Target className="w-32 h-32 md:w-64 md:h-64" />;
      case "GODLIKE!": return <Crown className="w-32 h-32 md:w-64 md:h-64" />;
      case "TEAM WIPE!": return <Flame className="w-32 h-32 md:w-64 md:h-64" />;
      case "OP CAST!": return <Swords className="w-32 h-32 md:w-64 md:h-64" />;
      case "UNREAL!": return <Zap className="w-32 h-32 md:w-64 md:h-64" />;
      case "INSANE!": return <ShieldAlert className="w-32 h-32 md:w-64 md:h-64" />;
      case "CLUTCH!": return <Heart className="w-32 h-32 md:w-64 md:h-64" />;
      default: return null;
    }
  };

  const getAnimation = () => {
    if (text === "HEADSHOT!") {
      return {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: [0, 1.2, 1], opacity: 1 },
        exit: { scale: 2, opacity: 0, filter: "blur(40px)" }
      };
    }
    return {
      initial: { opacity: 0, scale: 0.2, y: 50 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 5, y: -100, filter: "blur(20px)" }
    };
  };

  const anim = getAnimation();

  return (
    <motion.div
      initial={anim.initial}
      animate={anim.animate}
      exit={anim.exit}
      transition={{ type: "spring", damping: 15, stiffness: 150 }}
      onAnimationComplete={() => {
        // Dynamic timeout based on content
        const delay = text === "BOOYAH!" ? 3000 : 1500;
        setTimeout(onComplete, delay);
      }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center pointer-events-none will-change-transform"
    >
      {text === "HEADSHOT!" && <HelmetBreak />}
      {text === "BOOYAH!" && <TrophyRain />}

      <div className="relative flex flex-col items-center">
        {/* Superior Glow Overlay */}
        <div 
          className="absolute inset-0 blur-[120px] scale-150 rounded-full opacity-40 will-change-transform"
          style={{ backgroundColor: color }}
        />

        {/* Unique Icon Animation */}
        <motion.div
          animate={text.includes("HEADSHOT") ? {
            rotate: [0, -8, 8, -8, 8, 0],
            scale: [1, 1.1, 1]
          } : {
            y: [-10, 10, -10],
          }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="mb-8 z-10"
          style={{ color: "white", filter: `drop-shadow(0 0 30px ${color})` }}
        >
          {getIcon()}
        </motion.div>

        {/* The Text - Simplified shadows */}
        <h2 
          className="relative text-7xl md:text-[10rem] font-black italic tracking-tighter uppercase text-white text-center leading-none z-10"
          style={{ 
            textShadow: `0 0 30px ${color}, 0 0 60px ${color}`,
          }}
        >
          {text}
        </h2>

        {/* Optimized Headshot lines */}
        {text.includes("HEADSHOT") && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 2] }}
            transition={{ duration: 0.4, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <div className="absolute w-full h-1 bg-white blur-[1px] rotate-45" />
            <div className="absolute w-full h-1 bg-white blur-[1px] -rotate-45" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

