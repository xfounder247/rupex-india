import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import FloatingWidget from "../components/FloatingWidget.jsx";

// ─────────────────────────────────────────────
// COLORS
// ─────────────────────────────────────────────
const C = {
  saffron: "#FF6B00",
  saffronLight: "#FF8C3A",
  saffronDark: "#CC5500",
  gold: "#FFB347",
  navy: "#0A0F2C",
  navyLight: "#141A3A",
  navyMid: "#1E2650",
  white: "#FFFFFF",
  offwhite: "#FFF8F3",
  muted: "#8892A4",
  border: "rgba(255,107,0,0.18)",
};

// ─────────────────────────────────────────────
// GLOBAL STYLES
// ─────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; }
    html { scroll-behavior: smooth; }

    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeSlideRight {
      from { opacity: 0; transform: translateX(-40px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-14px); }
    }
    @keyframes floatReverse {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(14px); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.05); }
    }
    @keyframes pulseRing {
      0% { transform: scale(1); opacity: 0.8; }
      100% { transform: scale(1.8); opacity: 0; }
    }
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(100%); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes countUp {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes borderGlow {
      0%, 100% { border-color: rgba(255,107,0,0.3); box-shadow: 0 0 0 rgba(255,107,0,0); }
      50% { border-color: rgba(255,107,0,0.8); box-shadow: 0 0 20px rgba(255,107,0,0.2); }
    }
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes scanline {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100vh); }
    }

    .hero-slide-enter { animation: slideIn 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards; }
    .float-anim { animation: float 4s ease-in-out infinite; }
    .float-anim-reverse { animation: floatReverse 4s ease-in-out infinite; }
    .float-anim-slow { animation: float 6s ease-in-out infinite; }
    .pulse-anim { animation: pulse 2.5s ease-in-out infinite; }

    .gradient-text {
      background: linear-gradient(135deg, #FF6B00, #FFB347, #FF6B00);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3s linear infinite;
    }

    .section-divider {
      width: 60px; height: 4px;
      background: linear-gradient(90deg, #FF6B00, #FFB347);
      border-radius: 2px; margin: 16px auto 0;
    }

    .card-hover {
      transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s ease;
    }
    .card-hover:hover {
      transform: translateY(-8px) scale(1.01);
      box-shadow: 0 24px 64px rgba(255,107,0,0.15);
      border-color: rgba(255,107,0,0.4) !important;
    }

    .cta-btn {
      display: inline-flex; align-items: center; gap: 10px;
      background: linear-gradient(135deg, #FF6B00, #CC5500);
      color: #fff; padding: 15px 32px; border-radius: 50px;
      font-size: 15px; font-weight: 700; text-decoration: none;
      box-shadow: 0 8px 32px rgba(255,107,0,0.4);
      transition: all 0.3s ease; border: none; cursor: pointer;
      font-family: 'Inter', sans-serif;
      position: relative; overflow: hidden;
    }
    .cta-btn::before {
      content: ''; position: absolute; top: 0; left: -100%;
      width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
      transition: left 0.5s ease;
    }
    .cta-btn:hover::before { left: 100%; }
    .cta-btn:hover { transform: translateY(-3px); box-shadow: 0 16px 48px rgba(255,107,0,0.5); }

    .cta-btn-outline {
      display: inline-flex; align-items: center; gap: 10px;
      background: transparent; color: #fff;
      padding: 14px 30px; border-radius: 50px;
      font-size: 15px; font-weight: 600; text-decoration: none;
      border: 2px solid rgba(255,255,255,0.3);
      transition: all 0.3s ease; font-family: 'Inter', sans-serif;
    }
    .cta-btn-outline:hover {
      background: rgba(255,255,255,0.1);
      border-color: rgba(255,255,255,0.6);
      transform: translateY(-2px);
    }

    .wa-btn {
      display: inline-flex; align-items: center; gap: 10px;
      background: #25D366; color: #fff;
      padding: 14px 28px; border-radius: 50px;
      font-size: 14px; font-weight: 700; text-decoration: none;
      box-shadow: 0 8px 24px rgba(37,211,102,0.35);
      transition: all 0.3s ease; font-family: 'Inter', sans-serif;
    }
    .wa-btn:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(37,211,102,0.45); }

    @media (max-width: 768px) {
      .desk-nav { display: none !important; }
      .mob-btn { display: flex !important; }
      .hero-cards-float { display: none !important; }
      .hero-grid { grid-template-columns: 1fr !important; }
      .two-col { grid-template-columns: 1fr !important; }
      .three-col { grid-template-columns: 1fr 1fr !important; }
      .stats-row { gap: 24px !important; }
    }
    @media (max-width: 480px) {
      .three-col { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

// ─────────────────────────────────────────────
// FADE IN ON SCROLL
// ─────────────────────────────────────────────
function FadeUp({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.34,1.2,0.64,1) ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// COUNTER
// ─────────────────────────────────────────────
function Counter({ target, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0; const step = target / 50;
        const t = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(t); }
          else setCount(Math.floor(start));
        }, 35);
      }
    }, { threshold: 0.5 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [target]);
  return <span ref={ref}>{prefix}{count.toLocaleString("en-IN")}{suffix}</span>;
}

// ─────────────────────────────────────────────
// HERO SLIDER GRAPHICS
// ─────────────────────────────────────────────
const SLIDES = [
  {
    badge: "🚀 Now Live Across India",
    headline: ["India's Most", "Ambitious", "Business Community"],
    sub: "Rupex INDIA is building an empire of businesses — and you get priority access as a founding member. Health, Mart, Real Estate, Education, Hospitality and much more.",
    graphic: "community",
  },
  {
    badge: "🛒 Rupex Mart",
    headline: ["Shop Smarter.", "Save Better.", "Live Richer."],
    sub: "Exclusive member pricing on groceries, electronics, essentials and lifestyle products. Your Rupex membership card is your personal discount card at every partner store.",
    graphic: "mart",
  },
  {
    badge: "🏥 Rupex Healthcare",
    headline: ["Quality Care.", "Affordable.", "For Every Indian."],
    sub: "From doctor consultations to medicines, diagnostics and wellness — Rupex Healthcare members save up to 30% on every healthcare visit.",
    graphic: "healthcare",
  },
  {
    badge: "🎓 Rupex Education",
    headline: ["Learn.", "Grow.", "Lead."],
    sub: "Practical skill development, business training, digital marketing, financial planning — courses designed to help you earn more and grow faster.",
    graphic: "education",
  },
  {
    badge: "🏨 Rupex Hospitality",
    headline: ["Travel More.", "Spend Less.", "Live Better."],
    sub: "Member-exclusive deals on hotels, resorts, restaurants and travel packages across India. Because you deserve the best at the right price.",
    graphic: "hospitality",
  },
];

function HeroGraphic({ type }) {
  const G = {
    community: (
      <svg viewBox="0 0 320 260" width="100%" style={{ maxWidth: 340 }}>
        <defs>
          <radialGradient id="g1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B00" />
            <stop offset="100%" stopColor="#FFB347" />
          </linearGradient>
        </defs>
        <circle cx="160" cy="130" r="110" fill="url(#g1)" />
        {/* Central hub */}
        <circle cx="160" cy="130" r="36" fill="url(#lg1)" opacity="0.95" />
        <text x="160" y="125" textAnchor="middle" fill="white" fontSize="11" fontWeight="800">RUPEX</text>
        <text x="160" y="139" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">INDIA</text>
        {/* Orbit rings */}
        <circle cx="160" cy="130" r="70" fill="none" stroke="rgba(255,107,0,0.2)" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="160" cy="130" r="100" fill="none" stroke="rgba(255,107,0,0.1)" strokeWidth="1" strokeDasharray="3 6" />
        {/* Business nodes */}
        {[
          { x: 160, y: 60, emoji: "🛒", label: "Mart" },
          { x: 222, y: 100, emoji: "🏥", label: "Health" },
          { x: 222, y: 162, emoji: "🏨", label: "Hospitality" },
          { x: 160, y: 200, emoji: "🏠", label: "Real Estate" },
          { x: 98, y: 162, emoji: "🎓", label: "Education" },
          { x: 98, y: 100, emoji: "💊", label: "Healthcare" },
        ].map(({ x, y, emoji, label }) => (
          <g key={label}>
            <line x1="160" y1="130" x2={x} y2={y} stroke="rgba(255,107,0,0.3)" strokeWidth="1" />
            <circle cx={x} cy={y} r="22" fill="#141A3A" stroke="rgba(255,107,0,0.6)" strokeWidth="1.5" />
            <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="14">{emoji}</text>
            <text x={x} y={y + 30} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="8" fontWeight="600">{label}</text>
          </g>
        ))}
        {/* Outer member dots */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const x = 160 + 100 * Math.cos(angle);
          const y = 130 + 100 * Math.sin(angle);
          return <circle key={i} cx={x} cy={y} r="4" fill={i % 3 === 0 ? "#FF6B00" : "rgba(255,107,0,0.4)"} />;
        })}
      </svg>
    ),
    mart: (
      <svg viewBox="0 0 320 260" width="100%" style={{ maxWidth: 340 }}>
        <defs>
          <linearGradient id="mart-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FFB347" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <rect x="20" y="20" width="280" height="220" rx="20" fill="url(#mart-bg)" stroke="rgba(255,107,0,0.2)" strokeWidth="1" />
        {/* Store building */}
        <rect x="60" y="80" width="200" height="130" rx="8" fill="#1E2650" stroke="rgba(255,107,0,0.4)" strokeWidth="1.5" />
        <rect x="60" y="60" width="200" height="30" rx="6" fill="#FF6B00" />
        <text x="160" y="80" textAnchor="middle" fill="white" fontSize="13" fontWeight="800">RUPEX MART</text>
        {/* Shelves */}
        {[110, 140, 170].map(y => (
          <g key={y}>
            <rect x="75" y={y} width="170" height="3" rx="1" fill="rgba(255,107,0,0.3)" />
            {[85, 105, 125, 145, 165, 185, 205, 225].map(x => (
              <rect key={x} x={x} y={y - 16} width="14" height="16" rx="2" fill={`rgba(255,${107 + Math.random() * 100},0,${0.4 + Math.random() * 0.5})`} />
            ))}
          </g>
        ))}
        {/* Price tags */}
        <rect x="85" y="192" width="50" height="14" rx="7" fill="#FF6B00" />
        <text x="110" y="202" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">MEMBER PRICE</text>
        {/* Cart icon */}
        <circle cx="240" cy="200" r="16" fill="#FF6B00" opacity="0.9" />
        <text x="240" y="205" textAnchor="middle" fontSize="14">🛒</text>
        {/* Discount badge */}
        <circle cx="285" cy="55" r="24" fill="#FF6B00" />
        <text x="285" y="51" textAnchor="middle" fill="white" fontSize="10" fontWeight="900">SAVE</text>
        <text x="285" y="64" textAnchor="middle" fill="white" fontSize="10" fontWeight="900">30%</text>
      </svg>
    ),
    healthcare: (
      <svg viewBox="0 0 320 260" width="100%" style={{ maxWidth: 340 }}>
        <defs>
          <linearGradient id="hc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B00" />
            <stop offset="100%" stopColor="#FFB347" />
          </linearGradient>
        </defs>
        {/* Background circles */}
        <circle cx="160" cy="130" r="110" fill="rgba(255,107,0,0.05)" stroke="rgba(255,107,0,0.1)" strokeWidth="1" />
        <circle cx="160" cy="130" r="80" fill="rgba(255,107,0,0.08)" stroke="rgba(255,107,0,0.15)" strokeWidth="1" />
        {/* Cross symbol */}
        <rect x="135" y="80" width="50" height="100" rx="12" fill="url(#hc-grad)" />
        <rect x="110" y="105" width="100" height="50" rx="12" fill="url(#hc-grad)" />
        {/* Heart */}
        <text x="160" y="145" textAnchor="middle" fontSize="30">❤️</text>
        {/* Floating health cards */}
        {[
          { x: 30, y: 50, text: "Checkup", sub: "-30%", color: "#1E2650" },
          { x: 220, y: 40, text: "Medicine", sub: "-20%", color: "#1E2650" },
          { x: 20, y: 180, text: "Dental", sub: "-25%", color: "#1E2650" },
          { x: 220, y: 185, text: "Eye Care", sub: "-15%", color: "#1E2650" },
        ].map(({ x, y, text, sub, color }) => (
          <g key={text}>
            <rect x={x} y={y} width="72" height="40" rx="8" fill={color} stroke="rgba(255,107,0,0.4)" strokeWidth="1" />
            <text x={x + 36} y={y + 14} textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="9" fontWeight="600">{text}</text>
            <text x={x + 36} y={y + 28} textAnchor="middle" fill="#FF6B00" fontSize="11" fontWeight="800">{sub}</text>
          </g>
        ))}
      </svg>
    ),
    education: (
      <svg viewBox="0 0 320 260" width="100%" style={{ maxWidth: 340 }}>}
        {/* Graduation cap */}
        <polygon points="160,50 260,100 160,150 60,100" fill="rgba(255,107,0,0.2)" stroke="#FF6B00" strokeWidth="2" />
        <rect x="120" y="100" width="80" height="60" rx="4" fill="#1E2650" stroke="rgba(255,107,0,0.3)" strokeWidth="1" />
        <rect x="155" y="150" width="10" height="40" fill="#FF6B00" />
        <circle cx="160" cy="200" r="8" fill="#FFB347" />
        {/* Books */}
        {[
          { x: 40, y: 110, color: "#FF6B00" },
          { x: 56, y: 108, color: "#FFB347" },
          { x: 72, y: 112, color: "#CC5500" },
          { x: 230, y: 110, color: "#FF6B00" },
          { x: 246, y: 108, color: "#FFB347" },
          { x: 262, y: 112, color: "#CC5500" },
        ].map(({ x, y, color }, i) => (
          <rect key={i} x={x} y={y} width="14" height="70" rx="2" fill={color} opacity="0.7" />
        ))}
        {/* Skills pills */}
        {[
          { x: 50, y: 200, text: "Digital Marketing" },
          { x: 185, y: 210, text: "Finance" },
          { x: 100, y: 230, text: "Leadership" },
          { x: 200, y: 235, text: "Sales" },
        ].map(({ x, y, text }) => (
          <g key={text}>
            <rect x={x} y={y} width={text.length * 6 + 16} height="20" rx="10" fill="rgba(255,107,0,0.2)" stroke="rgba(255,107,0,0.5)" strokeWidth="1" />
            <text x={x + (text.length * 6 + 16) / 2} y={y + 13} textAnchor="middle" fill="#FF6B00" fontSize="8" fontWeight="700">{text}</text>
          </g>
        ))}
        {/* Stars */}
        {[[80, 60], [240, 65], [160, 30]].map(([x, y], i) => (
          <text key={i} x={x} y={y} fontSize="16" textAnchor="middle">⭐</text>
        ))}
      </svg>
    ),
    hospitality: (
      <svg viewBox="0 0 320 260" width="100%" style={{ maxWidth: 340 }}>
        {/* Hotel building */}
        <rect x="80" y="60" width="160" height="160" rx="8" fill="#141A3A" stroke="rgba(255,107,0,0.3)" strokeWidth="1.5" />
        {/* Roof */}
        <polygon points="70,70 160,20 250,70" fill="#FF6B00" opacity="0.9" />
        {/* Windows */}
        {[0, 1, 2, 3].map(row =>
          [0, 1, 2].map(col => (
            <rect key={`${row}-${col}`} x={95 + col * 48} y={80 + row * 34} width="30" height="22" rx="3"
              fill={Math.random() > 0.3 ? "rgba(255,179,71,0.6)" : "rgba(255,255,255,0.1)"} />
          ))
        )}
        {/* Door */}
        <rect x="138" y="178" width="44" height="42" rx="4" fill="#FF6B00" opacity="0.8" />
        <circle cx="176" cy="200" r="3" fill="gold" />
        {/* Stars rating */}
        <text x="160" y="48" textAnchor="middle" fontSize="14">⭐⭐⭐⭐⭐</text>
        {/* Discount flag */}
        <rect x="220" y="30" width="80" height="36" rx="6" fill="#FF6B00" />
        <text x="260" y="44" textAnchor="middle" fill="white" fontSize="9" fontWeight="800">MEMBER</text>
        <text x="260" y="57" textAnchor="middle" fill="white" fontSize="9" fontWeight="800">RATES</text>
        {/* Palm trees */}
        <text x="35" y="210" fontSize="28">🌴</text>
        <text x="265" y="210" fontSize="28">🌴</text>
      </svg>
    ),
  };
  return G[type] || G.community;
}

// ─────────────────────────────────────────────
// HERO SECTION WITH SLIDER
// ─────────────────────────────────────────────
function HeroSection() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActive(a => (a + 1) % SLIDES.length);
        setAnimating(false);
      }, 400);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const goTo = (i) => {
    if (i === active) return;
    setAnimating(true);
    setTimeout(() => { setActive(i); setAnimating(false); }, 300);
  };

  const slide = SLIDES[active];

  return (
    <section style={{ background: `linear-gradient(140deg, ${C.navy} 0%, ${C.navyLight} 50%, #0D1235 100%)`, minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px 5% 60px", position: "relative", overflow: "hidden" }}>

      {/* Animated background elements */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "non
