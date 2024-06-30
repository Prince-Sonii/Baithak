let message;
const displayMessage = document.getElementById("msg_screen");
const typingArea = document.getElementById("typing_area");
const sendButton = document.getElementById("send_msg");
sendButton.addEventListener("click",()=>{
    message = typingArea.value;
    typingArea.value="";
    const outerBox = document.createElement("p");
    outerBox.className = "user_message";
    outerBox.innerText = message;
    displayMessage.appendChild(outerBox);
    outerBox.scrollIntoView(false); 
})