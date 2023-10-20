document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('img').addEventListener('click', onclick, false);

  function onclick (){
    chrome.tabs.query({currentWindow:true, active: true},
      function (tabs){
        chrome.tabs.discard(tabs[0].id)
      }
    )
  }

}, false)
