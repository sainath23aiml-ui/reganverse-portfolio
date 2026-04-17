/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Youtube, Disc as Discord, Instagram, Radio, ExternalLink, Globe, Share2, Mail } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const Links: React.FC = () => {
  const links = [
    { name: 'YOUTUBE CHANNEL', icon: <Youtube />, url: 'https://youtube.com/@caster_reagan', desc: 'Watch my Free Fire videos here', id: 'LINK_01' },
    { name: 'DISCORD SERVER', icon: <Discord />, url: 'https://discord.gg/reaganverse', desc: 'Join my community for news and fun', id: 'LINK_02' },
    { name: 'INSTAGRAM', icon: <Instagram />, url: 'https://www.instagram.com/reaganverse_official', desc: 'See my daily updates', id: 'LINK_03' },
    { name: 'BROADCAST CHANNEL', icon: <Radio />, url: 'https://www.instagram.com/channel/AbbZBo-BgJgvOBm8', desc: 'Get live news directly on Instagram', id: 'LINK_04' },
    { name: 'OFFICIAL WEBSITE', icon: <Globe />, url: '#', desc: 'Main info about me', id: 'LINK_05' },
    { name: 'BUSINESS INQUIRIES', icon: <Mail />, url: 'mailto:contact@reaganverse.com', desc: 'Email me for professional work', id: 'LINK_06' },
  ];

  return (
    <div className="pt-32 pb-32 px-4 md:px-8 max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1 border border-hud-accent text-[10px] font-mono text-hud-accent tracking-[0.5em] uppercase"
        >
          CONNECT WITH ME
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">MY <span className="text-hud-accent">LINKS</span></h1>
        <p className="text-text-dim font-mono text-xs uppercase tracking-widest">Choose a link to visit my profile</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {links.map((link, i) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-hud-panel border border-hud-border p-6 flex items-center gap-6 hover:bg-hud-accent-dim hover:border-hud-accent transition-all duration-300"
          >
            <div className="p-4 bg-white/5 rounded-sm text-hud-accent group-hover:hud-glow transition-all">
              {link.icon}
            </div>

            <div className="flex-1 space-y-1">
              <h3 className="text-lg font-bold tracking-tight group-hover:text-hud-accent transition-colors uppercase">{link.name}</h3>
              <p className="text-[10px] text-text-dim font-mono uppercase tracking-wider">{link.desc}</p>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="font-mono text-[8px] text-hud-accent opacity-0 group-hover:opacity-100 transition-opacity uppercase">CLICK_TO_OPEN</span>
              <ExternalLink size={16} className="text-white/20 group-hover:text-white transition-colors" />
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

