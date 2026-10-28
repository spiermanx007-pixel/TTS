const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const P=(d,f)=>`<svg class="ic${f?' fl':''}" viewBox="0 0 24 24">${d}</svg>`;
const IC={play:['<path d="M8 5v14l11-7z"/>',1],pause:['<path d="M6 5h4v14H6zM14 5h4v14h-4z"/>',1],check:['<path d="M5 13l4 4L19 7"/>'],spark:['<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 16v4M17 18h4"/>'],
doc:['<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>'],down:['<path d="M12 4v11M8 11l4 4 4-4M5 20h14"/>'],up:['<path d="M12 16V5M8 9l4-4 4 4M5 20h14"/>'],lock:['<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>'],
user:['<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>'],type:['<path d="M5 6h14M12 6v13M9 19h6"/>'],gauge:['<path d="M4 18a8 8 0 1116 0"/><path d="M12 14l4-4"/>'],file:['<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 15V9l7-1v6"/><circle cx="8" cy="15" r="1.5"/><circle cx="15" cy="14" r="1.5"/>'],chev:['<path d="M9 6l6 6-6 6"/>'],
swap:['<path d="M7 4v16M4 17l3 3 3-3M17 20V4M14 7l3-3 3 3"/>'],reset:['<path d="M4 12a8 8 0 102.5-5.8M4 4v5h5"/>'],x:['<path d="M6 6l12 12M18 6L6 18"/>'],moon:['<path d="M20 14A8 8 0 1110 4a7 7 0 0010 10z"/>'],sun:['<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/>']};
const ic=n=>P(IC[n][0],IC[n][1]),paint=()=>$$('[data-ic]').forEach(e=>e.innerHTML=ic(e.dataset.ic));
const ST={get(k,d){try{return localStorage.getItem('lv_'+k)||d}catch{return d}},set(k,v){try{localStorage.setItem('lv_'+k,v)}catch{}}};
/* voices: [id, randomuser photo number, age group]. Edit the numbers to change a photo. */
const MEN=[['am_adam',32,'Adult'],['am_echo',45,'Adult'],['am_eric',52,'Adult'],['am_fenrir',64,'Adult'],['am_liam',22,'Young'],['am_michael',71,'Mature'],['am_onyx',83,'Senior'],['am_puck',11,'Young'],['am_santa',90,'Senior'],['bm_daniel',36,'Adult'],['bm_fable',19,'Young'],['bm_george',86,'Senior'],['bm_lewis',58,'Mature']];
const WOM=[['af_alloy',44,'Adult'],['af_aoede',21,'Young'],['af_bella',65,'Adult'],['af_heart',68,'Adult'],['af_jessica',33,'Adult'],['af_kore',12,'Adult'],['af_nicole',79,'Mature'],['af_nova',17,'Young'],['af_river',50,'Adult'],['af_sarah',26,'Adult'],['af_sky',85,'Young'],['bf_alice',90,'Adult'],['bf_emma',55,'Adult'],['bf_isabella',62,'Mature'],['bf_lily',9,'Young']];
const ALL=[...MEN,...WOM],IDS=ALL.map(v=>v[0]),VM=Object.fromEntries(ALL.map(v=>[v[0],v]));
const nm=id=>id.split('_')[1][0].toUpperCase()+id.split('_')[1].slice(1),acc=id=>id[0]==='a'?'American':'British',gen=id=>id[1]==='f'?'F':'M';
const img=(id,c)=>`<img src="https://randomuser.me/api/portraits/${gen(id)==='M'?'men':'women'}/${VM[id][1]}.jpg" onerror="this.onerror=null;this.src='images/avatars/${id}.svg'" alt="${nm(id)}" loading="lazy" ${c||''}>`;
let cur=IDS.includes(ST.get('v'))?ST.get('v'):'am_adam',PL=null,AC,KP,mode='tts',busy=false,bookText='',bookName='',url='';
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('on'),3400)}
const status=m=>$('#st').textContent=m,prog=p=>{p=Math.max(0,Math.min(1,p));$('#pb').style.width=p*100+'%';$('#pct').textContent=Math.round(p*100)+'%'};
const row=v=>`<div class="vr ${v[0]===cur?'on':''}" role="option" tabindex="0" data-id="${v[0]}"><div class="ph">${img(v[0])}</div><div class="vi"><b>${nm(v[0])}</b><span>${v[2]} · ${acc(v[0])}</span></div><button class="pb" data-p="${v[0]}" aria-label="Preview ${nm(v[0])}">${ic('play')}</button><span class="rk">${ic('check')}</span></div>`;
const renderList=()=>$('#vl').innerHTML='<div class="gh">Male voices</div>'+MEN.map(row).join('')+'<div class="gh">Female voices</div>'+WOM.map(row).join('');
const renderSel=()=>$('#pick').innerHTML=`<div class="ph">${img(cur)}</div><div class="wi"><b>${nm(cur)} (${gen(cur)==='F'?'Female':'Male'})</b><span>${VM[cur][2]} · ${acc(cur)} English</span></div><i class="sw">${ic('swap')}</i>`;
$('#stack').innerHTML=['am_adam','af_heart','am_onyx','af_bella','bm_george','af_nova'].map(i=>img(i)).join('');
$('#tabs').onclick=e=>{const b=e.target.closest('button');if(!b)return;mode=b.dataset.t;$$('#tabs button').forEach(x=>x.classList.toggle('on',x===b));$$('.tab').forEach(t=>t.classList.toggle('on',t.id===mode))};
/* voice popup */
const md=$('#md'),openM=()=>{renderList();md.hidden=false;document.body.style.overflow='hidden';$('#vl').scrollTop=0},closeM=()=>{stopPrev();md.hidden=true;document.body.style.overflow=''};
$('#pick').onclick=openM;$$('[data-open]').forEach(b=>b.onclick=e=>{e.preventDefault();openM()});
md.onclick=e=>{if(e.target===md||e.target.closest('[data-close]'))closeM()};document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!md.hidden)closeM()});
$('#vl').onclick=e=>{const p=e.target.closest('.pb');if(p)return preview(p.dataset.p,p);const r=e.target.closest('.vr');if(r){cur=r.dataset.id;ST.set('v',cur);renderSel();closeM()}};
$('#vl').onkeydown=e=>{if(e.key==='Enter'&&e.target.classList.contains('vr'))e.target.click()};
/* AI engine (Kokoro, runs in browser, loaded once) */
const getK=()=>KP||(KP=(async()=>{const{KokoroTTS}=await import('https://cdn.jsdelivr.net/npm/kokoro-js@1.2.1/+esm');
return KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX',{dtype:'q8',device:'wasm',progress_callback:p=>{if(p.status==='progress')status(`Downloading voice engine (one time, ~90 MB)… ${Math.round(p.progress||0)}%`)}})})().catch(e=>{KP=null;throw e}));

/* instant voice samples, generated once and cached */
const cache={};
function stopPrev(){if(!PL)return;const p=PL;PL=null;try{p.s.stop()}catch{}p.b.classList.remove('pl');p.b.innerHTML=ic('play')}
async function preview(id,b){const same=PL&&PL.id===id;stopPrev();if(same)return;
try{if(!cache[id]){b.classList.add('ld');const k=await getK();const a=await k.generate(`Hello, I'm ${nm(id)}. This is how I sound. Pick me to read your story.`,{voice:id});cache[id]={d:a.audio,sr:a.sampling_rate};b.classList.remove('ld')}
AC=AC||new AudioContext();await AC.resume();const c=cache[id],buf=AC.createBuffer(1,c.d.length,c.sr),s=AC.createBufferSource();buf.copyToChannel(c.d,0);s.buffer=buf;s.connect(AC.destination);
PL={id,s,b};b.classList.add('pl');b.innerHTML=ic('pause');s.onended=()=>{if(PL&&PL.s===s)stopPrev()};s.start()}
catch(e){b.classList.remove('ld');b.innerHTML=ic('play');toast('Previews need internet the first time')}}
/* text → chunks */
function chunk(t){const o=[];for(let s of t.replace(/[ \t]+/g,' ').split(/(?<=[.!?…])\s+|\n+/)){s=s.trim();while(s.length>200){let k=s.lastIndexOf(' ',200);if(k<50)k=200;o.push(s.slice(0,k));s=s.slice(k).trim()}if(s)o.push(s)}
const m=[];for(const s of o){if(m.length&&m[m.length-1].length+s.length<180)m[m.length-1]+=' '+s;else m.push(s)}return m}

/* inputs */
const txt=$('#txt'),upd=()=>{$('#cnt').textContent=txt.value.length.toLocaleString()+' characters'};txt.oninput=upd;
$('#tf').onchange=async e=>{const f=e.target.files[0];if(f){txt.value=await f.text();upd()}};
$('#sp').oninput=e=>$('#spv').textContent=(+e.target.value).toFixed(2)+'×';
const PJ='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';
async function readPdf(f){if(!window.pdfjsLib){await new Promise((ok,no)=>{const s=document.createElement('script');s.src=PJ+'pdf.min.js';s.onload=ok;s.onerror=()=>no(new Error('PDF reader needs internet the first time'));document.head.appendChild(s)});
const w=await(await fetch(PJ+'pdf.worker.min.js')).text();pdfjsLib.GlobalWorkerOptions.workerSrc=URL.createObjectURL(new Blob([w],{type:'text/javascript'}))}
const pdf=await pdfjsLib.getDocument({data:await f.arrayBuffer()}).promise,o=[];
for(let i=1;i<=pdf.numPages;i++){const c=await(await pdf.getPage(i)).getTextContent();o.push(c.items.map(x=>x.str).join(' ').replace(/\s+/g,' ').trim());status(`Reading PDF page ${i} of ${pdf.numPages}`)}
const t=o.join('\n').trim();if(t.length<20)throw new Error('No readable text. This looks like a scanned PDF (images only).');return t}
async function loadBook(f){if(!f)return;try{bookText=/\.pdf$/i.test(f.name)?await readPdf(f):await f.text();bookName=f.name.replace(/\.\w+$/,'');
$('#dn').textContent=f.name;$('#di').textContent=bookText.length.toLocaleString()+' characters · about '+Math.max(1,Math.round(bookText.length/900))+' min of audio';status('Ready')}
catch(e){bookText='';toast(e.message||'Could not read this file')}}
$('#bf').onchange=e=>loadBook(e.target.files[0]);
const dz=$('#dz');['dragover','dragenter'].forEach(n=>dz.addEventListener(n,e=>{e.preventDefault();dz.classList.add('h')}));['dragleave','drop'].forEach(n=>dz.addEventListener(n,()=>dz.classList.remove('h')));
dz.addEventListener('drop',e=>{e.preventDefault();loadBook(e.dataTransfer.files[0])});

/* settings */
const fmt=s=>isFinite(s)?Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0'):'0:00';
$('#pi').oninput=e=>$('#piv').textContent=(e.target.value>0?'+':'')+Math.round(e.target.value*100)+'%';$('#vo').oninput=e=>$('#vov').textContent=Math.round(e.target.value*100)+'%';
$('#rst').onclick=()=>{[['sp',1],['pi',0],['vo',1]].forEach(([i,v])=>{$('#'+i).value=v;$('#'+i).dispatchEvent(new Event('input'))})};
$('#cl').onclick=()=>{txt.value='';upd()};
const rs=(d,r)=>{if(Math.abs(r-1)<.005)return d;const n=Math.floor(d.length/r),o=new Float32Array(n);for(let i=0;i<n;i++){const x=i*r,j=x|0,f=x-j;o[i]=d[j]*(1-f)+(d[j+1]??d[j])*f}return o};
/* player for the generated MP3 */
const au=$('#au'),sk=$('#sk');let D=0;const dur=()=>isFinite(au.duration)&&au.duration>0?au.duration:D;
$('#pp').innerHTML=ic('play');$('#pp').onclick=()=>au.paused?au.play():au.pause();
au.onplay=()=>$('#pp').innerHTML=ic('pause');au.onpause=()=>$('#pp').innerHTML=ic('play');
au.ontimeupdate=()=>{sk.value=dur()?au.currentTime/dur()*1000:0;$('#tc').textContent=fmt(au.currentTime)};au.onended=()=>{au.currentTime=0;sk.value=0};
sk.oninput=()=>{au.currentTime=sk.value/1000*dur()};
/* generate: Kokoro voice -> MP3 (lamejs). No live speech. */
async function loadLame(){if(window.lamejs)return;await new Promise((ok,no)=>{const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/lamejs/1.2.1/lame.min.js';s.onload=ok;s.onerror=()=>no(new Error('MP3 encoder needs internet the first time'));document.head.appendChild(s)})}
$('#go').onclick=async()=>{if(busy)return;const text=mode==='tts'?txt.value.trim():bookText;
if(!text)return toast(mode==='tts'?'Enter some text first':'Choose a PDF or TXT file first');
if(text.length>20000&&!confirm(`About ${Math.round(text.length/900)} minutes of audio. This can take a while. Keep this tab open. Continue?`))return;
busy=true;$('#go').disabled=true;$('#plr').hidden=true;au.pause();$('#pgw').hidden=false;prog(0);stopPrev();
try{status('Preparing…');await loadLame();status('Loading voice engine…');const k=await getK();
const r=1+(+$('#pi').value),vol=+$('#vo').value,sp=+$('#sp').value,enc=new lamejs.Mp3Encoder(1,24000,96),out=[],parts=chunk(text),total=text.length;let done=0,secs=0;
for(let i=0;i<parts.length;i++){status(`Creating audio · part ${i+1} of ${parts.length}`);
const a=rs((await k.generate(parts[i],{voice:cur,speed:Math.min(2,Math.max(.5,sp/r))})).audio,r),s=new Int16Array(a.length);secs+=a.length/24000;
for(let j=0;j<a.length;j++)s[j]=Math.max(-1,Math.min(1,a[j]*vol))*32767;
for(let p=0;p<s.length;p+=1152){const b=enc.encodeBuffer(s.subarray(p,p+1152));if(b.length)out.push(new Uint8Array(b))}
done+=parts[i].length;prog(done/total*.98);await new Promise(r=>setTimeout(r))}
const f=enc.flush();if(f.length)out.push(new Uint8Array(f));prog(1);
const name=((mode==='tts'?'speech-'+nm(cur):bookName+'-'+nm(cur)).replace(/[^\w\- ]+/g,'').trim().slice(0,60)||'speech')+'.mp3';
if(url)URL.revokeObjectURL(url);url=URL.createObjectURL(new Blob(out,{type:'audio/mpeg'}));
const d=$('#dl');d.href=url;d.download=name;au.src=url;D=secs;sk.value=0;$('#tc').textContent='0:00';$('#td').textContent=fmt(secs);$('#plr').hidden=false;status(`Ready · ${fmt(secs)} of audio. Press play to listen.`)}
catch(e){status('Generation failed');toast(e.message||'Generation failed')}
busy=false;$('#go').disabled=false};
const root=document.documentElement,setTheme=t=>{root.dataset.theme=t;ST.set('theme',t);$('#theme').innerHTML=ic(t==='dark'?'sun':'moon')};
setTheme(root.dataset.theme);$('#theme').onclick=()=>setTheme(root.dataset.theme==='dark'?'light':'dark');
paint();renderSel();upd();
