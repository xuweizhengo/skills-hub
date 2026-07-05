# Output Schema

## `video_info.json`

Normalized metadata parsed from `window._ROUTER_DATA` on the mobile share page.

Key fields:

- `aweme_id`
- `desc`
- `create_time`
- `create_time_local`
- `author.nickname`
- `author.short_id`
- `author.unique_id`
- `author.sec_uid`
- `music.mid`
- `music.title`
- `video.duration_ms`
- `video.width`
- `video.height`
- `video.play_addr`
- `video.cover`
- `statistics.comment_count`
- `statistics.digg_count`
- `statistics.collect_count`
- `statistics.share_count`

## `comments_structured.json`

Top-level comments, de-duplicated by `cid`.

Top-level fields:

- `aweme_id`
- `fetched_at`
- `max_comments_requested`
- `source`
- `pagination`
- `comments`
- `raw_pages`
- `comment_error`

Each comment includes:

- `cid`
- `aweme_id`
- `level`
- `text`
- `create_time`
- `create_time_iso`
- `digg_count`
- `reply_comment_total`
- `ip_label`
- `is_hot`
- `is_author_digged`
- `user`
- `raw`
- `replies`

The `raw` field preserves Douyin's original comment payload for later fields not normalized by the script.

When comments fail, `comment_error` records the error message, time, and retry hint. The file can still contain metadata and empty comments.

## `comments_stats.json`

Summary derived from `comments_structured.json`.

Fields:

- `top_level_comments_fetched`
- `page_comment_count`
- `raw_pages`
- `has_more`
- `next_cursor`
- `top_level_reply_total_reported`
- `top_ip_labels`
- `keyword_hits`
- `top_digg_comments`

## `pull_status.json`

Run-level status written on every run.

Fields:

- `status`: `success` or `partial_success`
- `completed`
- `not_completed`
- `page_comment_count`
- `top_level_comments_fetched`
- `has_more`
- `raw_pages`
- `updated_at`

## `comment_error.json`

Written only when comment signing or pagination fails. It contains:

- `message`
- `name`
- `occurred_at`
- `hint`

## Count Semantics

`statistics.comment_count` from the page is a platform count. It may include replies, folded comments, filtered comments, or unavailable records.

`top_level_comments_fetched` is the number of unique top-level comments returned by web pagination during this run.
