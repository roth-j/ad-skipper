const LOCAL_KEY="youtube-adskipper-count";

var simulateClick = function (elem) {
  const evt = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window
  });
  !elem.dispatchEvent(evt);
};
console.log('%c Running ad skipper', 'color: #bada55; font-size: 24px; font-weight: bold')

var execute = function (time) {
  setTimeout(()=>{
    var skipButton = document.querySelector('.ytp-ad-skip-button.ytp-button');
      if(skipButton){  
        simulateClick(skipButton);
        chrome.storage.local.get([LOCAL_KEY], (result) => {
          const val = ((result[LOCAL_KEY] || {}).count || 0) + 1
          chrome.storage.local.set({[LOCAL_KEY]: {count: val}}, () => {
            console.log('%c skipping ad 🖕', 'color: #bada55; font-size: 24px; font-weight: bold')
            console.log(`%c ${val} ads skipped`, 'color: #bada55; font-size: 24px; font-weight: bold');
          });
        });
      }
    }, time)
}

let vidPlayer;
const id = setInterval(()=>{
  vidPlayer =document.getElementById('movie_player')
  if(vidPlayer){
    clearInterval(id)
    setup()
  }
}, 100)

setTimeout(()=>{
  clearInterval(id)
}, 10 * 1000)

const setup = () =>{
  const vidPlayer =document.getElementById('movie_player')
  function tryToClick() {
    execute(200)
  }

  const mutationCallback = mutationsList => {
    for(let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          if(mutation.target.classList.contains('ad-showing')){
            tryToClick()
          } else {
            console.info(mutation.target.classList)
          }
        }
    }
  }

  const observer = new MutationObserver(mutationCallback)
  observer.observe(vidPlayer, { attributes: true })

}
