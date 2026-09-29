import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const CRITERIA: Record<string, any> = {
  leadership: {
    label:"Leadership & Influence",
    official:"Chevening looks for leadership and influencing examples with clear results.",
    method:"Strong evidence makes the chain visible: challenge → your action → who you influenced → what changed → result.",
    signals:[
      ["Ownership", String.raw`\b(I|my|personally)\b`, "i"],
      ["Specific action", String.raw`\b(led|created|launched|organised|organized|negotiated|implemented|designed|built|introduced)\b`, "i"],
      ["Influence", String.raw`\b(influenc|persuad|convinc|negotiat|buy-in|stakeholder|changed.{0,24}(decision|position|behavio)|secured support)\b`, "i"],
      ["Challenge", String.raw`\b(resistance|challenge|barrier|reluctant|opposed|objection|constraint|initially)\b`, "i"],
      ["Outcome", String.raw`\b(\d+|%|increased|reduced|saved|approved|adopted|implemented|resulted|achieved|reached)\b`, "i"]
    ],
    priority:["Influence","Outcome","Challenge","Ownership"],
    questions:{
      Influence:"Who needed convincing, what was their original position, and what did you personally do that changed it?",
      Outcome:"What changed because of your actions, and how could an assessor observe or measure it?",
      Challenge:"What obstacle or resistance made this a leadership challenge rather than routine delivery?",
      Ownership:"Which decisions or actions in this example were specifically yours?"
    },
    pattern:"Stakeholder influence"
  },
  relationships: {
    label:"Professional Relationships",
    official:"Chevening looks for evidence of building and maintaining professional relationships that lead to real outcomes.",
    method:"Strong relationship evidence shows purpose, contribution, reciprocity, maintenance and an outcome.",
    signals:[
      ["Purposeful relationship", String.raw`\b(relationship|network|partnership|stakeholder|collaboration|community|client|mentor|specialist)\b`, "i"],
      ["Your contribution", String.raw`\b(supported|helped|introduced|connected|shared|contributed|advised|provided)\b`, "i"],
      ["Mutual value", String.raw`\b(mutual|reciprocal|two-way|exchange|both|together|while she|while he)\b`, "i"],
      ["Maintenance", String.raw`\b(maintain|continued|regular|follow.?up|stayed in touch|ongoing|long-term)\b`, "i"],
      ["Outcome", String.raw`\b(\d+|resulted|enabled|secured|created|opened|improved|delivered|workshop)\b`, "i"]
    ],
    priority:["Mutual value","Outcome","Maintenance","Your contribution"],
    questions:{
      "Mutual value":"What did the other person gain from the relationship, and what did you gain from it?",
      Outcome:"What concrete result became possible because this relationship existed?",
      Maintenance:"What did you do after the first interaction to sustain this relationship?",
      "Your contribution":"What specific value did you personally contribute to this relationship or network?"
    },
    pattern:"Professional network building"
  },
  course: {
    label:"Course Choice",
    official:"Chevening asks you to focus on the first-choice course and explain how it connects to your background, career aspirations and intended impact, including specific modules or areas of study.",
    method:"Strong course logic follows: capability gap → specific programme feature → skill gained → future use.",
    signals:[
      ["Capability gap", String.raw`\b(gap|lack|need to develop|need to strengthen|capability|skill|knowledge|ability)\b`, "i"],
      ["Course specificity", String.raw`\b(module|programme|program|course|professor|centre|center|clinic|curriculum|research)\b`, "i"],
      ["Gap → course link", String.raw`\b(because|therefore|will enable|will allow|will equip|so that|directly|addresses)\b`, "i"],
      ["Choice rationale", String.raw`\b(first choice|chosen|selected|unique|specifically|particularly|because its)\b`, "i"],
      ["Future use", String.raw`\b(career|return|future|goal|impact|apply|implement|home|Georgia)\b`, "i"]
    ],
    priority:["Course specificity","Capability gap","Gap → course link","Future use"],
    questions:{
      "Course specificity":"Which specific module, centre, teaching feature or academic strength directly addresses your capability gap?",
      "Capability gap":"What can you not yet do well enough that this programme needs to solve?",
      "Gap → course link":"How will this specific programme feature close the gap you identified?",
      "Future use":"What will you do differently in your first role after returning because of this course?"
    },
    pattern:"Capability gap → programme fit"
  },
  career: {
    label:"Career Plan",
    official:"Chevening looks for a clear, realistic career plan that connects the UK course to future leadership and impact in the applicant’s home country.",
    method:"Strong career logic shows a credible sequence: return → near-term role → intermediate step → long-term impact.",
    signals:[
      ["Return/home-country link", String.raw`\b(return|home|Georgia|country|back home)\b`, "i"],
      ["Short-term step", String.raw`\b(short.?term|immediately|upon return|first|next role|within one|within 1)\b`, "i"],
      ["Mid-term step", String.raw`\b(mid.?term|3.?5|three.?five|within five|next few years)\b`, "i"],
      ["Long-term direction", String.raw`\b(long.?term|eventually|ultimately|ten.?year|10.?year)\b`, "i"],
      ["Impact/outcome", String.raw`\b(impact|change|improve|reform|build|create|lead|train|\d+|policy|sector)\b`, "i"]
    ],
    priority:["Mid-term step","Short-term step","Long-term direction","Impact/outcome"],
    questions:{
      "Mid-term step":"What credible intermediate role or milestone connects your immediate return plan to your long-term ambition?",
      "Short-term step":"What specific role, organisation type or responsibility will you pursue immediately after returning?",
      "Long-term direction":"What role or impact are the earlier career steps building towards?",
      "Impact/outcome":"Who benefits from this career plan, and what measurable change do you intend to create?"
    },
    pattern:"Career progression → home-country impact"
  }
};

