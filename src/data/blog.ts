export type BlogPost = {
  slug: string;
  title: string;
  category: "Shopify" | "Website strategy" | "Behind the build";
  excerpt: string;
  publishedAt: string;
  image: string;
  imageAlt: string;
  intro: string;
  sections: { id: string; title: string; paragraphs: string[]; points?: string[] }[];
  links: { label: string; href: string }[];
};

// Add new articles at the top. Dates use YYYY-MM-DD; each slug becomes /blog/<slug>/.
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "what-a-custom-shopify-theme-should-do",
    title: "What a custom Shopify theme should make easier.",
    category: "Shopify",
    excerpt: "A distinctive storefront matters. So do finding a product, understanding it, and getting to the cart on a phone.",
    publishedAt: "2026-10-29",
    image: "/projects/sour-chamoy-bites.jpg",
    imageAlt: "Custom Sour Chamoy Bites Shopify storefront",
    intro: "A custom theme is an opportunity to make a store fit the way its customers shop. Before choosing an animation or a homepage layout, I want to understand the catalog, the questions a customer asks, and the next step each page needs to make clear.",
    sections: [
      {
        id: "start-with-shopping",
        title: "Start with the shopping path.",
        paragraphs: ["A homepage introduces the brand, but it is only one part of the store. A customer may arrive directly on a product page. That page needs to explain what is being sold, show the important choices, and make the purchase action easy to find without sending the customer back to the beginning.", "For a small catalog, clear categories and useful product information can matter more than a complex menu. As the range grows, the navigation should still help someone narrow their choices. Design the route from discovery to product to cart before adding more features."],
      },
      {
        id: "mobile-first",
        title: "Give the mobile layout its own attention.",
        paragraphs: ["Shrinking a desktop page is not the same as designing a mobile store. Product choices need room to be read and tapped. A sticky element should not cover the cart button. Images should explain the product without pushing every useful detail several screens down.", "I check long product names, sold-out states, multiple variants, and empty carts alongside the ideal shopping path. These ordinary states are part of the customer experience, and they should feel as considered as the first impression."],
      },
      {
        id: "merchant-control",
        title: "Think about the person updating the store.",
        paragraphs: ["The store owner needs a practical way to keep the storefront current. In custom Liquid work, I plan which content belongs in the theme editor and which comes from the store's products and collections. A promotion should not require a developer to rewrite a whole page.", "The Sour Chamoy Bites project is an example of a custom branded Shopify storefront. Goso Gummies shows a different scope: custom homepage and theme work inside an existing store. Those are different starting points, so the right recommendation depends on what is already working."],
      },
      {
        id: "choose-scope",
        title: "Choose the smallest useful scope.",
        paragraphs: ["Sometimes a store needs a complete new theme. Sometimes it needs a clearer product template, a better mobile menu, or a handful of custom sections. Start with a review of the existing store and name the specific friction you want to remove. Then the design and development scope has a job to do.", "When you enquire about Shopify work, send your store URL, the theme you use, and the three changes that would make the biggest difference to your day. That is enough to start a useful conversation."],
      },
    ],
    links: [{ label: "Explore Shopify development", href: "/services/shopify-developer/" }, { label: "See Sour Chamoy Bites", href: "/projects/sour-chamoy-bites/" }],
  },
  {
    slug: "local-business-website-clear-next-step",
    title: "Give every local business website a clear next step.",
    category: "Behind the build",
    excerpt: "A restaurant guest and a stranded driver need very different things. The website should meet each person where they are.",
    publishedAt: "2026-10-29",
    image: "/projects/rancho-bernardo-towing.jpg",
    imageAlt: "Rancho Bernardo Towing local service website",
    intro: "The most useful starting question for a business website is simple: what is the visitor trying to do right now? A person deciding where to eat has different needs from someone looking for a tow truck. The structure should make that difference visible.",
    sections: [
      {
        id: "visitor-context",
        title: "Design for the situation, not just the industry.",
        paragraphs: ["Someone comparing restaurants might want the menu, opening hours, directions, or a way to order. Someone looking for towing may be standing beside a vehicle with one hand available and little patience for a long introduction. In each case, the first screen needs to help with the immediate task.", "That does not mean every page needs a bigger button. It means the page needs a priority. If every link has the same emphasis, the visitor has to decide what you consider important before they can make their own decision."],
      },
      {
        id: "two-examples",
        title: "Two businesses, two useful paths.",
        paragraphs: ["Wagyu Shawarma Grill brings menu browsing, online ordering, catering, and location information together. A guest can choose the route that matches the occasion. The ordering destination is a real next step, rather than a decorative button that ends at another introduction.", "Rancho Bernardo Towing puts direct calls alongside service information and a gallery of actual work. A visitor can contact dispatch or check whether a service fits the situation. The website supports the decision without making someone complete an unnecessary form first."],
      },
      {
        id: "useful-details",
        title: "Put practical details near the action.",
        paragraphs: ["A call button is more useful when the visitor knows who will answer and what to ask. A directions link is more useful beside a clear address. An order link is more useful when the guest understands where it will take them. Context makes a short action feel understandable."],
        points: ["Use descriptive labels such as View the menu, Call dispatch, or Request a consultation.", "Keep contact details available as text as well as links.", "Check every phone, map, and ordering destination on a real mobile-sized screen.", "Make hours, service areas, and availability easy for the business to keep accurate."],
      },
      {
        id: "review-your-site",
        title: "Try the first-minute test.",
        paragraphs: ["Open your website as though you have never seen it. Can you explain what the business does, decide whether it fits, and find the next step? Repeat that check from a service page rather than the homepage. Search visitors do not always enter through the front door.", "A stronger website often starts by removing a detour. Once the main path is clear, the photography, copy, and design can reinforce it instead of competing with it."],
      },
    ],
    links: [{ label: "Explore the live work", href: "/projects/" }, { label: "Plan a business website", href: "/services/small-business-web-design-san-diego/" }],
  },
  {
    slug: "prepare-for-a-website-redesign",
    title: "What to bring to your first website redesign conversation.",
    category: "Website strategy",
    excerpt: "You do not need a finished brief. A clear goal, a few real examples, and access to your own content are a useful start.",
    publishedAt: "2026-10-29",
    image: "/projects/partner-swipe.jpg",
    imageAlt: "PartnerSwipe business website",
    intro: "A useful redesign conversation does not start with choosing a color. It starts with what the website needs to do for the business. A little preparation helps us spend that conversation on the decisions that will actually shape the build.",
    sections: [
      {
        id: "define-goal",
        title: "Name the problem in plain language.",
        paragraphs: ["Tell me what feels difficult today. Customers cannot find the menu. You answer the same service questions on every call. Updating the homepage means asking someone to edit code. The mobile store is hard to browse. These descriptions are more useful than asking for a website that simply looks modern.", "Then choose the most valuable visitor action. It could be a call, an order, a booking, or a qualified enquiry. There can be supporting actions, but agreeing on the main one makes the later design choices easier to assess."],
      },
      {
        id: "gather-material",
        title: "Bring the things that are already yours.",
        paragraphs: ["Your current website, logo files, product photography, business details, and service descriptions give the project something real to work with. They do not have to be perfectly organized. It helps to know what exists, what is approved, and what needs to be created."],
        points: ["Your current URL and any pages you want to keep.", "A short list of services or product categories.", "Your preferred contact details and the next step customers should take.", "Two or three websites you like, with one specific reason for each.", "Any booking, ordering, payment, or inventory tools the website needs to connect to."],
      },
      {
        id: "scope-care",
        title: "Talk about the site after launch.",
        paragraphs: ["Who will update the hours? How often do products or services change? Do you need to publish articles yourself? A site that changes once a year has a different editing need from a store with frequent promotions. The maintenance plan should follow that reality.", "Separate the setup work from ongoing care and outside costs. Domain registration, platform subscriptions, paid apps, and usage fees should be clear before a quote is accepted. A starting price is useful only when you can see what the scope includes."],
      },
      {
        id: "first-direction",
        title: "Use the first direction to make a decision.",
        paragraphs: ["At BarbaroTech, the free custom demo lets you react to a direction before moving forward. It gives the conversation a concrete page and a visible hierarchy. The useful feedback is about what the page makes clear, what it leaves out, and whether it feels right for your customers.", "You do not need every answer before getting in touch. Send the business, the current site if you have one, and the goal. From there, we can decide on a sensible starting scope together."],
      },
    ],
    links: [{ label: "Request a free custom demo", href: "/contact/?context=Free%20custom%20website%20demo" }, { label: "Compare starting prices", href: "/pricing/" }],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function blogReadingMinutes(post: BlogPost): number {
  const words = [post.intro, ...post.sections.flatMap((section) => [section.title, ...section.paragraphs, ...(section.points ?? [])])].join(" ").trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatBlogDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}
