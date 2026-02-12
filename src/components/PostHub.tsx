import React, { useState, useMemo } from 'react';
import { LayoutGroup } from 'framer-motion';
import PostCard, { type PostProps } from './PostCard';
import { IconSearch, IconFilter, IconSort, IconShuffle } from './Icons';

interface PostHubProps {
    initialPosts: PostProps[];
}

const PostHub: React.FC<PostHubProps> = ({ initialPosts }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [randomPosts, setRandomPosts] = useState<PostProps[]>([]);
    const [isRandomMode, setIsRandomMode] = useState(false);

    // Get unique tags
    const allTags = useMemo(() => {
        const tags = initialPosts.map(post => post.tag || 'GENERAL');
        return Array.from(new Set(tags));
    }, [initialPosts]);

    // Filter and Sort Logic
    const filteredPosts = useMemo(() => {
        if (isRandomMode) return randomPosts;

        let result = initialPosts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesTag = selectedTag ? (post.tag || 'GENERAL') === selectedTag : true;
            return matchesSearch && matchesTag;
        });

        return result.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });
    }, [initialPosts, searchTerm, selectedTag, sortOrder, isRandomMode, randomPosts]);

    const handleRandomPick = () => {
        const shuffled = [...initialPosts].sort(() => 0.5 - Math.random());
        setRandomPosts(shuffled.slice(0, 3));
        setIsRandomMode(true);
        setSelectedTag(null);
        setSearchTerm('');
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedTag(null);
        setIsRandomMode(false);
        setSortOrder('newest');
    };

    return (
        <div className="space-y-8">
            {/* Control Panel */}
            <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_#ccc] space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search posts..." 
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setIsRandomMode(false);
                            }}
                            className="w-full pl-10 pr-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black font-mono text-sm"
                        />
                    </div>

                    {/* Sort */}
                    <button 
                        onClick={() => {
                            setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest');
                            setIsRandomMode(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors font-mono text-xs font-bold uppercase"
                    >
                        <IconSort className="w-4 h-4" />
                        {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
                    </button>
                    
                     {/* Random */}
                    <button 
                        onClick={handleRandomPick}
                        className="flex items-center gap-2 px-4 py-2 border border-black hover:bg-black hover:text-white active:scale-95 transition-all font-mono text-xs font-bold uppercase"
                    >
                        <IconShuffle className="w-4 h-4" />
                        Surprise Me
                    </button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 items-center pt-2 border-t border-dashed border-gray-300">
                    <span className="font-mono text-xs font-bold mr-2 text-gray-500 flex items-center gap-1">
                        <IconFilter className="w-3 h-3" /> FILTERS:
                    </span>
                    <button 
                        onClick={clearFilters}
                        className={`px-3 py-1 border text-[10px] font-bold uppercase tracking-wider transition-all ${!selectedTag && !isRandomMode ? 'bg-black text-white border-black' : 'border-transparent text-gray-500 hover:border-black hover:text-black'}`}
                    >
                        ALL
                    </button>
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => {
                                setSelectedTag(tag === selectedTag ? null : tag);
                                setIsRandomMode(false);
                            }}
                            className={`px-3 py-1 border border-black text-[10px] font-bold uppercase tracking-wider transition-all ${selectedTag === tag ? 'bg-red-600 text-white border-red-600' : 'bg-white hover:bg-gray-100'}`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Header */}
            <div className="flex items-end justify-between border-b-2 border-black pb-4">
                <h2 className="text-2xl font-black uppercase tracking-tight">
                    {isRandomMode ? 'Random Picks' : (selectedTag ? `${selectedTag} Posts` : 'All Posts')}
                </h2>
                <span className="font-mono text-xs font-bold bg-yellow-400 px-2 py-1 border border-black transform -rotate-2 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    COUNT: {filteredPosts.length}
                </span>
            </div>

            {/* Post Grid */}
            <LayoutGroup>
                <div className="grid gap-4">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <PostCard key={post.slug} post={post} />
                        ))
                    ) : (
                        <div className="py-20 text-center border-2 border-dashed border-gray-300 bg-white/50">
                            <p className="text-gray-500 font-mono text-sm">No posts found matching your criteria.</p>
                            <button onClick={clearFilters} className="mt-4 text-red-600 underline font-mono text-xs font-bold">Clear Filters</button>
                        </div>
                    )}
                </div>
            </LayoutGroup>
        </div>
    );
};

export default PostHub;