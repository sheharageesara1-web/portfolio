import React, { useState, useEffect, useRef } from "react";
import {
  Mail, Download, Sun, Moon, ExternalLink,
  Terminal, Code2, GraduationCap, User, FolderGit2, Send, ChevronRight
} from "lucide-react";

/* Custom brand icons (lucide-react removed brand/logo icons in newer versions) */
function Github({ size = 18, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.79 0c2.2-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.78 1.08.78 2.18 0 1.57-.01 2.84-.01 3.23 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"/>
    </svg>
  );
}
function Linkedin({ size = 18, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.44-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z"/>
    </svg>
  );
}

/* ------------------------------------------------------------------
   DATA — swap these out with your real details
------------------------------------------------------------------ */
const PROFILE = {
  name: "A.E.S.C. Geesara",
  handle: "geesara",
  role: "Undergraduate · Information Systems",
  uni: "University of Colombo School of Computing (UCSC)",
  tagline: "Building things at the intersection of clean code and good design.",
  bio: `I'm an undergraduate at UCSC, currently sharpening my skills in full-stack
  development and problem solving. I enjoy turning ideas into working software —
  from small scripts to full web applications — and I'm always learning something new.`,
  email: "sheharageesara1@gmail.com",
  github: "https://github.com/sheharageesara1-web",
  linkedin: "https://linkedin.com/in/geesara",
  cvUrl: "#",
  // 👉 Replace this with your own photo URL (e.g. an uploaded image link, or import it locally).
  photo: "",
};

const SKILLS = [
  { name: "HTML", level: 90, cat: "Frontend" },
  { name: "CSS", level: 85, cat: "Frontend" },
  { name: "JavaScript", level: 82, cat: "Frontend" },
  { name: "React", level: 78, cat: "Frontend" },
  { name: "C++", level: 80, cat: "Core" },
  { name: "PHP", level: 70, cat: "Backend" },
  { name: "MySQL", level: 72, cat: "Backend" },
  { name: "Git & GitHub", level: 85, cat: "Tools" },
];

const PROJECTS = [
  {
    title: "Campus Event Hub",
    desc: "A full-stack web app for managing university events — students can browse, register, and get reminders. Built with React, PHP and MySQL.",
    tags: ["React", "PHP", "MySQL"],
    link: "#",
    repo: "#",
  },
  {
    title: "Library Management System",
    desc: "Desktop app in C++ implementing borrow/return workflows, fine calculation and an admin dashboard with file-based storage.",
    tags: ["C++", "OOP", "Data Structures"],
    link: "#",
    repo: "#",
  },
  {
    title: "Portfolio Starter Kit",
    desc: "An open-source, animated React portfolio template (the one you're looking at!) with dark/light mode and scroll-reveal animations.",
    tags: ["React", "CSS", "Animation"],
    link: "#",
    repo: "#",
  },
];

const EDUCATION = [
  {
    when: "2023 — Present",
    what: "BSc (Hons) in Information Systems",
    where: "University of Colombo School of Computing",
    detail: "Coursework: Data Structures & Algorithms, OOP, Databases, Web Technologies, Software Engineering.",
  },
  {
    when: "2019 — 2022",
    what: "G.C.E. Advanced Level — Physical Science",
    where: "Your School Name",
    detail: "Combined Mathematics, Physics, Chemistry.",
  },
];

/* ------------------------------------------------------------------
   HOOK — reveal-on-scroll
------------------------------------------------------------------ */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------
   ANIMATED PLACEHOLDER — cycles through example text like a typewriter
------------------------------------------------------------------ */
function useTypedPlaceholder(examples, colors) {
  const [text, setText] = useState("");
  const [colorIdx, setColorIdx] = useState(0);
  const stateRef = useRef({ exIdx: 0, charIdx: 0, deleting: false });

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setText(examples[0]);
      return;
    }
    let timer;
    function tick() {
      const st = stateRef.current;
      const current = examples[st.exIdx];
      if (!st.deleting) {
        st.charIdx++;
        setText(current.slice(0, st.charIdx));
        if (st.charIdx >= current.length) {
          st.deleting = true;
          timer = setTimeout(tick, 1400);
          return;
        }
        timer = setTimeout(tick, 55);
      } else {
        st.charIdx--;
        setText(current.slice(0, st.charIdx));
        if (st.charIdx <= 0) {
          st.deleting = false;
          st.exIdx = (st.exIdx + 1) % examples.length;
          setColorIdx((c) => (c + 1) % colors.length);
          timer = setTimeout(tick, 300);
          return;
        }
        timer = setTimeout(tick, 28);
      }
    }
    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [examples, colors]);

  return { text, color: colors[colorIdx % colors.length] };
}

