/* global window */
// ---------- Demo data (estado mutável central) ----------

const EMPRESAS = {
  padaria: {
    nome: 'Padaria São José',
    desc: 'Pães frescos, café da manhã e doces artesanais no coração do bairro desde 1987.',
    categoria: 'Padaria & Cafeteria',
    avatar: 'PS',
    avatarColor: 'linear-gradient(135deg, #ff6b4a, #ff5a8a)',
    fundacao: '1987',
    cnpj: '12.345.678/0001-90',
    telefone: '(81) 3434-2010',
    whatsapp: '(81) 99876-2010',
    email: 'contato@padariasaojose.com.br',
    site: 'www.padariasaojose.com.br',
    endereco: 'Rua das Flores, 245 — Boa Viagem, Recife — PE',
    cep: '51020-100',
    instagram: '@padariasaojose',
    facebook: '/padariasaojose',
  },
  pizzaria: {
    nome: 'Vesúvio Pizzaria',
    desc: 'Pizzas de forno a lenha, massa artesanal e sabores autorais. Delivery e salão.',
    categoria: 'Restaurante & Pizzaria',
    avatar: 'VP',
    avatarColor: 'linear-gradient(135deg, #c5462a, #f5b400)',
    fundacao: '2014',
    cnpj: '98.765.432/0001-10',
    telefone: '(81) 3434-7788',
    whatsapp: '(81) 99770-3030',
    email: 'oi@vesuviorecife.com.br',
    site: 'www.vesuviorecife.com.br',
    endereco: 'Av. Conselheiro Aguiar, 1800 — Boa Viagem, Recife — PE',
    cep: '51111-020',
    instagram: '@vesuviopizzaria',
    facebook: '/vesuviorecife',
  },
  salao: {
    nome: 'Studio Marina Hair',
    desc: 'Cabelo, coloração, estética facial e dia da noiva. Atendimento com hora marcada.',
    categoria: 'Beleza & Estética',
    avatar: 'MH',
    avatarColor: 'linear-gradient(135deg, #7c5cff, #ff5a8a)',
    fundacao: '2019',
    cnpj: '21.444.555/0001-77',
    telefone: '(81) 3221-9988',
    whatsapp: '(81) 99412-7766',
    email: 'agenda@studiomarina.com.br',
    site: 'www.studiomarinahair.com.br',
    endereco: 'Rua Setúbal, 980 — Boa Viagem, Recife — PE',
    cep: '51030-010',
    instagram: '@studiomarinahair',
    facebook: '/studiomarinahair',
  },
};

const HORARIOS_DEFAULT = [
  { dia: 'Segunda',  aberto: true,  abre: '06:00', fecha: '20:00' },
  { dia: 'Terça',    aberto: true,  abre: '06:00', fecha: '20:00' },
  { dia: 'Quarta',   aberto: true,  abre: '06:00', fecha: '20:00' },
  { dia: 'Quinta',   aberto: true,  abre: '06:00', fecha: '20:00' },
  { dia: 'Sexta',    aberto: true,  abre: '06:00', fecha: '21:00' },
  { dia: 'Sábado',   aberto: true,  abre: '07:00', fecha: '21:00' },
  { dia: 'Domingo',  aberto: true,  abre: '07:00', fecha: '13:00' },
];

const PROMOS_INI = [
  { id: 'p1', titulo: 'Café + Pão de queijo', desc: 'Combo manhã: café 200ml + pão de queijo recheado', preco: 'R$ 9,90', categoria: 'Combo', validade: '31/05/2026', destaque: true, status: 'ativa', views: 1240, cliques: 308, cor: 'orange', img: 'café da manhã' },
  { id: 'p2', titulo: 'Bolo do dia 30% off',  desc: 'Toda terça: bolo caseiro com 30% de desconto até 14h', preco: 'R$ 14,00', categoria: 'Desconto', validade: '27/05/2026', destaque: false, status: 'ativa', views: 870, cliques: 142, cor: 'green', img: 'bolo caseiro' },
  { id: 'p3', titulo: 'Lanche da tarde',      desc: 'Cappuccino + sonho de creme por preço de feira', preco: 'R$ 12,50', categoria: 'Combo', validade: '15/06/2026', destaque: false, status: 'ativa', views: 654, cliques: 96,  cor: 'purple', img: 'cappuccino' },
  { id: 'p4', titulo: 'Quentinhas almoço',    desc: 'Marmita executiva com 4 itens — retirada a partir das 11h', preco: 'R$ 22,00', categoria: 'Almoço', validade: '30/05/2026', destaque: true,  status: 'ativa', views: 2104, cliques: 612, cor: 'pink', img: 'marmita' },
];

