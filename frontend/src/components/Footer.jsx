import { Link } from "react-router-dom";

const Icon = ({ name, size = 18, color = "currentColor" }) => {
  const icons = {
    phone: <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" />,
    mail: <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />,
    location: <><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" /></>,
    card: <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" strokeLinecap="round" strokeLinejoin="round" />,
    whatsapp: <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.1 1.51 5.83L0 24l6.34-1.66A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.85 0-3.63-.5-5.17-1.38l-.37-.22-3.77.99 1-3.68-.24-.38A9.94 9.94 0 012 12C2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.94 9.94 0 0122 12c0 5.52-4.48 10-10 10zm5.44-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.19-.24-.58-.49-.5-.67-.51-.17 0-.37-.02-.57-.02s-.52.07-.79.37c-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z" strokeLinecap="round" strokeLinejoin="round" />,
  };
  return (
    <svg width={size} height={size} fill="none" stroke={color} strokeWidth={1.6} viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  );
};

export default function Footer() {
  return (
    <footer style={{ background: "#0f1117", padding: "56px 5% 28px", fontFamily: "'Segoe UI', Inter, sans-serif" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: "linear-gradient(135deg,#E63946,#c1121f)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 17 }}>R</div>
              <span style={{ fontWeight: 800, fontSize: 17, color: "#fff" }}>Rupex <span style={{ color: "#E63946" }}>INDIA</span></span>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.8, marginBottom: 20 }}>
              India's growing membership platform for savings, skills, and opportunities — across Health, Mart, Hospitality, Real Estate & more.
            </p>
            <Link to="/id-card" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#E63946", color: "#fff", padding: "10px 18px",
              borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none",
            }}>
              <Icon name="card" size={15} color="#fff" /> Get Free ID Card
            </Link>
          </div>

          {/* Pages */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.28)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 18 }}>Pages</div>
            {[
              { label: "Home", path: "/" },
              { label: "About Us", path: "/about" },
              { label: "Services", path: "/services" },
              { label: "Contact", path: "/contact" },
              { label: "Get ID Card", path: "/id-card" },
            ].map(({ label, path }) => (
              <div key={label} style={{ marginBottom: 11 }}>
                <Link to={path} style={{ fontSize: 13, color: "rgba(255,255,255,0.48)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#E63946"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.48)"}
                >{label}</Link>
              </div>
            ))}
          </div>

          {/* Services */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.28)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 18 }}>Our Services</div>
            {["Rupex Health", "Rupex Mart", "Rupex Hospitality", "Rupex Real Estate", "Rupex Healthcare"].map(s => (
              <div key={s} style={{ marginBottom: 11 }}>
                <Link to="/services" style={{ fontSize: 13, color: "rgba(255,255,255,0.48)", textDecoration: "none" }}
                  onMouseEnter={e => e.target.style.color = "#E63946"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.48)"}
                >{s}</Link>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.28)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 18 }}>Contact Us</div>
            {[
              { icon: "phone", text: "+91 99116 93802" },
              { icon: "whatsapp", text: "+91 93546 14756" },
              { icon: "mail", text: "info@rupexindia.com" },
              { icon: "location", text: "New Delhi, India" },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 13 }}>
                <Icon name={icon} size={15} color="#E63946" />
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.48)" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>© 2025 Rupex INDIA. All rights reserved.</span>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Use", "Refund Policy"].map(l => (
              <a key={l} href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>Made with ❤️ for India</span>
        </div>
      </div>
    </footer>
  );
}
