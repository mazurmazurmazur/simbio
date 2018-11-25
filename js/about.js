



$(document).ready(function() {              //////function randomizing positions of pictures in about page
    let imagesDiv = document.getElementById("imagesAbout")
    let bodyWidth = document.body.offsetWidth;
    let divWidth = imagesDiv.offsetWidth;
    let divHeight = imagesDiv.offsetHeight;
    // let divFromTop = imagesDiv.offsetTop;
    // let divFromLeft = imagesDiv.offsetLeft;

  
    $('.random').each(function(idx, img) {
      let randPosX = Math.floor(Math.random() * divWidth);
      let randPosY = Math.floor(Math.random() * divHeight);
      $(img).css('left', randPosX);
      $(img).css('top', randPosY);
  
    });
  });