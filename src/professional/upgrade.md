---
title: 专业版升级指南
icon: material-symbols:upgrade
order: 11
category:
  - 使用指南
head:
  - - meta
    - name: description
      content: TaskPyro升级指南，包含如何使用Docker命令升级到最新版本的详细说明
  - - meta
    - name: keywords
      content: TaskPyro,升级指南,Docker升级,版本更新,系统维护
footer: <a href="https://beian.miit.gov.cn">粤ICP备2024213187号-2</a> © 2025-至今 TaskPyro
---

# 升级指南

本文档将指导您如何将TaskPyro升级到最新版本。我们使用Docker容器来简化升级过程，只需几个简单的步骤即可完成升级。

## 升级步骤

要升级到新版本，请按照以下步骤操作：

```bash
# 拉取最新镜像
docker-compose pull

# 重启服务
docker-compose up -d
```

::: tip 1.+版本升级到2.+版本
如果你是从1.+版本的基础上升级的话，需要修改原来的docker-compose.yml配置文件，将frontend和api的image都改为2.0，保存后在执行上面的步骤

```yaml
version: '3'

services:
  frontend:
    image: crpi-7ub5pdu5y0ps1uyh.cn-hangzhou.personal.cr.aliyuncs.com/taskpyro/taskpyro-enterprise-frontend:2.0
    # 原有的保持不变

  api:
    image: crpi-7ub5pdu5y0ps1uyh.cn-hangzhou.personal.cr.aliyuncs.com/taskpyro/taskpyro-enterprise-api:2.0
    # 原有的保持不变
```
:::

## 命令说明

- `docker-compose pull`：从Docker Hub拉取最新版本的TaskPyro镜像
- `docker-compose up -d`：使用新镜像重新启动服务，`-d`参数表示在后台运行

## 注意事项

1. 升级前建议备份重要数据
2. 确保有足够的磁盘空间用于下载新镜像
3. 升级过程中服务会短暂中断，请在合适的时间进行升级
4. 如果遇到问题，可以查看[更新日志](/changelog/)了解版本变更详情