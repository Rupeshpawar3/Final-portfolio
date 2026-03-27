import { useEffect, useRef, useState } from "react";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

const DashCard = ({ children, style, className, onMouseMove, onMouseLeave, ...props }: any) => {
  const radius = 250; 
  const [visible, setVisible] = useState(false);
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove(e: any) {
    let { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
    if (onMouseMove) onMouseMove(e);
  }

  const wrapperStyle: any = {};
  const innerStyle: any = { ...style };
  
  if (innerStyle.animation) {
    wrapperStyle.animation = innerStyle.animation;
    delete innerStyle.animation;
  }
  if (innerStyle.gridColumn) {
    wrapperStyle.gridColumn = innerStyle.gridColumn;
    delete innerStyle.gridColumn;
  }

  return (
    <div 
      className={`xrd-card-wrapper relative p-[1px] rounded-[15px] overflow-hidden ${className || ''}`}
      style={wrapperStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={(e) => { setVisible(true); if (props.onMouseEnter) props.onMouseEnter(e); }}
      onMouseLeave={(e) => { setVisible(false); if (onMouseLeave) onMouseLeave(e); }}
      {...props}
    >
      <div className="absolute inset-0 z-0 bg-[#333] rounded-[15px]" style={{ opacity: 0.2 }} />
      
      <motion.div
        className="absolute inset-0 z-0 transition-opacity duration-300 pointer-events-none rounded-[15px]"
        style={{
          background: useMotionTemplate`radial-gradient(${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.4), rgba(235, 66, 47, 0.3) 40%, transparent 80%)`,
        }}
      />
      
      <div className="absolute inset-[1px] rounded-[14px] z-0 overflow-hidden" style={{ background: innerStyle.background || '#0e0e0e' }} />
      
      <div className="relative z-10 w-full h-full flex flex-col" style={{ ...innerStyle, background: 'transparent' }}>
        {children}
      </div>
    </div>
  );
};


/* ─────────────────────────────────────────────────────────────
   XR Dashboard — ported from the user's reference HTML/CSS/JS.
   Cursor-related code intentionally omitted per user request.
───────────────────────────────────────────────────────────── */

const XRDashboard = () => {
  /* ── STATE ── */
  const [activePip, setActivePip] = useState(0);
  const [sysPct, setSysPct] = useState(72);
  const [subText, setSubText] = useState("");
  const [statNum, setStatNum] = useState("0+");
  const [barsVisible, setBarsVisible] = useState(false);

  const chartRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const flagRef = useRef<SVGPathElement>(null);
  const cubeRef = useRef<SVGSVGElement>(null);

  const barData = [35, 50, 40, 66, 55, 78, 62, 88, 70, 95, 80, 92];
  const steps = ["Research & goals", "Interaction strategy", "Build and test", "Deploy and refine"];
  const progressWidths = ["25%", "50%", "75%", "100%"];

  /* ── TYPEWRITER ── */
  useEffect(() => {
    const txt = "// SYSTEM ONLINE — XR v4.2.1";
    let i = 0;
    const tick = () => {
      if (i < txt.length) {
        setSubText(txt.slice(0, ++i));
        setTimeout(tick, 30 + Math.random() * 22);
      }
    };
    const t = setTimeout(tick, 550);
    return () => clearTimeout(t);
  }, []);

  /* ── PIPELINE AUTO CYCLE ── */
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePip(p => (p + 1) % 4);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  /* ── SYS PERCENT LIVE ── */
  useEffect(() => {
    const iv = setInterval(() => {
      setSysPct(v => Math.round(Math.max(60, Math.min(94, v + (Math.random() - 0.48) * 1.4))));
    }, 1500);
    return () => clearInterval(iv);
  }, []);

  /* ── COUNTER ── */
  useEffect(() => {
    if (!statRef.current) return;
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        let f = 0, tot = 85;
        const tick = () => {
          f++;
          const p = 1 - Math.pow(1 - f / tot, 4);
          const v = Math.round(p * 3000);
          setStatNum(v >= 1000 ? (v / 1000).toFixed(1).replace(".0", "") + "K+" : v + "+");
          if (f < tot) requestAnimationFrame(tick); else setStatNum("3K+");
        };
        tick();
        io.disconnect();
      }
    }, { threshold: 0.5 });
    io.observe(statRef.current!);
    return () => io.disconnect();
  }, []);

  /* ── BARS VISIBLE ── */
  useEffect(() => {
    if (!chartRef.current) return;
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { setBarsVisible(true); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(chartRef.current!);
    return () => io.disconnect();
  }, []);

  /* ── FLAG WAVE ── */
  useEffect(() => {
    let ft = 0, raf = 0;
    const wave = () => {
      ft += 0.045;
      const w = Math.sin(ft) * 3.8, w2 = Math.sin(ft + 1) * 1.9, w3 = Math.sin(ft + 2) * 2.2;
      flagRef.current?.setAttribute("d", `M8 6 L${32 + w} ${14 + w2} L${8 + w3} 22 Z`);
      raf = requestAnimationFrame(wave);
    };
    raf = requestAnimationFrame(wave);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ── CUBE BREATHE ── */
  useEffect(() => {
    let ct = 0, raf = 0;
    const breathe = () => {
      ct += 0.028;
      const s = 1 + Math.sin(ct) * 0.04;
      if (cubeRef.current) {
        cubeRef.current.style.transform = `scale(${s})`;
        cubeRef.current.style.filter = `drop-shadow(0 0 ${8 + Math.sin(ct) * 5}px rgba(224,40,26,${0.2 + Math.sin(ct) * 0.12}))`;
      }
      raf = requestAnimationFrame(breathe);
    };
    raf = requestAnimationFrame(breathe);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ── 3D TILT HELPER ── */
  const onCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width - 0.5;
    const cy = (e.clientY - r.top) / r.height - 0.5;
    el.style.transition = "transform .08s ease";
    el.style.transform = `perspective(900px) translateY(-5px) rotateX(${cy * -9}deg) rotateY(${cx * 9}deg)`;
  };
  const onCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transition = "transform .5s cubic-bezier(0.23,1,0.32,1)";
    el.style.transform = "";
  };

  const cardProps = { onMouseMove: onCardMove, onMouseLeave: onCardLeave };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#f0f0f0", padding: "16px", position: "relative", zIndex: 2 }}>
      {/* ── import fonts inline ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Share+Tech+Mono&family=DM+Sans:wght@300;400;500&display=swap');

        .xrd-card {
          background: #111;
          /* border: 1px solid rgba(255,255,255,0.07); */
          border-radius: 14px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 28px 56px rgba(0,0,0,0.75);
          transition: transform .4s cubic-bezier(0.23,1,0.32,1), box-shadow .4s, border-color .3s;
          will-change: transform;
        }
        .xrd-card::before {
          content:'';position:absolute;inset:0;border-radius:inherit;
          background:linear-gradient(150deg,rgba(255,255,255,0.04) 0%,transparent 40%);
          pointer-events:none;z-index:1;
        }
        .xrd-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 40px 80px rgba(0,0,0,0.88), 0 0 50px rgba(224,40,26,0.12);
        }
        .xrd-card::after {
          
        }
        @property --a{syntax:'<angle>';initial-value:0deg;inherits:false}
        @keyframes xrd-spin{to{--a:360deg}}
        .xrd-card:hover::after { opacity:1; animation-play-state:running; }

        .xrd-tag { padding:4px 12px; border-radius:8px; font-size:12px; font-weight:500; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.05); color:#bbb; transition:all .28s cubic-bezier(0.23,1,0.32,1); cursor:default; }
        .xrd-tag:hover { background:rgba(224,40,26,0.12); border-color:rgba(224,40,26,0.4); color:#fff; transform:translateY(-2px); }

        @keyframes xrd-accent-grow { to { width:100px } }
        @keyframes xrd-accent-pulse { 0%,100%{opacity:.55;box-shadow:0 0 12px #e0281a}50%{opacity:1;box-shadow:0 0 22px #e0281a,0 0 44px rgba(224,40,26,0.4)} }
        @keyframes xrd-fade-up { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
        @keyframes xrd-scale-in { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
        @keyframes xrd-sys-dot { 0%,100%{opacity:1}50%{opacity:.15} }
        @keyframes xrd-sys-fill { from{width:0} to{width:72%} }
        @keyframes xrd-badge-pulse { 0%,100%{box-shadow:0 0 12px rgba(224,40,26,.1)}50%{box-shadow:0 0 26px rgba(224,40,26,.28),0 0 52px rgba(224,40,26,.1)} }
        @keyframes xrd-globe-float { 0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)} }
        @keyframes xrd-globe-pulse { 0%,100%{filter:drop-shadow(0 0 22px rgba(224,40,26,.55)) drop-shadow(0 0 44px rgba(180,20,10,.3))}50%{filter:drop-shadow(0 0 40px rgba(224,40,26,.88)) drop-shadow(0 0 80px rgba(180,20,10,.5))} }
        @keyframes xrd-o-spin  { from{transform:rotate(0deg)}to{transform:rotate(360deg)} }
        @keyframes xrd-o-spinR { from{transform:rotate(0deg)}to{transform:rotate(-360deg)} }
        @keyframes xrd-dp { 0%,100%{opacity:.9}50%{opacity:.15} }
        @keyframes xrd-head-pulse { 0%,100%{transform:translateY(-50%) scale(1)}50%{transform:translateY(-50%) scale(1.4)} }
        @keyframes xrd-arr { 0%,100%{transform:translateX(0)}50%{transform:translateX(4px)} }
        @keyframes xrd-ripple { to{transform:scale(3);opacity:0} }
        @keyframes xrd-glitchR { 0%,84%,100%{opacity:0;transform:translate(0)}86%{opacity:.7;clip-path:inset(20% 0 55% 0);transform:translate(-3px,1px)}88%{opacity:.5;clip-path:inset(55% 0 15% 0);transform:translate(3px,-2px)}90%{opacity:0} }
        @keyframes xrd-glitchO { 0%,84%,100%{opacity:0;transform:translate(0)}87%{opacity:.55;clip-path:inset(10% 0 65% 0);transform:translate(3px,-1px)}89%{opacity:.35;clip-path:inset(65% 0 5% 0);transform:translate(-2px,2px)}91%{opacity:0} }

        .xrd-ci {
          background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.07);
          border-radius:12px;padding:16px;cursor:pointer;
          transition:all .32s cubic-bezier(0.23,1,0.32,1);
        }
        .xrd-ci:hover { background:rgba(224,40,26,0.05);border-color:rgba(224,40,26,0.18);transform:translateY(-3px);box-shadow:0 14px 30px rgba(0,0,0,0.5); }
        .xrd-pip {
          padding:12px 8px; text-align:center; cursor:pointer;
          font-family:'Orbitron',monospace; font-size:9.5px; font-weight:700;
          color:#555; letter-spacing:.06em; text-transform:uppercase;
          background:rgba(255,255,255,0.02); border-right:1px solid rgba(255,255,255,0.06);
          transition:all .35s cubic-bezier(0.23,1,0.32,1);
        }
        .xrd-pip:last-child{border-right:none;}
        .xrd-pip:hover{color:#ccc;background:rgba(224,40,26,0.06);}
        .xrd-pip.on{color:#f0f0f0;background:rgba(224,40,26,0.1);box-shadow:inset 0 0 0 1px rgba(224,40,26,0.2);}
        .xrd-mb {
          flex:1; border-radius:2px 2px 0 0;
          background:linear-gradient(180deg,rgba(224,40,26,0.55),rgba(224,40,26,0.15));
          transform: scaleY(0); transform-origin: bottom;
          transition: transform .7s cubic-bezier(0.23,1,0.32,1), background .25s, box-shadow .25s;
        }
        .xrd-mb.visible{transform:scaleY(1);}
        .xrd-mb.tall{background:linear-gradient(180deg,rgba(255,60,30,0.75),rgba(224,40,26,0.22));box-shadow:0 0 8px rgba(224,40,26,0.6);}
        .xrd-mb:hover{background:linear-gradient(180deg,#e0281a,rgba(224,40,26,0.3))!important;box-shadow:0 0 12px rgba(224,40,26,0.7)!important;}
        .xrd-vs { background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:12px 16px;cursor:pointer;transition:all .3s cubic-bezier(0.23,1,0.32,1); }
        .xrd-vs:hover{background:rgba(224,40,26,0.06);border-color:rgba(224,40,26,0.2);transform:translateY(-2px);}
      `}</style>

      <div className="grid grid-cols-1 xl:grid-cols-[1.28fr_1fr] gap-4 max-w-[1400px] mx-auto">

        {/* ══ HERO ══ */}
        <DashCard className="xrd-card p-8" style={{ background: "radial-gradient(ellipse 65% 55% at 90% 115%,rgba(180,20,10,0.13),transparent 60%),radial-gradient(ellipse 45% 35% at 5% -5%,rgba(255,255,255,0.02),transparent 55%),#0e0e0e", animation: "xrd-fade-up .7s cubic-bezier(0.23,1,0.32,1) .05s both" }} {...cardProps}>
          {/* Accent line */}
          <div style={{ position: "absolute", bottom: 0, left: 32, height: 2, background: "linear-gradient(90deg,#e0281a,rgba(255,100,60,0.7))", boxShadow: "0 0 16px #e0281a", animation: "xrd-accent-grow 1.2s cubic-bezier(0.23,1,0.32,1) .5s forwards, xrd-accent-pulse 2.8s ease-in-out 1.7s infinite", width: 0 }} />
          {/* Circuit art */}
          <svg style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 160, opacity: .06 }} viewBox="0 0 160 500" fill="none">
            <path d="M140 30 L140 90 L100 90 L100 150 L140 150 L140 210" stroke="rgba(224,40,26,0.45)" strokeWidth="1"/>
            <circle cx="140" cy="90" r="3.5" fill="none" stroke="rgba(224,40,26,0.5)" strokeWidth="1"/>
            <circle cx="100" cy="150" r="4.5" fill="rgba(224,40,26,0.08)" stroke="rgba(224,40,26,0.45)" strokeWidth="1"/>
            <path d="M100 210 L100 270 L60 270 L60 340" stroke="rgba(224,40,26,0.25)" strokeWidth="1"/>
          </svg>

          <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" as const, position: "relative", zIndex: 2 }}>
            {["XR", "Engineering", "Creative Technologist"].map(t => <span key={t} className="xrd-tag" style={{ fontFamily: "'DM Sans',sans-serif" }}>{t}</span>)}
          </div>
          <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 10, color: "rgba(224,40,26,0.55)", letterSpacing: ".14em", textTransform: "uppercase" as const, marginBottom: 8, position: "relative", zIndex: 2 }}>{subText}</div>
          <div style={{ position: "relative", zIndex: 2 }}>
            <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(28px,4vw,50px)", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-.02em", marginBottom: 16, background: "linear-gradient(140deg,#fff 0%,#d8d8d8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              XR & Immersive Experience Design
            </h1>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.72, color: "#aaa", maxWidth: 430, marginBottom: 32, fontWeight: 400, position: "relative", zIndex: 2 }}>
            Designing immersive products across XR, UI/UX, 3D visuals, and frontend systems for real-time digital experiences.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" as const, position: "relative", zIndex: 2 }}>
            {[
              { label: "Creative Technologist", style: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#d0d0d0" } },
              { label: "Concept › Design › Build › Ship", style: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#aaa" } }
            ].map(b => (
              <button key={b.label} style={{ padding: "12px 24px", fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500, borderRadius: 8, cursor: "pointer", transition: "all .3s", ...b.style }}>{b.label}</button>
            ))}
          </div>
          <div style={{ marginTop: 24, padding: "8px 16px", border: "1px solid rgba(224,40,26,0.12)", borderRadius: 8, background: "rgba(224,40,26,0.03)", display: "flex", alignItems: "center", gap: 16, fontFamily: "'Share Tech Mono',monospace", fontSize: 10, color: "rgba(224,40,26,0.45)", letterSpacing: ".08em", position: "relative", zIndex: 2 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(80,240,120,0.9)", boxShadow: "0 0 8px rgba(80,240,120,0.8)", animation: "xrd-sys-dot .9s step-end infinite", flexShrink: 0 }} />
            <span>PORTFOLIO SYSTEM: ACTIVE</span>
            <div style={{ flex: 1, height: 2, background: "rgba(224,40,26,0.1)", borderRadius: 1, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 1, background: "linear-gradient(90deg,#e0281a,rgba(255,100,60,.7))", boxShadow: "0 0 6px #e0281a", animation: "xrd-sys-fill 2.5s cubic-bezier(0.23,1,0.32,1) .7s both" }} />
            </div>
            <span style={{ color: "rgba(80,240,120,0.7)", fontSize: 10 }}>{sysPct}%</span>
          </div>
        </DashCard>

        {/* ══ VISION ══ */}
        <DashCard className="xrd-card" style={{ background: "radial-gradient(ellipse 85% 65% at 50% 48%,rgba(200,18,10,0.12),transparent 65%),#0a0a0a", display: "flex", flexDirection: "column" as const, animation: "xrd-scale-in .72s cubic-bezier(0.23,1,0.32,1) .14s both" }} {...cardProps}>
          <div style={{ padding: "24px 24px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9.5, color: "rgba(224,40,26,0.45)", letterSpacing: ".16em", textTransform: "uppercase" as const, marginBottom: 8 }}>// VISION MATRIX</div>
              <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: 18, fontWeight: 700, lineHeight: 1.22, color: "#f0f0f0", maxWidth: 200, letterSpacing: "-.01em" }}>Immersive Systems Development</h2>
            </div>
            <div style={{ background: "rgba(224,40,26,0.07)", border: "1px solid rgba(224,40,26,0.28)", borderRadius: 8, padding: "8px 16px", fontFamily: "'Orbitron',monospace", fontSize: 12, fontWeight: 800, color: "#e0281a", animation: "xrd-badge-pulse 2.6s ease-in-out infinite", flexShrink: 0 }}>XR / IMMERSIVE</div>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 0 8px", minHeight: 200 }}>
            <div style={{ position: "relative", width: 210, height: 210, animation: "xrd-globe-float 5.5s ease-in-out infinite" }}>
              <svg style={{ width: 210, height: 210, animation: "xrd-globe-pulse 3.8s ease-in-out infinite" }} viewBox="0 0 210 210">
                <defs>
                  <radialGradient id="xgg1" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#e0281a" stopOpacity=".28"/>
                    <stop offset="55%" stopColor="#a01210" stopOpacity=".09"/>
                    <stop offset="100%" stopColor="#500808" stopOpacity="0"/>
                  </radialGradient>
                  <radialGradient id="xgg2" cx="42%" cy="38%" r="58%">
                    <stop offset="0%" stopColor="#c0201a" stopOpacity=".42"/>
                    <stop offset="45%" stopColor="#801008" stopOpacity=".16"/>
                    <stop offset="100%" stopColor="#280404" stopOpacity=".03"/>
                  </radialGradient>
                  <filter id="xgf"><feGaussianBlur stdDeviation="2.8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                  <clipPath id="xsc"><circle cx="105" cy="105" r="70"/></clipPath>
                </defs>
                <circle cx="105" cy="105" r="100" fill="url(#xgg1)"/>
                <g style={{ animation: "xrd-o-spin 17s linear infinite", transformOrigin: "105px 105px" }}>
                  <ellipse cx="105" cy="105" rx="98" ry="23" fill="none" stroke="#e0281a" strokeWidth=".9" strokeOpacity=".28" filter="url(#xgf)"/>
                </g>
                <g style={{ animation: "xrd-o-spinR 24s linear infinite", transformOrigin: "105px 105px" }}>
                  <ellipse cx="105" cy="105" rx="86" ry="20" fill="none" stroke="#ff3020" strokeWidth="1.2" strokeOpacity=".45" transform="rotate(-20 105 105)" filter="url(#xgf)"/>
                </g>
                <circle cx="105" cy="105" r="70" fill="#060101" stroke="#a01010" strokeWidth="1" strokeOpacity=".45"/>
                <circle cx="105" cy="105" r="70" fill="url(#xgg2)"/>
                <g clipPath="url(#xsc)" filter="url(#xgf)">
                  <ellipse cx="105" cy="105" rx="17" ry="70" fill="none" stroke="#e0281a" strokeWidth=".75" strokeOpacity=".5"/>
                  <ellipse cx="105" cy="105" rx="36" ry="70" fill="none" stroke="#e0281a" strokeWidth=".55" strokeOpacity=".36"/>
                  <ellipse cx="105" cy="105" rx="54" ry="70" fill="none" stroke="#e0281a" strokeWidth=".55" strokeOpacity=".26"/>
                  <ellipse cx="105" cy="105" rx="70" ry="25" fill="none" stroke="#e0281a" strokeWidth=".85" strokeOpacity=".44"/>
                  <ellipse cx="105" cy="68"  rx="70"  ry="11" fill="none" stroke="#e0281a" strokeWidth=".65" strokeOpacity=".34"/>
                  <ellipse cx="105" cy="142" rx="70"  ry="11" fill="none" stroke="#e0281a" strokeWidth=".65" strokeOpacity=".34"/>
                </g>
                <circle cx="105" cy="105" r="70" fill="none" stroke="#c01810" strokeWidth="1.5" strokeOpacity=".6" filter="url(#xgf)"/>
                {[{cx:198,cy:105,r:5,d:".9s"},{cx:14,cy:105,r:3.5,d:"1.7s"},{cx:162,cy:42,r:4,d:"1.5s"},{cx:50,cy:62,r:3,d:"2.1s"}].map((p,i)=>(
                  <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="#e0281a" style={{ animation: `xrd-dp 2.4s ease-in-out infinite ${p.d}` }} />
                ))}
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-4 px-4 pb-5 border-t border-white/5 mt-1">
            {[["Immersive", "RISK"], ["Cross-Platform", "PLATFORM"], ["Collaborative Delivery", "COLLABORATION"]].map(([t, s]) => (
              <div key={t} className="xrd-vs">
                <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 12.5, fontWeight: 700, color: "#e8e8e8", marginBottom: 3 }}>{t}</div>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9.5, color: "#999", letterSpacing: ".05em" }}>{s}</div>
              </div>
            ))}
          </div>
        </DashCard>

        {/* ══ CAPABILITY ══ */}
        <DashCard className="xrd-card" style={{ padding: "24px", background: "#0e0e0e", animation: "xrd-fade-up .7s cubic-bezier(0.23,1,0.32,1) .24s both", gridColumn: "1" }} {...cardProps}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 26, height: 26, borderRadius: 4, border: "1px solid rgba(224,40,26,0.25)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(224,40,26,0.06)", flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5" height="5" stroke="#e0281a" strokeWidth="1" fill="rgba(224,40,26,0.1)"/>
                <rect x="8" y="1" width="5" height="5" stroke="#e0281a" strokeWidth="1" fill="rgba(224,40,26,0.08)"/>
                <rect x="1" y="8" width="5" height="5" stroke="#c01810" strokeWidth="1" fill="rgba(192,24,16,0.06)"/>
                <rect x="8" y="8" width="5" height="5" stroke="#e0281a" strokeWidth="1" fill="rgba(224,40,26,0.08)"/>
              </svg>
            </div>
            <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 14, fontWeight: 700, color: "#e0e0e0", letterSpacing: ".01em" }}>Creative &amp; Technical Capability</div>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,rgba(224,40,26,0.2),transparent)" }}/>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 10, color: "rgba(224,40,26,0.35)", letterSpacing: ".08em" }}>06 MODULES</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {[
              { t: "Experience Strategy", d: "Defining product direction, user flows, and immersive use cases.", tag: "MODULE_01 // IDEATION" },
              { t: "Interaction Design", d: "Designing intuitive interfaces and motion-driven experiences.", tag: "MODULE_02 // UX-UI" },
              { t: "XR Development", d: "Building AR/VR experiences in Unity, Unreal, AR Foundation, and WebXR.", tag: "MODULE_03 // DEPLOY" },
              { t: "Rapid Prototyping", d: "Testing ideas quickly through interactive prototypes and motion studies.", tag: "MODULE_04 // PROTO" },
              { t: "3D Visual Engineering", d: "Creating assets, scenes, and cinematic visuals for immersive media.", tag: "MODULE_05 // RAPID" },
              { t: "Spatial UX", d: "Designing for VR, spatial computing, and next-gen device experiences.", tag: "MODULE_06 // SPATIAL" },
            ].map(c => (
              <div key={c.t} className="xrd-ci" style={{ position: "relative", zIndex: 2 }}>
                <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 10, fontWeight: 700, color: "#d8d8d8", lineHeight: 1.4, marginBottom: 8, letterSpacing: ".01em" }}>{c.t}</div>
                <p style={{ fontSize: 11, lineHeight: 1.65, color: "#aaa" }}>{c.d}</p>
                <span style={{ display: "block", marginTop: 8, fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: "rgba(224,40,26,0.5)", letterSpacing: ".07em", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 6 }}>{c.tag}</span>
              </div>
            ))}
          </div>
        </DashCard>

        {/* ══ WORKFLOW ══ */}
        <DashCard className="xrd-card" style={{ padding: "24px", background: "#0e0e0e", display: "flex", flexDirection: "column" as const, justifyContent: "space-between", animation: "xrd-fade-up .7s cubic-bezier(0.23,1,0.32,1) .32s both" }} {...cardProps}>
          <div>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9.5, color: "rgba(224,40,26,0.4)", letterSpacing: ".14em", textTransform: "uppercase" as const, marginBottom: 8 }}>// DEVELOPMENT PIPELINE</div>
            <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: 16, fontWeight: 700, lineHeight: 1.3, color: "#e0e0e0", marginBottom: 10, letterSpacing: "-.005em" }}>A structured workflow from research to prototype to deployment.</h2>
            <p style={{ fontSize: 12.5, color: "#aaa", lineHeight: 1.68, marginBottom: 22, fontWeight: 300 }}>A process built for clarity, iteration, and reliable delivery across XR, design, and frontend work.</p>
          </div>
          <div>
            <div className="grid grid-cols-4 border border-white/10 rounded-xl overflow-x-auto mb-4">
              {["Discovery", "Strategy", "Build", "Launch"].map((p, i) => (
                <div key={p} className={`xrd-pip${activePip === i ? " on" : ""}`} onClick={() => setActivePip(i)} style={{ position: "relative", zIndex: 2 }}>
                  <span style={{ display: "block", fontSize: 13, fontWeight: 900, marginBottom: 3, color: activePip === i ? "rgba(224,40,26,0.6)" : "rgba(224,40,26,0.18)" }}>0{i + 1}</span>
                  {p}
                </div>
              ))}
            </div>
            {/* Progress bar */}
            <div style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, marginBottom: 14, position: "relative" }}>
              <div ref={fillRef} style={{ height: "100%", borderRadius: 2, background: "linear-gradient(90deg,#e0281a,rgba(255,100,60,0.8))", boxShadow: "0 0 10px #e0281a", transition: "width .55s cubic-bezier(0.23,1,0.32,1)", width: progressWidths[activePip], position: "relative" }}>
                <div style={{ position: "absolute", right: -3, top: "50%", transform: "translateY(-50%)", width: 7, height: 7, borderRadius: "50%", background: "#ff3320", boxShadow: "0 0 8px #e0281a", animation: "xrd-head-pulse 1.2s ease-in-out infinite" }} />
              </div>
            </div>
            {/* Labels */}
            <div className="grid grid-cols-4 gap-1">
              {steps.map((s, i) => (
                <div key={s} style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9.5, lineHeight: 1.4, letterSpacing: ".03em", paddingTop: 2, color: i <= activePip ? "rgba(224,40,26,0.85)" : "#999", textShadow: i <= activePip ? "0 0 8px rgba(224,40,26,0.4)" : "none", transition: "all .35s" }}>{s}</div>
              ))}
            </div>
          </div>
        </DashCard>

        {/* ══ BOTTOM ROW ══ */}
        <div className="col-span-1 xl:col-span-full grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* 3K+ STAT */}
          <DashCard className="xrd-card" style={{ padding: "16px 20px", background: "#0e0e0e", animation: "xrd-fade-up .6s cubic-bezier(0.23,1,0.32,1) .41s both" }} {...cardProps}>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: "rgba(224,40,26,0.38)", letterSpacing: ".12em", textTransform: "uppercase" as const, marginBottom: 5, display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ width: 18, height: 1, background: "linear-gradient(90deg,#e0281a,transparent)" }} />
              HIGHLIGHTS
            </div>
            {/* Micro Chart */}
            <div ref={chartRef} style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 26, marginBottom: 8, paddingBottom: 2, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {barData.map((h, i) => (
                <div key={i} className={`xrd-mb${h > 75 ? " tall" : ""}${barsVisible ? " visible" : ""}`}
                  style={{ height: `${h}%`, transitionDelay: `${i * 0.055}s` }} />
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 3 }}>
              <span ref={statRef} style={{ fontFamily: "'Orbitron',monospace", fontSize: 36, fontWeight: 900, lineHeight: 1, letterSpacing: "-.04em", background: "linear-gradient(140deg,#fff 0%,#bbb 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{statNum}</span>
              <span style={{ fontFamily: "'Orbitron',monospace", fontSize: 12, fontWeight: 700, color: "#d0d0d0" }}>Creative Assets Delivered</span>
            </div>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 10, color: "#aaa", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
              Delivering impactful design <span style={{ color: "rgba(224,40,26,0.8)", animation: "xrd-arr 1.6s ease-in-out infinite" }}>›</span>
            </div>
            <p style={{ fontSize: 10.5, color: "#aaa", lineHeight: 1.55 }}>Design and production across immersive systems, UI/UX, 3D visuals, and interactive digital experiences. <span style={{ color: "#e0281a", opacity: .8 }}>✕</span></p>
          </DashCard>

          {/* LEADERSHIP */}
          <DashCard className="xrd-card" style={{ padding: "16px 20px", background: "#0e0e0e", animation: "xrd-fade-up .6s cubic-bezier(0.23,1,0.32,1) .49s both" }} {...cardProps}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: "rgba(224,40,26,0.38)", letterSpacing: ".12em", textTransform: "uppercase" as const, marginBottom: 5, display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ width: 18, height: 1, background: "linear-gradient(90deg,#e0281a,transparent)" }} />LEADERSHIP
                </div>
                <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 15, fontWeight: 800, color: "#e0e0e0", marginBottom: 7 }}>Leadership & Team Delivery</div>
                <p style={{ fontSize: 11, color: "#aaa", lineHeight: 1.6, maxWidth: 225, fontWeight: 300 }}>Led creative execution, team coordination, and delivery across design and production workflows.</p>
              </div>
              <svg ref={cubeRef} width="32" height="32" viewBox="0 0 40 40" fill="none" style={{ filter: "drop-shadow(0 0 10px rgba(224,40,26,0.65))", flexShrink: 0, marginTop: 4 }}>
                <line x1="8" y1="4" x2="8" y2="36" stroke="#e0281a" strokeWidth="2" strokeLinecap="round"/>
                <path ref={flagRef} d="M8 6 L32 14 L8 22 Z" fill="#e0281a" fillOpacity=".9"/>
              </svg>
            </div>
          </DashCard>

          {/* MULTI-PLATFORM */}
          <DashCard className="xrd-card" style={{ padding: "16px 20px", background: "#0e0e0e", animation: "xrd-fade-up .6s cubic-bezier(0.23,1,0.32,1) .57s both" }} {...cardProps}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: "rgba(224,40,26,0.38)", letterSpacing: ".12em", textTransform: "uppercase" as const, marginBottom: 5, display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ width: 18, height: 1, background: "linear-gradient(90deg,#e0281a,transparent)" }} />MULTI-PLATFORM
                </div>
                <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 13, fontWeight: 700, color: "#e0e0e0", marginBottom: 3 }}>XR • UI/UX • 3D • Frontend</div>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: "rgba(224,40,26,0.32)", marginBottom: 7, letterSpacing: ".06em" }}>UI/UX · 3D · XR</div>
                <p style={{ fontSize: 10.5, color: "#aaa", lineHeight: 1.55 }}>Building scalable experiences across web, XR, 3D, and interactive product platforms. <span style={{ color: "#e0281a", opacity: .8 }}>✕</span></p>
              </div>
              <svg width="44" height="44" viewBox="0 0 56 56" fill="none" style={{ flexShrink: 0, marginLeft: 10, filter: "drop-shadow(0 0 10px rgba(224,40,26,0.3))" }}>
                <path d="M32 8 L44 14 L44 26 L32 32 L20 26 L20 14 Z" fill="rgba(180,20,10,0.14)" stroke="#b01010" strokeWidth="1.1" strokeOpacity=".55"/>
                <path d="M18 22 L30 28 L30 40 L18 46 L6 40 L6 28 Z" fill="rgba(224,40,26,0.18)" stroke="#e0281a" strokeWidth="1.2" strokeOpacity=".85"/>
                <path d="M32 26 L44 32 L44 44 L32 50 L20 44 L20 32 Z" fill="rgba(180,20,10,0.11)" stroke="#a01008" strokeWidth="1" strokeOpacity=".5"/>
              </svg>
            </div>
          </DashCard>

        </div>
      </div>
    </div>
  );
};

export default XRDashboard;
