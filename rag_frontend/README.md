# RAG 知识库问答前端（rag_frontend）

React + Vite + TypeScript + Ant Design 的前端 Mock，实现 RAG 知识库问答系统 15 个核心页面（角色隔离、功能聚合、轻量操作、可视化优先）。

## 快速开始

```bash
npm install
npm run dev      # 本地开发，默认 5173
npm run build    # 产物在 dist
npm run lint     # 基础 eslint 校验
```

## 技术栈
- React 18 + TypeScript + Vite 5
- Ant Design 5（组件库、布局、表单、Table、Tabs、Modal 等）
- React Router 6（路由与角色守卫）
- Mock 数据：`src/mock/data.ts`

## 目录
- `src/App.tsx`：路由与角色守卫
- `src/components/`：LayoutShell、RoleBadge、MockChart
- `src/pages/common/`：登录、个人中心
- `src/pages/super/`：超级管理员 5 页
- `src/pages/tenant/`：租户管理员 5 页
- `src/pages/maintainer/`：知识库维护 2 页
- `src/pages/user/`：内部用户问答页
- `src/styles/global.css`：基础样式

## Mock 登录逻辑（无后端）
- 登录页 `src/pages/common/Login.tsx`：输入账号/密码（任意非空），选择角色后点击“登录”直接放行。
- 角色决定默认首页：
  - 超级管理员：`/super/dashboard`
  - 租户管理员：`/tenant/dashboard`
  - 知识库维护员：`/maintainer/content`
  - 内部用户：`/chat`
- 登录后可在右上角“切换角色”下拉实时切换视图（同样基于前端 Mock）。

## 页面覆盖
1) 通用：登录、个人中心  
2) 超级管理员：仪表盘、租户管理、系统全局配置、日志审计、数据备份恢复  
3) 租户管理员：仪表盘、用户管理、知识库管理、运营统计、问答日志  
4) 知识库维护员：内容管理、知识库优化  
5) 内部普通用户：智能问答（会话 + 检索三栏布局）

## 注意
- 所有数据与操作都是前端 Mock；未调用真实 API。
- 可在 `src/mock/data.ts` 调整展示数据。***
