/* global React, window */
const { useState, useMemo } = React;
const { Icon, IC, KPI, Sparkline, ImgPlaceholder } = window;

// ---------- DASHBOARD HOME ----------
function DashboardScreen({ empresa, go }) {
  // Generate demo time-series
  const views30d = useMemo(() => Array.from({length: 30}, (_,i) => 280 + Math.sin(i/3) * 80 + Math.random()*70 + i*7), []);
  const wa30d   = useMemo(() => Array.from({length: 30}, (_,i) => 40 + Math.cos(i/4) * 18 + Math.random()*14 + i*1.2), []);
  const promo30d = useMemo(() => Array.from({length: 30}, (_,i) => 60 + Math.sin(i/5+1) * 22 + Math.random()*16 + i*1.4), []);
  const total = (a) => Math.round(a.reduce((s,v)=>s+v,0));

  // Chart data (last 14 days)
  const days = ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
  const series = views30d.slice(-14);
  const seriesWA = wa30d.slice(-14);

  return (
    <div className="col" style={{ gap: 'var(--gap)' }}>
      {/* HERO PLAN CARD */}
      <PlanoHero empresa={empresa} go={go}/>

      {/* KPI ROW */}
      <div className="grid g-4">
        <KPI label="Visualizações no app" value={total(views30d).toLocaleString('pt-BR')} delta="+18,2%" trend="up"
          icon={IC.eye} color="var(--brand-blue)" tint="var(--brand-blue-50)" spark={views30d}/>
        <KPI label="Cliques no WhatsApp" value="1.847" delta="+24,5%" trend="up"
          icon={IC.whatsapp} color="var(--brand-green-dark)" tint="var(--brand-green-50)" spark={wa30d}/>
        <KPI label="Acessos a promoções" value="3.214" delta="+9,1%" trend="up"
          icon={IC.tag} color="var(--accent-orange)" tint="#ffe9e2" spark={promo30d}/>
        <KPI label="Resgates de cupons" value="540" delta="-3,8%" trend="down"
          icon={IC.ticket} color="var(--accent-purple)" tint="#ede8ff" spark={[28,35,40,46,42,38,32,30,28,26,30,33,35,32]}/>
      </div>

      {/* CHART + APP PREVIEW */}
      <div className="grid" style={{ gridTemplateColumns: '1.6fr 1fr' }}>
        <div className="card">
          <div className="card-head">
            <div>
              <h3>Performance da empresa</h3>
              <p>Visualizações e cliques no WhatsApp — últimos 14 dias</p>
            </div>
            <div className="row" style={{ gap: 6 }}>
              <button className="pill blue" style={{ cursor: 'pointer' }}><span className="dot"/>Visualizações</button>
              <button className="pill green" style={{ cursor: 'pointer' }}><span className="dot"/>WhatsApp</button>
              <button className="btn sm ghost"><Icon d={IC.download} size={14}/></button>
            </div>
          </div>
          <PerfChart days={days} a={series} b={seriesWA}/>
        </div>

        <div className="card">
          <div className="card-head">
            <div>
              <h3>Como sua empresa aparece</h3>
              <p>Pré-visualização no app Cidade em Ação</p>
            </div>
            <span className="pill green"><span className="dot pulse"/>ao vivo</span>
          </div>
          <AppPreview empresa={empresa}/>
        </div>
      </div>

      {/* PROMO PERFORMANCE + ATIVIDADE */}
      <div className="grid" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
        <div className="card">
          <div className="card-head">
            <div>
              <h3>Promoções com melhor desempenho</h3>
              <p>Visualizações × cliques por promoção</p>
            </div>
            <button className="btn sm" onClick={()=>go('promocoes')}>Ver todas <Icon d={IC.chevRight} size={14}/></button>
          </div>
          <div className="col" style={{ gap: 14 }}>
            <PromoBar nome="Quentinhas almoço"        views={2104} cliques={612} cor="var(--accent-pink)" categoria="Almoço"/>
            <PromoBar nome="Café + Pão de queijo"     views={1240} cliques={308} cor="var(--accent-orange)" categoria="Combo"/>
            <PromoBar nome="Bolo do dia 30% off"      views={870}  cliques={142} cor="var(--brand-green)"  categoria="Desconto"/>
            <PromoBar nome="Lanche da tarde"          views={654}  cliques={96}  cor="var(--accent-purple)" categoria="Combo"/>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div>
              <h3>Atividade recente</h3>
              <p>O que aconteceu nas últimas horas</p>
            </div>
            <button className="btn sm ghost"><Icon d={IC.more} size={16}/></button>
          </div>
          <div className="col" style={{ gap: 0 }}>
            <Activity icon={IC.eye} color="var(--brand-blue)" tint="var(--brand-blue-50)"
              title="128 pessoas viram seu perfil" time="há 12 min" detail="Pico de buscas por 'padaria boa viagem'"/>
            <Activity icon={IC.whatsapp} color="var(--brand-green-dark)" tint="var(--brand-green-50)"
              title="32 cliques no WhatsApp" time="há 1h" detail="Promoção das quentinhas em destaque"/>
            <Activity icon={IC.ticket} color="var(--accent-purple)" tint="#ede8ff"
              title="Cupom CAFE5 resgatado 18×" time="há 2h" detail="Total acumulado: 312 / 500 disponíveis"/>
            <Activity icon={IC.star} color="var(--accent-yellow)" tint="#fff4d6"
              title="Nova avaliação 5★" time="ontem" detail='"Pão de queijo é o melhor da cidade!"'/>
            <Activity icon={IC.briefcase} color="var(--accent-pink)" tint="#ffe0eb"
              title="3 candidatos novos" time="ontem" detail="Vaga: Atendente de balcão"/>
          </div>
        </div>
      </div>

      {/* SHORTCUTS + GEO */}
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        <div className="card">
          <div className="card-head"><div><h3>Atalhos rápidos</h3><p>Atualize sua presença no app</p></div></div>
          <div className="grid g-2" style={{ gap: 10 }}>
            <Shortcut icon={IC.tag}      color="var(--accent-orange)" tint="#ffe9e2"  label="Nova promoção"  onClick={()=>go('promocoes')}/>
            <Shortcut icon={IC.ticket}   color="var(--accent-purple)" tint="#ede8ff"  label="Criar cupom"   onClick={()=>go('cupons')}/>
            <Shortcut icon={IC.image}    color="var(--brand-blue)"     tint="var(--brand-blue-50)" label="Subir banner"  onClick={()=>go('banners')}/>
            <Shortcut icon={IC.briefcase} color="var(--brand-green-dark)" tint="var(--brand-green-50)" label="Publicar vaga" onClick={()=>go('vagas')}/>
          </div>
        </div>

        <div className="card">
          <div className="card-head"><div><h3>Visitantes por bairro</h3><p>Top 5 origens da semana</p></div></div>
          <div className="col" style={{ gap: 11 }}>
            <BairroBar nome="Boa Viagem"    pct={42} qtd="5.964"/>
            <BairroBar nome="Pina"          pct={18} qtd="2.556"/>
            <BairroBar nome="Setúbal"       pct={14} qtd="1.988"/>
            <BairroBar nome="Boa Vista"     pct={9}  qtd="1.278"/>
            <BairroBar nome="Outros"        pct={17} qtd="2.412"/>
          </div>
        </div>

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: 'var(--pad)', paddingBottom: 0 }}>
            <div className="card-head" style={{ marginBottom: 12 }}>
              <div>
                <h3>Localização no app</h3>
                <p>{empresa.endereco}</p>
              </div>
              <button className="btn sm" onClick={()=>go('perfil')}><Icon d={IC.edit} size={13}/> Ajustar</button>
            </div>
          </div>
          <div className="map-stub" style={{ height: 180, margin: '0 var(--pad) var(--pad)', borderRadius: 12 }}>
            <div className="map-pin" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -100%) rotate(-45deg)' }}/>
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, 16px)', background: '#fff', padding: '6px 12px', borderRadius: 999, fontSize: 11, fontWeight: 700, boxShadow: '0 4px 12px rgba(0,0,0,.1)' }}>
              {empresa.nome}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- HERO PLAN ----------