const CUPONS_INI = [
  { id: 'c1', codigo: 'BEMVINDO15', tipo: '%', valor: 15, descricao: 'Bem-vindo: 15% off no primeiro pedido', limite: 200, usados: 87,  validade: '31/12/2026', status: 'ativo' },
  { id: 'c2', codigo: 'CAFE5',      tipo: 'R$', valor: 5, descricao: 'R$5 off em qualquer café acima de R$20', limite: 500, usados: 312, validade: '30/06/2026', status: 'ativo' },
  { id: 'c3', codigo: 'DOMINGAO',   tipo: '%', valor: 20, descricao: '20% off em pães doces aos domingos',     limite: 100, usados: 100, validade: '01/05/2026', status: 'esgotado' },
  { id: 'c4', codigo: 'FELIZNIVER', tipo: '%', valor: 25, descricao: '25% para clientes no mês do aniversário', limite: 999, usados: 41,  validade: '31/12/2026', status: 'ativo' },
];

const BANNERS_INI = [
  { id: 'b1', titulo: 'Manhãs São José', tipo: 'Campanha', cor: 'orange', status: 'publicado', alcance: 8420, periodo: '15/05 → 15/06', img: 'banner campanha manhã' },
  { id: 'b2', titulo: 'Quentinhas do almoço', tipo: 'Promoção', cor: 'green', status: 'publicado', alcance: 12104, periodo: '01/05 → 30/06', img: 'banner almoço' },
  { id: 'b3', titulo: 'Dia das Mães', tipo: 'Sazonal', cor: 'pink', status: 'agendado', alcance: 0, periodo: '08/05 → 11/05', img: 'banner dia das mães' },
  { id: 'b4', titulo: 'Institucional 1987', tipo: 'Institucional', cor: 'blue', status: 'rascunho', alcance: 0, periodo: '—', img: 'banner história 1987' },
];

const VAGAS_INI = [
  { id: 'v1', cargo: 'Padeiro(a) — Turno noturno', area: 'Produção', tipo: 'CLT', salario: 'R$ 2.400 + benefícios', candidatos: 24, status: 'aberta', publicada: '12/05/2026', requisitos: 'Exp. 1+ ano, disponibilidade noturna' },
  { id: 'v2', cargo: 'Atendente de balcão', area: 'Atendimento', tipo: 'CLT', salario: 'R$ 1.700 + comissões', candidatos: 41, status: 'aberta', publicada: '10/05/2026', requisitos: 'Ensino médio, comunicação' },
  { id: 'v3', cargo: 'Confeiteiro(a)', area: 'Confeitaria', tipo: 'CLT', salario: 'R$ 2.900', candidatos: 12, status: 'em análise', publicada: '02/05/2026', requisitos: 'Curso de confeitaria, portfólio' },
];

const EVENTOS_INI = [
  { id: 'e1', titulo: 'Festival do Café Especial', data: '24/05/2026', hora: '08h–14h', local: 'Calçada da padaria', tipo: 'Evento', cor: 'orange', interesse: 312, status: 'confirmado' },
  { id: 'e2', titulo: 'Aula aberta de pão sourdough', data: '07/06/2026', hora: '15h–17h', local: 'Salão interno', tipo: 'Workshop', cor: 'purple', interesse: 87, status: 'confirmado' },
  { id: 'e3', titulo: 'Junina São José',           data: '28/06/2026', hora: '17h–22h', local: 'Praça em frente', tipo: 'Sazonal', cor: 'pink', interesse: 540, status: 'rascunho' },
];

const NOTIFICACOES = [
  { id: 1, titulo: '128 pessoas viram seu perfil hoje', tempo: 'há 12min', tipo: 'view', lida: false },
  { id: 2, titulo: 'Promoção "Quentinhas" superou meta semanal',  tempo: 'há 1h', tipo: 'goal', lida: false },
  { id: 3, titulo: 'Plano Profissional renovado automaticamente', tempo: 'ontem', tipo: 'plano', lida: true },
];

window.DEMO = { EMPRESAS, HORARIOS_DEFAULT, PROMOS_INI, CUPONS_INI, BANNERS_INI, VAGAS_INI, EVENTOS_INI, NOTIFICACOES };
