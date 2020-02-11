let socket = io({
    autoConnect: false
});

// Jitsi meet config
const domain = 'meet.jit.si';
const options = {
    roomName: 'fypwebui',
    width: 500,
    height: 500,
    parentNode: document.querySelector('#meet'),
    noSsl: false
};

// Toggle Jitsi element
let api = null;
function toggleCall() {
    if (socket.connected && api === null) {
        document.querySelector('.meet').innerHTML = ''
        api = new JitsiMeetExternalAPI(domain, options);
    } else if (api !== null) {
        api.dispose();
        api = null;
        document.querySelector('.meet').innerHTML = '<img src="bg.svg" />'
    }
}

// Websocket toggle
$(function () {
    $('#chkToggle').bootstrapToggle({
        on: 'Connected',
        off: 'Disconnected'
    })
    $('#chkToggle').bootstrapToggle('off');
});
function toggleWS() {
    if (socket.disconnected) {
        socket.open();
        $('#chkToggle').bootstrapToggle('on');
        $('#wsToggleBtn').html('Disconnect')
    } else {
        socket.close();
        $('#chkToggle').bootstrapToggle('off');
        $('#wsToggleBtn').html('Connect')
    }
}
socket.on('connect', () => {
    console.log(`WebSocket connection status: ${socket.connected}`);
    // console.log('Connected to the Robot');
    toggleCall();

});
socket.on('disconnect', function (reason) {
    console.log(`WebSocket disconnected. reason: ${reason}`)
    // console.log('Disconnected from the Robot');
    toggleCall();
});

// Command funcs
function goUp() {
    if (!socket.connected) {
        console.log("No WebSocket connection.");
    } else {
        socket.emit('up');
        console.log("Command: Up");
    }
}
function goDown() {
    if (!socket.connected) {
        console.log("No WebSocket connection.");
    } else {
        socket.emit('down');
        console.log("Command: Down");
    }
}
function goLeft() {
    if (!socket.connected) {
        console.log("No WebSocket connection.");
    } else {
        socket.emit('left');
        console.log("Command: Left");
    }
}
function goRight() {
    if (!socket.connected) {
        console.log("No WebSocket connection.");
    } else {
        socket.emit('right');
        console.log("Command: Right");
    }
}
function goUpRight() {
    if (!socket.connected) {
        console.log("No WebSocket connection.");
    } else {
        socket.emit('upright');
        console.log("Command: Up Right");
    }
}
function goDownRight() {
    if (!socket.connected) {
        console.log("No WebSocket connection.");
    } else {
        socket.emit('downright');
        console.log("Command: Down Right");
    }
}
function goUpLeft() {
    if (!socket.connected) {
        console.log("No WebSocket connection.");
    } else {
        socket.emit('upleft');
        console.log("Command: Up Left");
    }
}
function goDownLeft() {
    if (!socket.connected) {
        console.log("No WebSocket connection.");
    } else {
        socket.emit('downleft');
        console.log("Command: Down Left");
    }
}
function brake() {
    if (!socket.connected) {
        console.log("No WebSocket connection.");
    } else {
        socket.emit('brake');
        console.log("Command: Brake");
    }
}


//Keyboard commands interfacing
let pressed = {}; // could also use an array
onkeydown = onkeyup = function (e) {
    e = e || event; // to deal with IE
    pressed[e.keyCode] = e.type == 'keydown';
    /* insert conditional here */
    if (pressed[38] && pressed[39]) {
        goUpRight();
    } else if (pressed[38] && pressed[37]) {
        goUpLeft();
    } else if (pressed[40] && pressed[39]) {
        goDownRight();
    } else if (pressed[40] && pressed[37]) {
        goDownLeft();
    } else if (pressed[38]) {
        goUp();
    } else if (pressed[40]) {
        goDown();
    } else if (pressed[37]) {
        goLeft();
    } else if (pressed[39]) {
        goRight();
    } else if (pressed[32]) {
        brake();
    }
}

