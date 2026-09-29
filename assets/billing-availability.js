/* Fail-closed availability only. The server webhook remains the entitlement authority. */
(() => {
 'use strict';
 if(!document.querySelector('[data-full-cta]'))return;
 const set=(selector,text)=>document.querySelectorAll(selector).forEach(el=>{el.textContent=text});
 fetch('https://gqbzaiqppyxweuxpbowl.supabase.co/rest/v1/rpc/get_public_billing_config',{
  method:'POST',headers:{apikey:'sb_publishable_eYWPVhKoOv97r6aKIwzRgQ_ZajBQvcs','Content-Type':'application/json'},body:'{}',signal:AbortSignal.timeout(6000)
 }).then(response=>{if(!response.ok)throw new Error('Availability unavailable');return response.json()}).then(config=>{
  let url;try{url=new URL(config.payment_url)}catch{return}
  if(config.available!==true||url.origin!=='https://buy.stripe.com'||url.pathname.startsWith('/test_'))return;
  set('[data-full-state]','Full access available');
  set('[data-full-price-note]','One payment. Access through 31 October 2027.');
  set('[data-full-note]','No subscription. Review the terms before continuing to checkout.');
  set('[data-full-feature-note]','Explore the Full demo first. Full access is available from your account settings.');
  set('[data-full-faq]','Full access is available for GBP 39 once, through 31 October 2027. Create a free account, then open Settings to review access and continue to Stripe checkout. Your access is activated only after payment is verified.');
  document.querySelectorAll('[data-full-cta]').forEach(a=>{a.href='/app/settings';a.textContent='View Full access in my account'});
 }).catch(()=>{/* Keep the truthful, non-purchasable preview state. */});
})();
