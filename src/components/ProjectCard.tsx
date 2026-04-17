import React from 'react';
import { IconCode, IconFileText, IconVideo } from './Icons';

export interface ProjectProps {
    title: string;
    description: string;
    date: string;
    image?: string;
    technologies: string[];
    codeUrl?: string;
    docsUrl?: string;
    videoUrl?: string;
}

const renderDescription = (text: string) => {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    const items = lines.filter(l => l.startsWith('* ') || l.startsWith('- '));
    if (items.length > 0) {
        return (
            <ul className="list-none space-y-1">
                {items.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-600 leading-relaxed">
                        <span className="text-black font-bold shrink-0">—</span>
                        <span>{item.replace(/^[*-]\s+/, '')}</span>
                    </li>
                ))}
            </ul>
        );
    }
    return <p className="text-sm text-gray-600 leading-relaxed">{text}</p>;
};

const ProjectCard = ({ project }: { project: ProjectProps }) => {
    const hasLinks = project.codeUrl || project.docsUrl || project.videoUrl;

    return (
        <article className="bg-white border border-black/10 flex flex-col sm:flex-row overflow-hidden">
            {project.image && (
                <div className="sm:w-52 h-48 sm:h-auto bg-gray-200 shrink-0 border-b sm:border-b-0 sm:border-r border-black/10 overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <div className={`flex flex-col flex-grow ${project.image ? 'px-4 sm:px-5 pb-5 pt-4 sm:pt-5' : 'p-5'}`}>
                <div className="flex items-center gap-3 font-mono text-[10px] font-bold text-gray-400 mb-2">
                    <span className="text-black">{project.date}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span className="uppercase tracking-wider text-red-600">PROJECT</span>
                </div>

                <h3 className="text-xl font-bold mb-2 leading-tight">{project.title}</h3>

                <div className="mb-4">{renderDescription(project.description)}</div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 bg-yellow-200 border border-black text-[10px] font-mono font-bold uppercase tracking-wide">
                            {tech}
                        </span>
                    ))}
                </div>

                {hasLinks && (
                    <div className="mt-auto flex items-center gap-2 pt-3 border-t border-black/10">
                        {project.codeUrl && (
                            <a href={project.codeUrl} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1 border border-black text-[10px] font-mono font-bold uppercase hover:bg-black hover:text-white transition-colors cursor-pointer">
                                <IconCode className="w-3 h-3" /> Code
                            </a>
                        )}
                        {project.docsUrl && (
                            <a href={project.docsUrl} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1 border border-black text-[10px] font-mono font-bold uppercase hover:bg-black hover:text-white transition-colors cursor-pointer">
                                <IconFileText className="w-3 h-3" /> Docs
                            </a>
                        )}
                        {project.videoUrl && (
                            <a href={project.videoUrl} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1 border border-black text-[10px] font-mono font-bold uppercase hover:bg-black hover:text-white transition-colors cursor-pointer">
                                <IconVideo className="w-3 h-3" /> Video
                            </a>
                        )}
                    </div>
                )}
            </div>
        </article>
    );
};

export default ProjectCard;
