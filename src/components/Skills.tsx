import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ════════════════════════════════════════
   REAL SVG ICONS DATA
════════════════════════════════════════ */
const ICON_SVGS: Record<string, { bg: string; svg?: string; img?: string }> = {
  'Unity': { bg: '#1a1a1a', img: 'https://cdn.simpleicons.org/unity/white' },
  'AR Foundation': { bg: '#0a1628', img: 'https://cdn.simpleicons.org/unity/00D4FF' },
  'XR Toolkit': { bg: '#120824', img: '/openxr.svg' },
  'Unreal Engine': { bg: '#0a0a14', img: 'https://cdn.simpleicons.org/unrealengine/white' },
  'WebXR': { bg: '#021420', svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><g transform="translate(200,200)" style="isolation:isolate"><path d="M0,-165 C18,-165 82,-100 82,10 C82,72 46,92 0,92 C-46,92 -82,72 -82,10 C-82,-100 -18,-165 0,-165Z" fill="#e8192c" opacity="0.62" transform="rotate(-45)"/><path d="M0,-165 C18,-165 82,-100 82,10 C82,72 46,92 0,92 C-46,92 -82,72 -82,10 C-82,-100 -18,-165 0,-165Z" fill="#e8192c" opacity="0.62" transform="rotate(45)"/><path d="M0,-165 C18,-165 82,-100 82,10 C82,72 46,92 0,92 C-46,92 -82,72 -82,10 C-82,-100 -18,-165 0,-165Z" fill="#e8192c" transform="rotate(135)"/><path d="M0,-165 C18,-165 82,-100 82,10 C82,72 46,92 0,92 C-46,92 -82,72 -82,10 C-82,-100 -18,-165 0,-165Z" fill="#e8192c" transform="rotate(225)"/></g></svg>` },
  'Meta Quest': { bg: '#000b1e', img: 'https://cdn.simpleicons.org/meta/0668E1' },
  'Mapbox': { bg: '#00100e', img: 'https://cdn.simpleicons.org/mapbox/00CCAA' },
  'Senmag SDK': { bg: '#001220', svg: `<svg viewBox="0 0 100 100" width="26" height="26"><rect x="20" y="30" width="60" height="40" rx="8" fill="none" stroke="#55AADD" stroke-width="4"/><path d="M30 50h12M58 50h12M42 40l16 20M42 60l16-20" stroke="#55AADD" stroke-width="3.5" stroke-linecap="round"/></svg>` },
  'Blender': { bg: '#160800', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg' },
  'Autodesk Maya': { bg: '#000000', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/maya/maya-original.svg' },
  'DaVinci Resolve': { bg: '#000000', img: 'https://cdn.simpleicons.org/davinciresolve/white' },
  'Premiere Pro': { bg: '#1c0040', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-original.svg' },
  'After Effects': { bg: '#0a0030', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg' },
  'Photoshop': { bg: '#001c33', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg' },
  'Illustrator': { bg: '#1c0a00', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-original.svg' },
  'Creative Cloud': { bg: '#200000', svg: `<svg viewBox="0 0 91 80" fill="none"><g clip-path="url(#adobe__clip0_906_1839)"><path d="M56.9686 0H90.4318V80L56.9686 0Z" fill="#EB1000"/><path d="M33.4632 0H0V80L33.4632 0Z" fill="#EB1000"/><path d="M45.1821 29.4668L66.5199 80.0002H52.5657L46.1982 63.9461H30.6182L45.1821 29.4668Z" fill="#EB1000"/></g><defs><clipPath id="adobe__clip0_906_1839"><rect width="90.4318" height="80" fill="white"/></clipPath></defs></svg>` },
  'Figma': { bg: '#130800', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
  'Framer': { bg: '#000000', img: 'https://cdn.simpleicons.org/framer/white' },
  'GitHub': { bg: '#0c1016', svg: `<svg viewBox="0 0 1024 1024" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="#ffff"/></svg>` },
  'C#': { bg: '#0e0c1e', svg: `<svg preserveAspectRatio="xMidYMid" viewBox="0 -1.43 255.58 290.11"><path fill="#a179dc" d="M255.57 84.45c0-4.83-1.04-9.1-3.13-12.76a24.4 24.4 0 0 0-9.24-9C209.17 43.05 175.1 23.5 141.1 3.86c-9.17-5.3-18.06-5.1-27.16.27-13.54 7.98-81.35 46.83-101.55 58.53C4.06 67.5.02 74.87 0 84.44v118.37c0 4.72 1 8.9 2.99 12.51 2.05 3.72 5.17 6.82 9.38 9.26 20.21 11.7 88.02 50.55 101.56 58.53 9.11 5.38 18 5.57 27.17.27 34.02-19.64 68.08-39.2 102.1-58.81a24.33 24.33 0 0 0 9.4-9.25c1.99-3.61 2.98-7.8 2.98-12.52l-.01-118.35"/><path fill="#280068" d="M128.18 143.24 2.98 215.33c2.06 3.7 5.18 6.8 9.4 9.25 20.2 11.7 88.01 50.55 101.55 58.53 9.11 5.38 18 5.57 27.17.27 34.02-19.64 68.08-39.2 102.1-58.81a24.33 24.33 0 0 0 9.4-9.25z"/><path fill="#390091" d="M255.57 84.45c0-4.83-1.04-9.1-3.13-12.76l-124.26 71.55 124.41 72.07c2-3.6 2.99-7.79 3-12.51 0 0 0-78.9-.02-118.35"/><g fill="#fff"><path d="M201.9 116.3v13.47h13.47v-13.48h6.73v13.48h13.48v6.73H222.1v13.48h13.48v6.74H222.1v13.47h-6.73V156.7h-13.48v13.48h-6.73V156.7h-13.48v-6.73h13.47V136.5h-13.47v-6.74h13.47v-13.48zm13.47 20.2h-13.48v13.48h13.48z"/><path d="M128.46 48.63a94.96 94.96 0 0 1 82.26 47.45l-.16-.27-41.35 23.8A47.28 47.28 0 0 0 129 96.33h-.54a47.3 47.3 0 0 0-47.3 47.3 47.08 47.08 0 0 0 6.23 23.47 47.28 47.28 0 0 0 82.29-.27l-.2.35 41.29 23.91a94.97 94.97 0 0 1-81.25 47.54h-1.06a94.96 94.96 0 0 1-95-95 95 95 0 0 1 95-95z"/></g></svg>` },
  'C++': { bg: '#080818', svg: `<svg preserveAspectRatio="xMidYMid" viewBox="0 0 256 288"><path fill="#649AD2" d="M255.987 84.59c-.002-4.837-1.037-9.112-3.13-12.781-2.054-3.608-5.133-6.632-9.261-9.023-34.08-19.651-68.195-39.242-102.264-58.913-9.185-5.303-18.09-5.11-27.208.27-13.565 8-81.48 46.91-101.719 58.632C4.071 67.6.015 74.984.013 84.58 0 124.101.013 163.62 0 203.141c0 4.73.993 8.923 2.993 12.537 2.056 3.717 5.177 6.824 9.401 9.269 20.24 11.722 88.164 50.63 101.726 58.631 9.121 5.382 18.027 5.575 27.215.27 34.07-19.672 68.186-39.262 102.272-58.913 4.224-2.444 7.345-5.553 9.401-9.267 1.997-3.614 2.992-7.806 2.992-12.539 0 0 0-79.018-.013-118.539"/><path fill="#004482" d="m128.392 143.476-125.4 72.202c2.057 3.717 5.178 6.824 9.402 9.269 20.24 11.722 88.164 50.63 101.726 58.631 9.121 5.382 18.027 5.575 27.215.27 34.07-19.672 68.186-39.262 102.272-58.913 4.224-2.444 7.345-5.553 9.401-9.267l-124.616-72.192"/><path fill="#1A4674" d="M91.25 164.863c7.297 12.738 21.014 21.33 36.75 21.33 15.833 0 29.628-8.7 36.888-21.576l-36.496-21.141-37.142 21.387"/><path fill="#01589C" d="M255.987 84.59c-.002-4.837-1.037-9.112-3.13-12.781l-124.465 71.667 124.616 72.192c1.997-3.614 2.99-7.806 2.992-12.539 0 0 0-79.018-.013-118.539"/><path fill="#FFF" d="M249.135 148.636h-9.738v9.74h-9.74v-9.74h-9.737V138.9h9.737v-9.738h9.74v9.738h9.738v9.737ZM128 58.847c31.135 0 58.358 16.74 73.17 41.709l.444.759-37.001 21.307c-7.333-12.609-20.978-21.094-36.613-21.094-23.38 0-42.333 18.953-42.333 42.332a42.13 42.13 0 0 0 5.583 21.003c7.297 12.738 21.014 21.33 36.75 21.33 15.659 0 29.325-8.51 36.647-21.153l.241-.423 36.947 21.406c-14.65 25.597-42.228 42.851-73.835 42.851-31.549 0-59.084-17.185-73.754-42.707-7.162-12.459-11.26-26.904-11.26-42.307 0-46.95 38.061-85.013 85.014-85.013Zm75.865 70.314v9.738h9.737v9.737h-9.737v9.74h-9.738v-9.74h-9.738V138.9h9.738v-9.738h9.738Z"/></svg>` },
  'JavaScript': { bg: '#1a1600', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  'React': { bg: '#001a22', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  'Tailwind': { bg: '#001828', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  'HTML5': { bg: '#1a0800', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  'MySQL': { bg: '#001428', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
  'Prompt Eng.': { bg: '#101010', svg: `<svg preserveAspectRatio="xMidYMid" viewBox="0 0 256 260"><path fill="#fff" d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z"/></svg>` },
  'Git': { bg: '#1a0800', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
};

/* ════════════════════════════════════════
   CARD DATA
════════════════════════════════════════ */
const CARDS = [
  {
    short: 'XR & Immersive',
    label: '<span class="text-white">XR</span> <span class="text-[#EB422F]">& Immersive Systems</span>',
    circleLabel: 'IMMERSIVE SYSTEMS DESIGN',
    title: 'Advanced Spatial Environments',
    sub: 'I committed to delivering high-quality XR development and helping you create impactful 3D and immersive digital experiences.',
    chips: ['Unity', 'Unreal Engine', 'AR Foundation', 'WebXR', 'Meta Quest', 'Mapbox', 'Senmag SDK'],
    advLabel: 'Creative Expertise',
    caps: ['Location-Based AR (Mapbox)', 'Cross-platform XR deployment', 'VR Teleoperation systems', 'Real-time interaction systems', 'Hardware integration workflows'],
    icons: ['Unity', 'AR Foundation', 'XR Toolkit', 'Unreal Engine', 'WebXR', 'Meta Quest', 'Mapbox', 'Senmag SDK']
  },
  {
    short: '3D & Visual Media',
    label: '<span class="text-white">3D</span> <span class="text-[#EB422F]">Visual Engineering</span>',
    circleLabel: 'USER-CENTRIC INTERACTION',
    title: 'Cinematic Asset Creation',
    sub: 'Creating cinematic 3D visuals, polished assets, and immersive motion content for storytelling and experience design.',
    chips: ['Blender', 'Autodesk Maya', 'Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    advLabel: 'Creative Expertise',
    caps: ['VR filmmaking and spatial storytelling', 'Lighting, shading, and rendering', 'Scene composition and framing', 'Storyboard planning and shot design', 'Asset Optimization for XR'],
    icons: ['Blender', 'Autodesk Maya', 'DaVinci Resolve', 'Premiere Pro', 'After Effects']
  },
  {
    short: 'Design & Motion',
    label: '<span class="text-white">Design</span> <span class="text-[#EB422F]">& UX Strategy</span>',
    circleLabel: 'DESIGN SYSTEMS & UX',
    title: 'User-Centric Interaction',
    sub: 'Crafting intuitive interfaces, strong visual hierarchies, and story-driven digital experiences.',
    chips: ['Photoshop', 'Illustrator', 'Figma', 'Framer', 'Creative Cloud'],
    advLabel: 'Creative Expertise',
    caps: ['Visual hierarchy and layout systems', 'Typography and layout precision', 'Motion language and transitions', 'Story-driven interface design', 'Brand-consistent design systems'],
    icons: ['Photoshop', 'Illustrator', 'Framer', 'After Effects', 'Creative Cloud', 'Figma']
  },
  {
    short: 'Programming',
    label: '<span class="text-white">Technical</span> <span class="text-[#EB422F]">Stack</span>',
    circleLabel: 'FULL-STACK BUILD SYSTEMS',
    title: 'Robust Core Architecture',
    sub: 'Building scalable interfaces, interactive systems, and performant digital products with clean technical execution.',
    chips: ['React', 'JavaScript', 'Tailwind', 'C#', 'C++', 'HTML5', 'MySQL', 'Git'],
    advLabel: 'Creative Expertise',
    caps: ['Agile development workflow', 'Prompt engineering and AI workflows', 'Version control and collaboration', 'Scalable component architecture', 'Performance optimization'],
    icons: ['React', 'Tailwind', 'JavaScript', 'Prompt Eng.', 'C#', 'C++', 'GitHub', 'Git']
  }
];

const SPEEDS = [0.16, 0.20, 0.18, 0.14];

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [vw, setVW] = useState(window.innerWidth);
  const [vh, setVH] = useState(window.innerHeight);

  const isMobileSize = vw < 1024;
  const CARD_D = Math.floor(Math.min(isMobileSize ? vw * 0.40 : vw * .45, isMobileSize ? vh * 0.35 : vh * .55, isMobileSize ? 420 : 550) * 0.8); // 20% smaller
  const ORBIT_R = CARD_D * .50 + (isMobileSize ? 25 : 80); // Tighter orbit on mobile

  const [activeIdx, setActiveIdx] = useState(-1);
  const [scrollPct, setScrollPct] = useState(0);

  // Refs for animation targets
  const panelLeftRef = useRef<HTMLDivElement>(null);
  const panelRightRef = useRef<HTMLDivElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const orbitContainerRef = useRef<HTMLDivElement>(null);
  const hdrRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement[] | null)[]>(CARDS.map(() => []));

  // Track orbit states
  const orbitState = useRef(CARDS.map((d, i) => ({
    angles: d.icons.map((_, j) => (j / d.icons.length) * Math.PI * 2 - Math.PI / 2),
    running: false,
    speed: SPEEDS[i],
    raf: 0
  })));

  // Resize listener
  useEffect(() => {
    const h = () => {
      setVW(window.innerWidth);
      setVH(window.innerHeight);
    };
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);


  // Scroll Logic and GSAP
  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    // Intro animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      }
    });

    // Setup triggers for each panel within the pinning section
    const triggers: ScrollTrigger[] = [];
    let cur = -1;

    const startOrbit = (oi: number) => {
      const o = orbitState.current[oi];
      if (o.running) return;
      o.running = true;
      let last: number | null = null;

      const tick = (ts: number) => {
        if (!o.running) return;
        if (!last) last = ts;
        const dt = Math.min((ts - last) / 1e3, .05);
        last = ts;
        o.angles = o.angles.map(a => a + o.speed * dt);

        if (iconRefs.current[oi]) {
          iconRefs.current[oi]!.forEach((el, i) => {
            if (!el) return;
            const x = Math.cos(o.angles[i]) * ORBIT_R;
            const y = Math.sin(o.angles[i]) * ORBIT_R;
            el.style.transform = `translate(calc(-50% + ${x}px),calc(-50% + ${y}px))`;
          });
        }
        o.raf = requestAnimationFrame(tick);
      };
      tick(0);
    };

    const stopOrbit = (oi: number) => {
      const o = orbitState.current[oi];
      o.running = false;
      if (o.raf) cancelAnimationFrame(o.raf);
    };

    const showCard = (ci: number) => {
      const wrap = cardRefs.current[ci];
      if (!wrap) return;
      const o = orbitState.current[ci];
      stopOrbit(ci);

      const card = wrap.querySelector('.circ-card') as HTMLElement;
      const track = wrap.querySelector('.orbit-track') as HTMLElement;
      const glow = wrap.querySelector('.circ-glow') as HTMLElement;
      const glow2 = wrap.querySelector('.circ-glow2') as HTMLElement;

      o.angles = o.angles.map((_, j) => (j / CARDS[ci].icons.length) * Math.PI * 2 - Math.PI / 2);

      iconRefs.current[ci]!.forEach(el => {
        if (!el) return;
        gsap.killTweensOf(el);
        el.style.transform = 'translate(-50%,-50%) scale(0)';
        gsap.set(el, { opacity: 0, x: 0, y: 0 });
      });
      gsap.killTweensOf([card, glow, glow2]);

      if (track) track.style.opacity = '1';

      const stl = gsap.timeline();
      if (card) stl.to(card, { scale: 1, opacity: 1, duration: 1.0, ease: 'expo.out' }, 0);
      if (glow) stl.to(glow, { scale: 1, opacity: 1, duration: 1.0, ease: 'power2.out' }, .06);
      if (glow2) stl.to(glow2, { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' }, .0);

      iconRefs.current[ci]!.forEach((el, j) => {
        if (!el) return;
        const a = o.angles[j];
        const tx = Math.cos(a) * ORBIT_R;
        const ty = Math.sin(a) * ORBIT_R;
        stl.to(el, {
          opacity: 1,
          duration: .45,
          ease: 'power1.out',
          onStart() {
            gsap.fromTo(el, { x: 0, y: 0, scale: 0 }, {
              x: tx, y: ty, scale: 1, duration: 0.8, ease: 'expo.out',
              onComplete() { el.style.transform = ''; gsap.set(el, { x: 0, y: 0 }); }
            });
          }
        }, .38 + j * .055);
      });

      stl.call(() => startOrbit(ci), [], (.38 + CARDS[ci].icons.length * .055 + .6));
      setActiveIdx(ci);
    };

    const hideCard = (ci: number, cb?: () => void) => {
      const wrap = cardRefs.current[ci];
      if (!wrap) {
        if (cb) cb();
        return;
      }
      stopOrbit(ci);

      const card = wrap.querySelector('.circ-card') as HTMLElement;
      const track = wrap.querySelector('.orbit-track') as HTMLElement;
      const glow = wrap.querySelector('.circ-glow') as HTMLElement;
      const glow2 = wrap.querySelector('.circ-glow2') as HTMLElement;

      if (track) track.style.opacity = '0';

      const htl = gsap.timeline({ onComplete: cb });
      iconRefs.current[ci]!.forEach((el, j) => {
        if (!el) return;
        gsap.killTweensOf(el);
        htl.to(el, { opacity: 0, scale: 0, duration: .3, ease: 'power2.inOut', delay: j * .015 }, 0);
      });
      if (card) htl.to(card, { scale: .7, opacity: 0, duration: .4, ease: 'power2.inOut' }, 0);
      if (glow && glow2) htl.to([glow, glow2], { scale: .5, opacity: 0, duration: .35, ease: 'power2.inOut' }, 0);
    };

    const go = (next: number) => {
      if (next === cur) return;
      const prev = cur;
      cur = next;

      if (prev >= 0) {
        hideCard(prev, () => { if (cur === next && next >= 0) showCard(next); });
      } else if (next >= 0) {
        gsap.to([panelLeftRef.current, panelRightRef.current], { opacity: 1, x: 0, duration: .6, ease: 'power2.out' });
        showCard(next);
      }

      if (next === 0) {
        gsap.to(scrollHintRef.current, { opacity: 0, duration: .4 });
      }
      if (next < 0) {
        gsap.to([panelLeftRef.current, panelRightRef.current], { opacity: 0, x: 0, duration: .4 });
        setActiveIdx(-1);
      }
    };

    // Create ScrollTriggers for each panel
    // Using window relative triggers since the container is absolutely positioned and pinned
    const panels = document.querySelectorAll('.skills-scroll-panel');
    panels.forEach((panel, i) => {
      const idx = i - 1; // -1 is intro
      const st = ScrollTrigger.create({
        trigger: panel,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => go(idx),
        onEnterBack: () => go(idx),
        onLeave: () => { if (cur === idx) go(-1); },
        onLeaveBack: () => { if (cur === idx) go(-1); },
      });
      triggers.push(st);
    });

    // Intro animation timeline (runs every time the container is reached)
    const introTl = gsap.timeline({ paused: true });
    introTl.to('#tOutline', { strokeDashoffset: 0, duration: 2.1, ease: 'power2.inOut' }, .3);
    introTl.to('#tGlow', { opacity: 1, duration: .9, ease: 'power2.in' }, 1.1);
    introTl.to('#tFill', { opacity: 1, duration: .5, ease: 'power2.inOut' }, 1.8);
    introTl.to(['#tOutline', '#tGlow'], { opacity: 0, duration: .4 }, 2.1);
    introTl.to(titleWrapRef.current, { top: 48, left: '50%', scale: .4, transformOrigin: 'top center', duration: 1.1, ease: 'expo.inOut' }, 2.7);
    introTl.to(scrollHintRef.current, { opacity: 1, duration: .6 }, 3.5);
    introTl.to(bottomBarRef.current, { opacity: 1, duration: .6 }, 3.5);
    introTl.to(orbitContainerRef.current, { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }, 3.5);

    const introSt = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 50%', // Start animating into view before it hits top
      onEnter: () => {
        // Play intro when scrolling down the first time
        if (cur <= 0) introTl.play();
      },
      onEnterBack: () => {
        // Coming back up from WhyWorkWithMe - set to completed state
        introTl.progress(1);
      },
      onLeave: () => {
        // Scrubbed past the entire section downwards
        introTl.pause(0);
        gsap.set(['#tOutline', '#tGlow', '#tFill', titleWrapRef.current, scrollHintRef.current, bottomBarRef.current, orbitContainerRef.current], { clearProps: 'all' });
      },
      onLeaveBack: () => {
        // Scrolling UP past the intro section towards the top of page
        // Play the animation perfectly in reverse!
        introTl.reverse();
        
        // Ensure the orbital icons definitively hide
        go(-1);
      }
    });
    triggers.push(introSt);

    // Pin the display area while scrolling through the panels
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: containerRef.current,
      pinSpacing: false,
      onUpdate: (self) => {
        setScrollPct(Math.round(self.progress * 100));
      }
    });

    return () => {
      triggers.forEach(t => t.kill());
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === sectionRef.current || t.vars.pin === containerRef.current) {
          t.kill();
        }
      });
      CARDS.forEach((_, i) => stopOrbit(i));
    };
  }, [vw, vh]);

  const scrollToPanel = (idx: number) => {
    const panels = document.querySelectorAll('.skills-scroll-panel');
    if (panels[idx + 1]) { // +1 to skip intro panel
      panels[idx + 1].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} id="skills" className="relative bg-black" style={{ '--orange': '#2ee7ff', '--orange-dim': 'rgba(255,255,255,0.55)', '--orange-glow': 'rgba(46,231,255,0.18)', '--white': 'rgba(255,255,255,0.92)', '--muted': 'rgba(255,255,255,0.35)', '--dim': 'rgba(255,255,255,0.12)' } as React.CSSProperties}>

      {/* The pinned visual container */}
      <div ref={containerRef} className="h-screen w-full relative overflow-hidden font-['DM_Sans',sans-serif] cursor-default text-white">

        {/* Static Grid Background Removed */}

        {/* Title Wrap */}
        <div ref={titleWrapRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-[50px] pointer-events-none z-[100]">
          <svg className="block overflow-visible w-[820px] max-w-[90vw]" viewBox="0 0 820 100">
            <defs>
              <filter id="fG" x="-15%" y="-80%" width="130%" height="260%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="13" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="fS" x="-8%" y="-50%" width="116%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <text id="tGlow" x="410" y="80" textAnchor="middle" filter="url(#fG)" className="font-[Sora,sans-serif] font-[800] text-[clamp(46px,6.5vw,86px)] fill-[#ff6b2b33] opacity-0">Skills &amp; Tech</text>
            <text id="tOutline" x="410" y="80" textAnchor="middle" filter="url(#fS)" className="font-[Sora,sans-serif] font-[800] text-[clamp(46px,6.5vw,86px)] fill-none stroke-[rgba(255,255,255,0.9)] stroke-[1.5px] [stroke-dasharray:22000] [stroke-dashoffset:22000] [paint-order:stroke_fill]">Skills &amp; Tech</text>
            <text id="tFill" x="410" y="80" textAnchor="middle" filter="url(#fS)" className="font-[Sora,sans-serif] font-[800] text-[clamp(46px,6.5vw,86px)] fill-white opacity-0">Skills &amp; Tech</text>
          </svg>
        </div>

        {/* Scroll Hint */}
        <div ref={scrollHintRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 opacity-0 pointer-events-none">
          <span className="text-[8px] font-semibold tracking-[3px] uppercase text-[var(--muted)]">Scroll</span>
          <div className="w-px h-[28px] bg-gradient-to-b from-[var(--orange)] to-transparent animate-[shp_1.8s_ease-in-out_infinite]"></div>
        </div>

        {/* Stage */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <div className="w-full h-full mx-auto relative px-4 md:px-8 xl:px-12">
            {/* Panel Left */}
          <div ref={panelLeftRef} className="absolute left-0 lg:left-0 xl:left-4 top-[6%] lg:top-1/2 -translate-y-0 lg:-translate-y-1/2 w-full lg:w-[clamp(320px,35vw,550px)] flex flex-col justify-center px-4 md:px-6 xl:px-0 pointer-events-none opacity-0 -translate-x-10 z-[30]">
            <div className={`font-['Bebas_Neue',sans-serif] text-[clamp(45px,10vw,120px)] leading-[0.7] tracking-[-2px] mb-2 lg:mb-4 transition-colors duration-600 ${activeIdx >= 0 ? 'text-white/5' : 'text-transparent'}`}>
              {activeIdx >= 0 ? String(activeIdx + 1).padStart(2, '0') : '01'}
            </div>

            <div
              className="font-display font-bold text-[clamp(20px,3.5vw,52px)] leading-[1.05] tracking-tight mb-3 lg:mb-5"
              dangerouslySetInnerHTML={{ __html: activeIdx >= 0 ? CARDS[activeIdx].label : '' }}
            />

            <div className="pl-4 lg:pl-5 border-l-2 border-[#EB422F] max-w-[400px]">
              <p className="text-[clamp(12px,1.2vw,18px)] text-white/70 leading-relaxed font-light">
                {activeIdx >= 0 ? CARDS[activeIdx].sub : ''}
              </p>
            </div>
          </div>

          {/* Panel Right */}
          <div ref={panelRightRef} className="absolute right-0 lg:right-0 xl:right-4 top-auto lg:top-1/2 bottom-[1%] lg:bottom-auto translate-y-0 lg:-translate-y-1/2 w-full lg:w-[clamp(280px,25vw,400px)] pointer-events-none opacity-0 translate-x-10 z-[30]">

            {/* Minimal Horizontal Connector Line rendering out from the center */}
            <div className="hidden lg:block absolute right-full top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-[var(--orange)] w-[15vw] max-w-[300px]" />
            <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-[var(--orange)] shadow-[0_0_12px_var(--orange)] -translate-x-1/2 z-10" />

            {/* Vertical Curved Tech Panel */}
            <div className="relative border-l border-y border-[rgba(255,255,255,0.15)] py-4 lg:py-8 pl-4 lg:pl-8 pr-3 lg:pr-4 mr-0 lg:mr-4 rounded-l-[20px] lg:rounded-l-[40px] bg-gradient-to-r from-[rgba(255,255,255,0.03)] to-transparent backdrop-blur-[8px] shadow-[-30px_0_50px_-30px_rgba(0,0,0,0.8)] before:content-[''] before:absolute before:left-[-1px] before:top-1/2 before:-translate-y-1/2 before:w-[2px] before:h-[20%] before:bg-[var(--orange)] before:shadow-[0_0_10px_var(--orange)]">

              <div className="text-[9px] lg:text-[11px] font-bold tracking-[2px] uppercase text-[var(--orange)] mb-3 lg:mb-6">Tools &amp; Stack</div>

              <div className="flex flex-wrap gap-1.5 lg:gap-2 mb-4 lg:mb-8">
                {activeIdx >= 0 && [...CARDS[activeIdx].chips, ...CARDS[activeIdx].icons].filter((v, i, a) => a.indexOf(v) === i).map((c, i) => (
                  <div key={i} className="text-[8px] md:text-[11px] font-semibold tracking-[0.5px] text-white/85 bg-white/[0.05] border border-white/20 rounded-full px-2.5 py-1 md:px-4 md:py-2 uppercase transition-all duration-300 hover:bg-white/15 hover:border-white/50 hover:text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
                    {c}
                  </div>
                ))}
              </div>

              <div className="w-full h-px bg-gradient-to-r from-white/20 to-transparent mb-3 lg:mb-5"></div>

              <div className="text-[8px] lg:text-[9px] font-bold tracking-[2.5px] uppercase text-white/40 mb-2 lg:mb-4">{activeIdx >= 0 ? CARDS[activeIdx].advLabel : 'Competencies'}</div>

              <div className="flex flex-col gap-2 lg:gap-4">
                {activeIdx >= 0 && CARDS[activeIdx].caps.map((c, i) => (
                  <div key={i} className="flex items-start gap-3 lg:gap-4 pr-2">
                    <div className="w-1 h-1 rounded-full shrink-0 bg-[var(--orange-dim)] mt-1.5 lg:mt-2 shadow-[0_0_6px_var(--orange-glow)]"></div>
                    <div className="text-[clamp(10px,1vw,13px)] font-medium text-white/50 leading-relaxed hover:text-white/80 transition-colors">{c}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Card Anchor (Center) */}
          <div ref={orbitContainerRef} className="absolute top-1/2 left-1/2 w-0 h-0 opacity-0 scale-90">
            {CARDS.map((data, ci) => (
              <div key={ci} ref={el => cardRefs.current[ci] = el} className="absolute pointer-events-auto" style={{ width: CARD_D, height: CARD_D, left: -CARD_D / 2, top: -CARD_D / 2 }}>
                <div className="circ-glow2 absolute top-1/2 left-1/2 rounded-full -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0 blur-[30px] pointer-events-none bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,80,20,0.14)_0%,transparent_70%)]" style={{ width: CARD_D * 2.1, height: CARD_D * 2.1 }}></div>
                <div className="circ-glow absolute top-1/2 left-1/2 rounded-full -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0 blur-[42px] pointer-events-none bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,107,43,0.28)_0%,rgba(255,60,15,0.12)_44%,transparent_70%)]" style={{ width: CARD_D * 1.54, height: CARD_D * 1.54 }}></div>
                <div className="orbit-track absolute top-1/2 left-1/2 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none border-[0.5px] border-white/60 opacity-0 transition-opacity duration-600" style={{ width: ORBIT_R * 2, height: ORBIT_R * 2 }}></div>

                <div className="circ-card absolute top-0 left-0 w-full h-full scale-0 opacity-0">
                  {/* Replaced animated spinning rings with a static 25px outer glow */}
                  <div className="w-full h-full rounded-full border border-[rgba(255,255,255,0.055)] shadow-[0_0_25px_rgba(255,107,43,0.35)] flex items-center justify-center overflow-hidden relative backdrop-blur-[36px] saturate-[1.7] bg-[radial-gradient(ellipse_85%_85%_at_38%_32%,rgba(22,15,10,0.97)_0%,rgba(13,8,4,0.99)_58%,rgba(5,3,1,1)_100%)] after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[60%] after:h-[36%] after:rounded-full after:bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,255,255,0.07)_0%,transparent_72%)] pointer-events-none before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-[radial-gradient(circle,rgba(255,255,255,0.03)_1px,transparent_1px)] before:bg-[size:20px_20px]">
                    <div className="relative z-[2] w-[80%] h-[80%] flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden [scrollbar-width:none]">
                      <div className="text-[clamp(10px,1.2vw,12px)] font-bold tracking-[2.8px] uppercase text-[var(--orange)] mb-2 text-center" dangerouslySetInnerHTML={{ __html: data.circleLabel }}></div>
                      <div className="font-display text-[clamp(14px,1vw,16px)] font-medium text-white/90 leading-relaxed text-center mb-2 tracking-tight px-6" dangerouslySetInnerHTML={{ __html: data.title.replace('\n', '<br>') }}></div>
                      <div className="text-[clamp(12px,1vw,14px)] font-normal text-white/50 leading-relaxed text-center mb-4 hidden">{data.sub}</div>
                      <div className="w-[48px] h-px shrink-0 bg-gradient-to-r from-transparent via-[var(--orange)] to-transparent mx-auto mb-4"></div>
                      {/* Duplicate inside tags removed to prevent repetition */}
                    </div>
                  </div>
                </div>

                <div className="absolute top-[50%] left-[50%] w-0 h-0 pointer-events-none z-[30]">
                  {data.icons.map((name, i) => {
                    const ic = ICON_SVGS[name] || { bg: '#111', svg: `<span style="font-size:10px;font-weight:700;color:#fff;">${name.slice(0, 3)}</span>` };
                    return (
                      <div key={i} ref={el => iconRefs.current[ci][i] = el!} className="absolute flex flex-col items-center gap-1 pointer-events-auto cursor-default opacity-0 -translate-x-1/2 -translate-y-1/2 group">
                        <div className="w-[60px] h-[60px] rounded-[16px] flex items-center justify-center border-2 border-white/80 relative overflow-hidden transition-all duration-260 ease-out-expo backdrop-blur-md bg-black group-hover:scale-[1.22] group-hover:-translate-y-1 shadow-[0_8px_24px_rgba(0,0,0,0.6)] group-hover:shadow-[0_8px_32px_rgba(255,255,255,0.4)]">
                          {ic.img ? (
                            <img src={ic.img} alt={name} className="w-[36px] h-[36px] object-contain drop-shadow-lg" />
                          ) : (
                            <div dangerouslySetInnerHTML={{ __html: ic.svg?.replace('width="26" height="26"', 'width="36" height="36"') || '' }} className="drop-shadow-lg flex items-center justify-center [&>svg]:w-[36px] [&>svg]:h-[36px] [&>svg]:object-contain" />
                          )}
                        </div>
                        <div className="text-[10px] font-medium tracking-[0.5px] text-white/50 text-center leading-[1.3] max-w-[80px] transition-colors duration-180 whitespace-nowrap group-hover:text-white uppercase">{name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* Bottom Bar */}
        <div ref={bottomBarRef} className="absolute bottom-0 left-0 right-0 h-[48px] z-[200] flex items-center px-9 pointer-events-none opacity-0 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-[var(--dim)]">
          <div className="flex flex-1 items-center">
            {CARDS.map((c, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="w-[30px] h-px bg-[var(--dim)] mx-2"></div>}
                <div onClick={() => scrollToPanel(i)} className={`flex items-center gap-3 cursor-pointer pointer-events-auto pr-4 group bb-step ${activeIdx === i ? 'active' : ''}`}>
                  <span className={`font-['Bebas_Neue',sans-serif] text-[13px] tracking-[1px] transition-colors duration-300 ${activeIdx === i ? 'text-[var(--orange)]' : 'text-[rgba(255,255,255,0.18)]'}`}>0{i + 1}</span>
                  <span className={`text-[9px] font-semibold tracking-[1.5px] uppercase transition-colors duration-300 ${activeIdx === i ? 'text-[rgba(255,255,255,0.65)]' : 'text-[rgba(255,255,255,0.18)]'}`}>{c.short}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="text-[9px] font-semibold tracking-[1px] text-[var(--muted)]">{String(scrollPct).padStart(2, '0')}%</div>
        </div>
      </div>

      {/* Scroll Panels (Invisible spacers) */}
      <div className="relative z-[1]">
        <div className="h-[80vh] w-full skills-scroll-panel" id="panel-intro"></div>
        {CARDS.map((_, i) => (
          <div key={i} className="h-[90vh] w-full skills-scroll-panel" id={`panel-${i}`}></div>
        ))}
      </div>

      <style>{`
                @keyframes shp { 0%,100%{opacity:.35;transform:scaleY(.75)} 50%{opacity:1;transform:scaleY(1)} }
                @keyframes cspin { to { transform: rotate(360deg) } }
            `}</style>
    </section>
  );
};

export default Skills;
