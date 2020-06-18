function resizeVideo() {
  const container = {
    width: $("#my-video-container").width(),
    height: $("#my-video-container").height()
  };

  const vid169 = {
    width: container.width,
    height: 9.0 * container.width / 16.0
  };
  const scale = container.height / vid169.height;

  const live = {
    width: scale * $("#my-live").width(),
    height: scale * $("#my-live").height()
  };

  $("#my-live").css('width', `${live.width}px`);
  $("#my-live").css('height', `${live.height}px`);

  $("#my-live").css('margin-left', `${-0.5 * (live.width - container.width)}px`);
  $("#my-live").css('margin-top', `${-0.5 * (live.height - container.height)}px`);
}

$( window ).on( "load", resizeVideo );
