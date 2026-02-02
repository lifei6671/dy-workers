---
apply: 始终
---

## 项目结构

```text
dy-workers/
├─ package.json
├─ tsconfig.json
├─ next.config.js
├─ open-next.config.ts              # OpenNext 在 Cloudflare 的适配/缓存配置（R2、tag 等）
├─ wrangler.jsonc                   # Workers 配置：routes、d1/r2 绑定、nodejs_compat
├─ .dev.vars                        # 本地开发变量（不要提交）
├─ .env.example                     # 环境变量模板（可提交）
├─ .gitignore
├─ README.md

├─ migrations/                      # D1 migrations（SQL）
│  ├─ 0001_init.sql
│  └─ 0002_add_indexes.sql

├─ scripts/                         # 运维/内容工具脚本（可选）
│  ├─ seed_local_d1.ts              # 本地灌数据
│  ├─ backfill_r2_html.ts           # 批量预热/回填 R2（可选）
│  └─ generate_sitemap.ts           # 生成/校验 sitemap（可选）

├─ public/                          # 纯静态资源（logo、robots、favicon 等）
│  ├─ favicon.ico
│  └─ images/

├─ src/
│  ├─ app/                          # Next App Router
│  │  ├─ layout.tsx
│  │  ├─ page.tsx                   # 首页（可 SSG）
│  │  ├─ sitemap.ts                 # 动态 sitemap（从 D1 拉 slug）
│  │  ├─ robots.ts                  # robots.txt
│  │  ├─ p/
│  │  │  └─ [slug]/
│  │  │     ├─ page.tsx             # 文章页（ISR：revalidate）
│  │  │     └─ loading.tsx
│  │  ├─ category/
│  │  │  └─ [slug]/page.tsx
│  │  └─ api/
│  │     └─ revalidate/route.ts     # 可选：内容更新后触发按需失效
│  │
│  ├─ components/                   # 纯 UI 组件（Header、Article、TOC…）
│  │  ├─ Header.tsx
│  │  ├─ Article.tsx
│  │  └─ ...
│  │
│  ├─ lib/
│  │  ├─ db.ts                      # D1 获取/封装（getCloudflareContext）
│  │  ├─ posts.repo.ts              # SQL 查询：getPostBySlug/listSlugs 等
│  │  ├─ cache.ts                   # 可选：R2/Cache API 封装（如果你自己做 HTML 缓存层）
│  │  ├─ seo.ts                     # canonical/OG/json-ld 生成
│  │  └─ types.ts
│  │
│  ├─ styles/
│  │  └─ globals.css
│  │
│  └─ middleware.ts                 # 可选：重写/规范化 URL、A/B、地区化等

└─ tests/                           # 可选：单测/集成测试
   ├─ unit/
   └─ e2e/
```