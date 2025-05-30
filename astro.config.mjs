import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import liveCode from 'astro-live-code';
import alpine from '@astrojs/alpinejs';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import starlightGiscus from 'starlight-giscus';
import tailwindcss from "@tailwindcss/vite";
import starlightScrollToTop from 'starlight-scroll-to-top';

// https://astro.build/config
export default defineConfig({
  site: 'https://alpinejs.dragomano.ru',

  integrations: [
    alpine({ entrypoint: '/src/entrypoint' }),
    starlight({
      plugins: [
        starlightGiscus({
          repo: 'dragomano/alpinejs-russian',
          repoId: 'R_kgDOKwwvAA',
          category: 'Q&A',
          categoryId: 'DIC_kwDOKwwvAM4Cb9ss'
        }),
        starlightLinksValidator({
          errorOnRelativeLinks: false,
        }),
        starlightScrollToTop({
          tooltipText: 'Прокрутить вверх',
          showTooltip: true,
        })
      ],
      title: 'Alpine.js по-русски',
      description: 'Документация Alpine.js на русском языке.',
      head: [
        {
          tag: 'meta',
          attrs: {
            name: 'google-site-verification',
            content: 'fq1A8llkn1XRVaPfBInN-TPoDtGsEUQmvEr3QVrEsyI',
          },
        },
        {
          tag: 'script',
          content: `(function (c, l, a, r, i, t, y) {
            c[a] =
              c[a] ||
              function () {
                (c[a].q = c[a].q || []).push(arguments);
              };
            t = l.createElement(r);
            t.async = 1;
            t.src = 'https://www.clarity.ms/tag/' + i;
            y = l.getElementsByTagName(r)[0];
            y.parentNode.insertBefore(t, y);
          })(window, document, 'clarity', 'script', 'kb17zuy6dx');`,
        },
      ],
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'Русский',
          lang: 'ru',
        },
      },
      components: {
        LastUpdated: './src/components/LastUpdated.astro',
        SocialIcons: './src/components/SocialIcons.astro',
        Header: './src/components/Header.astro',
      },
      customCss: ['./src/styles/custom.scss', './src/styles/global.css'],
      expressiveCode: {
        themes: ['dracula', 'slack-ochin'],
        styleOverrides: {
          borderRadius: '0.5rem',
          frames: {
            shadowColor: '#124',
          },
        },
      },
      logo: {
        light: './src/assets/logo.svg',
        dark: './src/assets/dark_logo.svg',
        replacesTitle: true,
        alt: 'Логотип AlpineJS',
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/dragomano/alpinejs-russian' },
      ],
      editLink: {
        baseUrl: 'https://github.com/dragomano/alpinejs-russian/edit/main/',
      },
      sidebar: [
        {
          label: 'Первые шаги',
          link: 'start-here',
        },
        {
          label: 'Обновление с версии v2',
          link: 'upgrade-guide',
        },
        {
          label: 'Основы',
          autogenerate: {
            directory: 'essentials',
          },
        },
        {
          label: 'Директивы',
          autogenerate: {
            directory: 'directives',
          },
        },
        {
          label: 'Магические свойства',
          collapsed: true,
          autogenerate: {
            directory: 'magics',
          },
        },
        {
          label: 'Глобальные методы',
          autogenerate: {
            directory: 'globals',
          },
        },
        {
          label: 'Плагины',
          collapsed: true,
          autogenerate: {
            directory: 'plugins',
          },
        },
        {
          label: 'Дополнительно',
          collapsed: true,
          autogenerate: {
            directory: 'advanced',
          },
        },
        {
          label: 'Обучающие статьи и ролики',
          link: 'learning',
        },
      ],
    }),
    liveCode({
      layout: '@components/LiveCode.astro',
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    rehypePlugins: [
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          // Wrap the heading text in a link.
          behavior: 'wrap',
        },
      ],
    ],
  },
});