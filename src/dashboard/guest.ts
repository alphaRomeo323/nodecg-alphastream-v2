import { GuestReplicant } from "../types/schemas";


//Replicant
const guestRep = nodecg.Replicant<GuestReplicant>("guests");

//HTMLElement
const addElm = document.getElementById("add");
const removeElm = document.getElementById("remove");
const applyElm = document.getElementById("apply");
const guestElm = document.getElementById("guest");
const guestTwitterElm = document.getElementById("twitter");
const guestYoutubeElm = document.getElementById("youtube");

if(
    addElm instanceof HTMLButtonElement && removeElm instanceof HTMLButtonElement && applyElm instanceof HTMLButtonElement &&
    guestElm instanceof HTMLInputElement && guestTwitterElm instanceof HTMLInputElement && guestYoutubeElm instanceof HTMLInputElement
){
    NodeCG.waitForReplicants(guestRep).then(()=>{
        addElm.disabled = true;
        removeElm.disabled = true;
        guestRep.on("change", newValue=>{
            if(isGuests(newValue)){
                if(newValue.current < 0){
                    guestElm.value = "";
                    guestTwitterElm.value = "";
                    guestYoutubeElm.value = "";
                }
                else {
                    if(typeof newValue.guests[0].name === "string" && newValue.guests[0].name != null){
                        guestElm.value = newValue.guests[0].name;
                    }
                    if(typeof newValue.guests[0].twitter === "string" && newValue.guests[0].twitter != null){
                        guestTwitterElm.value = newValue.guests[0].twitter;
                    }
                    if(typeof newValue.guests[0].youtube === "string" && newValue.guests[0].youtube != null){
                        guestYoutubeElm.value = newValue.guests[0].youtube;
                    }
                }
            }
        })
        applyElm.onclick = () =>{
            let newGuestRep = {
                current:0,
                guests:[
                    {
                        name: guestElm.value,
                        twitter: guestTwitterElm.value.replace(/^@/g,""),
                        youtube: guestYoutubeElm.value.replace(/^@/g,"")
                    }
                ]
            }
            if (isGuests(newGuestRep)){
                guestRep.value = newGuestRep;
            }
        }
    })
}
//func
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
