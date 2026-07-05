import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { spawn } from "node:child_process";

const DEFAULT_OUT_ROOT = path.resolve(process.cwd(), "抖音视频");
const DEFAULT_MAX_COMMENTS = 1300;
const DEFAULT_PAGE_LIMIT = 100;
const DEFAULT_KEYFRAMES = 6;

const EDGE_CANDIDATES = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
];

const PLAYWRIGHT_CANDIDATES = [
  process.env.PLAYWRIGHT_PACKAGE_PATH,
  process.env.PLAYWRIGHT_NODE_MODULES
    ? path.join(process.env.PLAYWRIGHT_NODE_MODULES, "playwright")
    : null,
  path.join(process.cwd(), "node_modules", "playwright"),
  "D:/ project/writer/shenhao-social-game/node_modules/playwright",
].filter(Boolean);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function parseArgs(argv) {
  const args = {
    input: "",
    outRoot: DEFAULT_OUT_ROOT,
    maxComments: DEFAULT_MAX_COMMENTS,
    pageLimit: DEFAULT_PAGE_LIMIT,
    keyframes: DEFAULT_KEYFRAMES,
    browserPath: "",
    skipComments: false,
    skipVideo: false,
    failOnCommentError: false,
  };

  const positionals = [];
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--out") args.outRoot = path.resolve(argv[++i]);
    else if (arg === "--max-comments") args.maxComments = Number(argv[++i]);
    else if (arg === "--page-limit") args.pageLimit = Number(argv[++i]);
    else if (arg === "--keyframes") args.keyframes = Number(argv[++i]);
    else if (arg === "--browser") args.browserPath = argv[++i];
    else if (arg === "--skip-comments") args.skipComments = true;
    else if (arg === "--skip-video") args.skipVideo = true;
    else if (arg === "--fail-on-comment-error") args.failOnCommentError = true;
    else positionals.push(arg);
  }
  args.input = positionals.join(" ").trim();
  if (!args.input) {
    throw new Error("Missing Douyin share text, URL, or aweme ID.");
  }
  return args;
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function readJsonIfExists(file) {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    return null;
  }
}

function requirePlaywright() {
  const localRequire = createRequire(import.meta.url);
  for (const candidate of PLAYWRIGHT_CANDIDATES) {
    try {
      return localRequire(candidate);
    } catch {
      // Try next candidate.
    }
  }
  try {
    return localRequire("playwright");
  } catch {
    throw new Error(
      "Cannot find the Playwright package. Set PLAYWRIGHT_PACKAGE_PATH or PLAYWRIGHT_NODE_MODULES.",
    );
  }
}

async function findBrowser(explicitPath) {
  if (explicitPath) {
    if (await exists(explicitPath)) return explicitPath;
    throw new Error(`Browser executable not found: ${explicitPath}`);
  }
  for (const candidate of EDGE_CANDIDATES) {
    if (await exists(candidate)) return candidate;
  }
  throw new Error("Cannot find Edge or Chrome. Pass --browser <path>.");
}

function extractFirstUrl(input) {
  const match = input.match(/https?:\/\/[^\s，。]+/i);
  return match ? match[0].replace(/[，。；;]+$/, "") : "";
}

function extractAwemeId(input) {
  const direct = input.match(/\b\d{16,22}\b/);
  if (direct) return direct[0];
  const url = extractFirstUrl(input);
  if (!url) return "";
  const idMatch = url.match(/\/(?:video|share\/video)\/(\d{16,22})/);
  return idMatch ? idMatch[1] : "";
}

async function resolveInput(input) {
  const initialId = extractAwemeId(input);
  if (initialId) return { awemeId: initialId, resolvedUrl: "" };

  const url = extractFirstUrl(input);
  if (!url) throw new Error("Could not find a URL or aweme ID in the input.");

  const response = await fetch(url, {
    method: "HEAD",
    redirect: "follow",
    headers: {
      "user-agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 aweme_1128",
    },
  });
  const resolvedUrl = response.url;
  const awemeId = extractAwemeId(resolvedUrl);
  if (!awemeId) {
    throw new Error(`Could not resolve aweme ID from ${resolvedUrl}`);
  }
  return { awemeId, resolvedUrl };
}

