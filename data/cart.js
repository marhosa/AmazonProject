export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [{
    productId: "4e37dd03-3b23-4bc6-9ff8-44e112a92c64",
    quantity: 1
  },
  {
    productId: "d339adf3-e004-4c20-a120-40e8874c66cb",
    quantity: 4
  }
]}

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
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
        quantity: 1
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

  saveToStorage();
}