# Ziyu Liu 的个人主页

这是可以直接发布到 GitHub Pages 的独立静态网站。仓库根目录包含 index.html，无需安装 Node 或构建工具。

## 第一次发布

1. 登录 GitHub 账号 ziyuliu555，创建公开仓库 ziyuliu555.github.io；若已有同名仓库，先检查原有内容再决定如何合并。
2. 将本文件夹内的文件及 assets 文件夹上传到仓库根目录。根目录必须直接包含 index.html。
3. 在 Settings → Pages → Build and deployment 中选择 Deploy from a branch，分支 main，目录 /(root)，点击 Save。
4. 等待仓库 Actions 中的部署完成，再访问 https://ziyuliu555.github.io/
5. 使用浏览器无痕窗口检查网页、样式和论文链接。

保留 .nojekyll 空文件即可跳过 Jekyll 处理。如果网页上传时看不到这个隐藏文件，可以用 Add file → Create new file 创建同名空文件。

## 日常修改

- index.html：个人介绍、研究方向、论文和链接。
- styles.css：颜色、字体和排版。
- main.js：引用弹窗、主题切换与论文 BibTeX 内容。
- publications.bib：可下载的引用文件。修改论文引用时与 main.js 保持一致。
- assets/：图标及后续添加的照片、CV 等资源。

少量修改可以直接在 GitHub 网页中打开文件、点击编辑并提交。提交到 main 后，GitHub Pages 会自动更新网站。

## 在另一台电脑上修改

安装 Git，并用自己的账号通过 GitHub Desktop、SSH 或其他 GitHub 支持的方式完成身份认证。第一次下载：

```bash
git clone https://github.com/ziyuliu555/ziyuliu555.github.io.git
cd ziyuliu555.github.io
```

以后开始修改前运行 git pull，修改并预览后提交：

```bash
git add .
git commit -m "Update homepage"
git push
```

所有电脑以该 GitHub 仓库为准同步修改，避免继续维护多个独立副本。

## 本地预览

用浏览器打开 index.html，或在此目录运行：

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

随后打开 http://127.0.0.1:8080/。本地预览不要求登录任何账号。

## 网站地址元信息

index.html 的 head 区域已经配置以下网站地址。将来绑定自己的域名时，同步更新这两行：

```html
<link rel="canonical" href="https://ziyuliu555.github.io/">
<meta property="og:url" content="https://ziyuliu555.github.io/">
```

这些是供搜索引擎与分享预览使用的可选元信息，不影响正常发布及访问。

官方文档：https://docs.github.com/en/pages/quickstart
