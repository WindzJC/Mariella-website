'use strict';
const chapters = [
  {year:'1958', title:'The world beyond Clovis', description:'After graduating from Baylor University, Mariella set off on a two-year solo journey abroad. The dream encouraged by her parents in New Mexico was becoming real.'},
  {year:'1958–1983', title:'Four regions. A changing world.', description:'Her travels reached across Europe, North Africa, the Middle East, and the Far East. The memoir returns to places, encounters, and an era experienced firsthand.'},
  {year:'THE FAMILY', title:'A life shared on the road', description:'Mariella later married fellow traveler Bill Harper. Their sons, Hance and Scott, became part of a family story shaped by life and travel across continents.'},
  {year:'1983', title:'A world of memories to keep', description:'By 1983, the years of travel had become a remarkable chapter in one family’s life. Mariella brings those memories together in the memoir published in 2023.'}
];
const menuButton=document.getElementById('menu-toggle');
const nav=document.getElementById('site-nav');
if(menuButton&&nav){
  menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('open',open)});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation')}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.focus()}});
}
const rows=[...document.querySelectorAll('.board-row')];
const chapterNumber=document.getElementById('chapter-number');
const chapterYear=document.getElementById('chapter-year');
const chapterTitle=document.getElementById('chapter-title');
const chapterDescription=document.getElementById('chapter-description');
function activateChapter(i,focus=false){
  const chapter=chapters[i];if(!chapter)return;
  rows.forEach((row,j)=>{const active=i===j;row.classList.toggle('active',active);row.setAttribute('aria-pressed',String(active))});
  chapterNumber.textContent='CHAPTER '+String(i+1).padStart(2,'0');chapterYear.textContent=chapter.year;chapterTitle.textContent=chapter.title;chapterDescription.textContent=chapter.description;
  if(focus)rows[i].focus();
}
rows.forEach((row,i)=>{row.addEventListener('click',()=>activateChapter(i));row.addEventListener('keydown',e=>{if(['ArrowUp','ArrowDown','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?rows.length-1:(i+(e.key==='ArrowDown'?1:-1)+rows.length)%rows.length;activateChapter(next,true)}})});
