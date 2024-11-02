import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import starlightImageZoom from 'starlight-image-zoom';
import tailwind from '@astrojs/tailwind';
import liveCode from 'astro-live-code';
import alpine from '@astrojs/alpinejs';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import catppuccin from "starlight-theme-catppuccin";

// https://astro.build/config
export default defineConfig({
  site: 'https://alpinejs.dragomano.ru',
  integrations: [
    alpine({ entrypoint: '/src/entrypoint' }),
    starlight({
      plugins: [
        starlightLinksValidator({
          errorOnRelativeLinks: false,
        }),
        starlightImageZoom(),
        catppuccin({ dark: "macchiato-sky", light: "latte-sky" })
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
        Pagination: './src/components/Pagination.astro',
        SocialIcons: './src/components/SocialIcons.astro',
        Header: './src/components/Header.astro',
      },
      customCss: ['./src/styles/custom.css'],
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
      social: {
        github: 'https://github.com/dragomano/alpinejs-russian',
      },
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
    tailwind({
      applyBaseStyles: false,
    }),
  ],
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
