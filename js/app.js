const ORDER = ['s-splash1','s-onb1','s-onb2','s-onb3','s-cadastro','s-cadastro-ok','s-home','s-chat','s-status'];
const DARK_SCENES = ['s-splash1','s-onb1','s-onb2','s-onb3'];

function updateProgress(id){
  const idx = ORDER.indexOf(id);
  const pct = idx<0 ? 0 : Math.round(((idx+1)/ORDER.length)*100);
  document.getElementById('progressFill').style.width = pct+'%';
}

function goTo(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  const target = document.getElementById(id);
  target.classList.add('active');
  target.scrollTop = 0;
  updateProgress(id);
  hideToast();
  document.getElementById('app').classList.toggle('dark-active', DARK_SCENES.includes(id));
}

function finishCadastroToHome(){
  goTo('s-home');
  scheduleNotification();
}

function submitCadastro(){
  const nome = document.getElementById('f-nome').value.trim() || 'Dra. Camila Ferreira';
  const esp = document.getElementById('f-esp').value;
  const initials = nome.replace(/^Dr\.?a?\.?\s*/i,'').split(' ').filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase() || 'CF';
  document.getElementById('home-name').textContent = nome;
  document.getElementById('home-esp').textContent = esp;
  document.getElementById('home-avatar').textContent = initials;
  goTo('s-cadastro-ok');
}

let notifTimer = null;
function scheduleNotification(){
  document.getElementById('home-empty').style.display='flex';
  if(notifTimer) clearTimeout(notifTimer);
  notifTimer = setTimeout(()=>{
    document.getElementById('toast').classList.add('show');
    document.getElementById('bell-dot').style.display='block';
  }, 1600);
}
function hideToast(){ document.getElementById('toast').classList.remove('show'); }
function onToastTap(){ hideToast(); goTo('s-chat'); }

function scrollChatToBottom(){
  const log = document.getElementById('chatLog');
  log.scrollTop = log.scrollHeight;
}
function appendMsg(html, cls){
  const el = document.createElement('div');
  el.className = 'msg '+cls;
  el.innerHTML = html;
  document.getElementById('chatLog').appendChild(el);
  scrollChatToBottom();
  return el;
}
function appendNode(node){
  document.getElementById('chatLog').appendChild(node);
  scrollChatToBottom();
}

function recusarCaso(){
  document.getElementById('chat-decision-1').remove();
  appendMsg('Recusado — a solicitação será direcionada a outro médico da rede.', 'me');
  setTimeout(()=>appendMsg('Tudo bem! Você pode voltar ao painel a qualquer momento.', 'sys'), 400);
}

function aprovarCaso(){
  document.getElementById('chat-decision-1').remove();
  appendMsg('Aprovado ✓', 'me');
  setTimeout(()=>{
    appendMsg('Ótimo! Como você prefere atender a Dona Ana?', 'sys');
    const row = document.createElement('div');
    row.className = 'msg-row-btns';
    row.id = 'chat-decision-2';
    row.innerHTML = '<button class="btn btn-ghost btn-sm" onclick="agendarHorario()">Agendar horário</button><button class="btn btn-primary btn-sm" onclick="iniciarAgora()">Iniciar agora</button>';
    appendNode(row);
  }, 450);
}

function agendarHorario(){
  document.getElementById('chat-decision-2').remove();
  const wrap = document.createElement('div');
  wrap.className = 'msg sys';
  wrap.innerHTML = 'Escolha um horário disponível:<div class="slot-row" style="margin-top:10px;" id="slotRow">'+
    '<button class="slot-btn" onclick="confirmarSlot(this,\'Hoje, 16:30\')">Hoje, 16:30</button>'+
    '<button class="slot-btn" onclick="confirmarSlot(this,\'Amanhã, 09:00\')">Amanhã, 09:00</button>'+
    '<button class="slot-btn" onclick="confirmarSlot(this,\'Amanhã, 14:00\')">Amanhã, 14:00</button></div>';
  appendNode(wrap);
}
function confirmarSlot(btn, label){
  document.getElementById('slotRow').querySelectorAll('button').forEach(b=>b.disabled=true);
  appendMsg('Consulta agendada para <span class="k">'+label+'</span> ✓', 'me');
  setTimeout(()=>{
    appendMsg('Combinado! A paciente foi avisada. Você pode acompanhar o status no painel.', 'sys');
    addStatusButton();
    document.getElementById('tl-current-label').textContent = 'Consulta agendada';
    document.getElementById('tl-current-sub').textContent = label;
  }, 400);
}

function iniciarAgora(){
  document.getElementById('chat-decision-2').remove();
  const card = document.createElement('div');
  card.className = 'call-card';
  card.innerHTML = '<div class="ct">📹 Chamada com Ana Souza</div><div class="cs" id="callTimer">Conectando…</div><button class="end-call" onclick="encerrarChamada()">Encerrar chamada</button>';
  appendNode(card);
  let secs=0;
  const timer = setInterval(()=>{
    secs++;
    const mm = String(Math.floor(secs/60)).padStart(2,'0');
    const ss = String(secs%60).padStart(2,'0');
    document.getElementById('callTimer').textContent = (secs<2?'Conectando…':mm+':'+ss);
  },1000);
  card.dataset.timer = timer;
}
function encerrarChamada(){
  document.querySelectorAll('.call-card').forEach(c=>clearInterval(c.dataset.timer));
  appendMsg('Chamada encerrada ✓', 'me');
  setTimeout(()=>{
    appendMsg('Consulta concluída. Quando quiser, envie o protocolo sugerido pelo painel.', 'sys');
    addStatusButton();
    document.getElementById('tl-current-label').textContent = 'Em atendimento';
    document.getElementById('tl-current-sub').textContent = 'Consulta por vídeo concluída';
  }, 400);
}

function addStatusButton(){
  const row = document.createElement('div');
  row.className = 'msg-row-btns';
  row.innerHTML = '<button class="btn btn-primary btn-sm" onclick="goTo(\'s-status\')">Ver status do encaminhamento</button>';
  appendNode(row);
}

function resetProto(){
  location.reload();
}

updateProgress('s-splash1');
document.getElementById('app').classList.add('dark-active');
