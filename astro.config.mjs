// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  site: 'https://c-l1gh7.github.io/My_blog/',
  base: process.env.NODE_ENV === 'production' ? '/My_blog' : '/',
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