/* global React, ReactDOM, window */
const { useState, useEffect } = React;
const {
  Icon, IC, CALogo,
  LoginScreen, DashboardScreen, PerfilScreen, HorariosScreen,
  PromocoesScreen, CuponsScreen, BannersScreen,
  VagasScreen, EventosScreen, JarvisScreen,
  DEMO,
  TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakToggle, TweakSelect,
} = window;

const NAV = [
  { id: 'dashboard',  label: 'Dashboard',    icon: IC.dashboard,  group: 'principal' },
  { id: 'perfil',     label: 'Perfil da empresa', icon: IC.building, group: 'principal' },
  { id: 'horarios',   label: 'Horário de funcionamento', icon: IC.clock, group: 'principal' },
  { id: 'promocoes',  label: 'Promoções',    icon: IC.tag,        group: 'marketing', badge: '4' },
  { id: 'cupons',     label: 'Cupons',       icon: IC.ticket,     group: 'marketing' },
  { id: 'banners',    label: 'Banners',      icon: IC.image,      group: 'marketing' },
  { id: 'vagas',      label: 'Vagas',        icon: IC.briefcase,  group: 'oportunidades', badge: '3', badgeKind: 'new' },
  { id: 'eventos',    label: 'Eventos & campanhas', icon: IC.calendar, group: 'oportunidades' },
  { id: 'jarvis',     label: 'Jarvis IA',    icon: IC.bot,        group: 'futuro', badge: 'beta', badgeKind: 'ia' },
];

