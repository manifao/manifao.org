$(() => {
  $("#add-image-button").click(() => {
    $("#my-image-input").click();
  });

  $("#my-lightbox-image").click((event) => {
    event.stopPropagation();
  });

  $("#my-lightbox-container").click(() => {
    $("#my-lightbox-container").css("display", "none");
  });

  $("#my-image-input").change((event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (readerEvent) {
      const image = new Image();
      image.onload = function (imageEvent) {
        const mCanvas = document.createElement('canvas');
        const MAX_DIM = 900;
        let iWidth = image.width;
        let iHeight = image.height;

        if ((iWidth > iHeight) && (iWidth > MAX_DIM)) {
          iHeight *= MAX_DIM / iWidth;
          iWidth = MAX_DIM;
        } else if (iHeight > MAX_DIM) {
          iWidth *= MAX_DIM / iHeight;
          iHeight = MAX_DIM;
        }
        mCanvas.width = iWidth;
        mCanvas.height = iHeight;
        mCanvas.getContext('2d').drawImage(image, 0, 0, iWidth, iHeight);

        const pImage = {
          data64: mCanvas.toDataURL('image/jpeg'),
          // orientation: (iWidth === iHeight) ? 'SQ' : ((iWidth > iHeight) ? 'H' : 'V')
          orientation: 'SQ'
        };

        $.post(`${window.location.origin}/image`, pImage, (data) => console.log(data));
        if (event.target) event.target.value = '';
      }
      image.src = readerEvent.target.result;
    }
    reader.readAsDataURL(file);
  });
});

socket.on('image', addImage);

function addImage(image) {
  const mStyle = `background-image: url(${image.data64});`;

  const imgEl = document.createElement('div');
  imgEl.classList.add('image-common');
  imgEl.classList.add(`image-${image.orientation}`);
  imgEl.setAttribute('style', mStyle);

  imgEl.addEventListener('click', (event) => {
    openLightbox(event.target.style.backgroundImage);
  });

  $("#my-image-wall").append(imgEl);
  $("#my-image-wall-overflow").scrollTop($("#my-image-wall").prop("scrollHeight"));
}

function openLightbox(img) {
  $("#my-lightbox-image").css('backgroundImage', img);
  $("#my-lightbox-container").css("display", "block");
}
