import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "使用指南",
      icon: "lightbulb",
      prefix: "guide/",
      link: "guide/",
      children: "structure",
    },
    "price/",
    "exchange/",
    "cooperation/",
    "personal/"
  ],
});
