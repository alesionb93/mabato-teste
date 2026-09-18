# Mobato — Vistoria Veicular (sandbox de QA)

Simulação de aplicativo mobile de vistoria veicular, feita em HTML5, CSS3 e JavaScript puro.
Nenhum framework, nenhum backend, nenhuma API externa. Todos os dados ficam no `localStorage`.

---

## Como executar

Abra o `index.html` no navegador. Não é necessário servidor local.

Também está incluído o `mobato-vistoria-single-file.html`, que traz CSS e JS embutidos em um único
arquivo — útil para anexar em um chamado, enviar por e-mail ou subir em qualquer hospedagem estática.

> Observação: por padrão os navegadores liberam `localStorage` em `file://`. Se o seu ambiente bloquear,
> a aplicação continua funcionando normalmente, apenas sem persistir entre recarregamentos. Para persistência
> garantida, sirva a pasta com `python3 -m http.server 8080` e acesse `http://localhost:8080`.

---

## Credenciais de teste

| Campo   | Valor         |
|---------|---------------|
| Usuário | `vistoriador` |
| Senha   | `123456`      |

Qualquer outra combinação retorna "Usuário ou senha inválidos."

---

## Placas mockadas

| Placa     | Cliente        | Veículo                | Ano  | Cor    |
|-----------|----------------|------------------------|------|--------|
| `ABC1D23` | João da Silva  | Toyota Corolla XEi     | 2022 | Prata  |
| `BRA2E19` | Maria Oliveira | Honda Civic Touring    | 2021 | Preto  |
| `XYZ1234` | Carlos Souza   | Volkswagen T-Cross     | 2023 | Branco |
| `QWE9Z99` | —              | não cadastrada (usar para testar o fluxo de cadastro) |

A tela de placa exibe atalhos clicáveis com essas quatro placas.
São aceitos os padrões antigo (`ABC-1234`) e Mercosul (`ABC1D23`); o campo converte para maiúsculas
e descarta caracteres inválidos automaticamente.

---

## Estrutura do projeto

```
index.html   → marcação das 10 telas da SPA, modais e área de toasts
style.css    → tokens de cor, moldura de celular, componentes e estados visuais
app.js       → estado, navegação, validações, máscaras, checklist e persistência
mobato-vistoria-single-file.html → build único com tudo embutido
```

O `app.js` está dividido em blocos comentados: ícones, dados mockados, estado, persistência,
utilitários, toasts/modais, navegação, autenticação, menu, placa, cadastro, dados da vistoria,
checklist, atendimentos, detalhes e inicialização.

---

## Fluxos principais

**Fluxo da vistoria**

```
Splash → Login → Menu → Vistoria → Novo Checklist → Placa
   ├─ placa encontrada  → Dados da vistoria → KM → Checklist → Sucesso → Menu
   └─ placa desconhecida → Modal → Novo cadastro → Dados da vistoria → KM → Checklist → Sucesso → Menu
```

**Fluxo de consulta**

```
Menu → Vistoria → Consultar Atendimentos
   ├─ com registros → lista de cards → detalhes do atendimento
   └─ sem registros → estado vazio com atalho para Novo Checklist
```

O checklist tem **125 itens em 11 categorias** (identificação, carroceria, pintura, vidros, iluminação,
rodas e pneus, mecânica, interior, elétricos, equipamentos e testes gerais), organizados em accordions
com contador por categoria e barra de progresso geral.

---

## Regras de negócio para testar

- Login bloqueia campos vazios e credenciais erradas, com mensagem inline.
- Menu: apenas **Vistoria** funciona; os demais cards abrem o modal "Funcionalidade disponível apenas na versão completa."
- A placa é obrigatória e valida o formato antes de consultar.
- Placa desconhecida abre o modal "Placa não identificada" com as opções Cancelar e Cadastrar veículo.
- No cadastro, os campos com `*` são obrigatórios; há ainda validação de dígito verificador do CPF,
  formato de e-mail, CEP completo, telefone completo, faixa de ano (1950 até o ano seguinte),
  RENAVAM com ao menos 9 dígitos, chassi com 17 caracteres e placa duplicada.
- O KM é obrigatório e precisa ser numérico. Sem ele, o checklist não abre.
- "CONCLUIR VISTORIA" com itens em branco abre o modal "Checklist incompleto", com a contagem de
  pendências e o botão **VER PENDÊNCIAS**, que filtra e expande apenas as categorias incompletas.
- Marcar um item como **NÃO OK** revela o campo de observação, que passa a ser obrigatório.
  Tentar concluir sem preencher abre o modal "Observação obrigatória" e destaca os itens.
