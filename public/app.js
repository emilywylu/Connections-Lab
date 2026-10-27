window.addEventListener('load', function () {

    //Open and connect socket
    let socket = io();
    //Listen for confirmation of connection
    socket.on('connect', function () {
        console.log("Connected");
    });

    /* --- Code to RECEIVE a socket message from the server --- */
    let chatBox = document.getElementById('chat-box-msgs');

    //Listen for messages named 'msg' from the server
    socket.on('msg', function (data) {
        console.log("Message arrived!");
        console.log(data);

        //Create a message string and page element
        let receivedMsg = data.name ? data.name + " : " + data.msg : data.msg; //if there's a name, show name:message, if not, just show the message
        let msgEl = document.createElement('p');
        msgEl.innerHTML = receivedMsg;

        //Add the element with the message to the page
        chatBox.appendChild(msgEl);
        //Add a bit of auto scroll for the chat box
        chatBox.scrollTop = chatBox.scrollHeight;
    });

    /* --- Joining the game --- */
    let nameInput = document.getElementById('name-input');
    let joinButton = document.getElementById('join-button');
    let joinSection = document.getElementById('join-section');
    let wordSection = document.getElementById('word-section');
    let curName = "";

    joinButton.addEventListener('click', function(){
        if (nameInput.value.trim()=== "") return; //checks if name box isn't empty
        curName = nameInput.value.trim(); //saves your name in curName
        socket.emit('join', curName);
    });

    //Listen for server to know that player has joined, when heard, hides name box and shows word box. Word box is initially hidden on html with (display:none)
    socket.on('joined', function(){
        joinSection.style.display = 'none';
        wordSection.style.display = 'block';
    });

    /* --- Code to SEND a socket message to the Server --- */
    let msgInput = document.getElementById('msg-input');
    let sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', function () {
        let curMsg = msgInput.value;
        let msgObj = { "name": curName, "msg": curMsg };

        //Send the message object to the server
        socket.emit('msg', msgObj);
        msgInput.value = ""; // word box empties after each send
    });
});
