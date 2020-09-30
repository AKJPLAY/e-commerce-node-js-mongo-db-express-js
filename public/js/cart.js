const axios = require('axios');
function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id) {
        let storedItem = this.items[id];
        if(!storedItem) {
            storedItem = this.items[id] = { price: item.price, qty: 0, totalPrice: 0, imageCover: item.imageCover, name: item.name, id: item.id};
        };
        storedItem.qty++;
        storedItem.totalPrice = storedItem.price * storedItem.qty;
        let totalQtys = 0;
        let totalPrices = 0;
        for(let id in this.items) {
            totalQtys += this.items[id].qty;
            totalPrices += this.items[id].totalPrice;
        }
        this.totalQty = totalQtys ? totalQtys : 0;
        this.totalPrice = totalPrices ? totalPrices : 0;
    };

    this.getArry = function(){
        let arr = [];
        for(let id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };

    this.updateQty = function(pid,pqty){
        this.items[pid].qty = pqty;
        this.items[pid].totalPrice = this.items[pid].price * pqty;
        let qty = this.items[pid].qty;
        let productTotalPrice = this.items[pid].totalPrice;
        let price = this.items[pid].price;
        let totalQtys = 0;
        let totalPrices = 0;
        for(let id in this.items) {
            totalQtys += this.items[id].qty;
            totalPrices += this.items[id].totalPrice;
        }
        this.totalQty = totalQtys ? totalQtys : 0;
        this.totalPrice = totalPrices ? totalPrices : 0;
        totalPrice = this.totalPrice;
        totalQty = this.totalQty;

        return {pid,  qty ,price, productTotalPrice, totalQty , totalPrice};
    };

    this.popItem = function(pid){
        delete this.items[pid];
        let totalQtys = 0;
        let totalPrices = 0;
        for(let id in this.items) {
            totalQtys += this.items[id].qty;
            totalPrices += this.items[id].totalPrice;
        }
        this.totalQty = totalQtys ? totalQtys : 0;
        this.totalPrice = totalPrices ? totalPrices : 0;
        totalPrice = this.totalPrice;
        totalQty = this.totalQty;
        return { pid , totalPrice, totalQty};
    }


    this.resetAll = function() {
        this.items = {};
        this.totalPrice = 0;
        this.totalQty = 0;
    };
};




// Get Cart From Server
let data = $.parseJSON($.ajax({
    type: 'get',
    url:  `/api/v1/sendSession`,
    dataType: "json", 
    async: false
  }).responseText);
  console.log(data);


  // Assion Cart to Window Object
if(data) {
    if(data.session.hasOwnProperty('cart')){
        window.Cart = new Cart(data.session.cart);
    }
}


function CartSendToServer() {
//Cart Send to server from Client
    const res =  axios({
        method: 'PATCH',
        url:  '/api/v1/updateSession',
        data: {
            cart:{
                items: window.Cart.items,
                totalPrice: window.Cart.totalPrice,
                totalQty: window.Cart.totalQty
            }
        }
    });
}


function updateCartProduct(product) {
    let html = '';
    $.each(product, function(key, value) {
        html += `<tr id="cartPContainer${product[key].id}">
                    <td class="si-pic" style="width: 30%;">
                        <img src="img/products/${product[key].imageCover}" alt="" style="max-width: 50%;">
                    </td>
                    <td class="si-text">
                        <div class="product-selected">
                            <p id="DrawerCartQtyPrice${product[key].id}">
                                $${parseFloat(product[key].price).toFixed(2)} x ${product[key].qty}
                            </p>
                            <h6 style="font-size: 10px;">
                                ${product[key].name}
                            </h6>
                        </div>
                    </td>
                    <td class="si-close" prodid="${product[key].id}">
                        <i class="ti-close" id="cartPClose${product[key].id}"></i>
                    </td>
                </tr>`;
    });
    if(window.Cart.totalQty === 0) {
        $('.cart-hover').html(`
            <div class="select-button">
                <a class="primary-btn view-card" href="/shop">YOUR CART IS EMPTY</a>
                <a class="primary-btn checkout-btn" href="/shop">SHOP NOW</a>
            </div>
        `);
    }else {
        $('.cart-hover').html(`
            <div class="select-items">
                <table>
                    <tbody id="cartTableBody">
                        ${html}
                    </tbody>
                </table>
            </div>
            <div class="select-total">
                <span>total:</span>
                <h5 id="InsideCartPrice">${parseFloat(window.Cart.totalPrice).toFixed(2)}</h5>
            </div>
            <div class="select-button">
                <a class="primary-btn view-card" href="/cart">VIEW CARD</a>
                <a class="primary-btn checkout-btn" href="/checkout">CHECK OUT</a>
            </div>
        `);
    }
    
    
    //Car Page 
    $(`#GrandTotal`).text(`$${parseFloat(window.Cart.totalPrice).toFixed(2)}`)
    //Cart Drawer
    $('#InsideCartPrice').text(`$${parseFloat(window.Cart.totalPrice).toFixed(2)}`);
    $('#CartPrice').text(`$${parseFloat(window.Cart.totalPrice).toFixed(2)}`);
    $('#CartQty').text(`${window.Cart.totalQty}`);

    deleteCart(product)

}


