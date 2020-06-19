const setupCameraCapture = (mVideo) => {
  navigator.getUserMedia({ audio: false, video: { facingMode: "user" } }, (stream) => {
    mVideo.srcObject = stream;
    mVideo.onloadedmetadata = mVideo.play();
  }, function(err) {
    console.log("The following error occurred in getUserMedia");
    console.log(err.name);
  });
}

window.onload = () => {
  $("#add-picture-button").click(() => {
    setupCameraCapture($("#my-photo-video")[0]);
    $("#my-photo-container").css("display", "block");
  });

  $("#my-photo-elements-container").click((event) => {
    event.stopPropagation();
  });

  $("#my-photo-container").click(() => {
    const mVideo = $("#my-photo-video")[0];
    if (mVideo.srcObject) {
      mVideo.srcObject.getTracks()[0].stop();
    }

    $("#my-photo-canvas").css("opacity", "0");
    $("#my-photo-take-button").css("display", "block");
    $("#my-photo-retake-button").css("display", "none");
    $("#my-photo-submit-button").css("display", "none");
    $("#my-photo-container").css("display", "none");
  });

  $("#my-photo-take-button").click(() => {
    const videoEl = $("#my-photo-video")[0];
    const canvasEl = $("#my-photo-canvas")[0];
    const canvasCtx = canvasEl.getContext("2d");

    canvasEl.width = videoEl.videoWidth;
    canvasEl.height = videoEl.videoHeight;
    $("#my-photo-canvas").css("width", canvasEl.width);
    $("#my-photo-canvas").css("height", canvasEl.height);
    $("#my-photo-take-button").css("display", "none");
    $("#my-photo-retake-button").css("display", "block");
    $("#my-photo-submit-button").css("display", "block");

    canvasCtx.drawImage(videoEl, 0, 0);
    $("#my-photo-canvas").css("opacity", "1");
  });

  $("#my-photo-retake-button").click(() => {
    $("#my-photo-canvas").css("opacity", "0");

    $("#my-photo-take-button").css("display", "block");
    $("#my-photo-retake-button").css("display", "none");
    $("#my-photo-submit-button").css("display", "none");
  });

  $("#my-photo-submit-button").click(() => {
    const canvasEl = $("#my-photo-canvas")[0];

    const pImage = {
      data64: canvasEl.toDataURL('image/jpeg'),
      orientation: 'SQ'
    };

    $.post(`${window.location.origin}/image`, pImage, (data) => {
      $("#my-photo-canvas").css("opacity", "0");
      $("#my-photo-take-button").css("display", "block");
      $("#my-photo-retake-button").css("display", "none");
      $("#my-photo-submit-button").css("display", "none");
      $("#my-photo-container").click();
    });
  });
}
