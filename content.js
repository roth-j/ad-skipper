chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  /* If the received message has the expected format... */
  if (msg.text && (msg.text == 'hey_cs')) {
      console.log('Received a msg from bp...')
      sendResponse('hey_bp');
  }
});

console.log('%c running custom you tube add skipper', 'color: #bada55; font-size: 24px; font-weight: bold')

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
  console.count('execute')
  setTimeout(()=>{
    var skipButton = document.querySelector('.ytp-ad-skip-button.ytp-button');
      if(skipButton){
        console.log('%c skipping add 🖕', 'color: #bada55; font-size: 24px; font-weight: bold')
        simulateClick(skipButton);
      } else {
        console.count('no button press')
      }
    }, time)
}
chrome.runtime.sendMessage({from:"content"}); //first, tell the background page that this is the tab that wants to receive the messages.

chrome.runtime.onMessage.addListener(function(msg) {
  if (msg.from == "background") {
    execute(500)
  }
});
