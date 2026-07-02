# Chinese Creator Skills

Chinese writing, web novel, browser automation, and presentation workflow skills.

## Included Skills

| Skill | Category | Description |
|---|---|---|
| [browser-cdp](./skills/browser-cdp.md) | chinese | Use this skill when you need to control a Chrome browser via CDP (Chrome DevTools Protocol) to reuse existing login sessions. Covers: launching Chrome in debug mode, opening URLs, waiting for page load, evaluating JavaScript, taking snapshots, and extracting auth tokens. Trigger phrases: browser automation, CDP, agent-browser, 浏览器操作, 操作浏览器, Chrome CDP, 复用登录态, extract token from browser. |
| [guizang-ppt-skill](./skills/guizang-ppt.md) | chinese | 生成横向翻页网页 PPT（单 HTML 文件），含 WebGL 背景、章节幕封、数据大字报、图片网格等模板。提供两种风格：① "电子杂志 × 电子墨水"（衬线 + 流体背景 + 暖色） ② "瑞士国际主义"（无衬线 + 网格点阵 + IKB/柠檬黄/柠檬绿/安全橙高亮）。当用户需要制作分享 / 演讲 / 发布会风格的网页 PPT，或提到"杂志风 PPT"、"瑞士风 PPT"、"Swiss Style"、"horizontal swipe deck"时使用。 |
| [story-cover](./skills/story-cover.md) | chinese | 小说封面生成。根据书名、作者名自动分析题材风格，调用 GPT-Image-2 直接生成含标题和署名的专业级网文封面。触发方式：/story-cover、/封面、「帮我做个封面」「生成封面图」「做个小说封面」「封面设计」。 |
| [story-deslop](./skills/story-deslop.md) | chinese | 网文去AI味。检测并清除文本中的AI写作痕迹，让文字回归自然、非模板化。触发方式：/story-deslop、/去AI味、「去AI味」「这篇太AI了」「网文去AI味」。 |
| [story-import](./skills/story-import.md) | chinese | 逆向导入已有小说。将已写好的小说（半成品或完本）反向解析为标准项目目录结构，兼容 story-long-write / story-short-write 后续写作流程；内部复用 story-long-analyze / story-short-analyze 的拆解管道，按篇幅自动分流。触发方式：/story-import、「导入小说」「反向解析」「导入」「把我的书导进来」。 |
| [story-long-analyze](./skills/story-long-analyze.md) | chinese | 长篇网文拆文。深度拆解爆款长篇小说的黄金三章、人设架构、爽点设计、节奏控制。单一深度拆解管道：跑完黄金三章（Stage 1）后产出快速预览报告并询问是否继续全量拆解，确认后从 Stage 2 续跑逐章摘要、聚合分析、设定关系、汇总报告，全程产物落盘 拆文库/{书名}/。触发方式：/story-long-analyze、/长篇拆文、「帮我拆这本书」「拆这本书」「分析黄金三章」「深度拆解」「完整拆解」「系统拆解」或提供小说文本文件路径——全部进入同一管道。 |
| [story-long-scan](./skills/story-long-scan.md) | chinese | 长篇网文扫榜。分析起点、番茄、晋江等平台排行榜数据，提炼市场趋势与热门题材。触发方式：/story-long-scan、/长篇扫榜、「长篇什么火」「起点排行」。 |
| [story-long-write](./skills/story-long-write.md) | chinese | 长篇网文写作。从大纲到正文，辅助长篇网络小说的创作，包括世界观、人物、情节线管理。触发方式：/story-long-write、/写长篇、「帮我开书」「写大纲」「日更」「续写」「继续写」「修改第X章」「回炉」「重写第X章」。 |
| [story-review](./skills/story-review.md) | chinese | 多视角对抗式审查。full/lean 模式在已部署 reviewer agents 时并行 spawn；缺失/异常 agents 或 spawn 失败时自动降级 solo，参考文件不可读时使用内置 rubric fallback。触发方式：/story-review、/审查、「审查一下」「帮我审一下」。 |
| [story-setup](./skills/story-setup.md) | chinese | 网文写作工具集基础设施部署。将 hooks/rules/agents/CLAUDE.md/AGENTS.md 等基础设施部署到用户项目目录，支持 Claude Code / OpenCode / Codex / OpenClaw。触发方式：/story-setup、$story-setup、「准备写书」「帮我搭一下环境」「配置写作项目」。 |
| [story-short-analyze](./skills/story-short-analyze.md) | chinese | 短篇网文拆文。拆解爆款短篇小说（番茄短篇 / 故事会 / 知乎盐选 / 追妻 / 世情 / 重生 / 虐渣等通俗题材）的故事核、结构、情感线、反转设计、写作手法、共鸣层次。单一全量拆解管道：跑完 Stage 2-6 产出完整拆文报告，落盘到 拆文库/{书名}/，下游 story-short-write 同时读拆文报告 + 情节节点 + 写作手法 + 原文 + _meta.json 写下一篇。触发方式：/story-short-analyze、/短篇拆文、「拆短篇」「拆这篇短文」「短篇拆文」「精细拆解短篇」「8000 字短篇拆解」「番茄短篇拆文」「故事会拆解」「盐言故事拆解」「分析这篇短篇」——均进入同一管道。 |
| [story-short-scan](./skills/story-short-scan.md) | chinese | 短篇网文扫榜。分析知乎盐言、七猫、黑岩、点众等平台热门短篇数据，捕捉风口题材。触发方式：/story-short-scan、/短篇扫榜、「短篇什么火」「知乎故事排行」。 |
| [story-short-write](./skills/story-short-write.md) | chinese | 短篇网文写作。辅助短篇小说创作，从构思到成稿，聚焦情绪拉扯与节奏把控。触发方式：/story-short-write、/写短篇、「帮我写一篇短篇」「写个盐言故事」。 |
| [story](./skills/story.md) | chinese | 网络小说工具箱主入口。根据用户需求自动路由到对应 skill；当用户意图不明确时触发，由路由逻辑分发到具体的扫榜/拆文/写作/去AI味/封面/导入/审查 skill。触发方式：/story、$story、/网文、「我想写小说」「帮我写书」「写网文」「检查更新」「有新版本吗」。 |
| [website-generator](./skills/website-generator.md) | design | Use when the user asks to create a website, build a site, generate a |

## Install

This plugin is listed in the repo marketplace at:

```text
.agents/plugins/marketplace.json
```

Add this marketplace to Codex from the repository root, then install `chinese-creator-skills` from the Codex app.
