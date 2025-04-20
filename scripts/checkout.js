import {renderOrderSumary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
import { loadCart } from '../data/cart.js';

// import '../data/backend-practice.js';
//practice only// import '../data/cart-class.js';


Promise.all([
    new Promise((resolve)=>{
        loadProducts(() =>{
             resolve('value1');
        });
    }),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    })
]).then((values)=>{
    console.log(values);
    renderOrderSumary();
    renderPaymentSummary();
});


/*
new Promise((resolve)=>{
    loadProducts(() =>{
         resolve();
    });
    
}).then(()=>{
    return new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    });

}).then(()=>{
    return new Promise((resolve)=>{
        renderOrderSumary();
        renderPaymentSummary();
    });
});
*/


/*
loadProducts(()=>{
    loadCart(()=>{
        renderOrderSumary();
        renderPaymentSummary();
    });
});

*/