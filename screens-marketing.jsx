/* global React, window */
const { useState } = React;
const { Icon, IC, ImgPlaceholder } = window;

// ---------- PROMOÇÕES ----------
function PromocoesScreen({ promos, setPromos, empresa }) {
  const [filtro, setFiltro] = useState('todas');
  const [showModal, setShowModal] = useState(false);

  const totalViews = promos.reduce((s,p) => s + p.views, 0);
  const totalCliques = promos.reduce((s,p) => s + p.cliques, 0);

  const filtered = promos.filter(p => filtro === 'todas' ? true : filtro === 'destaque' ? p.destaque : p.status === filtro);

  return (
    <div className="col">
      {/* mini stats */}
      <div className="grid g-4">
        <MiniStat label="Promoções ativas" value={promos.filter(p=>p.status==='ativa').length} icon={IC.tag} color="var(--accent-orange)" tint="#ffe9e2"/>
        <MiniStat label="Em destaque" value={promos.filter(p=>p.destaque).length} icon={IC.star} color="var(--accent-yellow)" tint="#fff4d6"/>
        <MiniStat label="Visualizações" value={totalViews.toLocaleString('pt-BR')} icon={IC.eye} color="var(--brand-blue)" tint="var(--brand-blue-50)"/>
        <MiniStat label="Cliques no WhatsApp" value={totalCliques.toLocaleString('pt-BR')} icon={IC.whatsapp} color="var(--brand-green-dark)" tint="var(--brand-green-50)"/>
      </div>

      <div className="card">
        <div className="card-head">
          <div><h3>Suas promoções</h3><p>Crie, destaque e acompanhe a performance</p></div>
          <div className="row" style={{ gap: 8 }}>
            <div style={{ display: 'flex', gap: 4, padding: 3, background: 'var(--bg)', borderRadius: 10 }}>
              {[['todas','Todas'],['ativa','Ativas'],['destaque','Em destaque']].map(([id, lb]) => (
                <button key={id} onClick={()=>setFiltro(id)} style={{
                  padding: '6px 12px', border: 0, background: filtro===id ? '#fff':'transparent',
                  borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  color: filtro===id ? 'var(--text)':'var(--text-muted)',
                  boxShadow: filtro===id ? 'var(--shadow-sm)' : 'none',
                }}>{lb}</button>
              ))}
            </div>
            <button className="btn primary" onClick={()=>setShowModal(true)}><Icon d={IC.plus} size={14}/> Nova promoção</button>
          </div>
        </div>

        <div className="grid g-2">
          {filtered.map(p => <PromoCard key={p.id} p={p} setPromos={setPromos} promos={promos}/>)}
          <button onClick={()=>setShowModal(true)} style={{
            border: '2px dashed var(--border)', borderRadius: 16, padding: 22,
            background: 'transparent', cursor: 'pointer', minHeight: 200,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
            color: 'var(--text-muted)',
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--brand-blue-50)', color: 'var(--brand-blue)', display: 'grid', placeItems: 'center' }}>
              <Icon d={IC.plus} size={20} stroke={2.4}/>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Criar nova promoção</div>
            <div style={{ fontSize: 11 }}>Envio automático para o app</div>
          </button>
        </div>
      </div>

      {showModal && <NovaPromoModal onClose={()=>setShowModal(false)} onCreate={(p)=>{ setPromos([{ ...p, id: 'p' + Date.now(), views: 0, cliques: 0, status: 'ativa' }, ...promos]); setShowModal(false); }}/>}
    </div>
  );
}

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

function PromoCard({ p, promos, setPromos }) {
  const toggle = () => setPromos(promos.map(x => x.id === p.id ? { ...x, destaque: !x.destaque } : x));
  return (
    <div style={{
      border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', background: '#fff',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ position: 'relative' }}>
        <ImgPlaceholder label={p.img} variant={p.cor} style={{ aspectRatio: '16/9', borderRadius: 0, border: 0 }}/>
        {p.destaque && <span style={{ position: 'absolute', top: 10, left: 10, padding: '4px 10px', background: 'var(--accent-yellow)', color: '#5a4100', borderRadius: 999, fontSize: 10, fontWeight: 800, letterSpacing: '.5px', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <Icon d={IC.star} size={10} stroke={0} fill="currentColor"/> DESTAQUE
        </span>}
        <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 5 }}>
          <button className="btn sm" style={{ padding: '5px 7px', background: 'rgba(255,255,255,.94)', borderColor: 'transparent' }}><Icon d={IC.edit} size={13}/></button>
          <button className="btn sm" style={{ padding: '5px 7px', background: 'rgba(255,255,255,.94)', borderColor: 'transparent' }}><Icon d={IC.more} size={13}/></button>
        </div>
      </div>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span className={`pill ${p.cor}`}>{p.categoria}</span>
            <h4 style={{ margin: '8px 0 4px', fontSize: 15, fontWeight: 800, letterSpacing: '-.2px' }}>{p.titulo}</h4>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.45 }}>{p.desc}</p>
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--brand-blue)', fontFamily: 'Nunito, sans-serif', whiteSpace: 'nowrap', letterSpacing: '-.5px' }}>{p.preco}</div>
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 10, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>
            <Icon d={IC.eye} size={12}/> {p.views.toLocaleString('pt-BR')}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 700, color: 'var(--brand-green-dark)' }}>
            <Icon d={IC.whatsapp} size={12}/> {p.cliques}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginLeft: 'auto' }}>
            <Icon d={IC.clock} size={12}/> até {p.validade}
          </div>
          <button onClick={toggle} aria-label="destaque" style={{ padding: 5, background: 'none', border: 0, cursor: 'pointer', color: p.destaque ? 'var(--accent-yellow)' : 'var(--text-soft)' }}>
            <Icon d={IC.star} size={16} fill={p.destaque ? 'currentColor' : 'none'} stroke={2}/>
          </button>
        </div>
      </div>
    </div>
  );
}

