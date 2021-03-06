setInterval(function update() {
    const [dayStart, dayEnd] = [new Date(), new Date()];
    dayStart.setHours(0, 0, 0);
    dayEnd.setHours(0, 0, 0);
    dayEnd.setDate(dayEnd.getDate() + 1);
    const range = dayEnd.getDate() - dayStart.getDate();
    const diff = Math.max(0, dayEnd.getDate() - new Date().getDate());
    const fillerWidth = (100 - (100 * diff) / range) / 100;
    document.querySelector(".date-widget").innerHTML = "<svg class=\"date-display__icon\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><path d=\"M21 3h-3V1h-2v2H8V1H6v2H3v18h18V3zm-2 16H5V8h14v11zM7 10h5v5H7v-5z\"></path></svg>" + new Date().toLocaleString('en-UK', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
    document.querySelector(".time-widget").innerHTML = "<svg class=\"time__icon\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><path d=\"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z\"></path></svg>" + new Date().toLocaleString('en-UK', {
        hour: 'numeric',
        minute: 'numeric'
    }) + "<div class=\"time__filler\"></div>";
    document.querySelector(".time__filler").style.transform = `scaleX(${fillerWidth})`;
    return update;
}(), 5000);
const elem = document.querySelector(".terminal");
document.addEventListener("touchstart", touchHandler, true);
document.addEventListener("touchmove", touchHandler, true);
document.addEventListener("touchend", touchHandler, true);
document.addEventListener("touchcancel", touchHandler, true);
let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
elem.onmousedown = onMouseDown;
function onMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = onMouseUp;
    document.onmousemove = onMouseMuse;
}
function onMouseMuse(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elem.style.top = (elem.offsetTop - pos2) + "px";
    elem.style.left = (elem.offsetLeft - pos1) + "px";
    checkPos();
}
function onMouseUp() {
    document.onmouseup = null;
    document.onmousemove = null;
}
function touchHandler(event) {
    const touch = event.changedTouches[0];
    const simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent({
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup"
    }[event.type], true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
    touch.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}
document.addEventListener("keydown", function (e) {
    e || window.event;
    const key = e.key;
    if (e.altKey) {
        switch (key) {
            case "ArrowUp":
                elem.style.top = (elem.offsetTop - 20) + "px";
                break;
            case "ArrowDown":
                elem.style.top = (elem.offsetTop + 20) + "px";
                break;
            case "ArrowLeft":
                elem.style.left = (elem.offsetLeft - 20) + "px";
                break;
            case "ArrowRight":
                elem.style.left = (elem.offsetLeft + 20) + "px";
                break;
        }
        checkPos();
    }
}, false);
function checkPos() {
    if (elem.offsetHeight + elem.offsetTop > window.innerHeight)
        elem.style.top = (window.innerHeight - elem.offsetHeight) + "px";
    if (elem.offsetWidth + elem.offsetLeft > window.innerWidth)
        elem.style.left = (window.innerWidth - elem.offsetWidth) + "px";
    if (elem.offsetLeft < -elem.offsetWidth / 2)
        elem.style.left = (-Math.floor(elem.offsetWidth / 2)) + "px";
    if (elem.offsetTop < -elem.offsetHeight / 2)
        elem.style.top = (-Math.floor(elem.offsetHeight / 2)) + "px";
}
