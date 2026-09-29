
const SUPABASE_URL="https://gqbzaiqppyxweuxpbowl.supabase.co";
const SUPABASE_KEY="sb_publishable_eYWPVhKoOv97r6aKIwzRgQ_ZajBQvcs";
const sb=window.supabase?.createClient?window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY):null;
const DEADLINE=new Date("2026-10-06T11:00:00Z");
const root=document.querySelector("#portal-root");
const icon=(name,size=18)=>`<i data-lucide="${name}" style="width:${size}px;height:${size}px"></i>`;
const q=new URLSearchParams(location.search);
const isDemo=q.get("demo")==="1";
const isSandbox=q.get("sandbox")==="1";
const SANDBOX_PAYMENT_LINK="https://buy.stripe.com/test_5kQdRa3wc1JF6Ar0a6dIA00";
const PREMIUM_ROUTES=new Set(["comparison","story-bank","whole-case","final-proof"]);
const ROUTES={
 dashboard:{label:"Dashboard",icon:"layout-dashboard"},
 application:{label:"My Application",icon:"file-text"},
 "proof-check":{label:"Proof Check",icon:"circle-check-big"},
 comparison:{label:"Method Comparison",icon:"bar-chart-3"},
 "story-bank":{label:"Story Bank",icon:"library"},
 "whole-case":{label:"Whole Case",icon:"waypoints"},
 "final-proof":{label:"Final Proof",icon:"badge-check"},
 resources:{label:"Resources",icon:"book-open"},
 settings:{label:"Settings",icon:"settings"}
};
const DEMO_ANSWERS={
 leadership:`During my final year at university, I led a student initiative to improve digital skills training for underserved young people. I brought together a team of 12 volunteers, partnered with a local NGO, and designed a three-month programme that reached more than 200 students across five communities. I negotiated support from local school leaders who were initially reluctant to add new activities to the timetable. After presenting a pilot plan and evidence from our first sessions, three schools agreed to host the programme. More than 80% of participants reported increased confidence using digital tools. The experience strengthened my commitment to inclusive leadership and showed me how targeted influence can turn a small idea into measurable community impact.`,
 relationships:`I built a professional relationship with a policy specialist I met through a regional workshop. We stayed in touch through regular follow-ups and exchanged practical resources. I later introduced her to a civic organisation that needed data-protection expertise, while she connected me with a working group discussing digital policy reform. Together, these relationships enabled a cross-sector workshop that brought public, private and civil-society participants into the same room.`,
 course:`My first-choice programme addresses a gap in my ability to translate emerging technology regulation into practical governance. Modules on AI governance, data regulation and digital policy will strengthen the analytical tools I need to advise technology companies and public institutions. I chose this programme because its curriculum combines regulation, technology and applied policy analysis. After returning home, I will use this knowledge to build stronger AI and digital-governance practice in Georgia.`,
 career:`Upon returning home, my short-term goal is to work in a technology-law role where I can advise digital products and AI systems. Within three to five years, I plan to lead a specialist technology and AI governance practice and train at least 50 professionals on responsible AI implementation. In the long term, I aim to contribute to national digital policy and build an institution that connects legal practice, technology and public-interest governance. My goal is to help Georgia adopt innovation while protecting rights and building trust.`
};
const DEMO_STORIES=[
 {title:"NGO policy campaign",description:"Led a youth coalition advocating for inclusive education policy at national level.",theme:"Leadership",strengths:["Clear impact","Policy influence","Stakeholder engagement"],evidence:["Impact report","Meeting notes"],best:["Leadership","Career"],status:"Ready to use"},
 {title:"Contract automation rollout",description:"Improved internal efficiency by automating contract workflows, saving 200+ hours annually.",theme:"Career Impact",strengths:["Quantifiable result","Problem solving","Initiative"],evidence:["Performance data","Process documents"],best:["Career","Leadership"],status:"Ready to use"},
 {title:"Student leadership initiative",description:"Founded a cross-faculty network supporting international students and inclusion.",theme:"Relationships",strengths:["Community building","Inclusive leadership","Sustained impact"],evidence:["Event materials","Media coverage"],best:["Relationships","Leadership"],status:"Ready to use"},
 {title:"Women in tech mentorship",description:"Mentored 30+ young women through a structured six-month technology programme.",theme:"Leadership",strengths:["Social impact","Mentoring","Measurable outcome"],evidence:["Programme report","Testimonials"],best:["Leadership"],status:"Needs evidence"},
 {title:"Regulatory reform workshop",description:"Organised a multi-stakeholder workshop on data-protection reform with government and civil society.",theme:"Career Impact",strengths:["Stakeholder engagement","Policy knowledge","Collaboration"],evidence:["Workshop agenda","Participant list"],best:["Career","Relationships"],status:"Ready to use"}
];
const CRITERIA={
 leadership:{label:"Leadership & Influence",official:"Chevening looks for leadership and influencing examples with clear results.",method:"Strong evidence makes the chain visible: challenge → your action → who you influenced → what changed → result.",signals:[["Ownership",/\b(I|my|personally)\b/i],["Specific action",/\b(led|created|launched|organised|organized|negotiated|implemented|designed|built|introduced)\b/i],["Influence",/\b(influenc|persuad|convinc|negotiat|buy-in|stakeholder|changed.{0,24}(decision|position|behavio)|secured support)\b/i],["Challenge",/\b(resistance|challenge|barrier|reluctant|opposed|objection|constraint|initially)\b/i],["Outcome",/\b(\d+|%|increased|reduced|saved|approved|adopted|implemented|resulted|achieved|reached)\b/i]],priority:["Influence","Outcome","Challenge","Ownership"],questions:{Influence:"Who needed convincing, what was their original position, and what did you personally do that changed it?",Outcome:"What changed because of your actions, and how could an assessor observe or measure it?",Challenge:"What obstacle or resistance made this a leadership challenge rather than routine delivery?",Ownership:"Which decisions or actions in this example were specifically yours?"}},
 relationships:{label:"Professional Relationships",official:"Chevening looks for evidence of building and maintaining professional relationships that lead to real outcomes.",method:"Strong relationship evidence shows purpose, contribution, reciprocity, maintenance and an outcome.",signals:[["Purposeful relationship",/\b(relationship|network|partnership|stakeholder|collaboration|community|client|mentor|specialist)\b/i],["Your contribution",/\b(supported|helped|introduced|connected|shared|contributed|advised|provided)\b/i],["Mutual value",/\b(mutual|reciprocal|two-way|exchange|both|together|while she|while he)\b/i],["Maintenance",/\b(maintain|continued|regular|follow.?up|stayed in touch|ongoing|long-term)\b/i],["Outcome",/\b(\d+|resulted|enabled|secured|created|opened|improved|delivered|workshop)\b/i]],priority:["Mutual value","Outcome","Maintenance","Your contribution"],questions:{"Mutual value":"What did the other person gain from the relationship, and what did you gain from it?",Outcome:"What concrete result became possible because this relationship existed?",Maintenance:"What did you do after the first interaction to sustain this relationship?","Your contribution":"What specific value did you personally contribute to this relationship or network?"}},
 course:{label:"Course Choice",official:"Chevening asks you to focus on the first-choice course and explain how it connects to your background, career aspirations and intended impact, including specific modules or areas of study.",method:"Strong course logic follows: capability gap → specific programme feature → skill gained → future use.",signals:[["Capability gap",/\b(gap|lack|need to develop|need to strengthen|capability|skill|knowledge|ability)\b/i],["Course specificity",/\b(module|programme|program|course|professor|centre|center|clinic|curriculum|research)\b/i],["Gap → course link",/\b(because|therefore|will enable|will allow|will equip|so that|directly|addresses)\b/i],["Choice rationale",/\b(first choice|chosen|selected|unique|specifically|particularly|because its)\b/i],["Future use",/\b(career|return|future|goal|impact|apply|implement|home|Georgia)\b/i]],priority:["Course specificity","Capability gap","Gap → course link","Future use"],questions:{"Course specificity":"Which specific module, centre, teaching feature or academic strength directly addresses your capability gap?","Capability gap":"What can you not yet do well enough that this programme needs to solve?","Gap → course link":"How will this specific programme feature close the gap you identified?","Future use":"What will you do differently in your first role after returning because of this course?"}},
 career:{label:"Career Plan",official:"Chevening asks for a clear, realistic short-, mid- and long-term career plan with measurable goals and positive impact.",method:"Strong career evidence reads as a credible sequence: first step → 3–5 year bridge → long-term impact, with observable milestones.",signals:[["Short-term step",/\b(immediately|upon return|first year|1 year|short-term|short term|returning home)\b/i],["3–5 year bridge",/\b(3|three|4|four|5|five).{0,15}(year|years)|mid-term|medium-term|medium term/i],["Long-term direction",/\b(long-term|long term|10 year|ten year|ultimately|eventually|in the long term)\b/i],["Measurable milestone",/\b(\d+|target|measure|launch|establish|lead|build|create|increase|reduce|train)\b/i],["Home-country impact",/\b(home country|community|sector|national|public|society|impact|return|Georgia)\b/i]],priority:["3–5 year bridge","Short-term step","Measurable milestone","Home-country impact"],questions:{"3–5 year bridge":"What role, responsibility or milestone should you realistically reach in years 3–5 that bridges your first step and long-term ambition?","Short-term step":"What exact role or responsibility will you pursue immediately after returning?","Measurable milestone":"What observable result would show that this career step has been achieved?","Home-country impact":"Who in your home country benefits from this plan, and what changes for them?"}}
};
const state={session:null,user:null,profile:null,application:null,answers:{},stories:[],course:null,careerGoals:{},demo:isDemo,route:"dashboard"};
const $=s=>document.querySelector(s);