function json(data: unknown, status=200){
  return new Response(JSON.stringify(data),{
    status,
    headers:{
      "Content-Type":"application/json",
      "Access-Control-Allow-Origin":"*",
      "Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type"
    }
  });
}
function analyse(key:string,text:string){
  const c=CRITERIA[key];
  if(!c) throw new Error("Unsupported criterion");
  const signals=c.signals.map(([label,source,flags]:string[])=>({label,hit:new RegExp(source,flags).test(text||"")}));
  const good=signals.filter((x:any)=>x.hit),missing=signals.filter((x:any)=>!x.hit);
  const primary=c.priority.map((p:string)=>missing.find((x:any)=>x.label===p)).find(Boolean)||missing[0]||signals[0];
  return {
    key,label:c.label,official:c.official,method:c.method,pattern:c.pattern,
    signals,good:good.map((x:any)=>x.label),missing:missing.map((x:any)=>x.label),
    primary:primary?.label||null,
    status:missing.length<=1?"Strong":missing.length<=3?"Needs attention":"Critical gap",
    question:c.questions[primary?.label]||"What evidence would make this point explicit?",
    wordCount:(text?.trim().match(/\S+/g)||[]).length
  };
}
function repeatedEvidence(answers:Record<string,string>){
  const stop=new Set(["that","this","with","from","have","will","your","into","their","then","what","when","where","which","because","after","before","through","about","were","been"]);
  const sets=Object.entries(answers).map(([k,t])=>[k,new Set((t.toLowerCase().match(/[a-z]{5,}/g)||[]).filter(w=>!stop.has(w)))]);
  let max=0,pair:string[]=[];
  for(let i=0;i<sets.length;i++)for(let j=i+1;j<sets.length;j++){
    const a=sets[i][1] as Set<string>, b=sets[j][1] as Set<string>;
    if(!a.size||!b.size)continue;
    let common=0;for(const w of a)if(b.has(w))common++;
    const ratio=common/Math.max(1,Math.min(a.size,b.size));
    if(ratio>max){max=ratio;pair=[sets[i][0] as string,sets[j][0] as string]}
  }
  return {level:max>=0.45?"High":max>=0.28?"Review":"Low",ratio:Number(max.toFixed(2)),pair};
}

