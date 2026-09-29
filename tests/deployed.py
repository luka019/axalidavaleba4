"""Read-only production checks. Never invokes an account or payment mutation."""
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError
import hashlib,json,time,xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[1]
BASE='https://axalidavaleba4.vercel.app'
OUT=ROOT/'test-results';OUT.mkdir(exist_ok=True)
def get(path):
    with urlopen(Request(BASE+path,headers={'User-Agent':'ShortlistProof-Release-QA/1.0'}),timeout=15) as r:
        return r.read(),dict(r.headers.items())
expected=hashlib.sha256((ROOT/'portal-enhanced.js').read_bytes()).hexdigest()
for attempt in range(24):
    try:
        content,_=get('/portal-enhanced.js?release-check='+expected[:12])
        if hashlib.sha256(content).hexdigest()==expected:break
    except (URLError,HTTPError):pass
    time.sleep(5)
else:raise AssertionError('Production did not serve the expected compiled portal within the verification window.')
checks=['Production portal matches the tested source SHA-256']
xml,_=get('/sitemap.xml')
urls=[n.text for n in ET.fromstring(xml).findall('{*}url/{*}loc')]
assert len(urls)==13
for url in urls:
    assert url.startswith(BASE+'/')
    data,headers=get(url[len(BASE):]);text=data.decode()
    assert '<h1' in text and '<title>' in text,url
    assert 'content="noindex' not in text,url
    assert headers.get('content-security-policy') or headers.get('Content-Security-Policy'),url
checks.append('All 13 public sitemap URLs return server-rendered pages with CSP and no accidental noindex')
for route in ['/app','/login','/auth/callback']:
    _,headers=get(route)
    h={k.lower():v for k,v in headers.items()}
    assert 'noindex' in h.get('x-robots-tag',''),route
    assert 'no-store' in h.get('cache-control',''),route
checks.append('Private and authentication routes remain noindex and no-store')
robots,_=get('/robots.txt');assert b'Disallow: /app' in robots
try:
    get('/guides/does-not-exist')
    raise AssertionError('Unknown guide returned a successful page')
except HTTPError as error:
    assert error.code==404
checks.append('Unknown guide returns 404; robots excludes private workspace')
for asset in ['/assets/site.css','/assets/site.js','/assets/portal-polish.css','/assets/auth-handoff.js','/assets/mark.svg','/assets/workflows.css','/assets/conversion.css']:
    data,_=get(asset);assert len(data)>50,asset
checks.append('Public and private interface assets are available')
(OUT/'production-report.json').write_text(json.dumps({'base_url':BASE,'runtime_sha256':expected,'passed':checks,'limitations':['Read-only deployment checks; not proof of email, database, payment or AI workflows.']},indent=2))
for check in checks:print('PASS',check,flush=True)