function analyse(key,text){
 const c=CRITERIA[key];const signals=c.signals.map(([label,rx])=>({label,hit:rx.test(text||"")}));
 const good=signals.filter(x=>x.hit),missing=signals.filter(x=>!x.hit);
 let primary=c.priority.map(p=>missing.find(x=>x.label===p)).find(Boolean)||missing[0]||signals[0];
 return {c,signals,good,missing,primary,status:missing.length<=1?"Strong":missing.length<=3?"Needs attention":"Critical gap",question:c.questions[primary.label]||"What evidence would make this point explicit?"};
}
function routeFromPath(){
 if(location.pathname==="/login")return "login";
 const part=location.pathname.replace(/^\/app\/?/,"").split("/")[0];return part&&ROUTES[part]?part:"dashboard";
}
function navPath(key){return key==="dashboard"?"/app":"/app/"+key}
function hasFullAccess(){return state.demo||state.profile?.plan==="full"}
function sandboxCheckoutUrl(){if(!state.user)return "/login";const u=new URL(SANDBOX_PAYMENT_LINK);u.searchParams.set("client_reference_id",state.user.id);if(state.user.email)u.searchParams.set("locked_prefilled_email",state.user.email);return u.toString()}
function refreshIcons(){if(window.lucide)window.lucide.createIcons()}
function toast(msg){const el=document.createElement("div");el.className="toast";el.textContent=msg;document.body.appendChild(el);setTimeout(()=>el.remove(),2200)}
function displayName(){return state.profile?.display_name||state.user?.user_metadata?.display_name||state.user?.email?.split("@")[0]||"Applicant"}
function initials(){return displayName().split(/\s+/).map(x=>x[0]).slice(0,2).join("").toUpperCase()}
function countWords(s){return (s?.trim().match(/\S+/g)||[]).length}
function answerText(k){return state.answers[k]?.answer_text||(state.demo?DEMO_ANSWERS[k]:"")}
function analysisMap(){return Object.fromEntries(Object.keys(CRITERIA).map(k=>[k,analyse(k,answerText(k))]))}
function completion(){
 const m=analysisMap();const total=20,visible=Object.values(m).reduce((a,x)=>a+x.good.length,0);
 const answered=Object.keys(CRITERIA).filter(k=>answerText(k).trim().length>60).length;
 return {visible,total,answered,progress:Math.round(answered/4*100),map:m};
}
function deadlineParts(){const ms=Math.max(0,DEADLINE-Date.now());return{d:Math.floor(ms/86400000),h:Math.floor(ms%86400000/3600000),m:Math.floor(ms%3600000/60000)}}
async function premiumCall(action,payload={}){
 const {data,error}=await sb.functions.invoke("premium-analysis",{body:{action,...payload}});
 if(error)throw error;
 if(data?.error)throw new Error(data.error);
 return data;
}

function shell(content,active){
 const links=Object.entries(ROUTES).map(([k,v])=>`<a class="side-link ${active===k?"active":""}" href="${navPath(k)}">${icon(v.icon,17)}<span>${v.label}</span>${PREMIUM_ROUTES.has(k)&&!hasFullAccess()?`<span class="nav-lock">${icon("lock-keyhole",11)}</span>`:""}</a>`).join("");
 const mobile=["dashboard","application","proof-check","story-bank","final-proof"].map(k=>`<a class="${active===k?"active":""}" href="${navPath(k)}">${icon(ROUTES[k].icon,17)}<span>${ROUTES[k].label.replace("My ","")}</span></a>`).join("");
 root.innerHTML=`<div class="portal">
  <aside class="sidebar"><a class="side-brand" href="/"><span class="brand-mark">${icon("layers",18)}</span><span><span>ShortlistProof</span><span class="side-sub">Applicant Portal</span></span></a><nav class="side-nav">${links}</nav><div class="side-spacer"></div><div class="side-promo"><span class="crown">${icon("crown",18)}</span><strong>Your Chevening journey, stronger with evidence.</strong><p>See what your application proves — and what it still leaves unclear.</p></div></aside>
  <main class="main"><header class="topbar"><div class="search">${icon("search",16)}<input id="globalSearch" placeholder="Search your application, stories, or resources..."></div><div class="top-actions"><button class="icon-btn" title="Notifications">${icon("bell",17)}</button><button class="icon-btn" title="Language">${icon("globe-2",17)}</button><a class="profile" href="/app/settings"><span class="avatar">${escapeHTML(initials())}</span><span class="profile-meta"><b>${escapeHTML(displayName())}</b><span>${state.demo?"Demo applicant":hasFullAccess()?"Full access":"Free plan"}</span></span>${icon("chevron-down",14)}</a></div></header><div class="content">${state.demo?'<div class="callout" style="margin-bottom:14px"><div class="row-icon">'+icon("eye",16)+'</div><div><b>Portal preview</b><p>You are viewing realistic demo data. Create an account to save your own application, answers and Story Bank.</p></div><a class="btn btn-primary" style="margin-left:auto" href="/login">Create account</a></div>':""}${q.get("payment")==="success"?`<div class="callout ${hasFullAccess()?"success-callout":""}" style="margin-bottom:14px"><div class="row-icon">${icon(hasFullAccess()?"badge-check":"clock-3",16)}</div><div><b>${hasFullAccess()?"Full access unlocked":"Payment received"}</b><p>${hasFullAccess()?"Your account now has Full ShortlistProof access.":"Stripe has returned you to ShortlistProof. Access will unlock as soon as the signed webhook confirms payment."}</p></div></div>`:""}${content}</div></main>
  <nav class="mobile-nav">${mobile}</nav>
 </div>`;
 refreshIcons();
 bindCommon();
}
function bindCommon(){
 const g=$("#globalSearch");if(g)g.addEventListener("keydown",e=>{if(e.key==="Enter"){const v=e.target.value.toLowerCase();if(v.includes("story"))location.href="/app/story-bank";else if(v.includes("proof"))location.href="/app/proof-check";else if(v.includes("final"))location.href="/app/final-proof";else toast("Try searching: story, proof, final, application.")}});
}

function pageHead(title,sub,actions=""){return`<div class="page-head"><div><h1 class="page-title">${title}</h1><p class="page-sub">${sub}</p></div><div class="head-actions">${actions}</div></div>`}
function kpi(iconName,label,value,note,cls="",pct=null){return`<div class="card kpi ${cls}"><div class="kpi-top"><span class="kpi-icon">${icon(iconName,17)}</span>${label}</div><div class="kpi-value">${value}</div>${pct!==null?`<div class="progress"><span style="width:${pct}%"></span></div>`:""}<div class="kpi-note ${note?.startsWith("↑")?"good":""}">${note||""}</div></div>`}