const PAGE_META = {
  dashboard:  { t: 'Dashboard',                p: 'Visão geral da sua presença no app' },
  perfil:     { t: 'Perfil da empresa',        p: 'Informações que aparecem na ficha' },
  horarios:   { t: 'Horário de funcionamento', p: 'O app mostra automaticamente se está aberto' },
  promocoes:  { t: 'Promoções',                p: 'Crie e destaque ofertas em tempo real' },
  cupons:     { t: 'Cupons',                   p: 'Descontos resgatados direto pelo app' },
  banners:    { t: 'Banners',                  p: 'Imagens de campanha e institucional' },
  vagas:      { t: 'Vagas de emprego',         p: 'Publique e receba candidatos' },
  eventos:    { t: 'Eventos & campanhas',      p: 'Divulgue ações da sua empresa' },
  jarvis:     { t: 'Jarvis IA',                p: 'Sua copiloto comercial — em breve' },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "empresa": "padaria",
  "sidebarCollapsed": false,
  "density": "regular",
  "mostrarJarvis": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [logged, setLogged] = useState(true);
  const [page, setPage] = useState('dashboard');
  const [empresa, setEmpresa] = useState(DEMO.EMPRESAS[t.empresa] || DEMO.EMPRESAS.padaria);
  const [horarios, setHorarios] = useState(DEMO.HORARIOS_DEFAULT);
  const [promos, setPromos] = useState(DEMO.PROMOS_INI);
  const [cupons, setCupons] = useState(DEMO.CUPONS_INI);
  const [banners, setBanners] = useState(DEMO.BANNERS_INI);
  const [vagas, setVagas] = useState(DEMO.VAGAS_INI);
  const [eventos, setEventos] = useState(DEMO.EVENTOS_INI);
  const [notifOpen, setNotifOpen] = useState(false);

  // Sync empresa when tweak changes
  useEffect(() => {
    setEmpresa(DEMO.EMPRESAS[t.empresa] || DEMO.EMPRESAS.padaria);
  }, [t.empresa]);

  // Body density
  useEffect(() => {
    document.documentElement.setAttribute('data-density', t.density);
  }, [t.density]);

  if (!logged) {
    return <LoginScreen onLogin={()=>setLogged(true)}/>;
  }

  const meta = PAGE_META[page] || PAGE_META.dashboard;
  const groups = [
    { id: 'principal',     label: 'Empresa' },
    { id: 'marketing',     label: 'Marketing' },
    { id: 'oportunidades', label: 'Oportunidades' },
    { id: 'futuro',        label: 'Futuro' },
  ];
  const navFiltered = NAV.filter(n => t.mostrarJarvis || n.id !== 'jarvis');

  return (
    <div className="app" data-collapsed={t.sidebarCollapsed}>
      {/* SIDEBAR */}
      <aside className="sb">
        <div className="sb-logo">
          <CALogo size={40}/>
          <div className="sb-logo-text">
            <b>Cidade em Ação</b>
            <span>Painel Empresarial</span>
          </div>
        </div>

        <nav style={{ flex: 1, overflow: 'auto' }}>
          {groups.map(g => (
            <div key={g.id}>
              <div className="sb-section">{g.label}</div>
              <div className="sb-nav">
                {navFiltered.filter(n => n.group === g.id).map(n => (
                  <button key={n.id} className={`sb-item ${page === n.id ? 'active' : ''}`} onClick={()=>setPage(n.id)}>
                    <Icon d={n.icon} size={18} stroke={2.2}/>
                    <span>{n.label}</span>
                    {n.badge && <span className={`badge ${n.badgeKind || ''}`}>{n.badge}</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="sb-foot">
          <div className="sb-avatar" style={{ background: empresa.avatarColor }}>{empresa.avatar}</div>
          <div className="sb-user">
            <b>{empresa.nome}</b>
            <span>Plano Profissional</span>
          </div>
          <button className="btn sm ghost" style={{ padding: 6, marginLeft: 'auto' }} title="Sair" onClick={()=>setLogged(false)}>
            <Icon d={IC.logout} size={14}/>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ minWidth: 0 }}>
        {/* TOPBAR */}
        <header className="tb">
          <button className="tb-icon-btn" onClick={()=>setTweak('sidebarCollapsed', !t.sidebarCollapsed)} title="Recolher menu">
            <Icon d={IC.menu} size={18}/>
          </button>
          <div className="tb-title">
            <h1>{meta.t}</h1>
            <p>{meta.p}</p>
          </div>

          <div className="tb-search">
            <Icon d={IC.search} size={16}/>
            <input placeholder="Buscar promoções, vagas, banners…"/>
            <span className="kbd">⌘K</span>
          </div>

          <span className="tb-plan">
            <span className="chip">PRO</span>
            Renovação 08/11/2026
          </span>

          <div style={{ position: 'relative' }}>
            <button className="tb-icon-btn" onClick={()=>setNotifOpen(!notifOpen)}>
              <Icon d={IC.bell} size={18}/>
              <span className="dot"/>
            </button>
            {notifOpen && (
              <div className="card fade-in" style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: 340, padding: 0, zIndex: 50 }} onMouseLeave={()=>setNotifOpen(false)}>
                <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <b style={{ fontSize: 13 }}>Notificações</b>
                  <a href="#" onClick={(e)=>e.preventDefault()} style={{ fontSize: 11, color: 'var(--brand-blue)', fontWeight: 700 }}>Marcar como lidas</a>
                </div>
                {DEMO.NOTIFICACOES.map(n => (
                  <div key={n.id} style={{ padding: 14, borderBottom: '1px solid var(--border)', display: 'flex', gap: 10, alignItems: 'flex-start', background: n.lida ? 'transparent' : 'var(--brand-blue-50)' }}>
                    <div style={{ width: 8, height: 8, borderRadius: 50, marginTop: 6, background: n.lida ? 'transparent' : 'var(--brand-blue)' }}/>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.4 }}>{n.titulo}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>{n.tempo}</div>
                    </div>
                  </div>
                ))}
                <div style={{ padding: 12, textAlign: 'center' }}>
                  <a href="#" onClick={(e)=>e.preventDefault()} style={{ fontSize: 12, color: 'var(--brand-blue)', fontWeight: 700 }}>Ver todas</a>
                </div>
              </div>
            )}
          </div>
          <button className="tb-icon-btn"><Icon d={IC.help} size={18}/></button>
        </header>

        {/* PAGE */}
        <div className="main" key={page}>
          {page === 'dashboard' && <DashboardScreen empresa={empresa} go={setPage}/>}
          {page === 'perfil'    && <PerfilScreen empresa={empresa} setEmpresa={setEmpresa}/>}
          {page === 'horarios'  && <HorariosScreen horarios={horarios} setHorarios={setHorarios}/>}
          {page === 'promocoes' && <PromocoesScreen promos={promos} setPromos={setPromos} empresa={empresa}/>}
          {page === 'cupons'    && <CuponsScreen cupons={cupons} setCupons={setCupons}/>}
          {page === 'banners'   && <BannersScreen banners={banners} setBanners={setBanners}/>}
          {page === 'vagas'     && <VagasScreen vagas={vagas} setVagas={setVagas}/>}
          {page === 'eventos'   && <EventosScreen eventos={eventos} setEventos={setEventos}/>}
          {page === 'jarvis'    && <JarvisScreen empresa={empresa} go={setPage}/>}
        </div>
      </main>

      {/* TWEAKS PANEL */}
      <TweaksPanel>
        <TweakSection label="Empresa de exemplo"/>
        <TweakSelect
          label="Perfil"
          value={t.empresa}
          options={[
            { value: 'padaria',   label: 'Padaria São José' },
            { value: 'pizzaria',  label: 'Vesúvio Pizzaria' },
            { value: 'salao',     label: 'Studio Marina Hair' },
          ]}
          onChange={(v)=>setTweak('empresa', v)}
        />
        <TweakSection label="Layout"/>
        <TweakRadio
          label="Densidade"
          value={t.density}
          options={['compact', 'regular']}
          onChange={(v)=>setTweak('density', v)}
        />
        <TweakToggle
          label="Sidebar colapsada"
          value={t.sidebarCollapsed}
          onChange={(v)=>setTweak('sidebarCollapsed', v)}
        />
        <TweakSection label="Módulos"/>
        <TweakToggle
          label="Mostrar Jarvis IA"
          value={t.mostrarJarvis}
          onChange={(v)=>setTweak('mostrarJarvis', v)}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
