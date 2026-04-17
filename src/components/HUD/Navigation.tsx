/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const navItems = [
  { name: 'HOME', path: '/', id: '01' },
  { name: 'YOUTUBE', path: '/youtube', id: '02' },
  { name: 'LINKS', path: '/links', id: '03' },
  { name: 'TOURNAMENTS', path: '/tournaments', id: '04' },
];

export const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 lg:left-[70px] right-0 z-[100] px-4 py-3 border-b border-hud-accent/30 bg-hud-bg/90 backdrop-blur-xl flex justify-center shadow-[0_0_20px_rgba(255,62,62,0.15)]">
      <div className="flex items-center gap-2 md:gap-8">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                className={cn(
                  "relative px-4 py-2 group transition-all duration-300",
                  "border border-transparent hover:border-hud-border",
                  isActive && "bg-hud-accent/10 border-hud-accent/30"
                )}
              >
                {/* ID Label */}
                <span className={cn(
                  "absolute -top-1 left-1 text-[7px] font-mono transition-colors duration-300",
                  isActive ? "text-hud-accent" : "text-white/20 group-hover:text-white/40"
                )}>
                  {item.id}
                </span>

                {/* Main Text */}
                <span className={cn(
                  "text-[10px] md:text-xs font-mono font-bold tracking-[0.3em] transition-all duration-300",
                  isActive ? "text-hud-accent" : "text-white/40 group-hover:text-white"
                )}>
                  {item.name}
                </span>

                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-hud-accent"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
