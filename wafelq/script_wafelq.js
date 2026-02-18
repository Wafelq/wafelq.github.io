let zIndexCounter = 100;

function openSection(id){

    const windowEl = document.getElementById(id);

    windowEl.style.display = "block";
    windowEl.style.zIndex = ++zIndexCounter;

    makeDraggable(windowEl);

    // Active button
    document.querySelectorAll(".xp-toolbar button")
      .forEach(b => b.classList.remove("active"));

    const btn = document.querySelector(`[onclick="openSection('${id}')"]`);
    if(btn) btn.classList.add("active");
}

function closeWindow(closeBtn){
    closeBtn.closest(".side-window").style.display = "none";
}

function makeDraggable(el){

    const header = el.querySelector(".mini-window-bar");

    let isDown = false;
    let offsetX = 0;
    let offsetY = 0;

    header.onmousedown = function(e){
        isDown = true;
        el.style.zIndex = ++zIndexCounter;

        const rect = el.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        document.body.style.userSelect = "none";
    };

    document.onmousemove = function(e){
        if(!isDown) return;

        const containerRect = document.getElementById("container").getBoundingClientRect();

        el.style.left = (e.clientX - containerRect.left - offsetX) + "px";
        el.style.top  = (e.clientY - containerRect.top  - offsetY) + "px";
    };

    document.onmouseup = function(){
        isDown = false;
        document.body.style.userSelect = "auto";
    };
}
