import { loadSlim } from "@tsparticles/slim";
import { tsParticles } from "@tsparticles/engine";
import template from "./particles.json"
//Replicant
const switchMsgRep = nodecg.Replicant<String>("switchMsg");
const asset = nodecg.Replicant("assets:animes");

//Elements
const switchMsgElm = document.getElementById("msg");
const animeImgElm = document.getElementById("anime-img");

(async () => {
    await loadSlim(tsParticles);
  const params = template as typeof template;
    await tsParticles.load({
      id: "tsparticles",
      options: params as any,
    });
})();

NodeCG.waitForReplicants(switchMsgRep, asset).then(()=>{
    if (!(animeImgElm instanceof HTMLImageElement && switchMsgElm instanceof HTMLElement)) return;
    asset.on('change', newVal => {
        if(Array.isArray(newVal)){
            const randInt = Math.floor( Math.random() * newVal.length );
            animeImgElm.src = newVal[randInt].url;
        }
    });
    switchMsgRep.on('change', newVal => {
        if(typeof newVal === "string"){
            switchMsgElm.innerText = newVal;
        }
    });
})

