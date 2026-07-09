import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import FloatingWidget from "../components/FloatingWidget.jsx";

const C = {
  saffron: "#FF6B00", saffronLight: "#FF8C3A", saffronDark: "#CC5500",
  gold: "#FFB347", navy: "#0A0F2C", navyLight: "#141A3A", navyMid: "#1E2650",
  offwhite: "#FFF8F3", muted: "#6B7280",
};

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Inter',sans-serif}
    html{scroll-behavior:smooth}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
    @keyframes floatR{0%,100%{transform:translateY(0)}50%{transform:translateY(14px)}}
    @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
    @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.6;transform:scale(1.05)}}
    .float-a{animation:float 4s ease-in-out infinite}
    .float-r{animation:floatR 5s ease-in-out infinite}
    .float-s{animation:float 7s ease-in-out infinite}
    .pulse-a{animation:pulse 2.5s ease-in-out infinite}
    .gradient-text{
      background:linear-gradient(135deg,#FF6B00,#FFB347,#FF6B00);
      background-size:200% auto;
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;
      background-clip:text;animation:shimmer 3s linear infinite;
    }
    .sdiv{width:70px;height:4px;background:linear-gradient(90deg,#FF6B00,#FFB347);border-radius:2px}
    .ch{transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.3s,border-color 0.3s}
    .ch:hover{transform:translateY(-8px) scale(1.01);box-shadow:0 24px 64px rgba(255,107,0,0.15);border-color:rgba(255,107,0,0.4) !important}
    .cta{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,#FF6B00,#CC5500);color:#fff;padding:15px 32px;border-radius:50px;font-size:15px;font-weight:700;text-decoration:none;box-shadow:0 8px 32px rgba(255,107,0,0.4);transition:all 0.3s;border:none;cursor:pointer;font-family:'Inter',sans-serif}
    .cta:hover{transform:translateY(-3px);box-shadow:0 16px 48px rgba(255,107,0,0.5)}
    .wa{display:inline-flex;align-items:center;gap:10px;background:#25D366;color:#fff;padding:14px 28px;border-radius:50px;font-size:14px;font-weight:700;text-decoration:none;box-shadow:0 8px 24px rgba(37,211,102,0.35);transition:all 0.3s;font-family:'Inter',sans-serif}
    .wa:hover{transform:translateY(-3px);box-shadow:0 16px 40px rgba(37,211,102,0.45)}
    .tab-b{padding:14px 20px;border:none;background:none;cursor:pointer;font-size:13px;font-weight:600;white-space:nowrap;transition:all 0.25s;font-family:'Inter',sans-serif;display:flex;align-items:center;gap:8px}
    @media(max-width:768px){
      .dn{display:none !important}.mf{display:flex !important}
      .tc{grid-template-columns:1fr !important}
      .sc{overflow-x:auto}
    }
  `}</style>
);

function FU({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.07 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.34,1.2,0.64,1) ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function SH({ badge, title, sub, light = false }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 60 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: C.saffron, letterSpacing: "0.12em", textTransform: "uppercase" }}>{badge}</span>
      <h2 style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 900, letterSpacing: "-1.5px", margin: "12px 0 16px", lineHeight: 1.15, color: light ? "#fff" : C.navy }}>{title}</h2>
      <div className="sdiv" style={{ margin: "0 auto 20px" }} />
      {sub && <p style={{ fontSize: "1.05rem", color: light ? "rgba(255,255,255,0.55)" : C.muted, maxWidth: 580, margin: "0 auto", lineHeight: 1.85 }}>{sub}</p>}
    </div>
  );
}

function CTAB({ light = false }) {
  return (
    <div style={{ background: light ? "rgba(255,255,255,0.04)" : "rgba(255,107,0,0.05)", border: light ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,107,0,0.15)", borderRadius: 20, padding: "32px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24, margin: "56px 0 0" }}>
      <div>
        <div style={{ fontSize: "1.1rem", fontWeight: 800, color: light ? "#fff" : C.navy, marginBottom: 6 }}>Unlock all benefits — completely free</div>
        <div style={{ fontSize: 14, color: light ? "rgba(255,255,255,0.5)" : C.muted }}>One free membership card opens every door across all Rupex businesses.</div>
      </div>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <a href="/id-card" className="cta" style={{ padding: "13px 26px", fontSize: 14 }}>🪪 Get Free ID Card</a>
        <a href="https://wa.me/919354614756" target="_blank" rel="noopener noreferrer" className="wa" style={{ padding: "13px 22px", fontSize: 14 }}>💬 WhatsApp Us</a>
      </div>
    </div>
  );
}

// SVG Graphics
function HealthG() {
  return (
    <svg viewBox="0 0 360 300" width="100%">
      <defs>
        <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#38A169"/><stop offset="100%" stopColor="#68D391"/></linearGradient>
        <radialGradient id="g1r" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#38A169" stopOpacity="0.15"/><stop offset="100%" stopColor="#38A169" stopOpacity="0"/></radialGradient>
      </defs>
      <circle cx="180" cy="150" r="130" fill="url(#g1r)"/>
      <rect x="155" y="85" width="50" height="130" rx="12" fill="url(#g1)" opacity="0.9"/>
      <rect x="115" y="125" width="130" height="50" rx="12" fill="url(#g1)" opacity="0.9"/>
      <text x="180" y="158" textAnchor="middle" dominantBaseline="middle" fontSize="28">❤️</text>
      {[{x:8,y:40,i:"🩺",t:"Checkup",d:"-30%"},{x:260,y:35,i:"💊",t:"Medicine",d:"-20%"},{x:8,y:210,i:"🦷",t:"Dental",d:"-25%"},{x:256,y:215,i:"👁️",t:"Eye",d:"-15%"}].map(({x,y,i,t,d})=>(
        <g key={t}>
          <rect x={x} y={y} width="92" height="52" rx="10" fill="#141A3A" stroke="rgba(56,161,105,0.4)" strokeWidth="1.5"/>
          <text x={x+12} y={y+22} fontSize="16">{i}</text>
          <text x={x+36} y={y+21} fill="rgba(255,255,255,0.7)" fontSize="9" fontWeight="600" dominantBaseline="middle">{t}</text>
          <text x={x+36} y={y+38} fill="#68D391" fontSize="11" fontWeight="800">{d}</text>
        </g>
      ))}
      <polyline points="30,155 50,155 65,122 83,188 100,138 118,155 180,155" fill="none" stroke="#38A169" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
    </svg>
  );
}

function MartG() {
  return (
    <svg viewBox="0 0 360 300" width="100%">
      <defs><linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FF6B00"/><stop offset="100%" stopColor="#FFB347"/></linearGradient></defs>
      <rect x="55" y="65" width="250" height="195" rx="10" fill="#141A3A" stroke="rgba(255,107,0,0.25)" strokeWidth="1.5"/>
      <rect x="45" y="45" width="270" height="30" rx="7" fill="url(#g2)"/>
      <text x="180" y="65" textAnchor="middle" fill="white" fontSize="13" fontWeight="900">RUPEX MART</text>
      {[100,136,172].map(y=>(
        <g key={y}>
          <rect x="68" y={y} width="224" height="3" rx="1.5" fill="rgba(255,107,0,0.2)"/>
          {[78,98,118,138,158,178,198,218,238,258].map(x=>(
            <rect key={x} x={x} y={y-20} width="15" height="20" rx="3" fill={`rgba(255,${80+(x%60)},0,${0.4+(x%3)*0.2})`}/>
          ))}
        </g>
      ))}
      <circle cx="280" cy="228" r="20" fill="url(#g2)"/>
      <text x="280" y="233" textAnchor="middle" fontSize="16">🛒</text>
      <rect x="145" y="200" width="65" height="60" rx="5" fill="rgba(255,107,0,0.15)" stroke="rgba(255,107,0,0.3)" strokeWidth="1.5"/>
      <circle cx="308" cy="48" r="28" fill="#FF6B00"/>
      <text x="308" y="43" textAnchor="middle" fill="white" fontSize="10" fontWeight="900">SAVE</text>
      <text x="308" y="58" textAnchor="middle" fill="white" fontSize="10" fontWeight="900">30%</text>
      {[{x:8,y:80,t:"₹99",o:"₹149"},{x:8,y:188,t:"₹199",o:"₹299"}].map(({x,y,t,o})=>(
        <g key={t}>
          <rect x={x} y={y} width="50" height="42" rx="7" fill="#1E2650" stroke="rgba(255,107,0,0.3)" strokeWidth="1"/>
          <text x={x+25} y={y+15} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" textDecoration="line-through">{o}</text>
          <text x={x+25} y={y+30} textAnchor="middle" fill="#FF6B00" fontSize="12" fontWeight="900">{t}</text>
        </g>
      ))}
    </svg>
  );
}

function HospG() {
  return (
    <svg viewBox="0 0 360 300" width="100%">
      <defs><linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#D69E2E"/><stop offset="100%" stopColor="#F6E05E"/></linearGradient></defs>
      <rect x="75" y="65" width="210" height="205" rx="9" fill="#141A3A" stroke="rgba(214,158,46,0.3)" strokeWidth="1.5"/>
      <polygon points="65,72 180,15 295,72" fill="url(#g3)"/>
      {[0,1,2,3].map(r=>[0,1,2].map(col=>(
        <rect key={`${r}-${col}`} x={90+col*60} y={82+r*40} width="40" height="28" rx="3" fill={`rgba(246,224,94,${0.15+((r+col)%3)*0.2})`} stroke="rgba(214,158,46,0.2)" strokeWidth="1"/>
      )))}
      <rect x="152" y="222" width="56" height="48" rx="5" fill="url(#g3)" opacity="0.8"/>
      <text x="180" y="40" textAnchor="middle" fontSize="15">⭐⭐⭐⭐⭐</text>
      <rect x="210" y="12" width="130" height="38" rx="9" fill="#D69E2E"/>
      <text x="275" y="27" textAnchor="middle" fill="white" fontSize="10" fontWeight="800">MEMBER RATE</text>
      <text x="275" y="42" textAnchor="middle" fill="white" fontSize="11" fontWeight="900">25% OFF 🏨</text>
      <text x="28" y="268" fontSize="32">🌴</text>
      <text x="306" y="268" fontSize="32">🌴</text>
      {[{x:8,y:95,i:"🍽️",t:"Dining",v:"-20%"},{x:290,y:115,i:"✈️",t:"Travel",v:"-15%"}].map(({x,y,i,t,v})=>(
        <g key={t}>
          <rect x={x} y={y} width="62" height="48" rx="9" fill="#1E2650" stroke="rgba(214,158,46,0.3)" strokeWidth="1"/>
          <text x={x+31} y={y+16} textAnchor="middle" fontSize="15">{i}</text>
          <text x={x+31} y={y+29} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8">{t}</text>
          <text x={x+31} y={y+42} textAnchor="middle" fill="#D69E2E" fontSize="10" fontWeight="800">{v}</text>
        </g>
      ))}
    </svg>
  );
}

function REG() {
  return (
    <svg viewBox="0 0 360 300" width="100%">
      <defs><linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#805AD5"/><stop offset="100%" stopColor="#B794F4"/></linearGradient></defs>
      <rect x="95" y="135" width="170" height="135" rx="5" fill="#141A3A" stroke="rgba(128,90,213,0.3)" strokeWidth="1.5"/>
      <polygon points="85,142 180,68 275,142" fill="url(#g4)"/>
      <rect x="224" y="76" width="18" height="38" rx="3" fill="#805AD5" opacity="0.8"/>
      {[[112,154],[162,154],[112,200],[162,200]].map(([x,y])=>(
        <rect key={`${x}-${y}`} x={x} y={y} width="38" height="30" rx="4" fill="rgba(128,90,213,0.3)" stroke="rgba(128,90,213,0.4)" strokeWidth="1"/>
      ))}
      <rect x="158" y="222" width="44" height="48" rx="4" fill="url(#g4)" opacity="0.7"/>
      <rect x="8" y="38" width="110" height="48" rx="11" fill="url(#g4)"/>
      <text x="63" y="55" textAnchor="middle" fill="white" fontSize="10" fontWeight="800">FREE</text>
      <text x="63" y="68" textAnchor="middle" fill="white" fontSize="10" fontWeight="800">CONSULTATION</text>
      <text x="63" y="79" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="7">For all members</text>
      <rect x="15" y="162" width="58" height="108" rx="5" fill="#1E2650" stroke="rgba(128,90,213,0.2)" strokeWidth="1"/>
      <rect x="288" y="182" width="52" height="88" rx="5" fill="#1E2650" stroke="rgba(128,90,213,0.2)" strokeWidth="1"/>
      <circle cx="306" cy="58" r="22" fill="#38A169"/>
      <text x="306" y="53" textAnchor="middle" fill="white" fontSize="13">✓</text>
      <text x="306" y="67" textAnchor="middle" fill="white" fontSize="7" fontWeight="700">VERIFIED</text>
      <rect x="0" y="268" width="360" height="32" rx="0" fill="rgba(128,90,213,0.06)"/>
      <text x="180" y="289" textAnchor="middle" fill="rgba(128,90,213,0.5)" fontSize="10" fontWeight="600">500+ VERIFIED LISTINGS</text>
    </svg>
  );
}

function HCG() {
  return (
    <svg viewBox="0 0 360 300" width="100%">
      <defs>
        <linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#E53E3E"/><stop offset="100%" stopColor="#FC8181"/></linearGradient>
        <radialGradient id="g5r" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#E53E3E" stopOpacity="0.12"/><stop offset="100%" stopColor="#E53E3E" stopOpacity="0"/></radialGradient>
      </defs>
      <circle cx="180" cy="150" r="135" fill="url(#g5r)"/>
      <rect x="145" y="65" width="70" height="120" rx="14" fill="#1E2650" stroke="rgba(229,62,62,0.4)" strokeWidth="2"/>
      <rect x="153" y="55" width="54" height="22" rx="7" fill="url(#g5)"/>
      <text x="180" y="71" textAnchor="middle" fill="white" fontSize="11" fontWeight="900">Rx</text>
      {[92,112,132,152,172].map(y=>(
        <g key={y}>
          <circle cx="167" cy={y} r="6" fill="#E53E3E" opacity="0.7"/>
          <circle cx="193" cy={y} r="6" fill="#FC8181" opacity="0.5"/>
        </g>
      ))}
      {[{x:8,y:44,i:"🧠",t:"Mental Health",v:"Sessions"},{x:262,y:44,i:"💪",t:"Fitness",v:"-20%"},{x:8,y:208,i:"🌿",t:"Wellness",v:"Included"},{x:252,y:208,i:"🧬",t:"Supplements",v:"-15%"}].map(({x,y,i,t,v})=>(
        <g key={t}>
          <rect x={x} y={y} width="90" height="54" rx="11" fill="#141A3A" stroke="rgba(229,62,62,0.3)" strokeWidth="1.5"/>
          <text x={x+12} y={y+22} fontSize="18">{i}</text>
          <text x={x+38} y={y+20} fill="rgba(255,255,255,0.7)" fontSize="8.5" fontWeight="600" dominantBaseline="middle">{t}</text>
          <text x={x+38} y={y+36} fill="#FC8181" fontSize="10" fontWeight="800">{v}</text>
        </g>
      ))}
      <rect x="108" y="202" width="144" height="38" rx="9" fill="url(#g5)"/>
      <text x="180" y="218" textAnchor="middle" fill="white" fontSize="9" fontWeight="800">PARTNER PHARMACIES</text>
      <text x="180" y="232" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="11" fontWeight="900">20% OFF 💊</text>
    </svg>
  );
}

const SERVICES = [
  {
    id:"health",emoji:"🏥",name:"Rupex Health",color:"#38A169",tag:"LIVE",tagBg:"rgba(56,161,105,0.2)",tagBorder:"rgba(56,161,105,0.4)",tagColor:"#68D391",
    tagline:"Your health, at a price that doesn't hurt",
    heroDesc:"Healthcare shouldn't be a luxury. Rupex Health gives members access to verified clinics, diagnostic centres, and specialist doctors — at member-only rates that save thousands every year.",
    long1:"A single full-body health checkup at a private centre costs ₹3,000–₹8,000. Specialist consultations cost ₹800–₹2,000 each. Multiply across your family and you're spending a fortune just staying healthy. Rupex Health changes this completely.",
    long2:"We partner with certified diagnostic centres, hospitals, dental clinics, eye care centres and specialist doctors across India. Every partner is verified. Members get exclusive rates — genuine value that makes quality healthcare truly accessible.",
    graphic:<HealthG/>,
    benefits:[
      {icon:"🩺",title:"Full-Body Checkup",detail:"Up to 30% off at partner diagnostic centres"},
      {icon:"🔬",title:"Blood Tests & Diagnostics",detail:"Discounted rates on all lab tests"},
      {icon:"👨‍⚕️",title:"Doctor Consultations",detail:"General & specialist consultation packages"},
      {icon:"🦷",title:"Dental Care",detail:"Cleaning, fillings and checkups at member rates"},
      {icon:"👁️",title:"Eye Checkups",detail:"Vision tests and spectacle discounts"},
      {icon:"📊",title:"Annual Health Tracking",detail:"Track your health journey as a Rupex member"},
    ],
    stats:[["30%","Avg. checkup saving"],["₹2000+","Annual family savings"],["50+","Partner clinics"]],
    why:"Because preventive healthcare is the smartest investment. We make it affordable so you actually do it.",
  },
  {
    id:"mart",emoji:"🛒",name:"Rupex Mart",color:"#FF6B00",tag:"LIVE",tagBg:"rgba(255,107,0,0.15)",tagBorder:"rgba(255,107,0,0.4)",tagColor:"#FFB347",
    tagline:"Everyday savings on everyday things",
    heroDesc:"Think of Rupex Mart as your personal discount card for everything you buy daily — groceries, electronics, household products, clothing and more. Like DMart, but smarter and more personal.",
    long1:"Every Indian household spends ₹15,000–₹40,000 a month on daily essentials. Even a 10% saving adds up to ₹18,000–₹48,000 a year. Rupex Mart makes this possible through our growing retail partner network.",
    long2:"We partner with retail stores, online merchants and product brands to offer Rupex members exclusive pricing not available to the public. Whether you shop in-store or online — your membership card works everywhere in our partner network.",
    graphic:<MartG/>,
    benefits:[
      {icon:"🥗",title:"Groceries & Essentials",detail:"Up to 20% off at partner grocery stores"},
      {icon:"📱",title:"Electronics & Appliances",detail:"Special member pricing on tech products"},
      {icon:"👕",title:"Clothing & Lifestyle",detail:"Seasonal sale early access + extra discounts"},
      {icon:"🏠",title:"Home & Kitchen",detail:"Household essentials at member rates"},
      {icon:"🌐",title:"Online Shopping Deals",detail:"Partner merchant codes and cashback"},
      {icon:"📋",title:"Monthly Deal Booklet",detail:"Curated offers updated every month"},
    ],
    stats:[["₹2000+","Monthly avg. savings"],["100+","Partner stores"],["30%","Max discount"]],
    why:"Because you're already spending this money every month. We just make sure you spend less of it.",
  },
  {
    id:"hospitality",emoji:"🏨",name:"Rupex Hospitality",color:"#D69E2E",tag:"LIVE",tagBg:"rgba(214,158,46,0.15)",tagBorder:"rgba(214,158,46,0.4)",tagColor:"#F6E05E",
    tagline:"Travel and dine like you deserve",
    heroDesc:"Hotels charge full price. Restaurants don't reward loyalty. Rupex Hospitality gives members exclusive rates on stays, dining and travel — simply not available to the general public.",
    long1:"Indians spend billions on travel and dining every year — overpaying because they don't have insider rates. Business travelers, families on vacation, couples dining out — everyone overpays. Until now.",
    long2:"Rupex Hospitality gives members a verified network of hotels, restaurants, cafés and travel providers across India. Whether booking a weekend getaway, a corporate trip or a dinner out — your Rupex card gets you better treatment at better prices.",
    graphic:<HospG/>,
    benefits:[
      {icon:"🏨",title:"Hotel & Resort Bookings",detail:"Up to 25% off at partner properties"},
      {icon:"🍽️",title:"Restaurant & Dining",detail:"Special member menus and dining deals"},
      {icon:"✈️",title:"Travel Packages",detail:"Exclusive member-only travel deals"},
      {icon:"⚡",title:"Priority Check-In",detail:"Priority treatment at partner hotels"},
      {icon:"🌊",title:"Weekend Getaways",detail:"Curated deals for member family holidays"},
      {icon:"💼",title:"Corporate Travel",detail:"Special rates for business members"},
    ],
    stats:[["25%","Average hotel discount"],["75+","Partner properties"],["₹5000+","Average trip savings"]],
    why:"Because you work har
