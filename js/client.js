const socket = io('http://localhost:8000');

const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
var audio = new Audio('ting.mp3');


//Appending all new messages to the container.
const append = (message,position)=>{
    console.log('here');
    const messageElement = document.createElement('div');
    messageElement.innerText =message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}

//stopping container from refreshing every time send button is clicked
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`,'right');
    socket.emit('send',message);
    messageInput.value = '';
})

//prompting for every new user who wants to enter the chat
const name = prompt("Enter your name to join: ");
socket.emit('new-user-joined', name);

//notifying existing users about the new user joined
socket.on('user-joined', name =>{
    append(`${name} joined the chat`,'right');
});

//recieving message
socket.on('receive', data =>{
    append(`${data.name} : ${data.message}`,'left');
});

//notifies when a user left the chat
socket.on('left', name =>{
    append(`${name} left the chat`,'left');
});
