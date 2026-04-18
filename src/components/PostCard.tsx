import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconArrowRight } from './Icons';

export interface PostProps {
    id: string | number;
    date: string;
    tag?: string;
    title: string;
    excerpt?: string;
    image?: string;
    slug: string;
}

/** Detect touch-primary device (no fine pointer) */
const isTouchDevice = () =>
    typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

const PostCard = ({ post }: { post: PostProps }) => {
    if (!post.slug) {
        console.error('PostCard: missing slug for post', post);
        return null;
    }

    const hasImage = !!post.image;
    const [isActive, setIsActive] = useState(false);
    const [isTouch, setIsTouch] = useState(false);
    const baseUrl = import.meta.env.BASE_URL;

    useEffect(() => { setIsTouch(isTouchDevice()); }, []);

    // On touch devices: tap toggles the "active" highlight; second tap follows the link.
    // On pointer devices: hover drives the highlight as before.
    const handleTap = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        if (!isTouch) return;           // pointer devices — let <a> navigate normally
        if (!isActive) {
            e.preventDefault();         // first tap: show preview, don't navigate
            setIsActive(true);
        }
        // second tap: isActive is already true → default <a> navigation fires
    }, [isTouch, isActive]);

    const cardVariants = {
        active: {
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderColor: "#000000",
            scale: isTouch ? 1 : 1.02,  // no scale jump on mobile — avoids layout shift
            boxShadow: isTouch
                ? "6px 6px 0px rgba(26, 26, 26, 1)"
                : "12px 12px 0px rgba(26, 26, 26, 1)",
            zIndex: 50,
            transition: { type: "spring", stiffness: 300, damping: 25 }
        },
        idle: {
            backgroundColor: "rgba(255, 255, 255, 1)",
            borderColor: "rgba(0, 0, 0, 0.1)",
            scale: 1,
            boxShadow: "0px 0px 0px rgba(0,0,0,0)",
            zIndex: 50,
            transition: { type: "spring", stiffness: 300, damping: 25 },
            transitionEnd: { zIndex: 10 }
        }
    };

    const imageVariants = {
        active: {
            scale: 1.1,
            filter: "brightness(1.1) saturate(1.25) contrast(1.1)",
            transition: { duration: 0.5, ease: "easeOut" }
        },
        idle: {
            scale: 1,
            filter: "brightness(1) saturate(1) contrast(1)",
            transition: { duration: 0.5, ease: "easeInOut" }
        }
    };

    return (
    <a
        href={`${baseUrl}posts/${post.slug}`}
        className="block relative"
        onClick={handleTap}
    >
        <motion.article
            layout
            variants={cardVariants}
            initial="idle"
            animate={isActive ? "active" : "idle"}
            onHoverStart={() => !isTouch && setIsActive(true)}
            onHoverEnd={() => !isTouch && setIsActive(false)}
            className={`group border flex flex-col sm:flex-row gap-4 sm:gap-6 overflow-hidden sm:overflow-visible relative cursor-pointer
                ${hasImage ? 'p-0 sm:p-5' : 'p-5'}
            `}
            style={{ backdropFilter: isActive ? "blur(4px)" : "none" }}
        >
            {/* Post Thumbnail */}
            {hasImage && (
                <div className="sm:w-48 h-36 sm:h-32 bg-gray-200 shrink-0 border-b sm:border-b-0 sm:border border-black/10 relative overflow-hidden">
                    <motion.img
                        variants={imageVariants}
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    {/* Teal & Orange Film Look Overlay — visible on active (hover or tap) */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-cyan-600/40 via-transparent to-orange-600/40 mix-blend-overlay transition-opacity duration-500 pointer-events-none ${isActive ? 'opacity-60' : 'opacity-0'}`}></div>
                </div>
            )}

            {/* Post Content */}
            <div className={`flex flex-col flex-grow ${hasImage ? 'px-4 sm:px-0 pb-5 sm:pb-0' : ''}`}>
                <div className="flex items-center gap-3 font-mono text-[10px] font-bold text-gray-400 mb-2">
                    <span className="text-black">{post.date}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="uppercase tracking-wider text-red-600">{post.tag || 'GENERAL'}</span>
                </div>

                <h3 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 leading-tight transition-colors ${isActive ? 'text-red-600' : ''}`}>
                    {post.title}
                </h3>

                <div>
                    <p className={`text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4 ${isActive ? '' : 'line-clamp-2'}`}>
                        {post.excerpt}
                    </p>
                </div>

                <div className={`mt-auto flex items-center text-xs font-bold uppercase tracking-wider ${isActive ? 'underline decoration-2 underline-offset-4' : ''}`}>
                    Read Article <IconArrowRight className="w-3 h-3 ml-1" />
                </div>
            </div>
        </motion.article>
    </a>
    );
};

export default PostCard;
