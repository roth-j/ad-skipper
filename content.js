console.log("content.js")

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  /* If the received message has the expected format... */
  if (msg.text && (msg.text == 'hey_cs')) {
      console.log('Received a msg from bp...')
      sendResponse('hey_bp');
  }
});

console.log('running custom you tube add skipper')

var simulateClick = function (elem) {
  // Create our event (with options)
  var evt = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window
  });
  // If cancelled, don't dispatch our event
  !elem.dispatchEvent(evt);
};

var execute = function (time) {
  console.log('running')
  setTimeout(()=>{
    console.log('executing')
    var skipButton = document.querySelector('.ytp-ad-skip-button.ytp-button');
      if(skipButton){
        console.log('%c skipping add 🖕', 'color: #bada55; font-size: 42px; font-weight: bold')
        simulateClick(skipButton);
      } else {
        console.log('nothing found')
      }
    }, time)
}
chrome.runtime.sendMessage({from:"content"}); //first, tell the background page that this is the tab that wants to receive the messages.

chrome.runtime.onMessage.addListener(function(msg) {
  if (msg.from == "background") {
    execute(500)
    execute(5500)
  }
});
