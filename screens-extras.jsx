/* global React, window */
const { useState } = React;
const { Icon, IC, ImgPlaceholder } = window;

// ---------- VAGAS DE EMPREGO ----------
function VagasScreen({ vagas, setVagas }) {
  const [showModal, setShowModal] = useState(false);
  const totalCandidatos = vagas.reduce((s, v) => s + v.candidatos, 0);
  return (
    <div className="col">
      <div className="grid g-4">
        <MiniStat label="Vagas publicadas" value={vagas.length} icon={IC.briefcase} color="var(--accent-pink)" tint="#ffe0eb"/>
        <MiniStat label="Candidatos no total" value={totalCandidatos} icon={IC.bot} color="var(--brand-blue)" tint="var(--brand-blue-50)"/>
        <MiniStat label="Em análise" value={vagas.filter(v=>v.status==='em análise').length} icon={IC.clock} color="var(--accent-yellow)" tint="#fff4d6"/>
        <MiniStat label="Vagas abertas" value={vagas.filter(v=>v.status==='aberta').length} icon={IC.check} color="var(--brand-green-dark)" tint="var(--brand-green-50)"/>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
        <div className="card">
          <div className="card-head">
            <div><h3>Vagas publicadas</h3><p>Recebem candidaturas direto no app</p></div>
            <button className="btn primary" onClick={()=>setShowModal(true)}><Icon d={IC.plus} size={14}/> Nova vaga</button>
          </div>
          <div className="col" style={{ gap: 10 }}>
            {vagas.map(v => <VagaCard key={v.id} v={v}/>)}
          </div>
        </div>

        <div className="col">
          <div className="card">
            <div className="card-head"><div><h3>Candidatos recentes</h3><p>Aguardando triagem</p></div></div>
            <div className="col" style={{ gap: 0 }}>
              {[
                { n: 'Mariana Costa', vaga: 'Atendente de balcão', tempo: 'há 2h', exp: '3 anos · Padaria', avatar: 'MC', cor: 'linear-gradient(135deg, #7c5cff, #ff5a8a)' },
                { n: 'Renato Oliveira', vaga: 'Padeiro — Turno noturno', tempo: 'há 5h', exp: '8 anos · Forneiro', avatar: 'RO', cor: 'linear-gradient(135deg, #00A651, #20b8d4)' },
                { n: 'Letícia Andrade', vaga: 'Confeiteiro(a)', tempo: 'ontem', exp: 'Senac confeitaria', avatar: 'LA', cor: 'linear-gradient(135deg, #ff6b4a, #f5b400)' },
                { n: 'João Silva', vaga: 'Atendente de balcão', tempo: 'ontem', exp: 'Sem experiência', avatar: 'JS', cor: 'linear-gradient(135deg, #0B3C8C, #1f56b8)' },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 12, background: c.cor, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{c.avatar}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{c.n}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.vaga} · {c.exp}</div>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-soft)' }}>{c.tempo}</span>
                  <button className="btn sm" style={{ padding: '5px 9px' }}><Icon d={IC.chevRight} size={13}/></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && <NovaVagaModal onClose={()=>setShowModal(false)} onCreate={(v)=>{ setVagas([{ ...v, id: 'v'+Date.now(), candidatos: 0, status: 'aberta', publicada: new Date().toLocaleDateString('pt-BR') }, ...vagas]); setShowModal(false); }}/>}
    </div>
  );
}

function VagaCard({ v }) {
  const statusColor = v.status === 'aberta' ? 'green' : 'yellow';
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 14, padding: 16, background: '#fff', display: 'flex', gap: 14, alignItems: 'center' }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--brand-green-50)', color: 'var(--brand-green-dark)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
        <Icon d={IC.briefcase} size={20}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <h4 style={{ margin: 0, fontSize: 14, fontWeight: 800 }}>{v.cargo}</h4>
          <span className={`pill ${statusColor}`}><span className="dot"/> {v.status}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>
          <span><Icon d={IC.layers} size={11} style={{ display:'inline', verticalAlign:'text-bottom' }}/> {v.area}</span>
          <span>•</span>
          <span>{v.tipo}</span>
          <span>•</span>
          <span style={{ color: 'var(--text)' }}>{v.salario}</span>
          <span>•</span>
          <span>publicada {v.publicada}</span>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Requisitos: {v.requisitos}</div>
      </div>
      <div style={{ textAlign: 'center', padding: '0 16px', borderLeft: '1px solid var(--border)' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--brand-blue)', lineHeight: 1, fontFamily: 'Nunito, sans-serif' }}>{v.candidatos}</div>
        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '.4px', marginTop: 2 }}>CANDIDATOS</div>
      </div>
      <button className="btn sm"><Icon d={IC.eye} size={13}/> Ver</button>
    </div>
  );
}

