//Once the dom is loaded for the extension we can attach
//event handlers to react to the buttons in the extension being clicked
document.addEventListener('DOMContentLoaded', function() {
  //This handles the query button
  var queryButton = document.getElementById('query-dom');
  queryButton.addEventListener('click', function() {
    //When we click the query button we send a message to
    //content_script.js which has been injected into the active tab
    //by the content_scripts definition in manifest.json
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        //We send what operation we want to do, and the selector for the elements we want back
        //selector can be customized to something like '.some-class a' or any other valid selector
        { operation: 'queryDOM', selector: 'a' },
        function(response) {
          if (response.data) {
            //This is where we handle the response from content_script.js
            //response is the parameter content_script.js called sendResponse with
            //Here we go over the response (which is an array of html)
            //And add it to a list in popup.html
            var responseDiv = document.getElementById('response');
            responseDiv.innerHTML = '';
            response.data.forEach(function(elemHTML) {
              var newLI = document.createElement('li');
              newLI.innerHTML = elemHTML;
              responseDiv.appendChild(newLI);
            });
          }
        }
      );
    });
  });
  //This handles the modify button
  var modifyButton = document.getElementById('modify-dom');
  modifyButton.addEventListener('click', function() {
    //When we click the modify button another message is sent to content_script.js which is running on the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        //This time we are asking content_script to modify
        //every element that matches the selector
        { operation: 'modifyDOM', selector: 'a' },
        function(response) {
          //We know it's done when we get a response back
          if (response.success) {
            console.log('success');
          }
        }
      );
    });
  });
});
