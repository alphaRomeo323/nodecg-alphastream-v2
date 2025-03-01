import { GuestReplicant } from "../types/schemas/GuestReplicant";
import anime from "animejs/lib/anime.es"


//Replicant
const guestRep = nodecg.Replicant<GuestReplicant>("guests");

//Guest Information
NodeCG.waitForReplicants(guestRep).then(() => {
    guestRep.on("change",(newValue, oldValue) => {
        if(isGuests(newValue)){
            if(newValue.current < 0){
                return;
            }
            const guestElm = document.getElementById("guest");
            const guestTwitterElm = document.getElementById("guest-twitter");
            const guestYoutubeElm = document.getElementById("guest-youtube");
            const guest = newValue.guests[newValue.current];
            if (typeof guest !== "object"){
                return;
            }
            if(guestTwitterElm != null){
                guestTwitterElm.innerText = "@"+guest.twitter;
            }
            if(guestYoutubeElm != null){
                guestYoutubeElm.innerText = "@"+guest.youtube || "";
            }
            if(guestElm != null && typeof guest.name === "string"){
                const tl = anime.timeline({
                    targets: guestElm,
                    duration: 1000,
                    easing: "linear"
                })
                if (typeof oldValue === "undefined"){
                    guestElm.innerText = guest.name;
                }
                else tl.add({
                    opacity:[1,0],
                    complete: () => {
                        if(guestElm != null && typeof guest.name === "string")
                        guestElm.innerText = guest.name;
                    }
                })
                tl.add({
                    opacity: 1
                })
            }
        }
    });
});

//function
function isGuests(value: unknown): value is GuestReplicant{
    if(typeof value !== "object" || value == null ) {
        return false;
    }
    const { current, guests } =  value as Record<keyof GuestReplicant, unknown>;
    if (typeof current !== "number" || current == null){
        return false;
    }
    if (!Array.isArray(guests)){
        return false;
    }
    return true;
}