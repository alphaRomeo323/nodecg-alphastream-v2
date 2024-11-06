//Replicant
const switchMsgRep = nodecg.Replicant<String>("switchMsg");

//ButtonElement
const parentElm = document.getElementById("msg-btn");

if(parentElm instanceof HTMLElement && parentElm.childElementCount > 0){
    parentElm.addEventListener("click", (e)=>{
        if(e.target instanceof HTMLButtonElement){
            switchMsgRep.value = e.target.innerText
        }
    })
}