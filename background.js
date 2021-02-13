
console.log('background.js: hello');

// register key combinations and corresponding event handler
let registerKeyList = [
{
	initKey: 'altKey',
	plusKey: 'v',
	description: 'focus textarea and paste clipboard text3',
	command: 'paste_text',
	// handler: 
},
{
	initKey: 'altKey',
	plusKey: 'l',
	description: 'shortcut for listen button',
	command: 'listen_text'
},
{
	initKey: 'altKey',
	plusKey: 'a',
	description: 'focus and select all text',
	command: 'select_text'
},

];


// only run in the first time installed or reload button clicked
chrome.runtime.onInstalled.addListener(function() {

	console.log('background.js: onInstalled');

	// work with v2. but not v3???
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [new chrome.declarativeContent.PageStateMatcher({
				pageUrl: {hostEquals: 'translate.google.com'},
			})
			],
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});


	chrome.storage.sync.set({registerKeyList: registerKeyList}, function(result){
		console.log('background.js: onInstalled: registerKeyList is set');
	});

});
