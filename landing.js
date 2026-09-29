
const SUPABASE_URL="https://gqbzaiqppyxweuxpbowl.supabase.co";
const SUPABASE_KEY="sb_publishable_eYWPVhKoOv97r6aKIwzRgQ_ZajBQvcs";
const sb=window.supabase?.createClient?window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY):null;
const DEADLINE=new Date("2026-10-06T11:00:00Z");
const app=document.querySelector("#app");
const icon=(name,size=18)=>`<i data-lucide="${name}" style="width:${size}px;height:${size}px"></i>`;

app.innerHTML=`
<div class="top-note"><div class="container"><span>Chevening Scholarship applications close 6 October 2026, 11:00 UTC.</span><strong id="deadlineText"></strong><span>Launch access: $29 until the deadline.</span></div></div>

<header class="site-header">
  <div class="container nav">
    <a class="brand" href="#top"><span class="brand-mark">${icon("layers",17)}</span>ShortlistProof</a>
    <nav class="nav-links"><a href="#why">Why it exists</a><a href="#check">Free check</a><a href="#method">The method</a><a href="#portal">Applicant portal</a><a href="#pricing">Pricing</a></nav>
    <div class="nav-actions"><a class="btn btn-secondary" href="/login">Sign in</a><a class="btn btn-primary" href="#check">Check my application</a></div>
  </div>
</header>

<main id="top">
<section class="hero">
  <div class="container hero-grid">
    <div>
      <div class="kicker">Independent support for Chevening applicants</div>
      <h1>You know you’re a strong candidate. <em>Does your application prove it?</em></h1>
      <p class="hero-copy">ShortlistProof helps you see your application the way a real reader sees it — then gives you one clear next step. Keep your answers, strongest experiences, evidence gaps and final checks together in one calm workspace.</p>
      <div class="hero-actions"><a class="btn btn-primary" href="#check">Check one answer — free ${icon("arrow-right",14)}</a><a class="btn btn-secondary" href="/app?demo=1">See the applicant portal</a></div>
      <div class="plain-trust"><span>${icon("shield-check",15)} Your story stays yours</span><span>${icon("file-check-2",15)} No AI-written submission text</span><span>${icon("badge-check",15)} Official criteria first</span></div>
    </div>
    <aside class="hero-product" aria-label="ShortlistProof applicant dashboard preview">
      <div class="product-window">
        <div class="product-top">
          <div class="product-dots"><span></span><span></span><span></span></div>
          <div class="product-title">Applicant Portal</div>
          <div class="product-user"><i data-lucide="user-round"></i></div>
        </div>
        <div class="product-body">
          <div class="mini-sidebar">
            <div class="mini-brand"><span class="mini-logo"><i data-lucide="layers"></i></span>ShortlistProof</div>
            <div class="mini-nav active"><i data-lucide="layout-dashboard"></i> Today</div>
            <div class="mini-nav"><i data-lucide="file-text"></i> My application</div>
            <div class="mini-nav"><i data-lucide="scan-search"></i> Proof checks</div>
            <div class="mini-nav"><i data-lucide="library"></i> Story Bank</div>
            <div class="mini-nav"><i data-lucide="waypoints"></i> Whole Case</div>
            <div class="mini-nav"><i data-lucide="badge-check"></i> Final Proof</div>
          </div>
          <div class="mini-main">
            <div class="mini-welcome"><div><small>APPLICATION OVERVIEW</small><h3>Here’s what matters next.</h3><p>Focus on the evidence that changes the application most.</p></div><span class="mini-deadline">4 days left</span></div>
            <div class="mini-metrics">
              <div><span>Application progress</span><b>78%</b><i><u style="width:78%"></u></i></div>
              <div><span>Evidence signals</span><b>14/20</b><i><u style="width:70%"></u></i></div>
              <div><span>Strong examples</span><b>12</b><small>saved in Story Bank</small></div>
            </div>
            <div class="mini-next">
              <div class="mini-next-icon"><i data-lucide="lightbulb"></i></div>
              <div><small>PRIORITY ACTION</small><b>Make the influence in your leadership example explicit.</b><p>Ownership and outcome are visible. The remaining gap is whose decision or behaviour changed because of your actions.</p></div>
              <span><i data-lucide="arrow-right"></i></span>
            </div>
            <div class="mini-grid">
              <div class="mini-card">
                <div class="mini-card-head"><b>Application status</b><span>View all</span></div>
                <div class="mini-row"><em class="ok">✓</em><span><b>Leadership & influence</b><small>One gap left: influence</small></span><strong>Review</strong></div>
                <div class="mini-row"><em class="ok">✓</em><span><b>Professional relationships</b><small>Core evidence visible</small></span><strong>Strong</strong></div>
                <div class="mini-row"><em class="warn">!</em><span><b>Course choice</b><small>Course → career bridge</small></span><strong>Fix</strong></div>
                <div class="mini-row"><em>•</em><span><b>Career plan</b><small>Ready for first check</small></span><strong>Check</strong></div>
              </div>
              <div class="mini-card">
                <div class="mini-card-head"><b>Strongest evidence</b><span>Story Bank</span></div>
                <div class="story-chip"><span></span><div><b>Contract automation rollout</b><small>Strong result · Leadership</small></div></div>
                <div class="story-chip"><span></span><div><b>Policy workshop</b><small>Stakeholder evidence · Relationships</small></div></div>
                <div class="mini-human-note"><b>ShortlistProof principle</b><span>Fix the evidence first. Rewrite only after the story itself is strong enough.</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</section>

<section id="why" class="editorial alt">
  <div class="container">
    <div class="editorial-head"><div><div class="kicker">Why ShortlistProof exists</div><h2>A strong candidate can still submit the wrong version of their story.</h2></div><p>You know the context behind your experience. An assessor does not. That gap — between what you know happened and what the page actually proves — is where good applications often become less convincing than the people behind them.</p></div>
    <div class="story-strip">
      <article class="story-block"><span class="num">01</span><h3>The wrong example</h3><p>A prestigious project can be weaker evidence than a smaller story where your own influence and result are much clearer.</p></article>
      <article class="story-block"><span class="num">02</span><h3>The invisible contribution</h3><p>“We delivered” can hide the part that matters most: what you personally decided, changed, influenced or built.</p></article>
      <article class="story-block"><span class="num">03</span><h3>The missing bridge</h3><p>Your course choice and career plan may make perfect sense to you but still feel disconnected when another person reads them cold.</p></article>
    </div>
  </div>
</section>

<section class="editorial">
  <div class="container">
    <div class="problem-quote">
      <div class="big">You know your story. The reader only knows what you make visible.</div>
      <div class="problem-list">
        <div class="problem-item">${icon("arrow-right",17)}<div><b>Leadership is not the same as responsibility.</b><span>A role title tells us where you were. Evidence tells us what changed because of you.</span></div></div>
        <div class="problem-item">${icon("arrow-right",17)}<div><b>A relationship is more than a contact.</b><span>Strong evidence shows mutual value, continuity and what became possible because the relationship existed.</span></div></div>
        <div class="problem-item">${icon("arrow-right",17)}<div><b>A course is more than a good university.</b><span>The application needs to show the capability gap, the specific learning and what you will do with it next.</span></div></div>
        <div class="problem-item">${icon("arrow-right",17)}<div><b>A career plan is not a list of ambitions.</b><span>The steps need to connect, feel realistic, and lead to visible impact.</span></div></div>
      </div>
    </div>
  </div>
</section>

<section id="check" class="editorial blue">
  <div class="container check-wrap">
    <div class="check-copy">
      <div class="kicker">Try it on one answer</div>
      <h2>Before you rewrite it, find out what is actually missing.</h2>
      <p>Paste one answer you wrote yourself. The free check does not grade your chances and does not rewrite your text. It simply helps you notice the evidence that is already visible — and the part that is not.</p>
      <div class="quiet-note">${icon("lock",15)}<span>The free preview runs in your browser. The answer itself is not saved to our database by this page.</span></div>
    </div>
    <div>
      <div class="form-card">
        <form id="proofForm">
          <label>Which part of the application are you checking?</label>
          <select id="criterion"><option value="leadership">Leadership & Influence</option><option value="relationships">Professional Relationships</option><option value="course">Course Choice</option><option value="career">Career Plan</option></select>
          <label>Your self-written answer</label>
          <textarea id="answer" rows="10" maxlength="7000" required placeholder="Paste your own answer here."></textarea>
          <div class="form-meta"><span id="wordCount">0 words</span><span>Diagnostic check only</span></div>
          <label class="checkbox"><input id="ownWork" type="checkbox" required><span>I confirm this is my own work and I want diagnostic feedback, not generated application text.</span></label>
          <button class="btn btn-primary" style="width:100%" type="submit">Show me what is visible ${icon("arrow-right",14)}</button>
        </form>
      </div>
      <div id="proofResult" class="result hidden"></div>
    </div>
  </div>
</section>

<section id="method" class="editorial alt">
  <div class="container">
    <div class="editorial-head"><div><div class="kicker">The method</div><h2>Less “AI opinion”. More transparent reasoning.</h2></div><p>A useful result should tell you why it is saying something. ShortlistProof separates the source of the judgment instead of hiding everything behind a mysterious score.</p></div>
    <div class="method-line">
      <article class="method-piece"><small>1 · Official guidance</small><h3>What is being assessed?</h3><p>Current public Chevening guidance comes first: leadership and influence, professional relationships, course choice and career planning.</p></article>
      <article class="method-piece"><small>2 · Scholar methodology</small><h3>What does convincing evidence make visible?</h3><p>We model structure and decision-making from verified or permissioned Scholar material and clearly label reconstructed patterns separately.</p></article>
      <article class="method-piece"><small>3 · Your application</small><h3>What does your page actually prove?</h3><p>Your experience is mapped against that structure without replacing your voice or writing the answer for you.</p></article>
    </div>
    <div class="method-sum">Official criteria + Scholar methodology + your evidence → a clearer next decision.</div>
  </div>
</section>

<section id="portal" class="editorial">
  <div class="container">
    <div class="editorial-head"><div><div class="kicker">The applicant portal</div><h2>Your application is one story, not four isolated text boxes.</h2></div><p>Once you are working on the full application, the portal keeps your answers, experiences, gaps and re-checks together — so you can stop jumping between notes, drafts and generic AI chats.</p></div>
    <div class="portal-story">
      <div class="portal-shell">
        <aside class="portal-side">
          <div class="brand"><span class="brand-mark" style="width:28px;height:28px">${icon("layers",13)}</span>ShortlistProof</div>
          <div class="side-item active">Today</div><div class="side-item">My application</div><div class="side-item">Story Bank</div><div class="side-item">Proof checks</div><div class="side-item">Whole Case</div><div class="side-item">Final Proof</div>
        </aside>
        <div class="portal-main">
          <div class="portal-heading"><div><h3>Your application overview</h3><p>Start with the one issue that changes the application most.</p></div><span style="font-size:10px;color:#748399">4 days to deadline</span></div>
          <div class="portal-next"><b>Your next best action</b><p>Your leadership answer shows ownership and outcome. Influence is still unclear. Identify whose decision changed before you edit the prose.</p></div>
          <div class="portal-columns">
            <div class="portal-card"><h4>Your application</h4><div class="portal-row"><span class="portal-dot">✓</span><div><b>Leadership & influence</b><br><span style="color:#6c7b90">One gap left: influence</span></div></div><div class="portal-row"><span class="portal-dot">✓</span><div><b>Professional relationships</b><br><span style="color:#6c7b90">Core evidence visible</span></div></div><div class="portal-row"><span class="portal-dot todo">!</span><div><b>Course choice</b><br><span style="color:#6c7b90">Course → career bridge needs work</span></div></div><div class="portal-row"><span class="portal-dot todo">•</span><div><b>Career plan</b><br><span style="color:#6c7b90">Ready for first check</span></div></div></div>
            <div class="portal-card"><h4>Story Bank</h4><div class="portal-row"><span class="portal-dot">✓</span><div><b>Contract automation rollout</b><br><span style="color:#6c7b90">Strong measurable result</span></div></div><div class="portal-row"><span class="portal-dot">✓</span><div><b>Policy workshop</b><br><span style="color:#6c7b90">Good stakeholder evidence</span></div></div><div class="portal-row"><span class="portal-dot todo">!</span><div><b>Mentorship programme</b><br><span style="color:#6c7b90">Needs clearer outcome evidence</span></div></div></div>
          </div>
        </div>
      </div>
    </div>
    <div style="text-align:center;margin-top:24px"><a class="btn btn-secondary" href="/app?demo=1">Explore the portal ${icon("arrow-right",14)}</a></div>
  </div>
</section>

<section class="editorial alt">
  <div class="container founder-grid">
    <div class="founder-portrait" aria-label="Founder placeholder"></div>
    <div class="founder-copy">
      <div class="kicker">Why I built it</div>
      <blockquote>“The difficult part was not finding better words. It was knowing whether I had chosen the right evidence — and whether the story I could see in my head was actually visible to someone else.”</blockquote>
      <p>ShortlistProof is built from that applicant problem. The aim is simple: help another person see the gap before the application leaves their hands.</p>
    </div>
  </div>
</section>

<section id="contributors" class="editorial">
  <div class="container">
    <div class="contributor-box">
      <div><div class="kicker">For former Scholars</div><h3>Turn your experience into something useful for the next applicant.</h3><p>Scholar Contributors can share lessons, application strategy and anonymised patterns with explicit permission. Real material is labelled as real; reconstructed patterns and illustrative examples are never presented as the same thing.</p></div>
      <button class="btn btn-secondary" id="contributorBtn">Become a contributor</button>
    </div>
  </div>
</section>

<section id="pricing" class="editorial blue">
  <div class="container">
    <div class="editorial-head"><div><div class="kicker">Pricing</div><h2>Start with one honest check.</h2></div><p>No subscription. Use the free check first. Pay only if reading the whole application together would actually help.</p></div>
    <div class="pricing-grid">
      <div class="price-card"><h3>Free Proof Check</h3><div class="price">$0</div><ul class="price-list"><li>${icon("check",14)} One self-written answer</li><li>${icon("check",14)} What already works</li><li>${icon("check",14)} Main evidence gap</li><li>${icon("check",14)} One question to answer next</li><li>${icon("check",14)} Privacy-safe share result</li></ul><a class="btn btn-secondary" href="#check">Check one answer</a></div>
      <div class="price-card featured"><h3>Full ShortlistProof</h3><div class="price"><span id="paidPrice">$29</span> <small id="paidPriceNote">until the current application deadline · then $39</small></div><ul class="price-list"><li>${icon("check",14)} All four core answers</li><li>${icon("check",14)} Story Bank & Best Story Finder</li><li>${icon("check",14)} Scholar-method comparison</li><li>${icon("check",14)} Whole Case review</li><li>${icon("check",14)} Re-checks & Final Proof</li></ul><button class="btn btn-primary" id="unlockBtn">Check my full application</button></div>
    </div>
  </div>
</section>

<section class="editorial alt">
  <div class="container faq">
    <div class="kicker">A few clear answers</div>
    <div class="faq-item"><h4>Will ShortlistProof write my application for me?</h4><p>No. It identifies evidence and structure issues, then asks questions that help you improve your own answer.</p></div>
    <div class="faq-item"><h4>Is ShortlistProof part of Chevening?</h4><p>No. It is an independent product. It is not affiliated with or endorsed by Chevening, the UK Government, FCDO or any university.</p></div>
    <div class="faq-item"><h4>Are successful applications shown to users?</h4><p>No raw application is exposed by default. Real anonymised material is used only with appropriate permission and is clearly labelled. Reconstructed patterns are labelled separately.</p></div>
    <div class="faq-item"><h4>Does it predict whether I will win?</h4><p>No. It does not estimate selection odds. It helps you understand what your application currently makes visible.</p></div>
  </div>
</section>
</main>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div><a class="brand" href="#top" style="color:#fff"><span class="brand-mark">${icon("layers",17)}</span>ShortlistProof</a><p>Independent application evidence support. Built to help applicants make clearer decisions about their own stories and evidence.</p></div>
      <div><strong>Product</strong><a href="#check">Free check</a><br><a href="/app?demo=1">Applicant portal</a><br><a href="#pricing">Pricing</a></div>
      <div><strong>Useful links</strong><a href="https://www.chevening.org/resource-hub/guidance/application-criteria/" target="_blank" rel="noopener">Official application criteria</a><br><a href="/privacy">Privacy</a><br><a href="/terms">Terms</a></div>
    </div>
    <div class="footer-bottom">ShortlistProof is independent and is not affiliated with, endorsed by, or operated by Chevening, the UK Government, FCDO, or any university. Chevening applications must remain the applicant’s own original work.</div>
  </div>
</footer>

<div id="contributorModal" class="modal-backdrop hidden"><div class="modal"><button class="modal-close" data-close>${icon("x",16)}</button><div class="kicker">Scholar Contributors</div><h3>Share what you learned.</h3><p>Nothing is treated as permissioned application material until you explicitly agree to the relevant use terms.</p><form id="contributorForm"><div class="field"><label>Name</label><input id="cName" required></div><div class="field"><label>Email</label><input id="cEmail" type="email" required></div><div class="field"><label>LinkedIn (optional)</label><input id="cLinkedin"></div><div class="field"><label>Scholar year (optional)</label><input id="cYear" placeholder="e.g. 2025/26"></div><div class="field"><label>What would you like to contribute?</label><textarea id="cNote" rows="3"></textarea></div><label class="checkbox"><input id="cConsent" type="checkbox" required><span>I agree to be contacted about the Scholar Contributor programme.</span></label><button class="btn btn-primary" style="width:100%">Submit interest</button></form><div id="contributorSuccess" class="hidden" style="margin-top:12px;color:var(--green);font-weight:700">Thanks — your interest has been recorded.</div></div></div>

<div id="checkoutModal" class="modal-backdrop hidden"><div class="modal"><button class="modal-close" data-close>${icon("x",16)}</button><div class="kicker">Full ShortlistProof</div><h3>Bring the whole application into one place.</h3><p>The connected Stripe environment is still a sandbox, so real customer payment is not enabled from this production page yet. You can create an account and use the portal while the live checkout is connected.</p><a class="btn btn-primary" href="/app">Create account / sign in ${icon("arrow-right",14)}</a></div></div>
`;

