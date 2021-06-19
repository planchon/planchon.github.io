console.log("------- planchon.io -------")
console.log("     you can hire me !")
console.log(" mailto: paul@planchon.io")
console.log('---------------------------')

let ZINDEX_INDEX = 1
let LAST_ZINDEX_OBJ = null

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

        this.changeZIndex = this.changeZIndex.bind(this)

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

    changeZIndex() {
        if (LAST_ZINDEX_OBJ != this) {
            this.el.style.zIndex = ZINDEX_INDEX++;
        }
        LAST_ZINDEX_OBJ = this;
    }

    touch_startDrag(e) {
        e = e.targetTouches[0]

        this.lastX = e.clientX
        this.lastY = e.clientY

        document.ontouchend  = this.touch_closeDragEvent;
        document.ontouchmove = this.touch_elementDrag;
    }

    touch_closeDragEvent() {
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

        this.changeZIndex()

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
        this.el.style.zIndex = 1;
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

        this.changeZIndex()

        if (this.constrain_window(this.x, this.y)) {
            this.el.style.top  = this.y + "px"
            this.el.style.left = this.x + "px"
        }
    }

    constrain_window(x, y) {
        return (x >= 0 && y >= 20 && x < (window.innerWidth - this.width - 5) && y < (window.innerHeight - this.height - 5)) 
    }
}

class Terminal {
    constructor(id, commands) {
        this.id = id;
        this.el = document.getElementById(id)
        this.textarea = document.getElementById(commands)
        this.command = ""

        this.enter_key_handle = this.enter_key_handle.bind(this)
        this.preventDefault = this.process_command.bind(this)

        this.setup()
    }
    
    setup() {
        this.textarea.onkeypress = this.enter_key_handle
    }

    enter_key_handle(e) {
        var key = e.keyCode
        if (key === 13) {
            this.command = this.textarea.value
            this.textarea.value = ''
            this.process_command()
        }
    }

    process_command() {
        console.log("processing" + this.command)
    }
}


new Window("about", "about_button")
new Window("help", "help_button")
// new Window("terminal", "terminal_button")
new Window("sociaux", "sociaux_button")
new Window("projets", "projets_button")
new Window("secret", "secret_button")
new Window("papiers", "papiers_button")


// new Terminal("terminal", "commands")

let heure = document.getElementById("heure")
let date = new Date()
heure.innerHTML = date.getHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes()

// dragElement(document.getElementById("about"))