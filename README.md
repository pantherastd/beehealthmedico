# BeeHealth — Protótipo de Onboarding do Médico Parceiro

Protótipo clicável (HTML/CSS/JS puro, sem build) simulando a jornada do **médico parceiro**
na BeeHealth, do primeiro contato com o app até a aprovação de uma solicitação de receita.

## Como abrir

Basta abrir `index.html` no navegador (duplo clique ou arrastar para o Chrome/Edge).
Não precisa de servidor, build ou internet.

## Escopo (US 1.0 → US 1.2)

1. **Splash** e **Onboarding** (3 telas) — pixel-referenciadas do Figma real do projeto
   (arquivo "Beehealth Jul/26", página "Prototipo"): tema escuro, foto do médico, ícones
   e textos oficiais. Sem transição automática — avança só com o toque nos botões
   ("Quero ser um parceiro" / "Avançar" / "Pular" / "Começar"), igual ao Figma.
2. **US 1.1 — Cadastro do médico** — formulário (nome, CRM, especialidade, telefone) → tela de sucesso
   (tema claro — ainda não há referência no Figma para essa etapa)
4. **Painel** — estado vazio; a notificação de nova solicitação só aparece na primeira vez que o
   médico chega ao painel logo após concluir o cadastro (não é reexibida em navegações posteriores)
5. **US 1.2 — Chat da solicitação** — dados da paciente, Aprovar/Recusar, e a escolha
   "Agendar horário" (com slots) ou "Iniciar agora" (mini tela de chamada simulada)
6. **US 1.5 — Status/timeline** do encaminhamento, fechando a demonstração

O fluxo para logo após a decisão de telemedicina — envio de protocolo (US 1.4) e
agendamento da infusão ficam para a próxima iteração do protótipo.

## Identidade visual

Cores e marcas extraídas dos arquivos reais em `../id visual/` e do Figma do projeto:
- Azul primário `#4a5cff`, navy `#1b1d2e`, lavanda de apoio `#a5acfb`
- Ícone hexagonal (abelha estilizada) e wordmark "beehealth."
- Splash/Onboarding usam ainda: roxo-azulado `#404fd5` (card), cream `#fff7ed` (títulos),
  lavanda clara `#c9cddf` (eyebrow) e cinza `#c0c0c0` ("Pular")

Tipografia: **Rockwell** (regular 400 + bold 700), self-hosted via `@font-face` em
`css/styles.css` a partir de `assets/fonts/`. Pesos declarados como 800 no CSS (títulos)
caem na face 700 — não há um arquivo Black/Extrabold; se ele for adicionado depois,
crie um novo `@font-face` com `font-weight:800` apontando pra ele.

Os gradientes de fundo das telas escuras (Splash/Onboarding) são uma aproximação em CSS
puro dos gradientes radiais do Figma (que usavam SVG com matrizes de transformação) —
visualmente equivalentes, mas não byte-a-byte idênticos.

## Estrutura

```
prototipo-onboarding-medico/
├── index.html
├── css/styles.css
├── js/app.js
├── assets/
│   ├── icone-beehealth.svg
│   ├── logo-beehealth.png        (wordmark navy, para fundos claros)
│   ├── onboarding/                (baixados do Figma)
│   │   ├── doctor-splash.jpg
│   │   ├── logo-on-dark.png      (wordmark cream, para fundos escuros)
│   │   ├── icon-injection.svg
│   │   ├── icon-nurse.svg
│   │   └── icon-checkup.svg
│   └── fonts/
│       ├── Rockwell-Regular.ttf
│       └── Rockwell-Bold.ttf
└── README.md
```
