function setup() {
  const cnv = createCanvas(0, 0);
  cnv.id('my-p5-canvas');
  cnv.parent('my-poster-elements-container');
}

function resetP5() {
  $("#my-poster-canvas").height($("#my-poster-canvas").width());
  resizeCanvas($("#my-poster-canvas").width(), $("#my-poster-canvas").height());
  pixelDensity(1);
  smooth();
  background(0,0,0);
}

function renderTextP5(txt) {
  const padding = 10;
  background(0,0,0);
  fill(255,255,255);
  stroke(255,255,255);
  textSize(80);
  textAlign(CENTER, CENTER);
  text(txt, padding, padding, width - 2 * padding, height - 2 * padding);
}

$(() => {
  $("#add-poster-button").click(() => {
    $("#my-poster-container").css("display", "block");
    resetP5();
  });

  $("#my-poster-elements-container").click((event) => {
    event.stopPropagation();
  });

  $("#my-poster-container").click(() => {
    resetP5();
    $("#my-poster-container").css("display", "none");
  });

  $("#my-poster-button").click(()=> {
    const mMessage = $("#my-poster-input").val();
    const canvasEl = $("#my-p5-canvas")[0];

    if(mMessage !== '') {
      const pImage = {
        data64: canvasEl.toDataURL('image/jpeg'),
        orientation: 'SQ'
      };

      $.post(`${window.location.origin}/image`, pImage, (data) => {
        resetP5();
        $("#my-poster-input").val('');
        $("#my-poster-container").click();
      });
    }
  });

  $("#my-poster-input").keyup((event) => {
    if(event.which == 13) {
      $("#my-poster-button").click();
    } else {
      const mMessage = $("#my-poster-input").val();
      renderTextP5(mMessage.toUpperCase());
    }
  });
});
