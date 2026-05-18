# UI-TARS Agent 安全沙箱 / UI-TARS Agent Secure Sandbox

> ⚠️ **引擎开发中 — 预计 2026年Q3 发布第一个版本**  
> **⚠️ Engine Under Development — First Release Expected Q3 2026**

<p align="center">
  <strong>安全沙箱 · 访问控制 · 审计日志</strong>
  <br />
  <strong>Secure Sandbox · Access Control · Audit Logging</strong>
</p>

<p align="center">
  <a href="#产品介绍">中文</a> · <a href="#product-introduction">English</a>
</p>

---

## 产品介绍 / Product Introduction

### 概述 / Overview

**UI-TARS Agent 安全沙箱** 是一个专为 UI-TARS Desktop 生态打造的隔离运行环境。它提供沙箱隔离、细粒度访问控制和完整审计日志三大核心能力，让 AI Agent 在安全可控的环境中执行任务。本项目对标 [bytedance/UI-TARS-desktop](https://github.com/bytedance/UI-TARS-desktop)（34K ⭐），在其强大的 UI 自动化能力基础上，增加了企业级安全防护层。

**UI-TARS Agent Secure Sandbox** is an isolated runtime environment built specifically for the UI-TARS Desktop ecosystem. It provides three core capabilities: sandbox isolation, granular access control, and comprehensive audit logging, enabling AI Agents to execute tasks in a secure and controlled environment. This project is benchmarked against [bytedance/UI-TARS-desktop](https://github.com/bytedance/UI-TARS-desktop) (34K ⭐), adding an enterprise-grade security layer on top of its powerful UI automation capabilities.

### 为什么需要 UI-TARS 安全沙箱？ / Why UI-TARS Secure Sandbox?

UI-TARS Desktop 让 AI 能够理解和操作图形界面，这带来了巨大的安全挑战 / UI-TARS Desktop enables AI to understand and interact with graphical interfaces, introducing significant security challenges:

1. **不可控的 UI 操作** — Agent 可能误操作关键系统组件 / Uncontrolled UI Operations — Agents may accidentally operate on critical system components
2. **数据泄露风险** — 未经授权的屏幕截图和内容读取 / Data Leakage Risks — Unauthorized screenshots and content reading
3. **权限滥用** — Agent 拥有超出任务所需的权限 / Privilege Abuse — Agents possessing more permissions than necessary
4. **缺乏审计** — 无法追踪 Agent 的执行记录 / Lack of Audit — No traceability of Agent execution records

### 适用场景 / Use Cases

- **企业桌面自动化** — 在受控环境中运行 UI 自动化任务 / Enterprise Desktop Automation — Run UI automation tasks in a controlled environment
- **QA 测试环境** — 隔离的 UI 测试沙箱 / QA Testing — Isolated UI test sandbox
- **安全研究** — 分析恶意 UI 操作行为 / Security Research — Analyze malicious UI operation behavior
- **开发测试** — 安全地测试新的 UI Agent 功能 / Development Testing — Safely test new UI Agent features

### How It Works

```
User Request → Policy Engine → Sandbox Environment → UI-TARS Desktop → Isolated UI
                                    ↓
                              Audit Logger → Log Storage → Review Dashboard
```

## 核心功能 / Core Features

### 🏰 沙箱隔离 / Sandbox Isolation

| 功能 / Feature | 说明 / Description |
|------|---------|
| 进程沙箱 / Process Sandbox | 基于 Linux Namespace 的进程隔离 / Process isolation based on Linux Namespace |
| 文件系统沙箱 / Filesystem Sandbox | OverlayFS 只读根文件系统+可写层 / OverlayFS read-only root filesystem + writable layer |
| 网络沙箱 / Network Sandbox | 细粒度网络策略，支持白/黑名单 / Granular network policy with whitelist/blacklist |
| 显示沙箱 / Display Sandbox | 虚拟显示环境 (Xvfb/Virtual Display) / Virtual display environment |
| 剪贴板隔离 / Clipboard Isolation | 沙箱内外剪贴板完全隔离 / Complete clipboard isolation |
| 时间沙箱 / Time Sandbox | 可模拟任意系统时间 / Ability to simulate any system time |

### 🔐 访问控制 / Access Control

| 功能 / Feature | 说明 / Description |
|------|---------|
| 策略引擎 / Policy Engine | 基于 Rego/OPA 的策略定义 / Policy definition based on Rego/OPA |
| 角色管理 / Role Management | RBAC 角色-权限-用户三层模型 / RBAC three-layer model |
| 操作审计 / Operation Audit | 每次 UI 操作均经策略引擎审核 / Every UI operation reviewed by policy engine |
| 实时拦截 / Real-time Interception | 违规操作实时阻断并告警 / Real-time blocking on violations |
| 临时授权 / Temporary Authorization | 支持一次性/限时权限授予 / One-time or time-limited permissions |
| 路径策略 / Path Policy | 基于文件路径和 UI 控件路径的策略 / Policies based on file and UI control paths |

### 📋 审计日志 / Audit Logging

| 功能 / Feature | 说明 / Description |
|------|---------|
| 全量记录 / Full Recording | 记录所有 Agent 操作和系统事件 / Records all Agent operations |
| 结构化日志 / Structured Logging | JSON 格式，支持自定义字段 / JSON format with custom fields |
| 日志检索 / Log Search | 多维度搜索和过滤 / Multi-dimensional search |
| 回放功能 / Replay | 支持操作回放用于调试 / Operation replay for debugging |
| 告警规则 / Alert Rules | 自定义审计规则触发告警 / Custom audit alert rules |
| 日志导出 / Log Export | 支持导出为 CSV/JSON/Parquet / Export to CSV/JSON/Parquet |

### 🛡️ 安全特性 / Security Features

- **密钥轮换 / Key Rotation** — 自动定期轮换加密密钥 / Automatic periodic encryption key rotation
- **安全启动 / Secure Boot** — 启动时验证沙箱完整性 / Sandbox integrity verification on startup
- **内存保护 / Memory Protection** — 敏感数据加密存储 / Encrypted storage of sensitive data
- **通信加密 / Communication Encryption** — 全程 TLS 加密 / Full TLS encryption
- **安全擦除 / Secure Erasure** — 沙箱销毁时安全擦除 / Secure data erasure on sandbox destruction

## 技术架构 / Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Orchestrator                       │
│            (沙箱编排器 / Sandbox Orchestrator)         │
└──────────────┬──────────────────────┬────────────────┘
               │                      │
     ┌─────────▼─────────┐    ┌──────▼──────────┐
     │   Policy Engine    │    │   Audit System   │
     │   (OPA/Rego)       │    │   (审计系统)      │
     └─────────┬─────────┘    └──────┬──────────┘
               │                      │
     ┌─────────▼──────────────────────▼──────────┐
     │           Sandbox Environment             │
     │  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  │
     │  │Sandbox│  │Sandbox│  │Sandbox│  │Sandbox│  │
     │  │  #1   │  │  #2   │  │  #3   │  │  #N   │  │
     │  └──────┘  └──────┘  └──────┘  └──────┘  │
     └────────────────────────────────────────────┘
```

### 组件说明 / Component Details

| 组件 / Component | 技术栈 / Stack | 说明 / Description |
|------|--------|---------|
| Orchestrator | Go/Rust | 沙箱生命周期管理 / Sandbox lifecycle management |
| Policy Engine | OPA/Rego | 策略定义与评估 / Policy definition and evaluation |
| Audit System | Elasticsearch + Kafka | 日志收集与检索 / Log collection and search |
| Sandbox Runtime | Linux Namespace + OverlayFS | 容器化隔离环境 / Containerized isolation |
| API Gateway | Envoy + gRPC | 外部接口网关 / External API gateway |
| UI Dashboard | React + TypeScript | 管理控制台 / Management console |

## 快速开始 / Quick Start

### 前提条件 / Prerequisites

- Linux Kernel 5.10+
- Docker 20.10+
- 16GB RAM (推荐 32GB+ / 32GB+ recommended)
- 100GB 可用磁盘空间 / Free disk space

### 安装 / Installation

#### 使用 Docker (推荐 / Recommended)

```bash
# 拉取最新镜像 / Pull the latest image
docker pull homolabs/ui-tars-sandbox:latest

# 启动沙箱管理器 / Start the sandbox manager
docker run -d \
  --name sandbox-manager \
  --privileged \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -p 8080:8080 \
  -p 9090:9090 \
  homolabs/ui-tars-sandbox:latest

# 创建第一个沙箱 / Create your first sandbox
curl -X POST http://localhost:8080/api/v1/sandboxes \
  -H "Content-Type: application/json" \
  -d '{"name": "test-sandbox", "policy": "default"}'
```

#### 手动安装 / Manual Installation

```bash
# 克隆仓库 / Clone repository
git clone https://github.com/sevenliuhu/ui-tars-sandbox.git
cd ui-tars-sandbox

# 安装依赖 / Install dependencies
make install-deps

# 构建 / Build
make build

# 启动 / Start
./bin/sandbox-manager --config config.yaml
```

### 验证安装 / Verify Installation

```bash
curl http://localhost:8080/health
# {"status":"ok","version":"0.1.0","sandboxes_running":1}
```

## 安装指南 / Installation Guide

### 系统要求 / System Requirements

| 组件 / Component | 最低要求 / Minimum | 推荐配置 / Recommended |
|------|---------|---------|
| CPU | 4 cores | 8+ cores |
| RAM | 16 GB | 32+ GB |
| Disk | 50 GB | 200+ GB SSD |
| OS | Ubuntu 20.04+ / CentOS 8+ | Ubuntu 22.04+ |
| Kernel | 5.10+ | 6.0+ |
| Docker | 20.10+ | 24.0+ |

### 安装方式 / Installation Methods

1. **Docker 安装** — 最简单快速的方式 / Easiest and fastest way
2. **二进制安装** — 直接部署单个二进制文件 / Deploy a single binary
3. **Kubernetes 安装** — Helm Chart 部署到 K8s / Deploy to K8s with Helm Chart
4. **源码编译** — 从源码构建 / Build from source

### Docker Compose 部署

```yaml
version: '3.8'
services:
  sandbox-manager:
    image: homolabs/ui-tars-sandbox:latest
    privileged: true
    ports:
      - "8080:8080"
      - "9090:9090"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./config:/etc/sandbox
      - ./data:/var/lib/sandbox
    environment:
      - SANDBOX_LOG_LEVEL=info
      - SANDBOX_MAX_MEMORY=8192
    restart: unless-stopped
```

## 配置说明 / Configuration

### 配置文件 / Configuration File (config.yaml)

```yaml
server:
  host: "0.0.0.0"
  port: 8080
  tls:
    enabled: true
    cert: /etc/sandbox/certs/server.crt
    key: /etc/sandbox/certs/server.key
sandbox:
  default_memory_mb: 2048
  max_memory_mb: 16384
  default_cpu_cores: 2
  max_cpu_cores: 8
policy:
  engine: "opa"
  default_policy: "deny"
audit:
  storage: "elasticsearch"
  index_prefix: "sandbox-audit"
  retention_days: 90
```

### 环境变量 / Environment Variables

| 变量 / Variable | 默认值 / Default | 说明 / Description |
|------|--------|---------|
| SANDBOX_LOG_LEVEL | info | 日志级别 / Log level |
| SANDBOX_MAX_MEMORY | 8192 | 最大内存(MB) / Max memory (MB) |
| SANDBOX_MAX_CPU | 4 | 最大 CPU 核心数 / Max CPU cores |
| AUDIT_ENABLED | true | 是否启用审计 / Enable audit |
| AUDIT_STORAGE | elasticsearch | 审计存储后端 / Audit storage backend |

## API 文档 / API Documentation

### REST API

#### 沙箱管理 / Sandbox Management

```
POST   /api/v1/sandboxes          — 创建沙箱 / Create sandbox
GET    /api/v1/sandboxes          — 列出沙箱 / List sandboxes
GET    /api/v1/sandboxes/:id      — 获取详情 / Get details
DELETE /api/v1/sandboxes/:id      — 销毁沙箱 / Destroy sandbox
POST   /api/v1/sandboxes/:id/exec — 执行命令 / Execute command
```

#### 策略管理 / Policy Management

```
GET    /api/v1/policies           — 列出策略 / List policies
POST   /api/v1/policies           — 创建策略 / Create policy
PUT    /api/v1/policies/:id       — 更新策略 / Update policy
DELETE /api/v1/policies/:id       — 删除策略 / Delete policy
```

#### 审计管理 / Audit Management

```
GET    /api/v1/audit/logs         — 查询审计日志 / Query audit logs
GET    /api/v1/audit/logs/:id     — 获取日志详情 / Get log details
GET    /api/v1/audit/stats        — 审计统计 / Audit statistics
```

### gRPC API

Protobuf 定义文件位于 `proto/` 目录。生成的客户端代码支持 Go、Python、Java 和 TypeScript。Protobuf definitions are in the `proto/` directory. Generated client code supports Go, Python, Java, and TypeScript.

## 开发指南 / Development Guide

### 设置开发环境 / Setup Development Environment

```bash
git clone https://github.com/sevenliuhu/ui-tars-sandbox.git
cd ui-tars-sandbox
make dev-setup    # 安装开发工具 / Install dev tools
make test         # 运行测试 / Run tests
make lint         # 运行 lint / Run lint
make build        # 构建 / Build
```

### 项目结构 / Project Structure

```
ui-tars-sandbox/
├── cmd/              # 入口命令 / Entry point commands
├── internal/         # 内部实现 / Internal implementation
│   ├── sandbox/      # 沙箱核心 / Sandbox core
│   ├── policy/       # 策略引擎 / Policy engine
│   ├── audit/        # 审计系统 / Audit system
│   └── api/          # API 服务 / API service
├── pkg/              # 公共包 / Public packages
├── proto/            # Protobuf 定义 / Protobuf definitions
├── config/           # 配置示例 / Configuration examples
├── scripts/          # 工具脚本 / Utility scripts
├── test/             # 测试 / Tests
├── docs/             # 文档 / Documentation
└── assets/           # 静态资源 / Static assets
```

## 定价方案 / Pricing

| 版本 / Plan | 价格 / Price | 沙箱数量 / Sandboxes | 策略引擎 / Policy Engine | 审计日志 / Audit Logs | 支持 / Support |
|------|------|---------|---------|---------|------|
| 🌱 Sprout Free | **免费 / Free** | 1 | 基础 / Basic | 7天 / 7 days | 社区 / Community |
| 🔑 Key | **$9.9/月** | 5 | 标准 / Standard | 30天 / 30 days | 邮件 / Email |
| 🛡️ Shield | **$29.9/月** | 20 | 高级 / Advanced | 90天 / 90 days | 邮件+工单 / Email+Tickets |
| 🏰 Fortress | **$99.9/月** | 100 | 企业 / Enterprise | 180天 / 180 days | 优先工单 / Priority Tickets |
| 🏛️ Citadel | **$299.9/月** | 无限 / Unlimited | 自定义 / Custom | 365天 / 365 days | 专属支持 / Dedicated |

### 企业版 / Enterprise

需要定制功能或私有化部署？请联系我们获取企业版报价。Need custom features or on-premise deployment? Contact us for enterprise pricing.

### 教育/开源折扣 / Education/Open Source Discounts

- **教育机构 / Educational Institutions** — 50% 折扣 / 50% discount
- **开源项目 / Open Source Projects** — 免费 Citadel 授权 / Free Citadel license
- **非营利组织 / Non-Profit** — 可申请免费授权 / Free license available on request

## 购买流程 / Purchase Process

### 购买步骤 / Steps

1. **选择方案 / Choose a Plan** — 根据需求选择合适的定价方案 / Select the plan that fits your needs
2. **提交订单 / Submit Order** — 通过邮箱或微信提交购买需求 / Send your purchase request via email or WeChat
3. **确认付款 / Confirm Payment** — 我们提供多种支付方式 / We support multiple payment options
4. **开通服务 / Service Activation** — 确认收款后24小时内开通 / Activated within 24 hours
5. **开始使用 / Start Using** — 收到开通通知后即可开始使用 / Begin using immediately

### 支付方式 / Payment Methods

- **国际支付 / International** — 信用卡 (Visa/Mastercard)、PayPal、USDT
- **国内支付 / Domestic (China)** — 微信支付、支付宝、银行转账 / WeChat Pay, Alipay, Bank Transfer

### 退款政策 / Refund Policy

- 购买后 30 天内可无条件退款 / Unconditional refund within 30 days
- 年度订阅按比例退款 / Annual subscriptions refunded on a pro-rata basis

## 常见问题 / FAQ

### Q: 沙箱会影响宿主系统性能吗？/ Does the sandbox affect host system performance?
A: 沙箱使用资源限制 (cgroups)，不会影响宿主系统。每个沙箱有独立的 CPU、内存和磁盘配额。/ The sandbox uses resource limits (cgroups) and does not affect the host system. Each sandbox has independent CPU, memory, and disk quotas.

### Q: 支持哪些操作系统？/ Which operating systems are supported?
A: 目前支持 Linux (Ubuntu 20.04+, CentOS 8+)。macOS 和 Windows 支持正在开发中，预计 2026 Q4 发布。/ Currently supports Linux (Ubuntu 20.04+, CentOS 8+). macOS and Windows support under development, estimated Q4 2026.

### Q: 如何升级版本？/ How to upgrade?
A: Docker 用户只需 `docker pull homolabs/ui-tars-sandbox:latest` 并重启容器。二进制部署用户下载新版本替换即可。/ Docker users simply `docker pull` and restart. Binary users download the new version and replace.

### Q: 审计日志如何存储和轮转？/ How are audit logs stored and rotated?
A: 支持 Elasticsearch 和本地文件存储。日志轮转策略可配置，默认保留 90 天。/ Supports Elasticsearch and local file storage. Log rotation is configurable; default is 90 days.

### Q: 是否支持高可用部署？/ Does it support HA deployment?
A: 企业版（Fortress+）支持多节点集群部署，实现高可用和负载均衡。/ Enterprise Edition (Fortress+) supports multi-node cluster deployment for HA and load balancing.

### Q: 是否提供 API SDK？/ Do you provide API SDKs?
A: 是的，我们提供 Go、Python、Java 和 TypeScript 的 SDK。/ Yes, we provide SDKs for Go, Python, Java, and TypeScript.

### Q: 可以与其他 UI-TARS 工具集成吗？/ Can it integrate with other UI-TARS tools?
A: 是的，沙箱与 UI-TARS Desktop 原生集成，也支持任何基于 UI-TARS 的工具。/ Yes, it natively integrates with UI-TARS Desktop and supports any UI-TARS-based tool.

### Q: 免费版有什么限制？/ What are the free version limitations?
A: 免费版限制：1 个并发沙箱、基础策略模板、7 天审计日志、社区支持。/ Free plan limits: 1 concurrent sandbox, basic policy templates, 7-day audit logs, community support.

## 联系方式 / Contact

| 方式 / Method | 信息 / Info |
|------|------|
| 📧 邮箱 / Email | **homo-ai@outlook.com** |
| 💬 微信 / WeChat | **sevenliuhu** |
| 🌐 GitHub Issues | [Issues Page](https://github.com/sevenliuhu/ui-tars-sandbox/issues) |

我们随时欢迎您的咨询和反馈！We welcome your inquiries and feedback!

## 贡献指南 / Contributing

我们欢迎任何形式的贡献！请参阅 CONTRIBUTING.md 了解详细的贡献流程。We welcome contributions of all forms! Please see CONTRIBUTING.md for the detailed contribution process.

本项目采用 Contributor Covenant 行为准则。This project adheres to the Contributor Covenant Code of Conduct.

## 许可证 / License

本项目采用 **GNU Affero General Public License v3.0** 许可证。详细条款请参见 [LICENSE](LICENSE) 文件。This project is licensed under the **GNU Affero General Public License v3.0**. See the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <strong>Built with ❤️ by HOMO Labs</strong>
  <br />
  <a href="https://github.com/sevenliuhu">@sevenliuhu</a>
</p>
