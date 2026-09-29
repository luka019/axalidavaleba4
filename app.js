const $=s=>document.querySelector(s);
const deadline=new Date('2026-10-06T11:00:00Z');
function tick(){const d=deadline-Date.now();if(d<=0){$('#countdown').textContent='Applications closed';return}const days=Math.floor(d/86400000),hrs=Math.floor((d%86400000)/3600000),mins=Math.floor((d%3600000)/60000);$('#countdown').textContent=days+'d '+hrs+'h '+mins+'m remaining'}tick();setInterval(tick,60000);
$('#answer').addEventListener('input',e=>{$('#words').textContent=(e.target.value.trim().match(/\S+/g)||[]).length+' words'});

const methodology={
leadership:{
  official:'Chevening asks for a clear leadership or influencing example and a clear result.',
  scholar:'Strong evidence makes the influence chain observable: problem → your action → who you influenced → what changed → result.',
  scenario:'Organisational change / stakeholder influence',
  steps:['Get to the problem quickly.','Make your own role visible.','Show the resistance or decision that had to change.','Show exactly how you influenced it.','Prove the outcome with something observable.'],
  signals:[
    ['ownership',/\b(I|my)\b/gi,'Personal ownership','Your own role is visible.'],
    ['initiative',/\b(initiated|launched|created|proposed|identified|started|designed|developed|introduced)\b/gi,'Initiative','You show that you initiated or shaped action.'],
    ['resistance',/\b(resistance|reluctant|opposed|objection|initially|disagreed|barrier|challenge)\b/gi,'Resistance / challenge','There is a real obstacle or position to change.'],
    ['influence',/\b(convinced|persuaded|influenced|negotiated|secured buy.?in|changed.{0,20}(mind|decision|position)|stakeholder)\b/gi,'Observable influence','You show another person’s position or decision changing.'],
    ['outcome',/\b(\d+|percent|%|increased|reduced|saved|resulted|achieved|approved|adopted|implemented|secured|grew)\b/gi,'Outcome','The result is concrete enough to observe.']
  ],
  gapHead:{influence:"You explain what you did, but not what changed because of your influence.",resistance:"Your actions are visible, but the thing you had to change or overcome is not.",outcome:"Your actions are visible. The result is still too abstract.",initiative:"Your responsibility is clear, but the moment you took initiative is not.",ownership:"The story is clear, but your personal contribution is blurred."},
  qs:{influence:"Who needed convincing, what was their original position, and what did you do that changed it?",resistance:"What resistance, disagreement or barrier made this a leadership challenge rather than routine delivery?",outcome:"What changed because of your actions, and how could an assessor observe or measure it?",initiative:"What did you personally notice or initiate before someone else told you to act?",ownership:"Which decisions or actions in this example were specifically yours?"}
},
relationships:{
  official:'Chevening assesses how you build and maintain professional relationships and the outcomes those relationships produce.',
  scholar:'Strong relationship evidence shows purpose, your contribution, mutual value, continued engagement and a concrete outcome.',
  scenario:'Professional network / relationship building',
  steps:['Name the relationship or network clearly.','Explain why it mattered.','Show what value you contributed.','Show how the relationship was sustained or reciprocal.','Connect it to a tangible outcome.'],
  signals:[
    ['relationship',/\b(relationship|network|partnership|rapport|trust|collaboration|stakeholder|community)\b/gi,'Purposeful relationship','The relationship itself is clear.'],
    ['contribution',/\b(supported|helped|introduced|connected|shared|contributed|advised|offered|provided)\b/gi,'Your contribution','You show what you brought to the relationship.'],
    ['reciprocity',/\b(mutual|reciprocal|in return|both|two-way|exchange|together)\b/gi,'Mutual value','The relationship appears two-way rather than transactional.'],
    ['maintain',/\b(maintain|continued|regular|follow.?up|stayed in touch|ongoing|long-term)\b/gi,'Relationship maintenance','You show that the relationship continued over time.'],
    ['outcome',/\b(\d+|resulted|led to|enabled|secured|created|opened|improved|delivered)\b/gi,'Outcome','You connect the relationship to a concrete result.']
  ],
  gapHead:{reciprocity:"We can see the relationship, but not yet why it was genuinely two-way.",maintain:"The relationship starts clearly but does not yet show how you sustained it.",contribution:"The network is visible. Your contribution to it is not specific enough.",outcome:"The relationship is credible, but what it enabled is still generic.",relationship:"The answer mentions people, but not a purposeful professional relationship."},
  qs:{reciprocity:"What did the other person gain from the relationship, and what did you gain from it?",maintain:"What did you do after the first interaction to sustain this relationship?",contribution:"What specific value did you personally contribute to this relationship or network?",outcome:"What concrete opportunity, change or result became possible because this relationship existed?",relationship:"Why did this relationship matter to your professional goal, and how did it begin?"}
},
course:{
  official:'Chevening asks you to focus on your first-choice course, connect it to your background and career goals, and explain how specific modules or areas of study build the skills you need.',
  scholar:'Strong course logic follows a clean chain: current capability gap → specific programme feature → skill gained → credible career use.',
  scenario:'Capability gap → course fit',
  steps:['Start with the capability gap, not university prestige.','Name specific modules or programme features.','Explain exactly what each feature helps you learn.','Connect that learning to your next career step.','Show why this course is a better fit than a generic alternative.'],
  signals:[
    ['gap',/\b(gap|lack|need to develop|need to strengthen|limited|capability|skill|knowledge)\b/gi,'Capability gap','You identify what you still need to learn.'],
    ['specificity',/\b(module|course|programme|professor|centre|lab|clinic|specialis|curriculum)\b/gi,'Programme specificity','You refer to features of the actual programme.'],
    ['link',/\b(because|therefore|will enable|will allow|will equip|so that|directly)\b/gi,'Gap → course link','You connect the programme to the capability gap.'],
    ['choice',/\b(first choice|chosen|selected|prefer|unique|particularly|specifically)\b/gi,'Choice rationale','You explain why this option fits.'],
    ['future',/\b(career|return|future|goal|impact|apply|implement|home country)\b/gi,'Course → future link','The course is connected to what comes next.']
  ],
  gapHead:{specificity:"The course makes sense, but the case could fit many similar programmes.",gap:"We know what you want to study. We do not yet know the capability gap it solves.",link:"The gap and the course are both present, but the bridge between them is still generic.",future:"The programme is relevant. Its role in your next career step is not explicit enough.",choice:"The course appears suitable, but the reason for choosing this specific programme is weak."},
  qs:{specificity:"Which specific module, centre, teaching feature or academic strength directly addresses your capability gap?",gap:"What can you not yet do well enough in your current work that this programme needs to solve?",link:"How will this specific programme feature close the gap you identified?",future:"What will you do differently in your first role after returning because of this course?",choice:"Why this programme rather than another strong UK course in the same field?"}
},
career:{
  official:'Chevening asks for a clear, realistic short-, mid- and long-term career plan with measurable goals and a commitment to positive change.',
  scholar:'Strong career logic reads like a credible sequence, not a wish list: first step → 3–5 year bridge → long-term impact, with measurable milestones.',
  scenario:'Career progression / home-country impact',
  steps:['Name the first realistic post-study step.','Show the 3–5 year bridge.','Define the long-term destination.','Use measurable milestones where possible.','Explain who benefits in your home country and how.'],
  signals:[
    ['short',/\b(immediately|upon return|first year|1 year|one year|short-term|short term)\b/gi,'Short-term step','The plan includes an immediate next step.'],
    ['mid',/\b(3|three|4|four|5|five).{0,12}(year|years)|mid-term|medium-term|medium term\b/gi,'3–5 year bridge','The plan contains an intermediate career step.'],
    ['long',/\b(long-term|long term|10 year|ten year|ultimately|eventually)\b/gi,'Long-term direction','The destination is clear.'],
    ['measurable',/\b(\d+|target|measure|launch|establish|lead|build|create|increase|reduce|policy|programme)\b/gi,'Measurable milestone','The plan includes an observable target or output.'],
    ['impact',/\b(home country|community|sector|national|public|society|impact|return)\b/gi,'Home-country impact','The plan connects career development to wider impact.']
  ],
  gapHead:{mid:"Your long-term ambition is clear. The 3–5 year bridge that makes it credible is missing.",short:"The destination is visible, but the first step after returning is still vague.",measurable:"The ambition is strong, but the plan is difficult to test or measure.",impact:"Your career progression is clear. The home-country impact case is less visible.",long:"The near-term plan is clear, but the longer-term direction is not yet defined."},
  qs:{mid:"What role, responsibility or milestone should you realistically reach in years 3–5 that bridges your first step and long-term ambition?",short:"What exact role or responsibility will you pursue immediately after returning?",measurable:"What observable result would show that this career step has actually been achieved?",impact:"Who in your home country benefits from this plan, and what changes for them?",long:"What is the long-term position or impact you want this sequence of roles to build toward?"}
}};

