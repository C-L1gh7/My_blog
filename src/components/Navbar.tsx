import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IconDisc } from './Icons';

const Navbar = () => {
    const { scrollY } = useScroll();
    const rotate = useTransform(scrollY, [0, 1000], [0, 540], { clamp: false });

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-[#f0f0ed]/90 backdrop-blur-sm border-b border-black/10">
            <div className="content-container h-16 flex items-center justify-between">
                <a href="/" className="flex items-center gap-2 group">
                    <IconDisc className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                    <span className="font-black italic tracking-tighter text-lg">C_L1gh7</span>
                </a>
                
                <div className="hidden md:flex items-center gap-8 font-bold text-xs font-mono">
                    <a href="/" className="hover:text-red-600 transition-colors">HOME</a>
                    <a href="/posts" className="hover:text-red-600 transition-colors">POSTS</a>
                    <a href="/notes" className="hover:text-red-600 transition-colors">NOTES</a>
                    <a href="/studies" className="hover:text-red-600 transition-colors">STUDIES</a>
                    <a href="/about" className="hover:text-red-600 transition-colors">ABOUT</a>
                </div>

                <div className="flex items-center gap-3">
                    <motion.div style={{ rotate }} className="w-6 h-6 border-2 border-black rounded-full relative flex items-center justify-center">
                        <div className="absolute w-full h-0.5 bg-black"></div>
                        <div className="absolute w-full h-0.5 bg-black rotate-90"></div>
                    </motion.div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
