import anime from "animejs/lib/anime.es"
import type { PlaybackReplicant } from '../types/schemas/playbackReplicant';

//Replicant
const playbackRep = nodecg.Replicant<PlaybackReplicant>("playback","nodecg-playback");
const gameBGMRep = nodecg.Replicant<Boolean>("gameBGM");
const memoRep = nodecg.Replicant<String>("memo");

//Clock
window.onload = () =>{
	const clockElm = document.getElementById("clock");
	if(clockElm != null){
		clock(clockElm);
		setInterval(()=>{
			clock(clockElm);
		}, 1000);
	}
	
}
const clock = (e: HTMLElement) => {
	const time = new Date();
	e.innerText = chk(time.getHours()) + ':' + chk(time.getMinutes()) + ':' + chk(time.getSeconds());
};

//Playback(BGM Info)
NodeCG.waitForReplicants(playbackRep, gameBGMRep).then(()=>{
	playbackRep.on("change", newValue=>{
		if(isPlayback(newValue)){
			BGMChangeAnime();
		}
	});

	gameBGMRep.on("change", (newValue,oldValue) => {
		if(typeof newValue === "boolean" && typeof oldValue === "boolean"){
			BGMChangeAnime();
		}
	})
});

const BGMChangeAnime = () => {
	const playbackElm = document.getElementById("playback-text");
	if (playbackElm == null){
		return;
	}
	if(!isPlayback(playbackRep.value)){
		return;
	}
	const tl = anime.timeline({
		easing: 'easeOutExpo',
		targets: playbackElm
	})
	tl.add({
		duration: 1,
		translateY: 0,
		complete: () => {
			const stateElm = document.getElementById("status");
			const artistElm = document.getElementById("artist");
			const trackElm = document.getElementById("track");
			if (stateElm == null || artistElm == null || trackElm == null){
				return;
			}
			if(!isPlayback(playbackRep.value)|| typeof gameBGMRep.value !== "boolean"){
				return;
			}
			stateElm.classList.remove("mdi-music-off", "mdi-music", "mdi-gamepad-variant")
			if(gameBGMRep.value){
				artistElm.innerText = "ゲーム内BGM";
				trackElm.innerText = "";
				stateElm.classList.add("mdi-gamepad-variant");
			}
			else if (playbackRep.value.state === 1){
				stateElm.classList.add("mdi-music")
				trackElm.innerText =playbackRep.value.title;
				if(typeof playbackRep.value.artist === "string" && playbackRep.value.artist !== ""){
					if(typeof playbackRep.value.album === "string" && playbackRep.value.album !== ""){
						artistElm.innerText = `${playbackRep.value.artist} - ${playbackRep.value.album}`;
					}
					else{
						artistElm.innerText = playbackRep.value.artist;
					}
				}else{
					artistElm.innerText = "Unknown";
				}
			}
			else{
				artistElm.innerText = "Stopped";
				trackElm.innerText = "";
				stateElm.classList.add("mdi-music-off");
			}
		}
	})
	if(playbackRep.value.state === 1 && !gameBGMRep.value){
		tl.add({
			delay: 5000,
			duration: 1000,
			translateY: -40
		})
	}
}

//Memo
NodeCG.waitForReplicants(memoRep).then(()=>{
	memoRep.on("change",(newValue, oldValue) =>{
		if (typeof newValue !== "string"){
			return;
		}
		const memoElm = document.getElementById("memo");
		if( memoElm == null){
			return;
		}
		const tl = anime.timeline({
			targets: memoElm,
			duration: 1000,
			easing: "linear"
		});
		if(typeof oldValue === "undefined"){
			memoElm.innerText = newValue;
		}
		else tl.add({
			opacity: [1,0],
			complete: ()=>{
				if (typeof newValue === "string"){
					memoElm.innerText = newValue;
				}
			}
		});
		tl.add({
			opacity: 1
		});
	})
})


//function
const chk = (i: number) => {
	if (i < 10) {
		return '0' + i;
	}

	return String(i);
};

function isPlayback(value: unknown): value is PlaybackReplicant{
    if(typeof value !== "object" || value == null ) {
        return false;
    }
    const { state, title } =  value as Record<keyof PlaybackReplicant, unknown>;
    if(typeof title !== "string" || title == null){
        return false;
    }
    if(typeof state !== "number"){
        return false;
    }
    if(state === 0 || 1 || 2){
        return true;
    }
    return false;
}
