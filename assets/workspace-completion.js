/* Account workflows. Never infer an entitlement from a URL or a local flag. */
(() => {
 'use strict';
 const $=selector=>document.querySelector(selector);
 const originalEnsure=ensureData, originalSettings=renderSettings, originalOnboarding=renderOnboarding;
 const originalApplication=renderApplication, originalStories=renderStoryBank, originalFinal=renderFinalProof;
 const originalDemoURL=demoURL;
 const originalShell=shell;
 shell=function(content,active){originalShell(content,active);if(isSandbox&&!state.demo){const banner=document.createElement('div');banner.className='sandbox-panel';banner.setAttribute('role','status');banner.innerHTML='<b>Sandbox workspace</b><p>Test access only. No real payment or live plan is implied.</p>';document.querySelector('.content')?.prepend(banner);const label=document.querySelector('.profile-meta span');if(label)label.textContent='Sandbox workspace'}};
 const EXPIRES='2027-10-31T23:59:59Z';
 if(!state.demo&&location.pathname.startsWith('/app/'))try{sessionStorage.setItem('sp_return_path',location.pathname+(isSandbox?'?sandbox=1':''))}catch{}
 window.spReturnPath=()=>{try{const path=sessionStorage.getItem('sp_return_path')||'/app';return /^\/app(?:\/[a-z-]+)?(?:\?sandbox=1)?$/.test(path)?path:'/app'}catch{return '/app'}};
 const reviewItems=[
  ['guidance','I have read the current official questions and instructions.'],
  ['original','Every answer is my own original work.'],
  ['contribution','My examples clearly distinguish my contribution.'],
  ['accuracy','I have checked material facts, dates and results.'],
  ['coherence','Course information and career plans are consistent.'],
  ['submission','I will submit through the official application system.']
 ];
 let lastSaveError='';
 const saveQueue=new Map();
 const safeData=result=>{if(result.error)throw result.error;return result.data};
 const friendly=error=>error?.message||'The service could not complete this action. Please try again.';
 const money=(amount,currency)=>new Intl.NumberFormat('en-GB',{style:'currency',currency:String(currency||'gbp').toUpperCase()}).format(Number(amount||0)/100);
 const saveDownload=(name,text,type='text/plain')=>{const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000)};
 demoURL=function(path){const url=new URL(originalDemoURL(path),location.origin);if(isSandbox&&url.pathname.startsWith('/app')&&!state.demo)url.searchParams.set('sandbox','1');return url.pathname+url.search+url.hash};
 hasFullAccess=function(){return state.demo||!!(state.profile?.plan==='full'&&(!state.profile.full_access_until||new Date(state.profile.full_access_until).getTime()>Date.now()))||!!(isSandbox&&state.profile?.test_access===true)};
 premiumCall=async function(action,payload={}){const result=await sb.functions.invoke('premium-analysis',{body:{...payload,action,sandbox:isSandbox&&!state.demo}});if(result.error)throw result.error;if(result.data?.error)throw new Error(result.data.error);return result.data};
 ensureData=async function(){
  if(state.demo)return originalEnsure();
  const sessionResult=await sb.auth.getSession();if(sessionResult.error)throw sessionResult.error;
  state.session=sessionResult.data.session;state.user=state.session?.user||null;if(!state.user)return;
  const workspace=safeData(await sb.rpc('ensure_workspace'));
  state.application=Array.isArray(workspace)?workspace[0]:workspace;
  if(!state.application?.id)throw new Error('Your workspace could not be opened. Please retry.');
  state.profile=safeData(await sb.from('users').select('*').eq('id',state.user.id).single());
  const id=state.application.id;
  const results=await Promise.all([
   sb.from('answers').select('*').eq('application_id',id),
   sb.from('experiences').select('*').eq('application_id',id).order('created_at',{ascending:false}),
   sb.from('courses').select('*').eq('application_id',id).eq('preference_order',1).limit(1),
   sb.from('career_goals').select('*').eq('application_id',id),
   sb.from('application_reviews').select('*').eq('application_id',id).maybeSingle()
  ]);
  const [answers,stories,courses,goals,review]=results.map(safeData);
  state.answers=Object.fromEntries((answers||[]).map(a=>[a.criterion,a]));state.stories=stories||[];
  state.course=courses?.[0]||null;state.careerGoals=Object.fromEntries((goals||[]).map(g=>[g.horizon,g]));state.review=review||null;
 };
 saveAnswer=function(criterion,text){
  if(state.demo)return Promise.resolve(null);
  const work=async()=>{
   lastSaveError='';
   try{
    if(!state.user||!state.application||!Object.hasOwn(CRITERIA,criterion))throw new Error('Sign in before saving this answer.');
    if(typeof text!=='string'||text.length>12000)throw new Error('This draft exceeds the workspace text limit.');
    const old=state.answers[criterion];let result;
    if(old){let request=sb.from('answers').update({answer_text:text,word_count:countWords(text)}).eq('id',old.id).eq('user_id',state.user.id);if(old.updated_at)request=request=request.eq('updated_at',old.updated_at);result=await request.select().maybeSingle();if(!result.error&&!result.data)throw new Error('A newer version exists in another tab. Download this draft, then reload before editing.');}
    else result=await sb.from('answers').insert({user_id:state.user.id,application_id:state.application.id,criterion,answer_text:text,word_count:countWords(text)}).select().single();
    if(result.error?.code==='23505')throw new Error('This answer was created in another tab. Download this draft and reload to avoid overwriting it.');
    const answer=safeData(result);state.answers[criterion]=answer;return answer;
   }catch(error){lastSaveError=friendly(error);toast(lastSaveError);return null}
  };
  const next=(saveQueue.get(criterion)||Promise.resolve()).then(work,work);saveQueue.set(criterion,next);return next;
 };
 saveApplicationContext=async function(){
  if(state.demo)return toast('Create an account to save your own course and career notes.');
  const button=$('#saveContext');if(button?.disabled)return;if(button)button.disabled=true;
  try{
   const institution=$('#courseInstitution').value.trim(),programme=$('#courseProgramme').value.trim();
   if(!!institution!==!!programme)throw new Error('Add both the university and programme, or clear both fields.');
   const id=state.application.id,user_id=state.user.id,tasks=[];
   if(institution&&programme)tasks.push(sb.from('courses').upsert({user_id,application_id:id,preference_order:1,institution,programme,modules:$('#courseModules').value.split(',').map(x=>x.trim()).filter(Boolean).slice(0,20)},{onConflict:'application_id,preference_order'}));
   else if(state.course)tasks.push(sb.from('courses').delete().eq('id',state.course.id).eq('user_id',user_id));
   for(const [horizon,input] of [['short','goalShort'],['mid','goalMid'],['long','goalLong']]){const goal=$('#'+input).value.trim();if(goal)tasks.push(sb.from('career_goals').upsert({user_id,application_id:id,horizon,goal},{onConflict:'application_id,horizon'}));else if(state.careerGoals[horizon])tasks.push(sb.from('career_goals').delete().eq('id',state.careerGoals[horizon].id).eq('user_id',user_id))}
   const results=await Promise.all(tasks);if(results.some(r=>r.error))throw new Error('Some notes could not be saved. Your form is still here; please retry.');
   const [courseRows,goalRows]=await Promise.all([sb.from('courses').select('*').eq('application_id',id).eq('preference_order',1).limit(1),sb.from('career_goals').select('*').eq('application_id',id)]);
   state.course=safeData(courseRows)?.[0]||null;state.careerGoals=Object.fromEntries((safeData(goalRows)||[]).map(row=>[row.horizon,row]));
   toast('Course and career notes saved. Cleared fields have been removed.');
  }catch(error){toast(friendly(error))}finally{if(button)button.disabled=false}
 };
 renderApplication=function(){
  originalApplication();
  const editor=$('#answerEditor'),save=$('#saveAnswer'),status=$('#saveState');
  status?.setAttribute('role','status');editor.maxLength=12000;
  const download=document.createElement('button');download.type='button';download.className='btn btn-secondary';download.id='downloadDraft';download.textContent='Download this draft';download.onclick=()=>saveDownload('my-self-written-draft.txt',editor.value);save.parentElement.prepend(download);
  const handleSave=save.onclick;save.onclick=async e=>{await handleSave(e);if(lastSaveError&&status){status.textContent=lastSaveError;status.classList.add('save-error')}else status?.classList.remove('save-error')};
  const upload=$('#sourceFile');
  if(upload&&state.application?.source_file_path){
   const actions=document.createElement('div');actions.className='file-actions';
   actions.innerHTML='<button type="button" class="btn btn-secondary" id="downloadSource">Download saved PDF</button><button type="button" class="btn btn-danger" id="removeSource">Remove PDF</button>';
   upload.closest('.card')?.append(actions);
   $('#downloadSource').onclick=async e=>{const button=e.currentTarget;button.disabled=true;try{const data=safeData(await sb.storage.from('application-files').download(state.application.source_file_path));saveDownload('my-evidence.pdf',data,'application/pdf')}catch(error){toast('The PDF could not be downloaded. Please retry.')}finally{button.disabled=false}};
   $('#removeSource').onclick=async e=>{if(!confirm('Remove the saved PDF? Your written answers and stories will remain.'))return;const button=e.currentTarget;button.disabled=true;try{safeData(await sb.storage.from('application-files').remove([state.application.source_file_path]));const app=safeData(await sb.from('applications').update({source_file_path:null}).eq('id',state.application.id).select().single());state.application=app;actions.remove();$('#sourceFileStatus').textContent='No PDF attached';toast('PDF removed.')}catch(error){toast('The PDF removal could not be completed. Please retry.');button.disabled=false}};
  }
 };
 const originalUpload=uploadSourceFile;
 uploadSourceFile=async function(file){
  if(!file)return;
  if(file.size>10*1024*1024)return toast('PDF must be 10 MB or smaller.');
  const bytes=new Uint8Array(await file.slice(0,5).arrayBuffer());
  if(String.fromCharCode(...bytes)!=='%PDF-')return toast('This does not appear to be a PDF. Export a fresh PDF and try again.');
  return originalUpload(file);
 };
 renderOnboarding=function(){
  originalOnboarding();
  $('#obAnswer')?.setAttribute('aria-label','Your first self-written answer');
  const selector=$('#obCriterion');
  if(selector){const drafts=new Map();let previous=selector.value;const change=selector.onchange;selector.onchange=e=>{drafts.set(previous,$('#obAnswer').value);change(e);previous=selector.value;if(drafts.has(previous)){$('#obAnswer').value=drafts.get(previous);$('#obAnswer').dispatchEvent(new Event('input'))}}}
  document.querySelectorAll('.onboarding-screen button').forEach(button=>{
   const handler=button.onclick;if(!handler)return;
   button.onclick=async e=>{if(button.disabled)return;button.disabled=true;try{await handler(e)}catch(error){toast('Setup could not be saved. Please retry this step.')}finally{if(button.isConnected)button.disabled=false}};
  });
 };
 renderStoryBank=function(){
  originalStories();
  const modal=$('#storyModal'),panel=modal.querySelector('.auth-form'),save=$('#saveStory');let editing=null;
  const extra=document.createElement('div');extra.className='story-evidence-fields';extra.innerHTML='<div class="field"><label for="storyEvidence">Evidence to check <span class="method-small">one item per line</span></label><textarea id="storyEvidence" maxlength="2000" rows="3" placeholder="Meeting notes, published report, result to verify..."></textarea></div><div class="field"><label for="storyStatus">Your review status</label><select id="storyStatus"><option>Needs evidence</option><option>Ready to use</option></select><p class="method-small">This is your label, not a verified assessment.</p></div>';
  panel.insertBefore(extra,save);
  const remove=document.createElement('button');remove.id='deleteStory';remove.type='button';remove.className='btn btn-danger';remove.textContent='Delete story';remove.hidden=true;panel.append(remove);
  const setup=(story=null)=>{editing=story?.id||null;panel.querySelector('h3').textContent=story?'Review your story':'Add a story';$('#storyTitle').readOnly=state.demo&&!!story;$('#storyDesc').readOnly=state.demo&&!!story;$('#storyTheme').disabled=state.demo&&!!story;$('#storyEvidence').value=(story?.evidence||[]).join('\n');$('#storyEvidence').readOnly=state.demo;$('#storyStatus').value=story?.status||'Needs evidence';$('#storyStatus').disabled=state.demo;remove.hidden=state.demo||!editing;save.hidden=state.demo&&!!story;save.textContent=story?'Save changes':'Save story'};
  const add=$('#addStoryBtn'),open=add.onclick;add.onclick=e=>{open(e);setup()};
  document.querySelectorAll('button[title="View story"]').forEach((button,index)=>{const view=button.onclick;button.onclick=e=>{view(e);setup(getStories()[index])}});
  save.onclick=async()=>{
   if(state.demo)return toast('This is a fictional demo. Create a free account to save your own work.');
   if(save.disabled)return;
   const title=$('#storyTitle').value.trim(),description=$('#storyDesc').value.trim(),theme=$('#storyTheme').value;
   if(!title||!description)return toast('Add a title and your own experience notes.');
   save.disabled=true;
   try{
    const previous=state.stories.find(s=>s.id===editing);
    const evidence_summary={...(previous?.evidence_summary||{}),theme,evidence:$('#storyEvidence').value.split('\n').map(s=>s.trim()).filter(Boolean).slice(0,20),status:$('#storyStatus').value,strengths:previous?.evidence_summary?.strengths||['Personal experience'],best:[theme==='Career Impact'?'Career':theme==='Course Choice'?'Course':theme]};
    const payload={title,description,evidence_summary};let result;
    if(editing){let request=sb.from('experiences').update(payload).eq('id',editing).eq('user_id',state.user.id);if(previous?.updated_at)request=request.eq('updated_at',previous.updated_at);result=await request.select().maybeSingle();if(!result.error&&!result.data)throw new Error('This story changed in another tab. Keep a copy of your notes and reload.');}
    else result=await sb.from('experiences').insert({...payload,user_id:state.user.id,application_id:state.application.id,source:'manual'}).select().single();
    const saved=safeData(result);state.stories=editing?state.stories.map(s=>s.id===editing?saved:s):[saved,...state.stories];renderStoryBank();toast('Story and evidence notes saved.');
   }catch(error){toast(friendly(error));save.disabled=false}
  };
  remove.onclick=async()=>{if(!editing||!confirm('Permanently delete this story? Your application answers will not be changed.'))return;remove.disabled=true;try{safeData(await sb.from('experiences').delete().eq('id',editing).eq('user_id',state.user.id));state.stories=state.stories.filter(s=>s.id!==editing);renderStoryBank();toast('Story deleted.')}catch(error){toast(friendly(error));remove.disabled=false}};
 };
 async function fingerprint(){const text=Object.keys(CRITERIA).map(key=>key+'\n'+answerText(key)).join('\n---\n');const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text));return [...new Uint8Array(bytes)].map(b=>b.toString(16).padStart(2,'0')).join('')}
 renderFinalProof=async function(){
  if(state.demo)return originalFinal();
  const token=await fingerprint();const stored=state.review?.checklist||{};
  const current=stored.fingerprint===token;const checked=new Set(current&&Array.isArray(stored.checked)?stored.checked:[]);
  shell(`${pageHead('Final Proof','Review the facts, your voice and the complete application.',`<a class="btn btn-secondary" href="${navPath('application')}">Return to your drafts</a>`)}<div class="two-col"><section class="card list-card"><div class="card-head"><h3>Your final review</h3><span id="final-review-count">${checked.size} / ${reviewItems.length}</span></div>${stored.fingerprint&&!current?'<p class="callout">Your answers changed after the last review. Review each item again before marking it complete.</p>':''}${reviewItems.map(([id,text])=>`<label class="final-check"><input type="checkbox" data-final-check value="${id}" ${checked.has(id)?'checked':''}><span>${escapeHTML(text)}</span></label>`).join('')}<p id="final-save-status" role="status">${current?'Your last review is saved.':'Save this review when you are ready.'}</p><button type="button" class="btn btn-primary" id="saveFinalReview">Save review checklist</button><p class="method-small">These are your confirmations, not verification by ShortlistProof. They do not predict selection.</p></section><section class="card list-card"><span class="section-eyebrow">Four answers, one final read</span><h2>Make the next step your own.</h2><p>Check names, dates, examples and claims against your own records. No tool can confirm them for you.</p>${Object.entries(CRITERIA).map(([key,c])=>`<a class="list-row" href="${demoURL('/app/application?criterion='+key)}"><div><b>${escapeHTML(c.label)}</b><p>${countWords(answerText(key))} words saved</p></div></a>`).join('')}<a class="btn btn-secondary" href="https://www.chevening.org/apply/" target="_blank" rel="noopener">Go to official Chevening application guidance</a></section></div>`,'final-proof');
  document.querySelectorAll('[data-final-check]').forEach(input=>input.onchange=()=>{$('#final-review-count').textContent=document.querySelectorAll('[data-final-check]:checked').length+' / '+reviewItems.length;$('#final-save-status').textContent='Unsaved checklist changes'});
  $('#saveFinalReview').onclick=async e=>{const button=e.currentTarget;button.disabled=true;$('#final-save-status').textContent='Saving review...';try{const checklist={version:1,fingerprint:token,checked:[...document.querySelectorAll('[data-final-check]:checked')].map(x=>x.value)};state.review=safeData(await sb.from('application_reviews').upsert({user_id:state.user.id,application_id:state.application.id,checklist,updated_at:new Date().toISOString()},{onConflict:'application_id'}).select().single());$('#final-save-status').textContent='Review saved. Recheck it after changing your answers.'}catch(error){$('#final-save-status').textContent='Review not saved. Please retry.'}finally{button.disabled=false}};
 };
 renderSettings=function(){
  originalSettings();
  const section=document.createElement('section');section.className='card list-card account-tools';section.innerHTML='<div class="card-head"><div><h3>Your account, your data</h3><p class="method-small">Keep a copy and stay in control.</p></div></div><div class="account-tools-grid"><form id="profileForm"><label for="profileName">Display name</label><input id="profileName" maxlength="120" autocomplete="name" required value="'+escapeHTML(displayName())+'"><button class="btn btn-secondary" type="submit">Save name</button></form><div><h4>Export your workspace</h4><p>Download your saved drafts, experience notes, course context and review checklist. Keep the file private.</p><button type="button" class="btn btn-secondary" id="exportWorkspace">Download my data</button></div></div><p id="account-action-status" role="status"></p>';
  $('.content').append(section);
  $('#profileForm').onsubmit=async e=>{e.preventDefault();if(state.demo)return toast('The demo has no account to update.');const button=e.currentTarget.querySelector('button');button.disabled=true;try{const display_name=$('#profileName').value.trim();if(!display_name)throw new Error('Enter your name.');state.profile=safeData(await sb.from('users').update({display_name}).eq('id',state.user.id).select().single());$('#account-action-status').textContent='Display name saved.'}catch(error){$('#account-action-status').textContent=friendly(error)}finally{button.disabled=false}};
  $('#exportWorkspace').onclick=async e=>{if(state.demo)return toast('Create an account to export your own saved workspace.');const button=e.currentTarget;button.disabled=true;try{await ensureData();const data={format:'ShortlistProof workspace export',version:1,exported_at:new Date().toISOString(),profile:{name:displayName(),email:state.user.email},application:{title:state.application.title,cycle:state.application.cycle},answers:Object.entries(state.answers).map(([criterion,a])=>({criterion,text:a.answer_text,updated_at:a.updated_at})),stories:state.stories.map(s=>({title:s.title,description:s.description,evidence:s.evidence_summary})),course:state.course,career:state.careerGoals,review:state.review?.checklist||null};saveDownload('shortlistproof-my-workspace.json',JSON.stringify(data,null,2),'application/json');$('#account-action-status').textContent='Export downloaded. Uploaded PDF files are downloaded separately from My Application.'}catch(error){$('#account-action-status').textContent='Your export could not be prepared. Please retry.'}finally{button.disabled=false}};
  const billing=document.createElement('section');billing.className='card list-card billing-card';billing.id='accountBilling';billing.innerHTML='<h3>Full access and payment history</h3><p>Checking availability...</p>';$('.content').append(billing);renderBilling(billing);
 };
 async function publicBilling(){const result=await sb.rpc('get_public_billing_config');if(result.error)throw result.error;const config=result.data||{};let url;try{url=new URL(config.payment_url)}catch{}return {...config,available:config.available===true&&url?.origin==='https://buy.stripe.com'&&!url.pathname.startsWith('/test_')}}
 async function renderBilling(element){
  if(state.demo){element.innerHTML='<h3>Full access preview</h3><p>You are exploring fictional sample data, not a paid account. No payment can be made from the demo.</p><a class="btn btn-primary" href="/login?mode=signup">Create a free workspace</a>';return}
  try{
   const config=await publicBilling();if(!element.isConnected)return;
   const liveAccess=state.profile?.plan==='full'&&(!state.profile.full_access_until||new Date(state.profile.full_access_until)>new Date());
   element.innerHTML=`<div class="card-head"><h3>Full access and payment history</h3><span class="status-pill ${liveAccess?'good':'warn'}">${liveAccess?'Full access':isSandbox&&state.profile.test_access?'Sandbox access':'Free workspace'}</span></div><p>${liveAccess?'Full access is active'+(state.profile.full_access_until?' until '+new Date(state.profile.full_access_until).toLocaleDateString('en-GB'):'')+'.':config.available?'Full ShortlistProof: GBP 39 once, with access through 31 October 2027. No subscription.':'The planned price is GBP 39 once. Live payments are not open; your free workspace remains available.'}</p>${!liveAccess&&config.available?'<button type="button" id="liveCheckout" class="btn btn-primary">Continue to secure Stripe checkout</button>':''}${isSandbox&&!liveAccess?`<div class="sandbox-panel"><b>Sandbox only - no real charge</b><p>Test purchases grant test access only. They never unlock a live plan.</p><a class="btn btn-secondary" href="${escapeHTML(sandboxCheckoutUrl())}">Open sandbox checkout</a></div>`:''}<p class="method-small">Returning from Stripe is not proof of payment. The signed webhook confirms access. <a href="/help">Payment or refund question?</a></p><div id="paymentHistory" aria-live="polite">Loading payment history...</div>`;
   if($('#liveCheckout'))$('#liveCheckout').onclick=async e=>{const button=e.currentTarget;button.disabled=true;try{const fresh=await publicBilling();if(!fresh.available)throw new Error('Checkout is not available right now.');const url=new URL(fresh.payment_url);url.searchParams.set('client_reference_id',state.user.id);url.searchParams.set('locked_prefilled_email',state.user.email);location.assign(url.toString())}catch(error){toast(friendly(error));button.disabled=false}};
   const result=await sb.from('payments').select('id,amount_minor,currency,status,livemode,created_at,paid_at').eq('user_id',state.user.id).order('created_at',{ascending:false}).limit(20);
   if(!$('#paymentHistory'))return;
   if(result.error){$('#paymentHistory').textContent='Payment history could not be loaded. Please reload or contact support.';return}
   $('#paymentHistory').innerHTML=result.data?.length?result.data.map(p=>`<div class="list-row"><div><b>${money(p.amount_minor,p.currency)} - ${escapeHTML(p.status)}</b><p>${new Date(p.created_at).toLocaleDateString('en-GB')} - ${p.livemode?'Live payment':'Sandbox, not a real payment'}</p></div></div>`).join(''):'<p>No payment records yet.</p>';
  }catch(error){element.innerHTML='<h3>Payment availability could not be checked</h3><p>No payment has been started. Reload this page or <a href="/help">contact support</a>.</p>'}
 }
 renderUpgrade=function(route){
  shell(`${pageHead(ROUTES[route]?.label||'Full workspace','Organise the evidence behind all four answers.')}<section class="upgrade-card card"><div class="upgrade-copy"><span class="section-eyebrow">One workspace. A clearer application process.</span><h2>Stop switching between scattered notes.</h2><p>Bring experiences, drafts and review questions together. See the bigger picture without handing over your voice.</p><div class="upgrade-price">GBP 39 <small>planned one-time price</small></div></div><div class="upgrade-features">${[['Choose your examples','Collect and compare your own experience notes.'],['Review the whole case','See your course, career and four answers together.'],['Keep track of the final read','Save a checklist linked to your current drafts.']].map(([title,text])=>`<div class="upgrade-feature"><div><b>${title}</b><p>${text}</p></div></div>`).join('')}</div><div class="upgrade-actions"><a class="btn btn-primary" href="${demoURL('/app/settings')}">View access and checkout options</a><a class="btn btn-secondary" href="/app?demo=1">Explore the Full demo</a><p>Paid access is offered only when live checkout has been activated. No subscription, generated answers or selection guarantee.</p></div></section>`,route);
 };
 waitForEntitlement=async function(){
  if(state.demo||!state.user||q.get('payment')!=='success'||hasFullAccess())return;
  for(let attempt=0;attempt<8;attempt++){const result=await sb.from('users').select('*').eq('id',state.user.id).maybeSingle();if(!result.error&&result.data){state.profile=result.data;if(hasFullAccess())return}await new Promise(resolve=>setTimeout(resolve,1000))}
 };
 window.ShortlistWorkflow={expires:EXPIRES,reviewItems,publicBilling};
})();