function NovaPromoModal({ onClose, onCreate }) {
  const [form, setForm] = useState({ titulo: '', desc: '', preco: '', categoria: 'Combo', validade: '', destaque: false, cor: 'orange', img: 'sua promoção' });
  const submit = (e) => { e.preventDefault(); onCreate(form); };
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(14,21,48,.55)', display: 'grid', placeItems: 'center', zIndex: 100, padding: 24 }} onClick={onClose}>
      <div className="card fade-in" style={{ width: 560, maxWidth: '100%', maxHeight: '90vh', overflow: 'auto', padding: 0 }} onClick={(e)=>e.stopPropagation()}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Nova promoção</h3>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--text-muted)' }}>Enviada automaticamente para o app Cidade em Ação</p>
          </div>
          <button className="btn sm ghost" onClick={onClose}><Icon d={IC.x} size={16}/></button>
        </div>
        <form onSubmit={submit} className="col" style={{ padding: 24 }}>
          <div className="field"><label>Título</label><input className="input" required value={form.titulo} onChange={(e)=>setForm({...form, titulo: e.target.value})} placeholder="Ex: Combo café manhã"/></div>
          <div className="field"><label>Descrição</label><textarea className="textarea" required value={form.desc} onChange={(e)=>setForm({...form, desc: e.target.value})} placeholder="O que o cliente recebe?"/></div>
          <div className="grid g-2">
            <div className="field"><label>Preço promocional</label><input className="input" required value={form.preco} onChange={(e)=>setForm({...form, preco: e.target.value})} placeholder="R$ 0,00"/></div>
            <div className="field"><label>Validade</label><input className="input" type="date" required value={form.validade} onChange={(e)=>setForm({...form, validade: e.target.value})}/></div>
          </div>
          <div className="grid g-2">
            <div className="field"><label>Categoria</label>
              <select className="select" value={form.categoria} onChange={(e)=>setForm({...form, categoria: e.target.value})}>
                <option>Combo</option><option>Desconto</option><option>Almoço</option><option>Sazonal</option>
              </select>
            </div>
            <div className="field"><label>Cor da etiqueta</label>
              <div style={{ display: 'flex', gap: 6 }}>
                {[['orange','#ff6b4a'],['green','#00A651'],['purple','#7c5cff'],['pink','#ff5a8a'],['blue','#0B3C8C']].map(([id, c]) => (
                  <button type="button" key={id} onClick={()=>setForm({...form, cor: id})} style={{
                    width: 34, height: 34, borderRadius: 10, background: c, border: 0, cursor: 'pointer',
                    outline: form.cor === id ? '3px solid #fff' : 'none',
                    boxShadow: form.cor === id ? `0 0 0 5px ${c}` : 'none',
                  }}/>
                ))}
              </div>
            </div>
          </div>
          <div className="field"><label>Imagem promocional</label>
            <div style={{ border: '2px dashed var(--border)', borderRadius: 12, padding: 24, textAlign: 'center', background: 'var(--bg)' }}>
              <Icon d={IC.upload} size={20}/>
              <div style={{ fontSize: 13, fontWeight: 700, marginTop: 6 }}>Arraste uma imagem ou clique para enviar</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>PNG ou JPG · 16:9 · até 4MB</div>
            </div>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12, background: 'var(--bg)', borderRadius: 10, cursor: 'pointer' }}>
            <span className="tgl"><input type="checkbox" checked={form.destaque} onChange={(e)=>setForm({...form, destaque: e.target.checked})}/><span className="slider"/></span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Marcar como destaque</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Aparece no topo das listagens com selo dourado</div>
            </div>
          </label>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
            <button type="button" className="btn ghost" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn primary"><Icon d={IC.send} size={14}/> Publicar no app</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------- CUPONS ----------
