class Window {
    constructor(id, button) {
        this.id = id;
        this.button = button;
        this.x = 50;
        this.y = 30;
        this.width = 300;
        this.height = 400;
        this.window_visible = true;
        this.but = document.getElementById(this.button)
        this.el = document.getElementById(this.id)
        this.el.getElementsByClassName("cross")[0]

        this.mouse_startDrag = this.mouse_startDrag.bind(this)
        this.mouse_elementDrag = this.mouse_elementDrag.bind(this)
        this.mouse_closeDragEvent = this.mouse_closeDragEvent.bind(this)

        this.touch_startDrag = this.touch_startDrag.bind(this)
        this.touch_elementDrag = this.touch_elementDrag.bind(this)
        this.touch_closeDragEvent = this.touch_closeDragEvent.bind(this)

        this.setup()
    }

    setup() {
        this.el.onmousedown  = this.mouse_startDrag;
        this.el.ontouchstart = this.touch_startDrag;

        // button pour montrer la window
        this.but.onclick = () => {
            this.window_visible = true;
            this.el.style.visibility = "visible";
            this.el.style.top = this.x + "px";
            this.el.style.left = this.y + "px";
        }

        // croix de delete de la window
        this.el.getElementsByClassName("cross")[0].onclick = () => {
            this.window_visible = false;
            this.el.style.visibility = "hidden";
            this.x = 50
            this.y = 30
        }
    }

    touch_startDrag(e) {
        e = e.targetTouches[0]

        this.lastX = e.clientX
        this.lastY = e.clientY

        document.ontouchend  = this.touch_closeDragEvent;
        document.ontouchmove = this.touch_elementDrag;
    }

    touch_closeDragEvent() {
        this.el.style.zIndex = 0;
        document.ontouchend = null;
        document.ontouchmove = null;
        document.ontouchstart = null;
    }

    touch_elementDrag(e) {
        e = e.targetTouches[0]

        var deltaX = e.clientX - this.lastX
        var deltaY = e.clientY - this.lastY
        this.x = this.el.offsetLeft + deltaX
        this.y = this.el.offsetTop  + deltaY
        this.lastX = e.clientX
        this.lastY = e.clientY

        this.el.style.zIndex = 10;

        console.log(this.el.offsetLeft)

        if (this.constrain_window(this.x, this.y)) {
            this.el.style.top  = this.y + "px"
            this.el.style.left = this.x + "px"
        }
    }

    mouse_startDrag(e) {
        e = e || window.event
        e.preventDefault()

        this.lastX = e.clientX
        this.lastY = e.clientY

        document.onmouseup   = this.mouse_closeDragEvent;
        document.onmousemove = this.mouse_elementDrag;
    }

    mouse_closeDragEvent(e) {
        this.el.style.zIndex = 0;
        document.onmouseup = null;
        document.onmousemove = null;
    }

    mouse_elementDrag(e) {
        e.preventDefault()

        var deltaX = e.clientX - this.lastX
        var deltaY = e.clientY - this.lastY
        this.x = this.el.offsetLeft + deltaX
        this.y = this.el.offsetTop  + deltaY
        this.lastX = e.clientX
        this.lastY = e.clientY

        this.el.style.zIndex = 10;

        if (this.constrain_window(this.x, this.y)) {
            this.el.style.top  = this.y + "px"
            this.el.style.left = this.x + "px"
        }
    }

    constrain_window(x, y) {
        return (x >= 0 && y >= 20 && x < (window.innerWidth - this.width - 5) && y < (window.innerHeight - this.height - 5)) 
    }
}

new Window("about", "about_button")
new Window("theme", "theme_button")

// dragElement(document.getElementById("about"))