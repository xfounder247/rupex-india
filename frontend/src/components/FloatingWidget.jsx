import { useState } from "react";

export default function FloatingWidget() {
  const [open, setOpen] = useState(false);

  const WA_NUM = "919354614756";
  const PHONE = "919911693802";
  const WA_MSG = encodeURIComponent("Hi! I'm interested in Rupex INDIA membership. Please share more details.");

  const btn = (bg, label, icon, href) => (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      display: "flex", alignItems: "center", gap: 12,
      background: bg, color: "#fff", padding: "11px 18px",
      borderRadius: 50, textDecoration: "none", fontWeight: 700,
      fontSize: 13, boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
      whiteSpace: "nowrap", fontFamily: "'Segoe UI', Inter, sans-serif",
      transform: open ? "scale(1)" : "scale(0)",
      opacity: open ? 1 : 0,
      transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
    }}>
      <span style={{ fontSize: 20 }}>{icon}</span> {label}
    </a>
  );

  return (
    <div style={{ position: "fixed", bottom: 28, right: 24, zIndex: 999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
      {/* Action buttons */}
      {btn("#25D366", "WhatsApp Us", "💬", `https://wa.me/${WA_NUM}?text=${WA_MSG}`)}
      {btn("#0f1117", "Call Us Now", "📞", `tel:+${PHONE}`)}

      {/* Main toggle */}
      <button onClick={() => setOpen(o => !o)} style={{
        width: 58, height: 58, borderRadius: "50%",
        background: open ? "#0f1117" : "#E63946",
        border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 6px 24px rgba(230,57,70,0.4)",
        transition: "all 0.3s", fontSize: 24,
        transform: open ? "rotate(45deg)" : "rotate(0deg)",
      }}>
        {open ? "✕" : "💬"}
      </button>

      {/* Pulse ring (when closed) */}
      {!open && (
        <div style={{
          position: "absolute", bottom: 0, right: 0,
          width: 58, height: 58, borderRadius: "50%",
          border: "2px solid rgba(230,57,70,0.5)",
          animation: "pulse 1.8s infinite",
          pointerEvents: "none",
        }} />
      )}

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.7); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
