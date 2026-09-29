module.exports=function handler(req,res){
  res.setHeader("Content-Type","text/html; charset=utf-8");
  res.setHeader("Cache-Control","public, max-age=0, must-revalidate");
  res.status(200).send(`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="ShortlistProof helps Chevening applicants see what their self-written application proves, what is missing, and what to strengthen before submission.">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="theme-color" content="#10233f">
<meta property="og:type" content="website">
<meta property="og:title" content="ShortlistProof — See what your application proves">
<meta property="og:description" content="A structured evidence workspace for self-written Chevening applications.">
<meta property="og:url" content="https://axalidavaleba4.vercel.app/">
<meta name="twitter:card" content="summary">
<title>ShortlistProof — See what your application proves</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Source+Serif+4:opsz,wght@8..60,600;8..60,700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/landing.css">
<script src="https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js"></script>
</head>
<body>
<noscript><div style="padding:24px;font-family:system-ui">ShortlistProof requires JavaScript to run the application checker and portal.</div></noscript>
<div id="app"></div>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="/landing.js"></script>
</body>
</html>`);
}