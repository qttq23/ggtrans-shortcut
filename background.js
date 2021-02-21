
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


	// store shortcut keys to storage
	chrome.storage.sync.set({registerKeyList: registerKeyList}, function(result){
		console.log('background.js: onInstalled: registerKeyList is set');
	});

	// create context menu
	let contextMenuItems = [
	{
		id: '1',
		title: 'search with google translate',
		type: 'normal',
		contexts: ['selection'],
		
	},
	];

	for(let item of contextMenuItems){
		chrome.contextMenus.create(item);	
	}
	
});


chrome.contextMenus.onClicked.addListener(function(info, tab){

	// copy selected text to clipboard
	// document.execCommand("copy");	// document not available with background
	let selectedText = info.selectionText;

	// switch tab to translate.google.com
	chrome.tabs.query(
	{
		currentWindow: true,
		url: 'https://translate.google.com/*'
	},
	function (tabs){
		console.log('background.js: numtabs: ', tabs.length);
		console.log(tabs);

		chrome.tabs.update(
			tabs[0].id,
			{
				active: true,
				highlighted: true
			},
			function (updatedTab){

				// send message to content script to execute paste_text
				chrome.tabs.sendMessage(
					updatedTab.id,
					{
						from: 'background.js',
						command: 'paste_text',
						data: selectedText
					},
					null,
					null);
			}
			);
	}
	);


});
