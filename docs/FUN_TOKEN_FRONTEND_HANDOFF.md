# FUN Token 前端界面交接启动文档

本文档用于把当前 FUN Token 首页前端交给开发继续维护。前端工程位于 `web/default/`，使用 React 19 + TypeScript + Rsbuild + Tailwind CSS。

## 1. 环境依赖

必需：

- Git
- Bun，建议使用最新稳定版
- Node.js 20+，部分工具链会调用 Node

联调后端时还需要：

- Docker / Docker Compose，推荐用于本地启动后端、PostgreSQL、Redis
- 或 Go 1.22+，用于直接本机启动后端

安装 Bun：

```bash
curl -fsSL https://bun.sh/install | bash
```

确认版本：

```bash
bun --version
node --version
```

## 2. 前端依赖

进入前端目录安装依赖：

```bash
cd web/default
bun install
```

本次 FUN Token 首页新增或重点使用的依赖已经写入 `web/default/package.json` 和 `web/default/bun.lock`，开发不需要手动单独安装：

- `gsap`：React Bits `TextType` 打字动画光标闪烁
- `three`、`@react-three/fiber`、`@types/three`：3D/视觉素材依赖
- `lucide-react`、`@hugeicons/*`、`@lobehub/icons`：图标
- `motion`：页面动效
- `react-i18next`、`i18next`：多语言文本
- `@tanstack/react-router`、`@tanstack/react-query`：路由和接口请求

## 3. 启动方式 A：只看前端首页

如果只检查首页视觉，不联调接口，可以直接启动前端：

```bash
cd web/default
bun run dev -- --host 0.0.0.0 --port 3001
```

访问：

```text
http://localhost:3001
```

说明：不启动后端时，首页静态内容可以查看；登录、控制台、接口请求等依赖后端的功能会不可用。

## 4. 启动方式 B：前后端联调（推荐）

在仓库根目录启动后端依赖和后端服务：

```bash
docker compose -f docker-compose.dev.yml up -d --build
```

后端默认监听：

```text
http://localhost:3000
```

再启动前端，并把 API 代理指向后端：

```bash
cd web/default
VITE_REACT_APP_SERVER_URL=http://localhost:3000 bun run dev -- --host 0.0.0.0 --port 3001
```

访问前端：

```text
http://localhost:3001
```

`web/default/rsbuild.config.ts` 会把以下路径代理到 `VITE_REACT_APP_SERVER_URL`：

- `/api`
- `/mj`
- `/pg`

停止后端：

```bash
docker compose -f docker-compose.dev.yml down
```

如果需要清空本地开发数据库：

```bash
docker compose -f docker-compose.dev.yml down -v
```

## 5. 常用开发命令

所有命令都在 `web/default/` 目录执行：

```bash
bun run dev          # 启动开发服务器
bun run build        # 构建生产包，输出到 web/default/dist
bun run typecheck    # TypeScript 类型检查
bun run lint         # ESLint 检查
bun run format       # Prettier 格式化
bun run i18n:sync    # 同步 i18n 文案
```

交接前建议至少执行：

```bash
bun run lint
bun run build
```

如果只检查本次首页改动范围，可以执行：

```bash
npx eslint src/features/home src/components/text-type.tsx src/components/layout/components/footer.tsx src/components/layout/components/public-header.tsx
```

## 6. FUN Token 首页相关文件

首页入口：

- `web/default/src/features/home/index.tsx`
- `web/default/src/features/home/components/index.ts`

主要页面区块：

- `web/default/src/features/home/components/sections/hero.tsx`
- `web/default/src/features/home/components/sections/stats.tsx`
- `web/default/src/features/home/components/sections/how-it-works.tsx`
- `web/default/src/features/home/components/sections/faq.tsx`
- `web/default/src/features/home/components/sections/cta.tsx`

新增/复用组件：

- `web/default/src/components/text-type.tsx`
- `web/default/src/components/text-type.css`
- `web/default/src/features/home/components/click-spark.tsx`
- `web/default/src/features/home/components/count-up.tsx`
- `web/default/src/features/home/components/logo-loop.tsx`
- `web/default/src/features/home/components/logo-loop.css`
- `web/default/src/features/home/components/provider-logo.tsx`
- `web/default/src/features/home/components/home-icon.tsx`

布局和公共区域：

- `web/default/src/components/layout/components/public-header.tsx`
- `web/default/src/components/layout/components/footer.tsx`
- `web/default/src/styles/index.css`

图片资源：

- `web/default/public/images/home/funtoken-mark.svg`
- `web/default/public/images/home/funtoken-mark-3d.svg`
- `web/default/public/images/home/funtoken-qq-group.jpg`
- `web/default/public/images/home/funapi-pedestal-stage.svg`
- `web/default/public/images/home/funapi-hero-visual.png`

## 7. 当前页面行为说明

- 首页品牌显示为 `FUN Token`。
- Hero 标题使用 `TextType` 打字效果。
- “阅读开发文档”跳转到飞书文档：`https://my.feishu.cn/wiki/ObyEw0lvMi76f2kK558coOHynzP`。
- “快速接入”区域包含 3 步接入卡片、代码框，代码框默认展示 `bash`，可切换 `Python`。
- 页脚 `QQ群: 1103444778` 点击后弹出 QQ 群二维码。
- FAQ 文案已调整为当前业务口径：不是传统中转站，不展示 AWS/GCP 作为当前上游。

## 8. 常见问题

### 端口冲突

后端默认使用 `3000`，前端开发服务器建议使用 `3001` 或 `3002`：

```bash
bun run dev -- --port 3001
```

### 前端接口请求失败

检查 `VITE_REACT_APP_SERVER_URL` 是否指向正在运行的后端：

```bash
VITE_REACT_APP_SERVER_URL=http://localhost:3000 bun run dev -- --port 3001
```

### 依赖异常

优先重新安装：

```bash
cd web/default
rm -rf node_modules
bun install
```

### 构建或类型检查失败

先确认依赖和锁文件一致：

```bash
cd web/default
bun install
bun run typecheck
bun run build
```

如果遇到类似 `z.function(...).returns is not a function`、`@tanstack/router-generator` 相关错误，优先确认是否没有使用 `bun install`，或是否通过 `npx rsbuild` 临时解析了另一套依赖。处理方式：

```bash
cd web/default
rm -rf node_modules
bun install
bun run build
```

如果只修改首页视觉，至少运行首页相关 lint 命令，避免把全站历史问题和当前视觉改动混在一起排查。

## 9. 交接给开发的建议流程

```bash
git clone https://github.com/tangchunwu/FUN-Token.git
cd FUN-Token
docker compose -f docker-compose.dev.yml up -d --build
cd web/default
bun install
VITE_REACT_APP_SERVER_URL=http://localhost:3000 bun run dev -- --host 0.0.0.0 --port 3001
```

打开：

```text
http://localhost:3001
```
