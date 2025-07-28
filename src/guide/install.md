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

## 安装步骤

安装 TaskPyro 有三种方式：**一键安装脚本**（最便捷）、**直接拉取代码** 或**手动创建文件**。请选择其中一种方式进行安装。

### 方式一：一键安装脚本（最便捷，推荐）

这是最便捷的安装方式，使用一键脚本自动完成 Docker 环境检查、安装和 TaskPyro 部署。

#### Linux 系统一键安装

使用国内镜像源（推荐）：

```bash
# 下载并执行一键安装脚本
curl -fsSL https://gitee.com/taskPyroer/taskpyrodocker/raw/master/taskpyro-manager.sh -o taskpyro-manager.sh && chmod +x taskpyro-manager.sh && ./taskpyro-manager.sh
```

或者使用github镜像源：

```bash
# 使用 GitHub 镜像源下载脚本
curl -fsSL https://raw.githubusercontent.com/taskPyroer/taskpyro/main/taskpyro-manager.sh -o taskpyro-manager.sh && chmod +x taskpyro-manager.sh && ./taskpyro-manager.sh
```

> 若服务器没有curl相关命令或者拉取失败，可到对应git仓库下载taskpyro-manager.sh

#### 脚本功能特性

一键安装脚本提供以下功能：

- **自动环境检测**：自动检测操作系统类型和版本
- **Docker 自动安装**：如果系统未安装 Docker，脚本会自动安装最新版本
- **Docker Compose 配置**：自动安装和配置 Docker Compose
- **交互式配置**：引导用户配置端口、数据目录等参数
- **版本选择**：支持选择标准版或专业版
- **服务管理**：提供启动、停止、重启、升级等管理功能
- **状态监控**：实时查看服务状态和日志
- **一键卸载**：支持完整卸载功能

#### 支持的操作系统

该脚本已在主流操作系统上完成测试验证。如遇特殊环境或脚本安装失败的情况，建议联系作者获取技术支持，或手动安装 Docker 后使用方式二、三进行部署

#### 使用说明

1. 执行脚本后，按照提示选择安装选项
2. 脚本会自动检测并安装必要的依赖
3. 配置完成后自动启动服务
4. 可通过脚本菜单进行后续管理操作

::: tip 提示
一键脚本特别适合新手用户和生产环境快速部署，无需手动配置 Docker 环境。

**后续管理操作**：安装完成后，如需进行服务管理（启动、停止、重启、升级等），可直接在 taskpyro-manager.sh 脚本所在目录执行 `./taskpyro-manager.sh` 命令，即可进入便捷的操作菜单。
:::

### 方式二：直接拉取代码


#### 前置条件

在使用此方式安装之前，请确保您的系统已经安装了以下软件：

**Docker 安装**
- Docker（本人使用的版本为 26.10.0，低于此版本安装可能会存在问题，建议删除旧版本，升级新版本docker）
- 详细的Docker安装指南请参考：[Docker安装文档](/docker/)

**Docker Compose 安装**
- Docker Compose（版本 2.0.0 或更高，本人使用2.27.1版本）
- 注意：如果您使用的是 Docker 26.1.0 版本，建议安装最新版本的 Docker Compose 以确保兼容性
- 详细的Docker Compose安装指南请参考：[Docker安装文档](/docker/)

#### 从 GitHub 拉取

```bash
# 1. 克隆代码仓库
git clone https://github.com/taskPyroer/taskpyro.git

# 2. 进入v1版本目录
cd taskpyro/v1

# 3. 启动服务
docker-compose up -d
```

#### 从 Gitee 拉取（国内推荐）

```bash
# 1. 克隆代码仓库
git clone https://gitee.com/taskPyroer/taskpyrodocker.git

# 2. 进入v1版本目录
cd taskpyrodocker/v1

# 3. 启动服务
docker-compose up -d
```

### 方式三：手动创建文件

#### 前置条件

在使用此方式安装之前，请确保您的系统已经安装了以下软件：

**Docker 安装**
- Docker（本人使用的版本为 26.10.0，低于此版本安装可能会存在问题，建议删除旧版本，升级新版本docker）
- 详细的Docker安装指南请参考：[Docker安装文档](/docker/)

**Docker Compose 安装**
- Docker Compose（版本 2.0.0 或更高，本人使用2.27.1版本）
- 注意：如果您使用的是 Docker 26.1.0 版本，建议安装最新版本的 Docker Compose 以确保兼容性
- 详细的Docker Compose安装指南请参考：[Docker安装文档](/docker/)

如果您无法直接拉取代码，可以按照以下步骤手动创建必要的文件。

#### 1. 创建项目目录

```bash
# 创建并进入项目目录
mkdir -p taskpyro
cd taskpyro
```

#### 2. 创建 docker-compose.yml 文件

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

#### 3. 创建 .env 文件

在项目目录中创建 `.env` 文件，用于配置环境变量：

```env
# 前端服务端口
FRONTEND_PORT=8080
# 后端服务端口
BACKEND_PORT=9000
# 服务器域名或IP（默认localhost，通常不需要修改）
SERVER_NAME=localhost
# 后端工作进程数
WORKERS=1
```

#### 4. 启动服务

如果您选择了手动创建文件的方式，完成上述步骤后，执行以下命令启动服务：

```bash
# 在项目目录中执行
docker-compose up -d
```

### 访问系统

无论您选择哪种安装方式，服务启动后，都可以通过浏览器访问系统：

```
http://<your_ip>:8080
```

将 `<your_ip>` 替换为您服务器的实际 IP 地址或域名。如果是在本机安装，可以使用 `localhost`。

### 默认账号密码

首次登录系统时，请使用以下默认账号密码：

- **账号**：admin
- **密码**：admin123

::: warning 安全提示
首次登录后，强烈建议您立即修改默认密码，以确保系统安全。
:::

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

