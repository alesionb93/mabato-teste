/* =========================================================
   MOBATO — Vistoria Veicular
   Simulação de app mobile para testes manuais de QA.
   JavaScript puro, sem dependências externas.
   ========================================================= */
(function () {
  'use strict';

  /* =======================================================
     1. ÍCONES (SVG inline)
     ======================================================= */
  const SVG = (p, extra) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ` +
    `stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"${extra || ''}>${p}</svg>`;

  const ICONS = {
    'arrow-left': SVG('<path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>'),
    'chevron-right': SVG('<path d="M9 18l6-6-6-6"/>'),
    'chevron-down': SVG('<path d="M6 9l6 6 6-6"/>'),
    'clipboard': SVG('<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6M9 16h4"/>'),
    'clipboard-plus': SVG('<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11v6M9 14h6"/>'),
    'search-list': SVG('<path d="M4 6h10M4 12h6M4 18h5"/><circle cx="16.5" cy="15.5" r="3.5"/><path d="M19 18l2.5 2.5"/>'),
    'search': SVG('<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/>'),
    'users': SVG('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
    'car': SVG('<path d="M5 17h14"/><path d="M3 13l1.8-5.1A2 2 0 0 1 6.7 6.5h10.6a2 2 0 0 1 1.9 1.4L21 13v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><circle cx="7.5" cy="13.5" r=".6" fill="currentColor"/><circle cx="16.5" cy="13.5" r=".6" fill="currentColor"/>'),
    'chart': SVG('<path d="M3 3v18h18"/><rect x="7" y="11" width="3" height="6" rx="1"/><rect x="12.5" y="7" width="3" height="10" rx="1"/><rect x="18" y="13" width="3" height="4" rx="1"/>'),
    'settings': SVG('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
    'logout': SVG('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>'),
    'check': SVG('<path d="M20 6L9 17l-5-5"/>'),
    'check-circle': SVG('<circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/>'),
    'check-anim': SVG('<circle cx="12" cy="12" r="9"/><path class="check-anim" d="M8 12.5l2.7 2.7L16 9.5"/>'),
    'x': SVG('<path d="M18 6L6 18M6 6l12 12"/>'),
    'x-circle': SVG('<circle cx="12" cy="12" r="9"/><path d="M15 9l-6 6M9 9l6 6"/>'),
    'alert': SVG('<path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>'),
    'info': SVG('<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>'),
    'lock': SVG('<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>'),
    'calendar': SVG('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
    'clock': SVG('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    'gauge': SVG('<path d="M12 14l4-4"/><path d="M4 18a9 9 0 1 1 16 0"/>'),
    'trash': SVG('<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/><path d="M10 11v6M14 11v6"/>'),
    'eye': SVG('<path d="M1.8 12S5.5 5 12 5s10.2 7 10.2 7-3.7 7-10.2 7S1.8 12 1.8 12z"/><circle cx="12" cy="12" r="3"/>'),
    'eye-off': SVG('<path d="M9.9 5.2A9.9 9.9 0 0 1 12 5c6.5 0 10.2 7 10.2 7a17 17 0 0 1-3.2 4.1"/><path d="M6.3 6.4A17 17 0 0 0 1.8 12S5.5 19 12 19a9.8 9.8 0 0 0 4.3-1"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/><path d="M2 2l20 20"/>'),
    'inbox': SVG('<path d="M21 12h-5l-2 3h-4l-2-3H3"/><path d="M5.5 5h13l2.5 7v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6z"/>'),
    'file-check': SVG('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 15l2 2 4-4"/>'),
    'user': SVG('<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>'),
    'shield': SVG('<path d="M12 3l8 3v6c0 4.5-3.2 8.3-8 9-4.8-.7-8-4.5-8-9V6z"/>'),
    'paint': SVG('<rect x="3" y="4" width="14" height="6" rx="2"/><path d="M17 7h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-6"/><rect x="10" y="14" width="6" height="7" rx="2"/>'),
    'window': SVG('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 12h18M12 4v16"/>'),
    'bulb': SVG('<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.4.3.6.7.7 1.1h5.6c.1-.4.3-.8.7-1.1A6 6 0 0 0 12 3z"/>'),
    'tire': SVG('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="M12 3v5.5M12 15.5V21M3 12h5.5M15.5 12H21"/>'),
    'engine': SVG('<path d="M5 10h2l2-3h6l2 3h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z"/><path d="M9 7V5h6v2"/>'),
    'seat': SVG('<path d="M7 4h6a2 2 0 0 1 2 2v7H7z"/><path d="M7 13h10a2 2 0 0 1 2 2v5"/><path d="M5 20V6"/>'),
    'plug': SVG('<path d="M9 3v5M15 3v5"/><path d="M6 8h12v3a6 6 0 0 1-12 0z"/><path d="M12 17v4"/>'),
    'toolbox': SVG('<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/>'),
    'flag': SVG('<path d="M5 21V4"/><path d="M5 5h11l-1.5 3L16 11H5z"/>')
  };

  function icon(name) { return ICONS[name] || ''; }

  /* =======================================================
     2. CONSTANTES E DADOS MOCKADOS
     ======================================================= */
  const STORAGE_KEYS = {
    vehicles: 'mobato:veiculos',
    appointments: 'mobato:atendimentos',
    seeded: 'mobato:seed',
    session: 'mobato:sessao'
  };

  const CREDENCIAIS = { usuario: 'vistoriador', senha: '123456' };

  const PLACA_REGEX_ANTIGA = /^[A-Z]{3}[0-9]{4}$/;
  const PLACA_REGEX_MERCOSUL = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;

  const UFS = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
    'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  const VEICULOS_PADRAO = [
    {
      placa: 'ABC1D23',
      cliente: { nome: 'João da Silva', cpf: '123.456.789-00', telefone: '(48) 99999-1111', email: 'joao.silva@email.com', nascimento: '12/03/1985', cep: '88010-000', endereco: 'Rua Felipe Schmidt', numero: '250', cidade: 'Florianópolis', estado: 'SC' },
      veiculo: { marca: 'Toyota', modelo: 'Corolla XEi', versao: '2.0 Dynamic Force', anoFabricacao: 2022, anoModelo: 2022, cor: 'Prata', renavam: '01234567890', chassi: '9BR53ZEC4N4123456', combustivel: 'Flex' }
    },
    {
      placa: 'BRA2E19',
      cliente: { nome: 'Maria Oliveira', cpf: '987.654.321-00', telefone: '(48) 98888-2222', email: 'maria.oliveira@email.com', nascimento: '27/07/1990', cep: '88101-000', endereco: 'Av. Central', numero: '1020', cidade: 'São José', estado: 'SC' },
      veiculo: { marca: 'Honda', modelo: 'Civic Touring', versao: '1.5 Turbo CVT', anoFabricacao: 2021, anoModelo: 2021, cor: 'Preto', renavam: '09876543210', chassi: '93HFC2650MZ100200', combustivel: 'Gasolina' }
    },
    {
      placa: 'XYZ1234',
      cliente: { nome: 'Carlos Souza', cpf: '456.789.123-00', telefone: '(47) 97777-3333', email: 'carlos.souza@email.com', nascimento: '05/11/1978', cep: '89201-000', endereco: 'Rua das Palmeiras', numero: '77', cidade: 'Joinville', estado: 'SC' },
      veiculo: { marca: 'Volkswagen', modelo: 'T-Cross', versao: 'Highline 1.4 TSI', anoFabricacao: 2023, anoModelo: 2023, cor: 'Branco', renavam: '05566778899', chassi: '9BWBH6BF4P4045678', combustivel: 'Flex' }
    }
  ];

  const PLACAS_EXEMPLO = ['ABC1D23', 'BRA2E19', 'XYZ1234', 'QWE9Z99'];

  /* ---- Checklist: 11 categorias / 125 itens ---- */
  const CHECKLIST = [
    {
      id: 'identificacao', nome: 'Identificação do veículo', icone: 'shield',
      itens: [
        ['plate', 'Placa', 'Legibilidade, lacre e ausência de adulteração.'],
        ['chassis', 'Número do chassi', 'Gravação original, sem remarcação ou desgaste.'],
        ['renavam', 'RENAVAM', 'Confere com o documento apresentado pelo cliente.'],
        ['id-label', 'Etiqueta de identificação', 'Etiquetas nas peças presentes e íntegras.'],
        ['engine-number', 'Número do motor', 'Numeração gravada no bloco, legível e conferida.']
      ]
    },
    {
      id: 'carroceria', nome: 'Carroceria e estrutura', icone: 'car',
      itens: [
        ['hood', 'Capô', 'Alinhamento, folgas e ausência de amassados.'],
        ['roof', 'Teto', 'Deformações, marcas de impacto ou reparo.'],
        ['front-left-door', 'Porta dianteira esquerda', 'Abertura, fechamento e alinhamento.'],
        ['front-right-door', 'Porta dianteira direita', 'Abertura, fechamento e alinhamento.'],
        ['rear-left-door', 'Porta traseira esquerda', 'Abertura, fechamento e alinhamento.'],
        ['rear-right-door', 'Porta traseira direita', 'Abertura, fechamento e alinhamento.'],
        ['trunk-lid', 'Tampa do porta-malas', 'Travamento, vedação e alinhamento.'],
        ['front-left-fender', 'Para-lama dianteiro esquerdo', 'Amassados, trincas e fixação.'],
        ['front-right-fender', 'Para-lama dianteiro direito', 'Amassados, trincas e fixação.'],
        ['rear-left-fender', 'Para-lama traseiro esquerdo', 'Amassados, trincas e fixação.'],
        ['rear-right-fender', 'Para-lama traseiro direito', 'Amassados, trincas e fixação.'],
        ['front-bumper', 'Para-choque dianteiro', 'Fixação, trincas e alinhamento com a carroceria.'],
        ['rear-bumper', 'Para-choque traseiro', 'Fixação, trincas e alinhamento com a carroceria.'],
        ['sills', 'Soleiras', 'Corrosão, deformação e presença dos acabamentos.'],
        ['side-rails', 'Longarinas', 'Sinais de colisão, solda ou amassamento.'],
        ['visible-structure', 'Estrutura aparente', 'Assoalho, colunas e caixas de roda.']
      ]
    },
    {
      id: 'pintura', nome: 'Pintura', icone: 'paint',
      itens: [
        ['paint-hood', 'Pintura do capô', 'Brilho, uniformidade e acabamento.'],
        ['paint-roof', 'Pintura do teto', 'Brilho, uniformidade e acabamento.'],
        ['paint-front-left-door', 'Pintura da porta dianteira esquerda', 'Brilho, uniformidade e acabamento.'],
        ['paint-front-right-door', 'Pintura da porta dianteira direita', 'Brilho, uniformidade e acabamento.'],
        ['paint-rear-left-door', 'Pintura da porta traseira esquerda', 'Brilho, uniformidade e acabamento.'],
        ['paint-rear-right-door', 'Pintura da porta traseira direita', 'Brilho, uniformidade e acabamento.'],
        ['paint-trunk', 'Pintura do porta-malas', 'Brilho, uniformidade e acabamento.'],
        ['paint-fenders', 'Pintura dos para-lamas', 'Brilho, uniformidade e acabamento.'],
        ['paint-bumpers', 'Pintura dos para-choques', 'Brilho, uniformidade e acabamento.'],
        ['repaint-signs', 'Sinais de repintura', 'Excesso de tinta em borrachas e frisos.'],
        ['tone-difference', 'Diferença de tonalidade', 'Comparação entre peças sob luz natural.'],
        ['scratches', 'Riscos aparentes', 'Riscos superficiais ou profundos na lataria.'],
        ['dents', 'Amassados', 'Pequenas deformações visíveis na chapa.'],
        ['oxidation', 'Oxidação', 'Pontos de ferrugem ou bolhas na pintura.']
      ]
    },
    {
      id: 'vidros', nome: 'Vidros e espelhos', icone: 'window',
      itens: [
        ['windshield', 'Para-brisa', 'Trincas, lascas e gravação do vidro.'],
        ['front-left-window', 'Vidro dianteiro esquerdo', 'Acionamento, trincas e vedação.'],
        ['front-right-window', 'Vidro dianteiro direito', 'Acionamento, trincas e vedação.'],
        ['rear-left-window', 'Vidro traseiro esquerdo', 'Acionamento, trincas e vedação.'],
        ['rear-right-window', 'Vidro traseiro direito', 'Acionamento, trincas e vedação.'],
        ['rear-window', 'Vidro traseiro', 'Trincas e integridade do desembaçador.'],
        ['left-mirror', 'Espelho retrovisor esquerdo', 'Fixação, regulagem e superfície refletora.'],
        ['right-mirror', 'Espelho retrovisor direito', 'Fixação, regulagem e superfície refletora.'],
        ['sunroof', 'Teto solar, quando aplicável', 'Acionamento, vedação e drenos.']
      ]
    },
    {
      id: 'iluminacao', nome: 'Iluminação', icone: 'bulb',
      itens: [
        ['low-beam-left', 'Farol baixo esquerdo', 'Funcionamento e alinhamento do facho.'],
        ['low-beam-right', 'Farol baixo direito', 'Funcionamento e alinhamento do facho.'],
        ['high-beam-left', 'Farol alto esquerdo', 'Acionamento e intensidade.'],
        ['high-beam-right', 'Farol alto direito', 'Acionamento e intensidade.'],
        ['front-left-lamp', 'Lanterna dianteira esquerda', 'Funcionamento e integridade da lente.'],
        ['front-right-lamp', 'Lanterna dianteira direita', 'Funcionamento e integridade da lente.'],
        ['rear-left-lamp', 'Lanterna traseira esquerda', 'Funcionamento e integridade da lente.'],
        ['rear-right-lamp', 'Lanterna traseira direita', 'Funcionamento e integridade da lente.'],
        ['brake-light', 'Luz de freio', 'Acende nas três lâmpadas ao acionar o pedal.'],
        ['reverse-light', 'Luz de ré', 'Acende ao engatar a marcha à ré.'],
        ['fog-light', 'Luz de neblina', 'Acionamento pelo comando do painel.'],
        ['front-turn-signals', 'Setas dianteiras', 'Frequência e funcionamento de ambos os lados.'],
        ['rear-turn-signals', 'Setas traseiras', 'Frequência e funcionamento de ambos os lados.'],
        ['plate-light', 'Luz de placa', 'Ilumina a placa traseira corretamente.']
      ]
    },
    {
      id: 'rodas', nome: 'Rodas e pneus', icone: 'tire',
      itens: [
        ['front-left-tire', 'Pneu dianteiro esquerdo', 'Desgaste, bolhas e calibragem.'],
        ['front-right-tire', 'Pneu dianteiro direito', 'Desgaste, bolhas e calibragem.'],
        ['rear-left-tire', 'Pneu traseiro esquerdo', 'Desgaste, bolhas e calibragem.'],
        ['rear-right-tire', 'Pneu traseiro direito', 'Desgaste, bolhas e calibragem.'],
        ['spare-tire', 'Estepe', 'Presença, calibragem e estado de conservação.'],
        ['jack', 'Macaco', 'Presente e em condições de uso.'],
        ['wheel-wrench', 'Chave de roda', 'Presente e compatível com as porcas.'],
        ['wheels', 'Rodas', 'Empenamento, trincas e fixação.'],
        ['hubcaps', 'Calotas', 'Presença e conservação do conjunto.'],
        ['tread-depth', 'Sulcos dos pneus', 'Profundidade mínima de 1,6 mm.']
      ]
    },
    {
      id: 'mecanica', nome: 'Parte mecânica visível', icone: 'engine',
      itens: [
        ['leaks', 'Vazamentos aparentes', 'Óleo, fluidos ou combustível sob o veículo.'],
        ['engine-condition', 'Estado do motor', 'Limpeza, fixação e ausência de improvisos.'],
        ['oil-reservoir', 'Reservatório de óleo', 'Nível e aspecto do óleo na vareta.'],
        ['coolant-reservoir', 'Reservatório de arrefecimento', 'Nível entre as marcas e cor do fluido.'],
        ['brake-fluid', 'Fluido de freio', 'Nível e validade do fluido.'],
        ['steering-fluid', 'Fluido de direção hidráulica, quando aplicável', 'Nível e sinais de vazamento.'],
        ['battery', 'Bateria', 'Fixação, terminais e data de fabricação.'],
        ['belts', 'Correias aparentes', 'Trincas, folga e tensionamento.'],
        ['hoses', 'Mangueiras', 'Ressecamento, trincas e abraçadeiras.'],
        ['radiator', 'Radiador', 'Colmeia, fixação e ausência de vazamento.']
      ]
    },
    {
      id: 'interior', nome: 'Interior', icone: 'seat',
      itens: [
        ['interior-panel', 'Painel', 'Trincas, fixação e acabamento.'],
        ['driver-seat', 'Banco do motorista', 'Regulagens, costuras e estofamento.'],
        ['passenger-seat', 'Banco passageiro', 'Regulagens, costuras e estofamento.'],
        ['rear-seats', 'Bancos traseiros', 'Rebatimento, costuras e estofamento.'],
        ['headliner', 'Forração do teto', 'Descolamento, manchas e furos.'],
        ['carpet', 'Carpete', 'Umidade, manchas e fixação.'],
        ['floor-mats', 'Tapetes', 'Presença e conservação do jogo.'],
        ['steering-wheel', 'Volante', 'Revestimento, folga e regulagem.'],
        ['gear-lever', 'Alavanca de câmbio', 'Engates, coifa e acabamento.'],
        ['handbrake', 'Freio de mão', 'Curso e eficiência ao travar.'],
        ['front-seatbelts', 'Cintos dianteiros', 'Travamento, retração e integridade.'],
        ['rear-seatbelts', 'Cintos traseiros', 'Travamento, retração e integridade.'],
        ['airbags', 'Airbags aparentes', 'Tampas íntegras e sem luz de falha.'],
        ['glovebox', 'Porta-luvas', 'Abertura, travamento e iluminação.'],
        ['center-console', 'Console central', 'Fixação, tampas e compartimentos.']
      ]
    },
    {
      id: 'eletricos', nome: 'Painel e componentes elétricos', icone: 'plug',
      itens: [
        ['instrument-cluster', 'Painel de instrumentos', 'Iluminação e leitura dos mostradores.'],
        ['odometer', 'Hodômetro', 'Leitura compatível com o estado do veículo.'],
        ['warning-lights', 'Indicadores luminosos', 'Nenhuma luz de falha acesa após a partida.'],
        ['air-conditioning', 'Ar-condicionado', 'Gela em todas as velocidades.'],
        ['ventilation', 'Ventilação', 'Fluxo de ar e direcionadores.'],
        ['radio-multimedia', 'Rádio/Multimídia', 'Ligamento, som e conectividade.'],
        ['steering-controls', 'Comandos do volante', 'Todos os botões respondem.'],
        ['power-windows', 'Vidros elétricos', 'Sobem e descem em todas as portas.'],
        ['central-locking', 'Travamento elétrico', 'Trava e destrava pelo comando.'],
        ['electric-mirrors', 'Retrovisores elétricos', 'Regulagem e rebatimento.'],
        ['wipers', 'Limpadores de para-brisa', 'Velocidades, palhetas e esguicho.'],
        ['rear-defogger', 'Desembaçador traseiro', 'Aquecimento das resistências.'],
        ['horn', 'Buzina', 'Acionamento e volume.']
      ]
    },
    {
      id: 'equipamentos', nome: 'Equipamentos e acessórios', icone: 'toolbox',
      itens: [
        ['main-key', 'Chave principal', 'Funcionamento do comando e da lâmina.'],
        ['spare-key', 'Chave reserva', 'Presente e testada na ignição.'],
        ['owners-manual', 'Manual do proprietário', 'Presente e referente ao modelo.'],
        ['warning-triangle', 'Triângulo', 'Presente e em condições de uso.'],
        ['fire-extinguisher', 'Extintor, quando aplicável', 'Presente, dentro da validade e com carga.'],
        ['emergency-kit', 'Kit de emergência', 'Itens obrigatórios completos.'],
        ['antenna', 'Antena', 'Presente, fixada e sem danos.'],
        ['multimedia-unit', 'Central multimídia', 'Original ou instalada corretamente.'],
        ['parking-sensor', 'Sensor de estacionamento', 'Sensores respondem sem falhas.'],
        ['reverse-camera', 'Câmera de ré', 'Imagem nítida e linhas-guia.']
      ]
    },
    {
      id: 'testes', nome: 'Testes e condições gerais', icone: 'flag',
      itens: [
        ['engine-start', 'Partida do veículo', 'Parte na primeira tentativa.'],
        ['engine-running', 'Funcionamento do motor', 'Marcha lenta estável, sem falhas.'],
        ['abnormal-noises', 'Ruídos anormais', 'Batidas, chiados ou estalos.'],
        ['brake-function', 'Funcionamento do freio', 'Curso do pedal e frenagem em linha reta.'],
        ['clutch-function', 'Funcionamento da embreagem, quando aplicável', 'Ponto de engate e ausência de patinação.'],
        ['transmission-function', 'Funcionamento da transmissão', 'Trocas suaves em todas as marchas.'],
        ['steering-function', 'Funcionamento da direção', 'Alinhamento, folgas e retorno.'],
        ['suspension', 'Suspensão aparente', 'Amortecedores, molas e coxins.'],
        ['electrical-system', 'Sistema elétrico geral', 'Carga do alternador e ausência de falhas.']
      ]
    }
  ];

  const TODOS_ITENS = CHECKLIST.reduce((acc, cat) => {
    cat.itens.forEach(([id, nome, desc]) => acc.push({ id: id, nome: nome, desc: desc, categoria: cat.id }));
    return acc;
  }, []);
  const TOTAL_ITENS = TODOS_ITENS.length;
  const MAPA_ITENS = {};
  TODOS_ITENS.forEach(function (i) { MAPA_ITENS[i.id] = i; });

  /* =======================================================
     3. ESTADO DA APLICAÇÃO
     ======================================================= */
  const state = {
    screen: 'splash',
    history: [],
    usuario: null,
    veiculoAtual: null,   // registro {placa, cliente, veiculo}
    kmAtual: null,
    respostas: {},        // { itemId: { status: 'ok'|'nok', obs: '' } }
    categoriasAbertas: {},
    filtroPendentes: false,
    atendimentoAberto: null,
    placaPendente: ''     // placa digitada que não foi encontrada
  };

  /* =======================================================
     4. PERSISTÊNCIA (localStorage)
     ======================================================= */
  function lerJSON(chave, padrao) {
    try {
      const bruto = localStorage.getItem(chave);
      if (!bruto) return padrao;
      const dado = JSON.parse(bruto);
      return dado === null || dado === undefined ? padrao : dado;
    } catch (e) {
      return padrao;
    }
  }

  function gravarJSON(chave, valor) {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
      return true;
    } catch (e) {
      return false;
    }
  }

  function getVehicles() {
    return lerJSON(STORAGE_KEYS.vehicles, []);
  }

  function saveVehicle(registro) {
    const lista = getVehicles();
    const idx = lista.findIndex(function (v) { return v.placa === registro.placa; });
    if (idx >= 0) lista[idx] = registro; else lista.push(registro);
    gravarJSON(STORAGE_KEYS.vehicles, lista);
    return registro;
  }

  function findVehicleByPlate(placa) {
    const alvo = normalizarPlaca(placa);
    return getVehicles().find(function (v) { return v.placa === alvo; }) || null;
  }

  function getAppointments() {
    return lerJSON(STORAGE_KEYS.appointments, []);
  }

  function saveAppointment(atendimento) {
    const lista = getAppointments();
    lista.unshift(atendimento);
    gravarJSON(STORAGE_KEYS.appointments, lista);
    return atendimento;
  }

  function findAppointmentById(id) {
    return getAppointments().find(function (a) { return a.id === id; }) || null;
  }

  function seedDados(forcar) {
    if (forcar || !lerJSON(STORAGE_KEYS.seeded, false)) {
      gravarJSON(STORAGE_KEYS.vehicles, JSON.parse(JSON.stringify(VEICULOS_PADRAO)));
      gravarJSON(STORAGE_KEYS.appointments, []);
      gravarJSON(STORAGE_KEYS.seeded, true);
    }
  }

  function clearTestData() {
    try {
      Object.keys(STORAGE_KEYS).forEach(function (k) { localStorage.removeItem(STORAGE_KEYS[k]); });
    } catch (e) { /* ambiente sem localStorage */ }
    seedDados(true);
  }

  /* =======================================================
     5. UTILITÁRIOS
     ======================================================= */
  const $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  const $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  function escapar(txt) {
    return String(txt === null || txt === undefined ? '' : txt)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function somenteDigitos(v) { return String(v || '').replace(/\D+/g, ''); }

  function normalizarPlaca(v) {
    return String(v || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7);
  }

  function formatarPlaca(placa) {
    const p = normalizarPlaca(placa);
    return PLACA_REGEX_ANTIGA.test(p) ? p.slice(0, 3) + '-' + p.slice(3) : p;
  }

  function placaValida(placa) {
    const p = normalizarPlaca(placa);
    return PLACA_REGEX_ANTIGA.test(p) || PLACA_REGEX_MERCOSUL.test(p);
  }

  function formatarKm(valor) {
    const n = Number(somenteDigitos(valor));
    return isNaN(n) ? '0' : n.toLocaleString('pt-BR');
  }

  function formatarDataHora(iso) {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '—';
    const p = function (n) { return String(n).padStart(2, '0'); };
    return {
      data: p(d.getDate()) + '/' + p(d.getMonth() + 1) + '/' + d.getFullYear(),
      hora: p(d.getHours()) + ':' + p(d.getMinutes())
    };
  }

  function nomeVeiculo(registro) {
    const v = registro.veiculo || {};
    return [v.marca, v.modelo].filter(Boolean).join(' ') || 'Veículo';
  }

  function gerarId() {
    return 'atd-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
  }

  function gerarProtocolo() {
    return 'VST-' + String(Date.now()).slice(-6);
  }

  /* ---- Máscaras ---- */
  const MASCARAS = {
    cpf: function (v) {
      const d = somenteDigitos(v).slice(0, 11);
      return d.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    },
    telefone: function (v) {
      const d = somenteDigitos(v).slice(0, 11);
      if (d.length <= 10) return d.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d{1,4})$/, '$1-$2');
      return d.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d{1,4})$/, '$1-$2');
    },
    cep: function (v) {
      const d = somenteDigitos(v).slice(0, 8);
      return d.replace(/(\d{5})(\d{1,3})$/, '$1-$2');
    },
    data: function (v) {
      const d = somenteDigitos(v).slice(0, 8);
      return d.replace(/(\d{2})(\d)/, '$1/$2').replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
    },
    ano: function (v) { return somenteDigitos(v).slice(0, 4); },
    numero: function (v) { return somenteDigitos(v); },
    km: function (v) {
      const d = somenteDigitos(v).slice(0, 7);
      return d ? Number(d).toLocaleString('pt-BR') : '';
    }
  };

  function aplicarMascaras() {
    $$('[data-mask]').forEach(function (input) {
      input.addEventListener('input', function () {
        const fn = MASCARAS[input.getAttribute('data-mask')];
        if (fn) input.value = fn(input.value);
      });
    });
  }

  /* ---- Validações de campo ---- */
  function marcarErro(inputId, mensagem) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const campo = input.closest('.campo');
    if (!campo) return;
    campo.classList.add('erro');
    input.setAttribute('aria-invalid', 'true');
    const erro = $('.campo-erro', campo);
    if (erro) erro.textContent = mensagem;
  }

  function limparErro(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const campo = input.closest('.campo');
    if (!campo) return;
    campo.classList.remove('erro');
    input.removeAttribute('aria-invalid');
    const erro = $('.campo-erro', campo);
    if (erro) erro.textContent = '';
  }

  function limparErrosDoFormulario(form) {
    $$('.campo.erro', form).forEach(function (c) {
      c.classList.remove('erro');
      const e = $('.campo-erro', c);
      if (e) e.textContent = '';
      const i = $('input, select, textarea', c);
      if (i) i.removeAttribute('aria-invalid');
    });
  }

  function cpfValido(cpf) {
    const d = somenteDigitos(cpf);
    if (d.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(d)) return false;
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += Number(d[i]) * (10 - i);
    let r = (soma * 10) % 11; if (r === 10) r = 0;
    if (r !== Number(d[9])) return false;
    soma = 0;
    for (let i = 0; i < 10; i++) soma += Number(d[i]) * (11 - i);
    r = (soma * 10) % 11; if (r === 10) r = 0;
    return r === Number(d[10]);
  }

  function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(String(email || '').trim());
  }

  /* ---- Alertas inline ---- */
  function mostrarAlerta(id, mensagem, tipo) {
    const el = document.getElementById(id);
    if (!el) return;
    el.className = 'alerta-inline ' + (tipo || 'erro') + ' visivel';
    el.innerHTML = icon(tipo === 'sucesso' ? 'check-circle' : tipo === 'info' ? 'info' : 'alert') +
      '<span>' + escapar(mensagem) + '</span>';
  }

  function esconderAlerta(id) {
    const el = document.getElementById(id);
    if (el) { el.classList.remove('visivel'); el.innerHTML = ''; }
  }

  /* =======================================================
     6. TOASTS E MODAIS
     ======================================================= */
  function toast(mensagem, tipo) {
    const area = $('#toast-area');
    const el = document.createElement('div');
    el.className = 'toast ' + (tipo || 'info');
    el.setAttribute('role', 'status');
    el.setAttribute('data-testid', 'toast');
    el.innerHTML = icon(tipo === 'sucesso' ? 'check-circle' : tipo === 'erro' ? 'x-circle' : 'info') +
      '<span>' + escapar(mensagem) + '</span>';
    area.appendChild(el);
    setTimeout(function () {
      el.classList.add('saindo');
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 260);
    }, 3200);
  }

  let modalAberto = null;
  let elementoFoco = null;

  /**
   * config: { testid, tipo, titulo, mensagem, extraHTML, botoes: [{texto, variante, testid, acao}], linha }
   */
  function abrirModal(config) {
    const overlay = $('#modal-overlay');
    const caixa = $('#modal-caixa');
    elementoFoco = document.activeElement;

    const iconePorTipo = { sucesso: 'check-anim', alerta: 'alert', erro: 'x-circle', info: 'info' };
    const tipo = config.tipo || 'info';

    let html = '<div class="modal-icone ' + tipo + '">' + icon(config.icone || iconePorTipo[tipo]) + '</div>';
    html += '<h3 id="modal-titulo">' + escapar(config.titulo) + '</h3>';
    if (config.mensagem) html += '<p>' + escapar(config.mensagem) + '</p>';
    if (config.extraHTML) html += '<div class="modal-extra">' + config.extraHTML + '</div>';
    html += '<div class="modal-botoes' + (config.linha ? ' linha' : '') + '">';
    (config.botoes || [{ texto: 'OK', variante: 'primario' }]).forEach(function (b, i) {
      html += '<button type="button" class="btn btn-' + (b.variante || 'primario') + '" data-modal-btn="' + i + '"' +
        (b.testid ? ' data-testid="' + b.testid + '"' : '') + '>' + escapar(b.texto) + '</button>';
    });
    html += '</div>';

    caixa.innerHTML = html;
    caixa.setAttribute('data-testid', config.testid || 'modal');
    overlay.classList.add('aberto');
    modalAberto = config;

    $$('[data-modal-btn]', caixa).forEach(function (btn) {
      btn.addEventListener('click', function () {
        const idx = Number(btn.getAttribute('data-modal-btn'));
        const def = (config.botoes || [])[idx];
        fecharModal();
        if (def && typeof def.acao === 'function') def.acao();
      });
    });

    const primeiro = $('button', caixa);
    if (primeiro) primeiro.focus();
  }

  function fecharModal() {
    const overlay = $('#modal-overlay');
    overlay.classList.remove('aberto');
    $('#modal-caixa').innerHTML = '';
    modalAberto = null;
    if (elementoFoco && document.contains(elementoFoco)) {
      try { elementoFoco.focus(); } catch (e) { /* ignora */ }
    }
  }

  /* =======================================================
     7. NAVEGAÇÃO
     ======================================================= */
  const TELAS = ['splash', 'login', 'menu', 'vistoria', 'novo-checklist', 'cadastro',
    'dados', 'checklist', 'atendimentos', 'detalhes'];

  const AO_ENTRAR = {
    'menu': atualizarMenu,
    'novo-checklist': prepararTelaPlaca,
    'cadastro': prepararTelaCadastro,
    'dados': renderDados,
    'checklist': renderChecklist,
    'atendimentos': entrarAtendimentos
  };

  function showScreen(nome, opcoes) {
    opcoes = opcoes || {};
    if (TELAS.indexOf(nome) === -1) return;

    if (opcoes.history) state.history = opcoes.history.slice();
    else if (opcoes.reset) state.history = [];
    else if (!opcoes.noHistory && state.screen && state.screen !== nome) state.history.push(state.screen);

    $$('.screen').forEach(function (s) { s.classList.remove('active'); });
    const tela = document.getElementById('screen-' + nome);
    if (tela) {
      tela.classList.add('active');
      const corpo = $('.screen-body', tela);
      if (corpo) corpo.scrollTop = 0;
    }
    state.screen = nome;
    document.body.setAttribute('data-screen', nome);

    if (AO_ENTRAR[nome]) AO_ENTRAR[nome]();
  }

  function goBack() {
    const anterior = state.history.pop();
    showScreen(anterior || 'menu', { noHistory: true });
  }

  /* =======================================================
     8. AUTENTICAÇÃO
     ======================================================= */
  function iniciarLogin() {
    const form = $('#form-login');

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      const usuario = $('#login-usuario').value.trim();
      const senha = $('#login-senha').value;

      limparErro('login-usuario');
      limparErro('login-senha');
      esconderAlerta('login-alerta');

      let ok = true;
      if (!usuario) { marcarErro('login-usuario', 'Informe o usuário ou e-mail.'); ok = false; }
      if (!senha) { marcarErro('login-senha', 'Informe a senha.'); ok = false; }
      if (!ok) {
        mostrarAlerta('login-alerta', 'Preencha todos os campos para continuar.', 'erro');
        return;
      }

      const credencialOk = usuario.toLowerCase() === CREDENCIAIS.usuario && senha === CREDENCIAIS.senha;
      if (!credencialOk) {
        mostrarAlerta('login-alerta', 'Usuário ou senha inválidos.', 'erro');
        marcarErro('login-senha', 'Verifique os dados informados.');
        return;
      }

      state.usuario = CREDENCIAIS.usuario;
      gravarJSON(STORAGE_KEYS.session, { usuario: state.usuario });
      $('#login-senha').value = '';
      showScreen('menu', { reset: true });
      toast('Acesso liberado. Bom trabalho!', 'sucesso');
    });

    $('#btn-toggle-senha').innerHTML = icon('eye');
    $('#btn-toggle-senha').addEventListener('click', function () {
      const input = $('#login-senha');
      const mostrando = input.type === 'text';
      input.type = mostrando ? 'password' : 'text';
      this.innerHTML = icon(mostrando ? 'eye' : 'eye-off');
      this.setAttribute('aria-label', mostrando ? 'Mostrar senha' : 'Ocultar senha');
    });

    $('#btn-esqueci-senha').addEventListener('click', function () {
      abrirModal({
        testid: 'forgot-password-modal',
        tipo: 'info',
        titulo: 'Recuperação de senha',
        mensagem: 'Neste ambiente de testes a recuperação está desativada. Use o usuário "vistoriador" com a senha "123456".',
        botoes: [{ texto: 'ENTENDI', variante: 'primario', testid: 'forgot-password-ok' }]
      });
    });

    $('#btn-sair').addEventListener('click', function () {
      abrirModal({
        testid: 'logout-modal',
        tipo: 'alerta',
        titulo: 'Sair da conta',
        mensagem: 'Deseja encerrar a sessão? A vistoria em andamento será descartada.',
        linha: true,
        botoes: [
          { texto: 'Cancelar', variante: 'secundario', testid: 'logout-cancel' },
          {
            texto: 'Sair', variante: 'perigo', testid: 'logout-confirm', acao: function () {
              state.usuario = null;
              limparVistoriaEmAndamento();
              try { localStorage.removeItem(STORAGE_KEYS.session); } catch (e) { }
              showScreen('login', { reset: true });
              toast('Sessão encerrada.', 'info');
            }
          }
        ]
      });
    });
  }

  function limparVistoriaEmAndamento() {
    state.veiculoAtual = null;
    state.kmAtual = null;
    state.respostas = {};
    state.categoriasAbertas = {};
    state.filtroPendentes = false;
    state.placaPendente = '';
  }

  /* =======================================================
     9. MENU PRINCIPAL
     ======================================================= */
  function atualizarMenu() {
    $('#menu-nome-usuario').textContent = 'Olá, ' + (state.usuario || 'vistoriador');
    $('#stat-atendimentos').textContent = String(getAppointments().length);
    $('#stat-veiculos').textContent = String(getVehicles().length);
  }

  function iniciarMenu() {
    $$('[data-menu]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const alvo = btn.getAttribute('data-menu');
        if (alvo === 'vistoria') {
          showScreen('vistoria');
          return;
        }
        abrirModal({
          testid: 'feature-unavailable-modal',
          tipo: 'info',
          icone: 'lock',
          titulo: 'Módulo indisponível',
          mensagem: 'Funcionalidade disponível apenas na versão completa.',
          botoes: [{ texto: 'ENTENDI', variante: 'primario', testid: 'feature-unavailable-ok' }]
        });
      });
    });

    $('#btn-limpar-dados').addEventListener('click', function () {
      abrirModal({
        testid: 'clear-data-modal',
        tipo: 'alerta',
        icone: 'trash',
        titulo: 'Limpar dados de teste',
        mensagem: 'Tem certeza que deseja limpar os dados de teste? Veículos cadastrados e atendimentos concluídos serão removidos.',
        linha: true,
        botoes: [
          { texto: 'Cancelar', variante: 'secundario', testid: 'clear-data-cancel' },
          {
            texto: 'Limpar', variante: 'perigo', testid: 'clear-data-confirm', acao: function () {
              clearTestData();
              limparVistoriaEmAndamento();
              atualizarMenu();
              toast('Dados de teste restaurados ao estado inicial.', 'sucesso');
            }
          }
        ]
      });
    });

    $('#btn-novo-checklist').addEventListener('click', function () {
      limparVistoriaEmAndamento();
      showScreen('novo-checklist');
    });

    $('#btn-consultar-atendimentos').addEventListener('click', function () {
      showScreen('atendimentos');
    });
  }

  /* =======================================================
     10. BUSCA DE PLACA
     ======================================================= */
  function prepararTelaPlaca() {
    esconderAlerta('placa-alerta-sucesso');
    esconderAlerta('placa-alerta-erro');
    limparErro('input-placa');
    $('#input-placa').value = '';
    $('#placa-resultado').classList.add('escondido');
    $('#placa-resultado').innerHTML = '';
  }

  function renderChipsPlacas() {
    const box = $('#chips-placas-teste');
    box.innerHTML = PLACAS_EXEMPLO.map(function (p) {
      return '<button type="button" class="chip chip-placas" data-chip-placa="' + p + '">' + formatarPlaca(p) + '</button>';
    }).join('');
    box.addEventListener('click', function (ev) {
      const btn = ev.target.closest('[data-chip-placa]');
      if (!btn) return;
      $('#input-placa').value = formatarPlaca(btn.getAttribute('data-chip-placa'));
      $('#input-placa').focus();
    });
  }

  function iniciarPlaca() {
    const input = $('#input-placa');

    input.addEventListener('input', function () {
      const cursorNoFim = input.selectionStart === input.value.length;
      const limpo = normalizarPlaca(input.value);
      input.value = PLACA_REGEX_ANTIGA.test(limpo) ? formatarPlaca(limpo) : limpo;
      if (cursorNoFim) input.setSelectionRange(input.value.length, input.value.length);
      limparErro('input-placa');
      esconderAlerta('placa-alerta-erro');
    });

    $('#form-placa').addEventListener('submit', function (ev) {
      ev.preventDefault();
      buscarPlaca();
    });

    renderChipsPlacas();
  }

  function buscarPlaca() {
    const bruto = $('#input-placa').value;
    const placa = normalizarPlaca(bruto);

    limparErro('input-placa');
    esconderAlerta('placa-alerta-erro');
    esconderAlerta('placa-alerta-sucesso');
    $('#placa-resultado').classList.add('escondido');

    if (!placa) {
      marcarErro('input-placa', 'Informe a placa do veículo.');
      mostrarAlerta('placa-alerta-erro', 'Informe a placa do veículo para continuar.', 'erro');
      return;
    }
    if (!placaValida(placa)) {
      marcarErro('input-placa', 'Formato inválido. Use ABC-1234 ou ABC1D23.');
      mostrarAlerta('placa-alerta-erro', 'Placa em formato inválido.', 'erro');
      return;
    }

    const registro = findVehicleByPlate(placa);
    if (registro) {
      state.veiculoAtual = registro;
      state.placaPendente = '';
      mostrarVeiculoEncontrado(registro);
    } else {
      state.placaPendente = placa;
      abrirModalPlacaNaoIdentificada(placa);
    }
  }

  function mostrarVeiculoEncontrado(registro) {
    mostrarAlerta('placa-alerta-sucesso', 'Veículo identificado.', 'sucesso');
    const v = registro.veiculo || {};
    const c = registro.cliente || {};
    const box = $('#placa-resultado');

    box.innerHTML =
      '<div class="placa-visual" style="margin-top:20px">' +
      '<div class="placa-faixa">BRASIL</div>' +
      '<div class="placa-numero">' + escapar(formatarPlaca(registro.placa)) + '</div>' +
      '</div>' +
      '<div class="card">' +
      '<h3 class="card-titulo">' + icon('car') + 'Veículo identificado</h3>' +
      linhaDado('Cliente', c.nome) +
      linhaDado('Veículo', nomeVeiculo(registro)) +
      linhaDado('Ano', (v.anoFabricacao || '—') + '/' + (v.anoModelo || '—')) +
      linhaDado('Cor', v.cor) +
      linhaDado('Placa', formatarPlaca(registro.placa)) +
      '</div>' +
      '<button type="button" class="btn btn-primario" id="btn-avancar-dados" data-testid="continue-to-data">AVANÇAR</button>';

    box.classList.remove('escondido');
    $('#btn-avancar-dados').addEventListener('click', function () {
      showScreen('dados');
    });
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function abrirModalPlacaNaoIdentificada(placa) {
    abrirModal({
      testid: 'plate-not-found-modal',
      tipo: 'alerta',
      titulo: 'Placa não identificada',
      mensagem: 'Não encontramos um veículo cadastrado para esta placa. Deseja realizar um novo cadastro?',
      extraHTML: '<div class="modal-resumo">' + linhaDado('Placa informada', formatarPlaca(placa)) + '</div>',
      linha: true,
      botoes: [
        {
          texto: 'Cancelar', variante: 'secundario', testid: 'plate-not-found-cancel', acao: function () {
            mostrarAlerta('placa-alerta-erro', 'Nenhum veículo cadastrado para a placa ' + formatarPlaca(placa) + '.', 'erro');
          }
        },
        {
          texto: 'Cadastrar veículo', variante: 'primario', testid: 'plate-not-found-register', acao: function () {
            showScreen('cadastro');
          }
        }
      ]
    });
  }

  function linhaDado(rotulo, valor) {
    return '<div class="linha-dado"><span class="rotulo">' + escapar(rotulo) + '</span>' +
      '<span class="valor">' + escapar(valor || '—') + '</span></div>';
  }

  /* =======================================================
     11. CADASTRO DE CLIENTE E VEÍCULO
     ======================================================= */
  function preencherUFs() {
    const select = $('#cli-estado');
    UFS.forEach(function (uf) {
      const opt = document.createElement('option');
      opt.value = uf; opt.textContent = uf;
      select.appendChild(opt);
    });
  }

  function prepararTelaCadastro() {
    const form = $('#form-cadastro');
    limparErrosDoFormulario(form);
    esconderAlerta('cadastro-alerta');
    form.reset();
    if (state.placaPendente) $('#vei-placa').value = formatarPlaca(state.placaPendente);
  }

  const CAMPOS_OBRIGATORIOS = [
    { id: 'cli-nome', msg: 'Informe o nome completo do cliente.' },
    { id: 'cli-cpf', msg: 'Informe o CPF do cliente.' },
    { id: 'cli-telefone', msg: 'Informe o telefone do cliente.' },
    { id: 'vei-placa', msg: 'Informe a placa do veículo.' },
    { id: 'vei-marca', msg: 'Informe a marca do veículo.' },
    { id: 'vei-modelo', msg: 'Informe o modelo do veículo.' },
    { id: 'vei-ano-fab', msg: 'Informe o ano de fabricação.' },
    { id: 'vei-ano-mod', msg: 'Informe o ano do modelo.' },
    { id: 'vei-cor', msg: 'Informe a cor do veículo.' }
  ];

  function validarCadastro() {
    const form = $('#form-cadastro');
    limparErrosDoFormulario(form);
    const erros = [];

    CAMPOS_OBRIGATORIOS.forEach(function (campo) {
      const el = document.getElementById(campo.id);
      if (!el.value.trim()) { marcarErro(campo.id, campo.msg); erros.push(campo.id); }
    });

    const cpf = $('#cli-cpf').value.trim();
    if (cpf && !cpfValido(cpf)) { marcarErro('cli-cpf', 'CPF inválido. Confira os números digitados.'); erros.push('cli-cpf'); }

    const tel = somenteDigitos($('#cli-telefone').value);
    if (tel && tel.length < 10) { marcarErro('cli-telefone', 'Telefone incompleto.'); erros.push('cli-telefone'); }

    const email = $('#cli-email').value.trim();
    if (email && !emailValido(email)) { marcarErro('cli-email', 'E-mail inválido.'); erros.push('cli-email'); }

    const cep = somenteDigitos($('#cli-cep').value);
    if (cep && cep.length !== 8) { marcarErro('cli-cep', 'CEP incompleto.'); erros.push('cli-cep'); }

    const placa = normalizarPlaca($('#vei-placa').value);
    if (placa && !placaValida(placa)) { marcarErro('vei-placa', 'Formato inválido. Use ABC-1234 ou ABC1D23.'); erros.push('vei-placa'); }
    else if (placa && findVehicleByPlate(placa)) {
      marcarErro('vei-placa', 'Já existe um veículo cadastrado com esta placa.');
      erros.push('vei-placa');
    }

    const anoAtual = new Date().getFullYear();
    ['vei-ano-fab', 'vei-ano-mod'].forEach(function (id) {
      const v = Number(somenteDigitos(document.getElementById(id).value));
      if (v && (v < 1950 || v > anoAtual + 1)) {
        marcarErro(id, 'Ano deve estar entre 1950 e ' + (anoAtual + 1) + '.');
        erros.push(id);
      }
    });

    const renavam = somenteDigitos($('#vei-renavam').value);
    if (renavam && renavam.length < 9) { marcarErro('vei-renavam', 'RENAVAM deve ter ao menos 9 dígitos.'); erros.push('vei-renavam'); }

    const chassi = $('#vei-chassi').value.trim();
    if (chassi && chassi.length !== 17) { marcarErro('vei-chassi', 'O chassi deve ter 17 caracteres.'); erros.push('vei-chassi'); }

    return erros;
  }

  function iniciarCadastro() {
    preencherUFs();

    $('#vei-placa').addEventListener('input', function () {
      const limpo = normalizarPlaca(this.value);
      this.value = PLACA_REGEX_ANTIGA.test(limpo) ? formatarPlaca(limpo) : limpo;
    });

    $$('#form-cadastro input, #form-cadastro select').forEach(function (el) {
      el.addEventListener('input', function () { limparErro(el.id); });
      el.addEventListener('change', function () { limparErro(el.id); });
    });

    $('#form-cadastro').addEventListener('submit', function (ev) { ev.preventDefault(); });

    $('#btn-salvar-cadastro').addEventListener('click', function () {
      const erros = validarCadastro();
      if (erros.length) {
        mostrarAlerta('cadastro-alerta',
          erros.length === 1 ? 'Há 1 campo com problema. Revise o formulário.'
            : 'Há ' + erros.length + ' campos com problema. Revise o formulário.', 'erro');
        const primeiro = document.getElementById(erros[0]);
        if (primeiro) {
          primeiro.focus();
          primeiro.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      esconderAlerta('cadastro-alerta');

      const registro = {
        placa: normalizarPlaca($('#vei-placa').value),
        cliente: {
          nome: $('#cli-nome').value.trim(),
          cpf: $('#cli-cpf').value.trim(),
          nascimento: $('#cli-nascimento').value.trim(),
          telefone: $('#cli-telefone').value.trim(),
          email: $('#cli-email').value.trim(),
          cep: $('#cli-cep').value.trim(),
          endereco: $('#cli-endereco').value.trim(),
          numero: $('#cli-numero').value.trim(),
          cidade: $('#cli-cidade').value.trim(),
          estado: $('#cli-estado').value
        },
        veiculo: {
          marca: $('#vei-marca').value.trim(),
          modelo: $('#vei-modelo').value.trim(),
          versao: $('#vei-versao').value.trim(),
          anoFabricacao: Number(somenteDigitos($('#vei-ano-fab').value)),
          anoModelo: Number(somenteDigitos($('#vei-ano-mod').value)),
          cor: $('#vei-cor').value.trim(),
          renavam: $('#vei-renavam').value.trim(),
          chassi: $('#vei-chassi').value.trim().toUpperCase(),
          combustivel: $('#vei-combustivel').value
        },
        criadoEm: new Date().toISOString()
      };

      saveVehicle(registro);
      state.veiculoAtual = registro;
      state.placaPendente = '';

      toast('Veículo cadastrado com sucesso.', 'sucesso');
      showScreen('dados', { history: ['menu', 'vistoria', 'novo-checklist'] });
    });
  }

  /* =======================================================
     12. DADOS DA VISTORIA (KM)
     ======================================================= */
  function renderDados() {
    const registro = state.veiculoAtual;
    if (!registro) {
      showScreen('novo-checklist', { noHistory: true });
      return;
    }
    const c = registro.cliente || {};
    const v = registro.veiculo || {};

    $('#dados-conteudo').innerHTML =
      '<h2 class="titulo-tela">Dados da vistoria</h2>' +
      '<p class="subtitulo-tela">Confira as informações antes de iniciar o checklist.</p>' +
      '<h3 class="secao-titulo">Cliente</h3>' +
      '<div class="card" data-testid="customer-summary">' +
      '<h3 class="card-titulo">' + icon('user') + 'Dados do cliente</h3>' +
      linhaDado('Nome', c.nome) +
      linhaDado('CPF', c.cpf) +
      linhaDado('Telefone', c.telefone) +
      '</div>' +
      '<h3 class="secao-titulo">Veículo</h3>' +
      '<div class="card" data-testid="vehicle-summary">' +
      '<h3 class="card-titulo">' + icon('car') + 'Dados do veículo</h3>' +
      linhaDado('Placa', formatarPlaca(registro.placa)) +
      linhaDado('Marca', v.marca) +
      linhaDado('Modelo', v.modelo) +
      linhaDado('Ano', (v.anoFabricacao || '—') + '/' + (v.anoModelo || '—')) +
      linhaDado('Cor', v.cor) +
      '</div>';

    $('#input-km').value = state.kmAtual ? formatarKm(state.kmAtual) : '';
    limparErro('input-km');
  }

  function iniciarDados() {
    const input = $('#input-km');
    input.addEventListener('input', function () {
      input.value = MASCARAS.km(input.value);
      limparErro('input-km');
    });

    $('#btn-iniciar-checklist').addEventListener('click', function () {
      const bruto = input.value.trim();
      limparErro('input-km');

      if (!bruto) {
        marcarErro('input-km', 'Informe a quilometragem do veículo para continuar.');
        toast('Informe a quilometragem do veículo para continuar.', 'erro');
        input.focus();
        return;
      }
      const km = Number(somenteDigitos(bruto));
      if (!km || isNaN(km) || km <= 0) {
        marcarErro('input-km', 'Informe um número válido de quilômetros.');
        toast('Informe um número válido de quilômetros.', 'erro');
        input.focus();
        return;
      }

      state.kmAtual = km;
      if (!Object.keys(state.categoriasAbertas).length) state.categoriasAbertas = { identificacao: true };
      state.filtroPendentes = false;
      showScreen('checklist');
    });
  }

  /* =======================================================
     13. CHECKLIST
     ======================================================= */
  function resposta(itemId) {
    return state.respostas[itemId] || null;
  }

  function contarCategoria(cat) {
    let respondidos = 0, nok = 0;
    cat.itens.forEach(function (it) {
      const r = resposta(it[0]);
      if (r && r.status) {
        respondidos++;
        if (r.status === 'nok') nok++;
      }
    });
    return { respondidos: respondidos, total: cat.itens.length, nok: nok };
  }

  function contarTotais() {
    let ok = 0, nok = 0;
    TODOS_ITENS.forEach(function (it) {
      const r = resposta(it.id);
      if (!r || !r.status) return;
      if (r.status === 'ok') ok++; else if (r.status === 'nok') nok++;
    });
    return { ok: ok, nok: nok, respondidos: ok + nok, total: TOTAL_ITENS, pendentes: TOTAL_ITENS - ok - nok };
  }

  function itensPendentes() {
    return TODOS_ITENS.filter(function (it) {
      const r = resposta(it.id);
      return !r || !r.status;
    });
  }

  function itensNokSemObservacao() {
    return TODOS_ITENS.filter(function (it) {
      const r = resposta(it.id);
      return r && r.status === 'nok' && !String(r.obs || '').trim();
    });
  }

  function htmlItem(item) {
    const r = resposta(item.id) || {};
    const status = r.status || '';
    const obs = r.obs || '';
    const t = 'checklist-item-' + item.id;

    return '' +
      '<div class="item" id="item-' + item.id + '" data-item="' + item.id + '" data-status="' + status + '" data-testid="' + t + '">' +
      '<div class="item-topo">' +
      '<span class="item-status-bolinha" aria-hidden="true"></span>' +
      '<div><div class="item-nome">' + escapar(item.nome) + '</div>' +
      '<div class="item-desc">' + escapar(item.desc) + '</div></div>' +
      '</div>' +
      '<div class="item-acoes" role="group" aria-label="Situação do item ' + escapar(item.nome) + '">' +
      '<button type="button" class="btn-status' + (status === 'ok' ? ' ativo' : '') + '" data-valor="ok" ' +
      'aria-pressed="' + (status === 'ok') + '" data-testid="' + t + '-ok">' + icon('check') + 'OK</button>' +
      '<button type="button" class="btn-status' + (status === 'nok' ? ' ativo' : '') + '" data-valor="nok" ' +
      'aria-pressed="' + (status === 'nok') + '" data-testid="' + t + '-nok">' + icon('x') + 'NÃO OK</button>' +
      '</div>' +
      '<div class="item-obs' + (status === 'nok' ? '' : ' escondido') + '" data-obs="' + item.id + '">' +
      '<label for="obs-' + item.id + '">Descreva a irregularidade <span class="obrigatorio">*</span></label>' +
      '<textarea id="obs-' + item.id + '" data-testid="' + t + '-obs" ' +
      'placeholder="Ex.: Risco profundo no lado esquerdo.">' + escapar(obs) + '</textarea>' +
      '<p class="campo-erro">Informe a observação para concluir a vistoria.</p>' +
      '</div>' +
      '</div>';
  }

  function htmlCategoria(cat) {
    const c = contarCategoria(cat);
    const aberta = !!state.categoriasAbertas[cat.id];
    const completo = c.respondidos === c.total;

    return '' +
      '<div class="categoria' + (aberta ? ' aberta' : '') + (completo ? '' : ' tem-pendencia') + '" ' +
      'data-cat="' + cat.id + '" id="cat-' + cat.id + '">' +
      '<button type="button" class="categoria-header" data-toggle-cat="' + cat.id + '" ' +
      'aria-expanded="' + aberta + '" aria-controls="itens-' + cat.id + '" data-testid="category-' + cat.id + '">' +
      '<span class="cat-icone">' + icon(cat.icone) + '</span>' +
      '<span class="cat-info">' +
      '<span class="cat-nome">' + escapar(cat.nome) + '</span>' +
      '<span class="cat-contador' + (completo ? ' completo' : '') + '" id="contador-' + cat.id + '" data-testid="category-' + cat.id + '-counter">' +
      c.respondidos + ' de ' + c.total + ' concluídos</span>' +
      '</span>' +
      '<span class="cat-badge' + (c.nok ? '' : ' escondido') + '" id="badge-' + cat.id + '">' + c.nok + ' não OK</span>' +
      '<span class="chevron">' + icon('chevron-down') + '</span>' +
      '</button>' +
      '<div class="categoria-itens" id="itens-' + cat.id + '">' +
      cat.itens.map(function (it) {
        return htmlItem({ id: it[0], nome: it[1], desc: it[2] });
      }).join('') +
      '</div></div>';
  }

  function renderChecklist() {
    const registro = state.veiculoAtual;
    if (!registro || !state.kmAtual) {
      showScreen('novo-checklist', { noHistory: true });
      return;
    }

    $('#checklist-subtitulo').textContent =
      formatarPlaca(registro.placa) + ' · ' + nomeVeiculo(registro) + ' · ' + formatarKm(state.kmAtual) + ' km';

    $('#checklist-container').innerHTML = CHECKLIST.map(htmlCategoria).join('');
    aplicarFiltroPendentes();
    atualizarProgresso();
  }

  function atualizarProgresso() {
    const t = contarTotais();
    const pct = TOTAL_ITENS ? Math.round((t.respondidos / TOTAL_ITENS) * 100) : 0;

    $('#progresso-percentual').textContent = pct + '% concluído';
    $('#progresso-itens').textContent = t.respondidos + ' de ' + t.total + ' itens';
    $('#contador-ok').textContent = String(t.ok);
    $('#contador-nok').textContent = String(t.nok);
    $('#barra-preenchida').style.width = pct + '%';
    $('#barra-progresso').setAttribute('aria-valuenow', String(pct));
  }

  function atualizarCategoria(catId) {
    const cat = CHECKLIST.find(function (c) { return c.id === catId; });
    if (!cat) return;
    const c = contarCategoria(cat);
    const completo = c.respondidos === c.total;

    const contador = document.getElementById('contador-' + catId);
    if (contador) {
      contador.textContent = c.respondidos + ' de ' + c.total + ' concluídos';
      contador.classList.toggle('completo', completo);
    }
    const badge = document.getElementById('badge-' + catId);
    if (badge) {
      badge.textContent = c.nok + ' não OK';
      badge.classList.toggle('escondido', c.nok === 0);
    }
    const bloco = document.getElementById('cat-' + catId);
    if (bloco) bloco.classList.toggle('tem-pendencia', !completo);
  }

  function definirStatus(itemId, valor) {
    const atual = resposta(itemId);
    const novoStatus = (atual && atual.status === valor) ? '' : valor;

    if (!novoStatus) delete state.respostas[itemId];
    else state.respostas[itemId] = { status: novoStatus, obs: (atual && atual.obs) || '' };

    const itemEl = document.getElementById('item-' + itemId);
    if (itemEl) {
      itemEl.setAttribute('data-status', novoStatus);
      itemEl.classList.remove('destacado');
      $$('.btn-status', itemEl).forEach(function (b) {
        const ativo = b.getAttribute('data-valor') === novoStatus;
        b.classList.toggle('ativo', ativo);
        b.setAttribute('aria-pressed', String(ativo));
      });
      const obsBox = $('[data-obs]', itemEl);
      if (obsBox) {
        obsBox.classList.toggle('escondido', novoStatus !== 'nok');
        obsBox.classList.remove('erro');
        if (novoStatus === 'nok') {
          const ta = $('textarea', obsBox);
          if (ta) setTimeout(function () { ta.focus(); }, 60);
        }
      }
    }

    const item = MAPA_ITENS[itemId];
    if (item) atualizarCategoria(item.categoria);
    atualizarProgresso();
  }

  function aplicarFiltroPendentes() {
    const box = $('#filtro-pendentes');
    box.classList.toggle('visivel', state.filtroPendentes);

    CHECKLIST.forEach(function (cat) {
      const el = document.getElementById('cat-' + cat.id);
      if (!el) return;
      const c = contarCategoria(cat);
      const temPendencia = c.respondidos < c.total;
      if (state.filtroPendentes) {
        el.classList.toggle('escondido', !temPendencia);
      } else {
        el.classList.remove('escondido');
      }
    });

    if (state.filtroPendentes) {
      const pend = itensPendentes().length;
      $('#filtro-pendentes-texto').textContent =
        'Exibindo apenas categorias com pendências (' + pend + ' ' + (pend === 1 ? 'item' : 'itens') + ').';
    }
  }

  function verPendencias() {
    state.filtroPendentes = true;
    CHECKLIST.forEach(function (cat) {
      const c = contarCategoria(cat);
      const temPendencia = c.respondidos < c.total;
      state.categoriasAbertas[cat.id] = temPendencia;
      const el = document.getElementById('cat-' + cat.id);
      if (el) {
        el.classList.toggle('aberta', temPendencia);
        const h = $('.categoria-header', el);
        if (h) h.setAttribute('aria-expanded', String(temPendencia));
      }
    });
    aplicarFiltroPendentes();

    const primeiro = itensPendentes()[0];
    if (primeiro) {
      const el = document.getElementById('item-' + primeiro.id);
      if (el) {
        el.classList.add('destacado');
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  function destacarObservacoesFaltantes(lista) {
    lista.forEach(function (item) {
      const itemEl = document.getElementById('item-' + item.id);
      if (!itemEl) return;
      const obsBox = $('[data-obs]', itemEl);
      if (obsBox) obsBox.classList.add('erro');
      itemEl.classList.add('destacado');
      state.categoriasAbertas[item.categoria] = true;
      const catEl = document.getElementById('cat-' + item.categoria);
      if (catEl) {
        catEl.classList.add('aberta');
        catEl.classList.remove('escondido');
        const h = $('.categoria-header', catEl);
        if (h) h.setAttribute('aria-expanded', 'true');
      }
    });

    const primeiro = lista[0] && document.getElementById('obs-' + lista[0].id);
    if (primeiro) {
      primeiro.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(function () { primeiro.focus(); }, 320);
    }
  }

  function iniciarChecklist() {
    const container = $('#checklist-container');

    container.addEventListener('click', function (ev) {
      const cabecalho = ev.target.closest('[data-toggle-cat]');
      if (cabecalho) {
        const catId = cabecalho.getAttribute('data-toggle-cat');
        const bloco = document.getElementById('cat-' + catId);
        const aberta = !bloco.classList.contains('aberta');
        bloco.classList.toggle('aberta', aberta);
        cabecalho.setAttribute('aria-expanded', String(aberta));
        state.categoriasAbertas[catId] = aberta;
        return;
      }

      const btnStatus = ev.target.closest('.btn-status');
      if (btnStatus) {
        const itemEl = btnStatus.closest('[data-item]');
        if (!itemEl) return;
        definirStatus(itemEl.getAttribute('data-item'), btnStatus.getAttribute('data-valor'));
      }
    });

    container.addEventListener('input', function (ev) {
      const ta = ev.target;
      if (ta.tagName !== 'TEXTAREA') return;
      const itemEl = ta.closest('[data-item]');
      if (!itemEl) return;
      const itemId = itemEl.getAttribute('data-item');
      const r = state.respostas[itemId];
      if (r) r.obs = ta.value;
      const box = ta.closest('[data-obs]');
      if (box && ta.value.trim()) box.classList.remove('erro');
    });

    $('#btn-limpar-filtro').addEventListener('click', function () {
      state.filtroPendentes = false;
      aplicarFiltroPendentes();
    });

    $('#btn-concluir-vistoria').addEventListener('click', concluirVistoria);
  }

  function concluirVistoria() {
    const pendentes = itensPendentes();
    if (pendentes.length) {
      abrirModal({
        testid: 'incomplete-checklist-modal',
        tipo: 'alerta',
        titulo: 'Checklist incompleto',
        mensagem: 'Ainda existem itens que precisam ser avaliados.',
        extraHTML: '<div class="modal-resumo">' +
          linhaDado('Itens pendentes', pendentes.length + (pendentes.length === 1 ? ' item' : ' itens')) +
          linhaDado('Itens avaliados', (TOTAL_ITENS - pendentes.length) + ' de ' + TOTAL_ITENS) +
          '</div>',
        botoes: [
          { texto: 'VER PENDÊNCIAS', variante: 'primario', testid: 'incomplete-view-pending', acao: verPendencias },
          { texto: 'VOLTAR AO CHECKLIST', variante: 'secundario', testid: 'incomplete-back' }
        ]
      });
      return;
    }

    const semObs = itensNokSemObservacao();
    if (semObs.length) {
      abrirModal({
        testid: 'missing-observation-modal',
        tipo: 'erro',
        titulo: 'Observação obrigatória',
        mensagem: 'Itens marcados como NÃO OK precisam de uma observação descrevendo a irregularidade.',
        extraHTML: '<div class="modal-resumo">' +
          linhaDado('Itens sem observação', String(semObs.length)) +
          linhaDado('Primeiro item', semObs[0].nome) +
          '</div>',
        botoes: [
          {
            texto: 'REVISAR ITENS', variante: 'primario', testid: 'missing-observation-review',
            acao: function () { destacarObservacoesFaltantes(semObs); }
          }
        ]
      });
      return;
    }

    const registro = state.veiculoAtual;
    const totais = contarTotais();
    const agora = new Date().toISOString();

    const atendimento = {
      id: gerarId(),
      protocolo: gerarProtocolo(),
      criadoEm: agora,
      placa: registro.placa,
      cliente: JSON.parse(JSON.stringify(registro.cliente || {})),
      veiculo: JSON.parse(JSON.stringify(registro.veiculo || {})),
      km: state.kmAtual,
      status: 'Concluído',
      vistoriador: state.usuario || CREDENCIAIS.usuario,
      totalItens: totais.total,
      itensOk: totais.ok,
      itensNok: totais.nok,
      respostas: JSON.parse(JSON.stringify(state.respostas))
    };

    saveAppointment(atendimento);
    abrirModalSucesso(atendimento);
  }

  function abrirModalSucesso(atendimento) {
    abrirModal({
      testid: 'success-modal',
      tipo: 'sucesso',
      titulo: 'Vistoria concluída!',
      mensagem: 'O checklist do veículo foi registrado com sucesso.',
      extraHTML: '<div class="modal-resumo" data-testid="success-summary">' +
        linhaDado('Protocolo', atendimento.protocolo) +
        linhaDado('Placa', formatarPlaca(atendimento.placa)) +
        linhaDado('Veículo', [atendimento.veiculo.marca, atendimento.veiculo.modelo].filter(Boolean).join(' ')) +
        linhaDado('KM', formatarKm(atendimento.km) + ' km') +
        linhaDado('Itens avaliados', '100%') +
        linhaDado('Não conformidades', String(atendimento.itensNok)) +
        '</div>',
      botoes: [
        {
          texto: 'VOLTAR AO MENU', variante: 'sucesso', testid: 'success-back-menu', acao: function () {
            limparVistoriaEmAndamento();
            showScreen('menu', { reset: true });
            toast('Atendimento ' + atendimento.protocolo + ' salvo.', 'sucesso');
          }
        },
        {
          texto: 'VER DETALHES', variante: 'secundario', testid: 'success-view-details', acao: function () {
            limparVistoriaEmAndamento();
            state.atendimentoAberto = atendimento.id;
            showScreen('detalhes', { history: ['menu', 'vistoria', 'atendimentos'] });
            renderDetalhes(atendimento.id);
          }
        }
      ]
    });
  }

  /* =======================================================
     14. CONSULTA DE ATENDIMENTOS
     ======================================================= */
  function htmlCardAtendimento(a) {
    const dh = formatarDataHora(a.criadoEm);
    const temNok = a.itensNok > 0;
    return '' +
      '<button type="button" class="atendimento-card" data-atendimento="' + a.id + '" ' +
      'data-testid="appointment-card" data-plate="' + escapar(a.placa) + '">' +
      '<div class="at-topo">' +
      '<span class="at-placa">' + escapar(formatarPlaca(a.placa)) + '</span>' +
      '<span class="badge ' + (temNok ? 'badge-erro' : 'badge-sucesso') + '">' +
      (temNok ? a.itensNok + ' não conformidade' + (a.itensNok > 1 ? 's' : '') : 'Sem apontamentos') + '</span>' +
      '</div>' +
      '<div class="at-cliente">' + escapar(a.cliente.nome || '—') + '</div>' +
      '<div class="at-veiculo">' + escapar([a.veiculo.marca, a.veiculo.modelo].filter(Boolean).join(' ')) + '</div>' +
      '<div class="at-meta">' +
      '<span>' + icon('calendar') + dh.data + '</span>' +
      '<span>' + icon('clock') + dh.hora + '</span>' +
      '<span>' + icon('gauge') + formatarKm(a.km) + ' km</span>' +
      '<span class="badge badge-neutro">' + escapar(a.status) + '</span>' +
      '</div>' +
      '</button>';
  }

  function renderAtendimentos(termoBusca) {
    const lista = getAppointments();
    const box = $('#atendimentos-lista');
    const busca = $('#busca-wrapper');
    const termo = String(termoBusca === undefined ? $('#input-busca-atendimentos').value : termoBusca).trim().toLowerCase();

    $('#atendimentos-subtitulo').textContent =
      lista.length ? lista.length + (lista.length === 1 ? ' vistoria realizada' : ' vistorias realizadas') : 'Vistorias realizadas';

    if (!lista.length) {
      busca.classList.add('escondido');
      box.innerHTML =
        '<div class="estado-vazio" data-testid="empty-appointments">' +
        '<div class="ev-icone">' + icon('inbox') + '</div>' +
        '<h3>Nenhum atendimento encontrado</h3>' +
        '<p>As vistorias concluídas aparecerão aqui.</p>' +
        '<button type="button" class="btn btn-primario" id="btn-vazio-novo-checklist" data-testid="empty-new-checklist">NOVO CHECKLIST</button>' +
        '</div>';
      $('#btn-vazio-novo-checklist').addEventListener('click', function () {
        limparVistoriaEmAndamento();
        showScreen('novo-checklist');
      });
      return;
    }

    busca.classList.remove('escondido');

    const filtrados = !termo ? lista : lista.filter(function (a) {
      const alvo = [a.placa, formatarPlaca(a.placa), a.cliente.nome, a.veiculo.marca, a.veiculo.modelo, a.protocolo]
        .filter(Boolean).join(' ').toLowerCase();
      return alvo.indexOf(termo) !== -1;
    });

    if (!filtrados.length) {
      box.innerHTML =
        '<div class="estado-vazio" data-testid="no-search-results">' +
        '<div class="ev-icone">' + icon('search') + '</div>' +
        '<h3>Nenhum resultado para "' + escapar(termo) + '"</h3>' +
        '<p>Revise o termo digitado ou limpe a busca para ver todos os atendimentos.</p>' +
        '<button type="button" class="btn btn-secundario" id="btn-limpar-busca" data-testid="clear-search">LIMPAR BUSCA</button>' +
        '</div>';
      $('#btn-limpar-busca').addEventListener('click', function () {
        $('#input-busca-atendimentos').value = '';
        renderAtendimentos('');
      });
      return;
    }

    box.innerHTML = filtrados.map(htmlCardAtendimento).join('');
  }

  function entrarAtendimentos() {
    const busca = $('#input-busca-atendimentos');
    if (busca) busca.value = '';
    renderAtendimentos('');
  }

  function iniciarAtendimentos() {
    $('#input-busca-atendimentos').addEventListener('input', function () {
      renderAtendimentos(this.value);
    });

    $('#atendimentos-lista').addEventListener('click', function (ev) {
      const card = ev.target.closest('[data-atendimento]');
      if (!card) return;
      const id = card.getAttribute('data-atendimento');
      state.atendimentoAberto = id;
      showScreen('detalhes');
      renderDetalhes(id);
    });

    $('#btn-voltar-lista').addEventListener('click', function () {
      showScreen('atendimentos', { noHistory: true });
      state.history = ['menu', 'vistoria'];
    });
  }

  /* =======================================================
     15. DETALHES DO ATENDIMENTO
     ======================================================= */
  function renderDetalhes(id) {
    const a = findAppointmentById(id || state.atendimentoAberto);
    const box = $('#detalhes-conteudo');
    if (!a) {
      box.innerHTML = '<div class="estado-vazio"><div class="ev-icone">' + icon('alert') + '</div>' +
        '<h3>Atendimento não encontrado</h3><p>Este registro não está mais disponível.</p></div>';
      $('#detalhes-subtitulo').textContent = '—';
      return;
    }

    const dh = formatarDataHora(a.criadoEm);
    const c = a.cliente || {};
    const v = a.veiculo || {};
    $('#detalhes-subtitulo').textContent = a.protocolo + ' · ' + formatarPlaca(a.placa);

    let html =
      '<div class="card" data-testid="details-customer">' +
      '<h3 class="card-titulo">' + icon('user') + 'Cliente</h3>' +
      linhaDado('Nome', c.nome) + linhaDado('CPF', c.cpf) + linhaDado('Telefone', c.telefone) +
      (c.email ? linhaDado('E-mail', c.email) : '') +
      '</div>' +

      '<div class="card" data-testid="details-vehicle">' +
      '<h3 class="card-titulo">' + icon('car') + 'Veículo</h3>' +
      linhaDado('Placa', formatarPlaca(a.placa)) +
      linhaDado('Marca', v.marca) + linhaDado('Modelo', v.modelo) +
      (v.versao ? linhaDado('Versão', v.versao) : '') +
      linhaDado('Ano', (v.anoFabricacao || '—') + '/' + (v.anoModelo || '—')) +
      linhaDado('Cor', v.cor) +
      (v.chassi ? linhaDado('Chassi', v.chassi) : '') +
      '</div>' +

      '<div class="card" data-testid="details-inspection">' +
      '<h3 class="card-titulo">' + icon('file-check') + 'Vistoria</h3>' +
      linhaDado('Protocolo', a.protocolo) +
      linhaDado('KM informado', formatarKm(a.km) + ' km') +
      linhaDado('Data/hora', dh.data + ' ' + dh.hora) +
      linhaDado('Vistoriador', a.vistoriador) +
      linhaDado('Status', a.status) +
      '</div>' +

      '<h3 class="secao-titulo">Resumo</h3>' +
      '<div class="resumo-grid" data-testid="details-summary">' +
      '<div class="resumo-box"><strong>' + a.totalItens + '</strong><span>itens</span></div>' +
      '<div class="resumo-box ok"><strong data-testid="details-ok-count">' + a.itensOk + '</strong><span>OK</span></div>' +
      '<div class="resumo-box nok"><strong data-testid="details-nok-count">' + a.itensNok + '</strong><span>não OK</span></div>' +
      '</div>' +

      '<h3 class="secao-titulo">Checklist</h3>';

    CHECKLIST.forEach(function (cat) {
      html += '<div class="det-categoria"><h4>' + escapar(cat.nome) + '</h4><div class="card">';
      cat.itens.forEach(function (it) {
        const r = (a.respostas || {})[it[0]] || {};
        const st = r.status === 'nok' ? 'nok' : 'ok';
        html += '<div class="det-item ' + st + '" data-testid="details-item-' + it[0] + '">' +
          '<span class="det-icone">' + icon(st === 'ok' ? 'check-circle' : 'alert') + '</span>' +
          '<span class="det-nome">' + escapar(it[1]) +
          (st === 'nok' && r.obs ? '<span class="det-obs">' + escapar(r.obs) + '</span>' : '') +
          '</span>' +
          '<span class="det-status">' + (st === 'ok' ? 'OK' : 'NÃO OK') + '</span>' +
          '</div>';
      });
      html += '</div></div>';
    });

    box.innerHTML = html;
    box.scrollTop = 0;
  }

  /* =======================================================
     16. INICIALIZAÇÃO
     ======================================================= */
  function montarIcones() {
    $$('[data-icone]').forEach(function (el) {
      el.innerHTML = icon(el.getAttribute('data-icone'));
    });
    $$('[data-back]').forEach(function (el) {
      el.innerHTML = icon('arrow-left');
    });
    $('#btn-sair').innerHTML = icon('logout');
  }

  function atualizarRelogio() {
    const d = new Date();
    const p = function (n) { return String(n).padStart(2, '0'); };
    const el = $('#status-hora');
    if (el) el.textContent = p(d.getHours()) + ':' + p(d.getMinutes());
  }

  function iniciarGlobais() {
    document.addEventListener('click', function (ev) {
      if (ev.target.closest('[data-back]')) goBack();
    });

    $('#modal-overlay').addEventListener('click', function (ev) {
      if (ev.target === this && modalAberto && modalAberto.fecharAoClicarFora !== false) {
        // modais de decisão exigem escolha explícita; só fecha os informativos
        const botoes = modalAberto.botoes || [];
        if (botoes.length <= 1) fecharModal();
      }
    });

    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && modalAberto) {
        const botoes = modalAberto.botoes || [];
        if (botoes.length <= 1) fecharModal();
      }
    });
  }

  function init() {
    seedDados(false);
    montarIcones();
    atualizarRelogio();
    setInterval(atualizarRelogio, 30000);

    aplicarMascaras();
    iniciarGlobais();
    iniciarLogin();
    iniciarMenu();
    iniciarPlaca();
    iniciarCadastro();
    iniciarDados();
    iniciarChecklist();
    iniciarAtendimentos();

    setTimeout(function () {
      showScreen('login', { reset: true });
      const u = $('#login-usuario');
      if (u) u.focus();
    }, 1500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* Exposto para automação de testes (Cypress/Playwright/console) */
  window.MobatoQA = {
    showScreen: showScreen,
    getVehicles: getVehicles,
    saveVehicle: saveVehicle,
    findVehicleByPlate: findVehicleByPlate,
    getAppointments: getAppointments,
    saveAppointment: saveAppointment,
    clearTestData: function () { clearTestData(); atualizarMenu(); },
    state: state,
    CHECKLIST: CHECKLIST,
    TOTAL_ITENS: TOTAL_ITENS,
    preencherChecklist: function (statusPadrao) {
      // atalho de QA: responde todos os itens (use 'ok' ou 'nok')
      const valor = statusPadrao === 'nok' ? 'nok' : 'ok';
      TODOS_ITENS.forEach(function (it) {
        state.respostas[it.id] = { status: valor, obs: valor === 'nok' ? 'Preenchido via atalho de QA.' : '' };
      });
      if (state.screen === 'checklist') renderChecklist();
    }
  };
})();
