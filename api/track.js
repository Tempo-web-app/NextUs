export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({ok:false});
  try{
    const body=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
    const allowed=['event','page','referrer','language','sessionId','ts','element','label','href'];
    const clean={};
    for(const key of allowed){
      if(typeof body[key]==='string') clean[key]=body[key].slice(0,500);
      else if(body[key]===null) clean[key]=null;
    }
    if(!clean.event||!clean.page)return res.status(400).json({ok:false});
    console.log('[NEXTUS_ANALYTICS]',JSON.stringify(clean));
    return res.status(204).end();
  }catch(e){
    return res.status(400).json({ok:false});
  }
}