'use strict';
const {ORIGIN}=require('../lib/site'),guides=require('../lib/guides');
module.exports=function handler(req,res){const pages=['/','/guides',...Object.keys(guides).map(s=>'/guides/'+s),'/methodology','/help','/privacy','/terms'];res.setHeader('Content-Type','application/xml; charset=utf-8');res.setHeader('Cache-Control','public, max-age=3600');res.status(200).send('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+pages.map(p=>'<url><loc>'+ORIGIN+p+'</loc></url>').join('')+'</urlset>')};
