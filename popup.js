//import { LOCAL_KEY } from './local-key'
const LOCAL_KEY="youtube-adskipper-count";

document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get([LOCAL_KEY], (result) => {
        const number = document.getElementById("ad-skipper-count")
        number.innerHTML = `${(result[LOCAL_KEY] || {}).count || 0} `
    })
  }, false)