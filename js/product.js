$(document).ready(function() {


let addButton = document.getElementById("addProduct-btn");
let productName = document.querySelector(".productID").innerHTML;
let cartState = document.querySelector(".totalInCart");




addButton.addEventListener("click", function(event){
event.preventDefault();
console.log("clicked");

    if (localStorage[productName]){      //increasing amount of selected product in cart
        localStorage[productName] = Number(localStorage[productName]) + 1;
        }
        else{
            localStorage[productName] = "1";
        }
updateCart(cartState);  ///dynamic cart update after click, calls global function in home.js

        
      
        
    
})







});

