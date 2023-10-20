console.log("app.js")
var contentTabId;

function logURL(requestDetails) { 
  console.log(requestDetails.url)
  if (requestDetails.url.includes('googleads')){
    chrome.tabs.sendMessage(contentTabId, {  //send it to content script
      from: "background",
      first: '',
      second: ''
    });
  }
}


chrome.runtime.onMessage.addListener(function(msg,sender) {
  if (msg.from == "content") {  //get content scripts tab id
    contentTabId = sender.tab.id;
  }
  chrome.webRequest.onBeforeRequest.addListener( 
    logURL, 
    { urls: ["<all_urls>"] } 
  );
});