function PlanoHero({ empresa, go }) {
  return (
    <div style={{
      background: 'linear-gradient(115deg, var(--brand-blue) 0%, var(--brand-blue-dark) 55%, #0a2868 100%)',
      borderRadius: 'var(--radius-xl)',
      padding: 28, color: '#fff', position: 'relative', overflow: 'hidden',
      boxShadow: '0 12px 36px rgba(11,60,140,.25)',
    }}>
      {/* Decorative shapes */}
      <svg style={{ position: 'absolute', right: -40, top: -40, opacity: .14 }} width="280" height="280" viewBox="0 0 280 280">
        <circle cx="140" cy="140" r="120" fill="none" stroke="#fff" strokeWidth="1"/>
        <circle cx="140" cy="140" r="80"  fill="none" stroke="#fff" strokeWidth="1"/>
        <circle cx="140" cy="140" r="40"  fill="none" stroke="#fff" strokeWidth="1"/>
        <circle cx="140" cy="140" r="160" fill="none" stroke="#fff" strokeWidth="1"/>
      </svg>
      <svg style={{ position: 'absolute', right: 40, bottom: -100, opacity: .12 }} width="200" height="200" viewBox="0 0 200 200">
        <polygon points="100,10 190,50 190,150 100,190 10,150 10,50" fill="var(--brand-green)"/>
      </svg>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, position: 'relative' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ padding: '4px 10px', borderRadius: 999, background: 'rgba(255,255,255,.18)', fontSize: 10, fontWeight: 800, letterSpacing: '1px' }}>PLANO ATIVO</span>
            <span style={{ padding: '4px 10px', borderRadius: 999, background: 'var(--brand-green)', fontSize: 10, fontWeight: 800, letterSpacing: '1px', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: 50, background: '#fff' }} className="pulse"/> AO VIVO NO APP
            </span>
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-.8px', margin: '0 0 6px' }}>
            Olá, {empresa.nome.split(' ')[0]}! Sua empresa está bombando hoje 🚀
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,.78)', margin: 0, maxWidth: 540, lineHeight: 1.5 }}>
            +18% em visualizações esta semana. Crie uma promoção para esticar esse pico.
          </p>

          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <button className="btn" style={{ background: '#fff', color: 'var(--brand-blue)', borderColor: 'transparent' }} onClick={()=>go('promocoes')}>
              <Icon d={IC.plus} size={14}/> Nova promoção
            </button>
            <button className="btn ghost" style={{ color: '#fff', background: 'rgba(255,255,255,.14)' }} onClick={()=>go('jarvis')}>
              <Icon d={IC.bot} size={14}/> Pergunte ao Jarvis IA
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 22, paddingLeft: 24, borderLeft: '1px solid rgba(255,255,255,.18)' }}>
          <StatBlock label="Plano" value="Profissional" sub="Cidade em Ação Empresas"/>
          <StatBlock label="Renovação" value="08/11/2026" sub="em 176 dias"/>
          <StatBlock label="Status no app" value="● Aberto" sub="até 20:00" valueColor="#5ee68a"/>
        </div>
      </div>
    </div>
  );
}

