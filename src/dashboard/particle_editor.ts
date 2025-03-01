const asset = nodecg.Replicant("assets:particles");
const particleRep = nodecg.Replicant<string>("particleJson");

NodeCG.waitForReplicants(particleRep, asset).then(()=>{
    const bgPulldown = document.getElementById("pulldown");
    const applyBtn = document.getElementById("apply");
    if(!(bgPulldown instanceof HTMLSelectElement
        && applyBtn instanceof HTMLButtonElement
    )){
        return;
    }
    applyBtn.onclick = () => {
		send();
	}

    const send = () =>{
        particleRep.value = bgPulldown.selectedOptions[0].value;
    };

	asset.on('change', newVal => {
        bgPulldown.innerHTML="";
        if(Array.isArray(newVal)) {
            const arr = [ ...newVal ].sort((a,b) => a.name > b.name ? 1 : -1);
            for (const assetKey of arr.sort()) {
                let option = document.createElement("option");
                option.text = assetKey.name;
                option.value = assetKey.url;
                bgPulldown.appendChild(option.cloneNode(true));
            }
        }
	});
})