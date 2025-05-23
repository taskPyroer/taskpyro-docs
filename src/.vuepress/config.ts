import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  port: 8081,
  lang: "zh-CN",
  title: "python爬虫管理平台",
  description: "轻量级Python任务调度与爬虫管理平台,可视化操作,完整监控,灵活的Python环境管理,环境隔离,资源占用小,支持 Scrapy 等主流爬虫框架,支持 Selenium、Playwright、DrissionPage 等浏览器自动化工具,支持node环境下的js逆向代码",

  // SEO 配置
  head: [
    ["meta", { name: "keywords", content: "python爬虫,爬虫技术抓取网站数据,Python,任务调度,爬虫管理,Scrapy,Selenium,Playwright,DrissionPage,JS逆向,Python虚拟环境" }],
    ["meta", { name: "author", content: "TaskPyro Team" }],
    ["meta", { name: "robots", content: "index,follow" }],
    ["link", { rel: "icon", type: "image/png", href: "/images/favicon.ico" }]
  ],

  // 主题配置
  theme,

  // 构建配置
  build: {
    cleanCache: true,
    cleanTemp: true
  },

  // 开发服务器配置
  host: "0.0.0.0",
  open: true,

  // Markdown 配置
  markdown: {
    headers: {
      level: [2, 3, 4]
    },
    code: {
      lineNumbers: true
    }
  },

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
