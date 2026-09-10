/* NextUs site enhancements: trusted translation markup + legal notice */
(function(){
  'use strict';

  const heroMeta={
    en:['<strong>01</strong>Strategy before screens.','<strong>02</strong>Design with a reason.','<strong>03</strong>Build clean. Launch confidently.'],
    ja:['<strong>01</strong>画面を作る前に、戦略を。','<strong>02</strong>理由のあるデザインを。','<strong>03</strong>丁寧に構築し、自信を持って公開。']
  };

  function renderHeroMeta(){
    const lang=localStorage.getItem('nextus-lang')||'en';
    document.querySelectorAll('.hero-meta div').forEach((el,i)=>{
      if(heroMeta[lang] && heroMeta[lang][i] !== undefined) el.innerHTML=heroMeta[lang][i];
    });
  }

  function addLegalNotice(){
    if(localStorage.getItem('nextus-terms-notice')==='accepted') return;
    if(document.getElementById('nextus-terms-notice')) return;

    const style=document.createElement('style');
    style.textContent=`
      #nextus-terms-notice{position:fixed;left:20px;right:20px;bottom:20px;z-index:9999;background:#0d0d0d;color:#f5f5f2;border:1px solid #333;border-radius:20px;box-shadow:0 24px 80px rgba(0,0,0,.55);padding:22px;display:flex;align-items:center;justify-content:space-between;gap:22px;max-width:900px;margin:auto}
      #nextus-terms-notice .tn-copy{font-size:13px;line-height:1.6;color:#aaa}
      #nextus-terms-notice .tn-copy strong{display:block;color:#fff;font-size:15px;margin-bottom:4px}
      #nextus-terms-notice .tn-copy a{color:#f5f5f2;text-decoration:underline;text-underline-offset:3px}
      #nextus-terms-notice .tn-actions{display:flex;gap:8px;flex-shrink:0}
      #nextus-terms-notice button{font:inherit;cursor:pointer;border:1px solid #333;border-radius:999px;padding:10px 16px;background:#151515;color:#fff}
      #nextus-terms-notice button.primary{background:#f4f4f1;color:#080808;border-color:#f4f4f1;font-weight:750}
      @media(max-width:620px){#nextus-terms-notice{left:12px;right:12px;bottom:12px;display:block;padding:18px}.tn-actions{margin-top:14px}.tn-actions button{flex:1}}
    `;
    document.head.appendChild(style);

    const box=document.createElement('aside');
    box.id='nextus-terms-notice';
    box.setAttribute('role','dialog');
    box.setAttribute('aria-label','Terms of Use notice');
    box.innerHTML=`<div class="tn-copy"><strong>Terms of Use</strong>By continuing to use NextUs, you acknowledge our <a href="terms.html">Terms of Use</a> and <a href="privacy.html">Privacy Policy</a>, including the use of limited website analytics to improve the site.</div><div class="tn-actions"><button type="button" id="nextus-terms-view">View Terms</button><button type="button" class="primary" id="nextus-terms-accept">Continue</button></div>`;
    document.body.appendChild(box);

    document.getElementById('nextus-terms-accept').addEventListener('click',()=>{
      localStorage.setItem('nextus-terms-notice','accepted');
      box.remove();
    });
    document.getElementById('nextus-terms-view').addEventListener('click',()=>{window.location.href='terms.html';});
  }

  function init(){
    renderHeroMeta();
    addLegalNotice();

    document.querySelectorAll('[data-set-lang]').forEach(button=>{
      button.addEventListener('click',()=>setTimeout(renderHeroMeta,0));
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();