- Ao concluir, o modal de sucesso mostra protocolo, placa, veículo, KM, percentual e não conformidades,
  e o atendimento é gravado no `localStorage`.

---

## Atributos de teste (`data-testid`)

Principais identificadores disponíveis:

| Área | `data-testid` |
|------|---------------|
| Login | `login-username`, `login-password`, `login-submit`, `login-error`, `login-forgot` |
| Menu | `menu-vistoria`, `menu-clientes`, `menu-veiculos`, `menu-relatorios`, `menu-configuracoes`, `stat-appointments`, `stat-vehicles`, `clear-data`, `logout` |
| Operação | `option-new-checklist`, `option-appointments` |
| Placa | `plate-input`, `plate-submit`, `plate-input-error`, `plate-error-banner`, `vehicle-found`, `plate-result`, `continue-to-data` |
| Placa não encontrada | `plate-not-found-modal`, `plate-not-found-cancel`, `plate-not-found-register` |
| Cadastro | `customer-name`, `customer-cpf`, `customer-phone`, `customer-email`, `customer-zip`, `customer-city`, `customer-state`, `vehicle-plate`, `vehicle-brand`, `vehicle-model`, `vehicle-manufacture-year`, `vehicle-model-year`, `vehicle-color`, `vehicle-renavam`, `vehicle-chassis`, `vehicle-fuel`, `registration-submit`, `registration-error` |
| Dados | `km-input`, `km-error`, `start-checklist`, `customer-summary`, `vehicle-summary` |
| Checklist | `checklist-container`, `category-<categoria>`, `category-<categoria>-counter`, `checklist-item-<item>`, `checklist-item-<item>-ok`, `checklist-item-<item>-nok`, `checklist-item-<item>-obs`, `progress-percent`, `progress-count`, `finish-checklist` |
| Modais do checklist | `incomplete-checklist-modal`, `incomplete-view-pending`, `incomplete-back`, `missing-observation-modal`, `missing-observation-review` |
| Sucesso | `success-modal`, `success-summary`, `success-back-menu`, `success-view-details` |
| Atendimentos | `appointments-list`, `appointments-search`, `appointment-card`, `empty-appointments`, `empty-new-checklist`, `no-search-results`, `clear-search` |
| Detalhes | `details-customer`, `details-vehicle`, `details-inspection`, `details-summary`, `details-ok-count`, `details-nok-count`, `details-item-<item>`, `details-back-list` |

Os identificadores de item usam slugs previsíveis, por exemplo `checklist-item-hood` (capô),
`checklist-item-front-bumper` (para-choque dianteiro) e `checklist-item-windshield` (para-brisa).

---

## Limpar o localStorage

Na base do Menu há o link discreto **Limpar dados de teste**, que pede confirmação antes de apagar.
A limpeza remove veículos cadastrados e atendimentos e restaura as três placas mockadas.

Pelo console do navegador também é possível:

```js
MobatoQA.clearTestData();         // restaura o estado inicial
MobatoQA.getVehicles();           // lista de veículos
MobatoQA.getAppointments();       // lista de atendimentos
MobatoQA.findVehicleByPlate('ABC1D23');
MobatoQA.showScreen('checklist'); // navegação direta
MobatoQA.preencherChecklist('ok');// responde os 125 itens de uma vez
```

As chaves usadas são `mobato:veiculos`, `mobato:atendimentos`, `mobato:seed` e `mobato:sessao`.

---

## Cenários de teste cobertos

1. Login válido → Menu principal
2. Login inválido → mensagem de erro
3. Login com campos vazios → erros inline
4. Acessar Vistoria → tela de seleção de operação
5. Placa existente (`ABC1D23`) → "Veículo identificado" com os dados
6. Placa inexistente (`QWE9Z99`) → modal "Placa não identificada"
7. Placa em formato inválido → erro no campo
8. Cancelar o modal de placa → permanece na tela com aviso
9. Cadastrar cliente e veículo → validações e persistência
10. Tentar iniciar o checklist sem KM → avanço bloqueado
11. KM não numérico → avanço bloqueado
12. Preencher KM → checklist aberto com 125 itens
13. Marcar item como OK / NÃO OK → estados visuais e progresso
14. Item NÃO OK → observação obrigatória
15. Concluir checklist incompleto → modal com contagem e "VER PENDÊNCIAS"
16. Concluir checklist completo → modal de sucesso
17. Voltar ao menu → contadores atualizados
18. Consultar atendimentos com registros → lista de cards e detalhes
19. Buscar atendimento inexistente → estado de busca sem resultado
20. Consultar atendimentos sem registros → estado vazio com atalho
21. Limpar dados de teste → confirmação e restauração
22. Navegação com o botão voltar em todas as telas internas
