"""Browser regression checks. No real account, payment or email is created."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json, os, subprocess, time

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'test-results'; OUT.mkdir(exist_ok=True)
BASE=os.environ.get('TEST_BASE_URL','http://127.0.0.1:3000')
server=None
checks=[]
def record(name):
    checks.append(name); print('PASS',name,flush=True)
try:
    if not os.environ.get('TEST_BASE_URL'):
        server=subprocess.Popen(['node','tests/serve.cjs'],cwd=ROOT,stdout=subprocess.DEVNULL)
        time.sleep(1)
    with sync_playwright() as p:
        browser=p.chromium.launch(headless=True)
        context=browser.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce')
        page=context.new_page()
        errors=[]; page.on('pageerror',lambda e:errors.append(str(e)))
        page.goto(BASE,wait_until='networkidle')
        assert page.locator('h1').count()==1
        assert 'Make it visible' in page.locator('h1').inner_text()
        page.screenshot(path=str(OUT/'home-desktop.png'),full_page=True)
        for width in [390,768,1440]:
            page.set_viewport_size({'width':width,'height':844})
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'), f'Home overflow {width}'
        page.set_viewport_size({'width':390,'height':844})
        page.locator('#menu-toggle').click(); assert page.locator('#site-nav').is_visible()
        page.keyboard.press('Escape'); assert not page.locator('#site-nav').is_visible()
        page.screenshot(path=str(OUT/'home-mobile.png'),full_page=True)
        record('Home desktop, tablet and mobile layout; keyboard mobile menu')
        page.evaluate("() => {window.fetch=()=>{throw new Error('Free check must not call fetch')}}")
        own_text='PrivateQAmarker I led a fictional volunteer project and created a small pilot. I negotiated support after a timetable challenge. The process was adopted, but I still need to examine who changed their approach and what evidence supports my explanation. This text is a test fixture, not an application answer.'
        page.locator('#answer').fill(own_text)
        page.locator('#own-work').check()
        page.locator('#proof-form button[type=submit]').click()
        assert page.locator('#proof-result').is_visible()
        assert 'not evidence findings' in page.locator('#proof-result').inner_text()
        assert 'PrivateQAmarker' not in page.locator('#proof-result').inner_text()
        with page.expect_download() as download:
            page.locator('#download-review').click()
        report=Path(download.value.path()).read_text()
        assert 'PrivateQAmarker' not in report and 'Official criteria:' in report
        record('Browser-only check and privacy-preserving diagnostic download')
        for route in ['dashboard','application','proof-check','comparison','story-bank','whole-case','final-proof','resources','settings']:
            for width in [1440,390]:
                page.set_viewport_size({'width':width,'height':900})
                path='/app' if route=='dashboard' else '/app/'+route
                page.goto(BASE+path+'?demo=1',wait_until='networkidle')
                page.wait_for_selector('.content')
                assert 'fictional sample data' in page.locator('.demo-banner').inner_text().lower()
                assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),f'{route} overflow {width}'
                assert not page.eval_on_selector_all('a[href^="/app"]','els=>els.some(e=>!e.getAttribute("href").includes("demo=1"))'),route
                if width==390 or route=='dashboard':page.screenshot(path=str(OUT/f'{route}-{width}.png'),full_page=True)
        record('All nine demo routes at desktop and mobile widths; demo preserved in every app link')
        page.goto(BASE+'/app?demo=1',wait_until='networkidle')
        page.locator('#mobile-more').click()
        page.locator('.sidebar a[href*="/app/application"]').click()
        page.wait_for_url('**/app/application?demo=1')
        page.locator('[data-tab="career"]').click()
        page.wait_for_url('**criterion=career&demo=1')
        assert 'Career' in page.locator('#answerTitle').inner_text()
        record('Mobile drawer and actual criterion-tab navigation preserve demo access')
        page.goto(BASE+'/app/story-bank?demo=1',wait_until='networkidle')
        page.locator('#storySearch').fill('no-matching-fixture-123')
        assert page.locator('#storyNoResults').is_visible()
        page.locator('#storySearch').fill('')
        page.locator('button[title="View story"]').first.click()
        assert page.locator('#storyModal').is_visible()
        page.keyboard.press('Escape');assert not page.locator('#storyModal').is_visible()
        record('Story search, no-result state and keyboard-dismissable view dialog')
        page.goto(BASE+'/app/final-proof?demo=1',wait_until='networkidle')
        page.locator('[data-final-check]').first.check()
        assert page.locator('#final-review-count').inner_text()=='1 / 6'
        record('Interactive final review checklist')
        page.goto(BASE+'/app?demo=1&payment=success',wait_until='networkidle')
        assert 'Returning from checkout does not confirm payment' in page.locator('.content').inner_text()
        assert 'Payment received' not in page.locator('.content').inner_text()
        record('Untrusted payment query cannot claim payment confirmation')
        page.set_viewport_size({'width':1440,'height':1000})
        page.goto(BASE+'/login?mode=signup',wait_until='networkidle')
        assert page.locator('#authTitle').inner_text()=='Create your free workspace.'
        page.locator('#authPassword').fill('test-password-123')
        page.locator('#togglePassword').click();assert page.locator('#authPassword').get_attribute('type')=='text'
        page.evaluate("() => {sb.auth.signUp=async payload=>{window.lastSignUp=payload;return {data:{session:null},error:null}}}")
        page.locator('#authName').fill('QA Fixture')
        page.locator('#authEmail').fill('qa@example.invalid')
        page.locator('#authSubmit').click()
        assert 'Check your inbox' in page.locator('#authError').inner_text()
        assert page.evaluate('window.lastSignUp.options.emailRedirectTo').endswith('/login?confirmed=1')
        page.screenshot(path=str(OUT/'signup-desktop.png'),full_page=True)
        page.goto(BASE+'/login?confirmed=1',wait_until='networkidle')
        assert 'This page alone does not confirm your account' in page.locator('.auth-info').inner_text()
        record('Signup UI with mocked auth, password visibility and confirmation-query safety; no email sent')
        page.goto(BASE+'/help',wait_until='networkidle')
        page.route('**/functions/v1/support',lambda route:route.fulfill(status=200,content_type='application/json',headers={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'content-type,apikey','Access-Control-Allow-Methods':'POST,OPTIONS'},body=json.dumps({'ok':True,'reference':'mock-qa-reference'})))
        page.locator('#support-name').fill('QA Fixture')
        page.locator('#support-email').fill('qa@example.invalid')
        page.locator('#support-message').fill('This is a mocked support form UI test.')
        page.locator('#support-form button[type=submit]').click()
        page.wait_for_selector('#support-result:visible')
        assert 'mock-qa-reference' in page.locator('#support-result').inner_text()
        record('Support form success UI using a mocked endpoint; no request stored')
        for slug in ['chevening-leadership-evidence','chevening-networking-relationships','chevening-course-choice','chevening-career-plan','chevening-application-checklist','chevening-ai-originality']:
            page.goto(BASE+'/guides/'+slug,wait_until='networkidle')
            assert page.locator('h1').count()==1
            assert page.locator('article.article-copy').is_visible()
        record('Six server-rendered guide pages')
        assert not errors, '\n'.join(errors)
        record('No browser JavaScript exceptions in the checked flows')
        browser.close()
    (OUT/'browser-report.json').write_text(json.dumps({'passed':checks,'limitations':['Authentication form tested with a mocked sign-up response, not email delivery.','Support success tested against a mocked endpoint.','No live payment, authenticated database workflow or Azure request was made.']},indent=2))
finally:
    if server:server.terminate()
