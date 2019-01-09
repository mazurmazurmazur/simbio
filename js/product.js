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
var dynamicContent = getParameterByName("id");
//getParameterByName is a function that fetches the id from URL
//the id in URL comes from dynamically set "href" in blog.html through blog.js
//the id set in this URL comes from fetched json file in blog.js

function getAllProducts() {
  fetch(
    "http://mazurmazurmazur.pl/simbiocms/?rest_route=/wp/v2/product/" +
      dynamicContent
  )
    //only one entry in json file (WP REST)

    .then(res => res.json())
    .then(showProducts) //filling DOM with json data
    .then(afterFetch);
}

function showProducts(json) {
  // console.log(json.acf);       //shows json file in console, makes development much easier
  let acf = json.acf;

  let colorPicker = document.querySelector(".select-color");
  let counter = 0;

  for (key in acf) {
    ///looping through all keys in this product(acf= advanced custom fields)
    if (key.startsWith("color")) {
      ////filling the available colors from CMS
      let newDiv = document.createElement("div");
      newDiv.id = key;
      newDiv.className = "color";
      newDiv.style.background = acf[key];
      colorPicker.appendChild(newDiv);
      counter++;
    }
  }
  let image = document.querySelector(".product-image .bg");
  let priceTag = document.querySelector(".price span"); //selecting DOM elements
  let titleTag = document.querySelector(".productName");

  let photo = json.acf.img1color1.sizes.medium_large;
  let price = json.acf.price; //selecting JSON elements
  let title = json.title.rendered;

  image.style.backgroundImage = "url(" + photo + ")";
  priceTag.innerHTML = price; ///populating HTML with JSON content
  titleTag.innerHTML = title;

  /////color selector
  $(".color").on("click", function() {
    $(".color").css("border", "1px solid gray");
    $(this).css("border", "2px solid black");
    checkColor($(this).attr("id"));
  });

  function setMainImage(url) {
    image.style.opacity = 0;
    image.style.backgroundImage = "url(" + url + ")";
    image.style.opacity = 1;
  }

  function checkColor(colorName) {
    let indicator = document.querySelector(".indicator");
    indicator.innerHTML = "";
    for (key in acf) {
      if (
        key.startsWith("img") &&
        key.endsWith(colorName) &&
        acf[key] != false
      ) {
        let newDiv = document.createElement("div");
        let currentImage = acf[key].sizes.medium_large;
        newDiv.id = key;
        newDiv.className = "dot";

        newDiv.addEventListener("click", function() {
          setMainImage(currentImage);
        });
        indicator.appendChild(newDiv);
        if (key.startsWith("img1")) {
          setMainImage(acf[key].sizes.medium_large);
        }
      }
    }
  }

  checkColor("color1");
}

getAllProducts();

function afterFetch(json) {
  let addButton = document.getElementById("addProduct-btn");
  let productName = "id" + dynamicContent; //id from url
  let cartState = document.querySelector(".totalInCart");

  addButton.addEventListener("click", function(event) {
    event.preventDefault();

    let e = document.querySelector(".selectQuantity");
    let strUser = e.options[e.selectedIndex].text; ///amount selected in option
    if (localStorage[productName]) {
      //increasing amount of selected product in cart
      localStorage[productName] =
        Number(localStorage[productName]) + Number(strUser); //increasing by amount selected in select-dropdown
    } else {
      localStorage[productName] = strUser;
    }
    updateCart(cartState); ///dynamic cart update after click, calls global function in home.js
  });
}