Deno.serve(async(req:Request)=>{
  if(req.method==="OPTIONS") return new Response("ok",{headers:{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type"}});
  if(req.method!=="POST") return json({error:"Method not allowed"},405);

  const auth=req.headers.get("Authorization");
  if(!auth?.startsWith("Bearer ")) return json({error:"Unauthorized"},401);
  const url=Deno.env.get("SUPABASE_URL")!;
  const publishable=JSON.parse(Deno.env.get("SUPABASE_PUBLISHABLE_KEYS")||"{}")["default"]||Deno.env.get("SUPABASE_ANON_KEY")!;
  const client=createClient(url,publishable,{global:{headers:{Authorization:auth}},auth:{persistSession:false,autoRefreshToken:false}});
  const {data:{user},error:userError}=await client.auth.getUser(auth.slice(7));
  if(userError||!user) return json({error:"Unauthorized"},401);

  const {data:profile,error:profileError}=await client.from("users").select("plan").eq("id",user.id).single();
  if(profileError||profile?.plan!=="full") return json({error:"Full ShortlistProof required"},403);

  const {data:apps,error:appError}=await client.from("applications").select("id").eq("user_id",user.id).order("created_at",{ascending:true}).limit(1);
  if(appError||!apps?.length) return json({error:"Application not found"},404);
  const appId=apps[0].id;
  const [{data:rows,error:answersError},{data:stories,error:storiesError}]=await Promise.all([
    client.from("answers").select("criterion,answer_text").eq("application_id",appId),
    client.from("experiences").select("id,title,description,evidence_summary,source,created_at").eq("application_id",appId).order("created_at",{ascending:false})
  ]);
  if(answersError||storiesError) return json({error:"Could not load application"},500);
  const answers=Object.fromEntries((rows||[]).map((x:any)=>[x.criterion,x.answer_text||""]));
  const analyses=Object.fromEntries(Object.keys(CRITERIA).map(k=>[k,analyse(k,answers[k]||"")]));
  const body=await req.json().catch(()=>({}));
  const action=body?.action;

  if(action==="comparison"){
    const key=body?.criterion||"leadership";
    if(!CRITERIA[key]) return json({error:"Invalid criterion"},400);
    return json({
      analysis:analyses[key],
      answer:answers[key]||"",
      relevantStories:(stories||[]).slice(0,2).map((s:any)=>({
        id:s.id,title:s.title,description:s.description,
        theme:s.evidence_summary?.theme||"Experience"
      }))
    });
  }

  if(action==="best_story"){
    const criterion=body?.criterion&&CRITERIA[body.criterion]?body.criterion:"leadership";
    const candidates=(stories||[]).map((s:any)=>{
      const text=(s.title||"")+" "+(s.description||"");
      const a=analyse(criterion,text);
      const explicitEvidence=Array.isArray(s.evidence_summary?.evidence)?s.evidence_summary.evidence.length:0;
      return {id:s.id,title:s.title,description:s.description,theme:s.evidence_summary?.theme||"Experience",score:a.good.length*2+explicitEvidence,signals:a.good,missing:a.missing};
    }).sort((a:any,b:any)=>b.score-a.score);
    return json({criterion,best:candidates[0]||null,alternatives:candidates.slice(1,3)});
  }

  if(action==="whole_case"){
    const answered=Object.values(answers).filter((t:any)=>String(t).trim().length>60).length;
    const visible=Object.values(analyses).reduce((n:any,a:any)=>n+a.good.length,0);
    const repetition=repeatedEvidence(answers);
    const courseCareer=analyses.course.good.length>=3&&analyses.career.good.length>=3;
    const crossChecks=[
      {
        label:"Leadership → career",
        ok:analyses.leadership.good.length>=3&&analyses.career.good.length>=3,
        detail:analyses.leadership.good.length>=3&&analyses.career.good.length>=3
          ?"Leadership evidence and career direction are both present."
          :"The future use of your leadership evidence needs a clearer bridge."
      },
      {
        label:"Course → career",
        ok:courseCareer,
        detail:courseCareer
          ?"The programme and future-use logic are both visible."
          :"The programme may make sense, but its role in your next career step is not yet explicit enough."
      },
      {
        label:"Example diversity",
        ok:repetition.level!=="High",
        detail:repetition.level==="Low"
          ?"No strong lexical repetition signal was detected across the four answers."
          :repetition.level==="High"
            ?"Two answers share unusually similar evidence language. Check whether the same example is doing too much work."
            :"Review whether overlapping language reflects deliberate coherence or repeated evidence."
      }
    ];
    return json({
      answered,visible,total:20,progress:Math.round(answered/4*100),
      courseCareer,repetition,crossChecks,
      narrative:visible>=14?"Coherent":"Developing",
      analyses
    });
  }

  if(action==="final_proof"){
    const answered=Object.values(answers).filter((t:any)=>String(t).trim().length>60).length;
    const strongSections=Object.values(analyses).filter((a:any)=>a.status==="Strong").length;
    const checks=[
      ["All four core answers are present",answered===4],
      ["No critical structural gap detected",Object.values(analyses).every((a:any)=>a.missing.length<4)],
      ["Course → career connection is visible",analyses.course.good.length>=3&&analyses.career.good.length>=3],
      ["Leadership includes influence/outcome signals",analyses.leadership.good.includes("Influence")&&analyses.leadership.good.includes("Outcome")],
      ["Career plan includes short-, mid- and long-term steps",analyses.career.good.length>=4]
    ].map(([label,ok])=>({label,ok}));
    return json({answered,strongSections,checks,passed:checks.filter((x:any)=>x.ok).length,total:checks.length});
  }

  return json({error:"Unsupported action"},400);
});