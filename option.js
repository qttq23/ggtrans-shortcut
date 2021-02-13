
let newRegisterKeyList = null;

chrome.storage.sync.get(
['registerKeyList'], 
function(result){
	console.log(result);
	newRegisterKeyList = result.registerKeyList;

	document.getElementById("command1").innerHTML = newRegisterKeyList[0].command;
	document.getElementById("initKeyInput1").value = newRegisterKeyList[0].initKey;
	document.getElementById("plusKeyInput1").value = newRegisterKeyList[0].plusKey;
});


document.getElementById("saveBtn").addEventListener('click', function(event){

	console.log('saveBtn clicked');

	newRegisterKeyList[0].command = document.getElementById("command1").innerHTML;
	newRegisterKeyList[0].initKey = document.getElementById("initKeyInput1").value;
	newRegisterKeyList[0].plusKey = document.getElementById("plusKeyInput1").value;

	chrome.storage.sync.set(
	{
		registerKeyList: newRegisterKeyList
	}, 
	function(){
		console.log('set ok');
		alert('new value is set. wait a few seconds for changes take effects');
	});


})
