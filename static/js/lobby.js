let form = document.getElementById('lobby__form')

let displayName = sessionStorage.getItem('display_name')
if(displayName){
    form.name.value = displayName
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    sessionStorage.setItem('display_name', e.target.name.value)

    let inviteCode = e.target.room.value
    if(!inviteCode){
        inviteCode = String(Math.floor(Math.random() * 10000))
    }
    window.location = `room.html?room=${inviteCode}`
})


document.getElementById('room_select').addEventListener('change', function() {
    var customRoomInput = document.getElementById('custom_room_input');
    if (this.value === 'custom') {
        customRoomInput.style.display = 'block';
    } else {
        customRoomInput.style.display = 'none';
    }
});

function joinRoom(room) {
    if (room === 'custom') {
        var customRoomName = document.getElementById('custom_room_name').value;
        if (customRoomName.trim() === '') {
            alert('Please enter a custom room name.');
            return;
        }
        if (roomExists(customRoomName)) {
            alert('This room already exists. Please choose a different name.');
            return;
        }
        var uniqueRoomId = generateUniqueId(); // Generate a unique identifier
        var customRoomUrl = `room.html?room=${customRoomName}-${uniqueRoomId}`; // Append unique identifier to room name
        window.location = customRoomUrl;
    } else {
        window.location = `room.html?room=${room}`;
    }
}

// Function to generate a unique identifier
function generateUniqueId() {
    var timestamp = new Date().getTime();
    var randomId = Math.random().toString(36).substring(2);
    return timestamp.toString() + randomId;
}

// Function to check if a room already exists
function roomExists(roomName) {
    var rooms = document.querySelectorAll('#active-rooms-container ul li');
    for (var i = 0; i < rooms.length; i++) {
        if (rooms[i].textContent === roomName) {
            return true;
        }
    }
    return false;
}