function count(rx,t){const m=t.match(rx);return m?m.length:0}
function analyse(type,text){
  const lib=methodology[type];
  const scored=lib.signals.map(([k,rx,title,desc])=>({k,title,desc,n:count(rx,text)}));
  const strengths=scored.filter(x=>x.n>0).sort((a,b)=>b.n-a.n).slice(0,2);
  const misses=scored.filter(x=>x.n===0);
  const weak=scored.filter(x=>x.n===1&&!strengths.includes(x));
  const priorityOrder={leadership:['influence','resistance','outcome','ownership','initiative'],relationships:['reciprocity','outcome','maintain','contribution','relationship'],course:['specificity','gap','link','future','choice'],career:['mid','short','measurable','impact','long']}[type];
  let priority=priorityOrder.map(k=>misses.find(x=>x.k===k)).find(Boolean)||misses[0]||weak[0]||scored.sort((a,b)=>a.n-b.n)[0];
  const status=misses.length>=3?'critical':misses.length>=1?'attn':'strong';
  return {lib,scored,strengths:strengths.length?strengths:scored.slice(0,2),misses,priority,status,headline:lib.gapHead[priority.k]||'The evidence is present, but one point still deserves a harder test.',question:lib.qs[priority.k]||'What would make this evidence observable to a sceptical assessor?'};
}
function storyScore(s){
  let score=0;
  [/\b(I|my)\b/i,/\b(led|launched|created|initiated|proposed|negotiated|convinced|influenced)\b/i,/\b(\d+|%|increased|reduced|secured|approved|adopted|resulted)\b/i,/\b(stakeholder|client|team|partner|decision|resistance|challenge)\b/i].forEach(r=>{if(r.test(s))score++});
  return score;
}
function signalRows(scored){
  return scored.map(x=>'<div class="mini-signal"><span>'+x.title+'</span><b class="'+(x.n>0?'hit':'miss')+'">'+(x.n>0?'Visible':'Missing')+'</b></div>').join('');
}

