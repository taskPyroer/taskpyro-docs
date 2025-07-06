---
title: 消息通知
icon: material-symbols:notifications
order: 6
category:
  - 使用指南
head:
  - - meta
    - name: description
      content: TaskPyro消息通知功能介绍，包含钉钉、飞书、企业微信等平台的Webhook配置和通知功能使用说明
  - - meta
    - name: keywords
      content: TaskPyro,消息通知,钉钉机器人,飞书机器人,企业微信机器人,Webhook配置
footer: <a href="https://beian.miit.gov.cn">粤ICP备2024213187号-2</a> © 2025-至今 TaskPyro
---

# 消息通知

## 功能介绍

TaskPyro支持多种消息通知方式，可以将任务的执行状态实时推送到钉钉、飞书和企业微信等平台。通过配置对应平台的Webhook地址，您可以及时了解任务的运行情况，快速响应异常情况。

## 通知渠道配置

### 钉钉机器人

1. 登录钉钉开放平台或在钉钉群中添加自定义机器人
2. 获取机器人的Webhook地址
3. 在TaskPyro的设置页面中，启用钉钉通知
4. 填入Webhook地址并保存

::: tip 安全设置
钉钉机器人支持多种安全设置方式：
- 自定义关键词，关键词必须含有TaskPyro,否则无法接收消息
- IP地址段
- 加签密钥
建议选择「加签密钥」方式，安全性最高
:::

### 飞书机器人

1. 在飞书群中添加自定义机器人
2. 设置机器人安全设置
3. 复制机器人的Webhook地址
4. 在TaskPyro中启用飞书通知并填入Webhook地址

::: warning 注意事项
- 飞书机器人的Webhook地址格式为：https://open.feishu.cn/open-apis/bot/v2/hook/xxx
- 建议在安全设置中配置自定义关键词，例如「TaskPyro」
:::

### 企业微信机器人

1. 在企业微信群中添加群机器人
2. 获取机器人的Webhook地址
3. 在TaskPyro中启用企业微信通知
4. 填入Webhook地址并保存配置

::: tip 提示
企业微信机器人的Webhook地址格式为：https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxx
:::

## 通知内容

TaskPyro会在以下情况发送通知：

1. 任务执行状态变更
   - 任务执行失败
   - 任务被手动停止

::: tip 自定义模板
未来版本将支持自定义通知模板，敬请期待
:::

## 最佳实践

1. 根据团队使用的主要沟通工具选择通知渠道
2. 合理配置机器人安全设置，避免信息泄露
3. 定期检查Webhook的有效性
4. 为不同类型的任务配置不同的通知群组

## 常见问题

### Q: 配置了通知但收不到消息怎么办？

A: 请检查以下几点：
1. 确认Webhook地址是否正确
2. 检查机器人的安全设置是否正确
3. 测试网络连接是否正常
4. 查看机器人的使用额度是否超限