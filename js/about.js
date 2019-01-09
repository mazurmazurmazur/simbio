function fetchAbout() {
  fetch(
    "http://mazurmazurmazur.pl/simbiocms/?rest_route=/wp/v2/aboutsection/200"
  ) //only one entry in json file (WP REST)
    .then(res => res.json())
    .then(showAbout);
}
function showAbout(json) {
  console.log(json); //shows json file in console, makes development much easier
  let acf = json.acf;

  let imageDesktop = document.getElementById("aboutImageDesktop"); //selecting DOM elements
  let imageMobile = document.getElementById("aboutImageMobile");
  let aboutText = document.getElementById("textAbout");

  let jsonText = acf.abouttext;
  let image = acf.image.sizes.medium_large;

  imageDesktop.setAttribute("src", image);
  imageMobile.setAttribute("src", image);
  aboutText.innerHTML = jsonText;
}

fetchAbout();