function renderDashboard(){
 const c=completion(),d=deadlineParts(),stories=state.demo?DEMO_STORIES.length:state.stories.length;
 const actions=`<a class="btn btn-secondary" href="/app/proof-check">${icon("scan-search",15)} Run Proof Check</a><a class="btn btn-primary" href="/app/application">Continue application ${icon("arrow-right",14)}</a>`;
 const lead=c.map.leadership;
 const criterionCards=Object.entries(c.map).map(([k,a])=>{
   const pct=Math.round(a.good.length/5*100);
   const cls=a.status==="Strong"?"strong":a.status==="Critical gap"?"critical":"review";
   const gap=a.missing.length?a.primary.label:"No major structural gap";
   return `<a class="criterion-card ${cls}" href="/app/application?criterion=${k}">
     <div class="criterion-card-top"><span class="criterion-icon">${icon(k==="leadership"?"megaphone":k==="relationships"?"users":k==="course"?"graduation-cap":"route",15)}</span><span class="criterion-state">${a.status}</span></div>
     <h3>${CRITERIA[k].label}</h3>
     <div class="criterion-progress"><span style="width:${pct}%"></span></div>
     <div class="criterion-meta"><b>${a.good.length}/5 signals visible</b><span>${escapeHTML(gap)}</span></div>
     <div class="criterion-action">Open answer ${icon("arrow-right",12)}</div>
   </a>`;
 }).join("");
 const priority=c.answered<4
  ? {title:"Complete the remaining core answers",body:"Add your own drafts first. Whole Case and Final Proof become useful only when the application is visible as one candidate story.",href:"/app/application",label:"Continue application"}
  : lead.missing.length
   ? {title:"Strengthen "+lead.primary.label.toLowerCase()+" in your leadership answer",body:lead.question,href:"/app/proof-check?criterion=leadership",label:"Review leadership"}
   : {title:"Read the four answers as one case",body:"Your core answers are present. The next useful step is to test repetition, course-to-career alignment and narrative consistency.",href:"/app/whole-case",label:"Run Whole Case"};
 shell(`${pageHead("Your application overview","See what is complete, what still needs evidence, and the single best next action before submission.",actions)}
 <div class="priority-banner"><span class="priority-icon">${icon("sparkles",17)}</span><div><span class="priority-label">Priority action</span><h3>${priority.title}</h3><p>${priority.body}</p></div><a class="btn btn-primary" href="${priority.href}">${priority.label} ${icon("arrow-right",13)}</a></div>
 <div class="grid-kpi">${kpi("file-text","Application progress",c.progress+"%","${c.answered}/4 core answers added","",c.progress)}${kpi("target","Criteria coverage",c.visible+"/"+c.total,"Evidence signals currently visible","green",Math.round(c.visible/c.total*100))}${kpi("star","Evidence strength",c.visible>=16?"Strong":c.visible>=11?"Developing":"Needs work","Structural evidence only — not a selection score","gold")}${kpi("clock","Deadline readiness",d.d<=2?"Urgent":"On track",d.d+" days remaining","purple",Math.max(6,100-Math.min(100,d.d*5)))} </div>
 <div class="section-title-row"><div><span class="section-eyebrow">Application map</span><h2>Four answers. One candidate story.</h2></div><p>Open the section with the biggest evidence gap first.</p></div>
 <div class="criteria-overview">${criterionCards}</div>
 <div class="dashboard-grid"><div class="stack">
  <div class="card journey"><div class="card-head"><div><h3>Your application journey</h3><span style="font-size:10px;color:var(--muted)">Track each stage without losing the bigger story.</span></div></div><div class="steps">${[
   ["Profile","Completed","done"],["Answers",c.answered+"/4 complete",c.answered===4?"done":"current"],["Course choice",state.answers.course?"Added":"In progress",state.answers.course?"done":"current"],["Career plan",state.answers.career?"Added":"In progress",state.answers.career?"done":""],["Whole Case","Not checked",""],["Final Proof","Not checked",""]
  ].map(([a,b,cl])=>`<div class="step ${cl}"><div class="step-dot">${cl==="done"?icon("check",12):icon("circle",10)}</div><b>${a}</b><span>${b}</span></div>`).join("")}</div></div>
  <div class="two-col">
   <div class="card list-card"><div class="card-head"><h3>Next actions</h3><a href="/app/application">View application →</a></div>
    <div class="list-row"><span class="row-icon">${icon("file-pen-line",16)}</span><div><b>${c.answered<4?"Complete your remaining answers":"Run a Whole Case review"}</b><p>${c.answered<4?"Add your own drafts so the portal can analyse them together.":"Check whether four individually strong answers tell one coherent story."}</p></div><a class="arrow-btn" href="${c.answered<4?"/app/application":"/app/whole-case"}">${icon("arrow-right",13)}</a></div>
    <div class="list-row"><span class="row-icon purple">${icon("library",16)}</span><div><b>Add another strong experience</b><p>Build your Story Bank before locking the example you use.</p></div><a class="arrow-btn" href="/app/story-bank">${icon("arrow-right",13)}</a></div>
    <div class="list-row"><span class="row-icon gold">${icon("scan-search",16)}</span><div><b>Run a Proof Check</b><p>See what the assessor can actually see in one answer.</p></div><a class="arrow-btn" href="/app/proof-check">${icon("arrow-right",13)}</a></div>
   </div>
   <div class="card list-card"><div class="card-head"><h3>Latest feedback</h3><a href="/app/comparison">View comparisons →</a></div>
    ${Object.entries(c.map).slice(0,3).map(([k,a],i)=>`<div class="list-row"><span class="row-icon ${i===1?"green":i===2?"gold":""}">${icon(i===0?"message-square-text":i===1?"thumbs-up":"lightbulb",16)}</span><div><b>${CRITERIA[k].label}</b><p>${a.missing.length?a.primary.label+" is the clearest remaining gap.":"Core structural signals are visible."}</p></div><span class="row-right">${a.status}</span></div>`).join("")}
   </div>
  </div>
  <div class="two-col"><div class="card section-bars"><div class="card-head"><h3>Criteria coverage</h3><a href="/app/proof-check">View detail →</a></div>
   ${Object.entries(c.map).map(([k,a])=>`<div class="score-row"><span>${CRITERIA[k].label.replace("Professional ","")}</span><div class="progress"><span style="width:${a.good.length/5*100}%"></span></div><b>${a.good.length}/5</b></div>`).join("")}
  </div>
  <div class="card list-card"><div class="card-head"><h3>Story Bank status</h3><a href="/app/story-bank">Open Story Bank →</a></div><div style="display:flex;gap:18px;align-items:center;padding:10px 0"><span class="row-icon" style="width:50px;height:50px">${icon("database",24)}</span><div><b style="font-size:32px;color:var(--navy)">${stories}</b><p style="margin:0;color:var(--muted);font-size:10px">stories saved</p></div><div style="margin-left:auto;text-align:right"><b style="color:var(--green)">${Math.max(0,stories-1)}</b><p style="margin:0;color:var(--muted);font-size:10px">with evidence</p></div></div><div class="callout"><span class="row-icon">${icon("lightbulb",15)}</span><div><b>Use the Story Bank before rewriting.</b><p>A stronger example can solve a weak answer faster than polishing weak evidence.</p></div></div></div></div>
 </div><div class="stack">
  <div class="card deadline-card"><div class="card-head"><h3>Time to deadline</h3>${icon("calendar-clock",17)}</div><div class="countdown"><div class="count-box"><strong>${d.d}</strong><span>Days</span></div><div class="count-box"><strong>${d.h}</strong><span>Hours</span></div><div class="count-box"><strong>${d.m}</strong><span>Minutes</span></div></div><a class="btn btn-primary" style="width:100%" href="/app/application">Continue my application ${icon("arrow-right",14)}</a></div>
  <div class="card quick-card"><div class="card-head"><h3>Quick links</h3></div>${[["file-text","My Application","/app/application"],["circle-check-big","Run Proof Check","/app/proof-check"],["bar-chart-3","Compare with evidence method","/app/comparison"],["book-open","Official resources","/app/resources"]].map(x=>`<a class="list-row" href="${x[2]}"><span class="row-icon">${icon(x[0],15)}</span><div><b>${x[1]}</b></div><span class="arrow-btn">${icon("chevron-right",12)}</span></a>`).join("")}</div>
 </div></div>`,"dashboard");
}

