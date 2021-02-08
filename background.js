chrome.runtime.onInstalled.addListener(function() {

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'translate.google.com'},
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });


  // shortcut key
  // https://stackoverflow.com/questions/22702446/how-to-get-clipboard-data-in-chrome-extension
  // https://stackoverflow.com/questions/7313786/highlight-all-text-in-textarea
  // https://stackoverflow.com/questions/15968911/how-to-clear-text-area-with-a-button-in-html-using-javascript
  chrome.commands.onCommand.addListener(function(command) {

    if(command == 'paste-text'){

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'let target = document.querySelector("textarea.er8xn"); '});
      });

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'target.value=""; target.focus(); document.execCommand("paste");'});
      });

    }

    else if(command == 'listen-text'){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.querySelector("span.material-icons-extended.VfPpkd-Bz112c-kBDsod").click(); '});
      });

    }

    else if(command == 'focus-text'){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'let target = document.querySelector("textarea.er8xn"); '});
      });

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'target.focus(); target.select();'});
      });      
    }


  })


});