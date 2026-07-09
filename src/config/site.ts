// ─────────────────────────────────────────────────────────────────────────
//  Following the Leader — all site content lives here.
//  Edit the text/links below to update the website. No code knowledge needed:
//  change what's between the "quotes", save, and the live site updates.
// ─────────────────────────────────────────────────────────────────────────

export const SITE = {
  name: "Following the Leader",
  tagline: "Walking with Jesus, one morning at a time",
  shortName: "Following the Leader",
  url: "https://followingtheleader.elijahdesent.com",
  description:
    "Following the Leader is the ministry of Dr. Joe Pettigrew — home of Morning With Jesus, a daily devotional read by more than 60,000 people, and books to help you walk with Christ in everyday life.",
  shortDescription:
    "A daily devotional ministry helping people walk with Jesus in everyday life.",
  email: "joe@joepettigrew.org",
  phone: "901-831-1101",
  phoneHref: "+19018311101",
  address: {
    line: "PO Box 196",
    city: "Brownsville",
    state: "TN",
    zip: "38012",
  },
  // Brand ("Morning Light")
  backgroundColor: "#fbf6ec",
  themeColor: "#c56a38",
};

export type NavLink = { label: string; href: string; external?: boolean };
export type NavItem = NavLink & { children?: NavLink[] };