function CuponsScreen({ cupons, setCupons }) {
  const [tab, setTab] = useState('todos');
  const filtered = cupons.filter(c => tab === 'todos' ? true : c.status === tab);

  return (
    <div className="col">
      <div className="grid g-4">
        <MiniStat label="Cupons ativos" value={cupons.filter(c=>c.status==='ativo').length} icon={IC.ticket} color="var(--accent-purple)" tint="#ede8ff"/>
        <MiniStat label="Resgates este mês" value={cupons.reduce((s,c)=>s+c.usados,0)} icon={IC.check} color="var(--brand-green-dark)" tint="var(--brand-green-50)"/>
        <MiniStat label="Em circulação" value={cupons.reduce((s,c)=>s+(c.limite-c.usados),0)} icon={IC.send} color="var(--brand-blue)" tint="var(--brand-blue-50)"/>
        <MiniStat label="Esgotados" value={cupons.filter(c=>c.status==='esgotado').length} icon={IC.flame} color="var(--accent-orange)" tint="#ffe9e2"/>
      </div>

      <div className="card">
        <div className="card-head">
          <div><h3>Cupons de desconto</h3><p>Códigos que clientes resgatam no app</p></div>
          <div className="row" style={{ gap: 8 }}>
            <div style={{ display: 'flex', gap: 4, padding: 3, background: 'var(--bg)', borderRadius: 10 }}>
              {[['todos','Todos'],['ativo','Ativos'],['esgotado','Esgotados']].map(([id, lb]) => (
                <button key={id} onClick={()=>setTab(id)} style={{
                  padding: '6px 12px', border: 0, background: tab===id ? '#fff':'transparent',
                  borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  color: tab===id ? 'var(--text)':'var(--text-muted)',
                  boxShadow: tab===id ? 'var(--shadow-sm)' : 'none',
                }}>{lb}</button>
              ))}
            </div>
            <button className="btn primary"><Icon d={IC.plus} size={14}/> Criar cupom</button>
          </div>
        </div>

        <div className="grid g-2">
          {filtered.map(c => <CupomCard key={c.id} c={c}/>)}
        </div>
      </div>
    </div>
  );
}

function CupomCard({ c }) {
  const pct = (c.usados / c.limite) * 100;
  const esgotado = c.status === 'esgotado';
  return (
    <div style={{
      display: 'flex', alignItems: 'stretch',
      background: '#fff', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden',
      opacity: esgotado ? .7 : 1,
    }}>
      {/* left: code tile */}
      <div style={{
        width: 130, padding: '20px 18px',
        background: `linear-gradient(135deg, var(--accent-purple), #5739d8)`,
        color: '#fff', position: 'relative',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '1.2px', opacity: .8 }}>CUPOM</div>
        <div>
          <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-1px', lineHeight: 1, fontFamily: 'Nunito, sans-serif' }}>
            {c.tipo === '%' ? `${c.valor}%` : `R$${c.valor}`}
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, opacity: .85, marginTop: 4 }}>OFF</div>
        </div>
        {/* notch */}
        <div style={{ position: 'absolute', top: '50%', right: -8, width: 16, height: 16, background: '#fff', borderRadius: '50%', transform: 'translateY(-50%)' }}/>
        <div style={{ position: 'absolute', top: '50%', left: -8, width: 16, height: 16, background: 'var(--bg)', borderRadius: '50%', transform: 'translateY(-50%)' }}/>
      </div>

      <div style={{ flex: 1, padding: 18, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="mono" style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', letterSpacing: '.5px', background: 'var(--bg)', padding: '5px 10px', borderRadius: 7 }}>
            {c.codigo}
          </div>
          <button className="btn sm ghost" style={{ padding: '5px 7px' }}><Icon d={IC.copy} size={13}/></button>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.4, fontWeight: 600 }}>{c.descricao}</div>

        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 5 }}>
            <span><b style={{ color: 'var(--text)' }}>{c.usados}</b> de {c.limite} resgatados</span>
            <span><Icon d={IC.clock} size={11} style={{ display: 'inline', verticalAlign: 'text-bottom' }}/> {c.validade}</span>
          </div>
          <div className="bar-bg">
            <div className="bar-fill" style={{ width: `${pct}%`, background: esgotado ? 'var(--accent-orange)' : 'var(--accent-purple)' }}/>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- BANNERS ----------
