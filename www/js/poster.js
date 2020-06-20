const colors = [
  '#ff2038',
  '#ffcd00',
  '#008000',
  '#007dc6',
  '#c80477'
];

let currentColor = colors[0];

function createColorButtons() {
  for(let i = 0; i < colors.length; i++) {
    const colorEl = document.createElement('div');
    colorEl.classList.add('poster-color-common');
    colorEl.style.backgroundColor = colors[i];

    colorEl.addEventListener('click', (event) => {
      currentColor = event.target.style.backgroundColor;
      renderTextP5();
    });
    $("#my-poster-colors-container").append(colorEl);
  }
}

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

function renderTextP5() {
  const padding = 10;
  const mMessage = $("#my-poster-input").val().toUpperCase();

  background(0,0,0);
  fill(currentColor);
  stroke(currentColor);

  textSize(128);
  textLeading(130);
  textAlign(CENTER, CENTER);
  text(mMessage, padding, padding, width - 2 * padding, height - 2 * padding);
}

$(() => {
  createColorButtons();

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
      renderTextP5();
    }
  });
});
