---
name: douyin-video-puller
description: Pull public Douyin videos and structured data from a Douyin share link, copied share text, full video URL, or aweme ID. Use when Codex needs to download a Douyin video, extract share-page metadata, generate browser-signed comment requests, paginate top-level comments into structured JSON, capture keyframes, and produce a local pull report for later transcription, OCR, or content analysis.
---

# Douyin Video Puller

## Overview

Use this skill to turn a public Douyin link into local artifacts: video files, metadata, keyframes, top-level comments, comment statistics, and a Markdown report.

The reliable path is not a plain API call. Let a real browser open the desktop Douyin page so Douyin generates `msToken`, `a_bogus`, `verifyFp`, and related parameters, then replay the signed comment URL outside the browser for pagination.

## Quick Start

Run the bundled script from any workspace:

```powershell
$skillDir = "<path-to-douyin-video-puller-skill>"
node "$skillDir\scripts\pull_douyin.mjs" "<Douyin share text or URL>" --out ".\douyin-output" --max-comments 1300
```

For comment pulls, first open `https://www.douyin.com` in the desktop browser and log in. If the desktop site is closed, logged out, or blocked, video and metadata can still succeed but comments may be partial.

The script accepts:

- Full copied share text containing a `v.douyin.com` URL
- `https://www.douyin.com/video/<aweme_id>`
- `https://www.iesdouyin.com/share/video/<aweme_id>`
- A bare aweme ID

## Workflow

1. Resolve the aweme ID from the input.
2. Fetch the mobile `iesdouyin.com/share/video/<id>/` page and parse `window._ROUTER_DATA`.
3. Save `share_page_mobile.html` and `video_info.json`.
4. Download the video from the share-page `play_addr`. Also try the no-watermark `aweme/v1/play/` endpoint when a `video_id` is available.
5. Open `https://www.douyin.com/video/<id>` with a real browser, observe the signed `comment/list` request, and save `signed_comment_request.json`.
6. Replay the signed URL with browser cookies and paginate top-level comments.
7. De-duplicate comments by `cid`, save `comments_structured.json`, and write `comments_stats.json`.
8. Extract keyframes with FFmpeg when available.
9. Write `pull_report.md` and `pull_status.json`.

## Important Limits

- This supports public videos only. Private, deleted, login-only, or region-limited videos can fail.
- Direct comment requests usually return `blocked`; use the browser-signed request path.
- Page comment count is not the same as retrievable top-level comments. It can include replies, folded comments, filtered comments, or items not exposed by web pagination.
- Top-level comments are the reliable target. Reply/comment-list-reply can require separate signatures and may return empty bodies or be session-sensitive.
- If the browser opens but the comment request fails in-page with `ERR_CONNECTION_CLOSED`, still inspect the signed request. Replaying the same signed URL can succeed.
- Comment signing failures are partial success by default. Keep the video, metadata, keyframes, and diagnostics, then retry after opening/logging in to desktop Douyin.

## Environment

The script needs:

- Node.js 18+
- Microsoft Edge or Chrome installed
- Playwright package available to Node
- FFmpeg for keyframes and media probing

If Playwright is not installed in the current project, set one of these before running:

```powershell
$env:PLAYWRIGHT_PACKAGE_PATH="<project>\node_modules\playwright"
```

or:

```powershell
$env:PLAYWRIGHT_NODE_MODULES="<project>\node_modules"
```

The script also probes common local package locations and system Edge/Chrome paths.

## Output

Default output root is a local `douyin-output` style directory; each run writes into `<out>/<aweme_id>/`.

Read [references/output-schema.md](references/output-schema.md) before changing downstream analysis code that consumes the outputs.

Main files:

- `video_info.json`: normalized metadata from the share page.
- `video_try_nowm.mp4`: no-watermark endpoint attempt when available.
- `video_watermark.mp4`: share-page playback URL download.
- `comments_structured.json`: de-duplicated top-level comments with raw payloads preserved.
- `comments_stats.json`: high-level counts, keyword hits, IP label counts, and high-like comments.
- `pull_report.md`: concise human-readable summary.
- `pull_status.json`: success or partial-success status for the run.
- `comment_error.json`: written only when comment signing or pagination fails.
- `keyframe_*.jpg`: sampled frames.

## Troubleshooting

- If `iteminfo` or old APIs return `encrypt_data_miss`, ignore them and parse the share page instead.
- If the mobile share page shows zero comments but metadata has a nonzero comment count, use the desktop `douyin.com/video/<id>` browser-signed request path.
- If no signed comment request is observed, save the page screenshot/logs and report that comments could not be pulled in this environment.
- If comment signing fails, rerun the same command after opening/logging in to desktop Douyin. Do not use `--skip-comments` for the retry.
- Use `--skip-comments` only to refresh video/metadata/keyframes. It preserves an existing `comments_structured.json` when present.
- Use `--fail-on-comment-error` only when a workflow should fail hard if comments cannot be pulled.
- If pagination returns repeated hot comments, keep `cid` de-duplication enabled.
- If comments stop before the page count, report both the page count and fetched top-level count.
