$(() => {
  $("#add-image-button").click(() => {
    $("#my-image-input").click();
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
          orientation: (iWidth === iHeight) ? 'SQ' : ((iWidth > iHeight) ? 'H' : 'V')
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
  const mStyle = `style="background-image: url(${image.data64});"`;
  $("#my-image-wall").append(`<div ${mStyle} class="image-common image-${image.orientation}"></div>`);
}
