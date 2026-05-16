/* global React, window */
const { useState } = React;
const { Icon, IC, CALogo } = window;

// ---------- LOGIN ----------
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('contato@padariasaojose.com.br');
  const [senha, setSenha] = useState('••••••••');
  const [showSenha, setShowSenha] = useState(false);
  const [lembrar, setLembrar] = useState(true);
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 700);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1.1fr', background: 'var(--bg)' }}>
      {/* Left: form */}
      <div style={{ display: 'flex', flexDirection: 'column', padding: '40px 56px', minHeight: '100vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <CALogo size={42}/>
          <div>
            <b style={{ display: 'block', fontSize: 16, fontWeight: 800, letterSpacing: '-.3px' }}>Cidade em Ação</b>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '.4px', textTransform: 'uppercase' }}>Painel Empresarial</span>
          </div>
        </div>

        <div style={{ margin: 'auto 0', maxWidth: 420 }}>
          <div className="pill blue" style={{ marginBottom: 18 }}>
            <span className="dot"/> Acesso exclusivo para empresas parceiras
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-1.4px', lineHeight: 1.05, margin: '0 0 12px' }}>
            Sua empresa,<br/>no <em style={{ color: 'var(--brand-blue)', fontStyle: 'normal' }}>ar</em> da cidade.
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '0 0 28px', lineHeight: 1.55 }}>
            Gerencie promoções, banners, horários e vagas. Tudo atualiza no app Cidade em Ação em tempo real.
          </p>

          <form className="col" onSubmit={submit} style={{ gap: 16 }}>
            <div className="field">
              <label>E-mail empresarial</label>
              <div className="input-wrap">
                <Icon d={IC.mail} size={18}/>
                <input className="input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
              </div>
            </div>

            <div className="field">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <label>Senha</label>
                <a href="#" onClick={(e)=>e.preventDefault()} style={{ fontSize: 11, fontWeight: 700, color: 'var(--brand-blue)' }}>Esqueci minha senha</a>
              </div>
              <div className="input-wrap">
                <Icon d={IC.lock} size={18}/>
                <input className="input" type={showSenha ? 'text' : 'password'} value={senha} onChange={(e)=>setSenha(e.target.value)} required style={{ paddingRight: 42 }}/>
                <button type="button" onClick={()=>setShowSenha(!showSenha)} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 0, padding: 6, color: 'var(--text-soft)', cursor: 'pointer' }} aria-label="Mostrar senha">
                  <Icon d={IC.eye} size={16}/>
                </button>
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-muted)', cursor: 'pointer' }}>
              <span className="tgl" style={{ width: 34, height: 20 }}>
                <input type="checkbox" checked={lembrar} onChange={(e)=>setLembrar(e.target.checked)}/>
                <span className="slider"/>
              </span>
              Manter sessão neste dispositivo por 30 dias
            </label>

            <button className="btn primary lg" type="submit" disabled={loading} style={{ justifyContent: 'center', marginTop: 4 }}>
              {loading ? <span className="pulse">Entrando…</span> : <>Acessar painel <Icon d={IC.chevRight} size={16}/></>}
            </button>
          </form>

          <div style={{ marginTop: 28, padding: 16, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--brand-green-50)', color: 'var(--brand-green-dark)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              <Icon d={IC.shield} size={18}/>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.45 }}>
              Acesso seguro e individual por empresa.<br/>
              Não tem conta? <a href="#" style={{ color: 'var(--brand-blue)', fontWeight: 700 }} onClick={(e)=>e.preventDefault()}>Fale com seu consultor</a>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 18, fontSize: 11, color: 'var(--text-soft)', fontWeight: 600 }}>
          <span>© Cidade em Ação 2026</span>
          <span>•</span>
          <a href="#" onClick={(e)=>e.preventDefault()}>Termos</a>
          <a href="#" onClick={(e)=>e.preventDefault()}>Privacidade</a>
          <a href="#" onClick={(e)=>e.preventDefault()}>Suporte</a>
        </div>
      </div>

      {/* Right: visual */}
      <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, var(--brand-blue) 0%, var(--brand-blue-dark) 65%, #061f4e 100%)', minHeight: '100vh' }}>
        {/* Background pattern */}
        <svg width="100%" height="100%" viewBox="0 0 600 900" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, opacity: .25 }}>
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40V0M0 0H40" fill="none" stroke="#fff" strokeOpacity=".15"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
          <circle cx="120" cy="180" r="200" fill="var(--brand-green)" opacity=".18"/>
          <circle cx="500" cy="700" r="260" fill="var(--accent-orange)" opacity=".12"/>
        </svg>

        <div style={{ position: 'absolute', inset: 0, padding: '56px 56px 48px', color: '#fff', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
            <span style={{ padding: '5px 12px', borderRadius: 999, background: 'rgba(255,255,255,.14)', fontSize: 11, fontWeight: 700, letterSpacing: '.4px' }}>NOVO</span>
            <span style={{ padding: '5px 12px', borderRadius: 999, background: 'var(--brand-green)', fontSize: 11, fontWeight: 700, letterSpacing: '.4px' }}>JARVIS IA EM BREVE</span>
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-1px', lineHeight: 1.1, maxWidth: 460, margin: 0 }}>
            Tudo que sua empresa publica aparece no app da cidade em segundos.
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,.75)', maxWidth: 440, lineHeight: 1.55, margin: 0 }}>
            Promoções, cupons, banners, vagas e eventos. Cada atualização é sincronizada com milhares de moradores.
          </p>

          {/* Preview cards */}
          <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, maxWidth: 480 }}>
            <PreviewCard
              tag="VISUALIZAÇÕES"
              tagColor="var(--accent-orange)"
              value="14.2K"
              delta="+18%"
              label="esta semana"
            />
            <PreviewCard
              tag="WHATSAPP"
              tagColor="var(--brand-green)"
              value="1.847"
              delta="+24%"
              label="cliques no botão"
            />
            <PreviewCard
              tag="PROMOÇÕES"
              tagColor="var(--accent-pink)"
              value="4"
              delta="ativas"
              label="2 destacadas"
            />
            <PreviewCard
              tag="CUPONS"
              tagColor="var(--accent-purple)"
              value="540"
              delta="resgates"
              label="este mês"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewCard({ tag, tagColor, value, delta, label, offset = 0 }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 14, padding: '16px 18px',
      boxShadow: '0 20px 50px rgba(0,0,0,.25)',
      transform: `translateY(${offset}px)`,
    }}>
      <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '1px', color: tagColor }}>{tag}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
        <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', letterSpacing: '-1px', fontFamily: 'Nunito, sans-serif' }}>{value}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--brand-green-dark)' }}>{delta}</span>
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2, fontWeight: 600 }}>{label}</div>
    </div>
  );
}

Object.assign(window, { LoginScreen });
