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
  muted: "#6B7280",
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

    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
    @keyframes floatReverse { 0%,100%{transform:translateY(0)} 50%{transform:translateY(14px)} }
    @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.05)} }
    @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
    @keyframes rotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes rotateReverse { from{transform:rotate(360deg)} to{transform:rotate(0deg)} }
    @keyframes draw { from{stroke-dashoffset:1000} to{stroke-dashoffset:0} }
    @keyframes scaleIn { from{transform:scale(0.8);opacity:0} to{transform:scale(1);opacity:1} }
    @keyframes slideRight { from{transform:translateX(-60px);opacity:0} to{transform:translateX(0);opacity:1} }

    .float-anim { animation: float 4s ease-in-out infinite; }
    .float-reverse { animation: floatReverse 5s ease-in-out infinite; }
    .float-slow { animation: float 7s ease-in-out infinite; }
    .pulse-anim { animation: pulse 2.5s ease-in-out infinite; }
    .rotate-anim { animation: rotate 20s linear infinite; }
    .rotate-reverse { animation: rotateReverse 25s linear infinite; }

    .gradient-text {
      background: linear-gradient(135deg, #FF6B00, #FFB347, #FF6B00);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3s linear infinite;
    }

    .section-divider {
      width: 70px; height: 4px;
      background: linear-gradient(90deg, #FF6B00, #FFB347);
      border-radius: 2px;
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
      font-family: 'Inter', sans-serif; position: relative; overflow: hidden;
    }
    .cta-btn:hover { transform: translateY(-3px); box-shadow: 0 16px 48px rgba(255,107,0,0.5); }

    .wa-btn {
      display: inline-flex; align-items: center; gap: 10px;
      background: #25D366; color: #fff; padding: 14px 28px; border-radius: 50px;
      font-size: 14px; font-weight: 700; text-decoration: none;
      box-shadow: 0 8px 24px rgba(37,211,102,0.35);
      transition: all 0.3s ease; font-family: 'Inter', sans-serif;
    }
    .wa-btn:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(37,211,102,0.45); }

    .outline-btn {
      display: inline-flex; align-items: center; gap: 10px;
      background: transparent; color: #FF6B00;
      padding: 14px 30px; border-radius: 50px;
      font-size: 14px; font-weight: 700; text-decoration: none;
      border: 2px solid rgba(255,107,0,0.35);
      transition: all 0.3s ease; font-family: 'Inter', sans-serif;
    }
    .outline-btn:hover { background: rgba(255,107,0,0.07); border-color: #FF6B00; transform: translateY(-2px); }

    @media (max-width: 768px) {
      .desk-nav { display: none !important; }
      .mob-btn { display: flex !important; }
      .two-col { grid-template-columns: 1fr !important; }
      .three-col { grid-template-columns: 1fr 1fr !important; }
      .four-col { grid-template-columns: 1fr 1fr !important; }
      .timeline-line { display: none !important; }
    }
    @media (max-width: 480px) {
      .three-col { grid-template-columns: 1fr !important; }
      .four-col { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

// ─────────────────────────────────────────────
// FADE UP
// ─────────────────────────────────────────────
function FadeUp({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.07 });
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
// SECTION HEADER
// ─────────────────────────────────────────────
function SectionHeader({ badge, title, sub, light = false, center = true }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: 60 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: C.saffron, letterSpacing: "0.12em", textTransform: "uppercase" }}>{badge}</span>
      <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 900, letterSpacing: "-1.5px", margin: "12px 0 16px", lineHeight: 1.15, color: light ? "#fff" : C.navy }}>{title}</h2>
      <div className="section-divider" style={{ margin: center ? "0 auto 20px" : "0 0 20px" }} />
      {sub && <p style={{ fontSize: "1.05rem", color: light ? "rgba(255,255,255,0.55)" : C.muted, maxWidth: 580, margin: center ? "0 auto" : "0", lineHeight: 1.85 }}>{sub}</p>}
    </div>
  );
}

