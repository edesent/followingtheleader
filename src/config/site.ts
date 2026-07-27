// ─────────────────────────────────────────────────────────────────────────
//  Following the Leader — all site content lives here.
//  Edit the text/links below to update the website. No code knowledge needed:
//  change what's between the "quotes", save, and the live site updates.
// ─────────────────────────────────────────────────────────────────────────

export const SITE = {
  name: "Following the Leader",
  tagline: "Walking with Jesus in everyday life",
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
  // Brand (matches the logo — navy + gold dawn)
  backgroundColor: "#f6f8fb",
  themeColor: "#1e3a5c",
};

export type NavLink = { label: string; href: string; external?: boolean };
export type NavItem = NavLink & { children?: NavLink[] };

// Top navigation.
export const NAV: NavItem[] = [
  { label: "Morning With Jesus", href: "/morning-with-jesus" },
  { label: "About Joe", href: "/about" },
  { label: "Books", href: "/books" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Partner", href: "/partner" },
];

// Flat list of every page (used by the footer and sitemap).
export const PAGES: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Morning With Jesus", href: "/morning-with-jesus" },
  { label: "About Joe", href: "/about" },
  { label: "Books", href: "/books" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Partner", href: "/partner" },
];

// Legal pages — shown in the footer + sitemap only, not in the main nav.
export const LEGAL: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
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

// ── Partner (the Founding Partner vision) ─────────────────────────────────────
//  Adapted from the "Following the Leader" partnership portfolio — the ministry's
//  invitation to underwrite initiatives, become a founding partner, or give.
export const PARTNER = {
  eyebrow: "Become a Founding Partner",
  title: "Join us in strengthening the Church for eternity",
  lead:
    "God has given us the vision. We've seen the beginning. Now we invite you to be part of what He will do next.",

  // Opening vision
  vision: {
    heading: "This is more than a ministry. It is a movement of discipleship.",
    body: [
      "Following the Leader exists to help everyday believers take their next step toward Jesus — and to strengthen the local churches that disciple them. What began as a single daily email has become a movement reaching people in all 50 states and around the world.",
      "As a Founding Partner, you are not just making a gift — you are helping build a legacy that will last for generations.",
    ],
    verse: {
      text: "For we are God's fellow workers; you are God's field, God's building.",
      ref: "1 Corinthians 3:9",
    },
  },

  // What God has already done
  impact: {
    heading: "What God has already done",
    lead:
      "We didn't start with a staff, a building, or a budget. We started with obedience and a surrendered heart — and God has done far more than we could have imagined.",
    stats: [
      { value: "60,000+", label: "Daily devotional subscribers" },
      { value: "16,000+", label: "Pastors & church leaders encouraged" },
      { value: "50 states", label: "& 36 countries reached" },
      { value: "2M+", label: "Readings every year" },
    ],
  },

  // The burden that will not let go
  burden: {
    heading: "The burden that will not let go",
    lead: "The Church we love is strong in many ways — but we see what breaks Jesus' heart.",
    items: [
      {
        title: "Declining engagement",
        body: "Fewer people in the pews. Fewer volunteers. Fewer young people. Fewer new believers.",
      },
      {
        title: "A weakened discipleship culture",
        body: "Too many churches are teaching, but not equipping. Informing, but not transforming.",
      },
      {
        title: "A forgotten Great Commission",
        body: "We are called to make disciples who make disciples — not just attend church.",
      },
      {
        title: "A world that is searching",
        body: "People are hungry for hope, purpose, and truth, but many have never been invited into a real relationship with Jesus.",
      },
    ],
    note:
      "This burden is not about fixing what is broken. It is about helping the Church become everything Jesus created her to be. We cannot do it alone — we need partners who share this burden.",
  },

  // Your partnership makes the difference
  difference: {
    heading: "Your partnership makes the difference",
    items: [
      {
        title: "You invest in eternity",
        body: "You help provide resources that lead people to Jesus and equip the Church to make disciples who make disciples.",
      },
      {
        title: "You help strengthen the Church",
        body: "Your partnership gives pastors and leaders the tools, training, and encouragement they need to lead with confidence.",
      },
      {
        title: "You multiply impact",
        body: "Together, we can reach more people, in more places, with more resources than we ever could alone.",
      },
      {
        title: "You join what God is doing",
        body: "This is not our plan — it is His mission. He has already started it. We simply get to be part of it.",
      },
      {
        title: "You leave a legacy",
        body: "Your generosity today will help build a ministry that inspires and transforms lives for generations to come.",
      },
    ],
  },

  // The vision ahead
  future: {
    heading: "The vision ahead",
    lead:
      "By 2031, with a faithful community of partners who believe in this vision, here is what we are praying God will do:",
    goals: [
      { value: "1,000+", label: "Local churches using our resources to disciple their people" },
      { value: "100,000+", label: "People completing the 40-day group study and growing deeper" },
      { value: "10,000+", label: "Pastors & church leaders equipped and encouraged" },
      { value: "Millions", label: "Reached through Morning With Jesus, books, and church partnerships" },
      { value: "Eternity", label: "Lives changed for God's glory — for the next generation and beyond" },
    ],
  },

  // Three ways to partner
  ways: [
    {
      title: "Underwrite an initiative",
      body: "Partner with us to fund the development of an entire ministry resource or strategic project that will strengthen the Church and reach more people.",
      tagline: "Leave a lasting impact through a specific initiative.",
    },
    {
      title: "Become a Founding Partner",
      body: "Help establish Following the Leader through significant annual support that provides stability, expands our reach, and ensures long-term impact.",
      tagline: "Build the foundation for a legacy that will last for generations.",
      highlight: true,
    },
    {
      title: "Support the mission",
      body: "Give as God leads through one-time or recurring gifts that allow us to remain flexible and faithful to the opportunities He opens.",
      tagline: "Every gift — large or small — advances the mission.",
    },
  ],

  // A personal invitation from Joe
  invitation: {
    heading: "A personal invitation from Joe",
    body: [
      "If God has stirred your heart through this vision, I would be honored to visit with you personally. Every partnership begins with a conversation, a shared prayer, and a desire to discern where God is leading.",
      "I'm not asking you to make a decision today. I'm asking you to pray. If, after praying, you believe God is inviting you to help establish Following the Leader for generations to come, I would be honored to continue that conversation with you.",
    ],
    signoff: "— Dr. Joe Pettigrew, Founder",
    verse: {
      text: "Where there is no vision, the people perish.",
      ref: "Proverbs 29:18",
    },
    cta: "Start the conversation",
  },
};