function NovaVagaModal({ onClose, onCreate }) {
  const [form, setForm] = useState({ cargo: '', area: 'Atendimento', tipo: 'CLT', salario: '', requisitos: '' });
  const submit = (e) => { e.preventDefault(); onCreate(form); };
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(14,21,48,.55)', display: 'grid', placeItems: 'center', zIndex: 100, padding: 24 }} onClick={onClose}>
      <div className="card fade-in" style={{ width: 520, padding: 0 }} onClick={(e)=>e.stopPropagation()}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Publicar nova vaga</h3>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--text-muted)' }}>A vaga será listada no módulo de empregos do app</p>
        </div>
        <form onSubmit={submit} className="col" style={{ padding: 24 }}>
          <div className="field"><label>Cargo</label><input className="input" required value={form.cargo} onChange={(e)=>setForm({...form, cargo: e.target.value})} placeholder="Ex: Atendente de balcão"/></div>
          <div className="grid g-2">
            <div className="field"><label>Área</label>
              <select className="select" value={form.area} onChange={(e)=>setForm({...form, area: e.target.value})}>
                <option>Atendimento</option><option>Produção</option><option>Confeitaria</option><option>Administrativo</option>
              </select>
            </div>
            <div className="field"><label>Tipo de contrato</label>
              <select className="select" value={form.tipo} onChange={(e)=>setForm({...form, tipo: e.target.value})}>
                <option>CLT</option><option>PJ</option><option>Temporário</option><option>Estágio</option>
              </select>
            </div>
          </div>
          <div className="field"><label>Salário e benefícios</label><input className="input" required value={form.salario} onChange={(e)=>setForm({...form, salario: e.target.value})} placeholder="R$ 0.000 + benefícios"/></div>
          <div className="field"><label>Requisitos</label><textarea className="textarea" required value={form.requisitos} onChange={(e)=>setForm({...form, requisitos: e.target.value})}/></div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
            <button type="button" className="btn ghost" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn primary"><Icon d={IC.send} size={14}/> Publicar vaga</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------- EVENTOS E CAMPANHAS ----------
