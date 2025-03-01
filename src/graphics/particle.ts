import { loadSlim } from "@tsparticles/slim";
import { tsParticles } from "@tsparticles/engine";

const particleRep = nodecg.Replicant<string>("particleJson");

loadSlim(tsParticles);

NodeCG.waitForReplicants(particleRep).then(() => {
  particleRep.on("change", newValue => {
    if (typeof newValue === "string"){
      tsParticles.load({
        id: "tsparticles",
        url: newValue
      });
    }
  });

})
