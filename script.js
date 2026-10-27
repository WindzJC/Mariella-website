(()=>{
  const toggle=document.getElementById('menu-toggle');
  const nav=document.getElementById('site-nav');
  const closeMenu=()=>{nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');};
  toggle.addEventListener('click',()=>{const shouldOpen=!nav.classList.contains('open');nav.classList.toggle('open',shouldOpen);toggle.setAttribute('aria-expanded',String(shouldOpen));toggle.setAttribute('aria-label',shouldOpen?'Close navigation':'Open navigation');});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
  document.addEventListener('click',event=>{if(!nav.contains(event.target)&&!toggle.contains(event.target))closeMenu();});
  const chapters=[
    {img:'assets/casablanca.svg',alt:'Original illustration of a North African coastal city',label:'POSTCARD · MOROCCO'},
    {img:'assets/atlas.svg',alt:'Original illustration of snow-capped mountains',label:'POSTCARD · ATLAS MOUNTAINS'},
    {img:'assets/horizons.svg',alt:'Original illustration of a ship on a blue sea',label:'POSTCARD · FARTHER HORIZONS'}
  ];
  const tabs=Array.from(document.querySelectorAll('.album-tab'));
  const panels=Array.from(document.querySelectorAll('.album-panel'));
  const image=document.getElementById('album-image');
  const label=document.getElementById('album-photo-label');
  const count=document.getElementById('current-number');
  const progress=document.getElementById('page-track-fill');
  let active=0;
  function select(index,focus=false){
    active=(index+chapters.length)%chapters.length;
    tabs.forEach((t,i)=>{t.classList.toggle('is-active',i===active);t.setAttribute('aria-selected',String(i===active));t.tabIndex=i===active?0:-1;});
    panels.forEach((panel,i)=>{panel.hidden=i!==active;});
    image.src=chapters[active].img;image.alt=chapters[active].alt;
    label.textContent=chapters[active].label;
    count.textContent=String(active+1).padStart(2,'0');
    progress.style.width=((active+1)/chapters.length*100)+'%';
    if(focus)tabs[active].focus();
  }
  tabs.forEach((tab,i)=>{
    tab.addEventListener('click',()=>select(i));
    tab.addEventListener('keydown',e=>{
      if(e.key==='ArrowRight'){e.preventDefault();select(i+1,true);}
      if(e.key==='ArrowLeft'){e.preventDefault();select(i-1,true);}
      if(e.key==='Home'){e.preventDefault();select(0,true);}
      if(e.key==='End'){e.preventDefault();select(chapters.length-1,true);}
    });
  });
  document.getElementById('previous-page').addEventListener('click',()=>select(active-1));
  document.getElementById('next-page').addEventListener('click',()=>select(active+1));
})();
