import axios from 'axios';
import { showAlert } from './alerts';
import $ from 'jquery';
const ProductListContainer = $('.product-list');
const filterCategory = $('.filter-catagories');



//Sorting Array
function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}





//Get Product & Sorting
window.sortingProduct = function ()  {
    let categoryName = '';
    let Prod = [];
    let sort = $('.current').text();
    let minAmt = $('#minamount').val();
    let maxAmt = $('#maxamount').val();
    if(minAmt){
        minAmt = minAmt.replace(/\$/g,'');
    }
    if(maxAmt){
        maxAmt = maxAmt.replace(/\$/g,'');
    }
    if($('.product-list').attr('catId') && minAmt && maxAmt && sort) {
        for(var i = 0; i< window.Products.data.data.length; i++) {
            if($('.product-list').attr('catId') === 'All'){
                console.log('if excuite');
                    if(window.Products.data.data[i].price >= minAmt && window.Products.data.data[i].price <= maxAmt) {
                        Prod.push(window.Products.data.data[i]);
                        console.log('sub if excuite');
                    }
            }else {
                console.log('else excuite');
                    if(window.Products.data.data[i].category_id === $('.product-list').attr('catId')) {
                        if(window.Products.data.data[i].price >= minAmt && window.Products.data.data[i].price <= maxAmt){
                            Prod.push(window.Products.data.data[i]);
                            console.log('sub else excuite');
                        }
                    }
            }
        }
        if(sort) {
            if(sort === 'Default Sorting') {
                Prod.sort(dynamicSort('name'));
            }
            if(sort === 'Desending Sorting') {
                Prod.sort(dynamicSort('-name'));
            }
            if(sort === 'Lowest Price') {
                Prod.sort(dynamicSort('price'));
            }
            if(sort === 'Heigest Price') {
                Prod.sort(dynamicSort('-price'));
            }
        }
        
    }
    console.log(Prod);
        if(window.Products){
            if (window.Products.status === 'success') {
                let html = '';
                for(var i = 0; i< Prod.length; i++) {
                    let wishActive = 0;
                    if(window.WishList){
                        let wishList = window.WishList.items;
                        $.each(wishList, function(key, value) {
                            if(Prod[i].id === key) {
                                wishActive = 1;
                            }
                        })
                    }
                    
                    
                    
                    
                    html +=  `
                            <div class="col-lg-4 col-sm-6 blogBox moreBox">
                                <div class="product-item">
                                    <div class="pi-pic">
                                        <img src="img/products/${Prod[i].imageCover}" alt="${Prod[i].imageCover}">
                                        ${Prod[i].onsale ? '<div class="sale pp-sale">Sale</div>' : '' }
                                        <div class="icon" id="iconCont${Prod[i].id}" prodID="${Prod[i].id}">
                                            ${wishActive ? '<i id="delWish'+ Prod[i].id +'" class="icon_heart_alt active_heart"></i>' : '<a hreft="javascript:void(0)" id="addToWishList' + Prod[i].id +'"><i class="icon_heart_alt deactive_heart"></i></a>'}
                                        </div>
                                        <ul prodID="${Prod[i].id}">
                                            <li id="addToCart${Prod[i].id}" class="w-icon active"><a href="javascript:void(0)"><i class="icon_bag_alt"></i></a></li>
                                            <li class="quick-view"><a href="/shop/${Prod[i].slug}">+ Quick View</a></li>
                                            <li class="w-icon"><a href="#"><i class="fa fa-random"></i></a></li>
                                        </ul>
                                    </div>
                                    <div class="pi-text">
                                        <div class="catagory-name">${categoryName}</div>
                                        <a href="#">
                                            <h5>${Prod[i].name}</h5>
                                        </a>
                                        <div class="product-price">
                                            $${Prod[i].price}
                                            <span>$${Prod[i].mrp}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
        
                    }
        
            
                    ProductListContainer.html(`
                            <div class="row">
                                ${html}
                            </div>
                    `);
            }
        }      
        
};


sortingProduct();

function getCategoryname (id) {
        if (window.Categories.data.status = 'success') {
            for(let i = 0; i < window.Categories.data.data.length; i++){
                if(id === window.Categories.data.data[i]._id){
                    return window.Categories.data.data[i].name;
                }
            }   
        }
}


// filter-catagories
if(filterCategory) {
    $(document).ready(function(){
        if(window.Categories){
            const categories = window.Categories.data.data;
            let html = `<li class="AllFilter" catid="AllFilter" style="cursor: pointer;">All Categories</li>`;
            for(var i = 0; i< categories.length; i++) {
                html +=  `<li class="cat${categories[i]._id}" cat_id="${categories[i]._id}" style="cursor: pointer;">${categories[i].name}</li>`;
            }
            filterCategory.html(html);
            for(var i = 0; i< categories.length; i++) {
                const cat_id = $(`.cat${categories[i]._id}`).attr('cat_id');
                $(`li.cat${cat_id}`).click(function(){
                    $('.product-list').attr('catId',cat_id);
                    sortingProduct();
                });
            }
        }
    });
}
 

//Click Working Filter-Category

