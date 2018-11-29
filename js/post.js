$(document).ready(function(){
    let galleryMainImage = document.getElementById("mainImage");
    let galleryThumb = document.querySelector(".gallery__thumbs a");
    let galleryThumbs = document.querySelector(".gallery__thumbs");
    let galleryThumbsLength = galleryThumbs.children.length;


$(".gallery__thumbs a").on("click", function(){
    let imageClicked = $(this).find("img").attr("src");
    console.log(imageClicked);
   galleryMainImage.setAttribute("src", imageClicked);
   for(let i = 0; i<galleryThumbsLength; i++){
        galleryThumbs.children[i].classList.remove("is-active");
   }
   $(this).attr("class", "is-active");
}
)








});

