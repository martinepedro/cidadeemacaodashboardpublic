/* global React */
const { useState, useEffect, useRef, useMemo } = React;

// ---------- Icons (Lucide-style, inline) ----------
const Icon = ({ d, size = 18, stroke = 2, fill = 'none', ...rest }) => (
  <svg className="icn" width={size} height={size} viewBox="0 0 24 24" fill={fill}
    stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...rest}>
    {typeof d === 'string' ? <path d={d}/> : d}
  </svg>
);

const IC = {
  dashboard: <><rect x="3" y="3" width="7" height="9" rx="2"/><rect x="14" y="3" width="7" height="5" rx="2"/><rect x="14" y="12" width="7" height="9" rx="2"/><rect x="3" y="16" width="7" height="5" rx="2"/></>,
  building: <><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9v.01"/><path d="M9 12v.01"/><path d="M9 15v.01"/><path d="M9 18v.01"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  tag: <><path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7.5" cy="7.5" r="1.5"/></>,
  ticket: <><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></>,
  image: <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.5-3.5L9 20"/></>,
  briefcase: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></>,
  spark: <><path d="M9.94 14.06 8 22l4-2 4 2-1.94-7.94"/><path d="M5 8l-3 1 3 1 1 3 1-3 3-1-3-1-1-3z" transform="translate(7,-4)"/></>,
  bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></>,
  plus: "M12 5v14M5 12h14",
  chevDown: "m6 9 6 6 6-6",
  chevRight: "m9 6 6 6-6 6",
  chevLeft: "m15 6-6 6 6 6",
  upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v12"/></>,
  edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="m18.5 2.5 3 3L12 15l-4 1 1-4z"/></>,
  trash: <><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></>,
  eye: <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7"/><circle cx="12" cy="12" r="3"/></>,
  whatsapp: <><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9z" fill="currentColor" stroke="none"/><path d="M9 10c.5 2 1.5 3 3.5 4l1.5-1.5c.3-.3.7-.4 1-.2l2 .8c.4.2.6.6.5 1l-.4 1.5c-.1.4-.5.7-.9.7C9.5 16.3 7.7 14.5 7 9.8c-.1-.4.2-.8.6-.9L9 8.5c.4-.1.8.1 1 .5l.8 2c.1.3 0 .7-.2 1z" fill="#fff" stroke="none"/></>,
  pin: <><path d="M12 22s-8-7.5-8-13a8 8 0 0 1 16 0c0 5.5-8 13-8 13"/><circle cx="12" cy="9" r="3"/></>,
  phone: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></>,
  globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
  ig: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".75" fill="currentColor"/></>,
  fb: <><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></>,
  send: <><path d="m22 2-7 20-4-9-9-4z"/><path d="m22 2-11 11"/></>,
  download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></>,
  filter: <><path d="M22 3H2l8 9.46V19l4 2v-8.54z"/></>,
  more: <><circle cx="5" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="19" cy="12" r="1.5" fill="currentColor"/></>,
  menu: "M3 6h18M3 12h18M3 18h18",
  arrowUp: "m12 19V5M5 12l7-7 7 7",
  arrowDown: "M12 5v14M19 12l-7 7-7-7",
  trendUp: "m22 7-8.5 8.5-5-5L2 17",
  star: <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
  zap: <path d="M13 2 3 14h9l-1 8 10-12h-9z"/>,
  check: "M20 6 9 17l-5-5",
  x: "M18 6 6 18M6 6l12 12",
  logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
  help: <><circle cx="12" cy="12" r="9"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></>,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></>,
  lock: <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
  copy: <><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>,
  flame: <path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c1.5 0 3-1 3-3 0-2-2-3-2-5 0-1 1-2 1-2s-4 1-4 5c0 1.5 1 2.5 1 2.5M14 4c1 0 4 1 4 6a8 8 0 1 1-16 0c0-2.5 1-4 2-5 0 4 4 4 4 8a4 4 0 1 0 8 0c0-2-1-3-2-5 1 0 2-1 2-1z"/>,
  rocket: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></>,
  layers: <><path d="m12 2-10 6 10 6 10-6z"/><path d="m2 14 10 6 10-6"/><path d="m2 18 10 6 10-6"/></>,
  bot: <><rect x="3" y="9" width="18" height="12" rx="3"/><circle cx="9" cy="14" r="1" fill="currentColor"/><circle cx="15" cy="14" r="1" fill="currentColor"/><path d="M9 18h6"/><path d="M12 5V9"/><circle cx="12" cy="4" r="1.5"/></>,
  trophy: <><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 4h3v2a3 3 0 0 1-3 3"/><path d="M7 4H4v2a3 3 0 0 0 3 3"/></>,
};

// Cidade em Ação logomark — real logo
const CALogo = ({ size = 36, onDark = false }) => (
  <div style={{
    width: size, height: size,
    borderRadius: Math.max(8, size * 0.22),
    background: '#fff',
    display: 'grid', placeItems: 'center',
    flexShrink: 0,
    overflow: 'hidden',
    boxShadow: onDark ? '0 6px 16px rgba(0,0,0,.18)' : '0 4px 12px rgba(11,60,140,.18)',
    border: onDark ? '0' : '1px solid var(--border)',
  }}>
    <img src="assets/logo-cidade-acao.jpeg" alt="Cidade em Ação"
      style={{ width: '88%', height: '88%', objectFit: 'contain', display: 'block' }}/>
  </div>
);

// ---------- Sparkline ----------
function Sparkline({ data, color = '#0B3C8C', width = 96, height = 30 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = Math.max(1, max - min);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const path = `M${pts.join(' L')}`;
  const area = `${path} L${width},${height} L0,${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={`spark-${color.slice(1)}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".22"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#spark-${color.slice(1)})`}/>
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ---------- KPI Card ----------
function KPI({ label, value, delta, trend = 'up', icon, color = 'var(--brand-blue)', tint = 'var(--brand-blue-50)', spark }) {
  return (
    <div className="kpi">
      <div className="kpi-head">
        <div className="kpi-icon" style={{ background: tint, color }}>
          <Icon d={icon} size={20} stroke={2.2}/>
        </div>
        <span className="kpi-label">{label}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <div className="kpi-value">{value}</div>
          <div className="kpi-foot">
            <span className={`kpi-trend ${trend}`}>
              <Icon d={trend === 'up' ? IC.arrowUp : IC.arrowDown} size={12} stroke={3}/>
              {delta}
            </span>
            <span>últimos 30 dias</span>
          </div>
        </div>
        {spark && <Sparkline data={spark} color={color}/>}
      </div>
    </div>
  );
}

// ---------- Empty / placeholder ----------
function ImgPlaceholder({ label = 'imagem promocional', variant = '', style }) {
  return <div className={`img-ph ${variant}`} style={style}>{label}</div>;
}

// Expose to other Babel scripts
Object.assign(window, { Icon, IC, CALogo, Sparkline, KPI, ImgPlaceholder });
