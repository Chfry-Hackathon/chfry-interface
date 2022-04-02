export function loadImg(imgList) {
  function loadHandler() {
    this.removeEventListener("load", loadHandler);
    if (this.num === imgList.length) console.log("Load complete!");
  }
  imgList.map(function (imgSrc, index) {
    var img = new Image();
    img.num = index + 1;
    console.log(img.num);
    img.addEventListener("load", loadHandler);
    img.src = imgSrc;
  });
}