function deleteCart(product) {
    setTimeout(function(){
        $.each(product, function(key, value) {
            //Deleting product
            function textInit(ids){
                let prodContainer = $(`#prodContainer${ids}`); 
                let cartPContainer = $(`#cartPContainer${ids}`); 
                $(`#closeProd${ids}`).click( el => {
                    prodContainer.hide();
                    cartPContainer.hide();
                    removeFromCart(ids);
                })
                $(`#cartPClose${ids}`).click( el => {
                    prodContainer.hide();
                    cartPContainer.hide();
                    removeFromCart(ids);
                })
            }
    
            let productId = $(`#closeProd${product[key].id}`).parent().attr('prodID'); 
            let cartProductId = $(`#cartPClose${product[key].id}`).parent().attr('prodID'); 
            if(productId){
                textInit(productId);
            }else {
                textInit(cartProductId);
            }
    });
    }, 500) 
    
}



//Add Data to cart

function addTocart(id) {
    console.log('sdfhshd'); 
    //Get id
    // Create Cart Send to Server
    let cart = new Cart(window.Cart ? window.Cart : {});
    //get Product By id
    let product = {};
    for(let i = 0; i < window.Products.data.data.length; i++) {
        if(window.Products.data.data[i].id === id) {
            product = window.Products.data.data[i];
        }
    }
    cart.add(product, product.id);
    window.Cart = cart;
    //Update Cart Product
    updateCartProduct(window.Cart.items);

    //Send Data to server
    CartSendToServer();
  };

  function removeFromCart(id) {
    const details = window.Cart.popItem(id);
    let product = {};
    for(let i = 0; i < window.Cart.items.length; i++) {
        if(window.Cart.items[i].id === id) {
            product = window.Cart.items[i];
        }
    }
    //Update Cart Product
    updateCartProduct(window.Cart.items);

    //Send Data to server
    CartSendToServer();

    return details;
  };
  
  
//Update Site value
function UpdateCart(id, newQty) {
    if(window.Cart) {
        const cartDetails = window.Cart.updateQty(id, newQty);
        console.log(cartDetails);
        //Car Page 
        $(`#totalPrice${cartDetails.pid}`).text(`$${parseFloat(cartDetails.productTotalPrice).toFixed(2)}`);
        $(`#GrandTotal`).text(`$${parseFloat(cartDetails.totalPrice).toFixed(2)}`)
        //Cart Drawer
        $(`#DrawerCartQtyPrice${cartDetails.pid}`).text(`$${parseFloat(cartDetails.price).toFixed(2)} x ${cartDetails.qty}`);
        $('#InsideCartPrice').text(`$${parseFloat(cartDetails.totalPrice).toFixed(2)}`);
        $('#CartPrice').text(`$${parseFloat(cartDetails.totalPrice).toFixed(2)}`);
        $('#CartQty').text(`${cartDetails.totalQty}`);
    }
}

//Add to Cart
function addToCartBtn(){
    $(document).ready(function(){
        if(window.Products){
            for(let i = 0; i < window.Products.data.data.length; i++) {
                $(`#addToCart${window.Products.data.data[i].id}`).unbind();
                $(`#addToCart${window.Products.data.data[i].id}`).click(function() {
                    //console.log('hii.');
                    addTocart($(`#addToCart${window.Products.data.data[i].id}`).parent('ul').attr('prodID'));
                })
            }
        }
    });
}


addToCartBtn();

jQuery('.product-list').bind('DOMSubtreeModified',function(event) {
    addToCartBtn();
});



if(window.Cart){
    if(window.Cart.items) {
        for(product in window.Cart.items) {
            /*-------------------
                Quantity change
            --------------------- */
            var proQty = $(`#qty${window.Cart.items[product].id}`);
            proQty.prepend(`<span class="dec dec${window.Cart.items[product].id} qtybtn">-</span>`);
            proQty.append(`<span class="inc inc${window.Cart.items[product].id} qtybtn">+</span>`);
            proQty.on('click', '.qtybtn', function () {
                var $button = $(this);
                var oldValue = $button.parent().find('input').val();
                var prodId = $button.parent().find('input').attr('prodId');
                if ($button.hasClass('inc')) {
                    var newVal = parseFloat(oldValue) + 1;
                } else {
                    // Don't allow decrementing below zero
                    if (oldValue > 0) {
                        var newVal = parseFloat(oldValue) - 1;
                    } else {
                        newVal = 0;
                    }
                }
                $button.parent().find('input').val(newVal);
                //Update Cart Details
                UpdateCart(prodId, newVal);
                //Send Cart to Server
                CartSendToServer();
                
            });
        
        }
    }
    
}
 

// Delete products
if(data) {
    if(data.session.hasOwnProperty('cart')){
        window.Cart = new Cart(data.session.cart);
        if(window.Cart.items) {
            for(product in window.Cart.items) {

                //Deleting product
                function textInit(ids){
                    let prodContainer = $(`#prodContainer${ids}`); 
                    let cartPContainer = $(`#cartPContainer${ids}`); 
                    $(`#closeProd${ids}`).click( el => {
                        prodContainer.hide();
                        cartPContainer.hide();
                        removeFromCart(ids);
                    })
                    $(`#cartPClose${ids}`).click( el => {
                        prodContainer.hide();
                        cartPContainer.hide();
                        removeFromCart(ids);
                    })
                }

                let productId = $(`#closeProd${product}`).parent().attr('prodID'); 
                let cartProductId = $(`#cartPClose${product}`).parent().attr('prodID'); 
                if(productId){
                    textInit(productId);
                }else {
                    textInit(cartProductId);
                }   
                    
            }
        }
    }
}