function BannersScreen({ banners, setBanners }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="col">
      <div className="grid g-4">
        <MiniStat label="Banners publicados" value={banners.filter(b=>b.status==='publicado').length} icon={IC.image} color="var(--brand-blue)" tint="var(--brand-blue-50)"/>
        <MiniStat label="Agendados" value={banners.filter(b=>b.status==='agendado').length} icon={IC.clock} color="var(--accent-purple)" tint="#ede8ff"/>
        <MiniStat label="Em rascunho" value={banners.filter(b=>b.status==='rascunho').length} icon={IC.edit} color="var(--text-soft)" tint="var(--bg)"/>
        <MiniStat label="Alcance total" value={banners.reduce((s,b)=>s+b.alcance,0).toLocaleString('pt-BR')} icon={IC.eye} color="var(--brand-green-dark)" tint="var(--brand-green-50)"/>
      </div>

      <div className="card">
        <div className="card-head">
          <div><h3>Banners comerciais</h3><p>Campanhas, promoções e institucionais</p></div>
          <button className="btn primary" onClick={()=>setShowModal(true)}><Icon d={IC.upload} size={14}/> Subir banner</button>
        </div>

        <div className="grid g-3">
          {banners.map(b => <BannerCard key={b.id} b={b}/>)}
          <button onClick={()=>setShowModal(true)} style={{
            border: '2px dashed var(--border)', borderRadius: 16, padding: 22,
            background: 'transparent', cursor: 'pointer', minHeight: 280,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'var(--text-muted)',
          }}>
            <div style={{ width: 50, height: 50, borderRadius: 14, background: 'var(--brand-blue-50)', color: 'var(--brand-blue)', display: 'grid', placeItems: 'center' }}>
              <Icon d={IC.upload} size={22}/>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Subir novo banner</div>
            <div style={{ fontSize: 11 }}>16:9 ou 3:1 · até 6MB</div>
          </button>
        </div>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(14,21,48,.55)', display: 'grid', placeItems: 'center', zIndex: 100 }} onClick={()=>setShowModal(false)}>
          <div className="card fade-in" style={{ width: 460, padding: 26 }} onClick={(e)=>e.stopPropagation()}>
            <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 800 }}>Subir banner</h3>
            <div style={{ border: '2px dashed var(--border)', borderRadius: 12, padding: 36, textAlign: 'center', background: 'var(--bg)' }}>
              <Icon d={IC.upload} size={24}/>
              <div style={{ fontSize: 13, fontWeight: 700, marginTop: 8 }}>Arraste o banner aqui</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>1920×640 ou 1920×1080 · até 6MB</div>
              <button className="btn sm primary" style={{ marginTop: 14 }}>Selecionar arquivo</button>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
              <button className="btn ghost" onClick={()=>setShowModal(false)}>Cancelar</button>
              <button className="btn primary" onClick={()=>setShowModal(false)}>Continuar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BannerCard({ b }) {
  const statusColor = b.status === 'publicado' ? 'green' : b.status === 'agendado' ? 'purple' : '';
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <ImgPlaceholder label={b.img} variant={b.cor} style={{ aspectRatio: '16/9', borderRadius: 0, border: 0 }}/>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <h4 style={{ margin: 0, fontSize: 14, fontWeight: 800 }}>{b.titulo}</h4>
          <span className={`pill ${statusColor}`}><span className="dot"/> {b.status}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>
          <span>{b.tipo}</span>
          <span>•</span>
          <span>{b.periodo}</span>
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 10, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>
            <Icon d={IC.eye} size={12} style={{ display: 'inline', verticalAlign: 'text-bottom' }}/> {b.alcance.toLocaleString('pt-BR')} alcance
          </span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
            <button className="btn sm ghost" style={{ padding: '5px 7px' }}><Icon d={IC.eye} size={13}/></button>
            <button className="btn sm ghost" style={{ padding: '5px 7px' }}><Icon d={IC.edit} size={13}/></button>
            <button className="btn sm ghost" style={{ padding: '5px 7px' }}><Icon d={IC.trash} size={13}/></button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PromocoesScreen, CuponsScreen, BannersScreen });
