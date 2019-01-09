function getAllProducts() {
  fetch(
    "http://mazurmazurmazur.pl/simbiocms/?rest_route=/wp/v2/article&per_page=100"
  )
    .then(res => res.json())
    .then(showProducts);
}

function showProducts(data) {
  console.log(data);
  let list = document.querySelector(".middleNoFooter");
  let template = document.querySelector(".productTemplate").content;
  let clone = template.cloneNode(true);

  data.forEach(function(theProduct) {
    let clone = template.cloneNode(true);

    console.log(clone);
    let image = clone.querySelector(".image");
    let titleTag = clone.querySelector(".blogPostCaption");
    let linkImage = clone.querySelector(".articleLink");

    let photo = theProduct.acf.image1.sizes.medium_large;
    // let price = theProduct.acf.price;
    let title = theProduct.title.rendered;
    let dataId = theProduct.id;

    //     //   //Products.push(colours);
    image.setAttribute("src", photo);
    //        detailsButton.setAttribute("href", "product.html?id="+ dataId);
    linkImage.setAttribute("href", "post.html?id=" + dataId);
    //    priceTag.innerHTML = price;
    titleTag.innerHTML = title;

    list.appendChild(clone);
  });
}

getAllProducts();