// Top navigation.
export const NAV: NavItem[] = [
  { label: "Morning With Jesus", href: "/morning-with-jesus" },
  { label: "About Joe", href: "/about" },
  { label: "Books", href: "/books" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Support", href: "/support" },
];

// Flat list of every page (used by the footer and sitemap).
export const PAGES: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Morning With Jesus", href: "/morning-with-jesus" },
  { label: "About Joe", href: "/about" },
  { label: "Books", href: "/books" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Support", href: "/support" },
];

// Podcast — past devotionals, read aloud.
export const PODCAST_URL = "https://joei7.podbean.com";

// ── Home / hero ────────────────────────────────────────────────────────────
export const HERO = {
  eyebrow: "A Daily Devotional by Dr. Joe Pettigrew",
  title: "Begin each morning with Jesus.",
  subtitle:
    "A short, Scripture-rooted word to start your day — quiet, unhurried, and pointed straight at Christ. Join more than 60,000 readers who open the morning this way.",
  primaryCta: { label: "Subscribe free", href: "/morning-with-jesus#subscribe" },
  secondaryCta: { label: "Meet Joe", href: "/about" },
};

// A short "message from Joe" on the home page.
export const HOME_INTRO = {
  eyebrow: "A Message From Joe",
  heading: "Discipleship is lived, not rushed.",
  body: [
    "Following the Leader is a ministry devoted to helping people walk with Jesus in everyday life — not through the latest trend, but through steady time in Scripture and the quiet voice of the Lord.",
    "Each morning I write a brief devotional called Morning With Jesus. It's meant to be read in a few minutes and carried through the whole day. My prayer is simple: that before the noise begins, you would hear from Him first.",
  ],
  signoff: "— Dr. Joe Pettigrew",
};

// Quick stats shown across the site.
export const STATS = [
  { value: "60,000+", label: "Daily readers" },
  { value: "50 states", label: "36 countries" },
  { value: "2M+", label: "Readings a year" },
  { value: "7", label: "Books published" },
];

// ── Morning With Jesus (the devotional) ──────────────────────────────────────
export const DEVOTIONAL = {
  eyebrow: "The Daily Devotional",
  title: "Morning With Jesus",
  lead: "A powerful way to begin each day with a meaningful word from Jesus.",
  paragraphs: [
    "Morning With Jesus is a daily devotional rooted in Scripture and written to be read in just a few minutes. It's an invitation to be still, to listen, and to let the first voice you hear each day be the Lord's.",
    "It continues the heart of The Daily Huddle — the devotional now read more than two million times a year — carrying the same warmth and biblical clarity into every new morning.",
    "There is no cost and no catch. Enter your name, email, and city, and a fresh devotional will arrive in your inbox each morning.",
  ],
  points: [
    "Arrives fresh in your inbox every morning",
    "Short enough to read before the day begins",
    "Rooted in Scripture, written for real life",
    "Completely free — subscribe or unsubscribe anytime",
  ],
  subscribe: {
    heading: "Start your mornings with Jesus",
    body: "Join more than 60,000 readers across all 50 states and 36 countries.",
    cta: "Subscribe free",
  },
};

// ── Books ────────────────────────────────────────────────────────────────────
// image is a file in /public/images. buyUrl points to Christianbook (purchases
// there support the ministry). To add a book, copy a block and change details.
export type Book = {
  id: string;
  title: string;
  audience: string;   // short tag, e.g. "For Men"
  blurb: string;
  image: string;
  buyUrl: string;
  featured?: boolean;
};

export const BOOKS: Book[] = [
  {
    id: "my-daily-huddle",
    title: "My Daily Huddle",
    audience: "365-Day Devotional",
    blurb:
      "The everyday devotional at the heart of this ministry — a continuation of The Daily Huddle, read more than two million times each year. A short, Christ-centered word for every morning of the year.",
    image: "/images/book-my-daily-huddle.jpg",
    buyUrl:
      "https://www.christianbook.com/huddle-there-nothing-powerful-starting-jesus/9798303464346/pd/464346?event=AFF&p=1243999",
    featured: true,
  },
  {
    id: "walking-in-his-steps",
    title: "Walking In His Steps",
    audience: "40-Day Study",
    blurb:
      "A forty-day journey to a stronger relationship with Jesus — perfect for individual reflection or a group and church-wide study.",
    image: "/images/book-walking-in-his-steps.jpg",
    buyUrl:
      "https://www.christianbook.com/walking-in-his-steps/9798348455736/pd/455737?event=AFF&p=1243999",
  },
  {
    id: "the-game-plan",
    title: "The Game Plan",
    audience: "For Men",
    blurb:
      "A straight-talking guide for men who want to be great husbands — practical, biblical, and built for the way men actually think.",
    image: "/images/book-the-game-plan.jpg",
    buyUrl:
      "https://www.christianbook.com/the-game-plan/9798348463601/pd/463601?event=AFF&p=1243999",
  },
  {
    id: "cracking-the-man-code",
    title: "Cracking the Man Code",
    audience: "For Women",
    blurb:
      "A warm, honest companion for women working to understand — and love well — the man they married.",
    image: "/images/book-cracking-the-man-code.jpg",
    buyUrl:
      "https://www.christianbook.com/cracking-the-man-code/9798348501457/pd/501459?event=AFF&p=1243999",
  },
  {
    id: "lessons-i-hope-you-have-learned",
    title: "Lessons I Hope You Have Learned",
    audience: "For Young Adults",
    blurb:
      "A great gift from parents or grandparents to young adults in high school or college — the wisdom you most want to pass on, gathered in one place.",
    image: "/images/book-lessons-i-hope.jpg",
    buyUrl:
      "https://www.christianbook.com/lessons-i-hope-you-learned/9798348457051/pd/457068?event=AFF&p=1243999",
  },
  {
    id: "living-life-in-the-zone",
    title: "Living Life In The Zone",
    audience: "Men's Sports Study",
    blurb:
      "A men's forty-day study with an emphasis on sports, featuring interviews with some of the world's most famous Christian athletes. Co-authored with Kyle Rote, Jr.",
    image: "/images/book-living-life-in-the-zone.jpg",
    buyUrl:
      "https://www.christianbook.com/living-life-zone-spiritual-game-plan/kyle-rote/9780849946523/pd/946520?event=AFF&p=1243999",
  },
];

// ── Testimonials ─────────────────────────────────────────────────────────────
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  featured?: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "No matter what stage of life you find yourself in, these devotionals will give you the perspectives you need to get the most out of everything you do.",
    name: "Dr. Tony Evans",
    role: "Pastor & Author",
    featured: true,
  },
  {
    quote:
      "God calls us to have faith and integrity, show sacrifice and leadership, and carry a strong legacy. This is a must-read.",
    name: "Phil Robertson",
    role: "The Duck Commander",
    featured: true,
  },
  {
    quote:
      "Every day your devotional is bringing us inspiration that lifts our souls and provides direction for our best life. That is why I subscribe.",
    name: "Pastor Ed Young",
    role: "Pastor & Author",
    featured: true,
  },
  {
    quote:
      "I'm excited by the power of God's message I receive in this powerful devotional. Joe takes us to the core questions of life.",
    name: "Pastor Ken Whitten",
    role: "Author & Pastor",
  },
  {
    quote:
      "I have subscribed to Dr. Joe's devotional for many years. He has always communicated his messages based on sound biblical principles and practical application. Thank you, Dr. Joe, for this wonderful gift.",
    name: "Matt Rocco",
    role: "CEO, Etech",
  },
  {
    quote:
      "I am an everyday reader of Joe's devotional. I've even had him down to Texas to speak at my company's annual dinner. I share these with my children.",
    name: "Rick Moore",
    role: "CEO, Oak Financial",
  },
  {
    quote:
      "Joe has a way of writing what Christians desire to read. His devotionals are extremely relevant for today — a blessing to my family and to me.",
    name: "Dr. Tony Evans",
    role: "Pastor & Author",
  },
  {
    quote:
      "I love Joe's daily devotionals. They are short and to the point, and every day there is something that makes me think.",
    name: "Phil Robertson",
    role: "The Duck Commander",
  },
];

