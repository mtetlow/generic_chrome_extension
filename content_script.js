//when this is injected into the active tab by the extension
//we attach a listener to listen for requests from popup.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  //If we are querying
  if (request.operation === 'queryDOM') {
    //Select with the selector variable
    var domResult = document.querySelectorAll(request.selector);
    //Get HTML to pass back to the extension since we can't pass a node directly
    var matchesHTML = [];
    domResult.forEach(function(elem) {
      matchesHTML.push(elem.innerHTML);
    });
    //Send the HTML back as a response so popup.js can use it
    sendResponse({ data: matchesHTML, success: true });
  } else if (request.operation === 'modifyDOM') {
    //If we are modifying
    //Use a selector to get the elements we want to modify
    var domResult = document.querySelectorAll(request.selector);
    //Go over each element that matched the selector and modify the html for the element
    domResult.forEach(function(elem) {
      elem.innerHTML = elem.innerHTML + '-test';
    });
    //let popup.js know we are done modifying the dom
    sendResponse({ success: true });
  }
});
