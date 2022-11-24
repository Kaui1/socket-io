// const io = require("socket.io-client");
const socket = io();

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const meesageContainer = document.querySelector(".container");

const name = prompt("Enter your Name to join 😍 ");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("meesage");
  messageElement.classList.add(position);
  meesageContainer.append(messageElement);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const meesage = messageInput.value;
  append(`you: ${meesage}`, "right");
  socket.emit("send", meesage);
  messageInput.value = "";
});

socket.emit("new-user-joined", name);

socket.on("user-joined", (name) => {
  append(`${name} joined the chat `, "right");
  console.log(`${name} join the chat`);
});

socket.on("receive", (data) => {
  append(`${data.name} : ${data.message} `, "left");
});