// ─────────────────────────────────────────────
// CTA STRIP
// ─────────────────────────────────────────────
function CTAStrip({ light = false }) {
  return (
    <div style={{ background: light ? "rgba(255,255,255,0.04)" : "rgba(255,107,0,0.05)", border: light ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,107,0,0.15)", borderRadius: 20, padding: "32px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24, margin: "56px 0 0" }}>
      <div>
        <div style={{ fontSize: "1.1rem", fontWeight: 800, color: light ? "#fff" : C.navy, marginBottom: 6 }}>Ready to be part of this journey?</div>
        <div style={{ fontSize: 14, color: light ? "rgba(255,255,255,0.5)" : C.muted, lineHeight: 1.6 }}>Join free in 2 minutes. Get your official ID card instantly.</div>
      </div>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <a href="/id-card" className="cta-btn" style={{ padding: "13px 26px", fontSize: 14 }}>🪪 Join Free Now</a>
        <a href="https://wa.me/919354614756" target="_blank" rel="noopener noreferrer" className="wa-btn" style={{ padding: "13px 22px", fontSize: 14 }}>💬 WhatsApp Us</a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// HERO GRAPHIC — animated SVG
// ─────────────────────────────────────────────
function HeroGraphic() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 480, margin: "0 auto" }}>
      <svg viewBox="0 0 480 400" width="100%" style={{ filter: "drop-shadow(0 32px 64px rgba(255,107,0,0.2))" }}>
        <defs>
          <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B00" />
            <stop offset="100%" stopColor="#FFB347" />
          </linearGradient>
          <linearGradient id="navyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#141A3A" />
            <stop offset="100%" stopColor="#0A0F2C" />
          </linearGradient>
        </defs>

        {/* Outer glow */}
        <circle cx="240" cy="200" r="180" fill="url(#heroGlow)" />

        {/* Rotating rings */}
        <g style={{ transformOrigin: "240px 200px", animation: "rotate 30s linear infinite" }}>
          <circle cx="240" cy="200" r="160" fill="none" stroke="rgba(255,107,0,0.1)" strokeWidth="1" strokeDasharray="8 6" />
        </g>
        <g style={{ transformOrigin: "240px 200px", animation: "rotateReverse 20s linear infinite" }}>
          <circle cx="240" cy="200" r="130" fill="none" stroke="rgba(255,107,0,0.15)" strokeWidth="1" strokeDasharray="4 8" />
        </g>
        <circle cx="240" cy="200" r="100" fill="none" stroke="rgba(255,107,0,0.08)" strokeWidth="1" />

        {/* Center circle */}
        <circle cx="240" cy="200" r="56" fill="url(#navyGrad)" stroke="rgba(255,107,0,0.4)" strokeWidth="2" />
        <circle cx="240" cy="200" r="48" fill="url(#heroGrad)" opacity="0.9" />
        <text x="240" y="193" textAnchor="middle" fill="white" fontSize="13" fontWeight="900" letterSpacing="1">RUPEX</text>
        <text x="240" y="210" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" opacity="0.85">INDIA</text>
        <text x="240" y="225" textAnchor="middle" fill="white" fontSize="9" fontWeight="500" opacity="0.6">EST. 2023</text>

        {/* Business nodes on orbit */}
        {[
          { angle: -90, emoji: "🛒", label: "Mart", r: 130 },
          { angle: -30, emoji: "🏥", label: "Health", r: 130 },
          { angle: 30, emoji: "💊", label: "Healthcare", r: 130 },
          { angle: 90, emoji: "🏨", label: "Hospitality", r: 130 },
          { angle: 150, emoji: "🏠", label: "Real Estate", r: 130 },
          { angle: 210, emoji: "🎓", label: "Education", r: 130 },
        ].map(({ angle, emoji, label, r }) => {
          const rad = (angle * Math.PI) / 180;
          const x = 240 + r * Math.cos(rad);
          const y = 200 + r * Math.sin(rad);
          return (
            <g key={label}>
              <line x1="240" y1="200" x2={x} y2={y} stroke="rgba(255,107,0,0.2)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx={x} cy={y} r="26" fill="url(#navyGrad)" stroke="rgba(255,107,0,0.5)" strokeWidth="1.5" />
              <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="16">{emoji}</text>
              <text x={x} y={y + 36} textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="8.5" fontWeight="600">{label}</text>
            </g>
          );
        })}

        {/* Outer dots */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 22.5) * Math.PI / 180;
          const x = 240 + 160 * Math.cos(angle);
          const y = 200 + 160 * Math.sin(angle);
          return <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 5 : 3} fill={i % 4 === 0 ? "#FF6B00" : "rgba(255,107,0,0.3)"} />;
        })}

        {/* Floating cards */}
        <g style={{ animation: "float 4s ease-in-out infinite" }}>
          <rect x="320" y="60" width="130" height="50" rx="10" fill="#141A3A" stroke="rgba(255,107,0,0.3)" strokeWidth="1" />
          <text x="330" y="80" fill="rgba(255,255,255,0.5)" fontSize="9">New Delhi, India</text>
          <text x="330" y="96" fill="#FF6B00" fontSize="11" fontWeight="800">HQ 📍</text>
        </g>
        <g style={{ animation: "floatReverse 5s ease-in-out infinite" }}>
          <rect x="20" y="80" width="110" height="50" rx="10" fill="#141A3A" stroke="rgba(255,107,0,0.3)" strokeWidth="1" />
          <text x="30" y="100" fill="rgba(255,255,255,0.5)" fontSize="9">Founding Members</text>
          <text x="30" y="116" fill="#FF6B00" fontSize="11" fontWeight="800">500+ 👥</text>
        </g>
        <g style={{ animation: "float 6s ease-in-out infinite" }}>
          <rect x="30" y="290" width="110" height="50" rx="10" fill="#141A3A" stroke="rgba(255,107,0,0.3)" strokeWidth="1" />
          <text x="40" y="310" fill="rgba(255,255,255,0.5)" fontSize="9">Businesses</text>
          <text x="40" y="326" fill="#FF6B00" fontSize="11" fontWeight="800">10+ 🏢</text>
        </g>
        <g style={{ animation: "floatReverse 4.5s ease-in-out infinite" }}>
          <rect x="330" y="290" width="110" height="50" rx="10" fill="#141A3A" stroke="rgba(255,107,0,0.3)" strokeWidth="1" />
          <text x="340" y="310" fill="rgba(255,255,255,0.5)" fontSize="9">Joining Fee</text>
          <text x="340" y="326" fill="#FF6B00" fontSize="11" fontWeight="800">₹0 Free 🎉</text>
        </g>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────
