
document.addEventListener("DOMContentLoaded", (e) => {
    let saves = browser.storage.local.get()
    let onGot = (data) => {
        
        if(Object.hasOwn(data, "saves")){
            data.saves.forEach((el, i) => {
                let date = el.time;
                
                let d3 = document.createElement("div")
                d3.innerText = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
                d3.classList.add("date");
                //
                let del = document.createElement("div")
                del.innerText = "🗑"
                del.classList.add("del");
                del.onclick = (e) => {
                    let newData = data.saves.toSpliced(i, 1);
                    browser.storage.local.set({saves: newData}).then((e) => {
                        window.location.reload()
                    })
                    
                }
                d3.appendChild(del)
                
                let d1 = document.createElement("div")
                d1.innerText = el.content;
                d1.classList.add("text");
                
                let d2 = document.createElement("div")
                d2.innerText = el.note;
                d2.classList.add("note");
                
                let l = document.createElement("a")
                l.href = el.url;
                l.innerText = "Go To Source ↗"
                l.classList.add("link");
                
                
                let w = document.createElement("div")
                w.appendChild(d3)
                w.appendChild(d1)
                w.appendChild(d2)
                w.appendChild(l)
                w.classList.add("el")
                document.getElementById("cont").appendChild(w);
                
            });
        }
    }
    saves.then(onGot, (e) => console.log(e)); 
})
