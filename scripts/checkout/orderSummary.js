import {cart, removeFromCart, getCartQuantity, updateDeliveryOption} from '../../data/cart.js';
import {getProduct } from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSumary(){


let cartSummaryHTML = '';

cart.forEach((cartItem)=>{

const productId = cartItem.productId;

const matchingProduct = getProduct(productId);

const deliveryOptionId = cartItem.deliveryOptionId;

const deliveryOption = getDeliveryOption(deliveryOptionId);

const today = dayjs();
const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
const dateString = deliveryDate.format('dddd, MMMM D');



cartSummaryHTML +=`
<!--Start Product-->
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          ${matchingProduct.getPrice()}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
            Update
          </span>
          <input class="quantity-input js-quantity-input-${matchingProduct.id}" type="number">
          <span class="save-quantity-link link-primary" data-product-id="${matchingProduct.id}">
          Save
          </span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>

        ${deliveryOptionsHTML(matchingProduct, cartItem)}

      </div>
    </div>
  </div>
</div>


<!--End-->
`;

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

});


function deliveryOptionsHTML(matchingProduct, cartItem){

let HTMLL = '';


deliveryOptions.forEach((deliveryOption)=>{
const today = dayjs();
const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
const dateString = deliveryDate.format('dddd, MMMM D');

const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`;
const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
HTMLL +=`
        <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id = "${deliveryOption.id}">
          <input type="radio" class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}"
            ${isChecked ? 'checked':''}
            >
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} - Shipping
            </div>
          </div>
        </div>`;


});
return HTMLL;
}

document.querySelectorAll('.js-delete-link').forEach((link) => {
link.addEventListener('click', () =>{
const productId = link.dataset.productId;
removeFromCart(productId);

const container = document.querySelector(`.js-cart-item-container-${productId}`);
container.remove();
renderOrderSumary();
renderPaymentSummary();
});
});

document.querySelectorAll('.js-update-link').forEach((link) =>{
link.addEventListener('click', ()=>{
const productId = link.dataset.productId;

const container = document.querySelector(`.js-cart-item-container-${productId}`);

container.classList.toggle('is-editing-quantity');

})
})

document.querySelectorAll('.save-quantity-link').forEach((link) =>{
link.addEventListener('click', ()=>{
const productId = link.dataset.productId;
const container = document.querySelector(`.js-cart-item-container-${productId}`);
container.classList.toggle('is-editing-quantity');
const newQuantity = document.querySelector(`.js-quantity-input-${productId}`).value;

cart.forEach((cartItem)=>{
if(cartItem.productId === productId){
  cartItem.quantity = Number(newQuantity);

}
});

document.querySelector('.return-to-home-link').textContent = getCartQuantity();  

renderOrderSumary();
renderPaymentSummary();
});
});

document.querySelector('.return-to-home-link').textContent = getCartQuantity();
document.querySelectorAll('.js-delivery-option').forEach((element)=>{
element.addEventListener('click', ()=>{

const {productId, deliveryOptionId} = element.dataset;
updateDeliveryOption(productId, deliveryOptionId);
renderOrderSumary();
renderPaymentSummary();
})
});
}
