import {kitsuClass} from "./../kitsu/kitsuClass";
import {firebaseNotification} from "./../utils/firebaseNotification";

function main() {
  if(api.settings.get('userscriptMode')) return;
  var kitsu = new kitsuClass(window.location.href);
  messageKitsuListener(kitsu);
  firebaseNotification();
}

var css = "font-size: 40px; padding-bottom: 3px; color: white; text-shadow: -1px -1px #2e51a2, 1px -1px #2e51a2, -1px 1px #2e51a2, 1px 1px #2e51a2, 2px 2px #2e51a2, 3px 3px #2e51a2;";
console.log("%cMAL-Sync", css, "Version: "+ api.storage.version());

api.settings.init()
  .then(()=>{
    main();
  });

function messageKitsuListener(kitsu){
  // @ts-ignore
  chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.action == 'TabMalUrl') {
      con.info('miniMAL');
      kitsu.getMalUrl().then((malUrl)=>{
        if(malUrl !== ''){
          con.log('TabMalUrl Message', malUrl);
          sendResponse(malUrl);
        }else{
          if(api.settings.get('syncMode') === 'KITSU'){
            con.log('TabUrl Message', kitsu.url);
            sendResponse(kitsu.url);
          }
        }
      })
      return true;
    }
  });
}
