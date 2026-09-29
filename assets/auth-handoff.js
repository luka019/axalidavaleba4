/* Keep authentication fragments on the login page; never log or persist tokens here. */
(() => {
 'use strict';
 const params=new URLSearchParams(location.search),fragment=new URLSearchParams(location.hash.slice(1));
 const hasAuth=fragment.has('access_token')||fragment.has('refresh_token')||fragment.has('error_description')||params.has('code');
 window.spAuthLinkError=fragment.get('error_description')||params.get('error_description')||'';
 const recovery=fragment.get('type')==='recovery'||params.get('recovery')==='1';
 if((location.pathname==='/'&&(hasAuth||params.get('confirmed')==='1'))||location.pathname==='/auth/callback'||(location.pathname==='/login'&&recovery&&params.get('recovery')!=='1')){
  const next=new URL('/login',location.origin);
  if(recovery)next.searchParams.set('recovery','1');
  else if(params.get('confirmed')==='1')next.searchParams.set('confirmed','1');
  if(params.has('code'))next.searchParams.set('code',params.get('code'));
  next.hash=location.hash;
  location.replace(next.pathname+next.search+next.hash);
 }
})();
