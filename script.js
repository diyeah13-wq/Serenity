async function sendMessage() {

  const input = document.getElementById("message");
  const chat = document.getElementById("chat");

  const message = input.value.trim();

  if (!message) return;

  // Show user message
  chat.innerHTML += `<div class="user">${message}</div>`;

  input.value = "";

  // Show typing indicator
  chat.innerHTML += `
<div class="botMessage" id="typing">
<span class="avatar">🌸</span>
<div class="bot">Serenity is thinking...</div>
</div>
`;
  chat.scrollTop = chat.scrollHeight;

  try {

    const res = await fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await res.json();

    // Remove typing indicator
    const typing = document.getElementById("typing");
    if (typing) typing.remove();

    // Show AI reply
   chat.innerHTML += `
<div class="botMessage">
<span class="avatar">🌸</span>
<div class="bot">${data.reply}</div>
</div>
`;

    chat.scrollTop = chat.scrollHeight;

  } catch (error) {

    const typing = document.getElementById("typing");
    if (typing) typing.remove();

    chat.innerHTML += `<div class="bot">⚠️ Sorry, Serenity couldn't respond.</div>`;

  }
}


// Allow Enter key to send message
document.getElementById("message").addEventListener("keypress", function(e) {

  if (e.key === "Enter") {
    sendMessage();
  }

});