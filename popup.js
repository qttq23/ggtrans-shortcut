

let btnPaste = document.getElementById('btnPaste');
let btnListen = document.getElementById('btnListen');

btnPaste.onclick = function(event){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {command: "paste_text"}, null);
	});
}

btnListen.onclick = function(event){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {command: "listen_text"}, null);
	});

}

