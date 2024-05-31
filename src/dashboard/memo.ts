//Replicant
const memoRep = nodecg.Replicant<String>("memo");

//HTMLDocument
const applyElm = document.getElementById("apply");
const memoElm = document.getElementById("memo");

if(applyElm instanceof HTMLButtonElement && memoElm instanceof HTMLInputElement){
    NodeCG.waitForReplicants(memoRep).then(()=>{
        memoRep.on("change", newValue => {
            if(typeof newValue === "string"){
                memoElm.value = newValue;
            }
        })

        applyElm.onclick = () =>{
            if(typeof memoElm.value  === "string"){
                memoRep.value = memoElm.value ;
            }
        }
    });
}