function StatBlock({ label, value, sub, valueColor = '#fff' }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '1px', color: 'rgba(255,255,255,.6)' }}>{label.toUpperCase()}</div>
      <div style={{ fontSize: 18, fontWeight: 800, marginTop: 4, color: valueColor }}>{value}</div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,.65)', marginTop: 2, fontWeight: 600 }}>{sub}</div>
    </div>
  );
}

// ---------- PERFORMANCE CHART ----------
function PerfChart({ days, a, b }) {
  const W = 760, H = 240, P = { l: 36, r: 14, t: 16, b: 28 };
  const innerW = W - P.l - P.r, innerH = H - P.t - P.b;
  const max = Math.max(...a, ...b) * 1.15;
  const xs = (i) => P.l + (i / (a.length - 1)) * innerW;
  const ys = (v) => P.t + innerH - (v / max) * innerH;
  const path = (data) => data.map((v,i) => `${i===0?'M':'L'}${xs(i).toFixed(1)} ${ys(v).toFixed(1)}`).join(' ');
  const area = (data) => path(data) + ` L${xs(a.length-1).toFixed(1)} ${P.t+innerH} L${xs(0).toFixed(1)} ${P.t+innerH} Z`;
  const yTicks = [0, .25, .5, .75, 1].map(t => Math.round(max * t));

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
        <defs>
          <linearGradient id="gA" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0B3C8C" stopOpacity=".25"/>
            <stop offset="100%" stopColor="#0B3C8C" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="gB" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#00A651" stopOpacity=".22"/>
            <stop offset="100%" stopColor="#00A651" stopOpacity="0"/>
          </linearGradient>
        </defs>
        {/* Grid */}
        {yTicks.map((v, i) => (
          <g key={i}>
            <line x1={P.l} x2={W-P.r} y1={ys(v)} y2={ys(v)} stroke="#e4e7ef" strokeDasharray={i===0?'':'2,3'}/>
            <text x={P.l - 8} y={ys(v) + 4} fontSize="10" fill="#8a93a6" textAnchor="end" fontWeight="600">{v}</text>
          </g>
        ))}
        {/* Days */}
        {days.map((d, i) => (
          <text key={i} x={xs(i)} y={H - 8} fontSize="10" fill="#8a93a6" textAnchor="middle" fontWeight="600">{d}</text>
        ))}
        {/* Area A */}
        <path d={area(a)} fill="url(#gA)"/>
        <path d={path(a)} fill="none" stroke="#0B3C8C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Area B */}
        <path d={area(b)} fill="url(#gB)"/>
        <path d={path(b)} fill="none" stroke="#00A651" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Dots last */}
        <circle cx={xs(a.length-1)} cy={ys(a[a.length-1])} r="4" fill="#fff" stroke="#0B3C8C" strokeWidth="2.5"/>
        <circle cx={xs(b.length-1)} cy={ys(b[b.length-1])} r="4" fill="#fff" stroke="#00A651" strokeWidth="2.5"/>
        {/* Highlight value */}
        <g transform={`translate(${xs(a.length-1) - 78}, ${ys(a[a.length-1]) - 38})`}>
          <rect width="76" height="28" rx="8" fill="#0B3C8C"/>
          <text x="10" y="12" fontSize="9" fill="#fff" fontWeight="700" opacity=".7">HOJE</text>
          <text x="10" y="23" fontSize="12" fill="#fff" fontWeight="800">{Math.round(a[a.length-1])} views</text>
        </g>
      </svg>
    </div>
  );
}

