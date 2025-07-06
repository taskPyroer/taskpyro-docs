import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "专业版使用指南",
      icon: "lightbulb",
      prefix: "professional/",
      link: "professional/",
      children: "structure",
    },
    {
      text: "标准版使用指南",
      icon: "lightbulb",
      prefix: "guide/",
      link: "guide/",
      children: "structure",
    },
    "price/",
    "exchange/",
    "cooperation/",
    "personal/",
    {
      text: "免责声明",
      icon: "info",
      prefix: "disclaimer/",
      link: "disclaimer/",
    }
  ],
});
