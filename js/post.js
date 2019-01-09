// Parse the URL parameter
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
// Give the parameter a variable name
var dynamicContent = getParameterByName("id"); //getParameterByName is a function that fetches the id from URL
//the id in URL comes from dynamically set "href" in blog.html through blog.js
//the id set in this URL comes from fetched json file in blog.js
function getAllProducts() {
  fetch(
    "http://mazurmazurmazur.pl/simbiocms/?rest_route=/wp/v2/article/" +
      dynamicContent
  ) //only one entry in json file (WP REST)
    .then(res => res.json())
    .then(showProducts);
}
function showProducts(json) {
  console.log(json.acf.image1); //shows json file in console, makes development much easier
  let acf = json.acf;

  let titleTag = document.querySelector(".postTitle"); //selecting DOM elements
  let image = document.querySelector(".mainImage");
  let thumbGallery = document.querySelector(".gallery__thumbs");
  let thumbsArr = [];
  for (let i = 0; i < thumbGallery.children.length; i++) {
    let imageThumb = thumbGallery.children[i].children[0];
    console.log(imageThumb);
    let imageFetchHelper = i + 1;
    let thumbJson = eval(
      "json.acf.image" + imageFetchHelper + ".sizes.medium_large"
    );
    imageThumb.setAttribute("src", thumbJson);
  }
  //"."+sizes.medium_large
  console.log(thumbsArr);

  function fetchImageFromJson(number) {
    // json.acf.image+number+.sizes.medium_large;
  }

  console.log(fetchImageFromJson(2));

  let photo = json.acf.image1.sizes.medium_large; ///selecting JSON elements
  let title = json.title.rendered;
  // //  let dataId = json.id;

  image.setAttribute("src", photo); ///filling HTML with JSON data
  titleTag.innerHTML = title;

  //    for( key in acf){            ////this loop checks how many images are assigned to the product
  //                                 ////based on that it produces clickable dots that display all
  //                                 //// of the above mentioned images
  //     if(key.startsWith("image")){
  //         let newDiv = document.createElement("div");
  //         let currentImage = acf[key].sizes.medium_large;
  //         newDiv.id=key;
  //         newDiv.className="dot";
  //     }

  // }
}

getAllProducts();

$(document).ready(function() {
  let galleryMainImage = document.getElementById("mainImage");
  let galleryThumb = document.querySelector(".gallery__thumbs a");
  let galleryThumbs = document.querySelector(".gallery__thumbs");
  let galleryThumbsLength = galleryThumbs.children.length;

  $(".gallery__thumbs a").on("click", function() {
    let imageClicked = $(this)
      .find("img")
      .attr("src");
    console.log(imageClicked);
    galleryMainImage.setAttribute("src", imageClicked);
    for (let i = 0; i < galleryThumbsLength; i++) {
      galleryThumbs.children[i].classList.remove("is-active");
    }
    $(this).attr("class", "is-active");
  });
});
