'use strict';
// Local HTTP harness for the same handlers Vercel invokes; not a production server.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const types={'.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.txt':'text/plain'};
const routes={'/':'index','/robots.txt':'robots','/sitemap.xml':'sitemap','/privacy':'privacy','/terms':'terms','/stories':'stories'};
http.createServer((req,res)=>{
 try{
  const u=new URL(req.url,'http://127.0.0.1');
  let handler=routes[u.pathname],query=Object.fromEntries(u.searchParams);
  if(/^\/(app(?:\/.*)?|login|auth\/callback)$/.test(u.pathname))handler='portal';
  if(['/guides','/methodology','/help'].includes(u.pathname)){handler='resources';query.page=u.pathname.slice(1)}
  if(u.pathname.startsWith('/guides/')){handler='resources';query.page='guides';query.slug=u.pathname.slice(8)}
  if(handler){
   res.status=c=>{res.statusCode=c;return res};res.send=s=>res.end(s);
   return require(path.join(root,'api',handler+'.js'))({url:req.url,headers:req.headers,query},res);
  }
  if(!/^\/(assets\/[^/]+|portal(?:-enhanced)?\.(?:css|js))$/.test(u.pathname)){res.statusCode=404;return res.end('Not found')}
  const file=path.join(root,u.pathname),ext=path.extname(file);
  if(!fs.existsSync(file)||!types[ext]){res.statusCode=404;return res.end('Not found')}
  res.setHeader('Content-Type',types[ext]+'; charset=utf-8');fs.createReadStream(file).pipe(res);
 }catch(error){console.error(error);res.statusCode=500;res.end('Handler error')}
}).listen(Number(process.env.PORT||3000),'127.0.0.1',()=>console.log('Test server ready'));
