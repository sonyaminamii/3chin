const DATA_URL = location.pathname.includes('/boards/') ? '../data/threads.json' : 'data/threads.json';
const ASSET_PREFIX = location.pathname.includes('/boards/') ? '../assets/' : 'assets/';
async function getThreads(){ const r=await fetch(DATA_URL); return await r.json(); }
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function linkifyQuotes(text){
 return esc(text).replace(/&gt;&gt;(\d+)/g,(m,id)=>`<a class="quote-link" href="#post-${id}">&gt;&gt;${id}</a>`);
}

function renderPopular(threads){
  const el = document.getElementById('popular-grid');
  if(!el) return;

  const visibleThreads = threads.filter(t => t.board !== 'o');

  const labels = {
  "b": "Random",
  "g": "Technology",
  "x": "Paranormal",
  "v": "Video Games",
  "o": "Secret"
};

  el.innerHTML = visibleThreads.map((t,i) =>
    `<a class="popular-card" href="thread.html?id=${t.id}">
      <div class="popular-title">${labels[t.board] || t.board}</div>
      <div class="popular-thumb">
        ${i === 0
          ? '<img src="assets/slime-banner.png" alt="">'
          : `<span>/${t.board}/</span>`}
      </div>
      <strong>${esc(t.title)}</strong>
    </a>`
  ).join('');
}
function renderBoard(threads){
 const list=document.getElementById('thread-list'); if(!list)return;
 const board=list.dataset.board;
 const items=threads.filter(t=>t.board===board);
 list.innerHTML=items.map(t=>`<article class="thread-card"><div class="thread-card-head"><a href="../thread.html?id=${t.id}">No.${t.id}</a> <span>${esc(t.title)}</span></div><p>${esc(t.posts[0][3].slice(0,220))}…</p><div class="thread-meta">${t.posts.length} posts · Last reply ${esc(t.posts[t.posts.length-1][1])}</div></article>`).join('') || '<p>No threads found.</p>';
}
function renderThread(threads){
 if(!document.getElementById('posts')) return;
 const id=new URLSearchParams(location.search).get('id');
 const t=threads.find(x=>x.id===id) || threads[0];
 document.title=`3chin — /${t.board}/ — ${t.title}`;
 document.getElementById('board-title').innerHTML=`<a href="boards/${t.board}.html">/${t.board}/</a> - ${esc(t.boardName==='Very Important Posts'?'Very Important Posts':t.boardName)}`;
 const posts=document.getElementById('posts');
 posts.innerHTML=t.posts.map((p,i)=>{
   const attach=p[4]?`<div class="attachment"><div>File: ${esc(p[4])} (${esc(p[5]||'attachment')})</div>${p[4].endsWith('.mp3')||p[4].endsWith('.wav')?`<div class="file-placeholder">[audio attachment placeholder]</div>`:`<img src="${ASSET_PREFIX}${assetFile(p[4])}" alt="${esc(p[4])}">`}</div>`:'';
   return `<article class="post" id="post-${p[0]}"><div class="post-content"><div class="post-meta"><b>Anonymous</b> ${esc(p[1])} <a href="#post-${p[0]}">No.${p[0]}</a> <a class="quote-link" href="#post-${p[0]}">▶</a></div>${attach}<div class="post-text">${linkifyQuotes(p[3])}</div></div></article>`;
 }).join('');
 document.getElementById('reply-button').addEventListener('click',e=>{e.preventDefault();alert('Posting is disabled in this 3chin preview.');});
}
function assetFile(name){
 const map={'desktop_2009.jpg':'desktop_2009.svg','bliss_but_worse.jpg':'bliss_but_worse.svg','desktop_final_final2.png':'desktop_final_final2.svg','old_desktop_clock.jpg':'old_desktop_clock.svg','file_error.png':'file_error.svg','unknown.txt':'unknown.svg','readme_old.txt':'readme_old.svg','waveform.png':'waveform.svg','sock_closeup.jpg':'sock_closeup.svg','evidence_A.jpg':'evidence_A.svg'};
 return map[name]||name;
}
function renderSearch(threads){
 const input=document.getElementById('search-input'); if(!input)return;
 const out=document.getElementById('search-results');
 function run(){const q=input.value.toLowerCase().trim(); if(!q){out.innerHTML='';return;}
                if(q === '812113763'){
  out.innerHTML = `
    <p>
      <a href="boards/o.html">
        /o/ — No.812113763
      </a>
    </p>
  `;
  return;
}
 const results=[]; threads.forEach(t=>t.posts.forEach(p=>{if((p[3]+' '+t.title).toLowerCase().includes(q))results.push({t,p});}));
 out.innerHTML=results.map(x=>`<p><a href="thread.html?id=${x.t.id}#post-${x.p[0]}">/${x.t.board}/ No.${x.p[0]}</a> — ${esc(x.p[3].slice(0,180))}</p>`).join('')||'<p>No results.</p>';}
 input.addEventListener('input',run);
}
(async()=>{try{const threads=await getThreads();renderPopular(threads);renderBoard(threads);renderThread(threads);renderSearch(threads);}catch(e){console.error(e);}})();
