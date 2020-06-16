const socket = io();

$(() => {
  $("#input-send").click(()=> {
    const mName = $("#input-name").val();
    const mMessage = $("#input-message").val();

    if(mName !== '' && mMessage !== '') {
      sendMessage({ user: mName, message: mMessage });
      $("#input-message").val('');
      $("#my-input-send-error").css("opacity", "0");
    } else {
      $("#my-input-send-error").css("opacity", "1");
    }
  });
});

socket.on('message', addMessages);

function addMessages(message) {
  $("#my-chat-messages").append(`
    <div class="chat-message">
      <div class="message-user">${message.user}</div>
      <div class="message-message">${message.message}</div>
    </div>`);
  $("#my-chat-messages").scrollTop($("#my-chat-messages").prop("scrollHeight"));
}

function sendMessage(message) {
  $.post(`${window.location.origin}/chat`, message, (data) => console.log(data));
}