// ---------- APP PREVIEW (mockup do card no app) ----------
function AppPreview({ empresa }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 0' }}>
      <div className="phone-prev">
        <div className="scr">
          <div style={{ padding: '38px 14px 8px', background: 'linear-gradient(180deg, var(--brand-blue), var(--brand-blue-dark))', color: '#fff', borderRadius: '24px 24px 0 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.5px' }}>RECIFE — PE</div>
              <Icon d={IC.bell} size={14}/>
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-.3px', marginTop: 6 }}>Comércio local</div>
          </div>
          <div style={{ padding: 10, background: 'var(--bg)', height: 'calc(100% - 80px)' }}>
            {/* Featured card */}
            <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}>
              <div style={{ position: 'relative' }}>
                <div className="img-ph orange" style={{ height: 80, borderRadius: 0, border: 'none' }}>foto promocional</div>
                <span style={{ position: 'absolute', top: 6, right: 6, background: 'var(--accent-orange)', color: '#fff', fontSize: 9, fontWeight: 800, padding: '3px 7px', borderRadius: 999 }}>DESTAQUE</span>
              </div>
              <div style={{ padding: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 7, background: empresa.avatarColor, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 9, fontWeight: 800 }}>{empresa.avatar}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text)' }}>{empresa.nome}</div>
                  <div style={{ marginLeft: 'auto', fontSize: 8, fontWeight: 700, color: 'var(--brand-green-dark)' }}>● aberto</div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text)', lineHeight: 1.2 }}>Quentinhas almoço — R$ 22,00</div>
                <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 2 }}>Marmita com 4 itens, retirada 11h</div>
                <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
                  <div style={{ flex: 1, background: 'var(--brand-green)', color: '#fff', fontSize: 9, fontWeight: 800, padding: '5px 8px', borderRadius: 6, textAlign: 'center' }}>WhatsApp</div>
                  <div style={{ background: 'var(--bg)', color: 'var(--text)', fontSize: 9, fontWeight: 800, padding: '5px 8px', borderRadius: 6 }}>Mapa</div>
                </div>
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 10, marginTop: 8, border: '1px solid var(--border)', display: 'flex', gap: 8, alignItems: 'center' }}>
              <div className="img-ph green" style={{ width: 42, height: 42, fontSize: 8, padding: 4 }}>bolo</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 800 }}>Bolo do dia 30% off</div>
                <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>Toda terça — até 14h</div>
              </div>
              <span style={{ fontSize: 8, fontWeight: 800, color: 'var(--brand-green-dark)', background: 'var(--brand-green-50)', padding: '3px 6px', borderRadius: 999 }}>-30%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- PROMO BAR ----------
