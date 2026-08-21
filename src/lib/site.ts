export const SITE = {
    brand: "BarbaroTech",
    owner: "Anthony Barbaro",
    headline: "Websites, storefronts, and custom platforms built directly by Anthony Barbaro.",
    description:
      "Explore live websites, storefronts, and custom platforms designed and built by Anthony Barbaro.",
  
    url: "https://barbaro.tech",
  
    contact: {
      // put your real vtext email here, example:
      // "6195551234@vtext.com"
      textEmail: "6195362504@vtext.com",
      displayPhone: "(619) 536-2504",
      fallbackEmail: "anthony@barbaro.tech",
    },
  
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/anthony-barbaro-a3b542296/" },
    ],
  
    assets: {
      headshot: "/headshot.png", // put file in /public
      resumePdf: "/resume.pdf",  // put file in /public
      socialImage: "/og.png",
    },
  } as const;
