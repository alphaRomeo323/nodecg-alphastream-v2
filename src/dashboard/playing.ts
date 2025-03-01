import type { PlaybackReplicant } from '../types/schemas/playbackReplicant';


//Rep
const playbackRep = nodecg.Replicant<PlaybackReplicant>('playback', 'nodecg-playback');
const gameBGMRep = nodecg.Replicant<Boolean>("gameBGM");
//Elm
const stateElm = document.getElementById("state");
const titleElm = document.getElementById("title");
const artistElm = document.getElementById("artist");
const albumElm = document.getElementById("album");
const checkInput = document.getElementById("gameBGM");
if (stateElm !== null && titleElm !== null && artistElm !== null && albumElm !== null && checkInput !== null && checkInput instanceof HTMLInputElement){
	NodeCG.waitForReplicants(playbackRep, gameBGMRep).then(() => {
		
		playbackRep.on('change', (newVal) => {
			if(newVal !== undefined){
				switch(newVal.state){
					case 0: stateElm.innerText = "stop";		break;
					case 1: stateElm.innerText = "play_arrow";	break;
					case 2:	stateElm.innerText = "pause";     	break;
				}
				titleElm.innerText = newVal.title;
				artistElm.innerText = newVal.artist || "";
				albumElm.innerText = newVal.album || "";
			}
		});
		gameBGMRep.on("change", newValue => {
			if (typeof newValue === "boolean"){
				checkInput.checked = newValue;
			}
		});
		checkInput.addEventListener("change", ()=>{
			gameBGMRep.value = checkInput.checked;
		});
	});
}