function EventosScreen({ eventos, setEventos }) {
  return (
    <div className="col">
      <div className="grid g-4">
        <MiniStat label="Eventos confirmados" value={eventos.filter(e=>e.status==='confirmado').length} icon={IC.calendar} color="var(--accent-orange)" tint="#ffe9e2"/>
        <MiniStat label="Rascunhos" value={eventos.filter(e=>e.status==='rascunho').length} icon={IC.edit} color="var(--text-soft)" tint="var(--bg)"/>
        <MiniStat label="Total de interessados" value={eventos.reduce((s,e)=>s+e.interesse,0)} icon={IC.star} color="var(--accent-yellow)" tint="#fff4d6"/>
        <MiniStat label="Maior evento" value="540" icon={IC.flame} color="var(--accent-pink)" tint="#ffe0eb"/>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
        <div className="card">
          <div className="card-head">
            <div><h3>Eventos e campanhas</h3><p>Divulgação no app e na agenda da cidade</p></div>
            <button className="btn primary"><Icon d={IC.plus} size={14}/> Novo evento</button>
          </div>
          <div className="col" style={{ gap: 12 }}>
            {eventos.map(e => <EventoCard key={e.id} e={e}/>)}
          </div>
        </div>

        <div className="card">
          <div className="card-head"><div><h3>Calendário de maio</h3><p>Visão geral dos eventos</p></div></div>
          <Calendar/>
          <hr className="divider"/>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.5px', color: 'var(--text-soft)', textTransform: 'uppercase', marginBottom: 8 }}>Próximos 14 dias</div>
          <div className="col" style={{ gap: 8 }}>
            {[
              { dia: '17', mes: 'MAI', titulo: 'Aula aberta — café espresso', tipo: 'Workshop', cor: 'var(--accent-purple)' },
              { dia: '24', mes: 'MAI', titulo: 'Festival do Café Especial', tipo: 'Evento', cor: 'var(--accent-orange)' },
              { dia: '28', mes: 'MAI', titulo: 'Anúncio: campanha sourdough', tipo: 'Campanha', cor: 'var(--brand-blue)' },
            ].map((e, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: 'var(--bg)', borderRadius: 10 }}>
                <div style={{ width: 38, textAlign: 'center', background: `${e.cor}1a`, color: e.cor, borderRadius: 6, padding: '5px 0' }}>
                  <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.5px' }}>{e.mes}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, lineHeight: 1 }}>{e.dia}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{e.titulo}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{e.tipo}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EventoCard({ e }) {
  const [dia, mes] = e.data.split('/');
  const mesNome = { '01':'JAN','02':'FEV','03':'MAR','04':'ABR','05':'MAI','06':'JUN','07':'JUL','08':'AGO','09':'SET','10':'OUT','11':'NOV','12':'DEZ' }[mes];
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 14, padding: 16, background: '#fff', display: 'flex', gap: 14, alignItems: 'center' }}>
      <div style={{ width: 62, padding: '10px 0', background: `${e.cor}1a`, color: e.cor, borderRadius: 12, textAlign: 'center', flexShrink: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.5px', lineHeight: 1 }}>{mesNome}</div>
        <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1, marginTop: 4, letterSpacing: '-1px' }}>{dia}</div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <h4 style={{ margin: 0, fontSize: 14, fontWeight: 800 }}>{e.titulo}</h4>
          <span className={`pill ${e.status==='confirmado' ? 'green' : ''}`}><span className="dot"/> {e.status}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>
          <span style={{ background: `${e.cor}1a`, color: e.cor, padding: '2px 8px', borderRadius: 5, fontWeight: 700 }}>{e.tipo}</span>
          <span><Icon d={IC.clock} size={11} style={{display:'inline', verticalAlign:'text-bottom'}}/> {e.hora}</span>
          <span><Icon d={IC.pin} size={11} style={{display:'inline', verticalAlign:'text-bottom'}}/> {e.local}</span>
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '0 16px', borderLeft: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--accent-yellow)' }}>
          <Icon d={IC.star} size={14} fill="currentColor" stroke={0}/>
          <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'Nunito, sans-serif' }}>{e.interesse}</span>
        </div>
        <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '.4px', marginTop: 2 }}>INTERESSADOS</div>
      </div>
      <button className="btn sm ghost"><Icon d={IC.more} size={14}/></button>
    </div>
  );
}

