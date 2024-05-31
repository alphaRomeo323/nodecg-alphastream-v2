import type NodeCG from '@nodecg/types';
import { GuestReplicant } from '../types/schemas'

module.exports = function (nodecg: NodeCG.ServerAPI) {
	//rep Initialize
    const gameBGMRep = nodecg.Replicant<Boolean>("gameBGM");
	const guestRep = nodecg.Replicant<GuestReplicant>("guests");
	const memoRep = nodecg.Replicant<String>("memo");
	gameBGMRep.value = false;
	if (typeof guestRep.value === "undefined"){
		guestRep.value = {
			current: -1,
			guests: []
		}
	}
	if (typeof memoRep.value === "undefined"){
		memoRep.value = ""
	}
};