function refreshIcons(){if(window.lucide)window.lucide.createIcons()} refreshIcons();
function tick(){const ms=DEADLINE-Date.now(),el=document.querySelector("#deadlineText");if(ms<=0){el.textContent="Applications closed";document.querySelector("#paidPrice").textContent="$39";document.querySelector("#paidPriceNote").textContent="one-time";return}const d=Math.floor(ms/86400000),h=Math.floor(ms%86400000/3600000),m=Math.floor(ms%3600000/60000);el.textContent=`${d}d ${h}h ${m}m remaining`} tick();setInterval(tick,60000);
const $=s=>document.querySelector(s);
$("#answer").addEventListener("input",e=>$("#wordCount").textContent=(e.target.value.trim().match(/\S+/g)||[]).length+" words");

const M={
 leadership:{official:"Chevening asks applicants to demonstrate leadership and influence through clear examples and results.",method:"A convincing example usually makes the chain visible: challenge → your action → who you influenced → what changed → result.",signals:[["Ownership",/\b(I|my|personally)\b/i],["Specific action",/\b(led|created|launched|organised|organized|negotiated|implemented|designed|built|introduced)\b/i],["Influence",/\b(influenc|persuad|convinc|negotiat|buy-in|stakeholder|changed.{0,24}(decision|position|behavio)|secured support)\b/i],["Challenge",/\b(resistance|challenge|barrier|reluctant|opposed|objection|constraint)\b/i],["Outcome",/\b(\d+|%|increased|reduced|saved|approved|adopted|implemented|resulted|achieved)\b/i]],priority:["Influence","Outcome","Challenge","Ownership"],qs:{Influence:"Who needed convincing, what was their original position, and what did you personally do that changed it?",Outcome:"What changed because of your actions, and how could another person observe that change?",Challenge:"What made this a genuine leadership challenge rather than routine delivery?",Ownership:"Which decisions or actions in this example were specifically yours?"}},
 relationships:{official:"Chevening asks applicants to demonstrate how they build and maintain professional relationships and what those relationships enable.",method:"A strong relationship example shows purpose, contribution, mutual value, continuity and a concrete outcome.",signals:[["Purposeful relationship",/\b(relationship|network|partnership|stakeholder|collaboration|community|client|mentor)\b/i],["Your contribution",/\b(supported|helped|introduced|connected|shared|contributed|advised|provided)\b/i],["Mutual value",/\b(mutual|reciprocal|two-way|exchange|both|together)\b/i],["Maintenance",/\b(maintain|continued|regular|follow.?up|stayed in touch|ongoing|long-term)\b/i],["Outcome",/\b(\d+|resulted|enabled|secured|created|opened|improved|delivered)\b/i]],priority:["Mutual value","Outcome","Maintenance","Your contribution"],qs:{"Mutual value":"What did the other person gain from the relationship, and what did you gain from it?",Outcome:"What concrete result became possible because this relationship existed?",Maintenance:"What did you do after the first interaction to sustain the relationship?","Your contribution":"What specific value did you personally contribute?"}},
 course:{official:"Chevening asks applicants to explain why their first-choice course fits their background, career plans and intended impact, including specific course content.",method:"Strong course logic is usually easy to follow: capability gap → specific programme feature → skill gained → future use.",signals:[["Capability gap",/\b(gap|lack|need to develop|need to strengthen|capability|skill|knowledge)\b/i],["Course specificity",/\b(module|programme|program|course|professor|centre|center|clinic|curriculum|research)\b/i],["Gap → course link",/\b(because|therefore|will enable|will allow|will equip|so that|directly)\b/i],["Choice rationale",/\b(first choice|chosen|selected|unique|specifically|particularly)\b/i],["Future use",/\b(career|return|future|goal|impact|apply|implement|home country)\b/i]],priority:["Course specificity","Capability gap","Gap → course link","Future use"],qs:{"Course specificity":"Which specific module, centre, teaching feature or academic strength directly addresses your capability gap?","Capability gap":"What can you not yet do well enough that this programme needs to solve?","Gap → course link":"How will this programme feature close the gap you identified?","Future use":"What will you do differently in your first role after returning because of this course?"}},
 career:{official:"Chevening asks applicants for a clear and realistic short-, mid- and long-term career plan with measurable goals and positive impact.",method:"A convincing career plan feels like a sequence rather than a wish list: first step → 3–5 year bridge → long-term impact.",signals:[["Short-term step",/\b(immediately|upon return|first year|1 year|short-term|short term)\b/i],["3–5 year bridge",/\b(3|three|4|four|5|five).{0,12}(year|years)|mid-term|medium-term|medium term/i],["Long-term direction",/\b(long-term|long term|10 year|ten year|ultimately|eventually)\b/i],["Measurable milestone",/\b(\d+|target|measure|launch|establish|lead|build|create|increase|reduce)\b/i],["Home-country impact",/\b(home country|community|sector|national|public|society|impact|return)\b/i]],priority:["3–5 year bridge","Short-term step","Measurable milestone","Home-country impact"],qs:{"3–5 year bridge":"What role, responsibility or milestone should you realistically reach in years 3–5?","Short-term step":"What exact role or responsibility will you pursue immediately after returning?","Measurable milestone":"What observable result would show that this career step has been achieved?","Home-country impact":"Who benefits from this plan in your home country, and what changes for them?"}}
};
function analyse(type,text){const m=M[type],rows=m.signals.map(([label,rx])=>({label,hit:rx.test(text)})),good=rows.filter(x=>x.hit),missing=rows.filter(x=>!x.hit);const primary=m.priority.map(p=>missing.find(x=>x.label===p)).find(Boolean)||missing[0]||rows[0];return{m,good,missing,primary,status:missing.length<=1?"strong":"attn",question:m.qs[primary.label]||"What evidence would make this point clearer?"}}
$("#proofForm").addEventListener("submit",e=>{e.preventDefault();const type=$("#criterion").value,text=$("#answer").value.trim();if(!text)return;const r=analyse(type,text),shareText=`My ShortlistProof: ${r.good.length} strengths visible · ${r.missing.length} evidence gap${r.missing.length===1?"":"s"} · Main area to strengthen: ${r.primary.label}.`;$("#proofResult").classList.remove("hidden");$("#proofResult").innerHTML=`
<div class="result-top"><div><span class="status ${r.status}">${r.status==="strong"?"Core signals visible":"Needs attention"}</span><h3>${r.primary.label} is the clearest thing to look at next.</h3></div><span style="font-size:10px;color:#7c899d">No selection score</span></div>
<div class="diagnostic-grid"><div class="diagnostic"><b>What already works</b><p>${r.good.slice(0,2).map(x=>"✓ "+x.label).join("<br>")||"There is a usable starting point, but the evidence needs to be more explicit."}</p></div><div class="diagnostic"><b>What is still unclear</b><p>${r.missing.slice(0,2).map(x=>"× "+x.label).join("<br>")||"No major structural signal is missing in this lightweight check."}</p></div><div class="diagnostic"><b>Why this matters</b><p>${r.m.official}</p></div><div class="diagnostic"><b>What strong evidence tends to show</b><p>${r.m.method}</p></div></div>
<div class="challenge"><b>One question worth answering before you rewrite</b><p style="margin:6px 0 0;color:var(--muted);font-size:13px">${r.question}</p></div>
<div style="margin-top:14px;padding-top:14px;border-top:1px solid var(--line)"><p style="font-size:12px;color:var(--muted);margin:0 0 10px">This answer is being checked on its own. The full portal can also look for gaps that only appear when your four answers, course choice and career direction are read together.</p><a class="btn btn-primary" href="/app">Check my full application</a></div>
<div class="share-row"><button class="btn btn-light" data-share="whatsapp">${icon("message-circle",13)} WhatsApp</button><button class="btn btn-light" data-share="linkedin">${icon("linkedin",13)} LinkedIn</button><button class="btn btn-light" data-share="copy">${icon("link",13)} Copy result</button></div>`;refreshIcons();$("#proofResult").scrollIntoView({behavior:"smooth",block:"center"});track("proof_check_completed",{criterion:type,gaps:r.missing.length});document.querySelectorAll("[data-share]").forEach(btn=>btn.onclick=()=>{const url=location.origin+"/?ref=share#check",mode=btn.dataset.share;if(mode==="whatsapp")window.open("https://wa.me/?text="+encodeURIComponent(shareText+" "+url),"_blank","noopener");if(mode==="linkedin")window.open("https://www.linkedin.com/sharing/share-offsite/?url="+encodeURIComponent(url),"_blank","noopener");if(mode==="copy")navigator.clipboard.writeText(shareText+" "+url).then(()=>{btn.textContent="Copied";setTimeout(()=>location.reload(),900)});track("share_result",{channel:mode,criterion:type})})});
async function track(name,data={}){if(!sb)return;try{let key=localStorage.getItem("sp_session");if(!key){key=crypto.randomUUID();localStorage.setItem("sp_session",key)}await sb.from("product_events").insert({session_key:key,event_name:name,event_data:{...data,ref:new URLSearchParams(location.search).get("ref")||null}})}catch(e){}}
const contributorModal=$("#contributorModal"),checkoutModal=$("#checkoutModal");
$("#contributorBtn").onclick=()=>contributorModal.classList.remove("hidden");$("#unlockBtn").onclick=()=>{checkoutModal.classList.remove("hidden");track("unlock_clicked",{price:Date.now()<DEADLINE?29:39})};document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>b.closest(".modal-backdrop").classList.add("hidden"));document.querySelectorAll(".modal-backdrop").forEach(m=>m.onclick=e=>{if(e.target===m)m.classList.add("hidden")});
$("#contributorForm").addEventListener("submit",async e=>{e.preventDefault();if(!sb){alert("Contributor intake is temporarily unavailable. Please try again later.");return}const payload={name:$("#cName").value.trim(),email:$("#cEmail").value.trim(),linkedin_url:$("#cLinkedin").value.trim()||null,scholar_year:$("#cYear").value.trim()||null,note:$("#cNote").value.trim()||null,consent:$("#cConsent").checked};const{error}=await sb.from("contributor_leads").insert(payload);if(error){alert("We could not submit this yet. Please try again.");return}$("#contributorSuccess").classList.remove("hidden");$("#contributorForm").reset();track("contributor_interest")});
track("landing_view",{path:location.pathname});
