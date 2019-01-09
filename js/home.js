$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name]) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || "");
    } else {
      o[this.name] = this.value || "";
    }
  });
  return o;
};

////////////////////////ABOVE CODE THAT I DONT UNDERSTAND, NECESSARY FOR THE SUBSCRIPTION SYSTEM TO WORK

function updateCart(cart) {
  //function called to update amount of all items in cart

  if (localStorage.length > 0) {
    let sum = 0;
    for (let i = 0, leng = localStorage.length - 1; i < leng; i++) {
      let key = localStorage.key(i);
      let val = localStorage.getItem(key);
      let valAll = val.split("*");
      sum += parseInt(valAll[0]);
      if (isNaN(sum)) {
        cart.innerHTML = "0";
      } else {
        cart.innerHTML = sum;
      }
    }
  }
}

$(document).ready(function() {
  document.getElementById("shoppingCart").href = "cart.html";

  jQuery.fn.carousel.Constructor.TRANSITION_DURATION = 2000; // 2 seconds is how long the slide switch takes in carousel

  ///////VALIDATION IF EMAIL ADDRESS IS CORRECT PLUS INFO TO USER
  function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function validate() {
    let $result = $("#result");
    let email = $("#email").val();
    let form = $("form#newsletter-form");
    $result.text("");

    if (validateEmail(email)) {
      sendToSheet();
      $result.text("Thank you for subscribing!");
      form
        .closest("form")
        .find("input[type=email], textarea")
        .val("");
    } else {
      $result.text(email + " is not valid email.");
    }
    return false;
  }

  $("#subscribeButton").bind("click", validate);

  ///////END VALIDATION IF EMAIL ADDRESS IS CORRECT PLUS INFO TO USER

  ////SEND NEWSLETTER DATA TO GOOGLE SPREADSHEET FUNCTION BELOW

  let $form = $("form#newsletter-form"),
    url =
      "https://script.google.com/macros/s/AKfycbzV2oQPNSKIpLlVhKxxY5LeKk6LfzDJWh8w4J3CyCdQ6k-SVDFb/exec";

  function sendToSheet() {
    let jqxhr = $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      data: $form.serializeObject()
    });
  }

  ////END OF NEWSLETTER DATA

  let cartState = document.querySelector(".totalInCart");

  updateCart(cartState); //global cart update
});


function fetchCarouselImages() {
  fetch(
    "http://mazurmazurmazur.pl/simbiocms/?rest_route=/wp/v2/homepage/207"
  ) //only one entry in json file (WP REST)
    .then(res => res.json())
    .then(showCarouselImages);
}
function showCarouselImages(json) {
  console.log(json); //shows json file in console, makes development much easier
  let acf = json.acf;

  let image1 = document.getElementById("slide1"); //selecting DOM elements
  let image2 = document.getElementById("slide2");
  let image3 = document.getElementById("slide3");

  
  let image1json = acf.image1.sizes.medium_large;//fetching images from JSON
  let image2json = acf.image2.sizes.medium_large;
  let image3json = acf.image3.sizes.medium_large;

  image1.setAttribute("src", image1json);
  image2.setAttribute("src", image2json);
  image3.setAttribute("src", image3json);
}

fetchCarouselImages();