'use strict';
module.exports=function handler(req,res){res.setHeader('Content-Type','text/plain; charset=utf-8');res.status(200).send(process.env.VERCEL_ENV==='preview'?'User-agent: *\nDisallow: /\n':'User-agent: *\nAllow: /\nDisallow: /app\nDisallow: /login\nDisallow: /auth\nDisallow: /api\nSitemap: https://axalidavaleba4.vercel.app/sitemap.xml\n')};
