
const SUPABASE_URL="https://gqbzaiqppyxweuxpbowl.supabase.co";
const SUPABASE_KEY="sb_publishable_eYWPVhKoOv97r6aKIwzRgQ_ZajBQvcs";
const sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
const DEADLINE=new Date("2026-10-06T11:00:00Z");
const app=document.querySelector("#app");
const icon=(name,size=18)=>`<i data-lucide="${name}" style="width:${size}px;height:${size}px"></i>`;

app.innerHTML=`
<div class="topbar"><div class="container"><span>Chevening 2027–28 applications close 6 October 2026, 11:00 UTC.</span><strong id="deadlineText"></strong><span>Launch access: $29 until applications close.</span></div></div>
<header class="site-header">
  <div class="container nav">
    <a class="brand" href="#top"><span class="brand-mark">${icon("layers",19)}</span><span>ShortlistProof</span></a>
    <nav class="nav-links"><a href="#how">How it works</a><a href="#features">Features</a><a href="#method">Method</a><a href="#pricing">Pricing</a><a href="#contributors">For Scholars</a></nav>
    <div class="nav-actions"><a class="btn btn-secondary" href="/login">Sign in</a><a class="btn btn-primary" href="#check">Check My Application ${icon("arrow-right",15)}</a></div>
  </div>
</header>

<main id="top">
<section class="hero">
  <div class="container hero-grid">
    <div>
      <div class="badge">${icon("crown",14)} Built for Chevening applicants</div>
      <h1 class="serif">You know you’re a strong candidate. <em>Does your application prove it?</em></h1>
      <p class="hero-copy">ShortlistProof compares your self-written Chevening application with current official criteria and a structured Scholar methodology, then shows what is strong, what is missing, and what your evidence still needs to demonstrate.</p>
      <div class="hero-actions"><a class="btn btn-primary" href="#check">Check My Application — Free ${icon("arrow-right",15)}</a><a class="btn btn-secondary" href="/app?demo=1">Preview Applicant Portal ${icon("external-link",14)}</a></div>
      <div class="trust-row">
        <span>${icon("shield-check",15)} Your story. Your words.</span>
        <span>${icon("check-circle-2",15)} Grounded in official criteria.</span>
        <span>${icon("sparkles",15)} Scholar methodology, applied to your evidence.</span>
      </div>
    </div>
    <div class="portal-preview" aria-label="ShortlistProof Applicant Portal preview">
      <div class="preview-shell">
        <aside class="preview-side">
          <div class="preview-brand"><span class="brand-mark" style="width:26px;height:26px;border-radius:8px">${icon("layers",13)}</span>ShortlistProof</div>
          <div class="preview-nav-item active">Dashboard</div><div class="preview-nav-item">My Application</div><div class="preview-nav-item">Proof Check</div><div class="preview-nav-item">Winner Comparison</div><div class="preview-nav-item">Story Bank</div><div class="preview-nav-item">Final Proof</div>
        </aside>
        <div class="preview-content">
          <div class="preview-top"><div class="mini-search"></div><span style="font-size:9px;color:#6b7891">Applicant Portal</span></div>
          <div class="preview-title">Welcome back, Mariam.</div><div class="preview-sub">Your application progress and next best actions.</div>
          <div class="mini-kpis">
            <div class="mini-card"><small>Application progress</small><strong>78%</strong></div>
            <div class="mini-card"><small>Criteria coverage</small><strong>8/11</strong></div>
            <div class="mini-card"><small>Evidence strength</small><strong style="color:var(--green)">Strong</strong></div>
            <div class="mini-card"><small>Readiness</small><strong>On track</strong></div>
          </div>
          <div class="preview-grid">
            <div class="preview-panel"><b style="font-size:10px">Section progress</b>
              <div class="bar-row"><span>Leadership</span><div class="bar"><span style="width:85%"></span></div><b>85</b></div>
              <div class="bar-row"><span>Relationships</span><div class="bar"><span style="width:72%"></span></div><b>72</b></div>
              <div class="bar-row"><span>Course</span><div class="bar"><span style="width:78%;background:#d7aa4b"></span></div><b>78</b></div>
              <div class="bar-row"><span>Career</span><div class="bar"><span style="width:81%"></span></div><b>81</b></div>
            </div>
            <div class="preview-panel"><b style="font-size:10px">Evidence comparison</b><div class="radar"></div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="features" class="section">
 <div class="container">
  <div class="section-head"><div><div class="eyebrow">One platform</div><h2 class="serif">From “I think it’s strong” to “I know what it proves.”</h2></div><p class="section-lead">ShortlistProof is not an essay generator. It is a structured application evidence workspace built around the decisions serious applicants actually need to make.</p></div>
  <div class="feature-grid">
   ${[
    ["scan-search","Proof Check","See which criterion signals are already visible in a self-written answer and which are still missing."],
    ["bar-chart-3","Winner Comparison","Compare your evidence structure with the Scholar methodology and verified successful patterns as the source base grows."],
    ["library","Story Bank","Build a reusable library of leadership, relationship, course and career evidence before choosing what to write."],
    ["git-compare","Best Story Finder","Spot when another experience in your profile may demonstrate the criterion more clearly."],
    ["waypoints","Whole Case","Read all four answers as one candidate narrative and find repetition, mismatch or missing bridges."],
    ["badge-check","Final Proof","Run one last structural QA before submission: evidence, coherence, timelines and unresolved gaps."]
   ].map(x=>`<article class="feature-card"><div class="icon-box">${icon(x[0],19)}</div><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join("")}
  </div>
 </div>
