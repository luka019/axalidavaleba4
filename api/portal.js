module.exports=function handler(req,res){
  res.setHeader("Content-Type","text/html; charset=utf-8");
  res.setHeader("Cache-Control","private, max-age=0, no-store");
  res.status(200).send(`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="ShortlistProof Applicant Portal">
<meta name="robots" content="noindex,nofollow,noarchive">
<meta name="theme-color" content="#10233f">
<title>Applicant Portal — ShortlistProof</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Source+Serif+4:opsz,wght@8..60,600;8..60,700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/portal.css">
<script src="https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js"></script>
</head>
<body>
<noscript><div style="padding:24px;font-family:system-ui">ShortlistProof Applicant Portal requires JavaScript.</div></noscript>
<div id="portal-root"></div>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="/portal.js"></script>
</body>
</html>`);
}