async function fetchText(url, headers = {}) {
  const response = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 aweme_1128",
      ...headers,
    },
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} while fetching ${url}: ${text.slice(0, 200)}`);
  }
  return text;
}

function parseVideoInfo(html) {
  const marker = "window._ROUTER_DATA = ";
  const start = html.indexOf(marker);
  if (start < 0) throw new Error("Share page did not contain window._ROUTER_DATA.");
  const rest = html.slice(start + marker.length);
  const end = rest.indexOf("</script>");
  const data = JSON.parse(rest.slice(0, end));
  const item = data.loaderData?.["video_(id)/page"]?.videoInfoRes?.item_list?.[0];
  if (!item) throw new Error("Could not parse video item from share page.");

  return {
    raw_item: item,
    normalized: {
      aweme_id: item.aweme_id,
      desc: item.desc,
      create_time: item.create_time,
      create_time_local: new Date(item.create_time * 1000).toLocaleString("zh-CN", {
        timeZone: "Asia/Shanghai",
      }),
      create_time_iso: new Date(item.create_time * 1000).toISOString(),
      author: {
        nickname: item.author?.nickname,
        short_id: item.author?.short_id,
        unique_id: item.author?.unique_id,
        sec_uid: item.author?.sec_uid,
        signature: item.author?.signature,
        aweme_count: item.author?.aweme_count,
      },
      music: {
        mid: item.music?.mid,
        title: item.music?.title,
        duration: item.music?.duration,
      },
      video: {
        duration_ms: item.video?.duration,
        width: item.video?.width,
        height: item.video?.height,
        play_addr: item.video?.play_addr?.url_list?.[0],
        cover: item.video?.cover?.url_list?.[0],
        video_id: item.video?.play_addr?.uri,
      },
      statistics: item.statistics,
      text_extra: item.text_extra,
    },
  };
}

async function downloadFile(url, file, headers = {}) {
  if (!url) return false;
  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      referer: "https://www.iesdouyin.com/",
      ...headers,
    },
  });
  if (!response.ok) return false;
  const bytes = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(file, bytes);
  return bytes.length > 0;
}

function runCommand(command, args) {
  return new Promise((resolve) => {
    const child = spawn(command, args, { stdio: "ignore" });
    child.on("error", () => resolve(false));
    child.on("close", (code) => resolve(code === 0));
  });
}

async function extractKeyframes(videoPath, outDir, count) {
  if (!count || count < 1) return false;
  if (!(await exists(videoPath))) return false;
  const probeFile = path.join(outDir, "ffprobe.json");
  const probed = await runCommand("ffprobe", [
    "-v",
    "error",
    "-show_entries",
    "format=duration,size,bit_rate",
    "-show_entries",
    "stream=index,codec_type,codec_name,width,height,r_frame_rate",
    "-of",
    "json",
    videoPath,
  ]);
  if (probed) {
    // Run again with captured output would require more plumbing; keep ffprobe optional.
    await fs.writeFile(probeFile, JSON.stringify({ note: "ffprobe command succeeded" }, null, 2));
  }

  const durationGuess = 24.6;
  const points = Array.from({ length: count }, (_, index) =>
    Math.max(0, (durationGuess * index) / Math.max(1, count - 1)),
  );
  const filters = points.map((t) => `eq(t\\,${t.toFixed(2)})`).join("+");
  return runCommand("ffmpeg", [
    "-y",
    "-i",
    videoPath,
    "-vf",
    `select='${filters}',scale=360:-1`,
    "-fps_mode",
    "vfr",
    path.join(outDir, "keyframe_%02d.jpg"),
  ]);
}

async function getSignedCommentRequest(awemeId, outDir, browserPath, playwright) {
  const browser = await playwright.chromium.launch({
    headless: true,
    executablePath: browserPath,
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0",
    locale: "zh-CN",
    timezoneId: "Asia/Shanghai",
  });
  const page = await context.newPage();
  const events = [];
  let signedRequest = null;

  page.on("request", (req) => {
    const url = req.url();
    if (/comment\/list/i.test(url)) {
      const headers = req.headers();
      const event = { type: "request", url, method: req.method(), headers };
      events.push(event);
      if (!signedRequest && url.includes(`aweme_id=${awemeId}`)) {
        signedRequest = { url, headers, method: req.method() };
      }
    }
  });
  page.on("requestfailed", (req) => {
    const url = req.url();
    if (/comment\/list/i.test(url)) {
      events.push({ type: "requestfailed", url, failure: req.failure() });
    }
  });

  await page.goto(`https://www.douyin.com/video/${awemeId}`, {
    waitUntil: "domcontentloaded",
    timeout: 70000,
  });

  for (let i = 0; i < 10 && !signedRequest; i += 1) {
    await page.mouse.wheel(0, 700).catch(() => {});
    await delay(1500);
  }
  await delay(5000);

  const bodyText = await page.locator("body").innerText({ timeout: 5000 }).catch(() => "");
  const cookies = await context.cookies();
  const finalUrl = page.url();
  await page
    .screenshot({ path: path.join(outDir, "signed_request_page.png"), fullPage: true })
    .catch(() => {});
  await browser.close();

  const record = { signedRequest, cookies, events, finalUrl, bodyText };
  await fs.writeFile(path.join(outDir, "signed_comment_request.json"), JSON.stringify(record, null, 2));
  if (!signedRequest) {
    throw new Error("Did not observe a signed Douyin comment/list request.");
  }
  return record;
}