</section>

<section id="method" class="section method">
 <div class="container">
  <div class="section-head"><div><div class="eyebrow">The ShortlistProof Method</div><h2 class="serif">Evidence before polish.</h2></div><p class="section-lead">Every deeper recommendation should answer three questions: what Chevening currently assesses, what strong evidence tends to make visible, and what your own answer currently proves.</p></div>
  <div class="method-formula">
    <div class="formula-card"><b>Official criteria</b><span>Leadership & influence · professional relationships · course choice · career plan</span></div><div class="operator">+</div>
    <div class="formula-card"><b>Scholar methodology</b><span>Patterns, strategies and lessons from permissioned/verified Scholar material and lived experience</span></div><div class="operator">+</div>
    <div class="formula-card"><b>Your evidence</b><span>CV, stories, four answers, course choices and career direction</span></div><div class="operator">=</div>
    <div class="formula-card result"><b>Your ShortlistProof</b><span>What works · what is missing · what to test next</span></div>
  </div>
 </div>
</section>

<section id="how" class="section">
 <div class="container">
  <div class="section-head"><div><div class="eyebrow">Simple workflow</div><h2 class="serif">Upload → Prove → Compare → Fix → Final Proof</h2></div><p class="section-lead">The interface stays simple even when the analysis is not.</p></div>
  <div class="feature-grid">
    <article class="feature-card"><div class="icon-box">${icon("upload",18)}</div><h3>1. Add your evidence</h3><p>Bring your CV or LinkedIn PDF, four self-written answers, first-choice course and career direction into one workspace.</p></article>
    <article class="feature-card"><div class="icon-box">${icon("search-check",18)}</div><h3>2. See what is visible</h3><p>Identify ownership, influence, results, relationship outcomes, course fit and realistic career steps.</p></article>
    <article class="feature-card"><div class="icon-box">${icon("wrench",18)}</div><h3>3. Fix one gap at a time</h3><p>Use a targeted question and your own evidence. Re-check until the issue is resolved — without generated application text.</p></article>
  </div>
 </div>
</section>

