import { renderOrderSumary } from "../../scripts/checkout/orderSummary.js";
import {loadFromStorage } from "../../data/cart.js";

describe('test suite: renderOrderSummary', ()=> {
    it('displays the cart', ()=>{

        spyOn(localStorage,'getItem').and.callFake(()=>{
                    return JSON.stringify([{
                            productId: "4e37dd03-3b23-4bc6-9ff8-44e112a92c64",
                            quantity: 1,
                            deliveryOptionId: '1'
                            },
                            {
                            productId: "d339adf3-e004-4c20-a120-40e8874c66cb",
                            quantity: 4,
                            deliveryOptionId: '3'
                        }]);
                });
        loadFromStorage();

        renderOrderSumary();

        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2);


    });
});