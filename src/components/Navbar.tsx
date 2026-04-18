import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { IconDisc } from './Icons';

// NASA-style palette — warm red → orange → teal → deep blue (top → bottom)
const navLinks = [
    { label: 'HOME',     path: '',         color: '#C71F2D' },  // NASA red
    { label: 'POSTS',    path: 'posts',    color: '#D45814' },  // NASA orange
    { label: 'PROJECTS', path: 'projects', color: '#B8860B' },  // dark goldenrod
    { label: 'NOTES',    path: 'notes',    color: '#5C8A2F' },  // olive green
    { label: 'STUDIES',  path: 'studies',  color: '#2E7D6F' },  // teal
    { label: 'ABOUT',    path: 'about',    color: '#2C5F9A' },  // medium blue
    { label: 'CV',       path: 'cv',       color: '#21467A' },  // NASA deep blue
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { scrollY } = useScroll();
    const rotate = useTransform(scrollY, [0, 1000], [0, 540], { clamp: false });
    const baseUrl = import.meta.env.BASE_URL;

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Close menu on ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const getHref = (path: string) => path === '' ? (baseUrl || '/') : `${baseUrl}${path}`;

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-[100] bg-[#f0f0ed]/90 backdrop-blur-sm border-b border-black/10">
                <div className="content-container h-16 flex items-center justify-between">
                    <a href={baseUrl || '/'} className="flex items-center gap-2 group">
                        <IconDisc className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                        <span className="font-black italic tracking-tighter text-lg">C_L1gh7</span>
                    </a>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-8 font-bold text-xs font-mono">
                        {navLinks.map(({ label, path, color }) => (
                            <a
                                key={label}
                                href={getHref(path)}
                                className="transition-colors duration-200"
                                style={{ ['--hover-color' as string]: color }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = color)}
                                onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                            >
                                {label}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <motion.div style={{ rotate }} className="hidden md:flex w-6 h-6 border-2 border-black rounded-full relative items-center justify-center">
                            <div className="absolute w-full h-0.5 bg-black"></div>
                            <div className="absolute w-full h-0.5 bg-black rotate-90"></div>
                        </motion.div>

                        {/* Hamburger button — mobile only */}
                        <button
                            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] relative z-[110]"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isOpen}
                        >
                            <motion.span
                                className="block w-5 h-[2px] bg-black origin-center"
                                animate={isOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.25 }}
                            />
                            <motion.span
                                className="block w-5 h-[2px] bg-black origin-center"
                                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                                transition={{ duration: 0.15 }}
                            />
                            <motion.span
                                className="block w-5 h-[2px] bg-black origin-center"
                                animate={isOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.25 }}
                            />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-[99] bg-[#f0f0ed] flex flex-col items-center justify-center md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <nav className="flex flex-col items-center gap-6">
                            {navLinks.map(({ label, path, color }, i) => (
                                <motion.a
                                    key={label}
                                    href={getHref(path)}
                                    className="font-mono font-black text-2xl tracking-widest text-black relative group"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ delay: i * 0.05, duration: 0.25 }}
                                    onClick={() => setIsOpen(false)}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = color)}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                                    onTouchStart={(e) => (e.currentTarget.style.color = color)}
                                >
                                    {label}
                                    <span
                                        className="absolute -bottom-1 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300"
                                        style={{ backgroundColor: color }}
                                    />
                                </motion.a>
                            ))}
                        </nav>

                        {/* Decorative rotating disc at bottom */}
                        <motion.div
                            className="absolute bottom-12 w-10 h-10 border-2 border-black/20 rounded-full flex items-center justify-center"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                        >
                            <div className="absolute w-full h-0.5 bg-black/20"></div>
                            <div className="absolute w-full h-0.5 bg-black/20 rotate-90"></div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