function renderApplication(){
 let active=q.get("criterion")||"leadership";if(!CRITERIA[active])active="leadership";
 const tabs=Object.entries(CRITERIA).map(([k,c])=>`<button class="answer-tab ${k===active?"active":""}" data-tab="${k}"><b>${c.label}</b><span>${countWords(answerText(k))} words</span></button>`).join("");
 const course=state.course||{},goals=state.careerGoals||{};
 const currentText=state.answers[active]?.answer_text|| (state.demo?DEMO_ANSWERS[active]:"");
 const currentAnalysis=analyse(active,currentText);
 const sourceLabel=state.application?.source_file_path?"PDF saved privately":"No CV/LinkedIn PDF added";
 shell(`${pageHead("My Application","Keep the evidence, course context, career direction and four self-written answers in one place.",`<a class="btn btn-secondary" href="/app/whole-case">${icon("waypoints",15)} Whole Case</a><a class="btn btn-primary" href="/app/proof-check?criterion=${active}">Run Proof Check ${icon("arrow-right",14)}</a>`)}
 <div class="application-grid">
  <div class="card answer-card">
   <div class="answer-tabs">${tabs}</div>
   <div class="editor-head">
    <div><span class="section-eyebrow">Core answer</span><h3 id="answerTitle">${CRITERIA[active].label}</h3><p>Write in your own words. Use the checklist to see what evidence is visible before you polish the prose.</p></div>
    <span id="editorStatus" class="status-pill ${currentAnalysis.status==="Strong"?"good":"warn"}"><span class="dot"></span>${currentAnalysis.status}</span>
   </div>
   <div id="editorSignals" class="editor-signals">${currentAnalysis.signals.map(s=>`<span class="signal-chip ${s.hit?"visible":""}">${icon(s.hit?"check":"circle",11)} ${s.label}</span>`).join("")}</div>
   <textarea id="answerEditor" class="answer-editor" maxlength="7000" placeholder="Add your self-written answer...">${escapeHTML(currentText)}</textarea>
   <div class="editor-meta"><span id="editorWords">${countWords(currentText)} words</span><span id="saveState">${state.demo?"Demo preview":"Saved"}</span></div>
   <div class="save-bar"><a class="btn btn-secondary" id="checkCurrent" href="/app/proof-check?criterion=${active}">Check this answer</a><button class="btn btn-primary" id="saveAnswer">${icon("save",14)} Save answer</button></div>
  </div>
  <div class="stack">
   <div class="card list-card context-card">
    <div class="card-head"><div><h3>Evidence source</h3><span class="context-sub">Optional, but useful for Story Bank and evidence mapping.</span></div></div>
    <div class="upload-box">
      <span class="row-icon">${icon("file-up",16)}</span>
      <div><b>CV or LinkedIn PDF</b><p id="sourceFileStatus">${sourceLabel}</p></div>
      <label class="btn btn-secondary upload-btn">Choose PDF<input id="sourceFile" type="file" accept="application/pdf"></label>
    </div>
    <div class="context-help">${icon("shield-check",13)} Private bucket · PDF only · maximum 10 MB.</div>
   </div>
   <div class="card list-card context-card">
    <div class="card-head"><div><h3>First-choice course</h3><span class="context-sub">This context helps test course → capability → career logic.</span></div></div>
    <label class="mini-field">University<input id="courseInstitution" maxlength="180" placeholder="University name" value="${escapeHTML(course.institution||"")}"></label>
    <label class="mini-field">Programme<input id="courseProgramme" maxlength="220" placeholder="Programme name" value="${escapeHTML(course.programme||"")}"></label>
    <label class="mini-field">Relevant modules <span>comma-separated</span><input id="courseModules" maxlength="600" placeholder="Module 1, Module 2" value="${escapeHTML((course.modules||[]).join(", "))}"></label>
   </div>
   <div class="card list-card context-card">
    <div class="card-head"><div><h3>Career direction</h3><span class="context-sub">Keep the sequence visible before you assess the career answer.</span></div></div>
    <label class="mini-field">Short term<textarea id="goalShort" rows="2" maxlength="1200" placeholder="Immediately after returning...">${escapeHTML(goals.short?.goal||"")}</textarea></label>
    <label class="mini-field">3–5 years<textarea id="goalMid" rows="2" maxlength="1200" placeholder="The bridge to your longer-term goal...">${escapeHTML(goals.mid?.goal||"")}</textarea></label>
    <label class="mini-field">Long term<textarea id="goalLong" rows="2" maxlength="1200" placeholder="The longer-term role or impact...">${escapeHTML(goals.long?.goal||"")}</textarea></label>
    <button class="btn btn-secondary" id="saveContext">${icon("save",14)} Save context</button>
   </div>
   <div class="card list-card"><div class="card-head"><h3>What Chevening is testing</h3></div><p style="font-size:11px;color:var(--muted);line-height:1.7">${CRITERIA[active].official}</p></div>
   <div class="card list-card"><div class="card-head"><h3>Evidence method</h3></div><p style="font-size:11px;color:var(--muted);line-height:1.7">${CRITERIA[active].method}</p></div>
  </div>
 </div>`,"application");
 document.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>{location.href="/app/application?criterion="+b.dataset.tab});
 const updateEditorSignals=()=>{
   const text=$("#answerEditor").value,a=analyse(active,text);
   $("#editorWords").textContent=countWords(text)+" words";
   $("#editorSignals").innerHTML=a.signals.map(s=>`<span class="signal-chip ${s.hit?"visible":""}">${icon(s.hit?"check":"circle",11)} ${s.label}</span>`).join("");
   $("#editorStatus").className="status-pill "+(a.status==="Strong"?"good":"warn");
   $("#editorStatus").innerHTML='<span class="dot"></span>'+a.status;
   if(!state.demo)$("#saveState").textContent="Unsaved changes";
   refreshIcons();
 };
 $("#answerEditor").addEventListener("input",updateEditorSignals);
 $("#saveAnswer").onclick=async()=>{if(state.demo)return toast("Create an account to save your own work.");$("#saveState").textContent="Saving…";const saved=await saveAnswer(active,$("#answerEditor").value);$("#saveState").textContent=saved?"Saved just now":"Save failed";if(saved)toast("Answer saved.");};
 $("#saveContext").onclick=()=>saveApplicationContext();
 $("#sourceFile").onchange=e=>uploadSourceFile(e.target.files?.[0]);
}
function renderProofCheck(){
 let key=q.get("criterion")||"leadership";if(!CRITERIA[key])key="leadership";
 const text=state.answers[key]?.answer_text||(state.demo?DEMO_ANSWERS[key]:"");
 shell(`${pageHead("Proof Check","What can the assessor actually see in this answer?",`<a class="btn btn-secondary" href="/app/application?criterion=${key}">${icon("pencil",14)} Edit answer</a>`)}
 <div class="review-layout"><div class="review-main"><div class="card answer-analysis"><div class="card-head"><div><h3>Check one answer</h3><span style="font-size:10px;color:var(--muted)">Structural evidence check — not an official Chevening score.</span></div></div><div style="display:flex;gap:9px;margin-bottom:10px"><select id="proofCriterion" style="border:1px solid var(--line);border-radius:10px;padding:9px 11px">${Object.entries(CRITERIA).map(([k,c])=>`<option value="${k}" ${k===key?"selected":""}>${c.label}</option>`).join("")}</select></div><textarea id="proofText" class="answer-editor" style="min-height:280px">${escapeHTML(text)}</textarea><div class="editor-meta"><span id="proofWords">${countWords(text)} words</span><span>Your own text only</span></div><div class="save-bar"><button class="btn btn-primary" id="runProof">${icon("scan-search",14)} Run Proof Check</button></div></div><div id="proofOutput"></div></div>
 <div class="stack"><div class="card list-card"><div class="card-head"><h3>Why this matters</h3></div><p style="font-size:11px;color:var(--muted);line-height:1.7">A polished sentence can still contain weak evidence. The check looks for visible structural signals, then asks you to strengthen the missing evidence in your own words.</p></div><div class="card list-card"><div class="card-head"><h3>Recent checks</h3></div><div id="proofHistory"></div></div><div class="card list-card"><div class="card-head"><h3>Next step</h3></div><a class="list-row" href="/app/comparison?criterion=${key}"><span class="row-icon">${icon("bar-chart-3",15)}</span><div><b>Method Comparison</b><p>Compare the evidence structure with the live structured methodology.</p></div><span class="arrow-btn">${icon("arrow-right",12)}</span></a></div></div></div>`,"proof-check");
 $("#proofText").addEventListener("input",e=>$("#proofWords").textContent=countWords(e.target.value)+" words");
 $("#proofCriterion").onchange=e=>{location.href="/app/proof-check?criterion="+e.target.value};
 $("#runProof").onclick=async()=>{const k=$("#proofCriterion").value,t=$("#proofText").value.trim();if(!t)return toast("Add your self-written answer first.");const a=analyse(k,t);renderProofOutput(k,t);await persistProofResult(k,t,a);await loadProofHistory(k);if(!state.demo)toast("Check saved to history.");};
 if(text)renderProofOutput(key,text);
 loadProofHistory(key);
}
function renderProofOutput(key,text){
 const a=analyse(key,text);const el=$("#proofOutput");if(!el)return;
 el.innerHTML=`<div class="card answer-analysis"><div class="card-head"><div><h3>${a.status}</h3><span style="font-size:10px;color:var(--muted)">${a.good.length}/5 structural signals visible</span></div><span class="status-pill ${a.status==="Strong"?"good":"warn"}"><span class="dot"></span>${a.status}</span></div><div class="analysis-grid">
 <div class="analysis-card good"><h4>What already works</h4><ul>${a.good.map(x=>`<li>${x.label}</li>`).join("")||"<li>No major signal is explicit yet.</li>"}</ul></div>
 <div class="analysis-card warn"><h4>What is missing</h4><ul>${a.missing.map(x=>`<li>${x.label}</li>`).join("")||"<li>No major structural signal is missing.</li>"}</ul></div>
 <div class="analysis-card"><h4>Official criterion</h4><p>${a.c.official}</p></div>
 <div class="analysis-card"><h4>Evidence method</h4><p>${a.c.method}</p></div></div>
 <div class="callout" style="margin-top:12px"><span class="row-icon">${icon("lightbulb",15)}</span><div><b>Fix My Gap</b><p>${a.question}</p></div><a class="btn btn-secondary" style="margin-left:auto" href="/app/comparison?criterion=${key}">Compare method</a></div></div>`;refreshIcons();
}

function getStories(){
 if(state.demo)return DEMO_STORIES;
 return state.stories.map(s=>({id:s.id,title:s.title,description:s.description||"",theme:s.evidence_summary?.theme||"Experience",strengths:s.evidence_summary?.strengths||["Personal example"],evidence:s.evidence_summary?.evidence||[],best:s.evidence_summary?.best||[],status:s.evidence_summary?.status||"Needs evidence"}));
}
function renderStoryBank(){
 const stories=getStories();
 shell(`${pageHead("Story Bank","Your library of examples, achievements and leadership stories. Organise evidence before choosing what to write.",`<button class="btn btn-secondary" id="bestStoryBtn">${icon("sparkles",14)} Best Story Finder</button><button class="btn btn-primary" id="addStoryBtn">${icon("plus",14)} Add story</button>`)}
 <div class="grid-kpi">${kpi("library","Total stories",stories.length,stories.length?"Build breadth before choosing examples":"Start with your strongest experience")}${kpi("circle-check-big","Ready to use",stories.filter(x=>x.status==="Ready to use").length,"Strong and evidence-backed","green")}${kpi("triangle-alert","Needs evidence",stories.filter(x=>x.status!=="Ready to use").length,"Add a result, source or clearer role","gold")}${kpi("link","Used across criteria",new Set(stories.flatMap(x=>x.best)).size,"Reuse evidence strategically","purple")}</div>
 <div class="card table-card story-library" style="margin-top:14px">
  <div class="table-tools story-tools">
   <div class="chips">
    <button class="chip active" data-story-filter="all">All (${stories.length})</button>
    <button class="chip" data-story-filter="leadership">Leadership</button>
    <button class="chip" data-story-filter="relationships">Relationships</button>
    <button class="chip" data-story-filter="course">Course</button>
    <button class="chip" data-story-filter="career">Career</button>
   </div>
   <label class="story-search">${icon("search",14)}<input id="storySearch" placeholder="Search stories"></label>
  </div>
 ${stories.length?`<table class="story-table"><thead><tr><th>Story</th><th>Theme</th><th>Strengths</th><th>Evidence</th><th>Best used for</th><th>Status</th><th></th></tr></thead><tbody>${stories.map((s,i)=>`<tr data-story-row data-search="${escapeHTML((s.title+" "+s.description+" "+s.theme+" "+s.best.join(" ")).toLowerCase())}" data-theme="${escapeHTML((s.theme+" "+s.best.join(" ")).toLowerCase())}"><td><div class="story-title"><span class="row-icon">${icon(i%2?"bar-chart-3":"users",15)}</span><div><b>${escapeHTML(s.title)}</b><p>${escapeHTML(s.description)}</p></div></div></td><td><span class="tag ${s.theme.includes("Career")?"purple":s.theme.includes("Relationship")?"gold":""}">${escapeHTML(s.theme)}</span></td><td>${s.strengths.map(x=>`<div class="story-strength">• ${escapeHTML(x)}</div>`).join("")}</td><td>${s.evidence.length?s.evidence.map(x=>`<span class="tag">${escapeHTML(x)}</span>`).join(""):'<span class="muted-small">Add proof</span>'}</td><td>${s.best.map(x=>`<span class="tag">${escapeHTML(x)}</span>`).join("")}</td><td><span class="status-pill ${s.status==="Ready to use"?"good":"warn"}"><span class="dot"></span>${s.status}</span></td><td><button class="icon-btn" title="Story actions">${icon("more-horizontal",14)}</button></td></tr>`).join("")}</tbody></table><div id="storyNoResults" class="empty hidden"><span class="row-icon">${icon("search-x",18)}</span><h3>No matching stories</h3><p>Try a different filter or search term.</p></div>`:`<div class="empty"><span class="row-icon">${icon("library",18)}</span><h3>No stories yet</h3><p>Add strong experiences before you lock the examples in your four answers.</p></div>`}
 </div>
 <div id="storyModal" class="modal-backdrop hidden"><div class="auth-form" style="background:#fff;padding:24px;border-radius:20px;max-width:520px"><div class="card-head"><h3>Add a story</h3><button id="closeStory" class="icon-btn">${icon("x",15)}</button></div><div class="field"><label>Story title</label><input id="storyTitle"></div><div class="field"><label>What happened?</label><textarea id="storyDesc" style="width:100%;min-height:120px;border:1px solid var(--line);border-radius:11px;padding:11px"></textarea></div><div class="field"><label>Theme</label><select id="storyTheme" style="width:100%;border:1px solid var(--line);border-radius:11px;padding:11px"><option>Leadership</option><option>Relationships</option><option>Career Impact</option><option>Course Choice</option></select></div><button class="btn btn-primary" style="width:100%" id="saveStory">Save story</button></div></div>`,"story-bank");
 $("#addStoryBtn").onclick=()=>$("#storyModal").classList.remove("hidden");$("#closeStory").onclick=()=>$("#storyModal").classList.add("hidden");
 const applyStoryFilters=()=>{
   const active=document.querySelector("[data-story-filter].active")?.dataset.storyFilter||"all";
   const term=($("#storySearch")?.value||"").trim().toLowerCase();
   let visible=0;
   document.querySelectorAll("[data-story-row]").forEach(row=>{
     const theme=row.dataset.theme||"",search=row.dataset.search||"";
     const show=(active==="all"||theme.includes(active))&&(!term||search.includes(term));
     row.classList.toggle("hidden",!show);if(show)visible++;
   });
   if($("#storyNoResults"))$("#storyNoResults").classList.toggle("hidden",visible>0);
 };
 document.querySelectorAll("[data-story-filter]").forEach(btn=>btn.onclick=()=>{document.querySelectorAll("[data-story-filter]").forEach(x=>x.classList.remove("active"));btn.classList.add("active");applyStoryFilters();});
 if($("#storySearch"))$("#storySearch").addEventListener("input",applyStoryFilters);
 $("#saveStory").onclick=async()=>{const title=$("#storyTitle").value.trim(),description=$("#storyDesc").value.trim(),theme=$("#storyTheme").value;if(!title||!description)return toast("Add a title and description.");await saveStory(title,description,theme);};
 $("#bestStoryBtn").onclick=async()=>{if(!stories.length)return toast("Add at least one story first.");if(state.demo){const best=[...stories].sort((a,b)=>(b.strengths?.length||0)+(b.evidence?.length||0)-(a.strengths?.length||0)-(a.evidence?.length||0))[0];return toast("Best current evidence signal: "+best.title)}try{const d=await premiumCall("best_story",{criterion:q.get("criterion")||"leadership"});if(!d.best)return toast("Add stronger story evidence first.");toast("Best current story: "+d.best.title);}catch(err){console.error(err);toast("Best Story Finder could not run.");}}
}

