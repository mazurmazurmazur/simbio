function getAllProducts() {
  fetch(
    "http://mazurmazurmazur.pl/simbiocms/?rest_route=/wp/v2/product&per_page=100"
  )
    .then(res => res.json())
    .then(showProducts);
}

function showProducts(data) {
  console.log(data);
  let list = document.querySelector(".restWrapper");
  let template = document.querySelector(".productTemplate").content;
  let clone = template.cloneNode(true);

  data.forEach(function(theProduct) {
    let clone = template.cloneNode(true);

    console.log(clone);
    let image = clone.querySelector(".image");
    let priceTag = clone.querySelector(".priceUnderTitle span");
    let titleTag = clone.querySelector(".productName");
    let detailsButton = clone.querySelector(".detailButton");
    let linkImage = clone.querySelector(".shopLinkMobile");

    let photo = theProduct.acf.img1color1.sizes.medium_large;
    let price = theProduct.acf.price;
    let title = theProduct.title.rendered;
    let dataId = theProduct.id;

    //   //Products.push(colours);
    image.setAttribute("src", photo);
    detailsButton.setAttribute("href", "product.html?id=" + dataId);
    linkImage.setAttribute("href", "product.html?id=" + dataId);
    priceTag.innerHTML = price;
    titleTag.innerHTML = title;

    list.appendChild(clone);
  });
}

getAllProducts();