function PromoBar({ nome, views, cliques, cor, categoria }) {
  const max = 2200;
  const pctV = (views / max) * 100;
  const pctC = (cliques / max) * 100;
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="tag-cat" style={{ background: `${cor}1a`, color: cor }}>{categoria}</span>
          <span style={{ fontSize: 13, fontWeight: 700 }}>{nome}</span>
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>
          <span style={{ color: 'var(--text)' }}>{views.toLocaleString('pt-BR')}</span> views ·{' '}
          <span style={{ color: 'var(--brand-green-dark)' }}>{cliques}</span> cliques
        </div>
      </div>
      <div style={{ position: 'relative', height: 8, borderRadius: 999, background: 'var(--bg-2)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, width: `${pctV}%`, background: cor, opacity: .35, borderRadius: 999 }}/>
        <div style={{ position: 'absolute', inset: 0, width: `${pctC}%`, background: cor, borderRadius: 999 }}/>
      </div>
    </div>
  );
}

// ---------- ACTIVITY ITEM ----------
function Activity({ icon, color, tint, title, time, detail }) {
  return (
    <div style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)', alignItems: 'flex-start' }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: tint, color, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
        <Icon d={icon} size={16} stroke={2.2}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{title}</div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{detail}</div>
      </div>
      <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-soft)', flexShrink: 0 }}>{time}</span>
    </div>
  );
}

// ---------- SHORTCUT ----------
function Shortcut({ icon, color, tint, label, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12,
      padding: '14px 12px', display: 'flex', alignItems: 'center', gap: 10,
      textAlign: 'left', cursor: 'pointer', transition: 'all .15s', width: '100%',
    }}
      onMouseEnter={(e)=>{ e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = 'var(--border-strong)'; }}
      onMouseLeave={(e)=>{ e.currentTarget.style.background = 'var(--bg)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
    >
      <div style={{ width: 34, height: 34, borderRadius: 10, background: tint, color, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
        <Icon d={icon} size={16} stroke={2.2}/>
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{label}</span>
      <Icon d={IC.chevRight} size={14} style={{ marginLeft: 'auto', color: 'var(--text-soft)' }}/>
    </button>
  );
}

// ---------- BAIRRO BAR ----------
function BairroBar({ nome, pct, qtd }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
        <span style={{ fontSize: 12, fontWeight: 700 }}>{nome}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>
          <b style={{ color: 'var(--text)' }}>{qtd}</b> · {pct}%
        </span>
      </div>
      <div className="bar-bg">
        <div className="bar-fill" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, var(--brand-blue), var(--brand-blue-light))' }}/>
      </div>
    </div>
  );
}

Object.assign(window, { DashboardScreen });
