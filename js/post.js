

// Parse the URL parameter
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
// Give the parameter a variable name
var dynamicContent = getParameterByName('id');



function getAllProducts() {


    fetch("http://mazurmazurmazur.pl/simbiocms/?rest_route=/wp/v2/article/"+dynamicContent)
      .then(res => res.json())
      .then(showProducts)
      
      
  }


  function showProducts(json) {
    console.log(json.acf);
    let acf=json.acf;

     let titleTag = document.querySelector(".postTitle");
     let image = document.querySelector(".mainImage");

    
      let photo = json.acf.image1.sizes.medium_large;
     let title = json.title.rendered;
    // //  let dataId = json.id;

  
    image.setAttribute("src", photo);
           titleTag.innerHTML = title;


           for( key in acf){
            if(key.startsWith("image")){
                let newDiv = document.createElement("div");
                let currentImage = acf[key].sizes.medium_large;
                newDiv.id=key;
                newDiv.className="dot";
            }
        
        
        
        
        }

}

    getAllProducts();






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