<section id="check" class="section proof-section">
 <div class="container proof-grid">
  <div class="proof-copy">
    <div class="eyebrow" style="color:#f2d493">Free Proof Check</div>
    <h2 class="serif">We found something you may be missing.</h2>
    <p>Start with one self-written answer. The free check shows what already works, the main evidence gap, why we are saying it, and one question to answer next.</p>
    <div class="privacy-note">${icon("lock",14)} The free preview runs in your browser. Your answer is not sent to our database by this page.</div>
  </div>
  <div>
    <div class="form-card">
      <form id="proofForm">
        <label>Which Chevening area are you checking?</label>
        <select id="criterion"><option value="leadership">Leadership & Influence</option><option value="relationships">Professional Relationships</option><option value="course">Course Choice</option><option value="career">Career Plan</option></select>
        <label>Paste your self-written answer</label>
        <textarea id="answer" rows="9" maxlength="7000" required placeholder="Paste your own answer here. ShortlistProof will diagnose evidence, not rewrite it."></textarea>
        <div class="form-meta"><span id="wordCount">0 words</span><span>Local analysis only</span></div>
        <label class="checkbox"><input id="ownWork" type="checkbox" required><span>I confirm this is my own work and I want diagnostic feedback only.</span></label>
        <button class="btn btn-primary" style="width:100%" type="submit">Run Free Proof Check ${icon("arrow-right",14)}</button>
      </form>
    </div>
    <div id="proofResult" class="result hidden"></div>
  </div>
 </div>
</section>

<section class="section portal-section">
 <div class="container">
  <div class="section-head"><div><div class="eyebrow">Applicant Portal</div><h2 class="serif">A real workspace, not another one-off checker.</h2></div><p class="section-lead">Track your application as one case: answers, evidence, gaps, comparisons, re-checks and final review.</p></div>
  <div class="portal-band">
    <div class="journey-card"><div><div class="eyebrow">Your application journey</div><h3>Stronger evidence. Clearer decisions.</h3><p style="color:#cbd8ee;font-size:13px">See exactly what to work on next and keep every important example in one place.</p></div><a class="btn btn-gold" href="/app?demo=1">Preview the portal ${icon("arrow-right",14)}</a></div>
    <div class="portal-panels">
      <div class="portal-panel"><h4>My Application</h4><div class="check-row"><span class="check-dot">✓</span> Profile & experience</div><div class="check-row"><span class="check-dot">✓</span> Leadership & influence</div><div class="check-row"><span class="check-dot">✓</span> Professional relationships</div><div class="check-row"><span class="check-dot todo">•</span> Course choice</div><div class="check-row"><span class="check-dot todo">•</span> Career plan</div></div>
      <div class="portal-panel"><h4>Latest feedback</h4><div class="check-row"><span class="check-dot">✓</span> Clear personal ownership</div><div class="check-row"><span class="check-dot">✓</span> Tangible result present</div><div class="check-row"><span class="check-dot todo">!</span> Influence still unclear</div><div class="check-row"><span class="check-dot todo">→</span> Next: identify whose decision changed</div></div>
      <div class="portal-panel"><h4>Story Bank</h4><div class="check-row"><b style="font-size:28px;color:var(--navy)">12</b> stories saved</div><div class="check-row"><span class="check-dot">8</span> with evidence</div><div class="check-row"><span class="check-dot">5</span> tagged to criteria</div></div>
      <div class="portal-panel"><h4>Whole Case</h4><div class="check-row"><span class="check-dot">✓</span> Leadership → career link</div><div class="check-row"><span class="check-dot todo">!</span> Course → career bridge</div><div class="check-row"><span class="check-dot">✓</span> No repeated core example</div></div>
    </div>
  </div>
 </div>
</section>

<section class="section founder">
 <div class="container founder-card">
   <div class="founder-avatar">LS</div>
   <div><div class="eyebrow">Built from a successful Chevening journey</div><blockquote>“The hardest part was not writing the answers. It was knowing whether I had chosen the right evidence — and whether the story I saw in my head was actually visible on the page.”</blockquote><p>ShortlistProof is built around that problem: help applicants diagnose evidence and structure without writing their application for them.</p></div>
 </div>
</section>

<section id="contributors" class="section contributor">
 <div class="container contributor-card">
   <div><div class="badge">${icon("crown",14)} ShortlistProof Scholar Contributors</div><h2 class="serif" style="color:#fff;margin-top:16px">Help future applicants learn from real Scholar experience.</h2><p>Chevening alumni can contribute application methodology, lessons, interview learnings and anonymised patterns with explicit permission. Verified contributor material strengthens the knowledge base without exposing raw applications to users.</p></div>
   <button class="btn btn-gold" id="contributorBtn">Become a Contributor ${icon("arrow-right",14)}</button>
 </div>
