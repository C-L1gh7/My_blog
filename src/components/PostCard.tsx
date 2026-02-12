import React, { useState } from 'react';
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

const PostCard = ({ post }: { post: PostProps }) => {
    if (!post.slug) {
        console.error('PostCard: missing slug for post', post);
        return null; 
    }

    const hasImage = !!post.image;
    const [isHovered, setIsHovered] = useState(false);
    const baseUrl = import.meta.env.BASE_URL;
    
    const cardVariants = {
        hover: {
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderColor: "#000000",
            scale: 1.02,
            boxShadow: "12px 12px 0px rgba(26, 26, 26, 1)",
            zIndex: 50,
            transition: { type: "spring", stiffness: 300, damping: 25 }
        },
        idle: {
            backgroundColor: "rgba(255, 255, 255, 1)",
            borderColor: "rgba(0, 0, 0, 0.1)",
            scale: 1,
            boxShadow: "0px 0px 0px rgba(0,0,0,0)",
            zIndex: 50, // 动画过程中保持高层级，防止被遮挡
            transition: { type: "spring", stiffness: 300, damping: 25 },
            transitionEnd: {
                zIndex: 10 // 动画结束后才复原
            }
        }
    };

    const imageVariants = {
        hover: {
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
    <a href={`${baseUrl}/posts/${post.slug}/`} className="block relative">
        <motion.article 
            layout
            variants={cardVariants}
            initial="idle"
            animate={isHovered ? "hover" : "idle"}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={`group border flex flex-col sm:flex-row gap-6 overflow-hidden sm:overflow-visible relative cursor-pointer
                ${hasImage ? 'p-0 sm:p-5' : 'p-5'}
            `}
            style={{ backdropFilter: isHovered ? "blur(4px)" : "none" }}
        >
            {/* Post Thumbnail */}
            {hasImage && (
                <div className="sm:w-48 h-48 sm:h-32 bg-gray-200 shrink-0 border-b sm:border-b-0 sm:border border-black/10 relative overflow-hidden">
                    <motion.img 
                        variants={imageVariants}
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover" 
                    />
                    {/* Teal & Orange Film Look Overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-60 bg-gradient-to-br from-cyan-600/40 via-transparent to-orange-600/40 mix-blend-overlay transition-opacity duration-500 pointer-events-none"></div>
                </div>
            )}

            {/* Post Content */}
            <div className={`flex flex-col flex-grow ${hasImage ? 'px-4 sm:px-0 pb-6 sm:pb-0' : ''}`}>
                <div className="flex items-center gap-3 font-mono text-[10px] font-bold text-gray-400 mb-2">
                    <span className="text-black">{post.date}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="uppercase tracking-wider text-red-600">{post.tag || 'GENERAL'}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-red-600 transition-colors">
                    {post.title}
                </h3>
                
                <div>
                    <p className={`text-sm text-gray-600 leading-relaxed mb-4 ${isHovered ? '' : 'line-clamp-2'}`}>
                        {post.excerpt}
                    </p>
                </div>

                <div className="mt-auto flex items-center text-xs font-bold uppercase tracking-wider group-hover:underline decoration-2 underline-offset-4">
                    Read Article <IconArrowRight className="w-3 h-3 ml-1" />
                </div>
            </div>
        </motion.article>
    </a>
    );
};

export default PostCard;
