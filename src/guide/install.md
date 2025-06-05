---
title: 安装
icon: download
order: 2
category:
  - 使用指南
head:
  - - meta
    - name: description
      content: TaskPyro安装部署指南，包含Python爬虫管理平台的环境配置、依赖安装和启动运行等详细步骤
  - - meta
    - name: keywords
      content: TaskPyro,Python爬虫平台安装,任务调度系统部署,环境配置,依赖安装,平台启动
footer: <a href="https://beian.miit.gov.cn">粤ICP备2024213187号-2</a> © 2025-至今 TaskPyro
---

# Docker 安装

TaskPyro 提供了基于 Docker 的快速部署方案，让您能够轻松地在任何支持 Docker 的环境中运行。

## 前置条件

在开始安装之前，请确保您的系统已经安装了以下软件：

### Docker 安装

- Docker（本人使用的版本为 26.10.0，低于此版本安装可能会存在问题，建议删除旧版本，升级新版本docker）

### Docker Compose 安装

- Docker Compose（版本 2.0.0 或更高，本人使用2.27.1版本）
- 注意：如果您使用的是 Docker 26.1.0 版本，建议安装最新版本的 Docker Compose 以确保兼容性

## 安装步骤
### 0. 拉取代码

gitub
```bash
git clone https://github.com/taskPyroer/taskpyro.git
```

gitee

```bash
git clone https://gitee.com/taskPyroer/taskpyrodocker.git
```

> 可以直接拉取上面的代码，或者按下面的1、2、3步骤创建文件

### 1. 创建项目目录

```bash
mkdir taskpyro
cd taskpyro
```

### 2. 创建 docker-compose.yml 文件

在项目目录中创建 `docker-compose.yml` 文件，内容如下：

```yaml
version: '3'

services:
  frontend:
    image: crpi-7ub5pdu5y0ps1uyh.cn-hangzhou.personal.cr.aliyuncs.com/taskpyro/taskpyro-frontend:1.0
    ports:
      - "${FRONTEND_PORT:-7789}:${FRONTEND_PORT:-7789}"
    environment:
      - PORT=${FRONTEND_PORT:-7789}
      - SERVER_NAME=${SERVER_NAME:-localhost}
      - BACKEND_PORT=${BACKEND_PORT:-8000}
      - API_URL=http://${SERVER_NAME}:${BACKEND_PORT:-8000}
      - TZ=Asia/Shanghai
    env_file:
      - .env
    depends_on:
      - api

  api:
    image: crpi-7ub5pdu5y0ps1uyh.cn-hangzhou.personal.cr.aliyuncs.com/taskpyro/taskpyro-api:1.0
    ports:
      - "${BACKEND_PORT:-8000}:${BACKEND_PORT:-8000}"
    environment:
      - PORT=${BACKEND_PORT:-8000}
      - PYTHONPATH=/app
      - CORS_ORIGINS=http://localhost:${FRONTEND_PORT:-7789},http://127.0.0.1:${FRONTEND_PORT:-7789}
      - TZ=Asia/Shanghai
      - WORKERS=${WORKERS:-1}
    volumes:
      - /opt/taskpyrodata/static:/app/../static
      - /opt/taskpyrodata/logs:/app/../logs
      - /opt/taskpyrodata/data:/app/data
    env_file:
      - .env
    init: true
    restart: unless-stopped
```

### 3. 创建 .env 文件

在项目目录中创建 `.env` 文件，用于配置环境变量：

```env
FRONTEND_PORT=8080
BACKEND_PORT=9000
SERVER_NAME=localhost
WORKERS=1
```

### 4. 启动服务

```bash
docker-compose up -d
```
启动后直接在浏览器中访问至 http://<your_ip>:8080

### 5. 默认账号密码
账号： admin
密码： admin123

## 安装注意事项

0. **环境要求**
   - 确保系统已经安装了Docker和Docker Compose
   - 建议使用Docker版本26.1.0或更高，Docker Compose版本2.0.0或更高,如果Docker Compose安装失败，可以尝试将docker-compose.yml中的version: '3'改为version: '2'或者删除重试

1. **数据持久化**
   - 数据文件会保存在 `/opt/taskpyrodata` 目录下，包含以下子目录：
     - `static`：静态资源文件
     - `logs`：系统日志文件
     - `data`：应用数据文件

2. **环境变量配置**
   - 在 `.env` 文件中配置以下必要参数：
     - `FRONTEND_PORT`：前端服务端口（默认8080）
     - `BACKEND_PORT`：后端服务端口（默认9000）
     - `SERVER_NAME`：服务器域名或IP（默认localhost，不需要修改）
     - `WORKERS`：后端工作进程数（默认1，不需要修改）
   - 确保 `SERVER_NAME` 配置正确，否则可能导致API调用失败

3. **端口配置**
   - 前端服务默认使用8080端口
   - 后端服务默认使用9000端口
   - 确保这些端口未被其他服务占用
   - 如需修改端口，只需要更新 `.env` 文件中的配置

4. **容器资源配置**
   - 建议为容器预留足够的CPU和内存资源
   - 可通过Docker的资源限制参数进行调整
   - 监控容器资源使用情况，适时调整配置

## 常见问题

1. **前端服务无法访问**
   - 检查 `FRONTEND_PORT` 端口是否被占用
   - 确认前端容器是否正常启动：`docker-compose ps frontend`
   - 查看前端容器日志：`docker-compose logs frontend`
   - 验证 `SERVER_NAME` 配置是否正确

2. **后端API连接失败**
   - 检查 `BACKEND_PORT` 端口是否被占用
   - 确认后端容器是否正常启动：`docker-compose ps api`
   - 查看后端容器日志：`docker-compose logs api`
   - 验证 `CORS_ORIGINS` 配置是否包含前端访问地址

3. **容器启动失败**
   - 检查 Docker 服务状态：`systemctl status docker`
   - 确认 docker-compose.yml 文件格式正确
   - 验证环境变量配置是否完整
   - 检查数据目录权限：`ls -l /opt/taskpyrodata`

4. **数据持久化问题**
   - 确保 `/opt/taskpyrodata` 目录存在且有正确的权限
   - 检查磁盘空间是否充足
   - 定期清理日志文件避免空间占用过大
   - 建议配置日志轮转策略

5. **资源配置**
   - 根据实际需求调整 Docker 容器的资源限制
   - 监控服务器资源使用情况，适时调整配置


## 升级说明

要升级到新版本，请执行以下步骤：

```bash
# 拉取最新镜像
docker-compose pull

# 重启服务
docker-compose up -d
```

## 卸载说明

如果需要卸载 TaskPyro，可以执行以下命令：

```bash
# 停止并删除容器
docker-compose down

# 如果需要同时删除数据（谨慎操作！）
rm -rf /opt/taskpyrodata

