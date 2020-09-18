const axios = require('axios');
import { sortingProduct } from './shop';
const wishListConatiner = $('.product-wishlist');

//init Add/Remove WishList
$(document).ready(function(){
    if(window.Products){
        for(let i = 1; i <= window.Products.data.data.length; i++) {
            if(window.WishList){
                for(let r = 0; r < window.WishList.items.length; r++) {
                    if(window.Products.data.data[i].id === window.WishList.items[r].id) {
                        window['ADD' + i] = 0;                 
                    }
                }
            }else {
                window['ADD' + i] = 1;                 
            }
        }
    }
});


function WishList(oldWishList) {
    this.items = oldWishList.items || {};
    this.totalQty = oldWishList.totalQty || 0;

    this.add = function(product, id) {
        let storedItem = this.items[id]; 
        if(!storedItem) {
            storedItem = this.items[id] = { 
                id: id,
                name: product.name,
                slug: product.slug,
                category_id: product.category_id,
                price: product.price,
                mrp: product.mrp,
                onsale: product.onsale,
                status: product.status,
                imageCover: product.imageCover,
            };
        }; 
        let index = 0;
        for(let id in this.items) {
            index++;
        }
        this.totalQty = index ? index : 0;
    };

    this.getArry = function(){
        let arr = [];
        for(let id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };

    this.popItem = function(pid){
        delete this.items[pid];
        let totalQtys = 0;
        let index = 0;
        for(let id in this.items) {
            index++;
        }
        this.totalQty = index ? index : 0;
    }

  
    this.resetAll = function() {
        this.items = {};
        this.totalQty = 0;
    };
};


    

// GRAB DATA From Server
// Cart items
let wish = $.parseJSON($.ajax({
    type: 'get',
    url:  `/api/v1/sendSession`,
    dataType: "json", 
    async: false
  }).responseText);
  console.log(wish);
if(wish) {
    if(wish.session.hasOwnProperty('wishList')){
        window.WishList = new WishList(wish.session.wishList);
    }
}
    
    



function WishListSendToServer() {
    //Cart Send to server from Client
        const res =  axios({
            method: 'PATCH',
            url:  '/api/v1/updateSession',
            data: {
                wishList:{
                    items: window.WishList.items,
                    totalQty: window.WishList.totalQty
                }
            }
        });
    }
    
    
    function updateWishListProduct() {
    
        $('.heart-icon span').text(window.WishList.totalQty);


        //This Add First Then Delete Of we need Delte
        
    }
        
    
    
    //Add Data to cart
    
    function addToWishList(id) {
        if(id){
            console.log(id);
            //Get id
            // Create Cart Send to Server
            let wishList = new WishList(window.WishList ? window.WishList : {});

            let product = {};
            for(let i = 0; i < window.Products.data.data.length; i++) {
                if(window.Products.data.data[i].id === id) {
                    product = Products.data.data[i];
                }
            }
            
            wishList.add(product, product.id);
            window.WishList = wishList;
            //Update WieshList Product
            updateWishListProduct();
        
            //Send Data to server
            WishListSendToServer();
        }
        
      };
    
      function removeFromWishList(id) {
          if(id) {
            const details = window.WishList.popItem(id);
        
            //Update Cart Product
            updateWishListProduct(window.WishList.items);
        
            //Send Data to server
            WishListSendToServer();
            
            return details;
          }
        
      };



      
    //Add to WishList//Delete WishList
    $(document).ready(function(){
        if(window.Products){
            for(let i = 0; i < window.Products.data.data.length; i++) {
                $(`#iconCont${window.Products.data.data[i].id}`).click(function() {
                    if(window['ADD'+1] === 1) {
                        addToWishList(window.Products.data.data[i].id);
                        $(`#iconCont${window.Products.data.data[i].id}`).html(`
                            <i class="icon_heart_alt active_heart"></i>
                        `)
                        window['ADD'+1] = 0;
                    }else {
                        removeFromWishList(window.Products.data.data[i].id);
                        $(`#iconCont${window.Products.data.data[i].id}`).html(`
                            <i class="icon_heart_alt deactive_heart"></i>
                        `)
                        window['ADD'+1] = 1;
                    }
                    
                })
             }
         }
    })


  

if(window.WishList){
    let html = '';
    let wishList = window.WishList.items;
    $.each(wishList, function(key, value) {
        let categoryName = getWishCategoryname(wishList[key].category_id);
        html += `
            <div class="col-lg-4 col-sm-6 blogBox moreBox">
                <div class="product-item">
                    <div class="pi-pic">
                        <img src="img/products/${wishList[key].imageCover}" alt="${wishList[key].imageCover}">
                        ${wishList[key].onsale ? '<div class="sale pp-sale">Sale</div>' : '' }
                        <div class="icon" id="iconCont${wishList[key].id}" prodID="${wishList[key].id}">
                            <i id="delWish${wishList[key].id}" class="icon_heart_alt active_heart"></i>
                        </div>
                        <ul>
                            <li class="w-icon active"><a href="/add-to-cart/${wishList[key].id}/wishList"><i class="icon_bag_alt"></i></a></li>
                            <li class="quick-view"><a href="/shop/${wishList[key].slug}">+ Quick View</a></li>
                            <li class="w-icon"><a href="#"><i class="fa fa-random"></i></a></li>
                        </ul>
                    </div>
                    <div class="pi-text">
                        <div class="catagory-name">${categoryName}</div>
                        <a href="#">
                            <h5>${wishList[key].name}</h5>
                        </a>
                        <div class="product-price">
                            $${wishList[key].price}
                            <span>$${wishList[key].mrp}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    wishListConatiner.html(`
        <div class="row">
            ${html}
        </div>
    `);
}else {
    wishListConatiner.html(`
        <div class="row">
            <h2>Your Wishlist is Empty</h2>
        </div>
    `);
}

        


function getWishCategoryname (id) {
    if(window.Categories){
            for(let i = 0; i < window.Categories.data.data.length; i++){
                if(id === window.Categories.data.data[i]._id){
                    return window.Categories.data.data[i].name;
                }
            }   
        }
    }
