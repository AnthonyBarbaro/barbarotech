---
name: BarbaroTech Signal Field
description: A cinematic cyan-and-blue portfolio system built around one clear signal—direct work with Anthony.
colors:
  signal-black: "#02060b"
  signal-black-soft: "#040a12"
  deep-panel: "#07111d"
  strong-panel: "#0a1725"
  cool-white: "#effbff"
  pure-white: "#ffffff"
  mask-black: "#000000"
  mist-text: "#9bb2c3"
  strong-mist: "#bfd0dc"
  live-cyan: "#22d3ee"
  barbaro-sky: "#0ea5e9"
  depth-cobalt: "#2563eb"
  electric-ice: "#a5f3fc"
  trace-line: "rgba(125, 211, 252, 0.18)"
  trace-line-strong: "rgba(125, 211, 252, 0.34)"
  error-rose: "#fb7185"
typography:
  display:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(3rem, 4.8vw, 4.35rem)"
    fontWeight: 850
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(2.15rem, 4.7vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(1rem, 1.6vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Fragment Mono, ui-monospace, monospace"
    fontSize: "0.72rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0.08em"
  data-xs:
    fontFamily: "Fragment Mono, ui-monospace, monospace"
    fontSize: "0.5625rem"
    fontWeight: 400
    lineHeight: 1.3
  data-sm:
    fontFamily: "Fragment Mono, ui-monospace, monospace"
    fontSize: "0.625rem"
    fontWeight: 400
    lineHeight: 1.3
  data-md:
    fontFamily: "Fragment Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.3
  control:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.01em"
  chip:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
  display-mobile:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(2.55rem, 12.4vw, 3.9rem)"
    fontWeight: 850
    lineHeight: 0.94
    letterSpacing: "-0.04em"
  headline-mobile:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(2rem, 10vw, 3.2rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.035em"
rounded:
  control: "12px"
  panel: "16px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section-sm: "64px"
  section-lg: "96px"
components:
  button-primary:
    backgroundColor: "{colors.live-cyan}"
    textColor: "{colors.signal-black}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "10px 20px"
    height: "44px"
  button-secondary:
    backgroundColor: "{colors.deep-panel}"
    textColor: "{colors.electric-ice}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "10px 20px"
    height: "44px"
  signal-panel:
    backgroundColor: "{colors.deep-panel}"
    textColor: "{colors.cool-white}"
    rounded: "{rounded.panel}"
    padding: "24px"
  signal-chip:
    backgroundColor: "{colors.deep-panel}"
    textColor: "{colors.strong-mist}"
    typography: "{typography.chip}"
    rounded: "{rounded.pill}"
    padding: "0.35rem 0.72rem"
    height: "32px"
  form-field:
    backgroundColor: "{colors.deep-panel}"
    textColor: "{colors.cool-white}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
    height: "48px"
---

# Design System: BarbaroTech Signal Field

## Overview

**Creative North Star: "The Solo Signal Field"**

BarbaroTech lives inside a deep digital field of moving points, routed lines, and soft cyan light. Many possible business needs converge on one accountable builder: Anthony. The experience is technically advanced and cinematic, but the offer, prices, work, and next action stay practical and immediately legible.

The system borrows the spatial confidence, oversized type, and ambient motion of the supplied reference, then makes them personal through real project proof, transparent prices, first-person language, and a cyan-to-cobalt signal instead of the reference's green product world. Motion is a reusable material: slow current drift at rest, directional response around meaningful content, and crisp state changes on interaction.

**Key Characteristics:**

- Near-black space with cyan, sky, and cobalt signal light
- One dominant conversion message per viewport
- Forceful Archivo headlines with compact Fragment Mono data labels
- Real project imagery, prices, and direct access to Anthony used as proof
- Ambient motion that becomes quieter on mobile and static for reduced motion
- Dark, stable reading planes with bright cyan reserved for action

## Colors

The BarbaroTech cyan and blue family operates on a near-black canvas. Cyan identifies action and live state, cobalt creates atmospheric depth, and cool white carries the offer.

### Primary

- **Live Cyan** (`#22d3ee`): Primary interaction, selected state, key phrase, and active signal point.
- **Barbaro Sky** (`#0ea5e9`): Supporting paths, ambient particles, and secondary emphasis.

### Secondary

- **Depth Cobalt** (`#2563eb`): Large atmospheric fields, deep gradients, and selected proof moments.
- **Electric Ice** (`#a5f3fc`): High-contrast signal highlights, links, and small status details.

### Neutral

- **Signal Black** (`#02060b`): Primary page canvas.
- **Soft Signal Black** (`#040a12`): Quiet section and rail background.
- **Deep Panel** (`#07111d`): Cards, forms, navigation, and content surfaces.
- **Strong Panel** (`#0a1725`): Hovered or emphasized dark surfaces.
- **Cool White** (`#effbff`): Primary text and high-priority controls.
- **Mist Text** (`#9bb2c3`): Supporting copy.
- **Strong Mist** (`#bfd0dc`): Secondary labels requiring added contrast.
- **Trace Line** (`rgba(125, 211, 252, 0.18)`): Borders, dividers, paths, and inactive controls.

**The Signal Economy Rule.** Bright cyan marks action, selection, or a meaningful proof point. It does not outline every object.

**The Blue Continuity Rule.** New hues may vary in lightness and chroma, but the durable identity stays inside the cyan-to-blue family.

## Typography

- **Display Font:** Archivo (Arial, sans-serif fallback)
- **Body Font:** Archivo (Arial, sans-serif fallback)
- **Label/Mono Font:** Fragment Mono (ui-monospace, monospace fallback)

**Character:** Archivo provides compact, forceful headlines without turning the studio into a gaming brand. Fragment Mono supplies precise labels, prices, indexes, and process details in small doses.

### Hierarchy

- **Display** (850, `clamp(3rem, 4.8vw, 4.35rem)`, 0.92): One decisive conversion idea. Mobile uses `clamp(2.55rem, 12.4vw, 3.9rem)`.
- **Headline** (800, `clamp(2.15rem, 4.7vw, 4.5rem)`, 0.98): Section claims and package-group introductions.
- **Title** (800, `1.25rem`, 1.1): Package, project, service, and proof titles.
- **Body** (400, `clamp(1rem, 1.6vw, 1.125rem)`, 1.7): Sales and explanatory copy with a maximum line length near 70 characters.
- **Label** (400, `0.72rem`, `0.08em` tracking): Navigation metadata, prices, statuses, filters, and process data.
- **Data** (400, `0.5625rem`–`0.6875rem`): Dense mono pricing, diagram, and process annotations.
- **Control / Chip** (600–700, `0.75rem`–`0.875rem`): Archivo labels for buttons and pill metadata.

**The One Loud Line Rule.** Each viewport earns one oversized typographic statement. Supporting copy stays visibly subordinate.

## Layout

Content sits inside a centered 1240px maximum-width container with 20px mobile, 28px small-screen, and 40px desktop side padding. Desktop pages use asymmetric two-column or twelve-column fields; evidence becomes rails, ledgers, and large project imagery instead of repeated generic cards. Vertical section rhythm is 64px on compact screens and 96px on desktop.

The first view pairs a left-anchored offer with a proof or decision surface. Tablet collapses complex overlaps into two zones. Below 768px, layouts become a single intentional sequence, canvas density drops, service currents turn vertical, type scales down, and controls retain at least 44px targets. Pricing uses one scan-friendly package grid instead of category rails or nested tier comparisons.

## Elevation & Depth

Depth is atmospheric rather than skeuomorphic. Fixed canvas particles, cyan-to-cobalt radial fields, thin routed lines, tonal panel steps, and selective blur create separation. Panels keep a stable dark reading plane; shadows are cool, low-opacity, and reserved for primary actions, the solo-builder orbit, and the floating conversion dock.

### Shadow Vocabulary

- **Action Signal** (`0 10px 30px rgba(34, 211, 238, 0.16)`): Primary cyan actions.
- **Orbit Depth** (`0 14px 44px rgba(0, 0, 0, 0.36)`): Central Anthony node.
- **Dock Depth** (`0 18px 46px rgba(0, 0, 0, 0.38)`): Scroll-triggered desktop conversion dock.
- **Project Frame** (`0 24px 64px rgba(0, 0, 0, 0.3)`): Real project imagery with a subtle routed cyan trace.
- **Trace Glow** (`0 0 28px rgba(14, 165, 233, 0.22)`): Singular routed lines and active field moments.

**The Content Plane Rule.** Motion may pass behind content, never through the reading plane. Every paragraph and control keeps stable contrast.

## Shapes

The field is organic; the interface is precise. Controls use 12px corners, content panels use 16px corners, and chips or status markers use true pills. Borders are one-pixel cyan traces. Circles belong to signal nodes, the Anthony orbit, availability states, or genuine progress. Lines must connect, divide, or guide.

## Components

### Buttons

- **Shape:** Compact 12px corners with a 44px minimum height.
- **Primary:** Live Cyan background, Signal Black text, and `10px 20px` padding.
- **Hover / Focus:** Lift one pixel, move to white, and retain a visible Electric Ice focus ring.
- **Secondary / Ghost:** Deep Panel or transparent surfaces with cyan trace borders and Ice text.

### Chips

- **Style:** 32px minimum-height pills on a translucent Deep Panel with a Trace Line border.
- **State:** Cyan text or a stronger border indicates selection; chips do not become a second primary button.

### Cards / Containers

- **Corner Style:** Restrained 16px radius.
- **Background:** Deep Panel at rest and Strong Panel for emphasized or hovered states.
- **Shadow Strategy:** Flat by default; atmosphere and borders provide most separation.
- **Border:** One-pixel Trace Line with a short cyan top trace on signature panels.
- **Internal Padding:** Usually 20–32px depending on density.

### Project Media

- Project indexes and case studies are media-first: screenshots or demo videos carry the proof before supporting copy.
- Use the shared browser-stage frame so a screenshot can be replaced by a local project video without changing layout.
- Demo videos use controls, `playsInline`, metadata-only preload, and a real poster image. Do not autoplay portfolio videos or place video controls inside a link.

### Inputs / Fields

- **Style:** 48px minimum height, 12–14px corners, Deep Panel fill, Cool White text, and a low-contrast cyan border.
- **Focus:** Border and focus ring shift to Live Cyan or Electric Ice.
- **Error / Disabled:** Error Rose is reserved for validation; disabled states reduce contrast without removing labels.

### Navigation

- **Style:** Sticky near-black desktop and mobile header with a live signal-node wordmark.
- **State:** Active routes receive white text and a thin cyan baseline. Mobile navigation opens into a full-width, keyboard-operable list with 48px rows.

### Signal Field

The fixed canvas draws a diagonal current of low-density cyan and ice particles with routed lane lines. Pointer proximity creates a subtle lift on fine pointers. Animation pauses when the document is hidden, density drops on mobile and lower-power hardware, and reduced-motion users receive a static field.

### Conversion Dock

The desktop-only dock appears after meaningful scroll progress rather than covering the opening offer. It stays suppressed on pricing and contact routes, where contextual decision actions already exist. Elsewhere it keeps the current promotion, direct quote route, call route, next-message control, and dismiss control in one compact dark surface.

## Do's and Don'ts

### Do:

- **Do** keep the cyan-to-blue BarbaroTech identity unmistakable against the near-black canvas.
- **Do** use one orchestrated ambient field across the site and vary its density by viewport capability.
- **Do** turn real pricing, projects, and direct access to Anthony into the visual proof.
- **Do** pair spectacle with early actions and plain-language explanations.
- **Do** provide static, reduced-motion, low-power, and mobile-safe fallbacks.

### Don't:

- **Don't** copy the reference's green palette, product claims, navigation, or exact compositions.
- **Don't** imply BarbaroTech is an LLC, a staffed agency, or a software platform.
- **Don't** place every section inside the same glowing glass card.
- **Don't** scatter unrelated animations, bounce easing, or cursor effects across controls.
- **Don't** hide pricing, contact actions, or essential content behind motion or hover-only interactions.
