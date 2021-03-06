minimize = (ele, icon) => {
    let clickState = 0;

    $(`#${icon.id}`).on('click', () => {
        if (!clickState) {
            clickState = 1;
            if (ele.id === "audioPlayer") {
                loginAudio.pause();
                playButton.style.backgroundImage = 'url(../svg/play.svg)';
            }
            ele.style.opacity = 0;
            icon.style.opacity = '.5';
        } else {
            clickState = 0;
            ele.style.opacity = 1;
            icon.style.opacity = '1';
        }
    })
}

function dragElement(element) {
    let pos1 = 0,
        pos2 = 40,
        pos3 = 0,
        pos4 = 0;
    let draggedX = 0,
        draggedY = 0;
    let dragState = 0;
    let initBottom = parseInt(getComputedStyle(element).bottom),
        initRight = parseInt(getComputedStyle(element).right);
    let eleWidthMargin = parseInt(getComputedStyle(element).width) + 2 * parseInt(getComputedStyle(element).margin) + 2 * parseInt(getComputedStyle(element).padding);
    let eleHeightMargin = parseInt(getComputedStyle(element).height) + 2 * parseInt(getComputedStyle(element).margin) + 2 * parseInt(getComputedStyle(element).padding);

    document.getElementById(element.id + 'Header').onmousedown = (e) => {
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.querySelector(`div#${element.id} > div`).style.animation = 'none';
        document.querySelector(`#${element.id}Header`).style.animation = 'none';
        element.style.animation = 'none';
        $('#windowManager').append($(`#${element.id}`));
        dragMouseDown(e);
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        dragState = 1;
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = e.clientX - pos3;
        pos2 = e.clientY - pos4;
        // set the element's new position:
        element.style.top = `${window.innerHeight - (parseInt(getComputedStyle(element).height) + 2 * parseInt(getComputedStyle(element).margin) + 2 * parseInt(getComputedStyle(element).padding) - (pos2 + draggedY - initBottom))}px`;
        element.style.left = `${window.innerWidth - (eleWidthMargin - (pos1 + draggedX - initRight))}px`;
        element.style.right = `${-(pos1 + draggedX - initRight)}px`;
        element.style.bottom = `${-(pos2 + draggedY - initBottom)}px`;
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        if (dragState) {
            draggedX += pos1;
            draggedY += pos2;
        }
        dragState = 0;
        document.onmouseup = null;
        document.onmousemove = null;
    }
}