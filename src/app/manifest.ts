import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description: SITE.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: SITE.backgroundColor,
    theme_color: SITE.themeColor,
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
