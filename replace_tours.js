const fs = require("fs");
const seed = fs.readFileSync("seed.js","utf8");
const start = seed.indexOf("const tours = [");
let depth=0,inArr=false,end=start;
for(let i=start;i<seed.length;i++){
  if(seed[i]==="["){depth++;inArr=true;}
  if(seed[i]==="]"){depth--;}
  if(inArr&&depth===0){end=i+1;break;}
}
const before=seed.substring(0,start);
const after=seed.substring(end);
const newTours=fs.readFileSync("new_tours.js","utf8");
const result=before+newTours+after;
fs.writeFileSync("seed.js",result,"utf8");
console.log("seed.js updated! Length:", result.length, "chars");
