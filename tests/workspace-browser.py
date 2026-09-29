"""UI contract tests with an in-memory provider. Not a live auth/storage test."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json,os,subprocess,time
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'test-results';OUT.mkdir(exist_ok=True)
BASE=os.environ.get('TEST_BASE_URL','http://127.0.0.1:3000')
server=None;checks=[]
def record(text):checks.append(text);print('PASS',text,flush=True)
MOCK=r"""() => {
 const now=()=>new Date().toISOString();let seq=0;
 const user={id:'qa-user-a',email:'qa@example.invalid',user_metadata:{display_name:'QA Applicant'}};
 const db={users:[{id:user.id,display_name:'QA Applicant',plan:'full',test_access:false,full_access_until:'2027-10-31T23:59:59Z'}],applications:[{id:'qa-app-a',user_id:user.id,title:'QA application',cycle:'2027-2028',onboarding_step:1}],answers:[],experiences:[],courses:[],career_goals:[],application_reviews:[],payments:[]};
 window.qaDB=db;state.demo=false;
 sb.auth.getSession=async()=>({data:{session:{user}},error:null});
 sb.rpc=async name=>({data:name==='ensure_workspace'?db.applications[0]:{available:false,payment_url:null},error:null});
 sb.from=name=>{let operation='select',payload,filters=[],singular=false,conflict=[];const request={select(){return request},eq(k,v){filters.push([k,v]);return request},order(){return request},limit(){return request},maybeSingle(){singular=true;return request},single(){singular=true;return request},update(v){operation='update';payload=v;return request},insert(v){operation='insert';payload=v;return request},upsert(v,opts){operation='upsert';payload=v;conflict=(opts?.onConflict||'id').split(',');return request},delete(){operation='delete';return request},then(resolve,reject){return Promise.resolve().then(()=>{let rows=db[name]||[];const matches=row=>filters.every(([k,v])=>row[k]===v);let result;
 if(operation==='select')result=rows.filter(matches);
 if(operation==='insert'){const row={id:'qa-'+ ++seq,...payload,updated_at:now()+'-'+seq};rows.push(row);result=[row]}
 if(operation==='update'){result=[];db[name]=rows.map(row=>{if(!matches(row))return row;const next={...row,...payload,updated_at:now()+'-'+ ++seq};result.push(next);return next})}
 if(operation==='delete'){result=rows.filter(matches);db[name]=rows.filter(r=>!matches(r))}
 if(operation==='upsert'){const existing=rows.find(row=>conflict.every(k=>row[k]===payload[k]));const next={...existing,id:existing?.id||'qa-'+ ++seq,...payload,updated_at:now()+'-'+ ++seq};if(existing)db[name]=rows.map(r=>r===existing?next:r);else rows.push(next);result=[next]}
 return{data:singular?(result[0]||null):result,error:null}}).then(resolve,reject)}};return request};
 return ensureData();
}"""
try:
 if not os.environ.get('TEST_BASE_URL'):
  server=subprocess.Popen(['node','tests/serve.cjs'],cwd=ROOT,stdout=subprocess.DEVNULL);time.sleep(.8)
 with sync_playwright() as p:
  launch={'headless':True}
  if os.environ.get('LOCAL_OFFLINE')=='1':launch['executable_path']='/usr/bin/chromium';launch['args']=['--no-sandbox']
  browser=p.chromium.launch(**launch);context=browser.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce')
  if os.environ.get('LOCAL_OFFLINE')=='1':
   context.route('https://cdn.jsdelivr.net/**',lambda r:r.fulfill(content_type='text/javascript',body='window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:null}})}})};'))
   context.route('https://unpkg.com/**',lambda r:r.fulfill(content_type='text/javascript',body='window.lucide={createIcons(){}};'))
   context.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(content_type='text/css',body=''))
  context.route('https://*.supabase.co/**',lambda r:r.abort())
  page=context.new_page();errors=[];page.on('pageerror',lambda error:errors.append(str(error)));page.on('dialog',lambda dialog:dialog.accept())
  page.goto(BASE+'/app?demo=1',wait_until='networkidle');page.evaluate(MOCK)
  page.evaluate('renderOnboarding()');page.locator('#onboardingName').fill('Updated QA');page.locator('#onboardingNext').click();page.wait_for_function('state.application.onboarding_step===2');assert page.evaluate('qaDB.applications[0].onboarding_step')==2
  page.evaluate('state.application.onboarding_step=5;renderOnboarding()');page.locator('#obAnswer').fill('My unsaved first draft');page.locator('#obCriterion').select_option('career');page.locator('#obAnswer').fill('My separate career draft');page.locator('#obCriterion').select_option('leadership');assert page.locator('#obAnswer').input_value()=='My unsaved first draft'
  record('Onboarding saves progress and retains unsaved drafts across criterion switches (mock provider)')
  page.evaluate('renderApplication()');page.locator('#answerEditor').fill('My own QA draft');page.locator('#saveAnswer').click();page.wait_for_function('state.answers.leadership?.answer_text==="My own QA draft"')
  page.evaluate("qaDB.answers[0]={...qaDB.answers[0],answer_text:'External newer QA draft',updated_at:'external-version'}")
  page.locator('#answerEditor').fill('Stale draft kept in this tab');page.locator('#saveAnswer').click();page.wait_for_function('document.querySelector("#saveState").textContent.includes("newer version")');assert page.evaluate('qaDB.answers[0].answer_text')=='External newer QA draft'
  with page.expect_download() as event:page.locator('#downloadDraft').click()
  assert Path(event.value.path()).read_text()=='Stale draft kept in this tab'
  record('Save succeeds, stale writes are blocked and unsaved text can be downloaded (mock provider)')
  page.locator('#courseInstitution').fill('QA University');page.locator('#courseProgramme').fill('QA Course');page.locator('#goalShort').fill('QA career note');page.locator('#saveContext').click();page.wait_for_function('state.course?.institution==="QA University"')
  page.locator('#courseInstitution').fill('');page.locator('#courseProgramme').fill('');page.locator('#goalShort').fill('');page.locator('#saveContext').click();page.wait_for_function('state.course===null && !state.careerGoals.short');assert page.evaluate('qaDB.courses.length+qaDB.career_goals.length')==0
  record('Course/career notes save, refresh and clear correctly without a page reload (mock provider)')
  page.evaluate('renderStoryBank()');page.locator('#addStoryBtn').click();page.locator('#storyTitle').fill('My own project');page.locator('#storyDesc').fill('A self-written description of my actual role.');page.locator('#storyEvidence').fill('Meeting notes\nOutcome report');page.locator('#saveStory').click();page.wait_for_function('state.stories.length===1');page.locator('button[title="View story"]').click();page.locator('#storyTitle').fill('Updated own project');page.locator('#saveStory').click();page.wait_for_function('state.stories[0].title==="Updated own project"')
  assert page.evaluate('state.stories[0].evidence_summary.evidence.length')==2
  page.set_viewport_size({'width':390,'height':844});page.locator('button[title="View story"]').click();assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1');page.screenshot(path=str(OUT/'story-edit-mobile.png'),full_page=True)
  page.locator('#deleteStory').click();page.wait_for_function('state.stories.length===0');record('Story create, evidence notes, edit and delete flows (mock provider)')
  page.evaluate('renderFinalProof()');page.locator('[data-final-check]').first.check();page.locator('#saveFinalReview').click();page.wait_for_function('state.review?.checklist.checked.length===1');page.evaluate('renderFinalProof()');assert page.locator('[data-final-check]').first.is_checked()
  page.evaluate("state.answers.leadership.answer_text='Changed after review';renderFinalProof()");page.wait_for_function('document.querySelector("#final-review-count").textContent==="0 / 6"');assert 'answers changed' in page.locator('.content').inner_text()
  record('Saved final checklist is restored and invalidated after a draft changes (mock provider)')
  page.evaluate('renderSettings()');page.wait_for_selector('#exportWorkspace');page.locator('#profileName').fill('Renamed QA');page.locator('#profileForm button').click();page.wait_for_function('state.profile.display_name==="Renamed QA"')
  with page.expect_download() as event:page.locator('#exportWorkspace').click()
  data=json.loads(Path(event.value.path()).read_text());assert data['profile']['name']=='Renamed QA' and 'session' not in data and 'access_token' not in str(data)
  assert page.locator('#liveCheckout').count()==0
  page.screenshot(path=str(OUT/'account-mobile.png'),full_page=True);record('Account name, private JSON export and disabled-live-billing state (mock provider)')
  page.goto(BASE+'/stories',wait_until='networkidle');assert page.locator('h1').count()==1;assert page.locator('.alumni-card').count()==3;assert 'not a shortlistproof testimonial' in page.locator('.alumni-card').first.inner_text().lower()
  assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1');record('Three sourced alumni stories with clear non-testimonial labels and responsive layout')
  assert not errors,'\n'.join(errors);record('No uncaught browser exceptions in new workflow tests')
  browser.close()
 (OUT/'workspace-report.json').write_text(json.dumps({'passed':checks,'provider':'In-memory test provider; no real user mutations','limitations':['Not proof of email delivery, live billing, Storage HTTP or JWT authentication.']},indent=2))
finally:
 if server:server.terminate()
