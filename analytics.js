(function(){'use strict';
const ENDPOINT='/api/track';
const sessionId=(crypto&&crypto.randomUUID)?crypto.randomUUID():'s-'+Date.now()+'-'+Math.random().toString(36).slice(2);
function send(event,extra){
  const payload={event,page:location.pathname,referrer:document.referrer||null,language:document.documentElement.lang||'en',sessionId,ts:new Date().toISOString(),...extra};
  try{
    const body=JSON.stringify(payload);
    if(navigator.sendBeacon){navigator.sendBeacon(ENDPOINT,new Blob([body],{type:'application/json'}));}
    else{fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body,keepalive:true}).catch(()=>{});}
  }catch(e){}
}
function start(){
  send('page_view');
  document.addEventListener('click',function(e){
    const el=e.target.closest('a,button');
    if(!el)return;
    if(el.closest('form'))return;
    const href=el.tagName==='A'?el.getAttribute('href'):null;
    send('click',{element:el.tagName.toLowerCase(),label:(el.getAttribute('aria-label')||el.textContent||'').trim().slice(0,120),href:href||null});
  },{passive:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();