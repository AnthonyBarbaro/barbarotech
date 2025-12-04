export type Project = {
    slug: string;
    title: string;
    summary: string;
    description: string;
    tech: string[];
    highlights: string[];
    links: { label: string; href: string }[];
    image?: string;
    featured?: boolean;
  };
  
  export const PROJECTS: Project[] = [
    {
      slug: "barbarotech-site",
      title: "BarbaroTech Website",
      summary: "Static Next.js portfolio + services site including pricing and text-to-phone inquiries.",
      description:
        "A complete personal portfolio and client services website built for fast page loads, SEO, clean design, and easy maintenance. Includes a full pricing system, dynamic project pages, and a contact system that texts my phone via vtext.com.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Static Export"],
      highlights: [
        "Static HTML export",
        "Dynamic project pages with clean routing",
        "SMS-to-phone client inquiry system"
      ],
      links: [
        { label: "GitHub", href: "https://github.com/AnthonyBarbaro" }
      ],
      image: "/projects/barbarotech.png",
      featured: true,
    },
  ];
  