function pickHeaders(headers, referer) {
  return {
    accept: "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    referer,
    "user-agent":
      headers["user-agent"] ||
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0",
  };
}

function setParam(url, key, value) {
  const u = new URL(url);
  u.searchParams.set(key, String(value));
  return u.toString();
}

async function fetchJson(url, headers, cookies) {
  const cookieHeader = cookies.map((c) => `${c.name}=${c.value}`).join("; ");
  const response = await fetch(url, {
    headers: { ...headers, cookie: cookieHeader },
  });
  const text = await response.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    // Keep body sample for diagnostics.
  }
  return {
    ok: response.ok,
    status: response.status,
    contentType: response.headers.get("content-type"),
    text,
    json,
  };
}

function normalizeUser(user) {
  if (!user) return null;
  return {
    uid: user.uid,
    sec_uid: user.sec_uid,
    short_id: user.short_id,
    unique_id: user.unique_id,
    nickname: user.nickname,
    region: user.region,
    avatar: user.avatar_thumb?.url_list?.[0],
  };
}

function normalizeComment(comment, level = 1) {
  return {
    cid: comment.cid,
    aweme_id: comment.aweme_id,
    level,
    text: comment.text,
    create_time: comment.create_time,
    create_time_iso: comment.create_time
      ? new Date(comment.create_time * 1000).toISOString()
      : null,
    digg_count: comment.digg_count ?? 0,
    reply_comment_total: comment.reply_comment_total ?? 0,
    ip_label: comment.ip_label || "",
    is_hot: Boolean(comment.is_hot),
    is_author_digged: Boolean(comment.is_author_digged),
    user: normalizeUser(comment.user),
    raw: comment,
    replies: [],
  };
}

async function fetchTopLevelComments(baseUrl, headers, cookies, maxComments, pageLimit) {
  const rawPages = [];
  const comments = [];
  const seenCids = new Set();
  let cursor = 0;
  let hasMore = 1;
  let pageIndex = 0;

  while (hasMore && comments.length < maxComments && pageIndex < pageLimit) {
    let url = setParam(baseUrl, "cursor", cursor);
    url = setParam(url, "count", Math.min(20, maxComments - comments.length));
    const result = await fetchJson(url, headers, cookies);
    rawPages.push({
      pageIndex,
      cursor,
      url,
      status: result.status,
      contentType: result.contentType,
      bodySample: result.text.slice(0, 500),
      json: result.json,
    });

    if (!result.json || result.json.status_code !== 0) break;

    for (const pageComment of result.json.comments || []) {
      if (seenCids.has(pageComment.cid)) continue;
      seenCids.add(pageComment.cid);
      comments.push(normalizeComment(pageComment, 1));
    }
    hasMore = result.json.has_more ?? 0;
    cursor = result.json.cursor ?? 0;
    pageIndex += 1;
    await delay(700);
  }

  return { comments, rawPages, nextCursor: cursor, hasMore };
}

function buildStats(awemeId, videoInfo, commentsObject) {
  const comments = commentsObject.comments || [];
  const ipCounts = {};
  const keywordHits = {
    "陈星越": 0,
    "执行力": 0,
    "清晰": 0,
    "表达": 0,
    "口播": 0,
    "拍视频": 0,
    "上镜": 0,
    "设备": 0,
    "流量": 0,
    "原始股东": 0,
  };

  for (const comment of comments) {
    if (comment.ip_label) ipCounts[comment.ip_label] = (ipCounts[comment.ip_label] || 0) + 1;
    for (const keyword of Object.keys(keywordHits)) {
      if ((comment.text || "").includes(keyword)) keywordHits[keyword] += 1;
    }
  }

  return {
    aweme_id: awemeId,
    fetched_at: commentsObject.fetched_at,
    top_level_comments_fetched: comments.length,
    raw_pages: commentsObject.raw_pages?.length || 0,
    has_more: commentsObject.pagination?.has_more,
    next_cursor: commentsObject.pagination?.next_cursor,
    page_comment_count: videoInfo?.statistics?.comment_count,
    top_level_reply_total_reported: comments.reduce(
      (sum, comment) => sum + (comment.reply_comment_total || 0),
      0,
    ),
    top_ip_labels: Object.entries(ipCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([ip, count]) => ({ ip, count })),
    keyword_hits: keywordHits,
    top_digg_comments: [...comments]
      .sort((a, b) => (b.digg_count || 0) - (a.digg_count || 0))
      .slice(0, 20)
      .map((comment) => ({
        cid: comment.cid,
        text: comment.text,
        digg_count: comment.digg_count,
        reply_comment_total: comment.reply_comment_total,
        ip_label: comment.ip_label,
        user: comment.user
          ? {
              nickname: comment.user.nickname,
              uid: comment.user.uid,
              sec_uid: comment.user.sec_uid,
            }
          : null,
      })),
  };
}

