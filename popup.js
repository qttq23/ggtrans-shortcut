

let btnPaste = document.getElementById('btnPaste');
let btnListen = document.getElementById('btnListen');

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	chrome.tabs.executeScript(
		tabs[0].id,
		{code: 'let target = document.querySelector("textarea.er8xn"); '});
});


btnPaste.onclick = function(event){

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: 'target.value=""; target.focus(); document.execCommand("paste");'});
	});

}


btnListen.onclick = function(event){

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: 'document.querySelector("span.material-icons-extended.VfPpkd-Bz112c-kBDsod").click(); '});
	});

}

