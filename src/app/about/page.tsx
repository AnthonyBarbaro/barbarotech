import { Container } from "@/components/container";
import { SITE } from "@/lib/site";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";

export const metadata = {
  title: `About | ${SITE.brand}`,
  description:
    "Learn more about Anthony Barbaro, a software engineer focused on clean, production-ready web apps, automation, and digital solutions for real businesses.",
};

const TECH = {
  languages: ["TypeScript", "JavaScript", "Python", "Java", "C++"],
  frontend: ["React", "Next.js", "Tailwind CSS", "Responsive UI"],
  backend: ["Node.js", "REST APIs", "Authentication", "PostgreSQL / SQL", "GraphQL"],
  devops: ["Vercel", "AWS (EC2, S3)", "Azure", "Docker", "GitHub Actions", "Jenkins", "Terraform"],
};

const PROJECTS = [
  {
    title: "TheSmokingBee — Headless Shopify Store",
    role: "End-to-end builder",
    summary:
      "High-performance headless eCommerce storefront using Next.js 15, the Shopify Storefront API, and GraphQL.",
    bullets: [
      "Designed and implemented a headless architecture for better performance and flexibility.",
      "Integrated Shopify Storefront API with GraphQL for product data and inventory.",
      "Deployed on Vercel with CI/CD and preview environments for fast iteration.",
      "Focused on SEO, responsiveness, and a clean product experience.",
    ],
    meta: "Next.js 15 • TypeScript • Tailwind CSS • Shopify Storefront API • GraphQL • Vercel",
  },
  {
    title: "BuzzPythonGUI — Automated Reporting Suite",
    role: "Automation engineer",
    summary:
      "Cross‑platform GUI that automated end‑to‑end business reporting, from scraping to analytics to upload.",
    bullets: [
      "Used Selenium to scrape key data for inventory and sales reporting.",
      "Processed and analyzed reports in Excel with advanced formulas.",
      "Uploaded final files to Google Drive via Google Drive API.",
      "Reduced reporting time by ~80% and significantly cut manual errors.",
    ],
    meta: "Python • Selenium • Google Drive API • Excel • Automation",
  },
  {
    title: "Internal Tools & Games",
    role: "Engineer & builder",
    summary:
      "A set of projects that explore clean architecture, probability, and simulations.",
    bullets: [
      "CasinoMob: modular casino‑style games (blackjack, baccarat, war) with OOP‑driven logic and edge‑case handling.",
      "MiniGolf 3D (Unity): physics‑based mini golf simulator with level design and collision detection.",
      "Personal portfolio sites: multiple iterations, including self‑hosted React/Tailwind and now this BarbaroTech Next.js build.",
    ],
    meta: "C# • Unity • OOP • React • Tailwind CSS",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white text-black">
      {/* HERO */}
      <section className="border-b border-black/10 bg-gradient-to-b from-white via-sky-50 to-white">
        <Container className="py-16 md:py-20 grid gap-10 md:grid-cols-[1.1fr_.9fr] items-center">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge>Software Engineer</Badge>
              <Badge>Full‑Stack & Automation</Badge>
              <Badge>Based in San Diego</Badge>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
                About {SITE.owner}
              </h1>
              <div className="h-px w-28 bg-gradient-to-r from-sky-500 via-sky-400 to-transparent" />
              <p className="text-black/70 text-sm md:text-base max-w-xl">
                I’m a software engineer with a backend and full‑stack foundation who likes
                building things that actually ship: websites, internal tools, and automations
                that save time, clean up processes, and help businesses scale.
              </p>
            </div>

            <p className="text-black/70 text-sm md:text-base max-w-2xl leading-relaxed">
              Over the last few years, I’ve gone from studying computer science at San Diego
              State University to building real systems for teams — internal tools, reporting
              automation, and production web apps. The last year has been heavy on helping
              businesses modernize: turning slow, manual workflows into fast digital solutions,
              and building websites that look clean, load fast, and generate real inquiries.
            </p>

            <div className="flex flex-wrap gap-3 text-sm text-black/70">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                Backend & automation experience
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                Full‑stack Next.js & TypeScript
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                Client‑facing sites & digital solutions
              </span>
            </div>
          </div>

          <div className="justify-self-end w-full max-w-sm">
            <div className="relative aspect-[4/5]">
              <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-sky-200/60 via-zinc-200/80 to-transparent blur-xl" />
              <div className="relative h-full w-full rounded-2xl overflow-hidden border border-black/10 bg-white shadow-lg">
                <Image
                  src={SITE.assets.headshot}
                  alt={`${SITE.owner} headshot`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* STORY / EDUCATION */}
      <section className="border-b border-black/10 bg-white">
        <Container className="py-12 grid gap-8 md:grid-cols-[1.4fr_.6fr]">
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">My path into software</h2>
            <p className="text-sm md:text-base text-black/70 leading-relaxed">
              I spent about three and a half years at{" "}
              <span className="font-medium text-black">San Diego State University</span>,
              working through a Computer Science degree while building projects on the side.
              That mix of theory and hands‑on work is where I got comfortable moving from
              “idea” to something running in production.
            </p>
            <p className="text-sm md:text-base text-black/70 leading-relaxed">
              During that time I built games, small tools, and full web apps, and I naturally
              gravitated toward automation and backend systems. I like taking a messy process
              — reporting, data entry, manual updates — and turning it into a reliable tool
              that just runs.
            </p>
            <p className="text-sm md:text-base text-black/70 leading-relaxed">
              Over the last year I’ve shifted that same mindset to real businesses: smoke
              shops, local retailers, and companies that need better systems. That’s included
              designing websites from scratch, standing up full‑stack apps, and building custom
              workflows that save time, reduce errors, and make it easier for customers to
              actually reach the business.
            </p>
          </div>

          <Card className="bg-zinc-50 border border-black/5">
            <CardContent className="p-5 space-y-3 text-sm">
              <div className="space-y-1">
                <div className="text-xs font-semibold tracking-wide text-black/60">
                  EDUCATION
                </div>
                <div className="font-semibold">San Diego State University</div>
                <div className="text-black/70">B.S. Computer Science</div>
                <div className="text-xs text-black/60">~3.5 years • GPA 3.6</div>
              </div>
              <p className="text-xs text-black/60">
                Core CS fundamentals + practical builds: algorithms, systems, OOP, plus
                projects in Python, Java, C++, and JavaScript.
              </p>
            </CardContent>
          </Card>
        </Container>
      </section>

      {/* EXPERIENCE */}
      <section className="border-b border-black/10 bg-zinc-50">
        <Container className="py-12 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Experience</h2>
            <p className="text-sm text-black/70 max-w-2xl">
              I’ve worked in roles where the expectation was simple: own problems, build tools,
              and keep systems running smoothly.
            </p>
          </div>

          <div className="space-y-4">
            {/* Hilife Group */}
            <Card className="bg-white border border-black/5">
              <CardContent className="p-5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-sm font-semibold">Admin & Developer</div>
                    <div className="text-sm text-black/70">Hilife Group — San Diego, CA</div>
                  </div>
                  <div className="text-xs text-black/60">June 2024 – Present</div>
                </div>
                <p className="text-sm text-black/70">
                  Owned and maintained internal POS and inventory systems, and became the point of
                  contact for backend issues and system reliability.
                </p>
                <ul className="text-sm text-black/70 space-y-1.5">
                  <li>• Automated inventory and reporting pipelines using Python and Google APIs.</li>
                  <li>• Reduced manual workload by roughly <span className="font-medium">$5,000/month</span>.</li>
                  <li>• Helped keep cross‑team operations running smoothly with fewer manual steps.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Marcus & Millichap */}
            <Card className="bg-white border border-black/5">
              <CardContent className="p-5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-sm font-semibold">Software Engineering Intern</div>
                    <div className="text-sm text-black/70">Marcus &amp; Millichap — San Diego, CA</div>
                  </div>
                  <div className="text-xs text-black/60">Oct 2022 – May 2023</div>
                </div>
                <p className="text-sm text-black/70">
                  Built internal automation tools around CRM workflows to save time and improve data quality.
                </p>
                <ul className="text-sm text-black/70 space-y-1.5">
                  <li>• Used Python and REST APIs to sync data between CoStar and HubSpot.</li>
                  <li>• Improved internal email deliverability by ~12%.</li>
                  <li>• Saved ~5 hours per week in manual data work for the team.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* PROJECTS HIGHLIGHT */}
      <section className="border-b border-black/10 bg-white">
        <Container className="py-12 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Projects & things I’ve shipped</h2>
            <p className="text-sm text-black/70 max-w-2xl">
              I like building end‑to‑end: from idea and architecture to shipping the actual UI,
              wiring APIs, and deploying.
            </p>
          </div>

          <div className="space-y-4">
            {PROJECTS.map((project) => (
              <Card key={project.title} className="bg-zinc-50 border border-black/5">
                <CardContent className="p-5 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="text-sm font-semibold">{project.title}</div>
                      <div className="text-xs text-black/60">{project.role}</div>
                    </div>
                  </div>
                  <p className="text-sm text-black/70">{project.summary}</p>
                  <ul className="text-sm text-black/70 space-y-1.5">
                    {project.bullets.map((b) => (
                      <li key={b}>• {b}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-black/60 pt-1">{project.meta}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* TECH SUMMARY */}
      <section className="border-b border-black/10 bg-zinc-50">
        <Container className="py-12 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Technical snapshot</h2>
            <p className="text-sm text-black/70 max-w-2xl">
              Day‑to‑day I’m most comfortable in TypeScript, React/Next.js, and Node, with enough DevOps to ship and
              maintain production apps.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-white border border-black/5">
              <CardContent className="p-5 space-y-2">
                <div className="text-sm font-semibold">Languages</div>
                <ul className="text-sm text-black/70 space-y-1">
                  {TECH.languages.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white border border-black/5">
              <CardContent className="p-5 space-y-2">
                <div className="text-sm font-semibold">Frontend</div>
                <ul className="text-sm text-black/70 space-y-1">
                  {TECH.frontend.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white border border-black/5">
              <CardContent className="p-5 space-y-2">
                <div className="text-sm font-semibold">Backend</div>
                <ul className="text-sm text-black/70 space-y-1">
                  {TECH.backend.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white border border-black/5">
              <CardContent className="p-5 space-y-2">
                <div className="text-sm font-semibold">Cloud & DevOps</div>
                <ul className="text-sm text-black/70 space-y-1">
                  {TECH.devops.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-white via-sky-50 to-white">
        <Container className="py-12">
          <div className="rounded-2xl border border-black/10 bg-white/85 backdrop-blur p-8 md:p-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between shadow-sm">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-black">Let’s build something useful</h3>
              <p className="text-black/70 text-sm md:text-base max-w-xl">
                Whether you need a clean website, a full‑stack app, or an internal tool that saves hours each week,
                I’m happy to scope it and give you a clear path forward.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <ButtonLink href="/projects" variant="secondary">
                View projects
              </ButtonLink>
              <ButtonLink href="/contact">
                Talk about a project →
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
