document.body.innerHTML = `
<div class="deadline">Chevening 2027–28 applications close <b>6 October 2026, 11:00 UTC</b> · <span id="countdown"></span></div>
<header class="nav wrap">
  <a class="brand" href="#top"><span class="logo">S</span>ShortlistProof</a>
  <nav class="navlinks"><a href="#method">The Method</a><a href="#check">Free Check</a><a href="#full">Full</a><a href="#pricing">Pricing</a></nav>
  <a class="btn ghost" href="#check">Check My Application</a>
</header>

<main id="top">
<section class="hero wrap">
  <div>
    <div class="eyebrow">ShortlistProof for Chevening</div>
    <h1>Strong candidate. Strong experience. <em>Does your application prove it?</em></h1>
    <p class="lead">Compare your self-written Chevening application with official criteria and a successful Scholar methodology. See what is strong, what is missing, and what your evidence still needs to demonstrate before submission.</p>
    <div class="actions"><a class="btn primary" href="#check">Check My Application — Free</a><a class="btn ghost" href="#method">See the method</a></div>
    <div class="trust">
      <div><strong>Your story. Your words.</strong><span>No AI-written application answers.</span></div>
      <div><strong>Official criteria.</strong><span>Grounded in what Chevening currently assesses.</span></div>
      <div><strong>Scholar methodology.</strong><span>Applied to your own evidence.</span></div>
    </div>
  </div>
  <aside class="proof">
    <div class="proofhead"><span>Winner Comparison preview</span><span class="status attn">Needs attention</span></div>
    <h3>Your Leadership Evidence</h3>
    <div class="signal"><span>Ownership</span><b>Strong</b></div>
    <div class="signal"><span>Action</span><b>Strong</b></div>
    <div class="signal"><span>Influence</span><b class="warn">Weak</b></div>
    <div class="signal"><span>Outcome</span><b class="warn">Needs attention</b></div>
    <div class="blind">
      <b>What you are missing</b>
      <p>You explain the project and your actions, but the person or group whose decision you changed is not yet visible.</p>
      <div class="source-note"><b>Scholar method:</b> make the chain visible — who needed influencing → what you did → what changed.</div>
    </div>
  </aside>
</section>

<section id="method" class="band">
  <div class="wrap">
    <div class="eyebrow">The ShortlistProof Method</div>
    <h2>Not generic AI advice. A structured benchmark for what your application actually proves.</h2>
    <div class="formula">
      <div><b>Official Chevening Criteria</b><span>What is formally assessed</span></div>
      <span class="plus">+</span>
      <div><b>Scholar Methodology</b><span>How strong evidence is made visible</span></div>
      <span class="plus">+</span>
      <div><b>Your Evidence</b><span>CV, answers, course and career direction</span></div>
      <span class="equals">=</span>
      <div class="formula-result"><b>Your ShortlistProof</b><span>What works, what is missing, what to test next</span></div>
    </div>
    <div class="method-grid">
      <article class="method-card"><span>01</span><h3>Real Scholar Method</h3><p>See the logic behind a successful Scholar journey: how evidence, influence, outcomes and career logic were made visible.</p></article>
      <article class="method-card"><span>02</span><h3>Applied to Your Story</h3><p>ShortlistProof maps the method against your own experience rather than giving a generic writing score.</p></article>
      <article class="method-card"><span>03</span><h3>Source-labelled Feedback</h3><p>Every deeper comparison distinguishes official guidance, verified Scholar material, reconstructed patterns and illustrative examples.</p></article>
    </div>
    <div class="bigline">Generic AI tells you how it sounds. <b>ShortlistProof shows how it compares.</b></div>
  </div>
</section>

<section class="section wrap">
  <div class="eyebrow">One product loop</div>
  <h2>Upload → Prove → Compare → Fix → Final Proof</h2>
  <div class="steps five">
    <div class="step"><i>01</i><h3>Upload</h3><p>CV or LinkedIn PDF, four self-written answers, course and career goal.</p></div>
    <div class="step"><i>02</i><h3>Proof Check</h3><p>What can the assessor actually see in your evidence?</p></div>
    <div class="step"><i>03</i><h3>Winner Comparison</h3><p>Compare your evidence structure with the Scholar methodology and verified patterns as the knowledge base grows.</p></div>
    <div class="step"><i>04</i><h3>Fix My Gap</h3><p>Find relevant evidence from your own experience and answer one targeted question.</p></div>
    <div class="step"><i>05</i><h3>Final Proof</h3><p>Check the whole case for critical gaps, repetition, alignment and consistency.</p></div>
  </div>
</section>

<section id="check" class="section bench">
  <div class="wrap benchgrid">
    <div class="benchintro">
      <div class="eyebrow light">Free — Proof Check</div>
      <h2>One answer. One real insight.</h2>
      <p>Paste one self-written answer. ShortlistProof checks the evidence against the selected criterion, shows what is already visible, identifies the main gap and gives you one question to answer next.</p>
      <div class="privacy"><b>Your answer stays in this browser in the free preview.</b><br>ShortlistProof does not write, rewrite, complete or paraphrase your application answer.</div>
    </div>
    <div class="card">
      <form id="form">
        <label>What are you checking?</label>
        <select id="criterion">
          <option value="leadership">Leadership & Influence</option>
          <option value="relationships">Professional Relationships</option>
          <option value="course">Course Choice</option>
          <option value="career">Career Plan</option>
        </select>
        <label>Paste your self-written answer</label>
        <textarea id="answer" rows="11" maxlength="7000" required placeholder="Paste your own answer. ShortlistProof will diagnose evidence, not rewrite it."></textarea>
        <div class="meta"><span id="words">0 words</span><span>Local analysis only</span></div>
        <label>Optional: other experiences you could use</label>
        <textarea id="stories" rows="4" maxlength="5000" placeholder="Add 2–4 short experience notes, separated by a blank line."></textarea>
        <label class="check"><input id="confirm" type="checkbox" required><span>I confirm this is my own work and I want diagnostic feedback only.</span></label>
        <button class="btn primary full" type="submit">Check My Application</button>
      </form>
    </div>
  </div>
</section>

<section id="results" class="section resultwrap hidden">
  <div class="wrap">
    <div class="eyebrow">Your Proof Check</div>
    <div class="resulttop">
      <div class="leftmetric"><div><strong id="leftCount">1</strong><small>evidence issue(s) found</small></div></div>
      <div><span id="resultStatus" class="status attn">Needs attention</span><h3 id="headline"></h3><p id="summary" class="result-summary"></p></div>
    </div>

    <div class="cols">
      <div class="box"><h3>Your answer — what already works</h3><div id="strengths"></div></div>
      <div class="box"><h3>What you are missing</h3><div id="gaps"></div></div>
    </div>

    <div id="storyFinder" class="story hidden"></div>

    <div class="why-card">
      <div class="eyebrow">Why this feedback?</div>
      <div class="why-grid">
        <div><b>Official criterion</b><p id="whyOfficial"></p></div>
        <div><b>Scholar method</b><p id="whyScholar"></p></div>
        <div><b>Your answer</b><p id="whyUser"></p></div>
      </div>
    </div>

    <div class="winner-card">
      <div class="winner-head"><div><div class="eyebrow">Winner Comparison preview</div><h3>See how a successful Scholar approached the same challenge.</h3></div><span class="source-pill">Methodology preview</span></div>
      <div class="winner-grid">
        <div><b>Closest pattern</b><p id="scenarioType"></p><div id="patternSignals"></div></div>
        <div><b>Scholar approach</b><ol id="scholarApproach"></ol></div>
      </div>
      <div class="notice">At launch, this preview uses official criteria plus the founding Scholar methodology. Real anonymised excerpts and multi-Scholar comparisons appear only when a source is verified and permissioned.</div>
    </div>

    <div class="challenge">
      <div class="eyebrow">Fix My Gap</div>
      <h3 id="question"></h3>
      <p>Write the answer yourself. ShortlistProof will re-check the evidence when the full workflow is enabled.</p>
      <button class="btn ghost" id="copyQ">Copy challenge</button>
    </div>

    <div class="paywall">
      <div>
        <div class="eyebrow light">Full ShortlistProof</div>
        <h3>Your complete Chevening application through a successful Scholar lens.</h3>
        <p>Unlock the full CV evidence map, Best Story Finder, four criteria checks, Winner Comparison, Closest Winning Patterns, Winner Playbooks, Whole Case, Challenge Me, re-checks and Final Proof.</p>
      </div>
      <div class="pay-side"><div class="price">$39</div><div class="tiny">one-time · no subscription</div><button class="btn lime" id="unlock">Unlock Full ShortlistProof</button></div>
    </div>
  </div>
</section>

<section id="full" class="section wrap">
  <div class="eyebrow">What Full unlocks</div>
  <h2>See the method. Use your evidence. Write it in your own words.</h2>
  <div class="features">
    <div class="feature"><span>01</span><h3>Full Evidence Map</h3><p>Extract the strongest usable evidence from your CV and experience.</p></div>
    <div class="feature"><span>02</span><h3>Best Story Finder</h3><p>Find out whether another experience is structurally stronger than the one you chose.</p></div>
    <div class="feature"><span>03</span><h3>Winner Comparison</h3><p>Compare what your answer proves with Scholar methodology and verified successful patterns.</p></div>
    <div class="feature"><span>04</span><h3>Closest Winning Pattern</h3><p>Find the closest scenario type and see which evidence stage is missing.</p></div>
    <div class="feature"><span>05</span><h3>Winner Playbook</h3><p>See the method behind strong examples — without copying a winner’s essay.</p></div>
    <div class="feature"><span>06</span><h3>Your Evidence → Structure</h3><p>Map your own facts to the elements the answer needs to demonstrate.</p></div>
    <div class="feature"><span>07</span><h3>Whole Case</h3><p>Read all four answers as one candidate and catch conflicts or repetition.</p></div>
    <div class="feature"><span>08</span><h3>Challenge Me</h3><p>Stress-test weak evidence with direct assessor-style questions.</p></div>
    <div class="feature"><span>09</span><h3>Final Proof</h3><p>One structural QA pass before you submit.</p></div>
  </div>
</section>

<section class="section compare-section">
  <div class="wrap">
    <div class="eyebrow">Why not just use ChatGPT?</div>
    <h2>Not “write me a better essay.” Show me what successful applicants did differently.</h2>
    <div class="compare">
      <div class="panel generic"><h3>Generic AI</h3><ul><li>Knows general writing patterns</li><li>Responds to whatever prompt you give it</li><li>May produce polished language</li><li>Does not inherently know the ShortlistProof methodology or source set</li></ul></div>
      <div class="panel ours"><h3>ShortlistProof</h3><ul><li>Built around Chevening’s current criteria</li><li>Uses a source hierarchy and Scholar methodology</li><li>Knows the candidate’s full evidence set in Full</li><li>Compares evidence and structure, not prose alone</li><li>Tracks whether identified gaps are actually resolved</li></ul></div>
    </div>
  </div>
</section>

<section id="pricing" class="section final">
  <div class="wrap">
    <div class="eyebrow">Simple pricing</div>
    <h2>Free insight. Full comparison for $39.</h2>
    <div class="pricing">
      <div class="pricecard"><h3>Free — Proof Check</h3><strong>$0</strong><p>One answer · criterion check · two strengths · one or two gaps · one targeted question.</p><a class="btn ghost" href="#check">Check My Application</a></div>
      <div class="pricecard focus"><h3>Full ShortlistProof</h3><strong>$39</strong><p>One-time. No subscription.</p><p>Full evidence map · Best Story · four criteria · Winner Comparison · Closest Winning Patterns · Winner Playbooks · Evidence → Structure · Whole Case · Challenge Me · re-checks · Final Proof.</p><button class="btn lime" id="unlock2">Unlock Full ShortlistProof</button></div>
    </div>
  </div>
</section>

<section class="section wrap">
  <div class="closing">
    <div class="eyebrow">Before you submit</div>
    <h2>Don’t let the wrong example hide the right candidate.</h2>
    <p>See the method. Use your evidence. Write it in your own words.</p>
    <a class="btn primary" href="#check">Check My Application</a>
  </div>
</section>
</main>

<footer class="footer"><div class="wrap"><b>ShortlistProof</b> — application evidence intelligence.<br><br>Independent product. Not affiliated with or endorsed by Chevening, the UK Government, FCDO or any university. Chevening applications must be the applicant’s own original work. ShortlistProof does not write, rewrite, complete or paraphrase application answers for submission and does not predict selection.</div></footer>

<div id="modal" class="modalbg hidden"><div class="modal"><button class="x" id="close">×</button><div class="eyebrow">Full ShortlistProof — $39</div><h2>Full workflow is being connected.</h2><p>The production knowledge/data model is ready. Customer checkout remains test-only until a live Stripe account is connected, so this button does not pretend to take a real payment.</p><p><b>One-time:</b> $39 · no subscription.</p><button class="btn primary full" id="close2">Back to Proof Check</button></div></div>
`;