$('#form').addEventListener('submit',e=>{
  e.preventDefault();
  const text=$('#answer').value.trim(),type=$('#criterion').value;
  if(!text)return;
  const r=analyse(type,text);
  $('#leftCount').textContent=Math.max(1,r.misses.length);
  $('#resultStatus').className='status '+r.status;
  $('#resultStatus').textContent=r.status==='strong'?'Strong':r.status==='critical'?'Critical gap':'Needs attention';
  $('#headline').textContent=r.headline;
  $('#summary').textContent=r.status==='strong'?'The core structural signals are visible. The next step is to stress-test whether they are specific enough.':'This is an evidence diagnosis, not a writing score.';
  $('#strengths').innerHTML=r.strengths.map(x=>'<div class="item"><span class="ico">✓</span><div><b>'+x.title+'</b><br><span class="muted">'+x.desc+'</span></div></div>').join('');
  const gapItems=r.misses.length?r.misses.slice(0,3):[r.priority];
  $('#gaps').innerHTML=gapItems.map(x=>'<div class="item bad"><span class="ico">!</span><div><b>'+x.title+'</b><br><span class="muted">This is not yet explicit enough for the structural check.</span></div></div>').join('');
  $('#whyOfficial').textContent=r.lib.official;
  $('#whyScholar').textContent=r.lib.scholar;
  $('#whyUser').textContent=r.headline;
  $('#scenarioType').textContent=r.lib.scenario;
  $('#patternSignals').innerHTML=signalRows(r.scored);
  $('#scholarApproach').innerHTML=r.lib.steps.map(s=>'<li>'+s+'</li>').join('');
  $('#question').textContent=r.question;

  const raw=$('#stories').value.trim(),finder=$('#storyFinder');
  if(raw){
    const stories=raw.split(/\n\s*\n/).map(s=>s.trim()).filter(Boolean);
    if(stories.length){
      const best=stories.map((s,i)=>({s,i,score:storyScore(s)})).sort((a,b)=>b.score-a.score)[0];
      finder.classList.remove('hidden');
      finder.innerHTML='<div class="eyebrow">Best Story signal</div><h3>Another experience may contain stronger usable evidence.</h3><p class="muted">ShortlistProof is not choosing the story for you. It is flagging an alternative with more visible ownership, influence/challenge and outcome signals.</p><div class="story-grid"><div class="story-mini"><b>Current answer</b><br>Visible structural signals: '+r.scored.filter(x=>x.n>0).length+'/'+r.scored.length+'</div><div class="story-mini"><b>Strongest alternative note</b><br>Evidence signals: '+best.score+'/4<br><span class="muted">'+best.s.slice(0,190)+(best.s.length>190?'…':'')+'</span></div></div>';
    } else finder.classList.add('hidden');
  } else finder.classList.add('hidden');

  $('#results').classList.remove('hidden');
  $('#results').scrollIntoView({behavior:'smooth'});
});
$('#copyQ').onclick=()=>navigator.clipboard.writeText($('#question').textContent).then(()=>{$('#copyQ').textContent='Copied';setTimeout(()=>$('#copyQ').textContent='Copy challenge',1300)});
function openModal(){$('#modal').classList.remove('hidden')}
function closeModal(){$('#modal').classList.add('hidden')}
$('#unlock').onclick=openModal;$('#unlock2').onclick=openModal;$('#close').onclick=closeModal;$('#close2').onclick=closeModal;$('#modal').onclick=e=>{if(e.target===$('#modal'))closeModal()};