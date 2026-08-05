import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      // Support was folded into the Partner page — keep old links working.
      { source: "/support", destination: "/partner", permanent: true },

      // ── Old joepettigrew.org (GoDaddy) pages ────────────────────────────
      // The previous site's URLs are still in Google and in old emails, so
      // every one of them lands on its nearest page here instead of a 404.
      // Permanent (308) so search engines move the ranking across.
      { source: "/about-joe", destination: "/about", permanent: true },
      { source: "/whats-going-on", destination: "/about", permanent: true },
      { source: "/contact", destination: "/about#faq", permanent: true },
      { source: "/prayer-request", destination: "/about#faq", permanent: true },

      { source: "/the-daily-huddle", destination: "/morning-with-jesus", permanent: true },
      { source: "/daily-huddle-blog", destination: "/morning-with-jesus", permanent: true },

      { source: "/christian-books", destination: "/books", permanent: true },
      { source: "/joes-books", destination: "/books", permanent: true },
      { source: "/shop", destination: "/books", permanent: true },
      {
        source: "/walking-in-his-steps",
        destination: "/books/walking-in-his-steps",
        permanent: true,
      },

      { source: "/vlog", destination: "/#podcast", permanent: true },

      { source: "/give-to-in-the-zone", destination: "/partner", permanent: true },
      { source: "/help-fund-the-huddle", destination: "/partner", permanent: true },

      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },

      // Old member area — no equivalent, so send people to the front door.
      { source: "/m/:path*", destination: "/", permanent: true },

      // ── Older followingtheleader.org (WordPress) pages ──────────────────
      { source: "/what-we-do", destination: "/", permanent: true },
      { source: "/donations", destination: "/partner", permanent: true },
      { source: "/gallery", destination: "/about", permanent: true },
      { source: "/feed", destination: "/", permanent: true },
      { source: "/comments/feed", destination: "/", permanent: true },
      { source: "/author/:path*", destination: "/", permanent: true },
      { source: "/category/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