</section>

<section id="pricing" class="section pricing">
 <div class="container">
  <div class="section-head"><div><div class="eyebrow">Pricing</div><h2 class="serif">Start free. Pay once for the full picture.</h2></div><p class="section-lead">No subscription. The launch offer uses the real Chevening deadline rather than artificial scarcity.</p></div>
  <div class="pricing-grid">
   <div class="price-card"><h3>Free — Proof Check</h3><div class="price">$0</div><ul class="price-list"><li>${icon("check",14)} One answer</li><li>${icon("check",14)} 2 strengths</li><li>${icon("check",14)} 1–2 main evidence gaps</li><li>${icon("check",14)} One targeted challenge question</li><li>${icon("check",14)} Shareable privacy-safe result</li></ul><a class="btn btn-secondary" href="#check">Check one answer</a></div>
   <div class="price-card featured"><h3>Full ShortlistProof</h3><div class="price"><span id="paidPrice">$29</span> <small id="paidPriceNote">until applications close · then $39</small></div><ul class="price-list"><li>${icon("check",14)} Full evidence map</li><li>${icon("check",14)} Best Story Finder</li><li>${icon("check",14)} All four criteria</li><li>${icon("check",14)} Winner Comparison & Scholar methodology</li><li>${icon("check",14)} Whole Case & re-checks</li><li>${icon("check",14)} Final Proof</li></ul><button class="btn btn-gold" id="unlockBtn">Unlock Full ShortlistProof</button></div>
  </div>
 </div>
</section>

<section class="section">
 <div class="container">
  <div class="section-head"><div><div class="eyebrow">Questions</div><h2 class="serif">Clear boundaries build trust.</h2></div></div>
  <div class="faq-grid">
   <div class="faq-item"><h4>Does ShortlistProof write my Chevening answers?</h4><p>No. It diagnoses evidence, structure and coherence, then asks questions that help you strengthen your own answer.</p></div>
   <div class="faq-item"><h4>Is this an official Chevening product?</h4><p>No. ShortlistProof is independent and is not affiliated with, endorsed by or operated by Chevening, the UK Government or any university.</p></div>
   <div class="faq-item"><h4>What does “successful Scholar methodology” mean?</h4><p>Only verified and permissioned Scholar material is labelled as real. Reconstructed patterns and illustrative examples are labelled separately.</p></div>
   <div class="faq-item"><h4>Does ShortlistProof predict whether I will be selected?</h4><p>No. It does not provide selection odds. It shows what your application currently makes visible and what still needs evidence.</p></div>
  </div>
 </div>
</section>
</main>

<footer class="footer">
 <div class="container">
  <div class="footer-grid">
   <div><a class="brand" href="#top" style="color:#fff"><span class="brand-mark">${icon("layers",18)}</span>ShortlistProof</a><p>Application evidence intelligence. Chevening is the first product wedge; the core method is criteria + successful patterns + applicant evidence → gaps.</p></div>
   <div><strong>Product</strong><a href="#features">Features</a><br><a href="/app?demo=1">Portal preview</a><br><a href="#pricing">Pricing</a></div>
   <div><strong>Trust</strong><a href="#method">Method</a><br><a href="#contributors">Scholar Contributors</a><br><a href="https://www.chevening.org/resource-hub/guidance/application-criteria/" target="_blank" rel="noopener">Official criteria</a></div>
  </div>
  <div class="footer-bottom">ShortlistProof is an independent support tool and is not affiliated with, endorsed by, or connected to Chevening, the UK Government, FCDO, or any official body. Chevening applications must remain the applicant’s own original work.</div>
 </div>
</footer>

