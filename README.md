# 熙载咨询（北京）有限公司官网

熙载咨询（北京）有限公司静态官网。定位为县域产业与中小企业发展服务机构，面向政府平台、协会、科研院所、国企央企上下游和中小企业客户。

## 技术栈

- React
- Vite
- CSS 响应式设计
- GitHub Pages / Vercel 静态部署

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建产物输出到 `dist/`。GitHub Actions 和 Vercel 均应发布该目录，不再直接发布仓库根目录。

## 内容维护

核心文案集中在：

- `src/data/siteData.js`
- `src/App.jsx`

视觉样式集中在：

- `src/styles.css`

## 合规说明

产业金融内容仅表述为咨询、资源组织和方案协同服务。网站明确不设资金池、不经手客户资金、不提供担保、不承诺融资结果，不替代持牌机构职责。
