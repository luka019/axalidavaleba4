/* Public interactions. Draft text never leaves this browser-only checker. */
(() => {
 'use strict';
 const $ = s => document.querySelector(s);
 const esc = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const button=$('#menu-toggle'),nav=$('#site-nav');
 if(button&&nav){
  const setOpen=open=>{button.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open)};
  button.addEventListener('click',()=>setOpen(button.getAttribute('aria-expanded')!=='true'));
  nav.addEventListener('click',e=>{if(e.target.closest('a'))setOpen(false)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){const open=button.getAttribute('aria-expanded')==='true';setOpen(false);if(open)button.focus()}});
  document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))setOpen(false)});
  matchMedia('(min-width:801px)').addEventListener('change',e=>{if(e.matches)setOpen(false)});
 }
 const deadline=$('#deadline-label');
 if(deadline){const end=new Date('2026-10-06T11:00:00Z');if(Date.now()>=end.getTime())deadline.textContent='This application window closed on 6 October 2026. Check the official timeline.'}
 const rules={
  leadership:[['Your own contribution',/\b(i|my|personally)\b/i,'Which decision or action was specifically yours?'],['An action',/\b(led|created|launched|organised|organized|negotiated|implemented|designed|built|introduced)\b/i,'What did you actually do, rather than simply take responsibility for?'],['Influence',/\b(influenc\w*|persuad\w*|convinc\w*|negotiat\w*|secured support)\b/i,'Who changed their approach or decision, and what did you do that contributed to that change?'],['A challenge',/\b(resistance|challenge\w*|barrier\w*|reluctant|opposed|objection\w*|constraint\w*)\b/i,'What made the situation difficult, and how did you respond?'],['An outcome',/\b(increased|reduced|saved|adopted|resulted|achieved|improved|delivered)\b/i,'What changed as a result, and what supports your explanation?']],
  relationships:[['A relationship',/\b(relationship\w*|network\w*|partnership\w*|collaborat\w*|mentor\w*)\b/i,'Which relationship are you describing, and why did it matter?'],['Your contribution',/\b(supported|helped|introduced|shared|contributed|advised|provided)\b/i,'What specific value did you contribute?'],['Mutual value',/\b(mutual|reciprocal|exchange\w*|both|together)\b/i,'What did each person contribute or gain?'],['Continuity',/\b(maintain\w*|continued|regular\w*|follow.?up|stayed in touch|ongoing)\b/i,'How did you maintain the relationship after the first interaction?'],['An outcome',/\b(resulted|enabled|secured|created|opened|improved|delivered)\b/i,'What became possible because the relationship continued?']],
  course:[['A capability gap',/\b(gap|lack\w*|capability|skill\w*|knowledge)\b/i,'What do you need to become better able to do?'],['Specific learning',/\b(module\w*|curriculum|clinic|research|teaching)\b/i,'Which current course feature addresses that capability gap?'],['A connection',/\b(because|therefore|enable\w*|allow\w*|equip\w*|so that)\b/i,'How does the learning connect to the work you intend to do?'],['A reason for choosing',/\b(first.choice|chosen|selected|specifically|particularly)\b/i,'What makes your first-choice course a relevant choice for your plan?'],['Future use',/\b(career|return\w*|future|goal\w*|impact|apply|implement\w*)\b/i,'Where will you apply this learning after study?']],
  career:[['A first step',/\b(upon return|first year|short.term|immediately|returning home)\b/i,'What is the first realistic role or responsibility after returning?'],['A middle step',/\b(medium.term|mid.term|three|3|five|5)\b/i,'What bridges the first step to your longer-term ambition?'],['Longer-term direction',/\b(long.term|ultimately|eventually|longer.term)\b/i,'What longer-term contribution are the earlier steps building towards?'],['An observable milestone',/\b(target|measure\w*|launch|establish|build|create|increase|reduce|train)\b/i,'What observable milestone would show meaningful progress?'],['Intended benefit',/\b(community|sector|public|society|impact|benefit\w*|home country)\b/i,'Who benefits from your plan, and what would change for them?']]
 };
 const labels={leadership:'Leadership & influence',relationships:'Professional relationships',course:'Course choice',career:'Career plan'};
 const form=$('#proof-form'),input=$('#answer');
 let report='';
 if(form&&input){
  const count=()=>($('#word-count').textContent=((input.value.trim().match(/\S+/g)||[]).length)+' words');
  input.addEventListener('input',()=>{count();$('#check-error').textContent=''});
  form.addEventListener('submit',e=>{
   e.preventDefault();
   const text=input.value.trim(),key=$('#criterion').value;
   const words=(text.match(/\S+/g)||[]).length;
   if(words<35){$('#check-error').textContent='Add at least 35 words of your own draft so there is enough text to review.';input.focus();return}
   if(!$('#own-work').checked)return;
   const cues=rules[key].map(([label,pattern,question])=>({label,found:pattern.test(text),question}));
   const next=cues.find(x=>!x.found)||cues[0];
   const result=$('#proof-result');
   result.innerHTML=`<span class="eyebrow">A starting point for reflection</span><h3>Look closer at: ${esc(next.label.toLowerCase())}</h3><p>These are wording cues, not evidence findings. A phrase can be present without proving a point; your answer may make a point without using a phrase our rules recognise.</p><ul>${cues.map(c=>`<li class="cue-row"><span>${esc(c.label)}</span><small>${c.found?'Wording cue found':'Review manually'}</small></li>`).join('')}</ul><div class="result-question">${esc(next.question)}</div><p>No selection score. No rewritten answer. Check the actual question and use your own judgement.</p><div class="actions"><a class="button" href="/login?mode=signup">Create a free workspace</a><button class="button button-outline" type="button" id="download-review">Save review notes</button></div><p class="microcopy">Only the review questions are included in the download, not your answer.</p>`;
   report=`ShortlistProof - independent reflection notes\n${labels[key]}\n\nNot an official assessment or a selection prediction. Wording matches do not verify evidence.\n\n${cues.map(c=>`${c.label}: ${c.found?'wording cue found':'review manually'}\nQuestion: ${c.question}`).join('\n\n')}\n\nYour application remains your own original work.\nOfficial criteria: https://www.chevening.org/resource-hub/guidance/application-criteria/\n`;
   result.hidden=false;result.focus({preventScroll:true});result.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});
   $('#download-review').onclick=()=>{const url=URL.createObjectURL(new Blob([report],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='shortlistproof-review-notes.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
  });
 }
 const checklist=[...document.querySelectorAll('[data-review-check]')];
 checklist.forEach(c=>c.addEventListener('change',()=>{$('#checklist-progress').textContent=checklist.filter(x=>x.checked).length+' of '+checklist.length+' reviewed'}));
 const support=$('#support-form');
 if(support){support.addEventListener('submit',async e=>{
  e.preventDefault();const submit=support.querySelector('button[type=submit]'),error=$('#support-error');
  const fields=Object.fromEntries(new FormData(support).entries());
  if(fields.message.trim().length<10){error.textContent='Please describe the issue in at least 10 characters.';return}
  error.textContent='';submit.disabled=true;submit.textContent='Sending request...';
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),12000);
  try{
   const response=await fetch('https://gqbzaiqppyxweuxpbowl.supabase.co/functions/v1/support',{method:'POST',headers:{'Content-Type':'application/json','apikey':'sb_publishable_eYWPVhKoOv97r6aKIwzRgQ_ZajBQvcs'},body:JSON.stringify(fields),signal:controller.signal});
   const data=await response.json();
   if(!response.ok||!data.ok)throw new Error(response.status===429?'Too many requests. Please try again in an hour.':'The request could not be saved. Please try again.');
   const result=$('#support-result');result.innerHTML=`<h2>Request recorded.</h2><p>Your reference: <strong>${esc(data.reference||'received')}</strong></p><p>Your request is available for review. Keep the reference if you contact us again.</p>`;support.hidden=true;result.hidden=false;result.focus();
  }catch(err){error.textContent=err.name==='AbortError'?'The request timed out. It may have been received; please avoid sending it repeatedly.':err.message==='Failed to fetch'?'We could not connect. Check your connection and try again.':err.message}
  finally{clearTimeout(timeout);submit.disabled=false;submit.textContent='Send request'}
 })}
})();
