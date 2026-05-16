/* global React, window */
const { useState } = React;
const { Icon, IC, ImgPlaceholder } = window;

// ---------- PERFIL DA EMPRESA ----------
function PerfilScreen({ empresa, setEmpresa }) {
  const [tab, setTab] = useState('basico');
  const update = (k, v) => setEmpresa({ ...empresa, [k]: v });

  return (
    <div className="col">
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {/* cover */}
        <div style={{
          height: 140,
          background: `linear-gradient(115deg, var(--brand-blue), var(--brand-blue-light) 70%, var(--brand-green))`,
          position: 'relative',
        }}>
          <svg style={{ position: 'absolute', inset: 0, opacity: .2 }} width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 800 140">
            <defs><pattern id="p" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#fff"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#p)"/>
          </svg>
          <button className="btn sm" style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(255,255,255,.92)', borderColor: 'transparent' }}>
            <Icon d={IC.image} size={13}/> Trocar capa
          </button>
        </div>
        {/* header */}
        <div style={{
          padding: 'var(--pad)',
          paddingLeft: 'calc(96px + var(--pad) + 18px)',
          position: 'relative',
          minHeight: 70,
        }}>
          {/* Avatar absoluto, sobrepondo a capa */}
          <div style={{
            position: 'absolute',
            left: 'var(--pad)',
            top: -56,
            width: 96, height: 96, borderRadius: 22,
            background: empresa.avatarColor, color: '#fff',
            display: 'grid', placeItems: 'center',
            fontSize: 32, fontWeight: 800, letterSpacing: '-1px',
            border: '5px solid #fff', boxShadow: 'var(--shadow-md)',
          }}>{empresa.avatar}</div>

          {/* Linha do título + botões */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 16, flexWrap: 'wrap', rowGap: 12,
          }}>
            <div style={{ minWidth: 0, flex: '1 1 280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: '-.5px' }}>{empresa.nome}</h2>
                <span className="pill green"><span className="dot pulse"/> publicado no app</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, flexWrap: 'wrap', rowGap: 6 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Icon d={IC.tag} size={13}/> {empresa.categoria}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Icon d={IC.pin} size={13}/> Boa Viagem, Recife — PE</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Icon d={IC.calendar} size={13}/> desde {empresa.fundacao}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0, flexWrap: 'wrap' }}>
              <button className="btn">Pré-visualizar no app</button>
              <button className="btn primary">Salvar alterações</button>
            </div>
          </div>
        </div>

        {/* tabs */}
        <div style={{ display: 'flex', gap: 4, padding: '0 var(--pad)', borderTop: '1px solid var(--border)' }}>
          {[
            ['basico', 'Informações básicas'],
            ['contato', 'Contato & redes'],
            ['local', 'Endereço & mapa'],
            ['midia', 'Logo & mídia'],
          ].map(([id, label]) => (
            <button key={id} onClick={()=>setTab(id)} style={{
              padding: '14px 16px', background: 'none', border: 0, cursor: 'pointer',
              fontSize: 13, fontWeight: 700,
              color: tab === id ? 'var(--brand-blue)' : 'var(--text-muted)',
              borderBottom: `2px solid ${tab === id ? 'var(--brand-blue)' : 'transparent'}`,
              marginBottom: -1,
            }}>{label}</button>
          ))}
        </div>
      </div>

      {/* TAB BODY */}
      {tab === 'basico' && (
        <div className="grid" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
          <div className="card">
            <div className="card-head"><div><h3>Informações básicas</h3><p>Como sua empresa aparece no app</p></div></div>
            <div className="col">
              <div className="field"><label>Nome comercial</label><input className="input" value={empresa.nome} onChange={(e)=>update('nome', e.target.value)}/></div>
              <div className="field">
                <label>Descrição comercial</label>
                <textarea className="textarea" value={empresa.desc} onChange={(e)=>update('desc', e.target.value)}/>
                <span className="hint">{empresa.desc.length}/280 caracteres — aparece na ficha da empresa</span>
              </div>
              <div className="grid g-2">
                <div className="field"><label>Categoria / segmento</label>
                  <select className="select" value={empresa.categoria} onChange={(e)=>update('categoria', e.target.value)}>
                    <option>{empresa.categoria}</option>
                    <option>Restaurante</option><option>Beleza & Estética</option><option>Loja</option><option>Serviços</option>
                  </select>
                </div>
                <div className="field"><label>CNPJ</label><input className="input" value={empresa.cnpj} readOnly style={{ background: 'var(--bg)', color: 'var(--text-muted)' }}/></div>
              </div>
              <div className="grid g-2">
                <div className="field"><label>Ano de fundação</label><input className="input" value={empresa.fundacao} onChange={(e)=>update('fundacao', e.target.value)}/></div>
                <div className="field"><label>Tags de busca</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: 8, border: '1px solid var(--border)', borderRadius: 10, minHeight: 42 }}>
                    {['pão fresco', 'café manhã', 'lanche', 'bolo'].map(t => (
                      <span key={t} className="pill blue" style={{ cursor: 'pointer' }}>{t} <Icon d={IC.x} size={10}/></span>
                    ))}
                    <input style={{ border: 0, outline: 0, fontSize: 12, flex: 1, minWidth: 80, background: 'none' }} placeholder="+ adicionar"/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card">
              <div className="card-head"><div><h3>Visibilidade no app</h3><p>Controle de exposição</p></div></div>
              <div className="col" style={{ gap: 14 }}>
                <ToggleRow titulo="Empresa visível no app" sub="Aparecer nas listagens e busca" checked={true}/>
                <ToggleRow titulo="Permitir avaliações" sub="Clientes podem deixar estrelas e comentários" checked={true}/>
                <ToggleRow titulo="Destacar como parceira fundadora" sub="Selo dourado nos cards" checked={true}/>
                <ToggleRow titulo="Modo férias (oculto temporariamente)" sub="Mantém perfil mas oculta nas buscas" checked={false}/>
              </div>
            </div>
            <div className="card" style={{ background: 'linear-gradient(135deg, #fff4d6, #fff)', borderColor: 'rgba(245,180,0,.3)' }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--accent-yellow)', color: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <Icon d={IC.trophy} size={18}/>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)' }}>Selo de Parceira Fundadora</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.45 }}>
                    Sua empresa é parceira desde a fundação do app. Mantenha o selo dourado nos seus cards no Cidade em Ação.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'contato' && (
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="card">
            <div className="card-head"><div><h3>Telefone & WhatsApp</h3><p>Pontos de contato principais</p></div></div>
            <div className="col">
              <div className="field"><label>Telefone fixo</label>
                <div className="input-wrap"><Icon d={IC.phone} size={16}/><input className="input" value={empresa.telefone} onChange={(e)=>update('telefone', e.target.value)}/></div>
              </div>
              <div className="field"><label>WhatsApp Business</label>
                <div className="input-wrap"><Icon d={IC.whatsapp} size={16}/><input className="input" value={empresa.whatsapp} onChange={(e)=>update('whatsapp', e.target.value)}/></div>
                <span className="hint">Esse número recebe os cliques do botão verde no app.</span>
              </div>
              <div className="field"><label>E-mail comercial</label>
                <div className="input-wrap"><Icon d={IC.mail} size={16}/><input className="input" value={empresa.email} onChange={(e)=>update('email', e.target.value)}/></div>
              </div>
              <div className="field"><label>Website</label>
                <div className="input-wrap"><Icon d={IC.globe} size={16}/><input className="input" value={empresa.site} onChange={(e)=>update('site', e.target.value)}/></div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-head"><div><h3>Redes sociais</h3><p>Vincule os perfis públicos</p></div></div>
            <div className="col">
              <SocialField icon={IC.ig} label="Instagram" value={empresa.instagram} placeholder="@suaempresa" color="var(--accent-pink)"/>
              <SocialField icon={IC.fb} label="Facebook" value={empresa.facebook} placeholder="/suaempresa" color="var(--brand-blue)"/>
              <SocialField icon={IC.send} label="Telegram" value="" placeholder="@suaempresa (opcional)" color="var(--accent-cyan)"/>
              <SocialField icon={IC.globe} label="TikTok" value="" placeholder="@suaempresa (opcional)" color="var(--text)"/>

              <div style={{ background: 'var(--brand-green-50)', borderRadius: 12, padding: 14, display: 'flex', gap: 10, alignItems: 'center', marginTop: 6 }}>
                <Icon d={IC.check} size={16}/>
                <div style={{ fontSize: 12, color: 'var(--brand-green-dark)', fontWeight: 700 }}>
                  Botão de WhatsApp configurado · 1.847 cliques este mês
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'local' && (
        <div className="grid" style={{ gridTemplateColumns: '1fr 1.2fr' }}>
          <div className="card">
            <div className="card-head"><div><h3>Endereço</h3><p>Localização exibida no app</p></div></div>
            <div className="col">
              <div className="grid g-2">
                <div className="field"><label>CEP</label><input className="input" value={empresa.cep} onChange={(e)=>update('cep', e.target.value)}/></div>
                <div className="field"><label>Estado</label><input className="input" value="Pernambuco" readOnly style={{ background: 'var(--bg)' }}/></div>
              </div>
              <div className="field"><label>Endereço completo</label><textarea className="textarea" value={empresa.endereco} onChange={(e)=>update('endereco', e.target.value)} style={{ minHeight: 64 }}/></div>
              <div className="grid g-2">
                <div className="field"><label>Bairro</label><input className="input" defaultValue="Boa Viagem"/></div>
                <div className="field"><label>Cidade</label><input className="input" defaultValue="Recife"/></div>
              </div>
              <ToggleRow titulo="Exibir endereço completo no app" sub="Caso desligado, mostra apenas o bairro" checked={true}/>
            </div>
          </div>

          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: 'var(--pad)', paddingBottom: 12 }}>
              <div className="card-head" style={{ marginBottom: 0 }}>
                <div><h3>Localização no mapa</h3><p>Arraste o pin para ajustar</p></div>
                <button className="btn sm"><Icon d={IC.pin} size={13}/> Recentralizar</button>
              </div>
            </div>
            <div className="map-stub" style={{ height: 320, margin: '0 var(--pad) var(--pad)', borderRadius: 12 }}>
              <div className="map-pin" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -100%) rotate(-45deg)' }}/>
              <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, 18px)', background: '#fff', padding: '8px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700, boxShadow: '0 4px 14px rgba(0,0,0,.12)' }}>
                {empresa.nome}
              </div>
              <div style={{ position: 'absolute', top: 12, left: 12, background: '#fff', padding: '8px 12px', borderRadius: 10, fontSize: 11, fontWeight: 700, boxShadow: 'var(--shadow-sm)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Lat:</span> -8.118 &nbsp; <span style={{ color: 'var(--text-muted)' }}>Lng:</span> -34.901
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'midia' && (
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="card">
            <div className="card-head"><div><h3>Logotipo</h3><p>Aparece em cards, busca e ficha</p></div></div>
            <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
              <div style={{ width: 120, height: 120, borderRadius: 24, background: empresa.avatarColor, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 44, fontWeight: 800, flexShrink: 0, boxShadow: 'var(--shadow-md)' }}>{empresa.avatar}</div>
              <div style={{ flex: 1 }}>
                <button className="btn primary"><Icon d={IC.upload} size={14}/> Enviar novo logo</button>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 10, lineHeight: 1.5 }}>
                  PNG ou JPG · até 4 MB · proporção 1:1 · mínimo 512×512px<br/>
                  Recomendamos um logo legível em fundo escuro e claro.
                </div>
              </div>
            </div>
            <hr className="divider"/>
            <div className="card-head" style={{ marginBottom: 12 }}><div><h3 style={{ fontSize: 13 }}>Galeria da empresa</h3><p>Fotos do ambiente e produtos</p></div></div>
            <div className="grid g-4" style={{ gap: 8 }}>
              {['fachada', 'salão', 'balcão', 'produtos', 'café', 'pães', 'doces', '+ adicionar'].map((l, i) => (
                <ImgPlaceholder key={i} label={l} variant={i % 2 ? 'green' : ''} style={{ aspectRatio: '1/1', fontSize: 10 }}/>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-head"><div><h3>Como ficou no app</h3><p>Pré-visualização da ficha completa</p></div></div>
            <FichaPreview empresa={empresa}/>
          </div>
        </div>
      )}
    </div>
  );
}

