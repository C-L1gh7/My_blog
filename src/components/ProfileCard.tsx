import React from 'react';
import { IconGithub, IconTwitter, IconMail } from './Icons';

const ProfileCard = () => (
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
            <br/>
            平庸的物理生错奇数个负号，优秀的物理生错偶数个负号。
        </p>

        {/* Social Links */}
        <div className="flex gap-4 mb-8">
            <a href="https://github.com/C-L1gh7" target="_blank" rel="noopener noreferrer" className="p-2 border border-black hover:bg-black hover:text-white transition-colors rounded-full"><IconGithub className="w-4 h-4"/></a>
            <a href="#" className="p-2 border border-black hover:bg-black hover:text-white transition-colors rounded-full"><IconTwitter className="w-4 h-4"/></a>
            <a href="mailto:HuanyuYuan@mail.ecust.edu.cn" className="p-2 border border-black hover:bg-black hover:text-white transition-colors rounded-full"><IconMail className="w-4 h-4"/></a>
        </div>

        {/* Sidebar Nav Links */}
        <div className="space-y-4 font-mono text-xs font-bold border-t border-dashed border-gray-300 pt-6">
            <div className="flex justify-between items-center group cursor-pointer hover:text-red-600">
                <span>{"/ PROJECTS"}</span>
                <span className="opacity-40">04</span>
            </div>
            <div className="flex justify-between items-center group cursor-pointer hover:text-red-600">
                <span>{"/ READING LIST"}</span>
                <span className="opacity-40">12</span>
            </div>
            
            {/* Contact Text */}
            <div className="flex flex-col gap-1 pt-2">
                <span className="opacity-40">/ CONTACT</span>
                <span className="text-[10px] break-all select-all hover:bg-yellow-200 transition-colors cursor-text">
                    HuanyuYuan@mail.ecust.edu.cn
                </span>
            </div>
        </div>
    </div>
);

export default ProfileCard;
