import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import FloatingWidget from "../components/FloatingWidget.jsx";

const C = {
  saffron: "#FF6B00", saffronDark: "#CC5500", gold: "#FFB347",
  navy: "#0A0F2C", navyLight: "#141A3A", offwhite: "#FFF8F3", muted: "#6B7280",
};

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Inter',sans-serif}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
    @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
    @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.08)}}
    .fa{animation:float 4s ease-in-out infinite}
    .gradient-text{background:linear-gradient(135deg,#FF6B00,#FFB347,#FF6B00);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 3s linear infinite}
    .sdiv{width:70px;height:4px;background:linear-gradient(90deg,#FF6B00,#FFB347);border-radius:2px}
    .cta{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,#FF6B00,#CC5500);color:#fff;padding:15px 32px;border-radius:50px;font-size:15px;font-weight:700;text-decoration:none;box-shadow:0 8px 32px rgba(255,107,0,0.4);transition:all 0.3s;border:none;cursor:pointer;font-family:'Inter',sans-serif}
    .cta:hover{transform:translateY(-3px);box-shadow:0 16px 48px rgba(255,107,0,0.5)}
    .inp{width:100%;padding:13px 16px;border-radius:12px;font-size:14px;border:1.5px solid rgba(255,107,0,0.2);outline:none;background:rgba(255,107,0,0.02);color:#0A0F2C;font-family:'Inter',sans-serif;transition:border-color 0.2s,box-shadow 0.2s;box-sizing:border-box}
    .inp:focus{border-color:#FF6B00;box-shadow:0 0 0 3px rgba(255,107,0,0.1)}
    @media(max-width:768px){
      .dn{display:none !important}.mf{display:flex !important}
      .tc{grid-template-columns:1fr !important}
    }
  `}</style>
);

function generateMemberID() {
  const year = new Date().getFullYear();
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `RX-${year}-${rand}`;
}

function QRPattern({ id }) {
  const seed = id ? id.split("").reduce((a, c) => a + c.charCodeAt(0), 0) : 42;
  const cells = [];
  const size = 7;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const isCorner = (r < 2 && c < 2) || (r < 2 && c >= size - 2) || (r >= size - 2 && c < 2);
      const val = isCorner ? 1 : ((seed * (r + 1) * (c + 1) * 13) % 7 > 2 ? 1 : 0);
      if (val) cells.push({ r, c });
    }
  }
  const cell = 72 / size;
  return (
    <svg width={72} height={72} viewBox="0 0 72 72">
      {cells.map(({ r, c }) => <rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell - 1} height={cell - 1} fill={C.navy} rx={1} />)}
    </svg>
  );
}

function IDCard({ data, cardRef }) {
  return (
    <div ref={cardRef} style={{ width: 380, background: `linear-gradient(135deg,${C.navy} 0%,${C.navyLight} 100%)`, borderRadius: 20, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.4)", fontFamily: "'Inter',sans-serif", position: "relative", flexShrink: 0 }}>
      <div style={{ height: 5, background: `linear-gradient(90deg,${C.saffron},${C.gold},${C.saffron})` }} />
      <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,107,0,0.08)", pointerEvents: "none" }} />
      <div style={{ padding: "20px 22px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: `linear-gradient(135deg,${C.saffron},${C.saffronDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 16 }}>R</div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 14, color: "#fff" }}>Rupex INDIA</div>
              <div style={{ fontSize: 8, color: "rgba(255,255,255,0.38)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Official Member Card</div>
            </div>
          </div>
          <div style={{ background: "rgba(255,107,0,0.18)", border: "1px solid rgba(255,107,0,0.4)", borderRadius: 100, padding: "3px 12px" }}>
            <span style={{ fontSize: 9, fontWeight: 800, color: C.saffron }}>ACTIVE</span>
          </div>
        </div>
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 16 }} />
        <div style={{ display: "flex", gap: 16, paddingBottom: 18 }}>
          <div style={{ flexShrink: 0 }}>
            {data.photo
              ? <img src={data.photo} alt="Member" style={{ width: 80, height: 80, borderRadius: 12, objectFit: "cover", border: "2px solid rgba(255,107,0,0.5)" }} />
              : <div style={{ width: 80, height: 80, borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "2px dashed rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>👤</div>
            }
            <div style={{ marginTop: 8, width: 80, height: 80, borderRadius: 10, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: 4 }}>
              <QRPattern id={data.memberID} />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 900, color: "#fff", marginBottom: 12, lineHeight: 1.2 }}>{data.name}</div>
            {[["Mobile", data.mobile], ["Address", data.address]].map(([label, val]) => (
              <div key={label} style={{ marginBottom: 9 }}>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.82)", fontWeight: 500, lineHeight: 1.4 }}>{val}</div>
              </div>
            ))}
            <div style={{ background: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.25)", borderRadius: 8, padding: "8px 10px", marginTop: 4 }}>
              <div style={{ fontSize: 8, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>Member ID</div>
              <div style={{ fontSize: 12, fontWeight: 800, color: C.saffron, letterSpacing: 1.5 }}>{data.memberID}</div>
            </div>
            <div style={{ display: "flex", gap: 14, marginTop: 10 }}>
              {[["Issued", new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })], ["Valid Till", new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })]].map(([label, val]) => (
                <div key={label}>
                  <div style={{ fontSize: 8, color: "rgba(255,255,255,0.28)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", fontWeight: 600 }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: "rgba(255,107,0,0.07)", borderTop: "1px solid rgba(255,107,0,0.12)", padding: "9px 22px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.25)" }}>rupexindia.com</span>
        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.25)" }}>VERIFIED MEMBER</span>
      </div>
    </div>
  );
}

const NAV_LINKS = [
  { label: "Home", path: "/" }, { label: "About", path: "/about" },
  { label: "Services", path: "/services" }, { label: "Contact", path: "/contact" },
];

export default function IDCardPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", mobile: "", address: "", photo: null });
  const [card, setCard] = useState(null);
  const [errors, setErrors] = useState({});
  const [generating, setGenerating] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef(null);
  const fileRef = useRef(null);
  const cardAreaRef = useRef(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name required";
    if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) e.mobile = "Valid 10-digit mobile required";
    if (!form.address.trim()) e.address = "Address required";
    return e;
  };

  const handleGenerate = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({}); setGenerating(true);
    setTimeout(() => {
      setCard({ ...form, memberID: generateMemberID() });
      setGenerating(false);
      setTimeout(() => cardAreaRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 200);
    }, 1000);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      if (!window.html2canvas) {
        await new Promise((res, rej) => {
          const s = document.createElement("script");
          s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
          s.onload = res; s.onerror = rej;
          document.head.appendChild(s);
        });
      }
      const canvas = await window.html2canvas(cardRef.current, { scale: 3, backgroundColor: null, useCORS: true });
      const link = document.createElement("a");
      link.download = `Rupex-MemberCard-${card.memberID}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch { alert("Right-click the card and save as image."); }
    setDownloading(false);
  };

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: C.offwhite, color: C.navy }}>
      <GlobalStyles />
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 300, background: "rgba(10,15,44,0.97)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,107,0,0.1)", padding: "0 5%", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 40, height: 40, borderRadius: 11, background: `linear-gradient(135deg,${C.saffron},${C.saffronDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 19, boxShadow: "0 4px 16px rgba(255,107,0,0.4)" }}>R</div>
          <span style={{ fontWeight: 900, fontSize: 17, color: "#fff" }}>Rupex <span style={{ color: C.saffron }}>INDIA</span></span>
        </Link>
        <div className="dn" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_LINKS.map(({ label, path }) => (
            <Link key={label} to={path} style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>{label}</Link>
          ))}
          <a href="#join-form" className="cta" style={{ padding: "9px 22px", fontSize: 13, borderRadius: 50 }}>🪪 Get ID Card</a>
        </div>
        <button className="mf" onClick={() => setMenuOpen(o => !o)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "#fff", fontSize: 24, alignItems: "center" }}>{menuOpen ? "✕" : "☰"}</button>
      </nav>

      {menuOpen && (
        <div style={{ position: "fixed", top: 68, left: 0, right: 0, zIndex: 299, background: C.navy, padding: "24px 5% 32px", borderBottom: `1px solid rgba(255,107,0,0.15)`, display: "flex", flexDirection: "column", gap: 20 }}>
          {NAV_LINKS.map(({ label, path }) => <Link key={label} to={path} onClick={() => setMenuOpen(false)} style={{ fontSize: 17, fontWeight: 600, color: "#fff", textDecoration: "none" }}>{label}</Link>)}
          <a href="#join-form" onClick={() => setMenuOpen(false)} className="cta" style={{ textAlign: "center", justifyContent: "center" }}>🪪 Get Free ID Card</a>
        </div>
      )}

      <section style={{ background: `linear-gradient(140deg,${C.navy} 0%,${C.navyLight} 55%,#0D1235 100%)`, padding: "110px 5% 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div className="fa" style={{ position: "absolute", top: "5%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,107,0,0.1) 0%,transparent 65%)" }} />
        </div>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.3)", borderRadius: 100, padding: "8px 18px", marginBottom: 28 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.saffron, animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: C.saffron, letterSpacing: "0.06em" }}>🪪 Free for all Indians</span>
          </div>
          <h1 style={{ fontSize: "clamp(2.4rem,5.5vw,4rem)", fontWeight: 900, color: "#fff", lineHeight: 1.08, letterSpacing: "-2px", marginBottom: 20 }}>
            Get Your Official<br /><span className="gradient-text">Rupex INDIA</span><br />Membership Card
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.58)", lineHeight: 1.85, maxWidth: 540, margin: "0 auto 36px" }}>
            Fill your details below. Your verified membership card generates instantly — download it as a PNG and start accessing benefits across all Rupex businesses.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {["✅ 100% Free", "🪪 Instant Download", "🔒 Verified", "📱 PNG Format"].map(b => (
              <div key={b} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 100, padding: "8px 16px", fontSize: 13, fontWeight: 600, color: "#fff" }}>{b}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="join-form" style={{ padding: "80px 5%", background: C.offwhite }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", gap: 48, alignItems: "flex-start", flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{ flex: "1 1 380px", maxWidth: 440, background: "#fff", borderRadius: 24, padding: "36px 32px", border: "1.5px solid rgba(255,107,0,0.12)", boxShadow: "0 8px 48px rgba(255,107,0,0.06)" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: 6, color: C.navy }}>Your Details</h3>
            <p style={{ fontSize: 13, color: C.muted, marginBottom: 28, lineHeight: 1.6 }}>Fill below and get your card in seconds — completely free.</p>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 8, display: "block" }}>Profile Photo <span style={{ color: "#aaa", fontWeight: 400 }}>(optional)</span></label>
              <div onClick={() => fileRef.current?.click()} style={{ border: `2px dashed ${form.photo ? C.saffron : "rgba(255,107,0,0.25)"}`, borderRadius: 14, padding: "20px", textAlign: "center", cursor: "pointer", background: form.photo ? "rgba(255,107,0,0.04)" : "#fafafa", transition: "all 0.2s" }}>
                {form.photo
                  ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                      <img src={form.photo} alt="" style={{ width: 68, height: 68, borderRadius: 12, objectFit: "cover", border: `2px solid ${C.saffron}` }} />
                      <span style={{ fontSize: 12, color: C.saffron, fontWeight: 600 }}>Tap to change</span>
                    </div>
                  : <div>
                      <div style={{ fontSize: 32, marginBottom: 8 }}>📷</div>
                      <div style={{ fontSize: 13, color: "#aaa" }}>Tap to upload photo</div>
                    </div>
                }
              </div>
              <input ref={fileRef} type="file" accept="image/*" onChange={e => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = ev => setForm(p => ({ ...p, photo: ev.target.result })); r.readAsDataURL(f); }} style={{ display: "none" }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 6, display: "block" }}>Full Name *</label>
              <input className="inp" placeholder="e.g. Rahul Sharma" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
              {errors.name && <div style={{ fontSize: 12, color: "#E53E3E", marginTop: 4 }}>⚠ {errors.name}</div>}
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 6, display: "block" }}>Mobile Number *</label>
              <input className="inp" placeholder="10-digit mobile number" type="tel" value={form.mobile} maxLength={10} onChange={e => setForm(p => ({ ...p, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) }))} />
              {errors.mobile && <div style={{ fontSize: 12, color: "#E53E3E", marginTop: 4 }}>⚠ {errors.mobile}</div>}
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 6, display: "block" }}>Address *</label>
              <textarea className="inp" placeholder="House no., Street, City, State" value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} style={{ resize: "vertical", minHeight: 85, lineHeight: 1.6 }} />
              {errors.address && <div style={{ fontSize: 12, color: "#E53E3E", marginTop: 4 }}>⚠ {errors.address}</div>}
            </div>
            <button onClick={handleGenerate} disabled={generating} className="cta" style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "15px", opacity: generating ? 0.7 : 1 }}>
              {generating ? "⏳ Generating your card..." : "🪪 Join Free & Get My ID Card"}
            </button>
            <p style={{ fontSize: 12, color: "#bbb", textAlign: "center", marginTop: 12 }}>Free forever. No credit card needed.</p>
          </div>

          <div ref={cardAreaRef} style={{ flex: "1 1 380px", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            {card ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "#38A169", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>✅ Welcome to Rupex INDIA!</div>
                  <p style={{ fontSize: 13, color: C.muted }}>Your official membership card is ready</p>
                </div>
                <IDCard data={card} cardRef={cardRef} />
                <div style={{ background: "rgba(255,107,0,0.06)", border: "1.5px solid rgba(255,107,0,0.2)", borderRadius: 14, padding: "14px 32px", textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>Your Unique Member ID</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: C.saffron, letterSpacing: 2 }}>{card.memberID}</div>
                </div>
                <button onClick={handleDownload} disabled={downloading} style={{ display: "flex", al
