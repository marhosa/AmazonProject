class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
        
        if(!this.cartItems){
        this.cartItems = [{
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

    saveToStorage(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId){
        let matchingItem;
        
        this.cartItems.forEach((cartItem)=>{
          if(productId === cartItem.productId){
            matchingItem = cartItem;
          }
        });
        
        if(matchingItem){
          matchingItem.quantity+=1;
        }
        else {
          this.cartItems.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1' 
          });
        }
        
        this.saveToStorage();
    }

    removeFromCart(productId){
        const newCart = [];
        
        this.cartItems.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
          newCart.push(cartItem)
        }
        });
        
        this.cartItems = newCart;
        
        document.querySelector('.return-to-home-link').textContent = getCartQuantity();
        this.saveToStorage();
    }


    getCartQuantity(){
        saveToStorage();
        let totalQuantity = 0;
        this.cartItems.forEach((cartItem) =>{
        totalQuantity += cartItem.quantity;
        })
        return totalQuantity;
    }


    updateDeliveryOption(productId, deliveryOptionId){
        let matchingItem;
        this.cartItems.forEach((cartItem)=>{
          if(productId === cartItem.productId){
            matchingItem = cartItem;
          }
        });
        
        matchingItem.deliveryOptionId = deliveryOptionId;
        
        this.saveToStorage();
        
    }

}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);