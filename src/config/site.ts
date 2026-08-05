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

// Constant Contact's own hosted signup page. The site no longer uses it — the
// on-page form signs people up through the API instead — kept here as the
// fallback link if that ever needs to be pointed at CC directly again.
export const CC_HOSTED_SIGNUP_URL = "https://lp.constantcontactpages.com/sl/60chxlI";

// Podcast — past devotionals, read aloud.
export const PODCAST_URL = "https://joei7.podbean.com";

// ── Podcast section (home page) ──────────────────────────────────────────────
// A featured episode plays inline; the button links to the full show on Podbean.
// The audio file lives on Vercel Blob.
export const PODCAST = {
  eyebrow: "The Podcast",
  title: "The Following the Leader Podcast",
  description:
    "Honest conversations about what it really means to follow Jesus — and why the church needs faithful followers more than it needs more leaders. It's the heart of this ministry, in Joe's own voice.",
  featured: {
    title: "Why We Need Followers, Not Leaders",
    blurb: "The conviction that started Following the Leader.",
    audioUrl:
      "https://w9ttoctwfq1uxt2q.public.blob.vercel-storage.com/podcast/why-we-need-followers-not-leaders.m4a",
  },
  cta: { label: "Listen to more episodes", href: PODCAST_URL },
};

// ── Home / hero ────────────────────────────────────────────────────────────
//  The hero leads with the ministry's conviction — followers, not leaders — so a
//  first-time visitor learns what Following the Leader IS. The daily devotional
//  is the first way in (see MINISTRY below), not the whole identity.
export const HERO = {
  eyebrow: "The Ministry of Dr. Joe Pettigrew",
  title: "The world is looking for leaders. Jesus is looking for followers.",
  subtitle:
    "Following the Leader helps everyday believers take their next step toward Jesus — and equips the churches that disciple them. It begins with a word each morning.",
  primaryCta: { label: "Start tomorrow morning", href: "/morning-with-jesus#subscribe" },
  secondaryCta: { label: "Meet Joe", href: "/about" },
};

// ── What the ministry is (home page, under the hero) ────────────────────────
//  The four arms of Following the Leader. The devotional comes first because it's
//  how most people meet the ministry, but the row exists to show it isn't the
//  only thing here.
export const MINISTRY = {
  eyebrow: "Following the Leader",
  heading: "Four ways we walk with you",
  intro:
    "Everything here exists for one reason: to help ordinary people follow Jesus faithfully, and to strengthen the local churches that walk with them.",
  pillars: [
    {
      icon: "sunrise",
      title: "Morning With Jesus",
      stat: "60,000+ readers every morning",
      body: "A short, Scripture-rooted word in your inbox before the noise of the day begins. Free, always.",
      href: "/morning-with-jesus",
      cta: "Subscribe free",
    },
    {
      icon: "book",
      title: "Books & church studies",
      stat: "7 titles · 40-day group studies",
      body: "Devotionals and studies written for men, women, young adults, small groups, and whole congregations.",
      href: "/books",
      cta: "Browse the books",
    },
    {
      icon: "mic",
      title: "The Podcast",
      stat: "In Joe's own voice",
      body: "Honest conversations about what it really means to follow Jesus — and why the Church needs followers.",
      href: "/#podcast",
      cta: "Listen to an episode",
    },
    {
      icon: "hands",
      title: "Partner with us",
      stat: "Founding Partners",
      body: "Help establish this ministry for the next generation — equipping pastors and reaching more homes each morning.",
      href: "/partner",
      cta: "See the vision",
    },
  ],
};