function TypedInput({ label, examples, colors, type = "text", textarea = false }) {
  const { text, color } = useTypedPlaceholder(examples, colors);
  const [value, setValue] = useState("");
  const Tag = textarea ? "textarea" : "input";
  return (
    <div className="field">
      <label>{label}</label>
      <div className="typed-field-wrap">
        <Tag
          type={textarea ? undefined : type}
          rows={textarea ? 4 : undefined}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {value === "" && (
          <span className="typed-placeholder" style={{ color }}>
            {text}
            <span className="typed-caret" style={{ background: color }} />
          </span>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   PARTICLE BACKGROUND — floating dots that drift toward clicks
------------------------------------------------------------------ */
function ParticleField() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const targetRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const colors = ["#E8A33D", "#5EEAD4"];
    let W, H, DPR;

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const COUNT = Math.min(220, Math.floor((window.innerWidth * window.innerHeight) / 6000));
    particlesRef.current = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 1.4 + Math.random() * 2.6,
      vx: (Math.random() - 0.5) * 1.1,
      vy: (Math.random() - 0.5) * 1.1,
      hue: Math.random(),
      hueShift: (Math.random() - 0.5) * 0.0015,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    function lerpColor(hue) {
      // blend between amber and cyan based on hue 0..1
      const c1 = [232, 163, 61];
      const c2 = [94, 234, 212];
      const t = (Math.sin(hue * Math.PI * 2) + 1) / 2;
      const r = Math.round(c1[0] + (c2[0] - c1[0]) * t);
      const g = Math.round(c1[1] + (c2[1] - c1[1]) * t);
      const b = Math.round(c1[2] + (c2[2] - c1[2]) * t);
      return `rgb(${r},${g},${b})`;
    }

    function step() {
      ctx.clearRect(0, 0, W, H);
      const pts = particlesRef.current;
      const target = targetRef.current;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];

        if (!reduceMotion) {
          p.hue += p.hueShift;

          if (target && target.active) {
            const dx = target.x - p.x;
            const dy = target.y - p.y;
            const dist = Math.hypot(dx, dy) || 1;
            const pull = Math.min(0.02, 1400 / (dist * dist * 40));
            p.vx += (dx / dist) * pull;
            p.vy += (dy / dist) * pull;
          } else {
            p.vx += (Math.random() - 0.5) * 0.06;
            p.vy += (Math.random() - 0.5) * 0.06;
          }

          const speed = Math.hypot(p.vx, p.vy);
          const maxSpeed = 2.2;
          if (speed > maxSpeed) {
            p.vx = (p.vx / speed) * maxSpeed;
            p.vy = (p.vy / speed) * maxSpeed;
          }

          p.vx *= 0.997;
          p.vy *= 0.997;
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < -10) p.x = W + 10;
          if (p.x > W + 10) p.x = -10;
          if (p.y < -10) p.y = H + 10;
          if (p.y > H + 10) p.y = -10;
        }

        const col = lerpColor(p.hue);
        ctx.beginPath();
        ctx.fillStyle = col;
        ctx.globalAlpha = 0.55;
        ctx.shadowBlur = 8;
        ctx.shadowColor = col;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      // fade the click target's pull over time so dots settle again
      if (target && target.active) {
        target.life -= 1;
        if (target.life <= 0) target.active = false;
      }

      rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);

    function handleClick(e) {
      const rect = canvas.getBoundingClientRect();
      targetRef.current = {
        x: e.clientX - rect.left + window.scrollX - (canvas.offsetLeft || 0),
        y: e.clientY - rect.top,
        active: true,
        life: 140,
      };
    }
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

/* ------------------------------------------------------------------
   AVATAR — animated gradient-ring profile photo
------------------------------------------------------------------ */
function Avatar() {
  const initials = PROFILE.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="avatar-wrap">
      <div className="avatar-ring">
        <div className="avatar-inner">
          {PROFILE.photo ? (
            <img src={PROFILE.photo} alt={PROFILE.name} />
          ) : (
            <span className="avatar-initials">{initials}</span>
          )}
        </div>
      </div>
      <span className="avatar-status" title="Available for internships" />
    </div>
  );
}

/* ------------------------------------------------------------------
   CODE RAIN — falling keyword animation, triggered by clicking the brand
------------------------------------------------------------------ */
function CodeRain({ trigger }) {
  const [drops, setDrops] = useState([]);
  const keywords = ["HTML", "CSS", "JavaScript", "React", "C++", "PHP", "MySQL", "Git", "</>", "{ }"];
  const colors = ["var(--amber)", "var(--cyan)"];

  useEffect(() => {
    if (trigger === 0) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const count = 22;
    const batch = Array.from({ length: count }, (_, i) => ({
      id: `${trigger}-${i}`,
      word: keywords[Math.floor(Math.random() * keywords.length)],
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 3.2 + Math.random() * 2.2,
      size: 14 + Math.random() * 12,
      rotate: (Math.random() - 0.5) * 60,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setDrops((d) => [...d, ...batch]);

    const t = setTimeout(() => {
      setDrops((d) => d.filter((drop) => !batch.some((b) => b.id === drop.id)));
    }, 6200);
    return () => clearTimeout(t);
  }, [trigger]);

  if (drops.length === 0) return null;

  return (
    <div className="code-rain" aria-hidden="true">
      {drops.map((d) => (
        <span
          key={d.id}
          className="code-drop"
          style={{
            left: `${d.left}%`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
            fontSize: `${d.size}px`,
            color: d.color,
            "--rot": `${d.rotate}deg`,
          }}
        >
          {d.word}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------
   TERMINAL HERO — the signature element
------------------------------------------------------------------ */
function TerminalHero({ dark }) {
  const lines = [
    { cmd: "whoami", out: PROFILE.name },
    { cmd: "cat role.txt", out: PROFILE.role },
    { cmd: "cat status.txt", out: PROFILE.tagline },
  ];
  const [typed, setTyped] = useState([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [phase, setPhase] = useState("cmd"); // cmd -> out

  useEffect(() => {
    if (lineIdx >= lines.length) return;
    const current = lines[lineIdx];
    const target = phase === "cmd" ? current.cmd : current.out;
    if (charIdx < target.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), phase === "cmd" ? 45 : 14);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      if (phase === "cmd") {
        setPhase("out");
        setCharIdx(0);
      } else {
        setTyped((arr) => [...arr, current]);
        setLineIdx((i) => i + 1);
        setCharIdx(0);
        setPhase("cmd");
      }
    }, phase === "cmd" ? 250 : 450);
    return () => clearTimeout(t);
  }, [charIdx, phase, lineIdx]);

  const currentLine = lines[lineIdx];

  return (
    <div className="terminal">
      <div className="terminal-bar">
        <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
        <span className="terminal-title">shehara_Geesara: ~/portfolio</span>
      </div>
      <div className="terminal-body">
        {typed.map((l, i) => (
          <div key={i} className="term-line">
            <div><span className="prompt">➜ ~</span> {l.cmd}</div>
            <div className="term-out">{l.out}</div>
          </div>
        ))}
        {currentLine && (
          <div className="term-line">
            <div>
              <span className="prompt">➜ ~</span>{" "}
              {phase === "cmd" ? currentLine.cmd.slice(0, charIdx) : currentLine.cmd}
              {phase === "cmd" && <span className="caret" />}
            </div>
            {phase === "out" && (
              <div className="term-out">
                {currentLine.out.slice(0, charIdx)}
                <span className="caret" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   NAV
------------------------------------------------------------------ */
function Nav({ dark, setDark, onBrandClick }) {
  const links = [
    ["#home", "home"], ["#about", "about"], ["#skills", "skills"],
    ["#projects", "projects"], ["#education", "education"], ["#contact", "contact"],
  ];
  const [open, setOpen] = useState(false);
  return (
    <nav className="nav">
      <a
        href="#home"
        className="brand"
        onClick={(e) => { e.preventDefault(); onBrandClick(); }}
        title="Click me!"
      >
        <Terminal size={18} strokeWidth={2.4} />
        <span>{PROFILE.handle}</span>
        <span className="blink-underscore">_</span>
      </a>
      <div className={`nav-links ${open ? "nav-open" : ""}`}>
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </div>
      <div className="nav-actions">
        <button className="icon-btn" onClick={() => setDark(!dark)} aria-label="Toggle theme">
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------
   MAIN APP
------------------------------------------------------------------ */
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [rainTrigger, setRainTrigger] = useState(0);

  return (
    <div className={dark ? "app dark" : "app light"}>
      <div className="bg-fx" aria-hidden="true">
        <ParticleField />
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

        :root{
          --ink:#000000;
          --panel:#0B0B0D;
          --panel-2:#131316;
          --amber:#E8A33D;
          --cyan:#5EEAD4;
          --text:#F1F0EA;
          --muted:#8B93A7;
          --line:rgba(241,240,234,0.10);
          --radius:14px;
          --btn-primary:#4ADE80;
        }
        .app.light{
          --ink:#F6F5F0;
          --panel:#FFFFFF;
          --panel-2:#EFEDE4;
          --amber:#B9761F;
          --cyan:#0E8C7D;
          --text:#171A21;
          --muted:#5B6270;
          --line:rgba(23,26,33,0.10);
          --btn-primary:#22C55E;
        }
        *{box-sizing:border-box;}
        .app{
          background:var(--ink);
          color:var(--text);
          font-family:'Inter',sans-serif;
          min-height:100vh;
          transition:background .35s ease,color .35s ease;
          position:relative;
        }
        html, body{overflow-x:hidden;}

        /* ---------- ANIMATED BACKGROUND ---------- */
        .bg-fx{
          position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;
        }
        .particle-canvas{
          position:absolute;inset:0;width:100%;height:100%;
        }
        .nav, section, footer{position:relative;z-index:1;}
        h1,h2,h3,.mono{font-family:'Space Grotesk',sans-serif;}
        .code, .prompt, .term-out, .terminal-title, .nav-num, .eyebrow, .skill-name, .brand{
          font-family:'JetBrains Mono',monospace;
        }
        a{color:inherit;text-decoration:none;}
        html{scroll-behavior:smooth;}
        section{padding:110px 8vw;position:relative;scroll-margin-top:84px;}
        @media (max-width:720px){section{padding:80px 6vw;}}
        section:not(.hero-section){
          border:1px solid var(--line);
          border-left:none;border-right:none;
        }
        .container{max-width:1120px;margin:0 auto;}

        /* ---------- NAV ---------- */
        .nav{
          position:sticky;top:0;z-index:50;
          display:flex;align-items:center;justify-content:space-between;
          padding:24px 8vw;
          background:color-mix(in srgb, var(--ink) 85%, transparent);
          backdrop-filter:blur(10px);
          border-bottom:1px solid var(--line);
          transition:padding .3s ease, background .3s ease, box-shadow .3s ease;
          overflow:visible;
        }
        .nav:hover{box-shadow:0 4px 24px -12px rgba(0,0,0,.5);}
        .brand{
          display:flex;align-items:center;gap:6px;font-weight:600;font-size:17px;color:var(--amber);
          cursor:pointer;user-select:none;transition:transform .25s ease, filter .25s ease;
        }
        .brand:hover{transform:scale(1.04);filter:brightness(1.15);}
        .brand:active{transform:scale(0.97);}
        .blink-underscore{animation:blink 1.1s steps(1) infinite;}
        @keyframes blink{50%{opacity:0;}}

        /* ---------- CODE RAIN ---------- */
        .code-rain{
          position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:200;
        }
        .code-drop{
          position:absolute;top:-40px;
          font-family:'JetBrains Mono',monospace;font-weight:700;
          animation-name:fallDown;
          animation-timing-function:cubic-bezier(.35,0,.65,1);
          animation-fill-mode:forwards;
          text-shadow:0 0 10px currentColor;
          white-space:nowrap;
          transition:filter .3s ease;
        }
        @keyframes fallDown{
          0%{transform:translateY(0) scale(1) rotate(0deg);opacity:0;filter:brightness(0.9);}
          8%{opacity:1;}
          50%{filter:brightness(1.3);}
          85%{opacity:1;}
          100%{transform:translateY(100vh) scale(0.45) rotate(var(--rot));opacity:0;filter:brightness(1.8);}
        }
        .nav-links{display:flex;gap:32px;}
        .nav-links a{
          display:flex;align-items:center;gap:6px;font-size:15px;color:var(--muted);
          position:relative;padding:4px 0;
          transition:color .25s ease, transform .25s ease;
        }
        .nav-links a::after{
          content:"";position:absolute;left:0;bottom:-3px;width:0;height:2px;
          background:linear-gradient(90deg,var(--cyan),var(--amber));
          transition:width .3s ease;
        }
        .nav-links a:hover{color:var(--text);transform:translateY(-1px);}
        .nav-links a:hover::after{width:100%;}
        .nav-actions{display:flex;align-items:center;gap:10px;}
        .icon-btn{
          background:var(--panel);border:1px solid var(--line);color:var(--text);
          width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;
          cursor:pointer;transition:border-color .25s ease, transform .35s ease, color .25s ease, box-shadow .25s ease;
        }
        .icon-btn:hover{
          border-color:var(--amber);color:var(--amber);
          transform:translateY(-2px) rotate(-8deg);
          box-shadow:0 8px 18px -8px var(--amber);
        }
        .burger{display:none;flex-direction:column;gap:4px;background:none;border:none;cursor:pointer;}
        .burger span{width:20px;height:2px;background:var(--text);}
        @media (max-width:820px){
          .nav-links{
            position:absolute;top:100%;left:0;right:0;flex-direction:column;
            background:var(--panel);padding:16px 8vw;gap:16px;
            border-bottom:1px solid var(--line);
            display:none;
          }
          .nav-links.nav-open{display:flex;}
          .burger{display:flex;}
        }

        /* ---------- HERO ---------- */
        .hero{
          padding-top:70px;
          display:grid;grid-template-columns:1.05fr 0.95fr;gap:56px;align-items:center;
          min-height:88vh;
        }
        @media (max-width:900px){.hero{grid-template-columns:1fr;padding-top:50px;min-height:auto;}}
        .eyebrow{
          color:var(--cyan);font-size:13px;letter-spacing:.06em;
          display:flex;align-items:center;gap:8px;margin-bottom:18px;
        }
        .eyebrow::before{content:"//";color:var(--amber);}
        .hero h1{
          font-size:clamp(38px,6vw,68px);line-height:1.08;font-weight:700;margin:0 0 18px;
        }
        .hero h1 .accent{
          font-weight:800;
          background:linear-gradient(90deg, var(--amber), var(--cyan), var(--amber));
          background-size:200% auto;
          -webkit-background-clip:text;background-clip:text;color:transparent;
          animation:shine 5s linear infinite;
          text-shadow:0 0 26px color-mix(in srgb, var(--amber) 35%, transparent);
          display:inline-block;
        }
        @keyframes shine{
          0%{background-position:0% 50%;}
          100%{background-position:200% 50%;}
        }
        .hero p.lede{color:var(--muted);font-size:17px;line-height:1.65;max-width:520px;margin-bottom:32px;}
        .btn-row{display:flex;gap:14px;flex-wrap:wrap;}
        .btn{
          display:inline-flex;align-items:center;gap:8px;
          padding:13px 22px;border-radius:9px;font-size:14px;font-weight:600;
          cursor:pointer;border:1px solid transparent;position:relative;overflow:hidden;
          transition:transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s ease, color .3s ease, background .3s ease;
        }
        .btn-primary{background:var(--btn-primary, var(--amber));color:#0B1A10;}
        .btn-primary:hover{
          transform:translateY(-3px) scale(1.03);
          box-shadow:0 14px 28px -10px var(--btn-primary, var(--amber));
          background:var(--cyan);color:#03211d;
        }
        .btn-primary:active{transform:translateY(-1px) scale(0.99);}
        .btn-ghost{border-color:var(--line);color:var(--text);}
        .btn-ghost:hover{
          border-color:var(--cyan);color:var(--cyan);
          transform:translateY(-3px) scale(1.03);
          box-shadow:0 14px 28px -14px var(--cyan);
        }
        .social-row{display:flex;gap:14px;margin-top:34px;}
        .social-row a{
          width:38px;height:38px;border:1px solid var(--line);border-radius:9px;
          display:flex;align-items:center;justify-content:center;color:var(--muted);
          transition:color .3s ease, border-color .3s ease, transform .35s cubic-bezier(.2,.8,.2,1), background .3s ease;
        }
        .social-row a:hover{
          color:var(--ink);background:var(--amber);border-color:var(--amber);
          transform:translateY(-4px) rotate(6deg) scale(1.08);
        }

        /* ---------- AVATAR ---------- */
        .hero-visual{display:flex;flex-direction:column;align-items:center;gap:22px;}
        .avatar-wrap{position:relative;}
        .avatar-ring{
          width:132px;height:132px;border-radius:50%;padding:4px;
          background:conic-gradient(from 0deg, var(--amber), var(--cyan), var(--amber));
          animation:spin 6s linear infinite;
          box-shadow:0 0 0 6px color-mix(in srgb, var(--amber) 10%, transparent);
          transition:box-shadow .4s ease, transform .4s cubic-bezier(.2,.8,.2,1);
        }
        .avatar-wrap:hover .avatar-ring{
          transform:scale(1.06);
          box-shadow:0 0 0 10px color-mix(in srgb, var(--cyan) 16%, transparent), 0 0 40px -6px var(--cyan);
        }
        @keyframes spin{to{transform:rotate(360deg);}}
        .avatar-inner{
          width:100%;height:100%;border-radius:50%;background:var(--panel);
          display:flex;align-items:center;justify-content:center;overflow:hidden;
        }
        .avatar-inner img{width:100%;height:100%;object-fit:cover;}
        .avatar-initials{
          font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:38px;
          background:linear-gradient(135deg, var(--amber), var(--cyan));
          -webkit-background-clip:text;background-clip:text;color:transparent;
        }
        .avatar-status{
          position:absolute;bottom:8px;right:8px;width:18px;height:18px;border-radius:50%;
          background:#27C93F;border:3px solid var(--ink);
          box-shadow:0 0 0 0 rgba(39,201,63,.6);
          animation:pulseDot 2s ease-out infinite;
        }
        @keyframes pulseDot{
          0%{box-shadow:0 0 0 0 rgba(39,201,63,.55);}
          70%{box-shadow:0 0 0 9px rgba(39,201,63,0);}
          100%{box-shadow:0 0 0 0 rgba(39,201,63,0);}
        }
        @media (prefers-reduced-motion: reduce){
          .avatar-ring{animation:none;}
          .avatar-status{animation:none;}
        }

        /* ---------- TERMINAL ---------- */
        .terminal{
          background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);
          overflow:hidden;
          box-shadow:0 30px 60px -30px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,0.02);
          animation:floatUp 6s ease-in-out infinite;
          transition:border-color .35s ease, box-shadow .35s ease, transform .35s ease;
        }
        .terminal:hover{
          border-color:var(--cyan);
          box-shadow:0 30px 70px -28px rgba(0,0,0,.6), 0 0 32px -6px var(--cyan);
          transform:translateY(-4px) scale(1.01);
        }
        @keyframes floatUp{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
        .terminal-bar{
          display:flex;align-items:center;gap:8px;padding:13px 16px;
          background:var(--panel-2);border-bottom:1px solid var(--line);
        }
        .dot{width:11px;height:11px;border-radius:50%;transition:transform .25s ease, box-shadow .25s ease;}
        .dot-r{background:#FF5F56;}.dot-y{background:#FFBD2E;}.dot-g{background:#27C93F;}
        .terminal-bar:hover .dot-r{transform:scale(1.2);box-shadow:0 0 10px #FF5F56;}
        .terminal-bar:hover .dot-y{transform:scale(1.2);box-shadow:0 0 10px #FFBD2E;}
        .terminal-bar:hover .dot-g{transform:scale(1.2);box-shadow:0 0 10px #27C93F;}
        .terminal-title{margin-left:8px;color:var(--muted);font-size:12px;}
        .terminal-body{
          padding:24px 22px;min-height:210px;font-size:14.5px;
          background:
            linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--cyan) 4%, transparent) 100%);
        }
        .term-line{margin-bottom:18px;}
        .prompt{color:var(--cyan);margin-right:8px;font-weight:600;}
        .term-out{
          color:var(--amber);margin-top:8px;padding:8px 12px;line-height:1.55;
          background:color-mix(in srgb, var(--amber) 8%, transparent);
          border-left:2px solid var(--amber);border-radius:0 6px 6px 0;
          display:inline-block;max-width:100%;
        }
        .caret{
          display:inline-block;width:8px;height:16px;background:var(--cyan);
          margin-left:2px;vertical-align:middle;animation:blink 1s steps(1) infinite;
          box-shadow:0 0 8px var(--cyan);
        }

        /* ---------- SECTION HEADS ---------- */
        .section-head{margin-bottom:52px;}
        .section-head h2{
          font-family:'Space Grotesk',sans-serif;
          font-size:clamp(32px,4.4vw,50px);
          font-weight:800;
          letter-spacing:.01em;
          margin:6px 0 0;
          display:inline-block;position:relative;
          background:linear-gradient(90deg, var(--amber), var(--cyan), var(--text), var(--amber));
          background-size:300% auto;
          -webkit-background-clip:text;background-clip:text;color:transparent;
          animation:headShine 5s linear infinite, headFlicker 3.2s ease-in-out infinite;
        }
        @keyframes headShine{
          0%{background-position:0% 50%;}
          100%{background-position:300% 50%;}
        }
        @keyframes headFlicker{
          0%, 100%{opacity:1;}
          50%{opacity:1;}
          62%{opacity:.82;}
          64%{opacity:1;}
          78%{opacity:.9;}
          80%{opacity:1;}
        }
        @media (prefers-reduced-motion: reduce){
          .section-head h2{animation:none;color:var(--text);background:none;-webkit-text-fill-color:currentColor;}
        }
        .section-head .eyebrow::before{content:"// ";}

        /* ---------- ABOUT ---------- */
        .about-grid{display:grid;grid-template-columns:0.8fr 1.2fr;gap:56px;align-items:start;}
        @media (max-width:820px){.about-grid{grid-template-columns:1fr;}}
        .about-card{
          background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);
          padding:28px;position:relative;overflow:hidden;
          transition:transform .4s cubic-bezier(.2,.8,.2,1), border-color .4s ease, box-shadow .4s ease;
        }
        .about-card::before{
          content:"";position:absolute;inset:0;opacity:0;
          background:radial-gradient(340px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, var(--cyan) 12%, transparent), transparent 70%);
          transition:opacity .35s ease;pointer-events:none;
        }
        .about-card:hover::before{opacity:1;}
        .about-card:hover{
          transform:translateY(-6px);
          border-color:var(--amber);
          box-shadow:0 26px 44px -28px rgba(0,0,0,.55), 0 0 26px -12px var(--cyan);
        }
        .about-card h3{
          margin:0 0 14px;font-size:19px;display:flex;align-items:center;gap:9px;
          font-weight:700;
        }
        .about-card h3 svg{transition:transform .4s cubic-bezier(.34,1.56,.64,1), color .3s ease;}
        .about-card:hover h3 svg{transform:rotate(-12deg) scale(1.15);color:var(--cyan);}
        .about-card p{color:var(--muted);line-height:1.8;font-size:15.5px;}
        .fact-list{list-style:none;padding:0;margin:20px 0 0;display:grid;gap:4px;}
        .fact-list li{
          display:flex;justify-content:space-between;align-items:baseline;gap:16px;
          font-size:13.5px;border-bottom:1px dashed var(--line);
          padding:12px 4px;color:var(--muted);
          border-radius:6px;
          transition:background .25s ease, padding-left .25s ease, border-color .25s ease;
        }
        .fact-list li:hover{
          background:color-mix(in srgb, var(--amber) 8%, transparent);
          padding-left:10px;border-color:var(--amber);
        }
        .fact-list li span{flex-shrink:0;white-space:nowrap;}
        .fact-list li b{
          color:var(--text);font-weight:600;text-align:right;line-height:1.4;
          transition:color .25s ease;
        }
        .fact-list li:hover b{color:var(--amber);}

        /* ---------- SKILLS ---------- */
        .skills-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px 40px;}
        @media (max-width:640px){.skills-grid{grid-template-columns:1fr;}}
        .skill-row{
          margin-bottom:4px;padding:12px;border-radius:10px;
          border:1px solid transparent;
          transition:background .3s ease, border-color .3s ease, transform .3s ease;
        }
        .skill-row:hover{
          background:var(--panel);border-color:var(--line);
          transform:translateX(4px);
        }
        .skill-top{display:flex;justify-content:space-between;margin-bottom:8px;font-size:13.5px;}
        .skill-name{color:var(--text);font-weight:600;transition:color .3s ease;}
        .skill-row:hover .skill-name{color:var(--amber);}
        .skill-cat{color:var(--muted);font-size:11px;}
        .bar-track{height:8px;background:var(--panel-2);border-radius:5px;overflow:hidden;border:1px solid var(--line);}
        .bar-fill{
          height:100%;border-radius:5px;
          background:linear-gradient(90deg,var(--cyan),var(--amber),var(--cyan));
          background-size:200% 100%;
          width:0;
          transition:width 1.1s cubic-bezier(.2,.8,.2,1);
          animation:barShine 4s linear infinite;
        }
        @keyframes barShine{
          0%{background-position:0% 0%;}
          100%{background-position:200% 0%;}
        }
        .reveal-in .bar-fill{width:var(--w);}

        /* ---------- PROJECTS ---------- */
        .projects-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
        @media (max-width:960px){.projects-grid{grid-template-columns:1fr;}}
        .project-card{
          background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);
          padding:26px;display:flex;flex-direction:column;height:100%;
          transition:transform .35s cubic-bezier(.2,.8,.2,1), border-color .35s ease, box-shadow .35s ease;
        }
        .project-card:hover{
          transform:translateY(-8px) scale(1.015);
          border-color:var(--amber);
          box-shadow:0 26px 44px -24px rgba(0,0,0,.55), 0 0 26px -10px var(--amber);
        }
        .project-icon{
          width:42px;height:42px;border-radius:9px;background:var(--panel-2);
          display:flex;align-items:center;justify-content:center;color:var(--amber);margin-bottom:16px;
          transition:transform .35s ease, background .35s ease, color .35s ease;
        }
        .project-card:hover .project-icon{
          transform:rotate(-10deg) scale(1.1);
          background:var(--amber);color:var(--ink);
        }
        .project-card h3{font-size:18px;margin:0 0 10px;}
        .project-card p{color:var(--muted);font-size:14px;line-height:1.65;flex:1;margin-bottom:18px;}
        .tag-row{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px;}
        .tag{
          font-size:11px;color:var(--cyan);border:1px solid var(--line);
          padding:4px 9px;border-radius:100px;font-family:'JetBrains Mono',monospace;
          transition:transform .25s ease, background .25s ease, color .25s ease, border-color .25s ease;
        }
        .tag:hover{
          background:var(--cyan);color:var(--ink);border-color:var(--cyan);
          transform:translateY(-2px) scale(1.06);
        }
        .card-links{display:flex;gap:16px;}
        .card-links a{
          display:flex;align-items:center;gap:5px;font-size:13px;color:var(--muted);
          transition:color .25s ease, transform .25s ease;
        }
        .card-links a:hover{color:var(--amber);transform:translateX(3px);}

        /* ---------- EDUCATION ---------- */
        .timeline{border-left:2px solid var(--line);padding-left:32px;display:flex;flex-direction:column;gap:40px;}
        .tl-item{
          position:relative;padding:16px 18px;border-radius:12px;margin-left:-18px;
          border:1px solid transparent;
          transition:background .35s ease, border-color .35s ease, transform .35s ease, box-shadow .35s ease;
        }
        .tl-item:hover{
          background:var(--panel);
          border-color:var(--line);
          transform:translateX(8px);
          box-shadow:0 20px 40px -28px rgba(0,0,0,.6), 0 0 24px -14px var(--cyan);
        }
        .tl-item::before{
          content:"";position:absolute;left:-39px;top:20px;width:14px;height:14px;border-radius:50%;
          background:var(--ink);border:2px solid var(--amber);
          transition:transform .4s cubic-bezier(.34,1.56,.64,1), box-shadow .4s ease, border-color .4s ease;
        }
        .tl-item:hover::before{
          transform:scale(1.5);
          border-color:var(--cyan);
          box-shadow:0 0 0 6px color-mix(in srgb, var(--cyan) 18%, transparent), 0 0 16px var(--cyan);
        }
        .tl-when{
          color:var(--cyan);font-size:12.5px;margin-bottom:6px;display:inline-flex;align-items:center;gap:6px;
          font-weight:600;letter-spacing:.02em;
        }
        .tl-item h3{
          margin:0 0 4px;font-size:19px;font-weight:700;
          transition:color .35s ease;
        }
        .tl-item:hover h3{
          background:linear-gradient(90deg, var(--text), var(--amber), var(--cyan), var(--text));
          background-size:300% auto;
          -webkit-background-clip:text;background-clip:text;color:transparent;
          animation:shine 3.5s linear infinite;
        }
        .tl-item h3 svg{transition:transform .4s cubic-bezier(.34,1.56,.64,1), color .35s ease;}
        .tl-item:hover h3 svg{transform:rotate(-14deg) scale(1.18);color:var(--cyan);}
        .tl-where{
          color:var(--amber);font-size:13.5px;margin-bottom:10px;display:block;
          transition:color .35s ease, letter-spacing .35s ease;
        }
        .tl-item:hover .tl-where{color:var(--cyan);letter-spacing:.015em;}
        .tl-item p{color:var(--muted);font-size:14px;line-height:1.65;max-width:600px;transition:color .35s ease;}
        .tl-item:hover p{color:var(--text);}

        /* ---------- CONTACT ---------- */
        .contact-wrap{
          background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);
          padding:48px;display:grid;grid-template-columns:1fr 1fr;gap:40px;
        }
        @media (max-width:820px){.contact-wrap{grid-template-columns:1fr;padding:32px;}}
        .contact-wrap h2{
          font-size:30px;margin:0 0 12px;font-weight:800;line-height:1.15;
          background:linear-gradient(100deg, var(--text) 20%, var(--amber) 45%, var(--cyan) 65%, var(--text) 85%);
          background-size:250% auto;
          -webkit-background-clip:text;background-clip:text;color:transparent;
          animation:headShine 6s linear infinite;
        }
        @media (prefers-reduced-motion: reduce){
          .contact-wrap h2{animation:none;-webkit-text-fill-color:currentColor;background:none;}
        }
        .contact-wrap p{color:var(--muted);line-height:1.7;font-size:15px;margin-bottom:24px;}
        .contact-list{display:flex;flex-direction:column;gap:14px;}
        .contact-list a{
          display:flex;align-items:center;gap:10px;font-size:14.5px;color:var(--text);
          transition:color .25s ease, transform .25s ease;
        }
        .contact-list a:hover{color:var(--amber);transform:translateX(4px);}
        .contact-list .ic{
          width:34px;height:34px;border-radius:8px;background:var(--panel-2);
          display:flex;align-items:center;justify-content:center;color:var(--amber);flex-shrink:0;
          transition:transform .3s ease, background .3s ease, color .3s ease;
        }
        .contact-list a:hover .ic{
          background:var(--amber);color:var(--ink);transform:rotate(-8deg) scale(1.1);
        }
        .field{display:flex;flex-direction:column;gap:6px;margin-bottom:16px;}
        .field label{font-size:12px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.04em;}
        .typed-field-wrap{position:relative;}
        .field input,.field textarea{
          width:100%;
          background:var(--panel-2);border:1px solid var(--line);border-radius:8px;
          padding:11px 13px;color:var(--text);font-family:inherit;font-size:14px;resize:none;
          transition:border-color .25s ease, box-shadow .25s ease, transform .25s ease;
        }
        .field input:hover,.field textarea:hover{border-color:var(--cyan);}
        .field input:focus,.field textarea:focus{
          outline:none;border-color:var(--cyan);
          box-shadow:0 0 0 3px color-mix(in srgb, var(--cyan) 22%, transparent);
          transform:translateY(-1px);
        }
        .typed-placeholder{
          position:absolute;left:13px;top:11px;font-size:14px;
          pointer-events:none;font-family:inherit;
          transition:color .3s ease;
          display:flex;align-items:center;
        }
        .typed-caret{
          display:inline-block;width:2px;height:15px;margin-left:2px;
          animation:blink 0.9s steps(1) infinite;
        }

        footer{
          text-align:center;padding:32px 6vw;color:var(--muted);font-size:13px;
          border-top:1px solid var(--line);
        }

        /* ---------- reveal animation ---------- */
        .reveal{opacity:0;transform:translateY(28px);transition:opacity .7s ease, transform .7s ease;}
        .reveal-in{opacity:1;transform:translateY(0);}
        @media (prefers-reduced-motion: reduce){
          .reveal,.terminal,.blink-underscore,.caret{animation:none !important;transition:none !important;opacity:1 !important;transform:none !important;}
        }
      `}</style>

      <Nav dark={dark} setDark={setDark} onBrandClick={() => setRainTrigger((t) => t + 1)} />
      <CodeRain trigger={rainTrigger} />

      {/* HERO */}
      <section id="home" className="hero container">
        <div>
          <div className="eyebrow">status: available for internships</div>
          <h1>
            Hi, I'm <span className="accent">{PROFILE.name.split(" ").slice(-1)}</span> —
            an Information Systems undergrad turning ideas into code.
          </h1>
          <p className="lede">{PROFILE.tagline} Currently studying at {PROFILE.uni}.</p>
          <div className="btn-row">
            <a href={PROFILE.cvUrl} className="btn btn-primary"><Download size={16} /> Download CV</a>
            <a href="#projects" className="btn btn-ghost"><FolderGit2 size={16} /> View Projects</a>
          </div>
          <div className="social-row">
            <a href={PROFILE.github} target="_blank" rel="noreferrer"><Github size={17} /></a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /></a>
            <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${PROFILE.email}`} target="_blank" rel="noreferrer"><Mail size={17} /></a>
          </div>
        </div>
        <div className="hero-visual">
          <Avatar />
          <TerminalHero dark={dark} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="container">
          <Reveal><div className="section-head"><div className="eyebrow">about me</div><h2>Who I am</h2></div></Reveal>
          <div className="about-grid">
            <Reveal>
              <div
                className="about-card"
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
              >
                <h3><User size={17} color="var(--amber)" /> Snapshot</h3>
                <ul className="fact-list">
                  <li><span>Name</span> <b>{PROFILE.name}</b></li>
                  <li><span>Role</span> <b>{PROFILE.role}</b></li>
                  <li><span>University</span> <b>University of Colombo</b></li>
                  <li><span>Based in</span> <b>Sri Lanka</b></li>
                  <li><span>Focus</span> <b>Full-stack Dev</b></li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div
                className="about-card"
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
              >
                <h3><Code2 size={17} color="var(--amber)" /> My story</h3>
                <p>{PROFILE.bio}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="container">
          <Reveal><div className="section-head"><div className="eyebrow">tech stack</div><h2>Skills & Tools</h2></div></Reveal>
          <div className="skills-grid">
            {SKILLS.map((s, i) => (
              <Reveal key={s.name} delay={i * 60}>
                <div className="skill-row">
                  <div className="skill-top">
                    <span className="skill-name">{s.name}</span>
                    <span className="skill-cat">{s.cat} · {s.level}%</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ "--w": `${s.level}%` }} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="container">
          <Reveal><div className="section-head"><div className="eyebrow">selected work</div><h2>Projects</h2></div></Reveal>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <div className="project-card">
                  <div className="project-icon"><FolderGit2 size={20} /></div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="tag-row">{p.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
                  <div className="card-links">
                    <a href={p.link} target="_blank" rel="noreferrer"><ExternalLink size={14} /> Live</a>
                    <a href={p.repo} target="_blank" rel="noreferrer"><Github size={14} /> Code</a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education">
        <div className="container">
          <Reveal><div className="section-head"><div className="eyebrow">background</div><h2>Education</h2></div></Reveal>
          <div className="timeline">
            {EDUCATION.map((e, i) => (
              <Reveal key={e.what} delay={i * 100}>
                <div className="tl-item">
                  <span className="tl-when">{e.when}</span>
                  <h3><GraduationCap size={17} style={{ display: "inline", marginRight: 6, color: "var(--amber)" }} />{e.what}</h3>
                  <span className="tl-where">{e.where}</span>
                  <p>{e.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="container">
          <Reveal>
            <div className="contact-wrap">
              <div>
                <div className="eyebrow">get in touch</div>
                <h2>Let's build something together.</h2>
                <p>Open to internships, freelance projects, and collaboration. Drop a message — I usually reply within a day.</p>
                <div className="contact-list">
                  <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${PROFILE.email}`} target="_blank" rel="noreferrer"><span className="ic"><Mail size={16} /></span>{PROFILE.email}</a>
                  <a href={PROFILE.github} target="_blank" rel="noreferrer"><span className="ic"><Github size={16} /></span>github.com/sheharageesara1-web</a>
                  <a href={PROFILE.linkedin} target="_blank" rel="noreferrer"><span className="ic"><Linkedin size={16} /></span>linkedin.com/in/{PROFILE.handle}</a>
                </div>
              </div>
              <form onSubmit={(e) => e.preventDefault()}>
                <TypedInput
                  label="NAME"
                  type="text"
                  examples={["Kasun Perera", "Amaya Silva", "Nadeesha Fernando"]}
                  colors={["var(--amber)", "var(--cyan)"]}
                />
                <TypedInput
                  label="EMAIL"
                  type="email"
                  examples={["you@example.com", "hello@company.com"]}
                  colors={["var(--cyan)", "var(--amber)"]}
                />
                <TypedInput
                  label="MESSAGE"
                  textarea
                  examples={[
                    "Say hello...",
                    "Let's collaborate on a project!",
                    "I'd love to offer you an internship.",
                  ]}
                  colors={["var(--amber)", "var(--cyan)", "var(--amber)"]}
                />
                <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  <Send size={15} /> Send Message
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      <footer>
        © {new Date().getFullYear()} {PROFILE.name} · built with React <ChevronRight size={12} style={{ display: "inline" }} /> {PROFILE.uni}
      </footer>
    </div>
  );
}