async function renderComparison(){
 let key=q.get("criterion")||"leadership";if(!CRITERIA[key])key="leadership";
 if(state.demo){
  const text=answerText(key),a=analyse(key,text),example=text||"Add your answer to see an evidence comparison.";
  shell(`${pageHead(CRITERIA[key].label,`Method Comparison · ${a.status}`,`<a class="btn btn-secondary" href="/app/application?criterion=${key}">${icon("pencil",14)} Edit answer</a><a class="btn btn-primary" href="/app/proof-check?criterion=${key}">Run re-check ${icon("arrow-right",14)}</a>`)}
  <div class="review-layout"><div class="review-main"><div class="card answer-analysis"><div class="card-head"><h3>Your answer</h3><span>${countWords(example)} words</span></div><div class="answer-box">${escapeHTML(example)}</div>
  <div class="analysis-grid"><div class="analysis-card"><h4>Official criteria</h4><p>${a.c.official}</p></div><div class="analysis-card"><h4>Evidence method</h4><p>${a.c.method}</p></div><div class="analysis-card good"><h4>What already works</h4><ul>${a.good.map(x=>`<li>${x.label}</li>`).join("")}</ul></div><div class="analysis-card warn"><h4>What is missing</h4><ul>${a.missing.map(x=>`<li>${x.label}</li>`).join("")||"<li>No major structural signal is missing.</li>"}</ul></div></div></div>
  <div class="callout"><span class="row-icon">${icon("lightbulb",15)}</span><div><b>Suggested next question</b><p>${a.question}</p></div></div></div></div>`,"comparison");
  return;
 }
 shell(`${pageHead(CRITERIA[key].label,"Method Comparison · loading",`<a class="btn btn-secondary" href="/app/application?criterion=${key}">${icon("pencil",14)} Edit answer</a><a class="btn btn-primary" href="/app/proof-check?criterion=${key}">Run re-check ${icon("arrow-right",14)}</a>`)}
 <div class="card list-card"><div class="empty"><span class="row-icon">${icon("loader-circle",18)}</span><h3>Reading your saved evidence…</h3><p>Full analysis runs on the secure server after your access is verified.</p></div></div>`,"comparison");
 try{
  const d=await premiumCall("comparison",{criterion:key}),a=d.analysis,example=d.answer||"Add your answer to see an evidence comparison.";
  shell(`${pageHead(a.label,`Method Comparison · ${a.status}`,`<a class="btn btn-secondary" href="/app/application?criterion=${key}">${icon("pencil",14)} Edit answer</a><a class="btn btn-primary" href="/app/proof-check?criterion=${key}">Run re-check ${icon("arrow-right",14)}</a>`)}
  <div class="card flow"><div class="flow-steps">${[["check","Draft imported","done"],["check","Proof Check","done"],["bar-chart-3","Method Comparison","current"],["wrench","Fix My Gap",""],["rotate-cw","Re-check",""],["badge-check","Final Proof",""]].map(([ic,l,cl])=>`<div class="flow-step step ${cl}"><div class="step-dot">${icon(ic,12)}</div><b>${l}</b></div>`).join("")}</div></div>
  <div class="review-layout" style="margin-top:14px"><div class="review-main"><div class="card answer-analysis"><div class="card-head"><h3>Your answer</h3><span style="font-size:10px;color:var(--muted)">${a.wordCount} words</span></div><div class="answer-box">${escapeHTML(example)}</div>
  <div class="analysis-grid"><div class="analysis-card"><h4>Official criteria</h4><p>${escapeHTML(a.official)}</p></div><div class="analysis-card"><h4>Evidence method</h4><p>${escapeHTML(a.method)}</p></div><div class="analysis-card good"><h4>What already works</h4><ul>${a.good.map(x=>`<li>${escapeHTML(x)}</li>`).join("")||"<li>Add more explicit evidence.</li>"}</ul></div><div class="analysis-card warn"><h4>What is missing</h4><ul>${a.missing.map(x=>`<li>${escapeHTML(x)}</li>`).join("")||"<li>No major structural signal is missing.</li>"}</ul></div></div></div>
  <div class="card comparison"><div class="card-head"><h3>Your answer vs. structured methodology</h3><span style="font-size:10px;color:var(--muted)">Structural comparison, not selection odds</span></div><div class="comparison-grid"><div>${a.signals.map(s=>`<div class="comparison-row"><span>${escapeHTML(s.label)}</span><div class="progress"><span style="width:${s.hit?88:38}%"></span></div><b>${s.hit?"Visible":"Gap"}</b><span>${s.hit?"✓":"!"}</span></div>`).join("")}</div><div class="radar-box"><div class="radar"></div><span style="font-size:9px;color:var(--muted)">Closest structural pattern: ${escapeHTML(a.pattern)}</span></div></div></div>
  <div class="callout"><span class="row-icon">${icon("lightbulb",15)}</span><div><b>Suggested next question</b><p>${escapeHTML(a.question)}</p></div></div></div>
  <div class="stack"><div class="card list-card"><div class="card-head"><h3>Answer details</h3></div><div class="list-row"><div><b>Status</b><p>${escapeHTML(a.status)}</p></div></div><div class="list-row"><div><b>Word count</b><p>${a.wordCount} words</p></div></div><div class="list-row"><div><b>Visible signals</b><p>${a.good.length}/5</p></div></div></div>
  <div class="card list-card"><div class="card-head"><h3>Relevant stories</h3><a href="/app/story-bank">Browse all →</a></div>${(d.relevantStories||[]).map(s=>`<div class="list-row"><span class="row-icon">${icon("library",15)}</span><div><b>${escapeHTML(s.title)}</b><p>${escapeHTML(s.theme)}</p></div></div>`).join("")||'<p style="font-size:10px;color:var(--muted)">Add Story Bank evidence to see relevant examples here.</p>'}</div>
  <div class="card list-card"><div class="card-head"><h3>Source labels</h3></div><div class="list-row"><span class="row-icon green">${icon("shield-check",15)}</span><div><b>Official criterion</b><p>Current public Chevening guidance.</p></div></div><div class="list-row"><span class="row-icon gold">${icon("layers",15)}</span><div><b>Structured methodology</b><p>The live result uses explicit evidence rules. Permissioned Scholar material is added only when verified and labelled.</p></div></div></div></div></div>`,"comparison");
 }catch(err){console.error(err);renderFatal("Full analysis could not be loaded. Please retry.");}
}
async function renderWholeCase(){
 if(state.demo){
  const c=completion(),m=c.map,courseCareer=m.course.good.length>=3&&m.career.good.length>=3;
  shell(`${pageHead("Whole Case","Four individually good answers can still create one confused application.",`<a class="btn btn-primary" href="/app/final-proof">Continue to Final Proof ${icon("arrow-right",14)}</a>`)}
  <div class="grid-kpi">${kpi("files","Answers present",c.answered+"/4","Demo structural review","",c.progress)}${kpi("link","Course → career bridge",courseCareer?"Visible":"Needs attention","Demo evidence signals","green")}${kpi("repeat-2","Example repetition","Review","Demo preview","gold")}${kpi("route","Narrative direction",c.visible>=14?"Coherent":"Developing","Structural consistency only","purple")}</div>`,"whole-case");return;
 }
 shell(`${pageHead("Whole Case","Four individually good answers can still create one confused application.",`<a class="btn btn-primary" href="/app/final-proof">Continue to Final Proof ${icon("arrow-right",14)}</a>`)}<div class="card list-card"><div class="empty"><span class="row-icon">${icon("loader-circle",18)}</span><h3>Reading the application as one case…</h3></div></div>`,"whole-case");
 try{
  const d=await premiumCall("whole_case");
  shell(`${pageHead("Whole Case","Four individually good answers can still create one confused application.",`<a class="btn btn-primary" href="/app/final-proof">Continue to Final Proof ${icon("arrow-right",14)}</a>`)}
  <div class="grid-kpi">${kpi("files","Answers present",d.answered+"/4","Whole Case becomes stronger with all four answers","",d.progress)}${kpi("link","Course → career bridge",d.courseCareer?"Visible":"Needs attention",d.courseCareer?"Both sections contain future-use signals":"Strengthen the bridge between study and career","green")}${kpi("repeat-2","Example repetition",d.repetition.level,d.repetition.level==="Low"?"No strong overlap signal detected":"Review overlapping evidence language","gold")}${kpi("route","Narrative direction",d.narrative,"Structural consistency only","purple")}</div>
  <div class="two-col" style="margin-top:14px"><div class="card list-card"><div class="card-head"><h3>Cross-application checks</h3></div>${d.crossChecks.map(x=>`<div class="list-row"><span class="row-icon ${x.ok?"green":"gold"}">${icon(x.ok?"check":"triangle-alert",15)}</span><div><b>${escapeHTML(x.label)}</b><p>${escapeHTML(x.detail)}</p></div></div>`).join("")}</div>
  <div class="card list-card"><div class="card-head"><h3>Criteria snapshot</h3></div>${Object.entries(d.analyses).map(([k,a])=>`<div class="list-row"><span class="row-icon ${a.status==="Strong"?"green":"gold"}">${icon(a.status==="Strong"?"check":"circle-alert",15)}</span><div><b>${CRITERIA[k].label}</b><p>${a.good.length}/5 signals visible · ${a.primary?escapeHTML(a.primary)+" is the main gap":"No major structural gap"}</p></div></div>`).join("")}</div></div>
  <div class="callout" style="margin-top:14px"><span class="row-icon">${icon("info",15)}</span><div><b>Whole Case does not score your chance of selection.</b><p>It checks consistency and evidence across the four core areas. The secure server verifies Full access before running this review.</p></div></div>`,"whole-case");
 }catch(err){console.error(err);renderFatal("Whole Case analysis could not be loaded. Please retry.");}
}
async function renderFinalProof(){
 if(state.demo){
  const c=completion(),checks=[["All four core answers are present",c.answered===4],["No critical structural gap detected",Object.values(c.map).every(x=>x.missing.length<4)]],passed=checks.filter(x=>x[1]).length;
  shell(`${pageHead("Final Proof","One last structural QA before you submit.")}<div class="grid-kpi">${kpi("badge-check","Demo checks",passed+"/"+checks.length,"Preview only","green",passed/checks.length*100)}</div>`,"final-proof");return;
 }
 shell(`${pageHead("Final Proof","One last structural QA before you submit.",`<a class="btn btn-primary" href="/app/application">Review answers</a>`)}<div class="card list-card"><div class="empty"><span class="row-icon">${icon("loader-circle",18)}</span><h3>Running secure final checks…</h3></div></div>`,"final-proof");
 try{
  const d=await premiumCall("final_proof");
  shell(`${pageHead("Final Proof","One last structural QA before you submit.",`<button class="btn btn-secondary" id="shareProof">${icon("share-2",14)} Share privacy-safe result</button><a class="btn btn-primary" href="/app/application">Review answers</a>`)}
  <div class="grid-kpi">${kpi("badge-check","Checks resolved",d.passed+"/"+d.total,"Final Proof is structural QA, not a prediction","green",d.passed/d.total*100)}${kpi("files","Core answers",d.answered+"/4","Leadership · relationships · course · career")}${kpi("star","Strong sections",d.strongSections+"/4","Based on structural evidence signals","gold")}${kpi("shield-check","Original work","Your responsibility","ShortlistProof never submits or writes the application for you","purple")}</div>
  <div class="two-col" style="margin-top:14px"><div class="card list-card"><div class="card-head"><h3>Final checklist</h3></div>${d.checks.map(x=>`<div class="list-row"><span class="row-icon ${x.ok?"green":"gold"}">${icon(x.ok?"check":"triangle-alert",15)}</span><div><b>${escapeHTML(x.label)}</b><p>${x.ok?"No issue detected in this structural check.":"Review this before submission."}</p></div></div>`).join("")}</div>
  <div class="card list-card"><div class="card-head"><h3>Submission reminder</h3></div><div class="callout"><span class="row-icon">${icon("shield-check",15)}</span><div><b>Your application remains your own work.</b><p>Use ShortlistProof to identify gaps and questions. Write and revise every application answer yourself.</p></div></div><div style="margin-top:14px"><b style="font-size:12px">Final status</b><h2 style="font-size:30px;color:var(--navy);margin:8px 0">${d.passed===d.total?"No critical structural gaps detected":"Review "+(d.total-d.passed)+" item"+(d.total-d.passed===1?"":"s")+" before submission"}</h2><p style="font-size:10px;color:var(--muted)">This is not a selection prediction or official Chevening assessment.</p></div></div></div>`,"final-proof");
  $("#shareProof").onclick=()=>{const text=`My ShortlistProof: ${d.passed}/${d.total} final structural checks resolved. No essay text or personal information shared.`;navigator.clipboard.writeText(text+" "+location.origin+"/?ref=finalproof").then(()=>toast("Privacy-safe result copied."));};
 }catch(err){console.error(err);renderFatal("Final Proof could not be loaded. Please retry.");}
}
function renderResources(){
 shell(`${pageHead("Resources","Official guidance first. ShortlistProof methodology second.",`<a class="btn btn-primary" target="_blank" rel="noopener" href="https://www.chevening.org/resource-hub/guidance/application-criteria/">Open official criteria ${icon("external-link",14)}</a>`)}
 <div class="feature-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px">
  ${[
   ["shield-check","Chevening application criteria","Current official guidance on leadership, relationships, course choice and career plan.","https://www.chevening.org/resource-hub/guidance/application-criteria/"],
   ["file-text","Online application system guidance","Official application-form guidance, including the four core essay questions.","https://www.chevening.org/resource-hub/guidance/online-application-system/"],
   ["graduation-cap","Course guidance","How Chevening asks applicants to choose eligible UK master’s courses.","https://www.chevening.org/resource-hub/guidance/courses/"],
   ["lightbulb","Application advice","Official advice on using personal examples, individual contribution and clear career links.","https://www.chevening.org/news/application-advice/"],
   ["route","Career planning","Official guidance on building a realistic short-, medium- and long-term career plan.","https://www.chevening.org/news/defining-your-career-plan/"],
   ["book-open","ShortlistProof Method","How ShortlistProof labels official guidance, structured methodology, permissioned Scholar sources and illustrative examples.","/app/comparison"]
  ].map(x=>`<a class="card list-card" href="${x[3]}" ${x[3].startsWith("http")?'target="_blank" rel="noopener"':""}><span class="row-icon">${icon(x[0],16)}</span><h3 style="font-size:16px;color:var(--navy)">${x[1]}</h3><p style="font-size:11px;color:var(--muted);line-height:1.6">${x[2]}</p><span style="font-size:10px;color:var(--blue);font-weight:800">Open resource →</span></a>`).join("")}
 </div>`,"resources");
}

