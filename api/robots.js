module.exports=function handler(req,res){
  const host=req.headers["x-forwarded-host"]||req.headers.host||"axalidavaleba4.vercel.app";
  const proto=req.headers["x-forwarded-proto"]||"https";
  const origin=`${proto}://${host}`;
  res.setHeader("Content-Type","text/plain; charset=utf-8");
  res.setHeader("Cache-Control","public, max-age=3600");
  res.status(200).send(`User-agent: *
Allow: /
Disallow: /app
Disallow: /login

Sitemap: ${origin}/sitemap.xml
`);
};