import React, { useState, useMemo } from 'react';
import ProjectCard, { type ProjectProps } from './ProjectCard';
import { IconSearch, IconFilter, IconSort } from './Icons';

interface ProjectHubProps {
    initialProjects: ProjectProps[];
}

const ProjectHub: React.FC<ProjectHubProps> = ({ initialProjects }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTech, setSelectedTech] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

    const allTechs = useMemo(() => {
        const techs = initialProjects.flatMap(p => p.technologies);
        return Array.from(new Set(techs));
    }, [initialProjects]);

    const filtered = useMemo(() => {
        let result = initialProjects.filter(p => {
            const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesTech = selectedTech ? p.technologies.includes(selectedTech) : true;
            return matchesSearch && matchesTech;
        });
        return result.sort((a, b) => {
            const diff = new Date(b.date).getTime() - new Date(a.date).getTime();
            return sortOrder === 'newest' ? diff : -diff;
        });
    }, [initialProjects, searchTerm, selectedTech, sortOrder]);

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedTech(null);
        setSortOrder('newest');
    };

    return (
        <div className="space-y-8">
            {/* Control Panel */}
            <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_#ccc] space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black font-mono text-sm"
                        />
                    </div>
                    <button
                        onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
                        className="flex items-center gap-2 px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors font-mono text-xs font-bold uppercase"
                    >
                        <IconSort className="w-4 h-4" />
                        {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
                    </button>
                </div>

                <div className="flex flex-wrap gap-2 items-center pt-2 border-t border-dashed border-gray-300">
                    <span className="font-mono text-xs font-bold mr-2 text-gray-500 flex items-center gap-1">
                        <IconFilter className="w-3 h-3" /> TECH:
                    </span>
                    <button
                        onClick={clearFilters}
                        className={`px-3 py-1 border text-[10px] font-bold uppercase tracking-wider transition-all ${!selectedTech ? 'bg-black text-white border-black' : 'border-transparent text-gray-500 hover:border-black hover:text-black'}`}
                    >
                        ALL
                    </button>
                    {allTechs.map(tech => (
                        <button
                            key={tech}
                            onClick={() => setSelectedTech(tech === selectedTech ? null : tech)}
                            className={`px-3 py-1 border border-black text-[10px] font-bold uppercase tracking-wider transition-all ${selectedTech === tech ? 'bg-red-600 text-white border-red-600' : 'bg-white hover:bg-gray-100'}`}
                        >
                            {tech}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Header */}
            <div className="flex items-end justify-between border-b-2 border-black pb-4">
                <h2 className="text-2xl font-black uppercase tracking-tight">
                    {selectedTech ? `${selectedTech} Projects` : 'All Projects'}
                </h2>
                <span className="font-mono text-xs font-bold bg-yellow-400 px-2 py-1 border border-black transform -rotate-2 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    COUNT: {filtered.length}
                </span>
            </div>

            {/* Project List */}
            <div className="flex flex-col gap-6">
                {filtered.length > 0 ? (
                    filtered.map((project, i) => (
                        <ProjectCard key={i} project={project} />
                    ))
                ) : (
                    <div className="py-20 text-center border-2 border-dashed border-gray-300 bg-white/50">
                        <p className="text-gray-500 font-mono text-sm">No projects found matching your criteria.</p>
                        <button onClick={clearFilters} className="mt-4 text-red-600 underline font-mono text-xs font-bold">Clear Filters</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectHub;