function renderUpgrade(route){
 const title=ROUTES[route]?.label||"Full ShortlistProof";
 const features=[
  ["library","Story Bank & Best Story Finder"],
  ["bar-chart-3","Method comparison across all four answers"],
  ["waypoints","Whole Case coherence review"],
  ["rotate-cw","Saved re-check history"],
  ["badge-check","Final Proof before submission"]
 ];
 shell(`${pageHead(title,"This workspace is part of Full ShortlistProof. Your free account can still save its application and run the basic Proof Check.")}
 <div class="upgrade-card card">
  <div class="upgrade-copy"><span class="crown">${icon("crown",19)}</span><div class="eyebrow">Full ShortlistProof</div><h2>See the whole application, not just one answer.</h2><p>Unlock the evidence workflow for one application cycle. No subscription and no generated submission text.</p><div class="upgrade-price">£39 <small>one-time</small></div></div>
  <div class="upgrade-features">${features.map(([ic,t])=>`<div class="upgrade-feature"><span class="row-icon green">${icon(ic,15)}</span><b>${t}</b></div>`).join("")}</div>
  <div class="upgrade-actions">
   ${isSandbox&&!state.demo?`<a class="btn btn-primary" href="${escapeHTML(sandboxCheckoutUrl())}">Test sandbox checkout ${icon("arrow-up-right",14)}</a><p class="sandbox-note">Sandbox only — no real charge. Test card 4242 4242 4242 4242.</p>`:`<a class="btn btn-primary" href="/app/settings">View access status ${icon("arrow-right",14)}</a><p class="sandbox-note">Live checkout is not exposed until the connected Stripe account is in live mode.</p>`}
  </div>
 </div>`,route);
}

