import {cart, getCartQuantity} from '../../data/cart.js';
import {getProduct } from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import formatCurrency from '../utils/money.js';

export function renderPaymentSummary(){

    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach((cartItem)=>{

        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;


    });

    //final variables
    const productPriceCentsFinal = productPriceCents;
    const shippingPriceCentsFinal = shippingPriceCents;
    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    //some variables
    const cartTotalQuantityCount = getCartQuantity();


    const paymentSummaryHTML = 
    `
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartTotalQuantityCount}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCentsFinal)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCentsFinal)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

    
}