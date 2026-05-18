let zIndexCounter = 100;

function openSection(id){

    const win = document.getElementById(id);

    win.style.display = "block";
    win.style.zIndex = ++zIndexCounter;

    makeDraggable(win);

    // active button
    document.querySelectorAll(".xp-toolbar button")
      .forEach(b => b.classList.remove("active"));

    const btn = document.querySelector(`[onclick="openSection('${id}')"]`);
    if(btn) btn.classList.add("active");
}

function closeWindow(btn){
    btn.closest(".side-window").style.display = "none";
}

function makeDraggable(el){

    // jeśli mobile — nie rób drag
    if(window.innerWidth <= 768){
        return;
    }

    const header = el.querySelector(".mini-window-bar");

    let offsetX = 0;
    let offsetY = 0;
    let dragging = false;

    header.onmousedown = function(e){
        dragging = true;

        offsetX = e.clientX - el.offsetLeft;
        offsetY = e.clientY - el.offsetTop;

        el.style.zIndex = ++zIndexCounter;

        document.onmousemove = function(e){
            if(!dragging) return;

            el.style.left = (e.clientX - offsetX) + "px";
            el.style.top  = (e.clientY - offsetY) + "px";
        };

        document.onmouseup = function(){
            dragging = false;
            document.onmousemove = null;
        };
    };
}