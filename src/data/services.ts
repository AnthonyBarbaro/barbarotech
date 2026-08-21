export type ServiceLandingCategory =
  | "San Diego web design"
  | "Ecommerce and platforms"
  | "Custom development";

export type ServiceLanding = {
  slug: string;
  navLabel: string;
  category: ServiceLandingCategory;
  priority: number;
  title: string;
  shortTitle: string;
  description: string;
  summary: string;
  audience: string;
  outcomes: string[];
  considerations: { title: string; detail: string }[];
  deliverables: string[];
  process: string[];
  proof: { projectSlug: string; relevance: string }[];
  faqs: { question: string; answer: string }[];
  relatedSlugs: string[];
  keywords: string[];
};

export const SERVICE_LANDINGS: ServiceLanding[] = [
  {
    slug: "san-diego-web-design",
    navLabel: "Web Design",
    category: "San Diego web design",
    priority: 1,
    title: "San Diego Web Design Built Directly by Anthony Barbaro",
    shortTitle: "San Diego Web Design",
    description:
      "Custom San Diego web design for small businesses that need a fast, credible website with clear pricing, direct communication, and practical ongoing support.",
    summary:
      "I design and build custom websites for San Diego businesses that need to earn trust quickly, explain their offer clearly, and turn mobile visitors into calls, bookings, or quote requests.",
    audience:
      "San Diego owners who want to work directly with the person designing and developing their website instead of passing decisions through an agency account team.",
    outcomes: [
      "A clear path from the first headline to the call, booking, or quote action",
      "Mobile-first pages that remain fast and easy to scan",
      "Search-ready structure with useful service, project, and contact information",
    ],
    considerations: [
      {
        title: "Local intent without filler",
        detail:
          "Location language should help a San Diego buyer understand fit. It should not be repeated across thin neighborhood pages that say the same thing.",
      },
      {
        title: "Proof near the decision",
        detail:
          "Relevant local work, transparent scope, and direct contact information do more to earn trust than unsupported superlatives.",
      },
      {
        title: "A maintainable launch",
        detail:
          "The site should remain straightforward to host, update, measure, and extend after the first release.",
      },
    ],
    deliverables: [
      "Page strategy, navigation, and conversion-path planning",
      "Custom responsive design and Next.js implementation",
      "Page titles, descriptions, canonical URLs, and structured data",
      "Launch QA, analytics readiness, and an ongoing care plan",
    ],
    process: [
      "Start with the offer, audience, current website, and most valuable visitor action.",
      "Build the highest-impact page direction and confirm the content hierarchy.",
      "Complete responsive implementation, technical SEO, QA, and launch preparation.",
    ],
    proof: [
      {
        projectSlug: "island-view-market-liquor",
        relevance:
          "A San Diego neighborhood-market website built around mobile browsing, business details, and local-search readiness.",
      },
      {
        projectSlug: "farida-law-san-diego",
        relevance:
          "A San Diego law-firm website structured for trust, performance, and direct intake paths.",
      },
    ],
    faqs: [
      {
        question: "Do you meet with San Diego clients in person?",
        answer:
          "I work remotely by default, including with San Diego clients, so scheduling, reviews, and approvals stay documented. The local focus is about serving nearby businesses, not requiring in-person meetings.",
      },
      {
        question: "What should I look for in the best web developer for my business?",
        answer:
          "Look for relevant shipped work, clear scope, responsive communication, honest pricing, and a plan for performance and maintenance. The right fit depends on the kind of site and support your business actually needs.",
      },
      {
        question: "Can you redesign an existing San Diego business website?",
        answer:
          "Yes. I can preserve useful content and integrations while rebuilding the structure, visual hierarchy, performance, and conversion flow.",
      },
    ],
    relatedSlugs: [
      "freelance-web-developer-san-diego",
      "small-business-web-design-san-diego",
      "local-seo-web-development-san-diego",
    ],
    keywords: [
      "San Diego web design",
      "web designer San Diego",
      "website design San Diego",
      "local web designer San Diego",
    ],
  },
  {
    slug: "freelance-web-developer-san-diego",
    navLabel: "Freelance Web Dev",
    category: "San Diego web design",
    priority: 2,
    title: "Freelance Web Developer in San Diego",
    shortTitle: "Freelance Web Developer",
    description:
      "Hire Anthony Barbaro as a freelance web developer in San Diego for fast, conversion-focused websites and full-stack builds.",
    summary:
      "I design and ship high-performance websites for businesses that need cleaner UX, faster load times, and stronger conversion flow.",
    audience:
      "Business owners and teams that need a professional website partner without the overhead of a full agency retainer.",
    outcomes: [
      "Clear messaging hierarchy and conversion-focused layout",
      "Fast, mobile-first performance and technical SEO foundations",
      "Maintainable codebase with room for future feature growth",
    ],
    considerations: [
      {
        title: "One accountable builder",
        detail:
          "The person discussing the scope is also the person designing, coding, testing, and supporting the finished work.",
      },
      {
        title: "Scope before implementation",
        detail:
          "Pages, integrations, responsibilities, and ongoing support are made explicit before development begins.",
      },
      {
        title: "The right level of system",
        detail:
          "A focused marketing site should not inherit the cost and complexity of a custom application, while real application needs should not be forced into a page builder.",
      },
    ],
    deliverables: [
      "Discovery and page architecture",
      "UI implementation in Next.js and TypeScript",
      "On-page SEO setup including metadata, schema, and canonicals",
      "Launch support and post-launch iteration plan",
    ],
    process: [
      "Align on scope, audience, and clear success criteria.",
      "Design and build the highest-impact pages first.",
      "QA, performance tuning, and launch with clear handoff.",
    ],
    proof: [
      {
        projectSlug: "farida-law-san-diego",
        relevance:
          "Direct delivery of a production law-firm website with intake paths and a mobile-first structure.",
      },
      {
        projectSlug: "qr-badge-system",
        relevance:
          "A deeper full-stack build showing that custom workflow and backend requirements can stay with the same developer.",
      },
    ],
    faqs: [
      {
        question: "Do you work only with San Diego companies?",
        answer:
          "No. I work with local San Diego businesses and remote teams across the U.S., but local clients often benefit from faster collaboration windows.",
      },
      {
        question: "Can you improve an existing site instead of rebuilding?",
        answer:
          "Yes. Many projects are focused remodels where we improve performance, content structure, and conversion paths without replacing every useful part.",
      },
      {
        question: "How is working with a freelancer different from an agency?",
        answer:
          "You communicate directly with the person doing the work. That can reduce handoffs and speed up decisions, but the project should still have written scope, milestones, and support expectations.",
      },
    ],
    relatedSlugs: [
      "san-diego-web-design",
      "nextjs-developer-san-diego",
      "custom-web-app-development-san-diego",
    ],
    keywords: [
      "freelance web developer San Diego",
      "San Diego web developer",
      "freelance software engineer San Diego",
      "hire web developer",
    ],
  },
  {
    slug: "small-business-web-design-san-diego",
    navLabel: "Small Business",
    category: "San Diego web design",
    priority: 3,
    title: "Small Business Web Design in San Diego",
    shortTitle: "Small Business Web Design",
    description:
      "Small business web design in San Diego with focused page strategy, transparent starting prices, mobile-first development, and direct support from Anthony Barbaro.",
    summary:
      "I build focused small-business websites that make the offer, location, credibility, and next step obvious without burying owners in unnecessary pages or software.",
    audience:
      "Local owners launching their first professional site or replacing a dated website that no longer reflects the quality of the business.",
    outcomes: [
      "A credible online home that answers the questions buyers ask before contacting you",
      "A lean page plan shaped around calls, bookings, visits, or quote requests",
      "Clear ownership and ongoing support after launch",
    ],
    considerations: [
      {
        title: "Start with buying questions",
        detail:
          "Services, service area, pricing context, proof, and contact options usually matter more than adding pages for their own sake.",
      },
      {
        title: "Design for the phone first",
        detail:
          "Local buyers frequently arrive from Maps, social links, or a direct search on a phone and need answers without pinching or hunting.",
      },
      {
        title: "Keep costs legible",
        detail:
          "Setup, required care, optional integrations, and third-party platform costs should be separated before work begins.",
      },
    ],
    deliverables: [
      "A page plan sized to the business rather than a generic agency package",
      "Responsive design, development, forms, and direct contact fallbacks",
      "Local-search foundations and clear business information",
      "Hosting, updates, support, and improvement planning",
    ],
    process: [
      "Identify the offer, service area, proof, and one primary visitor action.",
      "Turn those inputs into a concise content and page structure.",
      "Build, test, launch, and maintain the site through one direct relationship.",
    ],
    proof: [
      {
        projectSlug: "island-view-market-liquor",
        relevance:
          "A focused local-business site that prioritizes mobile visitors, hours, services, location details, and search-ready business information.",
      },
      {
        projectSlug: "barbarotech-site",
        relevance:
          "A transparent service site combining project proof, pricing paths, and low-friction inquiry options.",
      },
    ],
    faqs: [
      {
        question: "How many pages does a small business website need?",
        answer:
          "Enough to answer distinct buyer questions without repeating the same material. Many businesses can start with a focused homepage and a few supporting pages, then add content when a real customer or search need justifies it.",
      },
      {
        question: "Can I start small and add pages later?",
        answer:
          "Yes. The site can launch around the most important offer and conversion path, with room to add services, case studies, resources, or locations as the business earns useful material for them.",
      },
      {
        question: "Will I be able to request updates after launch?",
        answer:
          "Yes. Required monthly care provides an ongoing path for support, updates, and measured improvements instead of leaving the site unattended.",
      },
    ],
    relatedSlugs: [
      "san-diego-web-design",
      "website-redesign-san-diego",
      "local-seo-web-development-san-diego",
    ],
    keywords: [
      "small business web design San Diego",
      "small business website San Diego",
      "affordable web design San Diego",
      "local business website designer",
    ],
  },
  {
    slug: "website-redesign-san-diego",
    navLabel: "Website Redesign",
    category: "San Diego web design",
    priority: 4,
    title: "Website Redesign Services in San Diego",
    shortTitle: "Website Redesign",
    description:
      "San Diego website redesign services for businesses that need clearer messaging, stronger mobile UX, faster pages, and a maintainable modern build.",
    summary:
      "I redesign existing business websites when the offer has outgrown the layout, mobile users struggle, updates feel brittle, or the site no longer earns confidence.",
    audience:
      "Businesses with a live site and useful existing assets that need a better structure and implementation rather than another cosmetic theme swap.",
    outcomes: [
      "A clearer hierarchy that keeps valuable content while removing friction",
      "Responsive layouts designed around current devices and buyer behavior",
      "A cleaner technical foundation for performance, SEO, and future changes",
    ],
    considerations: [
      {
        title: "Preserve what already works",
        detail:
          "Useful copy, rankings, URLs, integrations, and brand recognition should be inventoried before changing the structure.",
      },
      {
        title: "Redirect deliberately",
        detail:
          "When URLs change, redirects and canonical signals should be planned so existing links and search history are not abandoned.",
      },
      {
        title: "Fix the decision path",
        detail:
          "The redesign should improve how a visitor understands and acts, not only replace colors and spacing.",
      },
    ],
    deliverables: [
      "Existing-site and content inventory",
      "Revised information architecture and conversion flow",
      "Responsive redesign and production implementation",
      "Redirect map, metadata migration, QA, and launch checks",
    ],
    process: [
      "Review the current site, analytics context, content, and business priorities.",
      "Define what stays, what changes, and how existing URLs will be handled.",
      "Build and validate the redesign before switching production traffic.",
    ],
    proof: [
      {
        projectSlug: "goso-gummies",
        relevance:
          "A custom mobile Shopify homepage built inside an existing storefront to improve hierarchy and product discovery without replacing the whole commerce system.",
      },
      {
        projectSlug: "barbarotech-site",
        relevance:
          "An evolving service site with structured pricing, case studies, and inquiry paths maintained on a performance-focused foundation.",
      },
    ],
    faqs: [
      {
        question: "Will a redesign hurt existing search rankings?",
        answer:
          "Any major change carries risk, especially when useful content or URLs disappear. A careful redesign inventories current pages, preserves valuable material, maps redirects, and validates indexing signals before and after launch.",
      },
      {
        question: "Can you redesign only the homepage?",
        answer:
          "Yes, when the existing platform and supporting pages are sound. A homepage-only scope should still account for navigation, shared styles, mobile behavior, and where its calls to action lead.",
      },
      {
        question: "Do I need new copy and photography?",
        answer:
          "Not automatically. Existing assets are reviewed first. New content is recommended only where the current material cannot explain the offer, prove the work, or support the revised layout.",
      },
    ],
    relatedSlugs: [
      "small-business-web-design-san-diego",
      "website-performance-optimization-san-diego",
      "san-diego-web-design",
    ],
    keywords: [
      "website redesign San Diego",
      "San Diego website redesign",
      "business website redesign",
      "modernize business website",
    ],
  },
  {
    slug: "local-seo-web-development-san-diego",
    navLabel: "Local SEO Builds",
    category: "San Diego web design",
    priority: 5,
    title: "Local SEO Web Development in San Diego",
    shortTitle: "Local SEO Web Development",
    description:
      "Local SEO web development for San Diego businesses with clear service architecture, structured business data, fast mobile pages, and honest measurement.",
    summary:
      "I build the website foundation that helps search engines and local buyers understand what a business offers, where it operates, and why its pages deserve attention.",
    audience:
      "San Diego businesses that need better local-search foundations and useful service content without buying hundreds of thin location pages.",
    outcomes: [
      "Distinct service pages aligned to real buyer needs",
      "Consistent business information and crawlable internal navigation",
      "Technical foundations for indexing, performance, and measurement",
    ],
    considerations: [
      {
        title: "Relevance comes first",
        detail:
          "A page should answer a specific local buyer question with clear services, proof, and next steps—not repeat a city name around generic copy.",
      },
      {
        title: "Maps needs more than pages",
        detail:
          "Google Business Profile completeness, proximity, reviews, links, and prominence all influence local visibility alongside the website.",
      },
      {
        title: "No ranking guarantees",
        detail:
          "The build can improve clarity, crawlability, speed, and relevance, but no developer can honestly guarantee a first-place organic or Maps position.",
      },
    ],
    deliverables: [
      "Search-intent and content-architecture review",
      "Service pages with unique titles, descriptions, canonicals, and internal links",
      "Appropriate structured data based on verified business facts",
      "XML sitemap, robots configuration, performance checks, and Search Console readiness",
    ],
    process: [
      "Map services and buyer questions to a non-overlapping page hierarchy.",
      "Build useful pages around verified expertise, examples, and business information.",
      "Launch, measure search queries, and expand only where new evidence supports a page.",
    ],
    proof: [
      {
        projectSlug: "buzz-cannabis-platform",
        relevance:
          "A multi-location production platform with store-specific routing, structured content, and local-SEO architecture.",
      },
      {
        projectSlug: "island-view-market-liquor",
        relevance:
          "A local San Diego business site with metadata, business-focused content, and JSON-LD readiness.",
      },
    ],
    faqs: [
      {
        question: "Can you guarantee first place for web design searches?",
        answer:
          "No. Google says local rankings depend mainly on relevance, distance, and prominence, and there is no legitimate way to request or pay for a better organic local ranking.",
      },
      {
        question: "Should I create one page for every San Diego neighborhood?",
        answer:
          "Only when each location has genuinely distinct services, proof, logistics, or customer information. Near-duplicate pages that funnel visitors to the same offer can be treated as doorway abuse.",
      },
      {
        question: "What should we publish after the core service pages?",
        answer:
          "Use real sales questions, project lessons, comparisons, pricing explanations, and Search Console query data to choose resources that add information your current pages do not cover.",
      },
    ],
    relatedSlugs: [
      "san-diego-web-design",
      "small-business-web-design-san-diego",
      "website-performance-optimization-san-diego",
    ],
    keywords: [
      "local SEO web development San Diego",
      "local SEO website San Diego",
      "SEO web developer San Diego",
      "local business website SEO",
    ],
  },
  {
    slug: "law-firm-web-design-san-diego",
    navLabel: "Law Firm Websites",
    category: "San Diego web design",
    priority: 6,
    title: "Law Firm Web Design in San Diego",
    shortTitle: "Law Firm Web Design",
    description:
      "San Diego law firm web design focused on trust, mobile usability, clear practice information, dependable intake paths, and performance-conscious delivery.",
    summary:
      "I build law-firm websites that help a prospective client understand the practice, find the right contact path, and reach the firm without navigating a bloated marketing system.",
    audience:
      "Solo attorneys and small firms that need a trustworthy, professional site with clear intake rather than an oversized agency engagement.",
    outcomes: [
      "Clear practice-area and attorney information",
      "Reliable phone, email, and intake paths on mobile",
      "A fast, restrained presentation that supports credibility",
    ],
    considerations: [
      {
        title: "Trust must be factual",
        detail:
          "Credentials, jurisdictions, outcomes, and testimonials should be published only when the firm can verify and approve them.",
      },
      {
        title: "Intake needs a fallback",
        detail:
          "Forms should never be the only contact path. Phone and email options remain available when a submission service fails.",
      },
      {
        title: "Content carries ethical constraints",
        detail:
          "The firm should review jurisdiction-specific advertising rules and required disclaimers before publication.",
      },
    ],
    deliverables: [
      "Practice-area and intake-focused information architecture",
      "Professional responsive design and development",
      "Contact flows with direct phone and email fallbacks",
      "Metadata, structured content, performance checks, and launch support",
    ],
    process: [
      "Confirm approved firm information, services, audience, and intake requirements.",
      "Build the trust and contact path around verified content.",
      "Complete firm review, device QA, and production launch.",
    ],
    proof: [
      {
        projectSlug: "farida-law-san-diego",
        relevance:
          "A production San Diego law-firm website built around performance, professional presentation, and reliable contact intake.",
      },
    ],
    faqs: [
      {
        question: "Can you write legal claims or attorney biographies for us?",
        answer:
          "I can structure and edit supplied material for the web, but the firm must verify legal credentials, jurisdictions, case claims, testimonials, and advertising language before publication.",
      },
      {
        question: "Can the site support consultation requests?",
        answer:
          "Yes. The scope can include a focused request form alongside direct phone and email paths, with the fields limited to information the firm is prepared to receive securely.",
      },
      {
        question: "Do you build individual practice-area pages?",
        answer:
          "Yes, when each practice area has enough approved information to answer a distinct client need. The pages should be substantive and clearly connected to the firm rather than keyword variations.",
      },
    ],
    relatedSlugs: [
      "san-diego-web-design",
      "small-business-web-design-san-diego",
      "local-seo-web-development-san-diego",
    ],
    keywords: [
      "law firm web design San Diego",
      "attorney website design San Diego",
      "lawyer website developer",
      "legal website design",
    ],
  },
  {
    slug: "website-performance-optimization-san-diego",
    navLabel: "Performance",
    category: "San Diego web design",
    priority: 7,
    title: "Website Performance Optimization in San Diego",
    shortTitle: "Website Performance Optimization",
    description:
      "Website performance optimization for San Diego businesses dealing with slow pages, heavy themes, mobile friction, or a difficult-to-maintain frontend.",
    summary:
      "I diagnose slow or fragile website experiences and prioritize the code, assets, rendering, and layout changes that make the biggest practical difference.",
    audience:
      "Businesses with an existing website that is slow on mobile, visually unstable, overloaded with scripts, or difficult to update safely.",
    outcomes: [
      "A measured view of the bottlenecks instead of a generic speed score promise",
      "Faster loading and more stable interaction where the current platform allows it",
      "A prioritized decision between targeted fixes and a deeper rebuild",
    ],
    considerations: [
      {
        title: "Measure real pages",
        detail:
          "Homepage scores alone can hide slow product, service, form, or campaign routes. Representative templates should be tested.",
      },
      {
        title: "Protect functionality",
        detail:
          "Removing scripts or plugins without understanding what they do can break checkout, tracking, forms, or accessibility.",
      },
      {
        title: "Know when to rebuild",
        detail:
          "Some platforms can be improved incrementally; others have structural limits that make repeated optimization work more expensive than a focused replacement.",
      },
    ],
    deliverables: [
      "Representative-page performance audit",
      "Asset, rendering, script, and interaction review",
      "Prioritized fixes implemented within the agreed scope",
      "Before-and-after validation with remaining constraints documented",
    ],
    process: [
      "Capture a baseline across the pages and devices that matter.",
      "Rank issues by visitor impact, implementation risk, and platform constraint.",
      "Implement, remeasure, and document the next best improvement.",
    ],
    proof: [
      {
        projectSlug: "barbarotech-site",
        relevance:
          "A performance-focused static-friendly Next.js build with a recorded 95+ Lighthouse metric in the project case study.",
      },
      {
        projectSlug: "the-smoking-bee",
        relevance:
          "A headless commerce frontend built to improve control over storefront performance and structure.",
      },
    ],
    faqs: [
      {
        question: "Can you guarantee a perfect Lighthouse score?",
        answer:
          "No. Scores vary by page, device, network, third-party scripts, and test conditions. The goal is a faster and more stable visitor experience, measured honestly against the platform's constraints.",
      },
      {
        question: "Do I need a full redesign to make my site faster?",
        answer:
          "Not always. Image delivery, scripts, fonts, rendering, and layout issues can often be improved without changing the visual identity. An audit should determine whether targeted work is enough.",
      },
      {
        question: "Does speed affect SEO?",
        answer:
          "Performance is one part of a useful page experience, but it does not replace relevant content, reputation, links, or a complete local business presence.",
      },
    ],
    relatedSlugs: [
      "website-redesign-san-diego",
      "nextjs-developer-san-diego",
      "san-diego-web-design",
    ],
    keywords: [
      "website performance optimization San Diego",
      "speed up website San Diego",
      "Core Web Vitals developer",
      "website speed optimization",
    ],
  },
  {
    slug: "ecommerce-web-development-san-diego",
    navLabel: "Ecommerce",
    category: "Ecommerce and platforms",
    priority: 1,
    title: "Ecommerce Web Development in San Diego",
    shortTitle: "Ecommerce Web Development",
    description:
      "Ecommerce web development in San Diego for brands that need clearer product discovery, stronger mobile UX, Shopify customization, or a headless storefront.",
    summary:
      "I build and improve ecommerce storefronts around how customers find products, evaluate them, and move into checkout on mobile devices.",
    audience:
      "Store owners who have outgrown generic theme sections or need a frontend with more control than their current setup provides.",
    outcomes: [
      "Clearer product discovery and merchandising paths",
      "Mobile storefront interactions shaped around browsing and checkout intent",
      "A maintainable implementation that respects the commerce platform",
    ],
    considerations: [
      {
        title: "Keep commerce responsibilities clear",
        detail:
          "Catalog, inventory, checkout, taxes, payments, and frontend presentation may live in different systems and need an explicit ownership map.",
      },
      {
        title: "Design for catalog reality",
        detail:
          "Product count, variants, collections, photography, search, and promotion rules determine the right storefront structure.",
      },
      {
        title: "Protect checkout trust",
        detail:
          "Performance, navigation, policy information, and consistent product details all influence whether a shopper is comfortable continuing.",
      },
    ],
    deliverables: [
      "Storefront and product-discovery review",
      "Responsive ecommerce design and implementation",
      "Theme, API, or headless integration based on the selected architecture",
      "Performance, metadata, sharing, and launch validation",
    ],
    process: [
      "Review the catalog, traffic mix, current platform, and buying friction.",
      "Choose theme customization or a headless frontend based on real requirements.",
      "Implement and validate product, collection, cart, and checkout handoffs.",
    ],
    proof: [
      {
        projectSlug: "the-smoking-bee",
        relevance:
          "A headless Shopify storefront using Next.js and the Storefront API for product discovery, mobile UX, and SEO control.",
      },
      {
        projectSlug: "goso-gummies",
        relevance:
          "A custom Shopify homepage implemented in Liquid for a predominantly mobile audience.",
      },
    ],
    faqs: [
      {
        question: "Do you only build Shopify stores?",
        answer:
          "Shopify is a strong fit for many catalogs, and it is where the current portfolio has the clearest commerce proof. The architecture should still be selected from the business's catalog, operations, and integration requirements.",
      },
      {
        question: "Should my store use a custom theme or a headless frontend?",
        answer:
          "A customized theme is usually simpler to operate. Headless becomes useful when the storefront needs substantially more frontend control and the business accepts the additional engineering responsibility.",
      },
      {
        question: "Can you improve an existing ecommerce homepage?",
        answer:
          "Yes. A focused homepage, collection, or product-template improvement can be scoped without rebuilding checkout or migrating the entire catalog.",
      },
    ],
    relatedSlugs: [
      "shopify-freelancer",
      "headless-shopify-developer",
      "website-performance-optimization-san-diego",
    ],
    keywords: [
      "ecommerce web development San Diego",
      "ecommerce website developer San Diego",
      "online store web design San Diego",
      "custom ecommerce development",
    ],
  },
  {
    slug: "shopify-freelancer",
    navLabel: "Shopify",
    category: "Ecommerce and platforms",
    priority: 2,
    title: "Shopify Freelancer for Custom Theme and UX Improvements",
    shortTitle: "Shopify Freelancer",
    description:
      "Shopify freelancer services for custom theme edits, performance improvements, and conversion-focused ecommerce UX.",
    summary:
      "I help ecommerce brands improve Shopify storefront UX, speed, and conversion paths with clean, maintainable implementation.",
    audience:
      "Shopify store owners who need professional customization beyond page builders and generic templates.",
    outcomes: [
      "Higher quality product discovery and cart flow",
      "Faster storefront performance on mobile devices",
      "Cleaner theme code for easier long-term maintenance",
    ],
    considerations: [
      {
        title: "Work with the theme",
        detail:
          "Custom sections should respect Shopify's editor, product data, and existing theme conventions instead of creating fragile one-off markup.",
      },
      {
        title: "Prioritize the buying path",
        detail:
          "Homepage polish matters, but collection, product, cart, navigation, search, and mobile behavior need to remain coherent.",
      },
      {
        title: "Control app weight",
        detail:
          "Every app adds operational value, storefront cost, or both. Existing scripts should be understood before introducing another dependency.",
      },
    ],
    deliverables: [
      "Storefront UX audit and priority roadmap",
      "Custom section and theme implementation",
      "Performance and usability optimization",
      "Post-launch support for iteration and fixes",
    ],
    process: [
      "Review storefront analytics context and friction points.",
      "Implement high-impact changes in theme code.",
      "Validate performance and conversion paths across representative devices.",
    ],
    proof: [
      {
        projectSlug: "goso-gummies",
        relevance:
          "A custom mobile-first Shopify homepage built in Liquid and theme code rather than a page builder.",
      },
      {
        projectSlug: "the-smoking-bee",
        relevance:
          "A deeper Shopify implementation showing Storefront API and headless frontend experience.",
      },
    ],
    faqs: [
      {
        question: "Do you work with existing Shopify themes?",
        answer:
          "Yes. I can improve and extend your current theme, or build custom sections tailored to your catalog and sales flow.",
      },
      {
        question: "Can you support ongoing Shopify updates?",
        answer:
          "Yes. Ongoing support is available for theme updates, new sections, performance work, and fixes.",
      },
      {
        question: "Do you use Shopify page builders?",
        answer:
          "I can work around an existing builder when necessary, but custom theme and Liquid work usually provides better control when the requirement goes beyond what standard sections can support.",
      },
    ],
    relatedSlugs: [
      "ecommerce-web-development-san-diego",
      "headless-shopify-developer",
      "website-performance-optimization-san-diego",
    ],
    keywords: [
      "Shopify freelancer",
      "Shopify developer freelancer",
      "Shopify theme customization",
      "ecommerce conversion optimization",
    ],
  },
  {
    slug: "headless-shopify-developer",
    navLabel: "Headless Shopify",
    category: "Ecommerce and platforms",
    priority: 3,
    title: "Headless Shopify Developer for Custom Storefronts",
    shortTitle: "Headless Shopify Developer",
    description:
      "Headless Shopify development with Next.js, TypeScript, GraphQL, and the Storefront API for brands that need more frontend control than a theme provides.",
    summary:
      "I build custom Shopify frontends for stores with a clear reason to separate the customer experience from the standard theme layer.",
    audience:
      "Established Shopify merchants with frontend requirements, content structure, or performance goals that cannot be addressed cleanly inside a conventional theme.",
    outcomes: [
      "Greater control over storefront routing, rendering, and interaction",
      "A custom product-discovery experience backed by Shopify commerce data",
      "A documented architecture that makes the extra operational responsibility explicit",
    ],
    considerations: [
      {
        title: "Headless is not a default upgrade",
        detail:
          "It adds deployment, preview, integration, and maintenance responsibilities. A theme remains the better choice when the business does not need that control.",
      },
      {
        title: "Checkout stays coordinated",
        detail:
          "The frontend must preserve product, variant, cart, customer, and checkout behavior across the handoff to Shopify.",
      },
      {
        title: "Content needs an owner",
        detail:
          "Marketing content may remain in Shopify or move to another content system, and that workflow should be settled before implementation.",
      },
    ],
    deliverables: [
      "Headless-fit assessment and architecture plan",
      "Next.js storefront connected through Shopify APIs",
      "Product, collection, cart, content, and metadata routes",
      "Deployment, preview, performance, and maintenance documentation",
    ],
    process: [
      "Confirm why theme customization is insufficient and identify operational owners.",
      "Build the storefront foundation and representative commerce flows.",
      "Validate data, checkout handoffs, metadata, and production deployment.",
    ],
    proof: [
      {
        projectSlug: "the-smoking-bee",
        relevance:
          "An end-to-end headless Shopify storefront using Next.js, TypeScript, GraphQL, and the Storefront API.",
      },
    ],
    faqs: [
      {
        question: "Is headless Shopify always faster?",
        answer:
          "No. It provides more implementation control, but speed still depends on data fetching, rendering, third-party scripts, images, caching, and the quality of the frontend code.",
      },
      {
        question: "Does Shopify still manage products and checkout?",
        answer:
          "Typically yes. Shopify remains the commerce system while the custom frontend consumes product data and hands customers into the appropriate cart or checkout flow.",
      },
      {
        question: "Can we move back to a theme later?",
        answer:
          "The Shopify catalog remains usable, but a theme would need its own presentation work. A headless decision should be documented so the business understands its long-term options.",
      },
    ],
    relatedSlugs: [
      "shopify-freelancer",
      "ecommerce-web-development-san-diego",
      "nextjs-developer-san-diego",
    ],
    keywords: [
      "headless Shopify developer",
      "Next.js Shopify developer",
      "Shopify Storefront API developer",
      "custom Shopify frontend",
    ],
  },
  {
    slug: "nextjs-developer-san-diego",
    navLabel: "Next.js",
    category: "Custom development",
    priority: 1,
    title: "Next.js Developer in San Diego",
    shortTitle: "Next.js Developer",
    description:
      "San Diego Next.js developer for fast marketing sites, ecommerce frontends, dynamic content platforms, and custom full-stack applications.",
    summary:
      "I use Next.js when a project benefits from strong routing, server and client rendering options, static generation, TypeScript, and a maintainable React foundation.",
    audience:
      "Businesses and product teams that have a real custom frontend requirement and want direct access to the developer making architecture and implementation decisions.",
    outcomes: [
      "A rendering and routing strategy suited to the project's content and deployment needs",
      "Typed, reusable frontend code with clear server and client boundaries",
      "Search, performance, and accessibility foundations integrated into the build",
    ],
    considerations: [
      {
        title: "Choose rendering per route",
        detail:
          "Static generation, server rendering, and client behavior solve different problems. The whole application should not default to one mode without a reason.",
      },
      {
        title: "Protect the client boundary",
        detail:
          "Interactive components should not force content and data that can remain server-rendered into unnecessary browser JavaScript.",
      },
      {
        title: "Plan deployment early",
        detail:
          "Static hosting, server functions, image behavior, APIs, environment variables, and form delivery affect what the application can do in production.",
      },
    ],
    deliverables: [
      "Application and route architecture",
      "Next.js and TypeScript implementation",
      "Data, API, CMS, or commerce integrations within scope",
      "Testing, performance review, deployment, and handoff",
    ],
    process: [
      "Define the user flow, data boundaries, rendering needs, and deployment constraints.",
      "Build the smallest complete vertical slice before expanding the route system.",
      "Test production behavior, static or server output, and operational handoff.",
    ],
    proof: [
      {
        projectSlug: "buzz-cannabis-platform",
        relevance:
          "A production Next.js platform with multi-location routes, structured content, and dynamic metadata.",
      },
      {
        projectSlug: "the-smoking-bee",
        relevance:
          "A Next.js commerce frontend integrated with Shopify through GraphQL.",
      },
    ],
    faqs: [
      {
        question: "Is Next.js right for every website?",
        answer:
          "No. A project should use the simplest maintainable system that meets its content, interaction, integration, and deployment requirements.",
      },
      {
        question: "Can a Next.js site be exported as static files?",
        answer:
          "Yes, when its routes and features are compatible with static export. Server-only APIs and runtime rendering require a server-capable deployment instead.",
      },
      {
        question: "Can you work in an existing Next.js codebase?",
        answer:
          "Yes. The first step is reviewing its version, routing model, data flow, deployment, dependencies, and current test or lint setup before making changes.",
      },
    ],
    relatedSlugs: [
      "custom-web-app-development-san-diego",
      "headless-shopify-developer",
      "freelance-web-developer-san-diego",
    ],
    keywords: [
      "Next.js developer San Diego",
      "Next.js freelancer",
      "React developer San Diego",
      "Next.js development services",
    ],
  },
  {
    slug: "custom-web-app-development-san-diego",
    navLabel: "Web Applications",
    category: "Custom development",
    priority: 2,
    title: "Custom Web Application Development in San Diego",
    shortTitle: "Custom Web Application Development",
    description:
      "Custom web application development in San Diego for operational tools, customer portals, integrations, data workflows, and purpose-built business software.",
    summary:
      "I design and build focused web applications when a business workflow needs more than a marketing page or a collection of disconnected subscriptions.",
    audience:
      "Owners and operators with a specific workflow, data, customer, or integration problem that can be defined and validated in stages.",
    outcomes: [
      "A scoped application centered on the real workflow rather than a speculative feature list",
      "Clear data, permission, integration, and deployment boundaries",
      "A staged path from useful pilot to hardened production system",
    ],
    considerations: [
      {
        title: "Start with the operation",
        detail:
          "Users, decisions, exceptions, inputs, outputs, and existing tools need to be mapped before screens or database tables are finalized.",
      },
      {
        title: "Build a complete slice",
        detail:
          "A narrow workflow that works end to end is more useful for validation than a large collection of disconnected screens.",
      },
      {
        title: "Plan ownership and risk",
        detail:
          "Authentication, authorization, backups, observability, data retention, and support become part of the product once real operations depend on it.",
      },
    ],
    deliverables: [
      "Workflow and requirements definition",
      "Application architecture, interface, and implementation",
      "Database, API, automation, or hardware integrations within scope",
      "Testing, deployment, monitoring recommendations, and documentation",
    ],
    process: [
      "Map the current process and define the smallest valuable production outcome.",
      "Build and validate an end-to-end workflow with representative users or data.",
      "Harden permissions, failure handling, deployment, and support as adoption grows.",
    ],
    proof: [
      {
        projectSlug: "qr-badge-system",
        relevance:
          "A serverless QR identity and scan-tracking system integrated with database services and Zebra label hardware.",
      },
      {
        projectSlug: "buzz-cannabis-platform",
        relevance:
          "A production platform supporting multiple locations, structured content, and custom backend utilities.",
      },
    ],
    faqs: [
      {
        question: "How much does a custom web application cost?",
        answer:
          "It depends on users, workflows, integrations, data, permissions, reliability requirements, and support. Custom software is quoted after a focused discovery conversation rather than forced into a website package.",
      },
      {
        question: "Can we begin with a prototype?",
        answer:
          "Yes. A prototype or narrow pilot can validate workflow and usability, but production use still requires appropriate security, failure handling, data management, and operational planning.",
      },
      {
        question: "Can the application integrate with existing tools?",
        answer:
          "Often, provided those tools offer suitable APIs, exports, webhooks, or other supported integration methods. Access, limits, and data ownership are reviewed during scoping.",
      },
    ],
    relatedSlugs: [
      "nextjs-developer-san-diego",
      "ai-automation-freelancer",
      "freelance-web-developer-san-diego",
    ],
    keywords: [
      "custom web app development San Diego",
      "web application developer San Diego",
      "custom business software developer",
      "full-stack developer San Diego",
    ],
  },
  {
    slug: "ai-automation-freelancer",
    navLabel: "AI Automation",
    category: "Custom development",
    priority: 3,
    title: "AI Automation Freelancer for Business Workflows",
    shortTitle: "AI Automation Freelancer",
    description:
      "AI automation freelancer services for business teams. Build practical workflow automation, API integrations, and internal AI-assisted tools.",
    summary:
      "I build practical AI automation systems that reduce repetitive operations, speed up responses, and improve execution quality.",
    audience:
      "Operations-heavy teams that want to automate manual workflows and connect AI to tools they already use.",
    outcomes: [
      "Reduced manual task load and shorter turnaround times",
      "More consistent data handling across systems",
      "Actionable AI features integrated into real workflows",
    ],
    considerations: [
      {
        title: "Automate a defined decision",
        detail:
          "A workflow needs clear inputs, outputs, owners, and escalation paths before AI can improve it reliably.",
      },
      {
        title: "Keep humans at the right boundary",
        detail:
          "High-impact, ambiguous, or sensitive decisions should retain review and recovery steps instead of silently trusting model output.",
      },
      {
        title: "Measure operational value",
        detail:
          "A pilot should define what success means in time saved, consistency, response speed, or error reduction before expanding.",
      },
    ],
    deliverables: [
      "Workflow mapping and bottleneck review",
      "Automation implementation using APIs, triggers, and routing",
      "AI-assisted prompts, validation, and guardrails",
      "Operational handoff with monitoring recommendations",
    ],
    process: [
      "Audit the existing workflow and identify repetitive work.",
      "Build a focused automation pilot with defined success criteria.",
      "Expand and harden the system after successful validation.",
    ],
    proof: [
      {
        projectSlug: "qr-badge-system",
        relevance:
          "A workflow-focused system connecting identity data, scan events, serverless processing, and physical label output.",
      },
    ],
    faqs: [
      {
        question: "Is this just chatbot setup?",
        answer:
          "No. The focus is operational automation: intake, routing, data sync, reporting, and task acceleration where AI adds practical value.",
      },
      {
        question: "Can AI automation connect to our existing tools?",
        answer:
          "Often. Typical integration paths include APIs, webhooks, forms, structured exports, databases, and supported connectors.",
      },
      {
        question: "How do you handle unreliable AI output?",
        answer:
          "The workflow can constrain inputs, validate structured outputs, require human review at sensitive steps, log failures, and provide a recovery path instead of treating every response as correct.",
      },
    ],
    relatedSlugs: [
      "custom-web-app-development-san-diego",
      "nextjs-developer-san-diego",
      "freelance-web-developer-san-diego",
    ],
    keywords: [
      "AI automation freelancer",
      "freelance AI developer",
      "workflow automation consultant",
      "business process automation",
    ],
  },
];

export const SERVICE_CATEGORIES: ServiceLandingCategory[] = [
  "San Diego web design",
  "Ecommerce and platforms",
  "Custom development",
];

export function getServiceBySlug(slug: string) {
  return SERVICE_LANDINGS.find((service) => service.slug === slug);
}
