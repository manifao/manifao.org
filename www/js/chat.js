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

function addMessages(message) {
  $("#my-chat-messages").append(`<div> ${message.name} </div> <div> ${message.message} </div>`);
}

function sendMessage(message) {
  $.post(`${window.location.origin}/chat`, message, (data) => console.log(data));
}