// Hero intro video (hosted on Vercel Blob). Click-to-play with a poster image.
export const HERO_VIDEO = {
  url: "https://w9ttoctwfq1uxt2q.public.blob.vercel-storage.com/follow-the-leader-intro.mp4",
  poster: "/images/intro-video-poster.jpg",
  label: "Watch the introduction",
  linkLabel: "Read about the new book",
  linkHref: "/#new-book",
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
// A block of book content: either a paragraph (a string) or a bulleted list
// (with an optional lead-in line).
export type BookContentBlock = string | { heading?: string; list: string[] };

export type Book = {
  id: string;
  title: string;
  audience: string;   // short tag, e.g. "For Men"
  subtitle: string;   // one-line description shown under the title
  blurb: string;      // short summary (used on the books index + previews)
  image: string;
  buyUrl: string;
  video?: string;     // YouTube video ID — Joe introduces the book (optional)
  contentEyebrow: string;     // small label above the full description
  content: BookContentBlock[]; // the full description shown on the book's page
  featured?: boolean;
};

// A short "introduction to Joe's books" video, shown on the Books page.
export const BOOKS_INTRO_VIDEO = "efWJsx-4kxg";

// ── New release ──────────────────────────────────────────────────────────────
// Dr. Joe's newest book. Featured on the home page and atop the Books page.
// The button opens the preorder form (PreorderButton → /api/preorder): there is
// no payment step, the order is emailed to Joe and he follows up with the total.
export const NEW_RELEASE = {
  badge: "New Release",
  title: "Following the Leader",
  tagline: "A Forty-Day Journey with Jesus",
  author: "Dr. Joe Pettigrew",
  image: "/images/following-the-leader.png",
  description: [
    "Dr. Joe Pettigrew's newest book is a forty-day invitation to walk closely with Jesus — one day at a time. In the same warm, Scripture-rooted voice that reaches more than 60,000 readers every morning, each reading is short enough for a busy day yet meant to be carried with you long after you close the page.",
    "Perfect for personal devotion, a small group, or a church-wide journey through the season ahead.",
  ],
  cta: { label: "Preorder your copy" },
  note: "Nothing to pay now — Joe follows up with the total and how to send it.",
  preorder: {
    intro:
      "Reserve your copies now. There's nothing to pay today — Joe will be in touch personally with the total and how to send it.",
  },
  // Pricing for the Stripe checkout, which the site no longer routes to while
  // preorders are handled by hand. TODO: set the real retail price once the
  // Lulu print cost is known, before turning card checkout back on.
  priceCents: 1999,
  currency: "usd",
};

export const BOOKS: Book[] = [
  {
    id: "my-daily-huddle",
    title: "My Daily Huddle",
    audience: "365-Day Devotional",
    subtitle: "Start your morning off with a word from Jesus in this 365-day devotional.",
    blurb:
      "The everyday devotional at the heart of this ministry — a continuation of The Daily Huddle, read more than two million times each year. A short, Christ-centered word for every morning of the year.",
    image: "/images/book-my-daily-huddle.jpg",
    buyUrl:
      "https://www.christianbook.com/huddle-there-nothing-powerful-starting-jesus/9798303464346/pd/464346?event=AFF&p=1243999",
    video: "9PjZHSLwFUk",
    featured: true,
    contentEyebrow: "An Independent Daily Devotional",
    content: [
      "Life is filled with twists and turns — days that are smooth sailing and others where the waves seem insurmountable. For Christians navigating the complexities of life, a 365-day devotional is far more than just a piece of Christian literature; it's a daily companion, a lifeline, and a gentle nudge to keep your heart and mind centered on what truly matters.",
      "Devotionals create space in your day for quiet reflection — a sacred pause in the rhythm of life. With each passing day, they invite you to consider the deeper truths of your faith. A 365-day devotional allows you to develop a habit of turning to God consistently, even when life feels hectic. Imagine starting each day grounded in peace, equipped with encouragement, and reminded of the grace that carries you forward. Consistency builds connection.",
      "Much like building a friendship, your relationship with God grows deeper when nurtured daily. This book is a continuation of The Daily Huddle — which is currently sent out each morning and read more than two million times each year. Several churches use it as a devotional where all members read the same thing each day. Imagine: every morning you know you are reading the same words as your friends or church members. It is also popular for families, especially when they live far apart — a way to keep them together.",
      "While we eagerly pour into family, friends, and work, how often do we pour into our own hearts? A devotional serves as a gentle, daily reminder to tend to the garden of your faith. Whether you've just started your faith journey or have walked with God for decades, carving out a daily moment with Him can transform your perspective, priorities, and peace of mind.",
      "The style you'll find in My Daily Huddle has been tested. For seven years, Joe has sent The Daily Huddle out to thousands, and over those years more than eight million people have read one of these devotionals. If you're looking for something relevant, tested, and most of all biblical, My Daily Huddle is for you.",
    ],
  },
  {
    id: "walking-in-his-steps",
    title: "Walking In His Steps",
    audience: "40-Day Study",
    subtitle: "A group or individual study that runs forty days.",
    blurb:
      "A forty-day journey to a stronger relationship with Jesus — perfect for individual reflection or a group and church-wide study.",
    image: "/images/book-walking-in-his-steps.jpg",
    buyUrl:
      "https://www.christianbook.com/walking-in-his-steps/9798348455736/pd/455737?event=AFF&p=1243999",
    video: "OtMUt5gNG1w",
    contentEyebrow: "Small Group or Church-Wide Study",
    content: [
      "Welcome to this 40-day study — a sacred opportunity to grow closer to Jesus and deepen your relationship with Him. Whether you feel lost, overwhelmed, or simply yearning for something more, this guide invites you to take meaningful steps toward spiritual growth, one day at a time.",
      "Growing in faith is not about grand gestures; it's about consistency, surrender, and an open heart. It's about looking beyond the busyness of life and setting aside daily moments to connect with Jesus. Each day you'll find reflections, challenges, and encouragement to help you grow. Like a seed planted in fertile soil, your faith will deepen as you nurture it through prayer, gratitude, and quiet reflection. Throughout the 40 days, you'll uncover new dimensions of Jesus' character and see how His teachings can transform every corner of your life.",
      "Whether you're reading at sunrise with a cup of coffee or winding down before bed, commit this time to Jesus. The most important thing is to start — not with hesitation, but with trust that He is ready to meet you right where you are. Remember, this 40-day journey isn't something you walk alone; you are part of a group. No matter where you find yourself in your faith, Jesus walks alongside you.",
      "You may have participated in a church-wide study before; if you haven't, you are in for something special. It's designed for a church to split into small groups of around twelve members who gather each week to discuss their progress, and at the end of the 40 days all groups meet together for a closing session. Your walk in the steps of Jesus is waiting.",
    ],
  },
  {
    id: "the-game-plan",
    title: "The Game Plan",
    audience: "For Men",
    subtitle: "For men as they work to be great husbands.",
    blurb:
      "A straight-talking guide for men who want to be great husbands — practical, biblical, and built for the way men actually think.",
    image: "/images/book-the-game-plan.jpg",
    buyUrl:
      "https://www.christianbook.com/the-game-plan/9798348463601/pd/463601?event=AFF&p=1243999",
    video: "wE8epM1iqcQ",
    contentEyebrow: "For Men",
    content: [
      "The Game Plan experience was created for the men of your church — to help them fight the cultural battles of our world while influencing their family and friends for Jesus Christ. Your men will relate to how our worldly culture tries to intimidate us into becoming politically correct instead of biblically obedient. The Game Plan empowers men of every generation to understand that God's Word is just as applicable today as it ever was.",
      "Life is chaotic — it pulls us in a thousand directions, each competing for our time, energy, and attention. At work we're driven to succeed; at home we shoulder the responsibility to provide and protect. The pressure mounts, and many of us wrestle with one core question in the quiet moments: Am I the man God created me to be? You're not alone in asking that. It's a question millions of Christian men grapple with daily, and its beauty is found not just in the answer but in the process of becoming.",
      "One of the greatest misconceptions about being a man is equating our value solely with what we provide. Society pushes us to measure success in numbers — zeros in bank accounts, errands checked off, milestones hit. While those things matter, God's calling is about so much more. He has a vision for you that's greater than the sum of your achievements, calling you to be present, intentional, and courageous in your faith — to lead not only in action but in character, with compassion, resilience, and humility.",
      "Too often the world tells us strong men must handle everything on their own, but isolation erodes the spirit. God created us for community — one built on support, accountability, and shared faith. Being the man God wants you to be doesn't happen overnight; it's a daily choice to learn, grow, and lean into His grace. There will be mistakes, yes — but every fall is an opportunity to rise stronger, anchored more deeply in faith. This is a great book for men to read alone or, even better, in a men's group.",
    ],
  },
  {
    id: "cracking-the-man-code",
    title: "Cracking the Man Code",
    audience: "For Women",
    subtitle: "For women as they work to understand their husbands.",
    blurb:
      "A warm, honest companion for women working to understand — and love well — the man they married.",
    image: "/images/book-cracking-the-man-code.jpg",
    buyUrl:
      "https://www.christianbook.com/cracking-the-man-code/9798348501457/pd/501459?event=AFF&p=1243999",
    video: "cNU3LGBVGuw",
    contentEyebrow: "For Women",
    content: [
      "Understanding what men want in their marriage can be challenging for many women. The Word of God offers insight into both what women desire and what men seek. Numerous books have been published to help men understand what women want — but women are the primary purchasers and readers of those books, especially when it comes to Christian literature. This book stands out.",
      "Marriage is a sacred union, designed by God to reflect His love and grace. Yet deciphering what your husband truly desires can be complex. For Christian women striving to cultivate a Christ-centered marriage, gaining insight into what men want goes beyond meeting cultural expectations. It's about strengthening your bond and partnership — fostering trust, respect, and mutual love within the divine framework God has established for marriage.",
      "When considering what men want in a marriage, it's easy to rely on clichés or stereotypes. However, most men, much like women, long for something deeper — a spouse who truly sees, hears, and affirms them as both a partner and an individual. This doesn't imply that marriage is flawless or free of struggle; rather, it's an imperfectly beautiful space for growth.",
      "Men crave a sense of partnership and place high value on respect — a principle deeply rooted in Scripture. Respect signifies acknowledgment of a man's efforts, leadership, and contributions to your shared life. It's less about achieving perfection and more about how he feels loved and supported in his unique role within your union.",
      "Finally, men cherish intimacy — not only physical closeness but the emotional bond that develops from a personal, meaningful connection. This means learning how your husband best receives love and committing to express care in ways that resonate with his heart. It's not about grand gestures, but the consistency of everyday love.",
    ],
  },
  {
    id: "lessons-i-hope-you-have-learned",
    title: "Lessons I Hope You Have Learned",
    audience: "For Young Adults",
    subtitle:
      "A great gift from parents or grandparents for young adults in high school or college.",
    blurb:
      "A great gift from parents or grandparents to young adults in high school or college — the wisdom you most want to pass on, gathered in one place.",
    image: "/images/book-lessons-i-hope.jpg",
    buyUrl:
      "https://www.christianbook.com/lessons-i-hope-you-learned/9798348457051/pd/457068?event=AFF&p=1243999",
    video: "0omNKqYrIeU",
    contentEyebrow: "For Young Adults, From Grandparents",
    content: [
      "Grandparents are some of the greatest storytellers in our lives. Their stories are laced with lessons, wisdom, and love — tiny treasures gifted to their grandchildren to guide them through life. But have you ever wondered why they share these stories? It's because they want their grandchildren to learn from their experiences, to find the same joys that filled their hearts, and to avoid the mistakes that caused them pain. This book is inspired by that special gift grandparents aim to pass down — a deep wish for their legacy to grow into someone kind, wise, and strong.",
      "If grandparents could pass along lessons to their grandchildren, those lessons wouldn't come from textbooks or lectures — they'd be shaped by life, faith, and experience. These are the principles you wish for them to carry as they grow, learn, and lead lives of meaning. Our hope for our grandchildren isn't that they live a perfect life. It's that they live a life full of faith, love, and courage, holding onto the truth that God is with them every step of the way.",
      "Whether it's school, sports, or a creative hobby, the things you work hard at have the sweetest rewards. The next time you feel like giving up, picture your grandparents cheering you on, reminding you how good it feels to reach a goal you've worked hard for. They believe in you completely — and you can believe in yourself as well. Through all these lessons — kindness, hard work, resilience, love, and curiosity — there's one thing grandparents most want their grandchildren to remember: you are loved more than you can imagine.",
    ],
  },
  {
    id: "living-life-in-the-zone",
    title: "Living Life In The Zone",
    audience: "Men's Sports Study",
    subtitle:
      "A men's forty-day study with an emphasis on sports, featuring interviews with famous Christian athletes.",
    blurb:
      "A men's forty-day study with an emphasis on sports, featuring interviews with some of the world's most famous Christian athletes. Co-authored with Kyle Rote, Jr.",
    image: "/images/book-living-life-in-the-zone.jpg",
    buyUrl:
      "https://www.christianbook.com/living-life-zone-spiritual-game-plan/kyle-rote/9780849946523/pd/946520?event=AFF&p=1243999",
    contentEyebrow: "Men's Group Study or Individual Read",
    content: [
      "Living Life In The Zone was written during the peak of In The Zone Ministries. It was crafted specifically for the men attending one of the In The Zone events and is an excellent choice for anyone who enjoys sports. Each chapter highlights a different concept and features notable sports figures.",
      "This is a fantastic read for men as young as high school, and it's particularly popular among fathers and grandfathers. Beyond private study, many churches have used Living Life In The Zone with their men's group over seven weeks. Many men still have a desire to grow in their faith but find that much of today's Christian literature doesn't resonate with them. Living in the zone represents a state of mind where everything seems to align — but how does a man navigate living in the zone as a Christian? This 40-day spiritual journey offers a sports-centric guide for today's busy man, aiming to relieve stress and instill confidence as he embraces his daily adventure.",
      { heading: "Each chapter is:", list: [
        "Designed to strengthen both churched and unchurched men",
        "Brief enough to enjoy while still providing spiritual depth",
        "Filled with real issues often overlooked in church discussions",
        "Focused on a daily spiritual to-do list",
      ] },
      { heading: "Divided into four sections — Marriage, Children, Work, and Faith — each daily reading includes:", list: [
        "Thought of the day",
        "Words of wisdom on a particular subject",
        "A biblical perspective",
        "Insight for practical application",
        "Questions to ponder",
        "Today's call to action",
        "Prayer requests",
      ] },
      "Real-life sports stories highlight the faith journeys of famous athletes, coaches, businessmen, and other public figures — encouraging men that they, too, can overcome adversity, walk in faith, and truly live in the zone. The book features insights from figures such as Tony Dungy, Lee Corso, Chris Mortensen, Bobby Bowden, and many others.",
    ],
  },
];

// Look up one book by its id (used by the per-book pages).
export function getBook(id: string): Book | undefined {
  return BOOKS.find((b) => b.id === id);
}

// ── Testimonials ─────────────────────────────────────────────────────────────
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  featured?: boolean;
};

