import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import FloatingWidget from "../components/FloatingWidget.jsx";

const C = {
  saffron: "#FF6B00", saffronDark: "#CC5500", gold: "#FFB347",
  navy: "#0A0F2C", navyLight: "#141A3A", navyMid: "#1E2650",
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
    @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    .fa{animation:float 4s ease-in-out infinite}
    .fr{animation:floatR 5s ease-in-out infinite}
    .pa{animation:pulse 2.5s ease-in-out infinite}
    .gradient-text{
      background:linear-gradient(135deg,#FF6B00,#FFB347,#FF6B00);
      background-size:200% auto;
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;
      background-clip:text;animation:shimmer 3s linear infinite;
    }
    .sdiv{width:70px;height:4px;background:linear-gradient(90deg,#FF6B00,#FFB347);border-radius:2px}
    .ch{transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.3s,border-color 0.3s}
    .ch:hover{transform:translateY(-6px);box-shadow:0 20px 48px rgba(255,107,0,0.15);border-color:rgba(255,107,0,0.4) !important}
    .cta{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,#FF6B00,#CC5500);color:#fff;padding:15px 32px;border-radius:50px;font-size:15px;font-weight:700;text-decoration:none;box-shadow:0 8px 32px rgba(255,107,0,0.4);transition:all 0.3s;border:none;cursor:pointer;font-family:'Inter',sans-serif}
    .cta:hover{transform:translateY(-3px);box-shadow:0 16px 48px rgba(255,107,0,0.5)}
    .wa{display:inline-flex;align-items:center;gap:10px;background:#25D366;color:#fff;padding:14px 28px;border-radius:50px;font-size:14px;font-weight:700;text-decoration:none;box-shadow:0 8px 24px rgba(37,211,102,0.35);transition:all 0.3s;font-family:'Inter',sans-serif}
    .wa:hover{transform:translateY(-3px);box-shadow:0 16px 40px rgba(37,211,102,0.45)}
    .inp{width:100%;padding:13px 16px;border-radius:12px;font-size:14px;border:1.5px solid rgba(255,107,0,0.2);outline:none;background:rgba(255,107,0,0.02);color:#0A0F2C;font-family:'Inter',sans-serif;transition:border-color 0.2s,box-shadow 0.2s}
    .inp:focus{border-color:#FF6B00;box-shadow:0 0 0 3px rgba(255,107,0,0.1)}
    @media(max-width:768px){
      .dn{display:none !important}.mf{display:flex !important}
      .tc{grid-template-columns:1fr !important}
      .htc{grid-template-columns:1fr 1fr !important}
    }
    @media(max-width:480px){
      .htc{grid-template-columns:1fr !important}
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
    <div ref={ref} style={{ opacity: vis?1:0, transform: vis?"translateY(0)":"translateY(32px)", transition:`opacity 0.7s ease ${delay}s,transform 0.7s cubic-bezier(0.34,1.2,0.64,1) ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

// Contact SVG Graphic
function ContactGraphic() {
  return (
    <svg viewBox="0 0 400 340" width="100%" style={{ maxWidth: 400 }}>
      <defs>
        <linearGradient id="cg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B00"/><stop offset="100%" stopColor="#FFB347"/>
        </linearGradient>
        <radialGradient id="cg2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.12"/><stop offset="100%" stopColor="#FF6B00" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Background glow */}
      <circle cx="200" cy="170" r="150" fill="url(#cg2)"/>

      {/* Phone */}
      <rect x="140" y="60" width="120" height="200" rx="20" fill="#141A3A" stroke="rgba(255,107,0,0.4)" strokeWidth="2"/>
      <rect x="148" y="75" width="104" height="160" rx="10" fill="#0A0F2C"/>
      <circle cx="200" cy="248" r="8" fill="rgba(255,107,0,0.3)" stroke="rgba(255,107,0,0.5)" strokeWidth="1.5"/>
      <rect x="178" y="65" width="44" height="6" rx="3" fill="rgba(255,255,255,0.15)"/>

      {/* Chat bubbles on screen */}
      <rect x="155" y="85" width="75" height="28" rx="8" fill="url(#cg1)" opacity="0.9"/>
      <text x="192" y="103" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">Hi Rupex! 👋</text>

      <rect x="162" y="122" width="82" height="28" rx="8" fill="#1E2650"/>
      <text x="203" y="140" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="8">How can we help?</text>

      <rect x="155" y="158" width="70" height="28" rx="8" fill="url(#cg1)" opacity="0.9"/>
      <text x="190" y="176" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">Membership 🪪</text>

      <rect x="158" y="194" width="78" height="28" rx="8" fill="#1E2650"/>
      <text x="197" y="212" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="8">Reply in 1 hour!</text>

      {/* Floating contact cards */}
      <g className="fa">
        <rect x="8" y="50" width="110" height="54" rx="12" fill="#141A3A" stroke="rgba(255,107,0,0.3)" strokeWidth="1.5"/>
        <text x="22" y="72" fontSize="20">📞</text>
        <text x="50" y="68" fill="rgba(255,255,255,0.5)" fontSize="8">Call Us</text>
        <text x="50" y="82" fill="#FF6B00" fontSize="9" fontWeight="800">99116 93802</text>
        <text x="22" y="94" fill="rgba(255,255,255,0.4)" fontSize="7">Mon–Sat 10am–7pm</text>
      </g>

      <g className="fr">
        <rect x="282" y="45" width="110" height="54" rx="12" fill="#141A3A" stroke="rgba(37,211,102,0.3)" strokeWidth="1.5"/>
        <text x="296" y="67" fontSize="20">💬</text>
        <text x="322" y="63" fill="rgba(255,255,255,0.5)" fontSize="8">WhatsApp</text>
        <text x="322" y="77" fill="#25D366" fontSize="9" fontWeight="800">93546 14756</text>
        <text x="296" y="90" fill="rgba(255,255,255,0.4)" fontSize="7">Reply within 1 hour</text>
      </g>

      <g style={{ animation: "float 6s ease-in-out infinite" }}>
        <rect x="8" y="230" width="110" height="54" rx="12" fill="#141A3A" stroke="rgba(255,107,0,0.3)" strokeWidth="1.5"/>
        <text x="22" y="252" fontSize="20">📧</text>
        <text x="50" y="248" fill="rgba(255,255,255,0.5)" fontSize="8">Email Us</text>
        <text x="50" y="262" fill="#FF6B00" fontSize="8" fontWeight="700">info@rupex</text>
        <text x="50" y="274" fill="#FF6B00" fontSize="8" fontWeight="700">india.com</text>
      </g>

      <g style={{ animation: "floatR 5.5s ease-in-out infinite" }}>
        <rect x="282" y="235" width="110" height="54" rx="12" fill="#141A3A" stroke="rgba(255,107,0,0.3)" strokeWidth="1.5"/>
        <text x="296" y="257" fontSize="20">📍</text>
        <text x="324" y="253" fill="rgba(255,255,255,0.5)" fontSize="8">Office</text>
        <text x="324" y="267" fill="#FF6B00" fontSize="8" fontWeight="700">New Delhi</text>
        <text x="324" y="279" fill="rgba(255,255,255,0.4)" fontSize="7">By appointment</text>
      </g>

      {/* Online indicator */}
      <circle cx="248" cy="68" r="8" fill="#25D366"/>
      <circle cx="248" cy="68" r="12" fill="none" stroke="#25D366" strokeWidth="1.5" opacity="0.4" style={{ animation: "pulse 2s infinite" }}/>
      <text x="263" y="72" fill="rgba(255,255,255,0.6)" fontSize="8">Online Now</text>
    </svg>
  );
}

// Map Graphic
function MapGraphic() {
  return (
    <svg viewBox="0 0 400 280" width="100%">
      <defs>
        <linearGradient id="mg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.08"/><stop offset="100%" stopColor="#FFB347" stopOpacity="0.03"/>
        </linearGradient>
      </defs>
      {/* Map background */}
      <rect x="0" y="0" width="400" height="280" rx="20" fill="url(#mg1)" stroke="rgba(255,107,0,0.15)" strokeWidth="1.5"/>

      {/* Grid lines - map style */}
      {[0,1,2,3,4,5,6].map(i => (
        <line key={`h${i}`} x1="0" y1={i*46} x2="400" y2={i*46} stroke="rgba(255,107,0,0.06)" strokeWidth="1"/>
      ))}
      {[0,1,2,3,4,5,6,7,8].map(i => (
        <line key={`v${i}`} x1={i*50} y1="0" x2={i*50} y2="280" stroke="rgba(255,107,0,0.06)" strokeWidth="1"/>
      ))}

      {/* Roads */}
      <path d="M0,140 Q200,120 400,140" fill="none" stroke="rgba(255,107,0,0.12)" strokeWidth="8" strokeLinecap="round"/>
      <path d="M200,0 Q190,140 200,280" fill="none" stroke="rgba(255,107,0,0.12)" strokeWidth="8" strokeLinecap="round"/>
      <path d="M0,70 Q200,80 400,70" fill="none" stroke="rgba(255,107,0,0.07)" strokeWidth="4"/>
      <path d="M0,210 Q200,200 400,210" fill="none" stroke="rgba(255,107,0,0.07)" strokeWidth="4"/>
      <path d="M100,0 Q110,140 100,280" fill="none" stroke="rgba(255,107,0,0.07)" strokeWidth="4"/>
      <path d="M300,0 Q290,140 300,280" fill="none" stroke="rgba(255,107,0,0.07)" strokeWidth="4"/>

      {/* Blocks */}
      {[[30,20,60,40],[160,20,60,35],[310,20,60,40],[30,100,55,55],[165,95,55,60],[310,95,60,55],[30,180,55,50],[165,185,55,45],[310,182,60,50]].map(([x,y,w,h],i)=>(
        <rect key={i} x={x} y={y} width={w} height={h} rx="4" fill="rgba(255,107,0,0.06)" stroke="rgba(255,107,0,0.1)" strokeWidth="1"/>
      ))}

      {/* Location Pin - New Delhi */}
      <g style={{ filter: "drop-shadow(0 4px 12px rgba(255,107,0,0.4))" }}>
        <circle cx="200" cy="130" r="22" fill="#FF6B00"/>
        <circle cx="200" cy="130" r="16" fill="#CC5500"/>
        <text x="200" y="135" textAnchor="middle" fontSize="14">🏢</text>
        {/* Pin tail */}
        <polygon points="193,148 207,148 200,162" fill="#FF6B00"/>
      </g>

      {/* Pulse rings */}
      <circle cx="200" cy="130" r="35" fill="none" stroke="rgba(255,107,0,0.3)" strokeWidth="1.5" style={{ animation: "pulse 2s ease-in-out infinite" }}/>
      <circle cx="200" cy="130" r="50" fill="none" stroke="rgba(255,107,0,0.15)" strokeWidth="1" style={{ animation: "pulse 2s ease-in-out 0.5s infinite" }}/>

      {/* Label */}
      <rect x="138" y="170" width="124" height="32" rx="8" fill="#141A3A" stroke="rgba(255,107,0,0.3)" strokeWidth="1"/>
      <text x="200" y="183" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8">📍 Rupex INDIA HQ</text>
      <text x="200" y="196" textAnchor="middle" fill="#FF6B00" fontSize="9" fontWeight="800">New Delhi, India</text>

      {/* Compass */}
      <g transform="translate(360,25)">
        <circle cx="0" cy="0" r="18" fill="#141A3A" stroke="rgba(255,107,0,0.3)" strokeWidth="1"/>
        <text x="0" y="-6" textAnchor="middle" fill="#FF6B00" fontSize="9" fontWeight="800">N</text>
        <text x="0" y="10" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">S</text>
        <text x="10" y="3" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">E</text>
        <text x="-10" y="3" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">W</text>
        <line x1="0" y1="-12" x2="0" y2="12" stroke="rgba(255,107,0,0.4)" strokeWidth="1"/>
        <line x1="-12" y1="0" x2="12" y2="0" stroke="rgba(255,107,0,0.2)" strokeWidth="1"/>
      </g>
    </svg>
  );
}

const NAV_LINKS = [
  {label:"Home",path:"/"},{label:"About",path:"/about"},
  {label:"Services",path:"/services"},{label:"Contact",path:"/contact"},
];

const FAQS = [
  {q:"Is Rupex INDIA membership really free?", a:"Yes, 100% free right now. Fill your details, get your ID card instantly, and start accessing member benefits across all Rupex businesses — no payment required."},
  {q:"Is this an MLM or pyramid scheme?", a:"Absolutely not. Rupex INDIA is a membership discount and training platform. Referral rewards are tied to actual purchases — not to recruiting people. We operate with full transparency."},
  {q:"How do I access member benefits?", a:"Once you get your membership ID card, show it at partner locations or use your member ID to unlock online deals across Health, Mart, Hospitality, Real Estate and Healthcare."},
  {q:"How does the referral program work?", a:"You get a unique referral link after joining. When someone you refer makes a purchase at any Rupex partner, you earn a reward. No earnings just for inviting people — only for real transactions."},
  {q:"Can businesses become Rupex partners?", a:"Yes! If you run a business in any sector and want to offer deals to our growing member base, contact us on WhatsApp at +91 93546 14756 or call +91 99116 93802."},
  {q:"Which cities is Rupex available in?", a:"Currently active in New Delhi and expanding across India. Contact us on WhatsApp to check availability in your city."},
];

export default function Contact() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name:"", email:"", phone:"", subject:"", message:"" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1200);
  };

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", background: C.offwhite, color: C.navy }}>
      <GlobalStyles />

      {/* NAVBAR */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:300, background: scrolled?"rgba(10,15,44,0.97)":"rgba(10,15,44,0.85)", backdropFilter:"blur(16px)", borderBottom:"1px solid rgba(255,107,0,0.1)", transition:"all 0.35s", padding:"0 5%", display:"flex", alignItems:"center", justifyContent:"space-between", height:68 }}>
        <Link to="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
          <div style={{ width:40, height:40, borderRadius:11, background:`linear-gradient(135deg,${C.saffron},${C.saffronDark})`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:"#fff", fontSize:19, boxShadow:"0 4px 16px rgba(255,107,0,0.4)" }}>R</div>
          <span style={{ fontWeight:900, fontSize:17, color:"#fff" }}>Rupex <span style={{ color:C.saffron }}>INDIA</span></span>
        </Link>
        <div className="dn" style={{ display:"flex", gap:32, alignItems:"center" }}>
          {NAV_LINKS.map(({label,path}) => (
            <Link key={label} to={path} style={{ fontSize:14, fontWeight:path==="/contact"?700:500, color:path==="/contact"?C.saffron:"rgba(255,255,255,0.75)", textDecoration:"none", borderBottom:path==="/contact"?`2px solid ${C.saffron}`:"2px solid transparent", paddingBottom:2, transition:"all 0.2s" }}>{label}</Link>
          ))}
          <a href="/id-card" className="cta" style={{ padding:"9px 22px", fontSize:13, borderRadius:50 }}>🪪 Join Free</a>
        </div>
        <button className="mf" onClick={()=>setMenuOpen(o=>!o)} style={{ display:"none", background:"none", border:"none", cursor:"pointer", color:"#fff", fontSize:24, alignItems:"center" }}>{menuOpen?"✕":"☰"}</button>
      </nav>

      {menuOpen && (
        <div style={{ position:"fixed", top:68, left:0, right:0, zIndex:299, background:C.navy, padding:"24px 5% 32px", borderBottom:`1px solid rgba(255,107,0,0.15)`, display:"flex", flexDirection:"column", gap:20 }}>
          {NAV_LINKS.map(({label,path}) => <Link key={label} to={path} onClick={()=>setMenuOpen(false)} style={{ fontSize:17, fontWeight:600, color:path==="/contact"?C.saffron:"#fff", textDecoration:"none" }}>{label}</Link>)}
          <a href="/id-card" className="cta" style={{ textAlign:"center", justifyContent:"center" }}>🪪 Join Free & Get ID Card</a>
        </div>
      )}

      {/* HERO */}
      <section style={{ background:`linear-gradient(140deg,${C.navy} 0%,${C.navyLight} 55%,#0D1235 100%)`, minHeight:"75vh", display:"flex", alignItems:"center", padding:"110px 5% 80px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
          <div className="fa" style={{ position:"absolute", top:"5%", right:"5%", width:420, height:420, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,107,0,0.1) 0%,transparent 65%)" }}/>
          <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.025 }}>
            <defs><pattern id="gch" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FF6B00" strokeWidth="1"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#gch)"/>
          </svg>
        </div>
        <div style={{ maxWidth:1200, margin:"0 auto", width:"100%", display:"grid", gridTemplateColumns:"1.1fr 1fr", gap:64, alignItems:"center" }} className="tc">
          <div style={{ position:"relative", zIndex:2 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,107,0,0.1)", border:"1px solid rgba(255,107,0,0.3)", borderRadius:100, padding:"8px 18px", marginBottom:28 }}>
              <div className="pa" style={{ width:8, height:8, borderRadius:"50%", background:C.saffron }}/>
              <span style={{ fontSize:12, fontWeight:700, color:C.saffron, letterSpacing:"0.06em" }}>💬 We reply within 1 hour on WhatsApp</span>
            </div>
            <h1 style={{ fontSize:"clamp(2.4rem,5.5vw,4rem)", fontWeight:900, color:"#fff", lineHeight:1.08, letterSpacing:"-2px", marginBottom:24 }}>
              Got a question?<br /><span className="gradient-text">Let's talk.</span><br />We're here.
            </h1>
            <p style={{ fontSize:"1.1rem", color:"rgba(255,255,255,0.58)", lineHeight:1.85, maxWidth:500, marginBottom:40 }}>
              Whether you want to know more about membership, have a partnership enquiry, need help with your ID card, or just want to say hello — reach us instantly on WhatsApp for the fastest response.
            </p>
            <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
              <a href="https://wa.me/919354614756?text=Hi%20Rupex%20INDIA!%20I%20have%20a%20question." target="_blank" rel="noopener noreferrer" className="wa" style={{ padding:"15px 28px", fontSize:15 }}>💬 Chat on WhatsApp</a>
              <a href="tel:+919911693802" className="cta" style={{ padding:"14px 28px", fontSize:14 }}>📞 Call Us Now</a>
            </div>
          </div>
          <div className="fa" style={{ display:"flex", justifyContent:"center" }}>
            <ContactGraphic />
          </div>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section style={{ padding:"80px 5%", background:"#fff" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <FU>
            <div style={{ textAlign:"center", marginBottom:52 }}>
              <span style={{ fontSize:12, fontWeight:700, color:C.saffron, letterSpacing:"0.12em", textTransform:"uppercase" }}>📞 Reach Us</span>
              <h2 style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:900, letterSpacing:"-1px", margin:"12px 0 16px", lineHeight:1.15, color:C.navy }}>
                Multiple ways to <span className="gradient-text">connect wit
