// opening and closing the cart
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click" ,() => {
    cart.classList.add("active");
} );

closeCart.addEventListener("click",() =>{
    cart.classList.remove("active");
}  );


// start when the doc is ready
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", start);

}else{
    start();
}

// START PART

function start(){
    addEvents();
}

// UPDATE PART
function update(){
    addEvents();
    updateTotal();

}

// ADD EVENTS PART
function addEvents(){
// REMOVING ITEMS FROM CART
let cartRemove_btns = document.querySelectorAll(".cart-remove");
console.log(cartRemove_btns);
cartRemove_btns.forEach((btn) =>{
    btn.addEventListener("click", handle_removeCartItem);
}  );

// CHANGING ITEM QUANTITY
let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
cartQuantity_inputs.forEach(input => {
    input.addEventListener("change", handle_changeItemQuantity);

} );

// ADD item to cart
let addCart_btns = document.querySelectorAll(".add-cart");
addCart_btns.forEach(btn =>{
    btn.addEventListener("click",handle_addCartItem);
}  );


// BUY ORDER
const buy_btn = document.querySelector(".btn-buy");
buy_btn.addEventListener("click", handle_buyOrder);



}


// Handling Events Functions
let itemsAdded=[]


function handle_addCartItem(){
    let product = this.parentElement;
    let title= product.querySelector(".product-title").innerHTML;
    let price= product.querySelector(".product-price").innerHTML;
    let imgSrc= product.querySelector(".product-img").src;
    console.log(title,price,imgSrc);

    let newToAdd ={
        title,
        price,
        imgSrc,
    };

// handling the item that already exists
if(itemsAdded.find(el => el.title ==newToAdd.title)){
    alert("This Item is already in the cart");
    return;
    }else{
        itemsAdded.push(newToAdd);
    }


    // Adding the products to cart
    let cartBoxElement = CartBoxComponent(title,price, imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);
update();


}





function handle_removeCartItem(){
    this.parentElement.remove();

    itemsAdded = itemsAdded.filter(
        (el)=>
         el.title !=
          this.parentElement.querySelector(".cart-product-title").innerHTML );
    update();
}


function handle_changeItemQuantity(){
    if (isNaN(this.value) || this.value <1){
        this.value = 1;
    }
    this.value = Math.floor(this.value); 
    update();
}

function handle_buyOrder(){
    if (itemsAdded.length <= 0){
        alert("There is no order that has been  placed yet! \n Please add products to the cart ");
        return;
    }
    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML= "";
    alert("Your order has been placed successfully")
itemsAdded= [];

    update();
}




// UPDATE FUNCTIONS
function updateTotal(){
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(".total-price");
    let total = 0;
    cartBoxes.forEach((cartBox) =>{
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let quantity = cartBox.querySelector(".cart-quantity").value; 
        total += price * quantity;
    }  );


// Round to 2 digit
total = total.toFixed(2);




    totalElement.innerHTML = "$" + total;
}

// HTML COMPONENTS

function CartBoxComponent(title, price,imgSrc){
    return `
<div class="cart-box">
<img src="${imgSrc}" alt="" class="cart-img">
<div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity">
</div>
<!-- REMOVE CART -->
<i class='bx bxs-trash-alt cart-remove' ></i>
</div>`;
}






// testimonial slider


var swiper = new Swiper('.blog-slider', {
    spaceBetween: 30,
    effect: 'fade',
    loop: true,
    mousewheel: {
      invert: false,
    },
    // autoHeight: true,
    pagination: {
      el: '.blog-slider__pagination',
      clickable: true,
    }
  });



  //SLICK SLIDER
  $(document).ready(function(){
	$('.logo-area').slick({
  slidesToShow: 6,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1500,
  arrows: false,
  dots: false,
  pauseOnHover:false,
 responsive:[ { 
	 breakpoint: 768,
	 settings: { 
		 slidesToShow: 4
	 }
	}, { 
		breakpoint: 520,
		settings: { 
			slidesToShow: 3
		}
	}]


	});
})






// dark mode?
var icon= document.getElementById("icon");

icon.onclick = function(){
    document.body.classList.toggle("dark-theme");
    if(document.body.classList.contains("dark-theme")){
        icon.src ="sun2021.png";
} else{
    icon.src ="moon2021.png";
}
}
