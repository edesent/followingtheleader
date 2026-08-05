/**
 * Morning With Jesus podcast — read live from the Podbean RSS feed.
 *
 * Joe publishes an episode every weekday, so nothing about the episode list is
 * kept in the repo: the pages fetch the feed and Next caches it for an hour
 * (`revalidate`), which means a new morning's episode appears on its own.
 *
 * Every function here fails soft — a feed outage returns an empty list and the
 * pages fall back to their configured copy rather than erroring.
 */
import { PODCAST_FEED_URL } from "@/config/site";

export type Episode = {
  /** Podbean's episode page. */
  link: string;
  title: string;
  /** Plain-text summary, HTML stripped. */
  summary: string;
  /** Direct MP3, for the on-site player. */
  audioUrl: string;
  /** ISO date, for <time> and sorting. */
  publishedAt: string;
  /**
   * "August 5, 2026" — formatted here on the server so the client component
   * doesn't format dates itself and risk a timezone hydration mismatch.
   */
  dateLabel: string;
  /** e.g. "2:34" — omitted when the feed doesn't say. */
  duration?: string;
};

const REVALIDATE_SECONDS = 3600; // an hour; episodes land once a day

/* ── tiny RSS reader ──────────────────────────────────────────────────────
   The feed is a known, stable shape (Podbean), so a focused parser beats
   pulling in an XML dependency. Everything is defensive: a field that doesn't
   match simply comes back empty. */

function decodeEntities(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#8216;|&lsquo;/g, "‘")
    .replace(/&#8220;|&ldquo;/g, "“")
    .replace(/&#8221;|&rdquo;/g, "”")
    .replace(/&#8212;|&mdash;/g, "—")
    .replace(/&#8230;|&hellip;/g, "…")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

function tag(block: string, name: string): string {
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i"));
  return m ? decodeEntities(m[1]).trim() : "";
}

function attr(block: string, tagName: string, attrName: string): string {
  const el = block.match(new RegExp(`<${tagName}\\s[^>]*>`, "i"));
  if (!el) return "";
  const m = el[0].match(new RegExp(`${attrName}\\s*=\\s*"([^"]*)"`, "i"));
  return m ? decodeEntities(m[1]).trim() : "";
}

function stripHtml(s: string): string {
  return s
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Podbean gives either total seconds ("154") or "HH:MM:SS" / "MM:SS". */
function formatDuration(raw: string): string | undefined {
  if (!raw) return undefined;
  if (raw.includes(":")) {
    const parts = raw.split(":").map((p) => parseInt(p, 10));
    if (parts.some(Number.isNaN)) return undefined;
    const total = parts.reduce((acc, p) => acc * 60 + p, 0);
    return formatSeconds(total);
  }
  const secs = parseInt(raw, 10);
  return Number.isNaN(secs) ? undefined : formatSeconds(secs);
}

function formatSeconds(total: number): string {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = h ? String(m).padStart(2, "0") : String(m);
  return `${h ? `${h}:` : ""}${mm}:${String(s).padStart(2, "0")}`;
}

function parseFeed(xml: string): Episode[] {
  const blocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];
  const episodes: Episode[] = [];

  for (const block of blocks) {
    const title = tag(block, "title");
    const audioUrl = attr(block, "enclosure", "url");
    if (!title || !audioUrl) continue; // not a playable episode

    const pubDate = tag(block, "pubDate");
    const published = pubDate ? new Date(pubDate) : null;
    const publishedAt =
      published && !Number.isNaN(published.getTime()) ? published.toISOString() : "";

    episodes.push({
      title,
      audioUrl,
      link: tag(block, "link") || audioUrl,
      summary: stripHtml(tag(block, "description") || tag(block, "itunes:summary")),
      publishedAt,
      dateLabel: formatEpisodeDate(publishedAt),
      duration: formatDuration(tag(block, "itunes:duration")),
    });
  }

  return episodes;
}

/**
 * Recent episodes, newest first. Returns [] if the feed can't be read, so
 * callers should keep a fallback for an empty list.
 */
export async function getEpisodes(limit = 12): Promise<Episode[]> {
  try {
    const res = await fetch(PODCAST_FEED_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { accept: "application/rss+xml, application/xml, text/xml" },
    });
    if (!res.ok) {
      console.error(`Podcast feed returned ${res.status}`);
      return [];
    }
    return parseFeed(await res.text()).slice(0, limit);
  } catch (err) {
    console.error("Could not read the podcast feed", err);
    return [];
  }
}

/** The newest episode, or null when the feed is unavailable. */
export async function getLatestEpisode(): Promise<Episode | null> {
  return (await getEpisodes(1))[0] ?? null;
}

/** "August 5, 2026" — for display next to an episode. */
export function formatEpisodeDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