// MISSION VISION GRAPHIC
// ─────────────────────────────────────────────
function MissionGraphic() {
  return (
    <svg viewBox="0 0 400 320" width="100%" style={{ maxWidth: 400 }}>
      <defs>
        <linearGradient id="mg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B00" />
          <stop offset="100%" stopColor="#FFB347" />
        </linearGradient>
      </defs>
      {/* Target rings */}
      <circle cx="200" cy="160" r="130" fill="rgba(255,107,0,0.04)" stroke="rgba(255,107,0,0.1)" strokeWidth="1.5" strokeDasharray="6 4" />
      <circle cx="200" cy="160" r="100" fill="rgba(255,107,0,0.06)" stroke="rgba(255,107,0,0.15)" strokeWidth="1.5" />
      <circle cx="200" cy="160" r="70" fill="rgba(255,107,0,0.08)" stroke="rgba(255,107,0,0.25)" strokeWidth="2" />
      <circle cx="200" cy="160" r="40" fill="rgba(255,107,0,0.12)" stroke="rgba(255,107,0,0.4)" strokeWidth="2" />
      <circle cx="200" cy="160" r="16" fill="url(#mg1)" />

      {/* Arrow */}
      <line x1="60" y1="40" x2="195" y2="152" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
      <polygon points="200,160 180,135 208,140" fill="#FF6B00" />

      {/* Stars */}
      {[[340, 50], [360, 130], [320, 220], [80, 280], [40, 180]].map(([x, y], i) => (
        <text key={i} x={x} y={y} fontSize={i % 2 === 0 ? "20" : "14"} textAnchor="middle">⭐</text>
      ))}

      {/* Labels */}
      {[
        { x: 200, y: 30, text: "VISION", size: 12 },
        { x: 200, y: 310, text: "MISSION", size: 12 },
        { x: 30, y: 160, text: "IMPACT", size: 11, rotate: -90 },
        { x: 375, y: 160, text: "GROWTH", size: 11 },
      ].map(({ x, y, text, size }) => (
        <text key={text} x={x} y={y} textAnchor="middle" fill="rgba(255,107,0,0.6)" fontSize={size} fontWeight="800" letterSpacing="2">{text}</text>
      ))}

      {/* Connecting lines */}
      {[[200, 30, 200, 45], [200, 280, 200, 295], [45, 160, 85, 160], [315, 160, 330, 160]].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,107,0,0.3)" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

// ─────────────────────────────────────────────
// INDIA MAP GRAPHIC
// ─────────────────────────────────────────────
function IndiaGraphic() {
  return (
    <svg viewBox="0 0 360 400" width="100%" style={{ maxWidth: 360 }}>
      <defs>
        <radialGradient id="ig1" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="180" cy="200" r="170" fill="url(#ig1)" />
      <circle cx="180" cy="200" r="160" fill="none" stroke="rgba(255,107,0,0.08)" strokeWidth="1" strokeDasharray="5 5" />

      {/* Simplified India shape */}
      <path d="M180,40 L240,60 L280,100 L300,150 L290,200 L270,240 L250,280 L230,320 L200,360 L180,380 L160,360 L140,320 L110,270 L90,230 L80,190 L85,140 L110,90 L150,60 Z"
        fill="rgba(255,107,0,0.08)" stroke="rgba(255,107,0,0.3)" strokeWidth="1.5" strokeLinejoin="round" />

      {/* City dots */}
      {[
        { x: 170, y: 90, city: "Delhi", main: true },
        { x: 200, y: 200, city: "Mumbai" },
        { x: 230, y: 240, city: "Hyderabad" },
        { x: 210, y: 280, city: "Bangalore" },
        { x: 240, y: 140, city: "Lucknow" },
        { x: 150, y: 200, city: "Rajasthan" },
        { x: 260, y: 180, city: "Kolkata" },
      ].map(({ x, y, city, main }) => (
        <g key={city}>
          {main && <circle cx={x} cy={y} r="18" fill="rgba(255,107,0,0.15)" stroke="rgba(255,107,0,0.3)" strokeWidth="1" />}
          <circle cx={x} cy={y} r={main ? 7 : 5} fill={main ? "#FF6B00" : "rgba(255,107,0,0.6)"} />
          {main && <circle cx={x} cy={y} r="12" fill="none" stroke="#FF6B00" strokeWidth="1" style={{ animation: "pulse 2s ease-in-out infinite" }} />}
          <text x={x + 12} y={y + 4} fill={main ? "#FF6B00" : "rgba(255,255,255,0.5)"} fontSize={main ? "10" : "8"} fontWeight={main ? "800" : "500"}>{city}</text>
        </g>
      ))}

      {/* HQ badge */}
      <rect x="100" y="65" width="55" height="22" rx="11" fill="#FF6B00" />
      <text x="127" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="800">HQ 🏢</text>

      {/* Expansion text */}
      <text x="180" y="20" textAnchor="middle" fill="rgba(255,107,0,0.7)" fontSize="11" fontWeight="700">EXPANDING PAN-INDIA</text>

      {/* Decorative elements */}
      {[[40, 100], [310, 120], [50, 300], [320, 280]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="4" fill="rgba(255,107,0,0.3)" />
          <circle cx={x} cy={y} r="8" fill="none" stroke="rgba(255,107,0,0.15)" strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}

// ─────────────────────────────────────────────
// GROWTH GRAPHIC
// ─────────────────────────────────────────────
function GrowthGraphic() {
  const data = [20, 35, 28, 55, 48, 72, 65, 90, 85, 100];
  const maxH = 160;
  const barW = 28;
  const gap = 12;
  const total = data.length * (barW + gap);
  const startX = (360 - total) / 2;

  return (
    <svg viewBox="0 0 360 260" width="100%" style={{ maxWidth: 360 }}>
      <defs>
        <linearGradient id="barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF6B00" />
          <stop offset="100%" stopColor="rgba(255,107,0,0.2)" />
        </linearGradient>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FF6B00" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[0, 40, 80, 120, 160].map(y => (
        <line key={y} x1="30" y1={80 + (160 - y)} x2="340" y2={80 + (160 - y)} stroke="rgba(255,107,0,0.08)" strokeWidth="1" />
      ))}

      {/* Bars */}
      {data.map((val, i) => {
        const h = (val / 100) * maxH;
        const x = startX + i * (barW + gap);
        const y = 80 + maxH - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={h} rx="6" fill="url(#barGrad)" />
            {i === data.length - 1 && (
              <>
                <rect x={x} y={y - 28} width={barW + 20} height={22} rx="6" fill="#FF6B00" />
                <text x={x + (barW + 20) / 2} y={y - 13} textAnchor="middle" fill="white" fontSize="9" fontWeight="800">+{val}%</text>
              </>
            )}
          </g>
        );
      })
