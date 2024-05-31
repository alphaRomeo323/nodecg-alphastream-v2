import anime from "animejs/lib/anime.es"
import type { ChatReplicant, EmojiItem } from '../types/schemas';

//Replicant
const chatRep = nodecg.Replicant<ChatReplicant>("chat", "nodecg-livechat");

//Chat Overlay
NodeCG.waitForReplicants(chatRep).then(() => {
	chatRep.on("change", (newValue,oldValue) =>{

		if(!isChat(oldValue) || !isChat(newValue)){
			return;
		}
		if(oldValue === newValue){
			return;
		}
		const chatElm = document.getElementById("chat")
		const tempElm = document.getElementById("chat-template");
		const authorElm = document.getElementById("chat-author");
		const contentElm = document.getElementById("chat-content");
		if (chatElm == null || tempElm == null || authorElm == null || contentElm == null){
			return;
		}
		authorElm.innerText = newValue.author;
		contentElm.innerHTML = ""
		switch(newValue.platform){
			case "youtube":
				if(Array.isArray(newValue.message) && newValue.message.length > 0){
					newValue.message.forEach(item =>{
						if(typeof item !== "object" || item == null){
							return;
						}
						if( 'text' in item  && typeof item.text === "string"){
							const newText = document.createTextNode(item.text);
							contentElm.appendChild(newText);
						}
						if(isEmojiItem(item)){
							if (item.isCustomEmoji === true){
								const newCustomEmoji = document.createElement("img");
                            	newCustomEmoji.src = item.url;
                            	newCustomEmoji.classList.add("h-6", "w-6", "mx-1", "inline-block", "align-middle");
								contentElm.appendChild(newCustomEmoji);
							}
							else{
								const newEmoji = document.createTextNode(item.emojiText);
								contentElm.appendChild(newEmoji);
							}
						}
					})
				}
				break;
			case "twitch":
				if( typeof newValue.message === "string"){
					contentElm.innerText = newValue.message;
				}
				break;
			default:
				break;
		}
		const newChatElm = tempElm.cloneNode(true);
		if(newChatElm instanceof HTMLElement){
			newChatElm.id = "";
			anime({
				targets: newChatElm,
				duration: 1000,
				translateX:["-5vw", 0],
				opacity: [0,1],
				scale: [0.8,1],
				easing: "easeOutExpo"
			})
			chatElm.appendChild(newChatElm);
			while(Math.ceil(chatElm.getBoundingClientRect().height) < chatElm.scrollHeight){
				if (chatElm.firstElementChild != null){
					chatElm.removeChild(chatElm.firstElementChild);
				}
			}
		}

	})
})

//function
function isChat(value: unknown): value is ChatReplicant{
	if(typeof value !== "object" || value == null ) {
        return false;
    }
	const { author, platform, message } =  value as Record<keyof ChatReplicant, unknown>;
	if(typeof author !== "string" || author == null){
        return false;
    }
	if(typeof platform !== "string" || platform == null){
        return false;
    }
	if(platform === "twitch" && typeof message === "string" && message != null){
		return true;
	}
	if(platform === "youtube" && Array.isArray(message) && message.length > 0){
		return true;
	}
	return false
}

function isEmojiItem(value: unknown): value is EmojiItem{
	if(typeof value !== "object" || value == null ) {
        return false;
    }
	const {emojiText, isCustomEmoji, url, alt} = value as Record<keyof EmojiItem, unknown>;
	if(typeof emojiText !== "string" || emojiText == null){
        return false;
    }
	if(typeof isCustomEmoji !== "boolean" || isChat == null){
        return false;
    }
	if(typeof url !== "string" || url == null){
        return false;
    }
	if(typeof alt !== "string" || alt == null){
        return false;
    }
	return true;
}