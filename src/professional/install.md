---
title: 专业版安装
icon: download
order: 2
category:
  - 使用指南
head:
  - - meta
    - name: description
      content: TaskPyro专业版安装部署指南，包含分布式架构的主控节点和工作节点部署、环境配置等详细步骤
  - - meta
    - name: keywords
      content: TaskPyro专业版,分布式部署,主控节点,工作节点,Docker部署,Windows节点,Linux节点
footer: <a href="https://beian.miit.gov.cn">粤ICP备2024213187号-2</a> © 2025-至今 TaskPyro
---

# 专业版分布式部署

TaskPyro 专业版，支持主控节点（Docker）+ 多个工作节点（Windows/Linux）的部署模式，为企业提供高可用、高性能的任务调度解决方案。

## 架构概述

- **主控节点**：使用 Docker 部署，负责任务调度、监控管理、用户界面等核心功能，**同时也支持本机任务执行**
- **工作节点**：支持 Windows 和 Linux 系统，无需 Docker 环境，负责具体任务执行
- **统一管理**：主控节点统一管理所有工作节点，实现集中化的任务调度和监控
- **灵活部署**：可以仅部署主控节点进行单机使用，也可以添加多个工作节点构建分布式集群

# 主控节点部署（Docker）

主控节点是 TaskPyro 专业版的核心组件，不仅提供任务调度、监控管理、用户界面等管理功能，**同时也具备完整的任务执行能力**。这意味着：

- **单机模式**：仅部署主控节点即可完成所有任务的调度和执行
- **混合模式**：主控节点既可以执行任务，也可以管理其他工作节点

## 前置条件

在开始安装之前，请确保您的系统已经安装了以下软件：

### Docker 安装

- Docker（本人使用的版本为 26.10.0，低于此版本安装可能会存在问题，建议删除旧版本，升级新版本docker）

### Docker Compose 安装

- Docker Compose（版本 2.0.0 或更高，本人使用2.27.1版本）
- 注意：如果您使用的是 Docker 26.1.0 版本，建议安装最新版本的 Docker Compose 以确保兼容性

## 主节点安装步骤
### 0. 拉取代码

gitub
```bash
git clone https://github.com/taskPyroer/taskpyro.git
```
```bash
# 进入到v2版本的文件
cd v2
```

gitee

```bash
git clone https://gitee.com/taskPyroer/taskpyrodocker.git
```
```bash
# 进入到v2版本的文件
cd v2
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
    image: crpi-7ub5pdu5y0ps1uyh.cn-hangzhou.personal.cr.aliyuncs.com/taskpyro/taskpyro-frontend:2.0
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
    image: crpi-7ub5pdu5y0ps1uyh.cn-hangzhou.personal.cr.aliyuncs.com/taskpyro/taskpyro-api:2.0
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

# 工作节点部署（可选）

工作节点是执行具体任务的计算节点，支持 Windows 和 Linux 系统，无需 Docker 环境。

::: tip 重要说明
工作节点部署是**可选的**。主控节点本身就具备完整的任务执行能力，可以独立完成所有任务的调度和执行。添加工作节点的主要目的是：

- **扩展计算能力**：增加更多计算资源处理大量任务
- **跨平台支持**：在不同操作系统上执行特定任务
- **负载分担**：将任务执行负载分散到多个节点
- **高可用性**：提供任务执行的冗余和故障转移能力
:::

如果您只需要基本的任务调度功能，仅部署主控节点即可满足需求。

## Windows 工作节点部署

### 前置条件
- Windows 10/11 或 Windows Server 2016 及以上版本
- Python 3.8 或更高版本
- 网络连接到主控节点

### 安装步骤

#### 1. 下载工作节点程序

gitub
```bash
git clone https://github.com/taskPyroer/taskpyro.git
```
```bash
# 进入到v2版本的文件
cd v2/windows-server

```

gitee

```bash
git clone https://gitee.com/taskPyroer/taskpyrodocker.git
```
```bash
# 进入到v2版本的文件
cd v2/windows-server
```

#### 2. 配置端口

将.env.exemple重命名为 `.env` 文件：

```
SERVER_PORT=80001
```
修改SERVER_PORT为指定的端口号，注意需要将Windows的端口防火墙打开，若不清楚可上网查询Windows下如何开放指定端口

#### 3. 启动工作节点

双击运行install_and_start.bat文件，即可自动安装程序；如下：

![TaskPyro微服务节点界面](../professional_images/windows-server.png)



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

