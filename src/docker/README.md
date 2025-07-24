---
title: Docker安装
index: false
icon: fa6-brands:docker
category:
  - Docker安装
head:
  - - meta
    - name: description
      content: TaskPyro Docker安装指南，提供Windows、macOS和各种Linux发行版的Docker与Docker Compose安装方法
  - - meta
    - name: keywords
      content: Docker安装,Docker Compose,Windows Docker,Linux Docker,macOS Docker,容器技术,TaskPyro
footer: <a href="https://beian.miit.gov.cn">粤ICP备2024213187号-2</a> © 2025-至今 TaskPyro
---

# Docker安装

Docker是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到任何流行的Linux或Windows操作系统的机器上。下面提供了在不同操作系统上安装Docker和Docker Compose的方法。

以下是针对不同操作系统的Docker和Docker Compose安装指南：

> **注意**：以下是我搜集到的安装方式，如有问题请指出或者自行解决docker的安装问题。



### 一、RedHat / CentOS 系统
```bash
# 安装Docker
sudo yum update -y
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install -y docker-ce docker-ce-cli containerd.io
sudo systemctl start docker
sudo systemctl enable docker

# 安装Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

### 二、Ubuntu / Debian 系统
```bash
# 安装Docker
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io
sudo systemctl start docker
sudo systemctl enable docker

# 安装Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

### 三、openEuler 系统
```bash
# 安装Docker
sudo dnf update -y
sudo dnf install -y docker
sudo systemctl start docker
sudo systemctl enable docker

# 安装Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

### 四、macOS 系统
1. 下载并安装 Docker Desktop for Mac：
   - 访问官网：https://www.docker.com/products   - 下载对应版本并安装
   - Docker Desktop 已包含 Docker Compose

2. 验证安装：
```bash
docker --version
docker-compose --version
```

### 五、Windows 系统
1. 下载并安装 Docker Desktop for Windows：
   - 访问官网：https://www.docker.com
   - 下载对应版本并安装
   - 确保启用 Hyper-V 和容器功能
   - Docker Desktop 已包含 Docker Compose

2. 验证安装：
```powershell
docker --version
docker-compose --version
```

### 安装问题解决

如果遇到 Docker 安装失败等问题，可以尝试运行以下脚本：

```bash
bash <(curl -sSL https://linuxmirrors.cn/docker.sh)
```

了解更多信息，请访问官方网站：https://linuxmirrors.cn

安装完成后，可以通过以下命令验证 Docker 是否安装成功：
```bash
docker --version
docker-compose --version
sudo docker run hello-world  # 验证Docker是否正常运行
```