// One quote per person, and each quote stays with the person who actually said it
// — the Testimonials page shows this whole list on a single screen, so a repeated
// name reads as padding. The three marked `featured: true` are the ones shown on
// the home page.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Joe's devotionals have been a blessing to my family and to me. I just wanted to say thank you for allowing God to use you. This is relevant and needed today.",
    name: "Pastor Tony Evans",
    role: "Pastor & Author",
    featured: true,
  },
  {
    quote:
      "I love Joe's daily devotionals. They are short and to the point, and every day is something that makes me think.",
    name: "Phil Robertson",
    role: "The Duck Commander",
  },
  {
    quote:
      "No matter what stage of life you find yourself in, these devotionals will give you the perspectives you need to get the most out of everything you do.",
    name: "Pastor Ed Young",
    role: "Pastor & Author",
    featured: true,
  },
  {
    quote:
      "Are you on a journey with your heart to ask yourself questions every person wants to ask but is afraid no one has the answers. God's Word does have the answers, and Joe talks to you about the most important issues of your life.",
    name: "Pastor Ken Whitten",
    role: "Author & Pastor",
  },
  {
    quote:
      "Every day your devotional is bringing us inspiration that lifts our souls and provides direction for our best life. That is why I subscribe. Hope you will join us.",
    name: "Randy Frazee",
    role: "Author & Pastor",
  },
  {
    quote:
      "God calls us to have faith and integrity, show sacrifice and leadership, and carry a strong legacy. This is a must-read. Joe is my friend and someone who lives out his faith, and he shares it with us every morning.",
    name: "Lee Corso",
    role: "ESPN",
  },
  {
    quote:
      "I'm excited by the power of God's message I receive in this powerful devotional. Joe takes us to the core questions of life, presented in raw emotion and direct terms. This is a great start to my day.",
    name: "Colt McCoy",
    role: "NFL",
  },
  {
    quote:
      "The devotionals have been a source of strength for me as I read them every morning. They have helped me navigate through life's challenges with a renewed sense of faith and hope.",
    name: "Hugh Freeze",
    role: "Coach",
    featured: true,
  },
  {
    quote:
      "I have read Joe's devotionals for a long time, and I share them with my children, especially Timmy.",
    name: "Pam Tebow",
    role: "Author & Speaker",
  },
  {
    quote:
      "Joe has a way of writing what Christians desire to read. His devotionals are extremely relevant for today.",
    name: "Mike Glenn",
    role: "Retired FedEx Executive",
  },
  {
    quote:
      "I have been subscribing to Dr. Joe's devotional for many years. Dr. Joe has always communicated his messages based on sound biblical principles and practical application. Thank you, Dr. Joe, for this wonderful gift.",
    name: "Matt Rocco",
    role: "CEO, Etech",
  },
  {
    quote:
      "I am an everyday reader of Joe's devotional. I have even had him down to Texas to speak at my company's annual dinner.",
    name: "Rick Moore",
    role: "CEO, Oak Financial",
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

// ── Speaking (photo section on the About page) ────────────────────────────────
export const SPEAKING = {
  eyebrow: "On the Platform",
  title: "The same message, from the platform",
  body: "Beyond the daily devotional, Joe is a frequent speaker at churches, schools, and Mayor's Prayer Breakfasts across the country — calling people, wherever they gather, to follow Jesus faithfully.",
  caption: "Speaking at the Mayor's Prayer Breakfast in Albany, Georgia.",
  photos: [
    {
      src: "/images/joe-speaking-1.jpg",
      alt: "Dr. Joe Pettigrew speaking at the Mayor's Prayer Breakfast in Albany, Georgia",
    },
    {
      src: "/images/joe-speaking-2.jpg",
      alt: "Dr. Joe Pettigrew addressing the audience at the Albany, Georgia Mayor's Prayer Breakfast",
    },
  ],
};

// ── Frequently Asked Questions (shown on the About page) ──────────────────────
//  Rendered as an accordion and also emitted as FAQ structured data for SEO.
export type FaqItem = {
  q: string;
  a: string[];                                   // answer paragraphs
  sections?: { heading: string; body: string[] }[]; // e.g. statement-of-faith blocks
  showContact?: boolean;                         // append Joe's contact details
};

export const FAQ: { eyebrow: string; title: string; items: FaqItem[] } = {
  eyebrow: "Frequently Asked Questions",
  title: "Questions people often ask",
  items: [
    {
      q: "What is the best way to contact Joe?",
      a: ["Email is the best way to reach Joe. You're also welcome to write or call."],
      showContact: true,
    },
    {
      q: "What does Joe believe?",
      a: [
        "The mission statement of Following the Leader — the Bible-teaching ministry of Joe Pettigrew — states that he is committed to excellence in communicating the truths of Scripture and the person of Jesus Christ. And while a grace-based ministry such as this allows for freedom of interpretation and expression in many areas of Christian practice, the following essential beliefs are absolute and non-negotiable. Joe is an evangelical Christian.",
      ],
      sections: [
        {
          heading: "The Bible",
          body: [
            "I affirm my confidence in God's inerrant Word. I treasure its truths, and I respect its reproofs. The 66 books of the Old and New Testaments are the Word of God, inspired by the Holy Spirit, and written centuries ago by chosen men of God. The Bible is without error in its original manuscripts, is completely reliable as the final authority in all matters of doctrine and practice, and is centered on the person and work of Jesus Christ.",
          ],
        },
        {
          heading: "God the Father",
          body: [
            "I acknowledge the Creator-God as my heavenly Father, infinitely perfect and intimately acquainted with all our ways. As the first person of the Trinity, the Father is the source and ruler of all things and is fatherly in His relationship with creation in general and believers in particular. And although there is one eternal, all-powerful, all-knowing, holy, just, loving, true, and unchangeable God, in the unity of the one God, there are three divine persons—Father, Son, and Holy Spirit—equal in power but distinct in roles.",
          ],
        },
        {
          heading: "The Lord Jesus Christ",
          body: [
            "I claim Jesus Christ as our Lord—the very God who came in human flesh—the object of my worship and the subject of my praise. As the second person of the Trinity, the Son reveals the Father. According to the Father's plan, the eternal Son humbled Himself and became incarnate, inseparably uniting undiminished deity with true humanity. As fully God and fully man, Jesus Christ lived a sinless life, died to pay in full the penalty for our sin, rose bodily and miraculously from the dead, ascended into heaven, and will come again in glory.",
          ],
        },
        {
          heading: "The Holy Spirit",
          body: [
            "I recognize the Holy Spirit as the third member of the Godhead who is incessantly at work convicting, convincing, and comforting. As the third person of the Trinity, the Holy Spirit is the personal agent of the Father and Son for revelation and regeneration. Though pervasively present and active in creation, the Holy Spirit specially dwells among God's people and uniquely indwells individual believers, giving them new life and empowering them for lives of personal holiness.",
          ],
        },
        {
          heading: "The Family of God",
          body: [
            "I am grateful to be a part of the local church, which exists to proclaim God's truth, to administer the ordinances, to stimulate growth toward maturity, and to bring glory to God.",
            "Believers are called to faithful membership in a visible, local congregation for the purpose of mutual encouragement and spiritual growth. As the family of God, a healthy local church is marked by God-glorifying worship, Scripture-centered teaching, intimate fellowship, and vivid expressions of the church's faith, hope, and love through evangelism, disciple-making, financial support, and service.",
          ],
        },
      ],
    },
    {
      q: "Does Joe still speak?",
      a: [
        "Joe does still speak, although not as much as he once did. He speaks currently in churches, at schools, and for athletic teams, and he is a frequent speaker at Mayor's Prayer Breakfasts across the country.",
        "To check Joe's availability, send an email with your location and date to joe@joepettigrew.org.",
      ],
    },
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

  // Become a Monthly Partner — the giving tiers
  monthly: {
    title: "Become a Monthly Partner",
    intro:
      "Your monthly partnership provides the steady foundation that allows Following the Leader to encourage more people each day, create powerful resources for the church, and help more people faithfully follow Jesus for generations to come.",
    tiers: [
      {
        icon: "cup",
        name: "Daily Impact Partner",
        price: "$10",
        cadence: "/ month",
        body: "Your gift helps provide Morning With Jesus devotionals to thousands of readers every weekday.",
      },
      {
        icon: "people",
        name: "Compassion Partner",
        price: "$25",
        cadence: "/ month",
        body: "You help support daily devotionals and ministry outreach that encourage people in their walk with Jesus.",
      },
      {
        icon: "book",
        name: "Discipleship Partner",
        price: "$50",
        cadence: "/ month",
        body: "Your partnership helps create Bible studies, books, and resources that equip pastors and strengthen local churches.",
      },
      {
        icon: "globe",
        name: "Kingdom Impact Partner",
        price: "$100",
        cadence: "/ month",
        body: "You help expand the reach of Following the Leader into more churches, communities, and lives around the world.",
      },
      {
        icon: "heart",
        name: "Mission Advance Partner",
        price: "$250+",
        cadence: "/ month",
        body: "Your leadership-level monthly giving provides vital support for new initiatives and future ministry growth.",
      },
    ],
    stewardship: {
      title: "Our Stewardship Commitment",
      body: "We are committed to being faithful stewards of every gift entrusted to this ministry. Your monthly partnership helps us encourage believers daily, strengthen churches, and create Christ-centered resources that make a lasting impact. Every gift is received with gratitude, managed with integrity, and invested to advance God's Kingdom.",
    },
    giving: {
      title: "Giving Information",
      points: [
        "Following the Leader is a federally recognized 501(c)(3) nonprofit ministry.",
        "Gifts are tax-deductible as allowed by law.",
        "Donations may be made by check, donor-advised fund, appreciated securities, or other charitable giving methods.",
        "Receipts will be provided for all contributions.",
      ],
    },
    verse: {
      text: "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.",
      ref: "2 Corinthians 9:7",
    },
    closing: [
      "Thank you for praying. Thank you for believing in this mission. Thank you for helping people faithfully follow Jesus every single day.",
      "Together, we can see lives changed, churches strengthened, and the Kingdom of God advanced.",
    ],
  },

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
