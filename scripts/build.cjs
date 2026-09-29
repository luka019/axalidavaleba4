'use strict';
// Small, asserted migration over the existing portal. Keeps its tested storage/API
// contracts intact while the new interface is maintained in a separate module.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
let code=fs.readFileSync(path.join(root,'portal.js'),'utf8');
function replace(oldText,newText){if(!code.includes(oldText))throw new Error('Portal migration anchor changed: '+oldText.slice(0,90));code=code.replace(oldText,newText)}
replace('"${c.answered}/4 core answers added"','c.answered+"/4 core answers added"');
replace('d.d<=2?"Urgent":"On track"','Date.now()>=DEADLINE?"Closed":d.d+" days"');
replace('"Deadline readiness"','"Application deadline"');
replace('"Evidence strength",c.visible>=16?"Strong":c.visible>=11?"Developing":"Needs work","Structural evidence only \u2014 not a selection score"','"Stories collected",stories,"Saved experience records"');
replace('${Math.max(0,stories-1)}','${getStories().filter(s=>Array.isArray(s.evidence)&&s.evidence.length>0).length}');

replace('location.href="/app/application?criterion="+b.dataset.tab','location.href=demoURL("/app/application?criterion="+b.dataset.tab)');
replace('location.href="/app/proof-check?criterion="+e.target.value','location.href=demoURL("/app/proof-check?criterion="+e.target.value)');
replace('source_snapshot:{engine:"client_structural_v2",official_criteria:true,scholar_methodology:true}','source_snapshot:{engine:"client_wording_rules_v3",official_criteria:true,scholar_methodology:false}');
replace('methodology_version:"structural-v2"','methodology_version:"wording-rules-v3"');
replace('${state.demo?"Demo preview":"Saved"}','${state.demo?"Demo changes are not saved":state.answers[active]?"Saved":"No saved draft yet"}');
replace('navigator.clipboard.writeText(text+" "+location.origin+"/?ref=finalproof").then(()=>toast("Privacy-safe result copied."))','navigator.clipboard.writeText(text+" "+location.origin+"/?ref=finalproof").then(()=>toast("Review summary copied.")).catch(()=>toast("Clipboard unavailable. You can review the checklist on this page."))');
replace('"Strong and evidence-backed"','"Based on your saved labels, not verified"');
replace('"Criteria coverage"','"Wording cues"');
replace('"Evidence signals currently visible"','"Rule matches, not a quality score"');
code=code.replaceAll('Evidence method','Independent review method');
code=code.replaceAll('Core structural signals are visible.','The current wording rules found their cues. Review the actual evidence.');
code=code.replaceAll('What already works','Wording cues found').replaceAll('What is missing','Review manually');
code=code.replaceAll('No major structural signal is missing.','No missing wording cue under these rules. This does not verify quality.');
code=code.replaceAll('is the clearest remaining gap.','is a useful point to review.');
code=code.replaceAll('is the main point to strengthen.','is a suggested review point.');
code=code.replaceAll('>Fix My Gap<','>Your next review question<');
code=code.replaceAll('Criteria coverage','Wording cue coverage');
code=code.replaceAll('${a.status}','${displayStatus(a.status)}').replaceAll('${currentAnalysis.status}','${displayStatus(currentAnalysis.status)}');
code=code.replace("'<span class=\"dot\"></span>'+a.status","'<span class=\"dot\"></span>'+displayStatus(a.status)");
replace('init();','/* Initialisation occurs after the experience module has loaded. */');
const experience=fs.readFileSync(path.join(root,'assets/portal-experience.js'),'utf8');
fs.writeFileSync(path.join(root,'portal-enhanced.js'),code+'\n'+experience+'\ninit();\n');
console.log('Portal migration applied; source contracts preserved.');
