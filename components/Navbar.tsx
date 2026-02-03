'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Education', path: '/education' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
  ];

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[9999] w-max">
      <div className="flex items-center gap-6 px-6 py-2.5 bg-white/80 backdrop-blur-xl border border-zinc-200/50 shadow-2xl rounded-full">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold tracking-tighter text-zinc-900 pr-4 border-r border-zinc-200"
        >
          Edmund
        </Link>

        {/* Links Flat List */}
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`relative px-4 py-1.5 z-10 text-sm transition-colors ${isActive ? 'text-white font-medium' : 'text-zinc-500 hover:text-zinc-900'
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-zinc-900 rounded-full -z-10"
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}