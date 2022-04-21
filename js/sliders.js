let isDragging = 0;
let isDragged = 0;

function dragSlider(element) {
    var curPos = 0,
        oriPos = 0,
        length = parseInt(getComputedStyle(document.getElementById('slider')).width);

    element.addEventListener("mouseover", () => {
        element.style.transform = 'scale(2)';
    })

    element.addEventListener("mouseout", () => {
        element.style.transform = 'scale(1)';
    })

    element.onmousedown = (e) => {
        oriPos = e.clientX;
        dragSliderMouseDown(e);
    }

    function dragSliderMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        document.onmouseup = closeSliderDrag;
        // call a function whenever the cursor moves:
        document.onmousemove = sliderDrag;
    }

    function sliderDrag(e) {
        isDragging = 1;
        mouseMoveStatus = 1;
        element.style.transform = `scale(2)`;
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        curPos = e.clientX - oriPos + isDragged;
        if (curPos < 0) { curPos = 0 } else if (curPos > length) { curPos = length }
        // set the element's new position:
        nowPlaying.style.width = 6 + curPos + "px";
        element.style.left = `${nowPlaying.offsetWidth - 6}px`;
    }

    function closeSliderDrag() {
        isDragging = 0;
        isDragged = curPos;
        element.style.transform = `scale(1)`;
        loginAudio.currentTime = (curPos / length) * loginAudio.duration;
        nowPlaying.style.width = `${6 + loginAudio.currentTime / loginAudio.duration * length}px`;
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}