import { useRef, useState } from 'react';
import { IconGithub, IconBilibili, IconMail } from './Icons';

export interface TimelineItem {
    type: 'post' | 'project' | 'note';
    title: string;
    date: string;
    slug?: string;
}

interface ProfileCardProps {
    timeline?: TimelineItem[];
}

const TYPE_CONFIG: Record<TimelineItem['type'], { label: string; color: string; bg: string }> = {
    post:    { label: 'POST', color: '#21467A', bg: 'rgba(33,70,122,0.08)' },
    project: { label: 'PROJ', color: '#C71F2D', bg: 'rgba(199,31,45,0.08)' },
    note:    { label: 'NOTE', color: '#D45814', bg: 'rgba(212,88,20,0.08)' },
};

function TimelineRow({ item, href }: { item: TimelineItem; href: string }) {
    const cfg = TYPE_CONFIG[item.type];
    const contentRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    return (
        <a
            href={href}
            className="flex items-center gap-3 group/item"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* node → vertical line */}
            <div className="relative z-10 self-stretch shrink-0 flex items-center justify-center" style={{ width: 16 }}>
                <div
                    style={{
                        backgroundColor: cfg.color,
                        width: hovered ? 2 : 8,
                        height: hovered ? '100%' : 8,
                        borderRadius: hovered ? 1 : 9999,
                        transition: 'width 250ms ease, height 250ms ease, border-radius 250ms ease',
                    }}
                />
            </div>

            {/* content */}
            <div
                ref={contentRef}
                className="flex-1 min-w-0 py-1 px-2 rounded-sm"
                style={{
                    backgroundColor: hovered ? cfg.bg : 'transparent',
                    transition: 'background-color 250ms ease',
                }}
            >
                <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-[9px] font-black tracking-widest" style={{ color: cfg.color }}>
                        {cfg.label}
                    </span>
                    <span className="font-mono text-[9px] text-gray-400 tabular-nums">
                        {item.date}
                    </span>
                </div>
                <p
                    className="text-xs font-bold leading-snug line-clamp-2"
                    style={{
                        color: hovered ? '#000' : '#374151',
                        transition: 'color 200ms ease',
                    }}
                >
                    {item.title}
                </p>
            </div>
        </a>
    );
}

const ProfileCard = ({ timeline = [] }: ProfileCardProps) => {
    const baseUrl = import.meta.env.BASE_URL;

    const getHref = (item: TimelineItem) => {
        if (item.type === 'post' && item.slug) return `${baseUrl}/posts/${item.slug}`;
        if (item.type === 'project') return `${baseUrl}/projects`;
        if (item.type === 'note') return `${baseUrl}/notes`;
        return '#';
    };

    return (
        <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_#ccc] sticky top-24">
            {/* Avatar */}
            <div className="w-20 h-20 bg-[#1a1a1a] rounded-full mb-6 overflow-hidden border-2 border-black relative group">
                <img
                    src="https://pub-f15d478863f747a68de4bbf63631ccfe.r2.dev/PicGo/%E5%A4%B4%E5%83%8F.jpg"
                    alt="Avatar"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110"
                />
            </div>

            <h2 className="text-xl font-black uppercase tracking-tight mb-2">C_L1gh7</h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                光电信息科学与工程本科在读。
                <br />
                平庸的物理生错奇数个负号，优秀的物理生错偶数个负号。
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mb-8">
                <a href="https://github.com/C-L1gh7" target="_blank" rel="noopener noreferrer" className="p-2 border border-black hover:bg-black hover:text-white transition-colors rounded-full"><IconGithub className="w-4 h-4" /></a>
                <a href="https://space.bilibili.com/286704463" target="_blank" rel="noopener noreferrer" className="p-2 border border-black hover:bg-black hover:text-white transition-colors rounded-full"><IconBilibili className="w-4 h-4" /></a>
                <a href="mailto:HuanyuYuan@mail.ecust.edu.cn" className="p-2 border border-black hover:bg-black hover:text-white transition-colors rounded-full"><IconMail className="w-4 h-4" /></a>
            </div>

            {/* Vertical Timeline */}
            {timeline.length > 0 && (
                <div className="border-t border-dashed border-gray-300 pt-5">
                    <span className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 block">
                        / Recent Activity
                    </span>
                    <ul className="relative space-y-3">
                        {/* vertical rail */}
                        <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gray-200" />

                        {timeline.map((item, i) => (
                            <li key={i}>
                                <TimelineRow item={item} href={getHref(item)} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProfileCard;
