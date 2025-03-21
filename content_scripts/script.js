(() => {

  if (window.hasRun) {
    return;
  }
  window.hasRun = true;


  browser.runtime.onMessage.addListener((e) => {
    let saves = browser.storage.local.get()
    let onGot = (data) => {
      if(!Object.hasOwn(data, "saves")){
          let newData = [e]
          browser.storage.local.set({saves: newData})
      }
      else{
          let newData = data.saves.concat([e]);
          browser.storage.local.set({saves: newData})
      }

    }
    let onErr = (data) => {console.log(data)}
    saves.then(onGot, onErr);
    
  });



})();
