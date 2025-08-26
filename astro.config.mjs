// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  site: 'https://C-L1gh7.github.io/My_blog/',  // 改成你的 GitHub Pages 地址
  // Only use base path in production (GitHub Pages)
  base: process.env.NODE_ENV === 'production' ? '/My_blog' : '/',  // 改成你的仓库名
  integrations: [sitemap()],
  markdown: {
    // 添加数学公式插件
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: 'css-variables',
      langs: [],
      wrap: true,
    },
  },
});