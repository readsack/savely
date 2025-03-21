function listenForClicks() {

  document.querySelector('#popup-content').addEventListener("formdata", (e) => {
    
    e.preventDefault();
    let timeStamp = new Date(Date.now());
    
    let getcurrentTab = browser.tabs.query({"active": true, "currentWindow": true});
    let onGot = (tabInfo) => {
      let data = {
        url: tabInfo[0].url,
        time: timeStamp,
        content: e.formData.get("content"),
        note: e.formData.get("note")
      }
      browser.tabs.sendMessage(tabInfo[0].id, data);
    }
    getcurrentTab.then(onGot)

  })

  document.getElementById("page").addEventListener("click", async (e) => {
    let page = await browser.runtime.getBackgroundPage();
    browser.tabs.create({
      "url": page.location.href
    })
  })
}

function sendMsg(tabs, e) {
  browser.tabs.sendMessage(tabs[0].id, e);
}

function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute Savely content script: ${error.message}`);
}

browser.tabs
  .executeScript({ file: "/content_scripts/script.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
