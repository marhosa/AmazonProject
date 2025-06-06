export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
cart = [{
productId: "4e37dd03-3b23-4bc6-9ff8-44e112a92c64",
quantity: 1,
deliveryOptionId: '1'
},
{
productId: "d339adf3-e004-4c20-a120-40e8874c66cb",
quantity: 4,
deliveryOptionId: '3'
}
]}
}



export function saveToStorage(){
localStorage.setItem('cart', JSON.stringify(cart));
}

export function getCartQuantity(){
saveToStorage();
let totalQuantity = 0;
cart.forEach((cartItem) =>{
totalQuantity += cartItem.quantity;
})
return totalQuantity;
}


export function addToCart(productId){
let matchingItem;

cart.forEach((cartItem)=>{
  if(productId === cartItem.productId){
    matchingItem = cartItem;
  }
});

if(matchingItem){
  matchingItem.quantity+=1;
}
else {
  cart.push({
    productId: productId,
    quantity: 1,
    deliveryOptionId: '1' 
  });
}

saveToStorage();
}


export function removeFromCart(productId){
const newCart = [];

cart.forEach((cartItem)=>{
if(cartItem.productId !== productId){
  newCart.push(cartItem)
}
});

cart = newCart;

document.querySelector('.return-to-home-link').textContent = getCartQuantity();
saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId){
let matchingItem;
cart.forEach((cartItem)=>{
  if(productId === cartItem.productId){
    matchingItem = cartItem;
  }
});

matchingItem.deliveryOptionId = deliveryOptionId;

saveToStorage();

}



export function loadCart(fun){
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  });
  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}