import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    menu: <><path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" /></>,
    close: <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />,
    card: <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" strokeLinecap="round" strokeLinejoin="round" />,
    arrow: <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />,
  };
  return (
    <svg width={size} height={size} fill="none" stroke={color} strokeWidth={1.8} viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  );
};

const NAV = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const isHome = location.pathname === "/";

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled || !isHome ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: scrolled || !isHome ? "blur(14px)" : "none",
        boxShadow: scrolled || !isHome ? "0 1px 20px rgba(0,0,0,0.07)" : "none",
        transition: "all 0.3s", padding: "0 5%",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 64,
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: "linear-gradient(135deg, #E63946, #c1121f)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, color: "#fff", fontSize: 18,
            boxShadow: "0 4px 12px rgba(230,57,70,0.35)",
          }}>R</div>
          <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.5px", color: scrolled || !isHome ? "#0f1117" : (isHome ? "#fff" : "#0f1117") }}>
            Rupex <span style={{ color: "#E63946" }}>INDIA</span>
          </span>
        </Link>

        {/* Desktop */}
        <div style={{ display: "flex", gap: 28, alignItems: "center" }} className="desk-nav">
          {NAV.map(({ label, path }) => {
            const active = location.pathname === path;
            return (
              <Link key={label} to={path} style={{
                fontSize: 14, fontWeight: active ? 700 : 500,
                color: active ? "#E63946" : (scrolled || !isHome ? "#444" : (isHome ? "rgba(255,255,255,0.8)" : "#444")),
                textDecoration: "none", borderBottom: active ? "2px solid #E63946" : "2px solid transparent",
                paddingBottom: 2, transition: "all 0.2s",
              }}>{label}</Link>
            );
          })}
          <Link to="/id-card" style={{
            display: "flex", alignItems: "center", gap: 7,
            background: "#E63946", color: "#fff", padding: "9px 18px",
            borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none",
            boxShadow: "0 4px 14px rgba(230,57,70,0.3)",
          }}>
            <Icon name="card" size={16} color="#fff" /> Get ID Card
          </Link>
        </div>

        {/* Mobile */}
        <button onClick={() => setMenuOpen(o => !o)} className="mob-btn" style={{
          display: "none", background: "none", border: "none", cursor: "pointer", padding: 4,
        }}>
          <Icon name={menuOpen ? "close" : "menu"} size={24} color={scrolled || !isHome ? "#0f1117" : "#fff"} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 199,
          background: "#fff", padding: "20px 5% 28px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          display: "flex", flexDirection: "column", gap: 18,
        }}>
          {NAV.map(({ label, path }) => (
            <Link key={label} to={path} style={{
              fontSize: 16, fontWeight: 600,
              color: location.pathname === path ? "#E63946" : "#0f1117",
              textDecoration: "none",
            }}>{label}</Link>
          ))}
          <Link to="/id-card" style={{
            background: "#E63946", color: "#fff", padding: "13px",
            borderRadius: 10, fontSize: 15, fontWeight: 700,
            textDecoration: "none", textAlign: "center",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            <Icon name="card" size={18} color="#fff" /> Get Your Free ID Card
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desk-nav { display: none !important; }
          .mob-btn { display: block !important; }
        }
      `}</style>
    </>
  );
              }