// ── About Joe ────────────────────────────────────────────────────────────────
export const BIO = {
  name: "Dr. Joe Pettigrew",
  role: "Author · Devotional Writer · Pastor",
  lead:
    "For more than twenty years Joe Pettigrew stood before America's largest corporations. Today he writes to the heart of the ordinary morning — pointing more than 60,000 readers to Jesus, one day at a time.",
  paragraphs: [
    "Joe holds degrees from the University of Tennessee, Murray State University, and the University of Memphis, where he earned his Ph.D. He served as a university professor and college dean before founding Leaderpoint Consulting Group, which consulted with corporate leaders from more than half of the Fortune 500 companies. For roughly two decades he was a professional speaker addressing major corporations across the country.",
    "In 2007, Joe co-founded In The Zone Ministries with Kyle Rote, Jr. — a national men's ministry that filled arenas and churches with Christian businessmen and sports figures. Out of that work grew a daily rhythm of writing that has never stopped.",
    "His daily devotional, Morning With Jesus, now reaches more than 60,000 subscribers across all 50 states and 36 countries. He has authored seven books written for men, women, small groups, and young adults, and he speaks at churches and Mayor's Prayer Breakfasts nationwide.",
    "Joe serves as pastor of First Presbyterian Church in Brownsville, Tennessee, where he lives with his wife of fifty years.",
  ],
  stats: [
    { value: "60,000+", label: "Daily readers" },
    { value: "7", label: "Books published" },
    { value: "50", label: "Years married" },
  ],
};

// ── Support ──────────────────────────────────────────────────────────────────
export const SUPPORT = {
  eyebrow: "Partner With Us",
  title: "Keep the morning free for everyone",
  lead:
    "Morning With Jesus is sent to more than 60,000 people at no cost — and it always will be. Partners make that possible. What matters most is consistency, not the amount.",
  tiers: [
    {
      amount: "$10",
      cadence: "/ month",
      body: "Helps keep the daily devotional free and landing in inboxes every morning.",
    },
    {
      amount: "$25",
      cadence: "/ month",
      body: "Adds real stability — helping the ministry grow and reach more readers.",
      highlight: true,
    },
  ],
  note:
    "Support is never expected or required. If giving isn't possible right now, please keep reading — your prayers and encouragement are a gift in themselves. You can also support the ministry simply by purchasing Joe's books, as a portion of each purchase helps sustain this work.",
};