<div id="contributorModal" class="modal-backdrop hidden"><div class="modal"><button class="modal-close" data-close>${icon("x",16)}</button><div class="eyebrow">Scholar Contributors</div><h3 class="serif">Contribute your experience.</h3><p>We will contact you before using any application material. Nothing is treated as permissioned until you explicitly agree to the use terms.</p><form id="contributorForm"><div class="field"><label>Name</label><input id="cName" required></div><div class="field"><label>Email</label><input id="cEmail" type="email" required></div><div class="field"><label>LinkedIn (optional)</label><input id="cLinkedin"></div><div class="field"><label>Chevening year (optional)</label><input id="cYear" placeholder="e.g. 2025/26"></div><div class="field"><label>What would you like to contribute?</label><textarea id="cNote" rows="3"></textarea></div><label class="checkbox"><input id="cConsent" type="checkbox" required><span>I agree to be contacted about the Scholar Contributor programme.</span></label><button class="btn btn-primary" style="width:100%">Submit interest</button></form><div id="contributorSuccess" class="hidden" style="margin-top:12px;color:var(--green);font-weight:700">Thanks — your interest has been recorded.</div></div></div>

<div id="checkoutModal" class="modal-backdrop hidden"><div class="modal"><button class="modal-close" data-close>${icon("x",16)}</button><div class="eyebrow">Full ShortlistProof</div><h3 class="serif">Your full application, read as one case.</h3><p>Live customer checkout is the only remaining commercial switch: the currently connected Stripe environment is a sandbox. The app and pricing are configured, but we will not route real applicants into a test checkout.</p><a class="btn btn-primary" href="/app">Create account / Sign in ${icon("arrow-right",14)}</a></div></div>
`;

function refreshIcons(){ if(window.lucide) window.lucide.createIcons(); }
refreshIcons();

function tick(){
 const ms=DEADLINE-Date.now();
 const el=document.querySelector("#deadlineText");
 if(ms<=0){el.textContent="Applications closed";document.querySelector("#paidPrice").textContent="$39";document.querySelector("#paidPriceNote").textContent="one-time";return;}
 const d=Math.floor(ms/86400000),h=Math.floor(ms%86400000/3600000),m=Math.floor(ms%3600000/60000);
 el.textContent=`${d}d ${h}h ${m}m remaining`;
}
tick();setInterval(tick,60000);

const $=s=>document.querySelector(s);
$("#answer").addEventListener("input",e=>$("#wordCount").textContent=(e.target.value.trim().match(/\S+/g)||[]).length+" words");

const M={
 leadership:{
  official:"Chevening looks for leadership and influencing examples with clear results.",
  scholar:"Strong evidence usually makes the influence chain visible: challenge → your action → who changed → result.",
  signals:[["Ownership",/\b(I|my|personally)\b/i],["Specific action",/\b(led|created|launched|organised|organized|negotiated|implemented|designed|built|introduced)\b/i],["Influence",/\b(influenc|persuad|convinc|negotiat|buy-in|stakeholder|changed.{0,24}(decision|position|behavio)|secured support)\b/i],["Challenge",/\b(resistance|challenge|barrier|reluctant|opposed|objection|constraint)\b/i],["Outcome",/\b(\d+|%|increased|reduced|saved|approved|adopted|implemented|resulted|achieved)\b/i]],
  priority:["Influence","Outcome","Challenge","Ownership"],qs:{Influence:"Who needed convincing, what was their original position, and what did you personally do that changed it?",Outcome:"What changed because of your actions, and how could an assessor observe or measure that change?",Challenge:"What obstacle or resistance made this a leadership challenge rather than routine delivery?",Ownership:"Which decisions or actions in this example were specifically yours?"}
 },
 relationships:{
  official:"Chevening looks for evidence of building and maintaining professional relationships that lead to real outcomes.",
  scholar:"Strong relationship evidence shows purpose, contribution, reciprocity, maintenance and an outcome.",
  signals:[["Purposeful relationship",/\b(relationship|network|partnership|stakeholder|collaboration|community|client|mentor)\b/i],["Your contribution",/\b(supported|helped|introduced|connected|shared|contributed|advised|provided)\b/i],["Mutual value",/\b(mutual|reciprocal|two-way|exchange|both|together)\b/i],["Maintenance",/\b(maintain|continued|regular|follow.?up|stayed in touch|ongoing|long-term)\b/i],["Outcome",/\b(\d+|resulted|enabled|secured|created|opened|improved|delivered)\b/i]],
  priority:["Mutual value","Outcome","Maintenance","Your contribution"],qs:{"Mutual value":"What did the other person gain from the relationship, and what did you gain from it?",Outcome:"What concrete result became possible because this relationship existed?",Maintenance:"What did you do after the first interaction to sustain this relationship?", "Your contribution":"What specific value did you personally contribute to this relationship or network?"}
 },
 course:{
  official:"Chevening asks applicants to explain how their first-choice course connects to their background, career ambitions and intended impact, including specific modules or areas of study.",
  scholar:"Strong course logic follows: capability gap → specific course feature → skill gained → future use.",
  signals:[["Capability gap",/\b(gap|lack|need to develop|need to strengthen|capability|skill|knowledge)\b/i],["Course specificity",/\b(module|programme|program|course|professor|centre|center|clinic|curriculum|research)\b/i],["Gap → course link",/\b(because|therefore|will enable|will allow|will equip|so that|directly)\b/i],["Choice rationale",/\b(first choice|chosen|selected|unique|specifically|particularly)\b/i],["Future use",/\b(career|return|future|goal|impact|apply|implement|home country)\b/i]],
  priority:["Course specificity","Capability gap","Gap → course link","Future use"],qs:{"Course specificity":"Which specific module, centre, teaching feature or academic strength directly addresses your capability gap?","Capability gap":"What can you not yet do well enough that this programme needs to solve?","Gap → course link":"How will this specific programme feature close the gap you identified?","Future use":"What will you do differently in your first role after returning because of this course?"}
 },
 career:{
  official:"Chevening asks for a clear, realistic short-, mid- and long-term career plan with measurable goals and positive impact.",
  scholar:"Strong career evidence reads as a credible sequence: first step → 3–5 year bridge → long-term impact, with observable milestones.",
  signals:[["Short-term step",/\b(immediately|upon return|first year|1 year|short-term|short term)\b/i],["3–5 year bridge",/\b(3|three|4|four|5|five).{0,15}(year|years)|mid-term|medium-term|medium term/i],["Long-term direction",/\b(long-term|long term|10 year|ten year|ultimately|eventually)\b/i],["Measurable milestone",/\b(\d+|target|measure|launch|establish|lead|build|create|increase|reduce)\b/i],["Home-country impact",/\b(home country|community|sector|national|public|society|impact|return)\b/i]],
  priority:["3–5 year bridge","Short-term step","Measurable milestone","Home-country impact"],qs:{"3–5 year bridge":"What role, responsibility or milestone should you realistically reach in years 3–5 that bridges your first step and long-term ambition?","Short-term step":"What exact role or responsibility will you pursue immediately after returning?","Measurable milestone":"What observable result would show that this career step has been achieved?","Home-country impact":"Who in your home country benefits from this plan, and what changes for them?"}
 }
};

function analyse(type,text){
 const m=M[type];const rows=m.signals.map(([label,rx])=>({label,hit:rx.test(text)}));
 const good=rows.filter(x=>x.hit),missing=rows.filter(x=>!x.hit);
 let primary=m.priority.map(p=>missing.find(x=>x.label===p)).find(Boolean)||missing[0]||rows[0];
 return {m,rows,good,missing,primary,status:missing.length<=1?"strong":"attn",question:m.qs[primary.label]||"What specific evidence would make this point observable to a sceptical assessor?"};
}

$("#proofForm").addEventListener("submit",async e=>{
 e.preventDefault();
 const type=$("#criterion").value,text=$("#answer").value.trim();if(!text)return;
 const r=analyse(type,text);
 const label=r.status==="strong"?"Structurally strong":"Needs attention";
 const shareText=`My ShortlistProof: ${r.good.length} strengths found · ${r.missing.length} evidence gap${r.missing.length===1?"":"s"} found · Main area to strengthen: ${r.primary.label}.`;
 $("#proofResult").classList.remove("hidden");
 $("#proofResult").innerHTML=`
  <div class="result-top"><div><span class="status ${r.status}">${label}</span><h3>${r.primary.label} is the main point to strengthen.</h3></div><div style="font-size:11px;color:#7f8ca3">No selection score</div></div>
  <div class="diagnostic-grid">
    <div class="diagnostic"><b>What already works</b><p>${r.good.slice(0,2).map(x=>"✓ "+x.label).join("<br>")||"The answer has a usable starting point, but its evidence signals need to be more explicit."}</p></div>
    <div class="diagnostic"><b>What is missing</b><p>${r.missing.slice(0,2).map(x=>"× "+x.label).join("<br>")||"No major structural gap was detected in this lightweight check."}</p></div>
    <div class="diagnostic"><b>Official criterion</b><p>${r.m.official}</p></div>
    <div class="diagnostic"><b>Scholar method</b><p>${r.m.scholar}</p></div>
  </div>
  <div class="challenge"><b>One question to answer next</b><p style="margin:7px 0 0;color:#50607f;font-size:13px">${r.question}</p></div>
  <div style="margin-top:14px;padding:14px;border:1px solid var(--line);border-radius:14px;background:#fbfdff"><b style="font-size:12px">Why Full?</b><p style="font-size:12px;color:var(--muted);margin:6px 0">This answer can only be checked in isolation here. Some of the biggest issues appear when all four answers, your course choice and career direction are read together.</p><a class="btn btn-primary" href="/app">Check My Full Application</a></div>
  <div class="share-row"><button class="btn btn-soft" data-share="whatsapp">${icon("message-circle",13)} WhatsApp</button><button class="btn btn-soft" data-share="linkedin">${icon("linkedin",13)} LinkedIn</button><button class="btn btn-soft" data-share="copy">${icon("link",13)} Copy result link</button></div>`;
 refreshIcons();
 $("#proofResult").scrollIntoView({behavior:"smooth",block:"center"});
 track("proof_check_completed",{criterion:type,gaps:r.missing.length});
 document.querySelectorAll("[data-share]").forEach(btn=>btn.onclick=()=>{
   const url=location.origin+"/?ref=share#check";const mode=btn.dataset.share;
   if(mode==="whatsapp") window.open("https://wa.me/?text="+encodeURIComponent(shareText+" "+url),"_blank","noopener");
   if(mode==="linkedin") window.open("https://www.linkedin.com/sharing/share-offsite/?url="+encodeURIComponent(url),"_blank","noopener");
   if(mode==="copy") navigator.clipboard.writeText(shareText+" "+url).then(()=>{btn.textContent="Copied";setTimeout(()=>{btn.innerHTML=`${icon("link",13)} Copy result link`;refreshIcons()},1200)});
   track("share_result",{channel:mode,criterion:type});
 });
});

async function track(name,data={}){
 try{let key=localStorage.getItem("sp_session");if(!key){key=crypto.randomUUID();localStorage.setItem("sp_session",key)}await sb.from("product_events").insert({session_key:key,event_name:name,event_data:{...data,ref:new URLSearchParams(location.search).get("ref")||null}})}catch(e){}
}

const contributorModal=$("#contributorModal"),checkoutModal=$("#checkoutModal");
$("#contributorBtn").onclick=()=>contributorModal.classList.remove("hidden");
$("#unlockBtn").onclick=()=>{checkoutModal.classList.remove("hidden");track("unlock_clicked",{price:Date.now()<DEADLINE?29:39})};
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>b.closest(".modal-backdrop").classList.add("hidden"));
document.querySelectorAll(".modal-backdrop").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.classList.add("hidden")}));

$("#contributorForm").addEventListener("submit",async e=>{
 e.preventDefault();
 const payload={name:$("#cName").value.trim(),email:$("#cEmail").value.trim(),linkedin_url:$("#cLinkedin").value.trim()||null,scholar_year:$("#cYear").value.trim()||null,note:$("#cNote").value.trim()||null,consent:$("#cConsent").checked};
 const {error}=await sb.from("contributor_leads").insert(payload);
 if(error){alert("We could not submit this yet. Please try again.");return}
 $("#contributorSuccess").classList.remove("hidden");$("#contributorForm").reset();track("contributor_interest");
});

track("landing_view",{path:location.pathname});