function Calendar() {
  const days = Array.from({length: 31}, (_, i) => i + 1);
  const evts = { 7: 'purple', 11: 'pink', 17: 'purple', 24: 'orange', 28: 'blue' };
  const today = 15;
  return (
    <div style={{ background: 'var(--bg)', borderRadius: 12, padding: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <button className="btn sm ghost" style={{ padding: '4px 6px' }}><Icon d={IC.chevLeft} size={14}/></button>
        <div style={{ fontSize: 13, fontWeight: 800 }}>Maio 2026</div>
        <button className="btn sm ghost" style={{ padding: '4px 6px' }}><Icon d={IC.chevRight} size={14}/></button>
      </div>
      <div className="grid g-7" style={{ gap: 4, marginBottom: 4 }}>
        {['D','S','T','Q','Q','S','S'].map((d, i) => (
          <div key={i} style={{ textAlign: 'center', fontSize: 10, fontWeight: 800, color: 'var(--text-soft)', letterSpacing: '.5px' }}>{d}</div>
        ))}
      </div>
      <div className="grid g-7" style={{ gap: 4 }}>
        {Array.from({length: 5}).map((_, i) => <div key={'b'+i}/>)}
        {days.map(d => {
          const evt = evts[d];
          const isToday = d === today;
          const colors = { orange: 'var(--accent-orange)', purple: 'var(--accent-purple)', pink: 'var(--accent-pink)', blue: 'var(--brand-blue)' };
          return (
            <div key={d} style={{
              aspectRatio: '1/1', borderRadius: 8, display: 'grid', placeItems: 'center', position: 'relative',
              background: isToday ? 'var(--brand-blue)' : evt ? `${colors[evt]}1a` : 'transparent',
              color: isToday ? '#fff' : evt ? colors[evt] : 'var(--text-muted)',
              fontSize: 11, fontWeight: isToday || evt ? 800 : 600, cursor: 'pointer',
            }}>
              {d}
              {evt && !isToday && <div style={{ position: 'absolute', bottom: 2, width: 4, height: 4, borderRadius: 50, background: colors[evt] }}/>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- JARVIS IA (FUTURO) ----------
function JarvisScreen({ empresa, go }) {
  const [chatInput, setChatInput] = useState('');
  const [messages] = useState([
    { who: 'ia', text: 'Olá! Eu sou o Jarvis, sua IA do Cidade em Ação. Posso analisar a performance da sua empresa, sugerir promoções e responder dúvidas. O que vamos fazer hoje?' },
    { who: 'me', text: 'Por que minhas quentinhas estão indo tão bem?' },
    { who: 'ia', text: '“Quentinhas almoço” lidera com 2.104 visualizações e 612 cliques (29% de conversão — alto). Três motivos detectados:\n\n• Concentração de buscas por “almoço Boa Viagem” entre 10h e 11h30\n• Foto vertical (acima da média no app)\n• Preço com âncora visível (“R$ 22”)\n\nQuer que eu replique a fórmula em uma promoção para o jantar?' },
  ]);

  return (
    <div className="col">
      {/* HERO */}
      <div style={{
        background: 'linear-gradient(120deg, #1a1145 0%, #5739d8 50%, #c93474 100%)',
        borderRadius: 'var(--radius-xl)', padding: 32, color: '#fff', position: 'relative', overflow: 'hidden',
      }}>
        <svg style={{ position: 'absolute', right: -60, top: -60, opacity: .25 }} width="320" height="320" viewBox="0 0 320 320">
          {Array.from({length: 12}).map((_, i) => (
            <circle key={i} cx="160" cy="160" r={20 + i*12} fill="none" stroke="#fff" strokeOpacity="0.4" strokeDasharray="2 4"/>
          ))}
        </svg>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, position: 'relative' }}>
          <div style={{ width: 72, height: 72, borderRadius: 22, background: 'rgba(255,255,255,.16)', display: 'grid', placeItems: 'center', backdropFilter: 'blur(20px)', flexShrink: 0 }}>
            <Icon d={IC.bot} size={36}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <span style={{ padding: '4px 10px', borderRadius: 999, background: 'rgba(255,255,255,.18)', fontSize: 10, fontWeight: 800, letterSpacing: '1px' }}>EM BREVE · BETA FECHADO</span>
              <span style={{ padding: '4px 10px', borderRadius: 999, background: 'var(--brand-green)', fontSize: 10, fontWeight: 800, letterSpacing: '1px' }}>RESERVA SUA VAGA</span>
            </div>
            <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800, letterSpacing: '-1px' }}>Jarvis IA — sua copiloto comercial</h2>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: 'rgba(255,255,255,.8)', maxWidth: 560, lineHeight: 1.5 }}>
              Recomendações inteligentes, sugestões personalizadas e destaque automático conforme relevância. A evolução natural do Cidade em Ação para um marketplace urbano.
            </p>
          </div>
          <button className="btn lg" style={{ background: '#fff', color: '#5739d8', borderColor: 'transparent', alignSelf: 'flex-start' }}>
            <Icon d={IC.rocket} size={14}/> Entrar no beta
          </button>
        </div>
      </div>

      {/* Capabilities */}
      <div className="grid g-3">
        <Capability icon={IC.zap} color="var(--accent-yellow)" tint="#fff4d6"
          titulo="Recomendações inteligentes"
          desc="Sugestões de horários, preços e categorias com base no comportamento real dos usuários do app."/>
        <Capability icon={IC.spark} color="var(--accent-purple)" tint="#ede8ff"
          titulo="Sugestões personalizadas"
          desc="Conteúdo, banners e cupons gerados de acordo com o perfil da sua empresa e dos clientes."/>
        <Capability icon={IC.trophy} color="var(--accent-orange)" tint="#ffe9e2"
          titulo="Destaque automático"
          desc="Sua promoção sobe sozinha no app quando o Jarvis detecta janelas de alta conversão."/>
      </div>

      {/* Chat preview */}
      <div className="grid" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: '16px 22px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-pink))', color: '#fff', display: 'grid', placeItems: 'center' }}>
              <Icon d={IC.bot} size={16}/>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800 }}>Conversa com Jarvis · pré-visualização</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Demo · respostas baseadas nos seus dados reais</div>
            </div>
            <span className="pill purple" style={{ marginLeft: 'auto' }}>preview</span>
          </div>
          <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 14, minHeight: 360, maxHeight: 460, overflow: 'auto' }}>
            {messages.map((m, i) => <Message key={i} m={m}/>)}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
              {['Sim, gerar promoção para o jantar', 'Analisar minha semana', 'Sugerir um cupom novo'].map((s, i) => (
                <button key={i} className="pill purple" style={{ cursor: 'pointer', padding: '6px 12px', fontSize: 12 }}>{s}</button>
              ))}
            </div>
          </div>
          <div style={{ padding: 14, borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
            <input className="input" value={chatInput} onChange={(e)=>setChatInput(e.target.value)} placeholder="Pergunte algo sobre sua empresa…" style={{ flex: 1 }}/>
            <button className="btn primary" disabled><Icon d={IC.send} size={14}/></button>
          </div>
        </div>

        <div className="col">
          <div className="card">
            <div className="card-head">
              <div><h3>Roadmap Jarvis</h3><p>O que vem por aí</p></div>
            </div>
            <div className="col" style={{ gap: 0 }}>
              <Roadmap fase="Em produção" data="Jun 2026" titulo="Análise de performance" desc="Resumos semanais automáticos por e-mail e no painel" status="ativo"/>
              <Roadmap fase="Beta fechado" data="Jul 2026" titulo="Sugestões de promoções" desc="Crie promoções com 1 clique a partir de templates" status="beta"/>
              <Roadmap fase="Em design" data="Set 2026" titulo="Destaque automático" desc="Seus posts sobem sozinhos nos horários certos" status="design"/>
              <Roadmap fase="Pesquisa" data="Q4 2026" titulo="Marketplace urbano" desc="Vender direto no app com checkout integrado" status="pesquisa" last/>
            </div>
          </div>
          <div className="card" style={{ background: 'linear-gradient(135deg, #fff, #fff4d6)', borderColor: 'rgba(245,180,0,.3)' }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--accent-yellow)', color: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <Icon d={IC.zap} size={18}/>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800 }}>Você é parceira fundadora</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.45 }}>
                  Parceiros fundadores entram no beta antes da fila pública. Sua vaga está reservada para julho.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Message({ m }) {
  const isMe = m.who === 'me';
  return (
    <div style={{ display: 'flex', gap: 10, justifyContent: isMe ? 'flex-end' : 'flex-start', alignItems: 'flex-end' }}>
      {!isMe && <div style={{ width: 28, height: 28, borderRadius: 9, background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-pink))', color: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0 }}><Icon d={IC.bot} size={14}/></div>}
      <div style={{
        maxWidth: '78%', padding: '12px 14px', borderRadius: 14,
        background: isMe ? 'var(--brand-blue)' : 'var(--bg)',
        color: isMe ? '#fff' : 'var(--text)',
        fontSize: 13, lineHeight: 1.5, whiteSpace: 'pre-line',
        borderBottomRightRadius: isMe ? 4 : 14,
        borderBottomLeftRadius: isMe ? 14 : 4,
      }}>{m.text}</div>
    </div>
  );
}

function Capability({ icon, color, tint, titulo, desc }) {
  return (
    <div className="card">
      <div style={{ width: 44, height: 44, borderRadius: 12, background: tint, color, display: 'grid', placeItems: 'center', marginBottom: 12 }}>
        <Icon d={icon} size={22}/>
      </div>
      <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, letterSpacing: '-.2px' }}>{titulo}</h4>
      <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{desc}</p>
    </div>
  );
}

function Roadmap({ fase, data, titulo, desc, status, last }) {
  const colors = { ativo: 'var(--brand-green)', beta: 'var(--accent-purple)', design: 'var(--accent-orange)', pesquisa: 'var(--text-soft)' };
  return (
    <div style={{ display: 'flex', gap: 14, paddingBottom: last ? 0 : 14, position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ width: 12, height: 12, borderRadius: 50, background: colors[status], boxShadow: `0 0 0 4px ${colors[status]}22`, marginTop: 4 }}/>
        {!last && <div style={{ flex: 1, width: 2, background: 'var(--border)', marginTop: 4 }}/>}
      </div>
      <div style={{ flex: 1, paddingBottom: last ? 0 : 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: colors[status], letterSpacing: '.5px', textTransform: 'uppercase' }}>{fase}</span>
          <span style={{ fontSize: 10, color: 'var(--text-soft)' }}>· {data}</span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 800 }}>{titulo}</div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{desc}</div>
      </div>
    </div>
  );
}

// helper from screens-marketing isn't shared — reuse local
function MiniStat({ label, value, icon, color, tint }) {
  return (
    <div className="card" style={{ padding: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, background: tint, color, display: 'grid', placeItems: 'center' }}>
          <Icon d={icon} size={18} stroke={2.2}/>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '.3px', textTransform: 'uppercase' }}>{label}</div>
          <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'Nunito, sans-serif', letterSpacing: '-.5px' }}>{value}</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { VagasScreen, EventosScreen, JarvisScreen });
