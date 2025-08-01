import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://docs.taskpyro.cn",

  author: {
    name: "TaskPyro",
    url: "https://docs.taskpyro.cn",
  },

  logo: "/logo1.png",

  repo: "https://github.com/taskPyroer/taskpyro",

  docsDir: "src",

  // 导航栏
  navbar,

  // 侧边栏
  sidebar,

  // 页脚
  footer: "粤ICP备2024213187号",
  displayFooter: true,

  // SEO 配置
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  // hotReload: true,

  plugins: {
    // 启用 SEO 插件
    seo: true,

    // 启用 Sitemap 插件
    sitemap: {
      hostname: "https://docs.taskpyro.cn",
    },

    components: {
      components: ["Badge", "VPCard"],
    },

    icon: {
      prefix: "fa6-solid:",
    },
  },

  // 此处开启了很多功能用于演示，你应仅保留用到的功能。
  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    plantuml: true,
    spoiler: true,
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,
  },
});
