export const SITE = {
    brand: "BarbaroTech",
    owner: "Anthony Barbaro",
    headline: "Engineering clean, fast websites — plus full-stack apps when you need a backend.",
    description:
      "BarbaroTech is a web & software studio by Anthony Barbaro. Portfolio, pricing, and fast client inquiries.",
  
    url: "https://barbaro.tech",
  
    contact: {
      // put your real vtext email here, example:
      // "6195551234@vtext.com"
      textEmail: "6195362504@vtext.com",
      displayPhone: "(619) 536-2504",
      fallbackEmail: "anthony@barbaro.tech",
    },
  
    socials: [
      { label: "GitHub", href: "https://github.com/AnthonyBarbaro" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/anthony-barbaro-a3b542296/" },
    ],
  
    assets: {
      headshot: "/headshot.jpeg", // put file in /public
      resumePdf: "/resume.pdf",  // put file in /public
    },
  } as const;
  