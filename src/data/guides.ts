export type GuideCategory =
  | "Choose a web partner"
  | "Plan the project"
  | "Protect the investment";

export type GuideSection = {
  id: string;
  title: string;
  paragraphs: string[];
  points?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  shortTitle: string;
  category: GuideCategory;
  priority: number;
  description: string;
  summary: string;
  directAnswer: string;
  checklistTitle: string;
  checklist: string[];
  sections: GuideSection[];
  faqs: { question: string; answer: string }[];
  relatedGuideSlugs: string[];
  relatedServiceSlugs: string[];
  keywords: string[];
};

export const GUIDE_CATEGORIES: GuideCategory[] = [
  "Choose a web partner",
  "Plan the project",
  "Protect the investment",
];

export const GUIDES: Guide[] = [
  {
    slug: "how-to-choose-a-web-designer",
    title: "How to Choose a Web Designer for Your Business",
    shortTitle: "Choose a Web Designer",
    category: "Choose a web partner",
    priority: 1,
    description:
      "A practical checklist for choosing a web designer based on relevant work, scope clarity, ownership, communication, and support—not sales claims.",
    summary:
      "The right web designer is not automatically the person with the flashiest portfolio or the lowest quote. The best fit can explain your business problem, show relevant shipped work, define what is included, and leave you with clear ownership and support terms.",
    directAnswer:
      "Shortlist designers whose real work matches your type of project, then compare their process, written scope, technical judgment, communication, ownership terms, and post-launch support. Ask the same questions of every candidate so you are comparing delivery—not presentation style.",
    checklistTitle: "Web designer evaluation scorecard",
    checklist: [
      "Relevant live work can be verified",
      "The proposal names pages, features, responsibilities, and exclusions",
      "The person selling the project is identified separately from the person doing it",
      "Mobile behavior, performance, accessibility, and SEO foundations are discussed",
      "Domain, hosting, source code, analytics, and content ownership are explicit",
      "Revision limits and approval points are written down",
      "Launch, backups, updates, and support have a clear owner",
      "The next step is specific and does not rely on pressure or a ranking guarantee",
    ],
    sections: [
      {
        id: "start-with-fit",
        title: "Start with project fit, not a generic ranking",
        paragraphs: [
          "A strong restaurant site, Shopify storefront, law-firm site, and custom web application require different decisions. Begin by naming the primary visitor action, the content you already have, the integrations you need, and who will maintain the site. A designer should be able to explain how those facts change the build.",
          "Search for relevant evidence rather than the phrase “best web designer.” Live project links, clear case-study constraints, and an honest explanation of tradeoffs reveal more than awards or unsupported superlatives.",
        ],
        points: [
          "Ask which past project is most similar and why",
          "Ask what would make the project a poor fit",
          "Ask what the designer would simplify before adding scope",
        ],
      },
      {
        id: "compare-the-scope",
        title: "Compare what the quote actually buys",
        paragraphs: [
          "Two quotes with different totals may not describe the same product. One may include strategy, copy support, custom development, analytics, and post-launch care while another covers only assembly. Normalize the proposals before comparing price.",
          "Look for named deliverables, assumptions, client responsibilities, revision rules, payment milestones, third-party costs, and an acceptance process. Ambiguity is not flexibility when it affects budget or ownership.",
        ],
      },
      {
        id: "test-the-working-relationship",
        title: "Test the working relationship before signing",
        paragraphs: [
          "Notice whether questions receive direct answers and whether risks are raised early. A useful discovery conversation should improve your understanding of the project even before you hire anyone.",
          "Confirm who attends meetings, who writes and designs, who develops, and who handles support. For a solo freelancer those roles may be one person; for an agency they may move across several specialists. Either model can work when the handoffs are clear.",
        ],
      },
    ],
    faqs: [
      {
        question: "How many web designers should I interview?",
        answer:
          "Two or three serious candidates are usually enough to compare approach and scope without turning the process into unpaid speculative work. Use the same project brief and questions for each conversation.",
      },
      {
        question: "Should I ask for a free homepage design first?",
        answer:
          "A small, clearly bounded demonstration can help when expectations are explicit. Do not assume a complete custom design should be produced before scope, content, and commercial terms are understood.",
      },
    ],
    relatedGuideSlugs: ["questions-to-ask-a-web-developer", "website-proposal-checklist"],
    relatedServiceSlugs: ["san-diego-web-design", "freelance-web-developer-san-diego"],
    keywords: [
      "how to choose a web designer",
      "hire a web designer",
      "best web designer for small business",
      "web designer checklist",
    ],
  },
  {
    slug: "freelance-web-developer-vs-agency",
    title: "Freelance Web Developer vs. Agency: Which Is the Better Fit?",
    shortTitle: "Freelancer vs. Agency",
    category: "Choose a web partner",
    priority: 2,
    description:
      "Compare a freelance web developer with a web agency across communication, capacity, specialization, cost structure, continuity, and project risk.",
    summary:
      "A freelancer usually offers direct communication and fewer handoffs. An agency may offer more simultaneous capacity and specialist coverage. The better choice depends on project complexity, deadline, internal ownership, and how much coordination you want to manage.",
    directAnswer:
      "Choose a freelancer when direct access, a focused scope, and continuity with one accountable builder matter most. Choose an agency when the work genuinely needs several disciplines operating at the same time or requires capacity and coverage a solo provider cannot truthfully promise.",
    checklistTitle: "Choose the delivery model",
    checklist: [
      "List the disciplines the project truly needs",
      "Decide whether one owner or parallel specialists matter more",
      "Confirm the actual people assigned to the work",
      "Compare included work rather than hourly rates alone",
      "Ask how absence, overload, or staff changes are handled",
      "Identify who maintains the site after launch",
      "Confirm response expectations and meeting cadence",
      "Match the provider's capacity to the deadline",
    ],
    sections: [
      {
        id: "directness-and-handoffs",
        title: "Directness versus specialist handoffs",
        paragraphs: [
          "With a freelancer, the person discussing a design or technical decision is often the person implementing it. That can reduce translation loss and make small decisions faster. It also means one person’s availability and range matter more.",
          "An agency can distribute strategy, design, copy, development, and account management across specialists. That can add useful depth, but every handoff needs ownership. Ask whether the team shown in the pitch is the team assigned after signing.",
        ],
      },
      {
        id: "capacity-and-risk",
        title: "Capacity should match the real deadline",
        paragraphs: [
          "A focused marketing site often does not require a large team. A multilingual platform migration, complex brand program, or launch with several integrations may benefit from parallel work. The deciding factor is not company size; it is whether the delivery plan matches the dependency graph.",
          "Ask both models how they handle unavailable contributors, delayed client feedback, scope changes, and post-launch incidents. A clear contingency plan matters more than a generic promise of responsiveness.",
        ],
      },
      {
        id: "compare-total-cost",
        title: "Compare total cost and continuity",
        paragraphs: [
          "Agency overhead can support project management and coverage. Freelancer pricing can reflect a leaner operating model. Neither is automatically cheaper after you account for strategy, revisions, content, maintenance, and third-party services.",
          "Consider who will understand the site six months later. Continuity has value when the same person maintains the code and remembers why decisions were made.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is a freelancer suitable for a serious business website?",
        answer:
          "Yes, when the freelancer has relevant production work, a clear process, and capacity for the scope. Evaluate evidence and delivery controls rather than company size alone.",
      },
      {
        question: "Is an agency always faster than a freelancer?",
        answer:
          "No. Parallel staffing can accelerate some projects, while added handoffs can slow others. The schedule depends on dependencies, approvals, content readiness, and the people actually assigned.",
      },
    ],
    relatedGuideSlugs: ["how-to-choose-a-web-designer", "questions-to-ask-a-web-developer"],
    relatedServiceSlugs: ["freelance-web-developer-san-diego"],
    keywords: [
      "freelance web developer vs agency",
      "web agency vs freelancer",
      "hire freelance web developer",
      "freelancer or agency for website",
    ],
  },
  {
    slug: "how-much-does-a-small-business-website-cost",
    title: "How Much Does a Small Business Website Cost?",
    shortTitle: "Small Business Website Cost",
    category: "Plan the project",
    priority: 1,
    description:
      "Understand small-business website cost drivers, including page scope, custom design, content, integrations, ecommerce, maintenance, hosting, and third-party services.",
    summary:
      "A useful website budget separates the one-time build from recurring care and third-party costs. The total changes with content readiness, number of unique page types, custom functionality, integrations, ecommerce, and who owns updates after launch.",
    directAnswer:
      "Price the project in three buckets: setup and implementation, recurring website care, and outside platform costs. Ask for a written scope tied to business requirements instead of comparing a single headline number from proposals that may include different work.",
    checklistTitle: "Website budget worksheet",
    checklist: [
      "One-time strategy, design, and development",
      "Copywriting, editing, photography, or asset preparation",
      "Unique pages and reusable page templates",
      "Forms, booking, payments, ecommerce, or system integrations",
      "Content migration and redirect planning",
      "Hosting, maintenance, backups, and support",
      "Domain, email, apps, payment processing, and usage fees",
      "Contingency for approved scope changes",
    ],
    sections: [
      {
        id: "three-cost-buckets",
        title: "Separate three kinds of cost",
        paragraphs: [
          "The setup fee pays for planning, design, implementation, content placement, testing, and launch work defined in the proposal. Recurring care may cover hosting, updates, monitoring, support, and improvements. Third-party services can include a domain, email, booking platform, ecommerce apps, transaction fees, or paid media tools.",
          "Keeping these categories separate prevents an inexpensive setup quote from hiding expensive recurring software, and prevents a higher quote with ongoing support from being compared to a build-only handoff.",
        ],
      },
      {
        id: "what-changes-price",
        title: "The biggest price drivers",
        paragraphs: [
          "The number of pages matters less than the number of distinct problems. Ten pages using one stable layout may be simpler than three pages with a configurator, membership system, or unusual content workflow.",
          "Custom visual direction, copywriting, photography, product catalogs, migration, accessibility remediation, integrations, analytics, and accelerated deadlines all create real work. A good proposal names which of these are included.",
        ],
        points: [
          "Content readiness often changes both cost and schedule",
          "Existing systems should be audited before migration is priced",
          "Ecommerce requires operational decisions beyond visual design",
        ],
      },
      {
        id: "compare-estimates",
        title: "How to compare website estimates",
        paragraphs: [
          "Give every provider the same requirements and ask them to state assumptions. Compare page types, features, content responsibilities, revision limits, testing, launch work, ownership, and support—not just totals.",
          "If the business is still validating its offer, a smaller first release may be more responsible than building every imagined feature. Ask what can launch now and what can wait for evidence.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why do website quotes vary so much?",
        answer:
          "The proposals may cover different products: template configuration, custom design, content work, integrations, ecommerce, or ongoing support. Normalize the scope before treating the totals as comparable.",
      },
      {
        question: "Should hosting be included in the website price?",
        answer:
          "It can be bundled into care or billed separately. What matters is that the hosting owner, service level, renewal cost, backups, and migration path are clear before signing.",
      },
    ],
    relatedGuideSlugs: ["website-maintenance-costs-explained", "website-proposal-checklist"],
    relatedServiceSlugs: ["small-business-web-design-san-diego"],
    keywords: [
      "small business website cost",
      "how much does a website cost",
      "web design pricing",
      "website development cost",
    ],
  },
  {
    slug: "how-long-does-a-business-website-take",
    title: "How Long Does It Take to Build a Business Website?",
    shortTitle: "Website Timeline",
    category: "Plan the project",
    priority: 2,
    description:
      "Plan a realistic website timeline by accounting for scope, content readiness, feedback, integrations, migration, testing, and launch dependencies.",
    summary:
      "A website schedule is controlled by dependencies, not page count alone. Content, decision-makers, integrations, revision cycles, migration, and launch access can take longer than writing the front-end code.",
    directAnswer:
      "A focused site can move quickly when content, access, and one decision-maker are ready. Custom design, ecommerce, integrations, migrations, and multiple approval layers add time. Ask for milestone dates and client-input deadlines rather than one unsupported launch promise.",
    checklistTitle: "Timeline readiness check",
    checklist: [
      "A single project owner can approve decisions",
      "Required pages and features are agreed",
      "Copy and images have an owner and due date",
      "Domain, analytics, hosting, and platform access are available",
      "Integration documentation and contacts are known",
      "Feedback windows are on the calendar",
      "Migration and redirect requirements are inventoried",
      "Launch has a rollback and post-launch review plan",
    ],
    sections: [
      {
        id: "schedule-drivers",
        title: "What actually controls the schedule",
        paragraphs: [
          "A small brochure site with approved content and one feedback owner may move through design and development in a compact sequence. A redesign with missing copy, several stakeholders, product data, or external systems has more dependencies even if the visible page count looks similar.",
          "The most reliable schedules make both provider work and client work visible. Each milestone should name the input needed, the review window, and what happens when a dependency arrives late.",
        ],
      },
      {
        id: "critical-path",
        title: "Find the critical path before work begins",
        paragraphs: [
          "Identify the decisions that block everything downstream: brand direction, navigation, product structure, content approval, account access, and integration behavior. Resolve or time-box those first.",
          "Work can overlap when dependencies allow it. Development can begin on stable components while final copy is being edited, but building against placeholder assumptions creates rework when the real content changes the layout.",
        ],
      },
      {
        id: "launch-without-rushing",
        title: "Protect the launch without padding the plan",
        paragraphs: [
          "Reserve time for mobile testing, forms, analytics, redirects, browser checks, metadata, accessibility, and final content review. These are part of delivery, not optional polish after the deadline.",
          "When a fixed event controls the date, reduce scope before compressing every quality check. A smaller stable launch is easier to extend than a large rushed release.",
        ],
      },
    ],
    faqs: [
      {
        question: "What usually delays a website project?",
        answer:
          "Late content, unclear approval ownership, changing requirements, missing account access, and undiscovered integration constraints are common causes. A dependency-based plan exposes them early.",
      },
      {
        question: "Can design and development happen at the same time?",
        answer:
          "Yes, once shared rules and stable components exist. Parallel work should not force development to guess at unresolved content or behavior.",
      },
    ],
    relatedGuideSlugs: ["what-to-prepare-before-hiring-a-web-developer", "website-proposal-checklist"],
    relatedServiceSlugs: ["small-business-web-design-san-diego", "website-redesign-san-diego"],
    keywords: [
      "how long does it take to build a website",
      "website development timeline",
      "business website timeline",
      "web design project schedule",
    ],
  },
  {
    slug: "what-to-prepare-before-hiring-a-web-developer",
    title: "What to Prepare Before Hiring a Web Developer",
    shortTitle: "Prepare for a Web Project",
    category: "Plan the project",
    priority: 3,
    description:
      "Prepare your goals, audience, content, account access, technical requirements, budget, and decision process before hiring a web developer.",
    summary:
      "You do not need a complete specification before speaking with a developer. You do need a clear business goal, an owner for decisions, known constraints, and an honest inventory of content and systems.",
    directAnswer:
      "Prepare a one-page brief covering the audience, primary action, required pages, current problems, launch constraint, budget context, decision-makers, existing accounts, and who will supply content. Mark unknowns instead of inventing requirements.",
    checklistTitle: "Pre-project brief",
    checklist: [
      "Business offer and primary audience",
      "Most valuable visitor action",
      "Current website problems and useful parts to preserve",
      "Required pages, features, locations, products, or integrations",
      "Available copy, photography, brand files, and legal text",
      "Domain, DNS, hosting, analytics, CMS, and platform owners",
      "Budget range and any fixed launch date",
      "Decision-maker, reviewers, and approval process",
    ],
    sections: [
      {
        id: "define-the-outcome",
        title: "Describe the outcome before the feature list",
        paragraphs: [
          "Start with what a useful visitor should understand and do. A request for “a modern website” gives a developer little to evaluate; a need to increase qualified quote requests for a specific service creates a decision framework.",
          "Name the audience, their main uncertainty, and the action that matters. Features can then be tested against that outcome instead of accumulating because competitors have them.",
        ],
      },
      {
        id: "inventory-assets",
        title: "Inventory content and account ownership",
        paragraphs: [
          "Collect current copy, brand files, photographs, product data, service descriptions, policies, and legal requirements. Label what is approved, what needs revision, and who owns each missing item.",
          "List the accounts connected to the website: domain registrar, DNS, hosting, email, analytics, booking, ecommerce, payments, CRM, and advertising. Do not send passwords in a brief; confirm that an authorized owner can grant secure access when needed.",
        ],
      },
      {
        id: "separate-knowns",
        title: "Separate requirements from assumptions",
        paragraphs: [
          "A required integration, compliance constraint, or launch date should be explicit. Preferences such as a particular framework or animation may be assumptions that deserve discussion.",
          "Mark unknowns openly. A strong developer can help turn business needs into technical decisions, but hidden constraints discovered after signing usually affect cost or schedule.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need all my website copy before contacting a developer?",
        answer:
          "No. You should know who owns the copy and whether writing or editing must be included in scope. Real content should arrive early enough to validate layouts before launch.",
      },
      {
        question: "Should I share my budget?",
        answer:
          "A realistic range helps the developer propose an appropriate first release. Ask them to explain what changes across scope levels rather than treating the range as permission to spend every dollar.",
      },
    ],
    relatedGuideSlugs: ["questions-to-ask-a-web-developer", "how-long-does-a-business-website-take"],
    relatedServiceSlugs: ["small-business-web-design-san-diego", "custom-web-app-development-san-diego"],
    keywords: [
      "prepare before hiring web developer",
      "website project brief",
      "what do I need for a website",
      "hire web developer checklist",
    ],
  },
  {
    slug: "website-proposal-checklist",
    title: "Website Proposal Checklist: What to Review Before Signing",
    shortTitle: "Website Proposal Checklist",
    category: "Plan the project",
    priority: 4,
    description:
      "Review website scope, responsibilities, revisions, ownership, launch, recurring costs, support, and change control before accepting a proposal.",
    summary:
      "A website proposal should make the product, responsibilities, money, timeline, ownership, and acceptance process understandable. If an important expectation appears only in a sales call, it is not yet part of the agreement.",
    directAnswer:
      "Before signing, verify the exact deliverables and exclusions, who supplies content, revision and approval rules, payment schedule, ownership, recurring costs, launch responsibilities, support terms, and how scope changes are priced and approved.",
    checklistTitle: "Proposal review worksheet",
    checklist: [
      "Business objective and success criteria",
      "Named pages, templates, features, integrations, and exclusions",
      "Content, photography, migration, and accessibility responsibilities",
      "Milestones, feedback windows, revisions, and acceptance rules",
      "Payment schedule, taxes, recurring care, and third-party costs",
      "Domain, source code, design files, content, and account ownership",
      "Testing, redirects, analytics, launch, backup, and rollback work",
      "Warranty, maintenance, response times, cancellation, and change control",
    ],
    sections: [
      {
        id: "scope-and-responsibilities",
        title: "Make scope and responsibilities testable",
        paragraphs: [
          "Terms such as “SEO included,” “responsive design,” or “custom website” are too broad without deliverables. Ask what pages, metadata, structured data, redirects, performance work, browser support, and content tasks those phrases represent.",
          "The proposal should identify client responsibilities too. Copy, images, legal review, platform access, and feedback can block delivery when they have no owner or deadline.",
        ],
      },
      {
        id: "money-and-change",
        title: "Understand the complete commercial model",
        paragraphs: [
          "Separate one-time implementation, recurring care, and third-party costs. Confirm payment milestones, late approvals, cancellation terms, and whether deposits are refundable.",
          "Projects change. A useful change-control clause explains how new work is described, estimated, approved, and scheduled before it begins. It protects both sides from surprise invoices and untracked requests.",
        ],
      },
      {
        id: "ownership-and-launch",
        title: "Define ownership and the finish line",
        paragraphs: [
          "Confirm who owns or controls the domain, source code, design files, written content, images, analytics, hosting, and platform accounts. Note any licenses or services that cannot be transferred.",
          "Define what acceptance means and what launch includes. Forms, analytics, redirects, backups, accessibility checks, mobile QA, and DNS changes should not be left to assumption.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should a website proposal include every possible page?",
        answer:
          "It should identify the included pages or reusable page types and explain how additional pages are priced. Future ideas can remain outside the initial scope.",
      },
      {
        question: "What does website acceptance mean?",
        answer:
          "Acceptance is the agreed point when defined deliverables meet the proposal’s criteria. The agreement should explain the review period, how defects are reported, and what counts as new work.",
      },
    ],
    relatedGuideSlugs: ["website-ownership-checklist", "how-much-does-a-small-business-website-cost"],
    relatedServiceSlugs: ["san-diego-web-design", "website-redesign-san-diego"],
    keywords: [
      "website proposal checklist",
      "web design contract checklist",
      "website scope checklist",
      "review web development proposal",
    ],
  },
  {
    slug: "questions-to-ask-a-web-developer",
    title: "Questions to Ask a Web Developer Before You Hire Them",
    shortTitle: "Questions for a Web Developer",
    category: "Choose a web partner",
    priority: 3,
    description:
      "Use these practical questions to evaluate a web developer's fit, evidence, process, scope, communication, ownership, security, and post-launch support.",
    summary:
      "The best interview questions reveal how a developer makes decisions and manages risk. Ask for examples, boundaries, and ownership—not yes-or-no promises that every candidate can give.",
    directAnswer:
      "Ask the developer to connect your requirements to relevant shipped work, explain what they would simplify, identify major risks, define scope and approvals, describe testing and launch, and clarify who owns every account and deliverable afterward.",
    checklistTitle: "Developer interview questions",
    checklist: [
      "Which shipped project is most relevant to this one, and what was your role?",
      "What information would change your recommended approach?",
      "What is explicitly excluded from the proposed scope?",
      "Who performs design, development, copy, QA, and project communication?",
      "How are feedback, revisions, delays, and scope changes handled?",
      "How do you test mobile behavior, accessibility, forms, performance, and analytics?",
      "Who owns the domain, code, content, hosting, and platform accounts?",
      "What support is available after launch, and what does it cost?",
    ],
    sections: [
      {
        id: "ask-for-evidence",
        title: "Ask questions that produce evidence",
        paragraphs: [
          "Instead of asking whether someone can build a fast or search-friendly site, ask them to show a relevant implementation and explain the decisions. Their answer should distinguish what they personally did from work delivered by a larger team.",
          "Ask what did not go as planned on a past project and how they handled it. Specific constraints and corrections usually reveal more experience than a perfect success story.",
        ],
      },
      {
        id: "ask-about-process",
        title: "Expose the real delivery process",
        paragraphs: [
          "Find out what happens between signing and launch: discovery, content, design approval, development, quality checks, revisions, and deployment. Each phase should have an owner and a visible output.",
          "Ask how decisions are documented and what happens when feedback is late or contradictory. This matters whether you hire one freelancer or a multi-person agency.",
        ],
      },
      {
        id: "ask-about-aftercare",
        title: "Do not stop the interview at launch",
        paragraphs: [
          "A website remains connected to domains, hosting, analytics, forms, plugins, APIs, and business accounts. Ask who monitors and updates those systems and what you can do if the relationship ends.",
          "Confirm the support channel, expected response, included maintenance, billable requests, backups, and emergency boundaries. “Support included” needs the same precision as the build scope.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should I ask a developer which technology they use?",
        answer:
          "Yes, but ask why it fits your requirements, who can maintain it, and what costs or constraints it creates. A framework name alone does not establish project quality.",
      },
      {
        question: "What is a warning sign during a developer interview?",
        answer:
          "Unsupported guarantees, vague ownership, reluctance to define exclusions, pressure to sign, or an inability to explain relevant work are reasons to slow down and ask for written clarification.",
      },
    ],
    relatedGuideSlugs: ["how-to-choose-a-web-designer", "website-proposal-checklist"],
    relatedServiceSlugs: ["freelance-web-developer-san-diego"],
    keywords: [
      "questions to ask a web developer",
      "web developer interview questions client",
      "hiring a web developer questions",
      "web designer consultation questions",
    ],
  },
  {
    slug: "website-maintenance-costs-explained",
    title: "Website Maintenance Costs Explained",
    shortTitle: "Website Maintenance Costs",
    category: "Protect the investment",
    priority: 1,
    description:
      "Understand what website maintenance can include, which costs are recurring, what remains third-party, and how to compare care plans or hourly support.",
    summary:
      "Website maintenance is not one universal package. It may include hosting, backups, dependency updates, monitoring, content changes, support, analytics review, or improvements. The agreement should name limits and exclusions.",
    directAnswer:
      "Separate infrastructure, preventive maintenance, support, content work, and improvements. Confirm what is included each month, response expectations, unused-time rules, third-party fees, backup ownership, and the process for work outside the plan.",
    checklistTitle: "Maintenance plan comparison",
    checklist: [
      "Hosting and infrastructure responsibility",
      "Backups, restore testing, and retention",
      "Framework, plugin, dependency, and security updates",
      "Uptime, form, certificate, and domain monitoring",
      "Content-edit allowance and turnaround",
      "Support channel, hours, and response expectations",
      "Analytics, performance, accessibility, or SEO review",
      "Outside-scope rates, third-party fees, and exit process",
    ],
    sections: [
      {
        id: "maintenance-layers",
        title: "The layers inside website maintenance",
        paragraphs: [
          "Infrastructure keeps the site available. Preventive maintenance keeps software and dependencies current. Support handles questions and incidents. Content work changes business information. Improvements change design, behavior, performance, or conversion paths.",
          "A plan may include some or all of these layers. Compare the named work and limits rather than the label “maintenance.” A static marketing site and a store processing orders do not carry the same operational needs.",
        ],
      },
      {
        id: "recurring-costs",
        title: "Know which costs belong to someone else",
        paragraphs: [
          "Domains, email, ecommerce apps, booking tools, payment processing, SMS, paid search tools, and API usage may be billed directly by outside providers. Your developer may manage the connection without controlling those prices.",
          "Keep critical accounts under business-controlled ownership and grant access using the platform’s user or collaborator system. This makes renewal and provider changes safer.",
        ],
      },
      {
        id: "retainer-or-hourly",
        title: "Choose between ongoing care and request-based support",
        paragraphs: [
          "A recurring care plan can provide continuity, predictable availability, and preventive work. Request-based support may suit a stable site with capable internal ownership, but response time and context rebuilding can vary.",
          "Ask what happens to unused time, whether urgent work has different terms, and how improvements are estimated. The right model depends on business risk and update frequency, not a universal maintenance formula.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is website hosting the same as maintenance?",
        answer:
          "No. Hosting provides infrastructure. Maintenance can include updates, monitoring, backups, support, content work, and improvements. Some plans bundle hosting with selected maintenance services.",
      },
      {
        question: "Can I maintain a website myself?",
        answer:
          "Possibly, if you have documented access, backups, update procedures, and the skill to diagnose failures. Confirm what responsibilities move to you before ending professional care.",
      },
    ],
    relatedGuideSlugs: ["website-ownership-checklist", "how-much-does-a-small-business-website-cost"],
    relatedServiceSlugs: ["website-performance-optimization-san-diego"],
    keywords: [
      "website maintenance cost",
      "website maintenance plan",
      "monthly website maintenance",
      "website support costs",
    ],
  },
  {
    slug: "website-ownership-checklist",
    title: "Website Ownership Checklist for Business Owners",
    shortTitle: "Website Ownership Checklist",
    category: "Protect the investment",
    priority: 2,
    description:
      "Verify business control of your domain, DNS, hosting, source code, content, analytics, email, integrations, backups, and billing accounts.",
    summary:
      "A business can appear to own its website while a former provider controls the domain, hosting, source code, analytics, or billing. Ownership should be documented before launch and tested before a handoff becomes urgent.",
    directAnswer:
      "Keep the domain, DNS, email, analytics, payment, and core platform accounts under business-controlled credentials. Document administrators, billing owners, recovery methods, source repositories, licenses, backups, and the procedure for revoking provider access.",
    checklistTitle: "Website control inventory",
    checklist: [
      "Domain registrar and renewal billing",
      "DNS provider and nameserver control",
      "Hosting or deployment platform",
      "Source-code repository and deployment permissions",
      "CMS, ecommerce, booking, payments, CRM, and forms",
      "Analytics, Search Console, tag management, and advertising",
      "Email delivery, transactional messages, and sender verification",
      "Backups, recovery codes, licenses, documentation, and offboarding",
    ],
    sections: [
      {
        id: "business-owned-accounts",
        title: "Use business-owned accounts for critical systems",
        paragraphs: [
          "The domain is the highest-priority asset because it controls the public address and can affect email. Register it under an authorized business owner with current billing, recovery information, and multi-factor authentication.",
          "Use role-based invitations for developers and agencies rather than sharing the primary password. The business should be able to add or remove providers without losing the account.",
        ],
      },
      {
        id: "code-content-licenses",
        title: "Distinguish access, ownership, and licenses",
        paragraphs: [
          "Having an administrator login does not automatically transfer copyright or source-code rights. The proposal should state what code, designs, copy, and files are assigned to the client after payment and what remains licensed.",
          "Fonts, stock images, themes, plugins, and SaaS tools may carry licenses that cannot be transferred or require renewal. Record those dependencies instead of discovering them during a redesign.",
        ],
      },
      {
        id: "test-the-handoff",
        title: "Test access before the relationship changes",
        paragraphs: [
          "Verify that an authorized owner can log in, recover each account, view billing, export important data, reach the source repository, and locate a recent backup. Documentation that has never been tested is only a claim.",
          "When a provider leaves, rotate shared credentials, revoke their users and keys, update recovery methods, and confirm that deployments, forms, email, and billing still work.",
        ],
      },
    ],
    faqs: [
      {
        question: "Who should own the website domain?",
        answer:
          "The business or an authorized owner should control the registrar account and renewal billing. A provider can receive delegated access without becoming the registrant.",
      },
      {
        question: "Do I automatically own website source code after paying?",
        answer:
          "Not necessarily. Ownership and license terms depend on the agreement. Confirm the rights to custom code, third-party components, designs, content, and source files before signing.",
      },
    ],
    relatedGuideSlugs: ["website-proposal-checklist", "website-maintenance-costs-explained"],
    relatedServiceSlugs: ["website-redesign-san-diego", "custom-web-app-development-san-diego"],
    keywords: [
      "website ownership checklist",
      "who owns my website",
      "website handoff checklist",
      "domain and website ownership",
    ],
  },
  {
    slug: "when-to-redesign-your-website",
    title: "When Should You Redesign Your Website?",
    shortTitle: "When to Redesign",
    category: "Protect the investment",
    priority: 3,
    description:
      "Decide whether your website needs a redesign, focused optimization, content revision, technical repair, or no major change at all.",
    summary:
      "A website does not need a redesign because it reached a particular age. Redesign when evidence shows that the current structure, content, technology, or visual trust is blocking the business—and when a focused repair would not solve the problem more responsibly.",
    directAnswer:
      "Redesign when business positioning changed, buyers cannot find essential information, mobile use is poor, the system is unsafe or difficult to maintain, or important workflows no longer function. Use analytics, support issues, sales feedback, and a technical audit to choose between repair and replacement.",
    checklistTitle: "Redesign decision signals",
    checklist: [
      "The offer or audience changed substantially",
      "Navigation no longer matches what buyers need",
      "Mobile visitors struggle with reading or key actions",
      "Important pages are slow, broken, inaccessible, or difficult to update",
      "Search traffic lands on outdated or overlapping content",
      "Forms, booking, ecommerce, analytics, or integrations are unreliable",
      "The visual presentation undermines trust in the current business",
      "The cost of repeated patches exceeds a planned rebuild",
    ],
    sections: [
      {
        id: "evidence-not-age",
        title: "Use evidence instead of a redesign calendar",
        paragraphs: [
          "A stable site can remain effective for years when the business and user needs remain stable. A recently launched site can require redesign if the original structure was built around the wrong audience or workflow.",
          "Review search queries, landing pages, mobile behavior, form completion, customer questions, sales objections, content-update friction, and technical failures. The evidence should identify a problem the redesign is expected to solve.",
        ],
      },
      {
        id: "repair-or-rebuild",
        title: "Choose repair, remodel, or rebuild",
        paragraphs: [
          "Repair isolated defects when the overall structure is sound. Remodel navigation, content hierarchy, templates, or conversion paths when the platform remains useful. Rebuild when foundational architecture, maintainability, accessibility, or business positioning cannot be corrected safely in place.",
          "Preserve valuable URLs, content, analytics history, brand recognition, and integrations. A redesign should not discard working assets merely to make the change feel comprehensive.",
        ],
      },
      {
        id: "protect-search-and-operations",
        title: "Protect search visibility and operations during redesign",
        paragraphs: [
          "Inventory existing URLs and inbound value before changing site structure. Map necessary redirects, preserve useful content, set canonical URLs, validate metadata and structured data, and test the generated sitemap.",
          "Plan domain, DNS, forms, email, analytics, ecommerce, and booking changes as operational work. Launch with backups and a rollback path, then monitor errors and important actions after release.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will redesigning my website improve SEO?",
        answer:
          "It can improve technical foundations, content structure, usability, and crawlability, but rankings are not guaranteed. A careless migration can also lose valuable URLs or content, so redirects and validation matter.",
      },
      {
        question: "Can I redesign only part of my website?",
        answer:
          "Yes. A focused remodel can be safer and more economical when navigation, core technology, and most content remain useful. Define which measurable problem each changed area addresses.",
      },
    ],
    relatedGuideSlugs: ["website-ownership-checklist", "website-maintenance-costs-explained"],
    relatedServiceSlugs: ["website-redesign-san-diego", "website-performance-optimization-san-diego"],
    keywords: [
      "when to redesign website",
      "website redesign checklist",
      "does my website need a redesign",
      "website redesign SEO",
    ],
  },
];

export function getGuideBySlug(slug: string) {
  return GUIDES.find((guide) => guide.slug === slug);
}
