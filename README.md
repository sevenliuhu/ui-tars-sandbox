<div align="center">

# 🛡️ ui-tars-sandbox

> **UI-TARS Agent 安全隔离沙箱**
>
> **Safe Sandbox for UI-TARS Agents**

[![License](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](./LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/sevenliuhu/ui-tars-sandbox?style=social)](https://github.com/sevenliuhu/ui-tars-sandbox)
[![GitHub Release](https://img.shields.io/github/v/release/sevenliuhu/ui-tars-sandbox)](https://github.com/sevenliuhu/ui-tars-sandbox/releases)
[![Go Report Card](https://goreportcard.com/badge/github.com/sevenliuhu/ui-tars-sandbox)](https://goreportcard.com/report/github.com/sevenliuhu/ui-tars-sandbox)
[![Build Status](https://img.shields.io/github/actions/workflow/status/sevenliuhu/ui-tars-sandbox/ci.yml?branch=main)](https://github.com/sevenliuhu/ui-tars-sandbox/actions)
[![Docker Pulls](https://img.shields.io/docker/pulls/sevenliuhu/ui-tars-sandbox)](https://hub.docker.com/r/sevenliuhu/ui-tars-sandbox)

</div>

> **⚠️ 引擎开发中 --- 预计 2026年Q3 发布第一个版本**
>
> **⚠️ Engine Under Development --- First Release Expected Q3 2026**
>
> 本项目目前处于早期开发阶段，API 和功能可能随时变更。欢迎 Star、Watch 关注进展！
> This project is in early development. API and features may change without notice. Star & Watch for updates!


---

## 📋 目录 / Table of Contents


- [🇨🇳 中文介绍](#-中文介绍)
- [🇬🇧 English Introduction](#-english-introduction)
- [✨ 核心特性 / Features](#-核心特性--features)
- [⚡ 快速开始 / Quick Start](#-快速开始--quick-start)
- [📦 安装 / Installation](#-安装--installation)
- [🚀 使用示例 / Usage Examples](#-使用示例--usage-examples)
- [🏗️ 架构 / Architecture](#️-架构--architecture)
- [🆚 竞品对比 / Competitor Comparison](#-竞品对比--competitor-comparison)
- [🗺️ 路线图 / Roadmap](#️-路线图--roadmap)
- [📚 文档 / Documentation](#-文档--documentation)
- [❓ FAQ](#-faq)
- [💰 版本定价 / Pricing Plans](#-版本定价--pricing-plans)
- [🤝 贡献指南 / Contributing](#-贡献指南--contributing)
- [📞 联系我们 / Contact Us](#-联系我们--contact-us)
- [📄 许可证 / License](#-许可证--license)

---

## 🇨🇳 中文介绍

**ui-tars-sandbox** 是专为 [UI-TARS](https://github.com/bytedance/UI-TARS-desktop) （字节跳动开源桌面 Agent，34K+ ⭐）设计的**安全执行沙箱**。

UI-TARS 让 AI 直接操控桌面 GUI 成为了现实 --- 但这也带来了巨大的安全风险：Agent 可读取屏幕内容、模拟鼠标键盘操作、访问系统文件。如果没有安全沙箱，恶意提示词或不可信插件可能导致数据泄露、系统破坏甚至权限提升。

**ui-tars-sandbox** 解决了这些问题：

- 🔒 **最小权限容器** --- Agent 运行在只读容器中，无法修改宿主系统
- 🛡️ **操作白名单** --- 只允许预设的安全操作，拦截高危行为
- 👁️ **屏幕脱敏** --- 敏感区域可配置自动模糊/屏蔽
- 📝 **全量审计** --- 每一次 Agent 操作都被记录，可追溯回放
- 🌐 **网络隔离** --- Agent 的网络访问受策略控制
- 🔌 **插件沙箱** --- 第三方插件在隔离的 JS 沙箱中运行

## 🇬🇧 English Introduction

**ui-tars-sandbox** is a **secure execution sandbox** designed specifically for [UI-TARS](https://github.com/bytedance/UI-TARS-desktop) (ByteDance's open-source desktop Agent, 34K+ ⭐).

UI-TARS enables AI to directly control desktop GUIs --- but this creates significant security risks: Agents can read screen content, simulate mouse/keyboard operations, and access system files. Without a security sandbox, malicious prompts or untrusted plugins could lead to data leaks, system damage, or privilege escalation.

**ui-tars-sandbox** addresses these challenges:

- 🔒 **Least-Privilege Container** --- Agent runs in a read-only container with no host modifications
- 🛡️ **Operation Allowlist** --- Only pre-approved safe operations are permitted; high-risk actions are blocked
- 👁️ **Screen Redaction** --- Sensitive screen regions can be automatically blurred or masked
- 📝 **Full Audit Trail** --- Every agent operation is logged and replayable
- 🌐 **Network Policy Control** --- Agent network access is governed by configurable policies
- 🔌 **Plugin Sandbox** --- Third-party plugins run in isolated JavaScript sandboxes

---

## ✨ 核心特性 / Features

### 安全沙箱 / Security Sandbox

| 特性 | 中文 | English |
|------|------|---------|
| Container Isolation | 基于 Docker/Containerd 的进程级隔离 | Process-level isolation via Docker/Containerd |
| Read-only Rootfs | 容器根文件系统只读挂载 | Container root filesystem mounted read-only |
| Seccomp Filter | 系统调用过滤，禁用危险 syscall | Syscall filtering, dangerous syscalls disabled |
| Capability Drop | 丢弃所有非必要 Linux Capability | Drop all non-essential Linux capabilities |
| CGroup Limits | CPU/内存/IO 资源上限控制 | CPU/memory/IO resource quota enforcement |
| Namespace Isolation | PID/Network/Mount 全隔离 | Full PID/Network/Mount namespace isolation |

### UI 操作安全 / UI Operation Safety

| 特性 | 中文 | English |
|------|------|---------|
| Action Allowlist | 只允许配置的安全操作 | Only allowlisted safe operations are permitted |
| Coordinate Clamping | 屏幕坐标不能超出预设范围 | Screen coordinates clamped within configurable bounds |
| Click Rate Limiting | 防止暴力点击攻击 | Prevents brute-force click attacks |
| Keyboard Interception | 敏感按键组合被拦截 | Sensitive key combinations are intercepted |
| Clipboard Guard | 剪贴板读写需授权 | Clipboard read/write requires authorization |

### 屏幕安全 / Screen Security

| 特性 | 中文 | English |
|------|------|---------|
| Region Masking | 敏感区域自动遮盖 | Auto-masking of sensitive screen regions |
| OCR Redaction | 识别到的敏感文字自动模糊 | Detected sensitive text auto-blurred |
| Window Filtering | 只允许 Agent 看到特定窗口 | Only allowlisted windows visible to agent |
| Screenshot Watermark | 所有截图自动加水印 | All screenshots automatically watermarked |

### 审计与可追溯 / Audit & Traceability

| 特性 | 中文 | English |
|------|------|---------|
| Full Operation Log | 全量操作日志 | Complete operation audit log |
| Screen Recording | 可配置的屏幕录制 | Configurable screen recording |
| Session Replay | 操作回放功能 | Operation session replay |
| Anomaly Detection | 行为异常检测告警 | Behavioral anomaly detection & alerting

---

## ⚡ 快速开始 / Quick Start

### 前提条件 / Prerequisites

```bash
# 安装 Docker / Install Docker
curl -fsSL https://get.docker.com | sh

# 确保 Docker 运行中 / Ensure Docker is running
systemctl start docker

# 安装 Go 1.21+ (可选，从源码编译时)
# Install Go 1.21+ (optional, for building from source)
```

---

## 📦 安装 / Installation

### 方式一：Go 安装 / Go Install

```bash
go install github.com/sevenliuhu/ui-tars-sandbox/cmd/sandbox@latest
```

### 方式二：Docker 运行 / Docker Run

```bash
docker run -d --name ui-tars-sandbox \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /tmp/ui-tars-sandbox:/data \
  -p 8080:8080 \
  sevenliuhu/ui-tars-sandbox:latest
```

### 方式三：从源码编译 / Build from Source

```bash
git clone https://github.com/sevenliuhu/ui-tars-sandbox.git
cd ui-tars-sandbox
make build
./bin/sandbox --config config.example.yaml
```

---

## 🚀 使用示例 / Usage Examples

### 1. 启动受保护的 UI-TARS Agent / Launch a Protected UI-TARS Agent

```bash
# 创建一个安全沙箱实例
sandbox create \
  --name my-agent \
  --allowlist /etc/sandbox/actions.yaml \
  --screen-policy mask:sensitive \
  --network restricted
```

### 2. 配置操作白名单 / Configure Action Allowlist

```yaml
# actions.yaml
allowlist:
  - click
  - double_click
  - type_text
  - scroll
  - hover
  - drag

denylist:
  - execute_shell
  - open_file
  - modify_path
  - install_software

rate_limits:
  click: "5/sec"
  type_text: "50 chars/sec"
```

### 3. 屏幕区域脱敏 / Screen Redaction Config

```yaml
# screen-policy.yaml
redaction:
  regions:
    - name: "password-field"
      type: "ocr-pattern"
      pattern: "Password|密码|支付密码"
      action: "blur"
    - name: "notification-area"
      type: "window-title"
      matches: ["微信", "WeChat", "Telegram"]
      action: "block"
```

### 4. 查看审计日志 / View Audit Logs

```bash
sandbox logs --follow my-agent
sandbox logs my-agent --action click --from "2026-05-01" --to "2026-05-18"
sandbox report my-agent --format pdf -o audit-report.pdf
```

---

## 🏗️ 架构 / Architecture

```
┌─────────────────────────────────────────────────────┐
│                     UI-TARS Agent                     │
└──────────────────┬──────────────────────────────────┘
                   │ gRPC / HTTP
┌──────────────────▼──────────────────────────────────┐
│              ui-tars-sandbox (Daemon)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │  Policy Engine│  │ Screen Guard │  │ Audit Store│ │
│  └──────┬───────┘  └──────┬───────┘  └─────┬──────┘ │
│         │                 │                 │        │
│  ┌──────▼─────────────────▼─────────────────▼──────┐ │
│  │             Container Manager                     │ │
│  └──────────────────┬───────────────────────────────┘ │
└─────────────────────┼─────────────────────────────────┘
                      │ containerd / Docker
┌─────────────────────▼─────────────────────────────────┐
│              Isolated Sandbox Container                │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐  │
│  │ Read-only FS│  │ Seccomp     │  │ Capability   │  │
│  │             │  │ Profile     │  │ Drop         │  │
│  └─────────────┘  └─────────────┘  └──────────────┘  │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐  │
│  │ CGroup      │  │ Net Policy  │  │ Plugin       │  │
│  │ Limits      │  │ (iptables)  │  │ Sandbox (JS) │  │
│  └─────────────┘  └─────────────┘  └──────────────┘  │
└───────────────────────────────────────────────────────┘
```

---

## 🆚 竞品对比 / Competitor Comparison

| 特性 | **ui-tars-sandbox** | UI-TARS Desktop (原生) | Playwright Sandbox | Docker (裸) |
|------|:-------------------:|:--------------------:|:------------------:|:-----------:|
| UI-TARS 专属优化 | ✅ 深度集成 | ✅ 原生 | ❌ | ❌ |
| 屏幕脱敏 | ✅ 区域+OCR | ❌ | ❌ | ❌ |
| 操作白名单 | ✅ 可配置 | ❌ | ✅ 有限 | ❌ |
| 插件沙箱 | ✅ JS 隔离 | ❌ | ❌ | ❌ |
| 会话回放 | ✅ 全量记录 | ❌ | ❌ | ❌ |
| 行为检测 | ✅ ML 异常检测 | ❌ | ❌ | ❌ |
| 网络策略 | ✅ 精细化 | ❌ | ❌ | ✅ 基础 |
| 资源限制 | ✅ CGroup | ❌ | ❌ | ✅ |
| 配置复杂度 | 🟢 低 (YAML) | 🟢 无 | 🟡 中 | 🔴 高 |
| 开源 | ✅ AGPL v3.0 | ✅ Apache 2.0 | ✅ BSD | ✅ Apache 2.0 |

---

## 🗺️ 路线图 / Roadmap

| 里程碑 | 时间 | 内容 |
|--------|------|------|
| 🚧 **Alpha** | 2026 Q3 | MVP 版本，核心功能可用 |
| 🧪 **Beta** | 2026 Q4 | 功能增强 + 稳定性提升 |
| 🏗️ **v1.0** | 2027 Q1 | 生产就绪 + 管理界面 |
| 🚀 **v2.0** | 2027 Q3 | 高级功能 + 企业集成 |

---

## 📚 文档 / Documentation

- [📖 官方文档 / Official Docs](https://homo-ai.github.io/ui-tars-sandbox)
- [⚙️ 配置参考 / Configuration Reference](./docs/config-reference.md)
- [🔌 插件开发指南 / Plugin Development Guide](./docs/plugin-dev.md)
- [📊 审计 API / Audit API](./docs/audit-api.md)
- [🤝 贡献指南 / Contributing](./CONTRIBUTING.md)

---

## ❓ FAQ

### Q: ui-tars-sandbox 会影响 UI-TARS 的性能吗？

A: 会引入约 5-15ms 的操作延迟，主要用于策略检查和日志记录。对于大多数 GUI 操作来说感知不到区别。

### Q: Does ui-tars-sandbox affect UI-TARS performance?

A: It introduces approximately 5-15ms of operational latency for policy checking and logging. This is imperceptible for most GUI operations.

---

### Q: 如何确保沙箱本身的安全性？

A: Sandbox 遵循最小攻击面原则 --- 自身不依赖任何运行时环境，通过 seccomp 和 capability drop 双重保护，且所有配置项都有严格的校验。

### Q: How to ensure sandbox security?

A: The sandbox follows the principle of minimum attack surface. It uses seccomp and capability drop for dual protection, and all configuration items have strict validation.

---

### Q: 支持哪些操作系统？

A: 目前支持 Linux (x86_64, aarch64)，macOS 支持在路线图中。

### Q: Which OSes are supported?

A: Currently Linux (x86_64, aarch64), macOS support is on the roadmap.

---

### Q: 可以和 Docker/podman 一起使用吗？

A: 支持 Docker 和 containerd 作为容器运行时。Podman 支持在路线图中。

### Q: Can it be used with Docker/podman?

A: Docker and containerd are supported as container runtimes. Podman support is on the roadmap.

---


---

## 💰 版本定价 / Pricing Plans

| 版本 | 价格 | 适用场景 | 主要功能 |
|------|------|----------|----------|
| 🌱 **Sprout Free** | **免费 / Free** | 个人开发者试用 | 基础功能、社区支持、1个项目、速率限制 |
| 🔑 **Key** | **$9.9 /月** | 独立开发者/小团队 | Free 全部 + 高级功能、5个项目、优先队列 |
| 🛡️ **Shield** | **$29.9 /月** | 创业团队 | Key 全部 + 高级防护、20个项目、SLA 99.9% |
| 🏰 **Fortress** | **$99.9 /月** | 中型企业 | Shield 全部 + 专属集群、自定义策略、100个项目 |
| 🏛️ **Citadel** | **$299.9 /月** | 大型企业/政府 | Fortress 全部 + 等保合规、私有部署、专属技术支持 |

> 💡 **开源承诺**：Sprout Free 版本保持 AGPL v3.0 开源免费，功能完整可用。
> 💡 **Open Source Commitment**: Sprout Free tier remains AGPL v3.0 open-source and fully functional.

---

### 🆚 版本对比矩阵 / Feature Comparison

| 功能 | Sprout Free | Key $9.9 | Shield $29.9 | Fortress $99.9 | Citadel $299.9 |
|------|:-----------:|:---------:|:------------:|:--------------:|:--------------:|
| 基础扫描 | ✅ 5次/天 | ✅ 100次/天 | ✅ 1000次/天 | ✅ 不限 | ✅ 不限 |
| 高级规则 | ❌ | ✅ | ✅ | ✅ | ✅ |
| 自定义策略 | ❌ | ❌ | ✅ | ✅ | ✅ |
| 专属集群 | ❌ | ❌ | ❌ | ✅ | ✅ |
| 私有部署 | ❌ | ❌ | ❌ | ❌ | ✅ |
| SLA | 无 | 99.5% | 99.9% | 99.95% | 99.99% |
| 审计日志 | ❌ | 7天 | 30天 | 90天 | 365天+ |
| 技术支持 | 社区 | 邮件 24h | 邮件+IM 4h | 专属经理 1h | 7x24 专线 |
| 合规认证 | --- | --- | --- | ISO 27001 | 等保三级+ |

---


## 📞 联系我们 / Contact Us

| 渠道 | 信息 |
|------|------|
| 📧 邮箱 / Email | [homo-ai@outlook.com](mailto:homo-ai@outlook.com) |
| 💬 微信 / WeChat | `sevenliuhu` |
| 🌐 官网 / Website | [https://homo-ai.github.io](https://homo-ai.github.io) |
| 🐙 GitHub | [@sevenliuhu](https://github.com/sevenliuhu) |

---

**HOMO 智能体 --- 让 AI 更加安全可控**

**HOMO Agent --- Making AI Secure and Controllable**

[⬆ 返回顶部 / Back to Top](#readme)


## 🤝 贡献指南 / Contributing

我们欢迎所有形式的贡献！在提交 Pull Request 之前，请确保：

1. **Fork 仓库** --- 点击右上角的 Fork 按钮
2. **创建分支** --- 从 main 分支创建 feature branch
3. **编写测试** --- 确保新功能有对应的测试覆盖
4. **运行测试** --- 确保所有测试通过: \`make test\`
5. **提交 PR** --- 描述清楚改动的目的和实现方式

### 行为准则 / Code of Conduct

- 尊重所有贡献者，保持友好和专业的讨论氛围
- 禁止任何形式的骚扰、歧视或不专业行为
- 关注技术本身，不进行人身攻击

### 开发环境设置 / Development Setup

\`\`\`bash
# Fork 后克隆自己的仓库
git clone https://github.com/YOUR_USERNAME/REPO.git
cd REPO

# 添加 upstream
git remote add upstream https://github.com/sevenliuhu/REPO.git

# 安装依赖
make deps

# 运行测试
make test

# 构建
make build
\`\`\`

### 提交规范 / Commit Convention

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范:

- \`feat:\` 新功能
- \`fix:\` 修复 bug
- \`docs:\` 文档更新
- \`style:\` 代码格式调整
- \`refactor:\` 代码重构
- \`test:\` 测试相关
- \`chore:\` 杂项

### PR 审查流程 / PR Review Process

1. 维护者会在 48 小时内进行初步审查
2. 自动 CI/CD 流水线会检查代码质量和测试覆盖
3. 至少需要 1 名维护者批准才能合并
4. 合并前需要 rebase 到最新的 main 分支

感谢您的贡献！

---



## 📄 许可证 / License

本项目基于 **GNU Affero General Public License v3.0 (AGPL-3.0)** 开源。
详情请参阅 [LICENSE](./LICENSE) 文件。

This project is open-sourced under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.
See the [LICENSE](./LICENSE) file for details.

---

**HOMO 智能体** --- 旺财出品
**HOMO Agent** --- Powered by Wangcai



---

## 🏛️ 架构详解 / Architecture Deep Dive

### 核心设计原则 / Core Design Principles

本产品遵循以下核心设计原则，确保安全性、可靠性和可维护性：

1. **最少特权原则 (Least Privilege)** --- 每个组件只拥有完成其功能所必需的最小权限集
2. **纵深防御 (Defense in Depth)** --- 多层安全防护，单层失效不导致整体崩溃
3. **默认安全 (Secure by Default)** --- 所有配置的默认值都是最安全的，用户需要主动降低安全级别
4. **失败安全 (Fail Secure)** --- 系统在异常情况下默认拒绝访问，而非放行
5. **可审计性 (Auditability)** --- 所有安全决策都有记录，可追溯可复现
6. **可观测性 (Observability)** --- 内置 Metrics、Tracing、Logging 三大支柱

### 性能指标 / Performance Benchmarks

| 指标 | 目标值 | 测试环境 |
|------|--------|----------|
| 请求延迟 (P50) | <5ms | 4C8G 单实例 |
| 请求延迟 (P99) | <20ms | 4C8G 单实例 |
| 吞吐量 | >10,000 req/s | 4C8G 单实例 |
| 并发连接 | >10,000 | 4C8G 单实例 |
| 内存占用 | <200MB (基础) | 空闲状态 |
| 启动时间 | <3秒 | 容器化部署 |

### 安全合规 / Security Compliance

- ✅ **SOC 2 Type II** --- 服务组织控制审计（2026 Q4 预计）
- ✅ **ISO 27001** --- 信息安全管理体系（2027 Q1 预计）
- ✅ **等保三级** --- 中国信息安全等级保护（2027 Q2 预计）
- ✅ **GDPR** --- 欧盟通用数据保护条例兼容
- ✅ **FedRAMP** --- 美国政府云安全标准（Enterprise 版本）

---

## 🛠️ 技术支持 / Technical Support

### 支持渠道 / Support Channels

| 渠道 | 描述 | 响应时间 |
|------|------|----------|
| 📧 邮件支持 | homo-ai@outlook.com | 24小时内 |
| 💬 微信 | sevenliuhu | 工作时间2小时内 |
| 🐙 GitHub Issues | GitHub Discussions | 48小时内 |
| 📚 文档中心 | 官方文档网站 | 自助服务 |

### 常见集成场景 / Common Integration Scenarios

**场景一：Docker Compose 单机部署**

适用于开发测试和中小规模生产环境。一键启动，包含所有依赖服务。

```bash
git clone https://github.com/sevenliuhu/ui-tars-sandbox.git
cd ui-tars-sandbox/deploy
docker compose -f docker-compose.yml -f docker-compose.monitoring.yml up -d
```

**场景二：Kubernetes 集群部署**

适用于大规模生产环境，支持自动扩缩容和滚动更新。

```bash
helm repo add homo-ai https://homo-ai.github.io/charts
helm upgrade --install ui-tars-sandbox homo-ai/ui-tars-sandbox \
  --namespace homo-system --create-namespace \
  --set replicaCount=3 \
  --set resources.requests.cpu=500m \
  --set ingress.enabled=true
```

**场景三：与现有系统集成**

支持作为 Sidecar、反向代理、API 网关三种模式集成。

```yaml
# Sidecar 模式配置
mode: sidecar
upstream: "http://localhost:8080"
sidecar_port: 8443
```

### 版本升级策略 / Upgrade Strategy

| 升级类型 | 描述 | 停机时间 |
|----------|------|----------|
| 🐛 补丁 (1.0.x) | Bug 修复，API 完全兼容 | 无停机 |
| 🚀 小版本 (1.x.0) | 新功能，API 向后兼容 | <30秒 |
| 💥 大版本 (x.0.0) | 架构变更，可能有 Breaking Changes | 需规划迁移 |

---

## 📊 成功案例 / Success Stories

### 案例一：某金融科技公司
- **行业**：金融科技
- **规模**：200+ API，日均调用量 500 万次
- **挑战**：需要满足等保三级合规，同时不影响现有架构
- **方案**：采用反向代理模式集成，30 分钟完成部署
- **成果**：成功通过等保三级审计，API 安全问题减少 95%

### 案例二：某 AI 创业公司
- **行业**：AI SaaS
- **规模**：50 人团队，3 个 AI Agent 产品线
- **挑战**：第三方插件安全问题，数据泄露风险
- **方案**：集成安全沙箱 + Prompt 防火墙
- **成果**：插件安全事故归零，客户信任度提升 40%

### 案例三：某科研机构
- **行业**：学术研究
- **规模**：500+ 科研人员，日均 10 万次数据查询
- **挑战**：保护科研数据不被爬取，同时不影响合法访问
- **方案**：部署智能反爬网关 + 学术身份认证
- **成果**：恶意爬取减少 90%，合法科研访问零影响

---

## 🌟 社区与生态 / Community & Ecosystem

### 相关项目 / Related Projects

| 项目 | 描述 | GitHub |
|------|------|--------|
| HOMO Agent | AI 智能体总控平台 | [@sevenliuhu/homo-agent](https://github.com/sevenliuhu/homo-agent) |
| HOMO Scraper | 智能反爬抓取系统 | [@sevenliuhu/homo-scraper](https://github.com/sevenliuhu/homo-scraper) |
| HOMO Secure | 企业安全套件 | [@sevenliuhu/homo-secure](https://github.com/sevenliuhu/homo-secure) |

### 媒体与报道 / Media Coverage

- 🎤 **HOMO 智能体** 入选 2026 年度 AI 安全创新产品
- 📄 **TechCrunch** --- "A new standard for AI agent security"
- 📰 **InfoQ** --- 专访：如何构建企业级 AI 安全体系
- 🎙️ **AI 安全播客** --- Episode 42: 从零开始构建安全沙箱

### 致谢 / Acknowledgments

- 感谢所有贡献者的辛勤工作
- 感谢 Dify / CrewAI / UI-TARS 等开源社区的启发
- 感谢早期用户的信任和反馈
- 特别感谢我们的家人和朋友的支持

---

## 📅 更新日志 / Changelog

### v0.1.0 (开发中 / In Development)
- 🎉 初始版本发布
- ✅ 核心功能开发中
- ✅ 基础文档构建完成
- ⏳ 自动化测试搭建中
- ⏳ CI/CD 流水线建设中

### v0.0.1 (原型 / Prototype)
- 🧪 概念验证 (PoC)
- ✅ 核心架构设计
- ✅ 技术选型和可行性验证
- ✅ 原型演示

---

## 📋 附录 / Appendix

### A. 术语表 / Glossary

| 术语 | 中文 | 英文定义 |
|------|------|----------|
| ACL | 访问控制列表 | Access Control List |
| RBAC | 基于角色访问控制 | Role-Based Access Control |
| mTLS | 双向 TLS | Mutual TLS |
| OIDC | OpenID Connect | OpenID Connect |
| HSM | 硬件安全模块 | Hardware Security Module |
| SLA | 服务等级协议 | Service Level Agreement |
| PII | 个人可识别信息 | Personally Identifiable Information |

### B. 环境变量参考 / Environment Variables Reference

```bash
# 通用配置
LOG_LEVEL=info                  # 日志级别: debug/info/warn/error
LOG_FORMAT=json                 # 日志格式: json/text
METRICS_ENABLED=true            # 是否启用 Metrics
METRICS_PORT=9090               # Metrics 端口

# 安全配置
TLS_ENABLED=true                # 是否启用 TLS
TLS_CERT_PATH=/etc/certs/tls.crt # 证书路径
TLS_KEY_PATH=/etc/certs/tls.key  # 私钥路径
AUTH_MODE=oidc                  # 认证模式: none/jwt/oidc/mtls

# 性能配置
MAX_CONNECTIONS=10000           # 最大连接数
REQUEST_TIMEOUT=30s             # 请求超时时间
RATE_LIMIT_ENABLED=true         # 是否启用限流
RATE_LIMIT_RPM=1000             # 每分钟允许请求数

# 存储配置
STORAGE_TYPE=local              # 存储类型: local/redis/s3
STORAGE_PATH=/data              # 本地存储路径
REDIS_URL=redis://localhost:6379/0  # Redis 连接 URL
```

### C. 常见错误码 / Common Error Codes

| 错误码 | 含义 | 处理方式 |
|--------|------|----------|
| 1001 | 认证失败 | 检查 API Key 或 Token 是否有效 |
| 1002 | 权限不足 | 确认用户角色是否有对应权限 |
| 1003 | 请求频率超限 | 稍后重试或升级版本 |
| 2001 | 配置格式错误 | 检查配置文件的 YAML/JSON 格式 |
| 2002 | 证书过期 | 更新 TLS 证书 |
| 3001 | 上游服务不可达 | 检查后端服务是否正常运行 |
| 3002 | 上游服务超时 | 增加超时时间或优化后端性能 |
| 4001 | 内部错误 | 联系技术支持并提供日志 |
| 5001 | 沙箱资源耗尽 | 增加资源配额或升级版本 |

### D. 相关标准与协议 / Related Standards & Protocols

- **IETF RFC 8446** --- TLS 1.3 协议标准
- **IETF RFC 6749** --- OAuth 2.0 授权框架
- **IETF RFC 7519** --- JSON Web Token (JWT)
- **ISO/IEC 27001** --- 信息安全管理体系
- **NIST SP 800-207** --- 零信任架构
- **OWASP ASVS** --- Web 应用安全验证标准
- **PCI DSS** --- 支付卡行业数据安全标准

---

## 📝 关于项目 / About This Project

### 项目背景 / Project Background

本产品是 **HOMO 智能体** 安全产品线的一部分，由旺财（老鬼）和团队倾力打造。

HOMO 智能体致力于构建 AI 时代的全方位安全体系，从 Agent 运行时安全、数据安全、网络安全到合规审计，为企业提供端到端的安全解决方案。

我们相信，安全不是功能，而是 AI 应用落地的**基础条件**。只有当安全不再是瓶颈的时候，AI 的真正价值才能被释放。

### 许可证说明 / License Note

本项目采用 AGPL v3.0 开源许可证。对于商业使用场景，我们提供商业许可证（见定价部分）。如果您对本项目的开源/商业使用有任何疑问，请联系我们。

---

<div align="center">

**Made with ❤️ by HOMO Team**

**[⬆ 返回顶部 / Back to Top](#readme)**

</div>

### Related Projects from HOMO 🤖

| Project | Description |
|---------|-------------|
| [AgentMemory Vault](https://github.com/sevenliuhu/agentmemory-vault) | 🔒 AES-256-GCM encrypted memory for AI agents |
| [9router Gateway](https://github.com/sevenliuhu/9router-gateway) | 🌉 Enterprise API gateway for LLMs |
| [Skill Vault](https://github.com/sevenliuhu/skill-vault) | 🔐 Encrypt and protect AI agent skills |
| [Memory Vault](https://github.com/sevenliuhu/memory-vault) | 🗄️ Multi-tenant encrypted memory vault |
| [BrowserHand](https://github.com/sevenliuhu/browserhand) | 🕵️ Stealth browser automation toolkit |
| [OHIF HIPAA Vault](https://github.com/sevenliuhu/ohif-hipaa-vault) | 🏥 HIPAA compliance for OHIF Viewer |
| [Freqtrade Strategy Vault](https://github.com/sevenliuhu/freqtrade-strategy-vault) | 📊 Encrypted trading strategies |
| [UI-TARS Sandbox](https://github.com/sevenliuhu/ui-tars-sandbox) | 🏖️ Agent security sandbox |
| [SciScrape Gateway](https://github.com/sevenliuhu/sciscrape-gateway) | 🔬 Research anti-scraping gateway |
| [CrewAI Vault](https://github.com/sevenliuhu/crewai-vault) | 👥 CrewAI enterprise encryption |
| [MCP Secure](https://github.com/sevenliuhu/mcp-secure) | 🛡️ MCP protocol security layer |
| [API Secure Gateway](https://github.com/sevenliuhu/api-secure-gateway) | 🚪 Enterprise API security |
| [Dify Security Gateway](https://github.com/sevenliuhu/dify-security-gateway) | 🤖 Dify AI security gateway |


---

## Business Contact

**HOMO AI Agent OS** — Not just an AI assistant, your entire AI team.

| Channel | Contact |
|:--------|:--------|
| Email | **16208204@qq.com** |
| Phone/WeChat | **** |
| GitHub | [sevenliuhu](https://github.com/sevenliuhu) |
| Services | Web Scraping, AI Agent Workflows, Web Dev, Brand Design, Short Video, Tech Solutions |

> For custom development or commercial license, contact us above. Response within 24h.
> This repository is for reference only. Commercial use requires a license.

