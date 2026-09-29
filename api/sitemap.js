module.exports=function handler(req,res){
  const host=req.headers["x-forwarded-host"]||req.headers.host||"axalidavaleba4.vercel.app";
  const proto=req.headers["x-forwarded-proto"]||"https";
  const origin=`${proto}://${host}`;
  res.setHeader("Content-Type","application/xml; charset=utf-8");
  res.setHeader("Cache-Control","public, max-age=3600");
  res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${origin}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${origin}/privacy</loc><changefreq>monthly</changefreq><priority>0.3</priority></url>
  <url><loc>${origin}/terms</loc><changefreq>monthly</changefreq><priority>0.3</priority></url>
</urlset>`);
};