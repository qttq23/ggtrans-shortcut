
console.log('contentScript.js: hello');

// thanks to
// https://stackoverflow.com/questions/22702446/how-to-get-clipboard-data-in-chrome-extension
// https://stackoverflow.com/questions/7313786/highlight-all-text-in-textarea
// https://stackoverflow.com/questions/15968911/how-to-clear-text-area-with-a-button-in-html-using-javascript
// https://stackoverflow.com/questions/6202953/obtaining-this-tab-id-from-content-script-in-chrome-extension
// https://stackoverflow.com/questions/49613874/send-message-from-option-page-to-content-script
// https://stackoverflow.com/questions/16006583/capturing-ctrlz-key-combination-in-javascript
// https://stackoverflow.com/questions/29058670/background-script-only-for-specific-domain-in-chrome-extension


// define variables
let registerKeyList = null;

// define handler
function paste_text_handler(){
	let translateInputTextArea = document.querySelector("textarea.er8xn");
	translateInputTextArea.value="";
	translateInputTextArea.focus();
	document.execCommand("paste");
}


function listen_text_handler(){
	let listenBtn = document.querySelector("span.material-icons-extended.VfPpkd-Bz112c-kBDsod");
	listenBtn.click();
}

function select_text_handler(){
	let translateInputTextArea = document.querySelector("textarea.er8xn");
	translateInputTextArea.focus();
	translateInputTextArea.select();
}


// load command + key from storage
function loadCommandAndAssignHanlder(){
	chrome.storage.sync.get(['registerKeyList'], function(result){

		let newRegisterKeyList = result.registerKeyList;
		for(let item of newRegisterKeyList){
			if(item.command == 'paste_text'){
				item.handler = paste_text_handler;
			}
			else if(item.command == 'listen_text'){
				item.handler = listen_text_handler;
			}
			else if(item.command == 'select_text'){
				item.handler = select_text_handler;
			}
		}

		registerKeyList = newRegisterKeyList;

	});

}
loadCommandAndAssignHanlder();

// auto reload after a few seconds
setInterval(loadCommandAndAssignHanlder, 3000);


// listen sendKey event
document.addEventListener('keydown', function(event) {

	console.log('contentScript.js: keydown');
	for(let item of registerKeyList){

		/// eg:  if (event.ctrlKey && event.key === 'z') 
		if (event[item.initKey] == true && event.key === item.plusKey) {
			console.log(item.description);
			item.handler();
			break;
		}
	}


	// // forward keyevent to background to check and execute command
	// chrome.runtime.sendMessage({
		// 	from: 'contentScript.js',
		// 	keyEvent: {
			// 		altKey: event.altKey,
			// 		shiftKey: event.shiftKey,
			// 		ctrlKey: event.ctrlKey,
			// 		key: event.key
			// 	}
			// }, null);

		});


// also listen message from extension's popup
chrome.runtime.onMessage.addListener(
	function(message, sender, sendResponse) {
		console.log(sender.tab ?
			"from a content script:" + sender.tab.url :
			"from the extension");

		for(let item of registerKeyList){
			if (message.command === item.command) {
				console.log(item.description);
				item.handler();
				break;
			}
		}
	}
	);