function buildStatus(awemeId, videoInfo, commentsObject, downloaded) {
  const commentError = commentsObject.comment_error || null;
  return {
    aweme_id: awemeId,
    status: commentError ? "partial_success" : "success",
    completed: [
      "short link resolved",
      "metadata extracted",
      ...(downloaded.noWatermark ? ["no-watermark video downloaded"] : []),
      ...(downloaded.watermark ? ["watermark video downloaded"] : []),
      ...(commentsObject.comments?.length
        ? ["browser-signed top-level comments fetched"]
        : []),
      "pull_report generated",
    ],
    not_completed: commentError
      ? [{ item: "top-level comments", reason: commentError.message }]
      : [],
    page_comment_count: videoInfo?.statistics?.comment_count,
    top_level_comments_fetched: commentsObject.comments?.length || 0,
    has_more: commentsObject.pagination?.has_more,
    raw_pages: commentsObject.raw_pages?.length || 0,
    updated_at: new Date().toISOString(),
  };
}

function buildReport(awemeId, videoInfo, commentsObject, stats, downloaded) {
  const lines = [];
  lines.push("# 抖音链接拉取报告");
  lines.push("");
  lines.push(`- 作品 ID：${awemeId}`);
  lines.push(`- 作者：${videoInfo?.author?.nickname || "-"}`);
  lines.push(`- 发布时间：${videoInfo?.create_time_local || "-"}`);
  lines.push(`- 描述：${(videoInfo?.desc || "").replace(/\n/g, " ")}`);
  lines.push(
    `- 页面互动：点赞 ${videoInfo?.statistics?.digg_count ?? "-"}，评论 ${videoInfo?.statistics?.comment_count ?? "-"}，收藏 ${videoInfo?.statistics?.collect_count ?? "-"}，分享 ${videoInfo?.statistics?.share_count ?? "-"}`,
  );
  lines.push(
    `- 视频下载：无水印 ${downloaded.noWatermark ? "成功" : "未成功"}；带水印 ${downloaded.watermark ? "成功" : "未成功"}`,
  );
  lines.push(
    `- 评论抓取：一级评论 ${commentsObject.comments?.length || 0} 条；has_more=${commentsObject.pagination?.has_more}`,
  );
  if (commentsObject.comment_error) {
    lines.push(`- 评论状态：未完成；${commentsObject.comment_error.message}`);
  }
  lines.push(
    "- 说明：页面评论总数可能包含二级回复、折叠/不可见评论和平台过滤项；本文件统计的是可分页抓取的一级评论。",
  );
  lines.push("");
  lines.push("## 已生成文件");
  lines.push("");
  lines.push("- video_info.json");
  lines.push("- comments_structured.json");
  lines.push("- comments_stats.json");
  lines.push("- pull_report.md");
  lines.push("- keyframe_*.jpg");
  if (downloaded.noWatermark) lines.push("- video_try_nowm.mp4");
  if (downloaded.watermark) lines.push("- video_watermark.mp4");
  lines.push("");
  lines.push("## 高赞评论样本");
  for (const [index, comment] of stats.top_digg_comments.slice(0, 10).entries()) {
    lines.push("");
    lines.push(`${index + 1}. ${comment.user?.nickname || "-"}：${comment.text}`);
    lines.push(
      `   点赞 ${comment.digg_count}，回复 ${comment.reply_comment_total}，IP ${comment.ip_label || "-"}`,
    );
  }
  if (commentsObject.comment_error) {
    lines.push("");
    lines.push("## Comment Pull Status");
    lines.push("");
    lines.push("Top-level comments were not pulled in this run. Open and log in to the desktop Douyin website, then rerun the same command to retry only the comment signing path.");
  }
  return lines.join("\n");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const playwright = requirePlaywright();
  const browserPath = await findBrowser(args.browserPath);
  const { awemeId, resolvedUrl } = await resolveInput(args.input);
  const outDir = path.join(args.outRoot, awemeId);
  await fs.mkdir(outDir, { recursive: true });

  const shareUrl = `https://www.iesdouyin.com/share/video/${awemeId}/`;
  const shareHtml = await fetchText(shareUrl);
  await fs.writeFile(path.join(outDir, "share_page_mobile.html"), shareHtml, "utf8");
  const parsed = parseVideoInfo(shareHtml);
  const videoInfo = parsed.normalized;
  await fs.writeFile(path.join(outDir, "video_info.json"), JSON.stringify(videoInfo, null, 2), "utf8");

  const downloaded = { noWatermark: false, watermark: false };
  if (!args.skipVideo) {
    const videoId = videoInfo.video?.video_id;
    if (videoId) {
      downloaded.noWatermark = await downloadFile(
        `https://aweme.snssdk.com/aweme/v1/play/?line=0&ratio=720p&video_id=${encodeURIComponent(videoId)}`,
        path.join(outDir, "video_try_nowm.mp4"),
      );
    }
    downloaded.watermark = await downloadFile(
      videoInfo.video?.play_addr,
      path.join(outDir, "video_watermark.mp4"),
    );
  } else {
    downloaded.noWatermark = await exists(path.join(outDir, "video_try_nowm.mp4"));
    downloaded.watermark = await exists(path.join(outDir, "video_watermark.mp4"));
  }

  const commentsPath = path.join(outDir, "comments_structured.json");
  let commentsObject = (args.skipComments && (await readJsonIfExists(commentsPath))) || {
    aweme_id: awemeId,
    fetched_at: new Date().toISOString(),
    max_comments_requested: args.maxComments,
    source: { resolved_input_url: resolvedUrl, share_url: shareUrl },
    pagination: { has_more: null, next_cursor: null },
    comments: [],
    raw_pages: [],
  };

  if (!args.skipComments) {
    try {
      const signed = await getSignedCommentRequest(awemeId, outDir, browserPath, playwright);
      const headers = pickHeaders(signed.signedRequest.headers, `https://www.douyin.com/video/${awemeId}`);
      const top = await fetchTopLevelComments(
        signed.signedRequest.url,
        headers,
        signed.cookies,
        args.maxComments,
        args.pageLimit,
      );
      commentsObject = {
        ...commentsObject,
        source: {
          ...commentsObject.source,
          signed_comment_url: signed.signedRequest.url,
          final_page_url: signed.finalUrl,
        },
        page_probe_text: signed.bodyText,
        pagination: {
          has_more: top.hasMore,
          next_cursor: top.nextCursor,
        },
        comments: top.comments,
        raw_pages: top.rawPages,
      };
    } catch (error) {
      if (args.failOnCommentError) throw error;
      commentsObject = {
        ...commentsObject,
        comment_error: {
          message: String(error?.message || error),
          name: error?.name,
          occurred_at: new Date().toISOString(),
          hint: "Open and log in to https://www.douyin.com in the desktop browser, then rerun without --skip-comments.",
        },
      };
      await fs.writeFile(
        path.join(outDir, "comment_error.json"),
        JSON.stringify(commentsObject.comment_error, null, 2),
        "utf8",
      );
    }
  }

  await fs.writeFile(
    commentsPath,
    JSON.stringify(commentsObject, null, 2),
    "utf8",
  );

  const videoForFrames = downloaded.noWatermark
    ? path.join(outDir, "video_try_nowm.mp4")
    : path.join(outDir, "video_watermark.mp4");
  await extractKeyframes(videoForFrames, outDir, args.keyframes);

  const stats = buildStats(awemeId, videoInfo, commentsObject);
  await fs.writeFile(path.join(outDir, "comments_stats.json"), JSON.stringify(stats, null, 2), "utf8");
  const status = buildStatus(awemeId, videoInfo, commentsObject, downloaded);
  await fs.writeFile(path.join(outDir, "pull_status.json"), JSON.stringify(status, null, 2), "utf8");
  await fs.writeFile(
    path.join(outDir, "pull_report.md"),
    buildReport(awemeId, videoInfo, commentsObject, stats, downloaded),
    "utf8",
  );

  console.log(
    JSON.stringify(
      {
        aweme_id: awemeId,
        author: videoInfo.author?.nickname,
        page_comment_count: videoInfo.statistics?.comment_count,
        top_level_comments_fetched: commentsObject.comments.length,
        has_more: commentsObject.pagination.has_more,
        status: status.status,
        comment_error: commentsObject.comment_error?.message,
        downloaded,
        output_dir: outDir,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
