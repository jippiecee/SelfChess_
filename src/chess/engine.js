// Engine catur murni (tanpa dependency): aturan lengkap + pencarian alpha-beta. Sudah lolos perft.

const FL="abcdefgh",G={K:"♚",Q:"♛",R:"♜",B:"♝",N:"♞",P:"♟"},VAL={P:100,N:320,B:330,R:500,Q:900,K:0};
const KN=[[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]],AL=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
const col=c=>c?(c<"a"?"w":"b"):"",sq=i=>FL[i&7]+(8-(i>>3));
const start=()=>({b:Array.from("rnbqkbnrpppppppp"+" ".repeat(32)+"PPPPPPPPRNBQKBNR",c=>c===" "?"":c),t:"w",c:"KQkq",ep:-1,hm:0,fm:1});
const ok=(r,f)=>r>=0&&r<8&&f>=0&&f<8;
function att(b,s,by){const r=s>>3,f=s&7,at=(a,c)=>ok(a,c)?b[a*8+c]:"",pr=by==="w"?r+1:r-1,P=by==="w"?"P":"p";
 if(at(pr,f-1)===P||at(pr,f+1)===P)return true;
 const N=by==="w"?"N":"n",K=by==="w"?"K":"k";
 for(const[d,e]of KN)if(at(r+d,f+e)===N)return true;
 for(const[d,e]of AL){if(at(r+d,f+e)===K)return true;let a=r+d,c=f+e;
  while(ok(a,c)){const x=b[a*8+c];if(x){const u=x.toUpperCase();if(col(x)===by&&(u==="Q"||(d&&e?u==="B":u==="R")))return true;break}a+=d;c+=e}}
 return false}
const inChk=(b,c)=>att(b,b.indexOf(c==="w"?"K":"k"),c==="w"?"b":"w");
function gen(s){const{b,t:me,c,ep}=s,en=me==="w"?"b":"w",out=[];
 for(let i=0;i<64;i++){const p=b[i];if(col(p)!==me)continue;const u=p.toUpperCase(),r=i>>3,f=i&7,add=(to,x)=>out.push({f:i,t:to,...x});
  if(u==="P"){const dr=me==="w"?-1:1,sr=me==="w"?6:1,pr=me==="w"?0:7,push=(to,x)=>add(to,to>>3===pr?{...x,pr:"Q"}:x);
   if(!b[i+dr*8]){push(i+dr*8);if(r===sr&&!b[i+dr*16])add(i+dr*16,{dp:1})}
   for(const df of[-1,1]){if(f+df<0||f+df>7)continue;const to=i+dr*8+df;if(col(b[to])===en)push(to);else if(to===ep)add(to,{ep:1})}}
  else if(u==="N"||u==="K"){for(const[d,e]of u==="N"?KN:AL){if(!ok(r+d,f+e))continue;const to=(r+d)*8+f+e;if(col(b[to])!==me)add(to)}
   if(u==="K"){const h=me==="w"?56:0,R=me==="w"?"R":"r";
    if(i===h+4&&!att(b,i,en)){
     if(c.includes(me==="w"?"K":"k")&&!b[h+5]&&!b[h+6]&&b[h+7]===R&&!att(b,h+5,en)&&!att(b,h+6,en))add(h+6,{cs:1});
     if(c.includes(me==="w"?"Q":"q")&&!b[h+1]&&!b[h+2]&&!b[h+3]&&b[h]===R&&!att(b,h+2,en)&&!att(b,h+3,en))add(h+2,{cs:2})}}}
  else{const ds=u==="B"?AL.filter(([d,e])=>d&&e):u==="R"?AL.filter(([d,e])=>!d||!e):AL;
   for(const[d,e]of ds){let a=r+d,x=f+e;while(ok(a,x)){const to=a*8+x;if(col(b[to])!==me)add(to);if(b[to])break;a+=d;x+=e}}}}
 return out}
function mk(s,m){const b=s.b.slice(),p=b[m.f],me=s.t;let c=s.c,cap=b[m.t];
 b[m.t]=m.pr?(me==="w"?m.pr:m.pr.toLowerCase()):p;b[m.f]="";
 if(m.ep){const k=m.t+(me==="w"?8:-8);cap=b[k];b[k]=""}
 if(m.cs){const h=me==="w"?56:0;if(m.cs===1){b[h+5]=b[h+7];b[h+7]=""}else{b[h+3]=b[h];b[h]=""}}
 const u=p.toUpperCase(),lose=x=>{c=c.replace(x,"")};
 if(u==="K")me==="w"?(lose("K"),lose("Q")):(lose("k"),lose("q"));
 for(const[q,x]of[[63,"K"],[56,"Q"],[7,"k"],[0,"q"]])if(m.f===q||m.t===q)lose(x);
 return{b,t:me==="w"?"b":"w",c,ep:m.dp?(m.f+m.t)/2:-1,hm:u==="P"||cap?0:s.hm+1,fm:s.fm+(me==="b")}}
const legal=s=>gen(s).filter(m=>!inChk(mk(s,m).b,s.t));
const suf=(s,m)=>{const n=mk(s,m);return inChk(n.b,n.t)?(legal(n).length?"+":"#"):""};
function san(s,m,L){const p=s.b[m.f],u=p.toUpperCase();if(m.cs)return(m.cs===1?"O-O":"O-O-O")+suf(s,m);
 let o="";const cap=s.b[m.t]||m.ep;
 if(u==="P"){if(cap)o+=FL[m.f&7]+"x";o+=sq(m.t)+(m.pr?"="+m.pr:"")}
 else{o=u;const x=L.filter(y=>y!==m&&y.t===m.t&&s.b[y.f]===p);
  if(x.length)o+=x.every(y=>(y.f&7)!==(m.f&7))?FL[m.f&7]:x.every(y=>(y.f>>3)!==(m.f>>3))?8-(m.f>>3):sq(m.f);
  o+=(cap?"x":"")+sq(m.t)}
 return o+suf(s,m)}
function ev(s){let v=0;for(let i=0;i<64;i++){const p=s.b[i];if(!p)continue;const u=p.toUpperCase(),w=p<"a",r=i>>3,f=i&7,cd=7-Math.abs(f-3.5)-Math.abs(r-3.5);let x=VAL[u];
 if(u==="N"||u==="B")x+=cd*6;else if(u==="P")x+=(w?6-r:r-1)*7+cd*2;else if(u==="K")x-=cd*5;else if(u==="Q")x+=cd;
 v+=w?x:-x}return v}
function nm(s,d,a,b){if(!d)return(s.t==="w"?1:-1)*ev(s);const L=legal(s);if(!L.length)return inChk(s.b,s.t)?-99999-d:0;
 const sc=m=>s.b[m.t]?VAL[s.b[m.t].toUpperCase()]*10-VAL[s.b[m.f].toUpperCase()]:0;L.sort((x,y)=>sc(y)-sc(x));
 for(const m of L){const v=-nm(mk(s,m),d-1,-b,-a);if(v>=b)return b;if(v>a)a=v}return a}


/** Analisis posisi: tiap langkah legal dicari balasannya (depth 3 ply). Skor dari sudut pandang putih, satuan centipawn. */
function analyze(s, moves) {
  const sg = s.t === "w" ? 1 : -1;
  return moves
    .map((m) => ({ m, san: san(s, m, moves), score: -nm(mk(s, m), 2, -1e9, 1e9) * sg }))
    .sort((a, b) => (b.score - a.score) * sg);
}

export { FL, G, VAL, col, sq, start, legal, mk, san, inChk, analyze };
