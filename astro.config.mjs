import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://cl1gh7.pages.dev/',
  base: '/',
  integrations: [
    react(),
    tailwind(),
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        // 为不同类型的页面设置不同的优先级和更新频率
        if (item.url === 'https://cl1gh7.pages.dev/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (item.url.includes('/posts/')) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/projects/')) {
          item.priority = 0.9;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/studies/')) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/notes/')) {
          item.priority = 0.6;
          item.changefreq = 'weekly';
        }
        return item;
      }
    })
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex]
  }
});