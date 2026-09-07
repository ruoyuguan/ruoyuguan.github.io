# 网站维护

这里是源码维护入口，不会发布成个人主页页面。网站页脚的 **Site maintenance**、摄影页的 **Manage photographs / Editing guide** 会链接到 GitHub 中的源码与本说明；修改时需使用你自己的 GitHub 登录。

## 常用入口

| 内容 | 源文件 |
| --- | --- |
| 首页与研究方向 | [_pages/about.md](_pages/about.md)、[_pages/research.md](_pages/research.md) |
| 论文 | [_publications/](_publications/) |
| 报告与海报 | [_talks/](_talks/) |
| CV | [_pages/cv.md](_pages/cv.md) |
| 动态和随笔 | [_posts/](_posts/) |
| 摄影（含未完成条目） | [_portfolio/](_portfolio/) |
| 摄影原图 | [images/portfolio/](images/portfolio/) |
| 导航与身份资料 | [_data/navigation.yml](_data/navigation.yml)、[_config.yml](_config.yml) |

## Photography

已完成的 `portfolio-1.md` 和 `portfolio-10.md` 继续公开。其余 10 个条目设置为 `published: false`；原有标题、文字和图片文件均保留，未代拟任何摄影标题或说明。原图目录不复制到发布产物；源码仓库若为公开仓库，源码本身仍可被访问，草稿机制不等于私密存储。

新摄影条目默认不发布。完成自己的标题、正文和替代文字后：

1. 设置 `published: true`，删除该条目的 `sitemap: false`。
2. 设置真实拍摄日期 `date: YYYY-MM-DD`；列表按该日期倒序排列。
3. 将原图保存在 `images/portfolio/<image>.jpg`；填写 `image`（不含扩展名）、`image_width` 和 `image_height`。
4. 用 `{% include photograph.html photo=page %}` 展示照片；组件复用你的原有标题作为 `alt`，没有自动生成描述。
5. 运行 `ruby scripts/build_images.rb` 生成 WebP 版本并检查外观。需要安装 `cwebp`（macOS：`brew install webp`）。
6. 提交正文、元数据和对应的 `images/photography/` 文件。

转换脚本只处理明确标记为已发布的照片和头像，不覆盖原图。图片生成后不应手工修改 WebP，重新运行脚本即可。

相机方向需要归一化的照片可填写 `image_rotation`（顺时针 90/180/270 度），此步骤使用 macOS 自带的 `sips`；当前 Victoria Peak 照片使用 90 度，以保持原 JPEG 在浏览器中显示的正确方向。宽高填写归一化后的尺寸。输出 WebP 不携带原始 EXIF 信息。

### 本地查看未完成条目

```sh
bundle install
bundle exec ruby scripts/preview_drafts.rb
```

打开 <http://127.0.0.1:4001/photography-drafts/>。它会显示所有未完成条目及源码编辑链接；本地摄影页也会出现草稿预览入口。该命令临时启用原图与未发布内容、关闭分析脚本，输出到 `_site-preview/`。停止服务按 Ctrl+C。不要把该预览目录用于部署。

## 论文

参考现有文件维护结构化字段：`authors`、`status`、`venue`、`date`、`doi`、`arxiv_id`、`volume`、`article_number`、`summary`、`description` 和资源链接。

- `status: preprint` 与 `status: published` 分开；只记录已确认状态。
- 本人的作者项标记 `self: true`；卡片会自动强调姓名。
- `summary` 是列表中的短介绍，完整摘要放在正文中。
- `selected: true` 用于首页代表作；首页最多展示最新 3 篇。
- 使用稳定的短 `permalink`。更改已经公开的 URL 时，把旧地址加入 `redirect_from`，不要移除现有重定向。
- 资源支持 arXiv、DOI、ADS、PDF、BibTeX、code、data，只有实际存在的链接才填写。
- 论文页面默认启用公式；其它含公式页面需手动加 `math: true`。
- 期刊在线日期与卷期日期不同，分别用已确认字段/文字说明，不推断未知日期。

## 报告与地图

在 `_talks/` 填写 `type`、`venue`、`location`、`date`、`latitude`、`longitude`。目前坐标为城市级，`map_precision: city`；没有确认的坐标时设置 `map: false`。

```sh
python3 talkmap.py
python3 talkmap.py --check
```

这会从源文件生成 `talkmap/org-locations.js`，不联网、不地理编码。旧 notebook 保留供参考；日常维护使用该脚本。CI 只检查，不会自动提交文件。

## 动态与 CV

科研动态使用 `news: true`，首页只显示最近 3 条；个人随笔保留在 News & Notes 中。用 `excerpt` 和 `description` 控制列表和搜索摘要。

CV 的源文件为 `_pages/cv.md`。更新后同时维护 `last_updated`，在本地启动站点，再运行：

```sh
npm ci
node scripts/export_cv.mjs http://127.0.0.1:4000
```

需要本机 Google Chrome。输出为 `files/ruoyu-guan-cv.pdf`；请检查分页、文字和链接，再提交此 PDF。导出读取 CV 网页，避免维护第二份履历内容。

## 本地构建与检查

使用 Ruby 3.3 或更高的兼容版本、Node.js 20+、Python 3.9+。`Gemfile.lock` 和 `package-lock.json` 应随依赖更新一起提交。

```sh
bundle install
npm ci
npm run build:js
python3 talkmap.py --check
JEKYLL_ENV=production bundle exec jekyll build
python3 scripts/validate_site.py _site
bundle exec jekyll serve --host 127.0.0.1
```

浏览器检查（需要本机 Google Chrome，页面截图保存到忽略的 `output/browser-check/`）：

```sh
node scripts/check_browser.mjs http://127.0.0.1:4000
```

也可使用现有 Docker：`docker compose up --build`。容器使用 Ruby 3.3 和锁定依赖。

## 发布与隐私

向 `master` 推送后由现有 GitHub Pages 设置发布。提交前运行上述生产检查；不要以 `--unpublished` 或草稿预览配置发布。

页脚 Privacy 链接提供可选 GA4 分析开关，默认关闭。主题和分析选择保存在访客自己的浏览器中。Google Search Console 验证文件 `google0e0d4fbd93fdf402.html` 保留，不要删除。

`markdown_generator/`、原始照片、旧地图 notebook、维护脚本及未完成摄影页面不进入生产站点。生成器 TSV 只保留表头；维护入口仍在仓库中。