function SocialField({ icon, label, value, placeholder, color }) {
  return (
    <div className="field">
      <label>{label}</label>
      <div className="input-wrap">
        <Icon d={icon} size={16} style={{ color }}/>
        <input className="input" defaultValue={value} placeholder={placeholder}/>
      </div>
    </div>
  );
}

function ToggleRow({ titulo, sub, checked }) {
  const [v, setV] = useState(checked);
  return (
    <label style={{ display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer', padding: '4px 0' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>{titulo}</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{sub}</div>
      </div>
      <span className="tgl"><input type="checkbox" checked={v} onChange={(e)=>setV(e.target.checked)}/><span className="slider"/></span>
    </label>
  );
}

function FichaPreview({ empresa }) {
  return (
    <div style={{ background: 'var(--bg)', borderRadius: 14, padding: 14, border: '1px solid var(--border)' }}>
      <div style={{ background: 'linear-gradient(115deg, var(--brand-blue), var(--brand-blue-dark))', height: 60, borderRadius: 8, position: 'relative' }}/>
      <div style={{ marginTop: -28, padding: '0 4px', display: 'flex', alignItems: 'flex-end', gap: 10 }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: empresa.avatarColor, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 20, fontWeight: 800, border: '3px solid #fff' }}>{empresa.avatar}</div>
        <div style={{ flex: 1, paddingBottom: 4 }}>
          <div style={{ fontSize: 14, fontWeight: 800, lineHeight: 1.1 }}>{empresa.nome}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{empresa.categoria} · ● aberto</div>
        </div>
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 10, lineHeight: 1.5 }}>{empresa.desc}</div>
      <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
        <button className="btn sm success" style={{ flex: 1, justifyContent: 'center' }}><Icon d={IC.whatsapp} size={13}/> WhatsApp</button>
        <button className="btn sm" style={{ flex: 1, justifyContent: 'center' }}><Icon d={IC.pin} size={13}/> Mapa</button>
        <button className="btn sm" style={{ flex: 1, justifyContent: 'center' }}><Icon d={IC.phone} size={13}/> Ligar</button>
      </div>
      <div style={{ marginTop: 12, padding: 10, background: '#fff', borderRadius: 10, border: '1px solid var(--border)', fontSize: 11 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon d={IC.star} size={12} stroke={0} fill="var(--accent-yellow)"/>
            <b>4,9</b> · 312 avaliações
          </div>
          <div style={{ color: 'var(--text-muted)' }}>Boa Viagem · 1.2km</div>
        </div>
      </div>
    </div>
  );
}

// ---------- HORÁRIO DE FUNCIONAMENTO ----------
function HorariosScreen({ horarios, setHorarios }) {
  const [especiais] = useState([
    { id: 1, data: '11/05/2026', titulo: 'Dia das Mães', tipo: 'aberto', horario: '07:00 — 16:00', cor: 'var(--accent-pink)' },
    { id: 2, data: '12/06/2026', titulo: 'Dia dos Namorados', tipo: 'aberto', horario: '07:00 — 22:00', cor: 'var(--accent-purple)' },
    { id: 3, data: '24/06/2026', titulo: 'São João', tipo: 'fechado', horario: '— fechado o dia todo —', cor: 'var(--accent-orange)' },
  ]);

  const toggleDia = (i) => {
    const novo = [...horarios]; novo[i] = { ...novo[i], aberto: !novo[i].aberto }; setHorarios(novo);
  };
  const setHora = (i, k, v) => {
    const novo = [...horarios]; novo[i] = { ...novo[i], [k]: v }; setHorarios(novo);
  };

  const copyToAll = () => {
    const ref = horarios[0];
    setHorarios(horarios.map(d => ({ ...d, abre: ref.abre, fecha: ref.fecha, aberto: ref.aberto })));
  };

  return (
    <div className="grid" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
      <div className="col">
        <div className="card">
          <div className="card-head">
            <div><h3>Horário semanal</h3><p>Cadastre os horários por dia da semana</p></div>
            <button className="btn sm" onClick={copyToAll}><Icon d={IC.copy} size={13}/> Replicar segunda</button>
          </div>
          <div className="col" style={{ gap: 8 }}>
            {horarios.map((d, i) => (
              <div key={d.dia} style={{
                display: 'grid', gridTemplateColumns: '90px 60px 1fr 24px 1fr 100px',
                gap: 12, alignItems: 'center', padding: '10px 14px',
                background: d.aberto ? 'var(--surface)' : 'var(--bg)',
                border: '1px solid var(--border)', borderRadius: 12,
              }}>
                <span style={{ fontWeight: 700, fontSize: 13 }}>{d.dia}</span>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="tgl"><input type="checkbox" checked={d.aberto} onChange={()=>toggleDia(i)}/><span className="slider"/></span>
                </label>
                <input type="time" value={d.abre} onChange={(e)=>setHora(i, 'abre', e.target.value)} disabled={!d.aberto}
                  className="input" style={{ padding: '8px 10px', fontSize: 13 }}/>
                <span style={{ textAlign: 'center', color: 'var(--text-muted)', fontWeight: 700 }}>→</span>
                <input type="time" value={d.fecha} onChange={(e)=>setHora(i, 'fecha', e.target.value)} disabled={!d.aberto}
                  className="input" style={{ padding: '8px 10px', fontSize: 13 }}/>
                <span className={`pill ${d.aberto ? 'green' : ''}`} style={{ justifyContent: 'center' }}>
                  <span className="dot"/> {d.aberto ? 'Aberto' : 'Fechado'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div><h3>Horários especiais e feriados</h3><p>Datas que sobrescrevem o horário semanal</p></div>
            <button className="btn sm primary"><Icon d={IC.plus} size={13}/> Adicionar data</button>
          </div>
          <div className="col" style={{ gap: 8 }}>
            {especiais.map(e => (
              <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', border: '1px solid var(--border)', borderRadius: 12 }}>
                <div style={{ width: 50, textAlign: 'center', padding: '8px 0', background: `${e.cor}1a`, color: e.cor, borderRadius: 8 }}>
                  <div style={{ fontSize: 10, fontWeight: 800, lineHeight: 1, letterSpacing: '.5px' }}>{e.data.split('/')[1] === '05' ? 'MAI' : e.data.split('/')[1] === '06' ? 'JUN' : 'JUL'}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, lineHeight: 1, marginTop: 4 }}>{e.data.split('/')[0]}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 800 }}>{e.titulo}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{e.horario}</div>
                </div>
                <span className={`pill ${e.tipo === 'fechado' ? 'orange' : 'green'}`}>
                  <span className="dot"/> {e.tipo === 'fechado' ? 'Fechado' : 'Aberto'}
                </span>
                <button className="btn sm ghost"><Icon d={IC.edit} size={13}/></button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card">
          <div className="card-head">
            <div><h3>Status agora</h3><p>O que o app está mostrando neste momento</p></div>
          </div>
          <div style={{
            background: 'var(--brand-green-50)', borderRadius: 16, padding: 22,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            border: '1px dashed rgba(0,166,81,.3)',
          }}>
            <div style={{ width: 56, height: 56, borderRadius: 18, background: 'var(--brand-green)', color: '#fff', display: 'grid', placeItems: 'center', boxShadow: '0 8px 20px rgba(0,166,81,.3)' }}>
              <Icon d={IC.check} size={24} stroke={3}/>
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--brand-green-dark)', letterSpacing: '-.4px' }}>Aberto agora</div>
            <div style={{ fontSize: 13, color: 'var(--brand-green-dark)', fontWeight: 600 }}>Fecha às 20:00 · faltam 3h 42min</div>
          </div>
          <div style={{ marginTop: 14, display: 'flex', gap: 6 }}>
            <button className="btn" style={{ flex: 1, justifyContent: 'center' }}>Forçar fechado</button>
            <button className="btn ghost" style={{ flex: 1, justifyContent: 'center' }}><Icon d={IC.bell} size={13}/> Notificar pausa</button>
          </div>
        </div>

        <div className="card">
          <div className="card-head"><div><h3>Resumo da semana</h3></div></div>
          <div className="col" style={{ gap: 6 }}>
            {horarios.map(d => (
              <div key={d.dia} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{d.dia}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: d.aberto ? 'var(--text)' : 'var(--text-soft)' }}>
                  {d.aberto ? `${d.abre} — ${d.fecha}` : 'Fechado'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PerfilScreen, HorariosScreen });