function renderSettings(){
 shell(`${pageHead("Settings","Account, privacy and data controls.",state.demo?`<a class="btn btn-primary" href="/login">Create account</a>`:`<button class="btn btn-danger" id="signOut">${icon("log-out",14)} Sign out</button>`)}
 <div class="two-col">
  <div class="card list-card"><div class="card-head"><h3>Account</h3></div><div class="list-row"><div><b>Name</b><p>${escapeHTML(displayName())}</p></div></div><div class="list-row"><div><b>Email</b><p>${escapeHTML(state.user?.email||"Demo preview")}</p></div></div><div class="list-row"><div><b>Plan</b><p>${hasFullAccess()?"Full ShortlistProof":"Free"}</p></div></div><div class="list-row"><div><b>Legal</b><p><a href="/privacy" target="_blank" style="color:var(--blue)">Privacy</a> · <a href="/terms" target="_blank" style="color:var(--blue)">Terms</a></p></div></div></div>
  <div class="card list-card"><div class="card-head"><h3>Privacy principles</h3></div><div class="list-row"><span class="row-icon green">${icon("lock",15)}</span><div><b>Private application data</b><p>Authenticated application records are protected with Row Level Security.</p></div></div><div class="list-row"><span class="row-icon green">${icon("shield-check",15)}</span><div><b>No public raw Scholar applications</b><p>Permissioned source material remains in private knowledge tables and source types are labelled.</p></div></div><div class="list-row"><span class="row-icon gold">${icon("file-warning",15)}</span><div><b>Your own words</b><p>ShortlistProof diagnoses evidence and asks questions; it does not generate submission answers.</p></div></div></div>
 </div>
 ${state.demo?"":`${!hasFullAccess()&&isSandbox?`<div class="card list-card sandbox-pay-card" style="margin-top:14px"><div class="card-head"><div><h3>Sandbox payment test</h3><span style="font-size:9px;color:var(--muted)">Stripe test mode only</span></div><span class="status-pill warn"><span class="dot"></span>Test</span></div><p style="font-size:11px;color:var(--muted)">Run the complete £39 checkout → webhook → entitlement flow without a real charge.</p><a class="btn btn-primary" href="${escapeHTML(sandboxCheckoutUrl())}">${icon("credit-card",14)} Test £39 checkout</a><p class="sandbox-note">Use test card 4242 4242 4242 4242, any future expiry and any 3-digit CVC.</p></div>`:""}<div class="card list-card" style="margin-top:14px;border-color:#f0cdd0"><div class="card-head"><h3>Application data</h3></div><p style="font-size:11px;color:var(--muted)">Delete this application workspace, including saved answers, Story Bank, course/career context, checks and uploaded PDF. This cannot be undone.</p><button class="btn btn-danger" id="clearApplication">${icon("trash-2",14)} Delete application data</button></div>
 <div class="card list-card" style="margin-top:14px;border-color:#e7c2c6"><div class="card-head"><h3>Delete account</h3></div><p style="font-size:11px;color:var(--muted)">Permanently delete your ShortlistProof account and associated application data. You will be signed out immediately. This action cannot be undone.</p><button class="btn btn-danger" id="deleteAccount">${icon("user-x",14)} Delete my account</button></div>`}
 `,"settings");
 if($("#signOut"))$("#signOut").onclick=async()=>{await sb.auth.signOut();location.href="/login"};
 if($("#clearApplication"))$("#clearApplication").onclick=async()=>{
   if(!confirm("Delete this application and all saved application data? This cannot be undone."))return;
   const path=state.application?.source_file_path;if(path)await sb.storage.from("application-files").remove([path]);
   const r=await sb.from("applications").delete().eq("id",state.application.id);
   if(r.error)return toast("Could not delete application data.");
   toast("Application data deleted.");setTimeout(()=>location.href="/app",800);
 };
 if($("#deleteAccount"))$("#deleteAccount").onclick=async()=>{
   if(!confirm("Permanently delete your ShortlistProof account and all associated data?"))return;
   const typed=prompt('Type DELETE to confirm permanent account deletion.');
   if(typed!=="DELETE")return toast("Account deletion cancelled.");
   $("#deleteAccount").disabled=true;$("#deleteAccount").textContent="Deleting…";
   const {error}=await sb.functions.invoke("delete-account",{body:{confirm:"DELETE"}});
   if(error){$("#deleteAccount").disabled=false;$("#deleteAccount").textContent="Delete my account";return toast("Could not delete your account.");}
   await sb.auth.signOut();location.href="/";
 };
}
function renderRecovery(){
 root.innerHTML=`<div class="auth-screen"><section class="auth-brand"><div><a class="side-brand" href="/" style="color:#fff;padding:0"><span class="brand-mark" style="background:rgba(255,255,255,.15)">${icon("layers",18)}</span><span>ShortlistProof</span></a><h1>Choose a new password.</h1><p>Use a strong password that you do not reuse elsewhere.</p></div></section><section class="auth-form-wrap"><div class="auth-form"><h2>Reset password</h2><p>Enter your new password below.</p><form id="recoveryForm"><div class="field"><label>New password</label><input id="newPassword" type="password" minlength="10" required autocomplete="new-password"></div><div id="authError" class="auth-error"></div><button class="btn btn-primary" style="width:100%">Update password</button></form></div></section></div>`;refreshIcons();
 $("#recoveryForm").onsubmit=async e=>{e.preventDefault();const password=$("#newPassword").value;const r=await sb.auth.updateUser({password});if(r.error){$("#authError").textContent=r.error.message;return}toast("Password updated.");setTimeout(()=>location.href="/app",700)};
}
function renderAuth(){
 root.innerHTML=`<div class="auth-screen"><section class="auth-brand"><div><a class="side-brand" href="/" style="color:#fff;padding:0"><span class="brand-mark" style="background:rgba(255,255,255,.15)">${icon("layers",18)}</span><span>ShortlistProof</span></a><h1>Bring your whole application into one evidence workspace.</h1><p>Save your four answers, build a Story Bank, compare your evidence with the methodology, resolve gaps and run a Final Proof before submission.</p></div><div style="font-size:11px;color:#bcd0ef">Independent support tool · Your story, your words · No AI-written application answers</div></section>
 <section class="auth-form-wrap"><div class="auth-form"><div class="eyebrow" style="color:#9b7b3b;font-size:10px;text-transform:uppercase;letter-spacing:.12em;font-weight:800">Applicant Portal</div><h2 id="authTitle">Sign in</h2><p id="authSub">Continue your ShortlistProof application workspace.</p><form id="authForm"><div class="field hidden" id="nameField"><label>Name</label><input id="authName" maxlength="120" autocomplete="name"></div><div class="field"><label>Email</label><input id="authEmail" type="email" maxlength="254" autocomplete="email" required></div><div class="field"><label>Password</label><input id="authPassword" type="password" minlength="8" required autocomplete="current-password"></div><div class="auth-extra"><button type="button" id="forgotPassword">Forgot password?</button></div><div id="authError" class="auth-error"></div><button class="btn btn-primary" style="width:100%" id="authSubmit">Sign in</button></form><div class="auth-switch"><span id="switchCopy">New to ShortlistProof?</span> <button id="switchAuth">Create account</button></div><div class="demo-note">Want to look around first? <a href="/app?demo=1" style="color:var(--blue);font-weight:800">Preview the Applicant Portal with demo data →</a></div><div class="auth-legal">By creating an account, you agree to the <a href="/terms">Terms</a> and acknowledge the <a href="/privacy">Privacy notice</a>.</div></div></section></div>`;refreshIcons();
 let mode="signin";
 const setMode=()=>{
   const signup=mode==="signup";$("#nameField").classList.toggle("hidden",!signup);$("#authTitle").textContent=signup?"Create your account":"Sign in";$("#authSub").textContent=signup?"Save your application privately and keep your progress in one place.":"Continue your ShortlistProof application workspace.";$("#authSubmit").textContent=signup?"Create account":"Sign in";$("#switchCopy").textContent=signup?"Already have an account?":"New to ShortlistProof?";$("#switchAuth").textContent=signup?"Sign in":"Create account";$("#forgotPassword").style.display=signup?"none":"inline";$("#authPassword").minLength=signup?10:8;$("#authPassword").autocomplete=signup?"new-password":"current-password";
 };
 $("#switchAuth").onclick=()=>{mode=mode==="signin"?"signup":"signin";setMode()};
 $("#forgotPassword").onclick=async()=>{const email=$("#authEmail").value.trim();$("#authError").style.color="var(--red)";if(!email){$("#authError").textContent="Enter your email first.";return}const r=await sb.auth.resetPasswordForEmail(email,{redirectTo:location.origin+"/login?recovery=1"});if(r.error){$("#authError").textContent=r.error.message;return}$("#authError").style.color="var(--green)";$("#authError").textContent="Password reset email sent if an account exists for this address.";};
 $("#authForm").onsubmit=async e=>{e.preventDefault();$("#authError").style.color="var(--red)";$("#authError").textContent="";const email=$("#authEmail").value.trim(),password=$("#authPassword").value,name=$("#authName").value.trim();if(mode==="signup"&&password.length<10){$("#authError").textContent="Use at least 10 characters for your password.";return}let result;if(mode==="signin")result=await sb.auth.signInWithPassword({email,password});else result=await sb.auth.signUp({email,password,options:{data:{display_name:name||email.split("@")[0]},emailRedirectTo:location.origin+"/login?confirmed=1"}});if(result.error){$("#authError").textContent=result.error.message;return}if(mode==="signup"&&!result.data.session){$("#authError").style.color="var(--green)";$("#authError").textContent="Account created. Check your email if confirmation is required, then sign in.";return}location.href="/app";};
}
async function ensureData(){
 if(state.demo){
   state.profile={display_name:"Applicant",plan:"full"};state.answers={};state.stories=[];
   state.application={id:"demo",title:"My Chevening Application",source_file_path:null};
   state.course={institution:"First-choice UK university",programme:"Master’s programme",modules:["Relevant module 1","Relevant module 2"],rationale:"The programme closes a specific capability gap and supports the next career step."};
   state.careerGoals={short:{goal:"Return to a role where the new capability can be applied immediately."},mid:{goal:"Move into a specialist leadership role within three to five years."},long:{goal:"Create wider home-country impact through sector or policy leadership."}};
   return;
 }
 const {data:{session}}=await sb.auth.getSession();state.session=session;state.user=session?.user||null;if(!state.user)return;
 let {data:profile}=await sb.from("users").select("*").eq("id",state.user.id).maybeSingle();
 if(!profile){await sb.from("users").insert({id:state.user.id,display_name:state.user.user_metadata?.display_name||state.user.email.split("@")[0]});const r=await sb.from("users").select("*").eq("id",state.user.id).maybeSingle();profile=r.data}
 state.profile=profile;
 let {data:apps}=await sb.from("applications").select("*").eq("user_id",state.user.id).order("created_at",{ascending:true}).limit(1);
 if(!apps?.length){const r=await sb.from("applications").insert({user_id:state.user.id,title:"My Chevening Application"}).select().single();state.application=r.data}else state.application=apps[0];
 if(state.application){
   const [{data:answers},{data:stories},{data:courses},{data:goals}]=await Promise.all([
    sb.from("answers").select("*").eq("application_id",state.application.id),
    sb.from("experiences").select("*").eq("application_id",state.application.id).order("created_at",{ascending:false}),
    sb.from("courses").select("*").eq("application_id",state.application.id).eq("preference_order",1).limit(1),
    sb.from("career_goals").select("*").eq("application_id",state.application.id)
   ]);
   state.answers=Object.fromEntries((answers||[]).map(a=>[a.criterion,a]));
   state.stories=stories||[];
   state.course=courses?.[0]||null;
   state.careerGoals=Object.fromEntries((goals||[]).map(g=>[g.horizon,g]));
 }
}
async function uploadSourceFile(file){
 if(!file)return;
 if(state.demo)return toast("Sign in to upload your own file.");
 if(!state.user||!state.application)return toast("Sign in to upload.");
 if(file.type!=="application/pdf")return toast("Please choose a PDF file.");
 if(file.size>10*1024*1024)return toast("PDF must be 10 MB or smaller.");
 const safeName=(file.name||"application.pdf").replace(/[^a-zA-Z0-9._-]+/g,"-").slice(-100);
 const path=`${state.user.id}/${state.application.id}/${Date.now()}-${safeName}`;
 const status=$("#sourceFileStatus");if(status)status.textContent="Uploading…";
 const up=await sb.storage.from("application-files").upload(path,file,{contentType:"application/pdf",upsert:false});
 if(up.error){if(status)status.textContent="Upload failed";return toast("Could not upload this PDF.");}
 const oldPath=state.application.source_file_path;
 const save=await sb.from("applications").update({source_file_path:path,updated_at:new Date().toISOString()}).eq("id",state.application.id).select().single();
 if(save.error){await sb.storage.from("application-files").remove([path]);if(status)status.textContent="Could not save file";return toast("Could not attach this PDF.");}
 state.application=save.data;
 if(oldPath&&oldPath!==path)await sb.storage.from("application-files").remove([oldPath]);
 if(status)status.textContent="PDF saved privately";
 toast("Evidence PDF saved.");
}
async function saveApplicationContext(){
 if(state.demo)return toast("Sign in to save your own application context.");
 if(!state.user||!state.application)return toast("Sign in to save.");
 const institution=$("#courseInstitution").value.trim(),programme=$("#courseProgramme").value.trim();
 const modules=$("#courseModules").value.split(",").map(x=>x.trim()).filter(Boolean).slice(0,20);
 const tasks=[];
 if(institution&&programme){
  tasks.push(sb.from("courses").upsert({
   user_id:state.user.id,application_id:state.application.id,preference_order:1,
   institution,programme,modules,rationale:state.course?.rationale||null,updated_at:new Date().toISOString()
  },{onConflict:"application_id,preference_order"}).select().single());
 }
 for(const [horizon,id] of [["short","goalShort"],["mid","goalMid"],["long","goalLong"]]){
  const goal=$("#"+id).value.trim();if(goal)tasks.push(sb.from("career_goals").upsert({
   user_id:state.user.id,application_id:state.application.id,horizon,goal,updated_at:new Date().toISOString()
  },{onConflict:"application_id,horizon"}).select().single());
 }
 if(!tasks.length)return toast("Add course or career context first.");
 const results=await Promise.all(tasks);if(results.some(x=>x.error))return toast("Some context could not be saved.");
 await ensureData();toast("Application context saved.");
}
async function saveAnswer(criterion,text){
 if(state.demo)return null;
 if(!state.user||!state.application){toast("Sign in to save your work.");return null}
 const payload={user_id:state.user.id,application_id:state.application.id,criterion,answer_text:text,word_count:countWords(text)};
 const r=await sb.from("answers").upsert(payload,{onConflict:"application_id,criterion"}).select().single();
 if(r.error){toast("Could not save yet.");return null}
 state.answers[criterion]=r.data;return r.data;
}
async function persistProofResult(criterion,text,analysis){
 if(state.demo||!state.user||!state.application)return;
 const answer=await saveAnswer(criterion,text);if(!answer)return;
 const prev=await sb.from("benchmarks").select("*").eq("application_id",state.application.id).eq("criterion",criterion).order("created_at",{ascending:false}).limit(1).maybeSingle();
 const status=analysis.status==="Strong"?"strong":analysis.status==="Critical gap"?"critical_gap":"needs_attention";
 const headline=analysis.missing.length?analysis.primary.label+" is the main point to strengthen.":"Core structural signals are visible.";
 const ins=await sb.from("benchmarks").insert({
  user_id:state.user.id,application_id:state.application.id,answer_id:answer.id,criterion,status,headline,
  strengths:analysis.good.map(x=>x.label),gaps:analysis.missing.map(x=>x.label),next_question:analysis.question,
  methodology_version:"structural-v2",
  source_snapshot:{engine:"client_structural_v2",official_criteria:true,scholar_methodology:true}
 }).select().single();
 if(ins.error){console.error(ins.error);return}
 if(prev.data){
  await sb.from("rechecks").insert({
   user_id:state.user.id,application_id:state.application.id,criterion,
   previous_benchmark_id:prev.data.id,new_benchmark_id:ins.data.id,
   gaps_before:Array.isArray(prev.data.gaps)?prev.data.gaps.length:0,
   gaps_after:analysis.missing.length
  });
 }
}
async function loadProofHistory(criterion){
 const el=$("#proofHistory");if(!el)return;
 if(state.demo){el.innerHTML='<p style="font-size:10px;color:var(--muted)">History appears here after you run checks in your own account.</p>';return}
 const r=await sb.from("benchmarks").select("id,status,headline,gaps,created_at").eq("application_id",state.application.id).eq("criterion",criterion).order("created_at",{ascending:false}).limit(3);
 if(r.error||!r.data?.length){el.innerHTML='<p style="font-size:10px;color:var(--muted)">No saved checks yet.</p>';return}
 el.innerHTML=r.data.map(x=>`<div class="list-row"><span class="row-icon ${x.status==="strong"?"green":"gold"}">${icon(x.status==="strong"?"check":"circle-alert",14)}</span><div><b>${escapeHTML(x.headline)}</b><p>${new Date(x.created_at).toLocaleDateString()} · ${Array.isArray(x.gaps)?x.gaps.length:0} gap(s)</p></div></div>`).join("");refreshIcons();
}
async function saveStory(title,description,theme){
 if(state.demo)return toast("Sign in to save stories.");
 if(!state.user||!state.application)return toast("Sign in to save stories.");
 const payload={user_id:state.user.id,application_id:state.application.id,title,description,source:"manual",evidence_summary:{theme,strengths:["Personal example"],evidence:[],best:theme==="Leadership"?["Leadership"]:theme==="Relationships"?["Relationships"]:theme==="Course Choice"?["Course"]:["Career"],status:"Needs evidence"}};
 const r=await sb.from("experiences").insert(payload).select().single();if(r.error)return toast("Could not save this story.");state.stories.unshift(r.data);toast("Story saved.");setTimeout(()=>location.reload(),500);
}
function escapeHTML(s){return(s||"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}

function renderFatal(message){
 root.innerHTML=`<div class="auth-screen"><section class="auth-brand"><div><a class="side-brand" href="/" style="color:#fff;padding:0"><span class="brand-mark" style="background:rgba(255,255,255,.15)">${icon("layers",18)}</span><span>ShortlistProof</span></a><h1>We couldn’t load your workspace.</h1><p>Your saved data has not been changed. Try again, or return to the public site.</p></div></section><section class="auth-form-wrap"><div class="auth-form"><h2>Something went wrong</h2><p>${escapeHTML(message||"Please try again.")}</p><div style="display:flex;gap:8px"><button class="btn btn-primary" id="retryLoad">Try again</button><a class="btn btn-secondary" href="/">Back to site</a></div></div></section></div>`;refreshIcons();if($("#retryLoad"))$("#retryLoad").onclick=()=>location.reload();
}
async function waitForEntitlement(){
 if(state.demo||!state.user||q.get("payment")!=="success"||hasFullAccess())return;
 for(let i=0;i<8;i++){
  await new Promise(r=>setTimeout(r,750));
  const {data}=await sb.from("users").select("*").eq("id",state.user.id).maybeSingle();
  if(data){state.profile=data;if(data.plan==="full")return}
 }
}
async function init(){
 state.route=routeFromPath();
 root.innerHTML=`<div class="empty" style="min-height:100vh;display:grid;place-items:center"><div><span class="row-icon" style="margin:auto">${icon("loader-circle",18)}</span><p>Loading ShortlistProof…</p></div></div>`;refreshIcons();
 try{
  if(!sb&&!state.demo){renderFatal("The secure data service is temporarily unavailable.");return}
  if(state.route==="login"){
    const {data:{session}}=await sb.auth.getSession();
    if(q.get("recovery")==="1"&&session){renderRecovery();return}
    if(session){location.replace("/app");return}
    renderAuth();return
  }
  await ensureData();
  if(!state.demo&&!state.user){location.replace("/login");return}
  await waitForEntitlement();
  if(PREMIUM_ROUTES.has(state.route)&&!hasFullAccess()){renderUpgrade(state.route);return}
  if(state.route==="dashboard")renderDashboard();
  if(state.route==="application")renderApplication();
  if(state.route==="proof-check")renderProofCheck();
  if(state.route==="comparison")renderComparison();
  if(state.route==="story-bank")renderStoryBank();
  if(state.route==="whole-case")renderWholeCase();
  if(state.route==="final-proof")renderFinalProof();
  if(state.route==="resources")renderResources();
  if(state.route==="settings")renderSettings();
 }catch(err){
  console.error(err);renderFatal("The portal could not load. Please retry.");
 }
}
window.addEventListener("unhandledrejection",e=>console.error("Unhandled promise rejection",e.reason));
init();
