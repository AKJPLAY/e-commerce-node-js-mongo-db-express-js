//Get Url
let url = window.location.href;
url = url.split('/');
url = url[(url.length - 1)];
window.Url = url;
console.log(url);

// Get All Posts
window.Posts = $.parseJSON($.ajax({
    type: 'get',
    url:  `/api/v1/posts`,
    dataType: "json", 
    async: false
  }).responseText);
window.Posts = window.Posts.data.data;


// Get All Categories
window.Categories = $.parseJSON($.ajax({
    type: 'get',
    url:  `/api/v1/categories`,
    dataType: "json", 
    async: false
  }).responseText);
window.Categories = window.Categories.data.data;
  
  // Get All Products
window.Products = $.parseJSON($.ajax({
    type: 'get',
    url:  `/api/v1/products`,
    dataType: "json", 
    async: false
  }).responseText);
window.Products = window.Products.data.data;

if(window.Url){
    if(window.Url === 'products'){
        for(let i = 0; i < Products.length; i++) {
            for(let j = 0; j < Categories.length; j++){
                if(Products[i].category_id === Categories[j].id) {
                    window.Products[i].category_name = Categories[j].name;
                }
            }
        }
    }
    
    
    const ProductList = $('#product_List_Container');
    if(ProductList){
        $(document).ready(function(){
        let html = '';
        if(window.Url === 'products'){
            $('#tableHeading').html(`
            <th></th>
            <th>NAME</th>
            <th>CATEGORY</th>
            <th>ONSALE</th>
            <th>STATUS</th>
            <th>PRICE</th>
            <th>ACTION</th>
            `);
            for(let i = 0; i < window.Products.length; i++) {
                html += `
                 <tr id="proDetails${window.Products[i].id}">
                    <td></td>
                    <td class="product-name">${window.Products[i].name}</td>
                    <td class="product-category">${window.Products[i].category_name}</td>
                    <td id="onsale${window.Products[i].id}" onsale="${window.Products[i].onsale ? 'true' : 'false'}">
                        <div class="chip ${window.Products[i].onsale ? 'chip-success' : 'chip-warning'}"><div class="chip-body"><div class="chip-text">${window.Products[i].onsale ? 'Active' : 'Deactive'}</div></div></div>
                    </td>
                    <td id="status${window.Products[i].id}" status="${window.Products[i].status ? 'true' : 'false'}">
                        <div class="chip ${window.Products[i].status ? 'chip-success' : 'chip-warning'}"><div class="chip-body"><div class="chip-text">${window.Products[i].status ? 'Active' : 'Deactive'}</div></div></div>
                    </td>
                    <td class="product-price">$${parseFloat(window.Products[i].price).toFixed(2)}</td>
                    <td class="product-action" prodID="${window.Products[i].id}">
                        <span class="action-edit"><i class="feather icon-edit"></i></span>
                        <span class="action-delete" id="del${window.Products[i].id}"><i class="feather icon-trash"></i></span>
                    </td>
                 </tr>
                `;
            }
        }
        if(window.Url === 'categories'){
            $('#tableHeading').html(`
            <th></th>
            <th>NAME</th>
            <th>ONHOME</th>
            <th>STATUS</th>
            <th>ACTION</th><
            `);
            $('.content-header-title').text('Categories');
            $('.breadcrumb .breadcrumb-item:nth-child(1)').html('<a href="/admin">Home</a>');
            $('.breadcrumb .breadcrumb-item:nth-child(2)').html('<a href="/categories">Categories</a>');
            $('.breadcrumb .breadcrumb-item:nth-child(3)').text('Category view');
            
            for(let i = 0; i < window.Categories.length; i++) {
                html += `
                 <tr id="proDetails${window.Categories[i].id}">
                    <td></td>
                    <td class="product-name">${window.Categories[i].name}</td>
                    <td id="onhome${window.Categories[i].id}" onhome="${window.Categories[i].onhome ? 'true' : 'false'}">
                        <div class="chip ${window.Categories[i].onhome ? 'chip-success' : 'chip-warning'}"><div class="chip-body"><div class="chip-text">${window.Categories[i].onhome ? 'Active' : 'Deactive'}</div></div></div>
                    </td>
                    <td id="status${window.Categories[i].id}" status="${window.Categories[i].status ? 'true' : 'false'}">
                        <div class="chip ${window.Categories[i].status ? 'chip-success' : 'chip-warning'}"><div class="chip-body"><div class="chip-text">${window.Categories[i].status ? 'Active' : 'Deactive'}</div></div></div>
                    </td>
                    <td class="product-action" prodID="${window.Categories[i].id}">
                        <span class="action-edit"><i class="feather icon-edit"></i></span>
                        <span class="action-delete" id="del${window.Categories[i].id}"><i class="feather icon-trash"></i></span>
                    </td>
                 </tr>
                `;
            }
     
        }
        if(window.Url === 'posts'){
            $('#tableHeading').html(`
            <th></th>
            <th>NAME</th>
            <th>ONHOME</th>
            <th>FEATURED</th>
            <th>STATUS</th>
            <th>ACTION</th>
            `);
            $('.content-header-title').text('Posts');
            $('.breadcrumb .breadcrumb-item:nth-child(1)').html('<a href="/admin">Home</a>');
            $('.breadcrumb .breadcrumb-item:nth-child(2)').html('<a href="/posts">Posts</a>');
            $('.breadcrumb .breadcrumb-item:nth-child(3)').text('Posts view');
            
            for(let i = 0; i < window.Posts.length; i++) {
                html += `
                 <tr id="proDetails${window.Posts[i].id}">
                    <td></td>
                    <td class="product-name">${window.Posts[i].name}</td>
                    <td id="onhome${window.Posts[i].id}" onhome="${window.Posts[i].onhome ? 'true' : 'false'}">
                        <div class="chip ${window.Posts[i].onhome ? 'chip-success' : 'chip-warning'}"><div class="chip-body"><div class="chip-text">${window.Posts[i].onhome ? 'Active' : 'Deactive'}</div></div></div>
                    </td>
                    <td id="featured${window.Posts[i].id}" featured="${window.Posts[i].featurePost ? 'true' : 'false'}">
                        <div class="chip ${window.Posts[i].featurePost ? 'chip-success' : 'chip-warning'}"><div class="chip-body"><div class="chip-text">${window.Posts[i].featurePost ? 'Active' : 'Deactive'}</div></div></div>
                    </td>
                    <td id="status${window.Posts[i].id}" status="${window.Posts[i].status ? 'true' : 'false'}">
                        <div class="chip ${window.Posts[i].status ? 'chip-success' : 'chip-warning'}"><div class="chip-body"><div class="chip-text">${window.Posts[i].status ? 'Active' : 'Deactive'}</div></div></div>
                    </td>
                    <td class="product-action" prodID="${window.Posts[i].id}">
                        <span class="action-edit"><i class="feather icon-edit"></i></span>
                        <span class="action-delete" id="del${window.Posts[i].id}"><i class="feather icon-trash"></i></span>
                    </td>
                 </tr>
                `;
            }
     
        }
                   ProductList.html(html);
        })
    }
    
    if(window.Url === 'Products'){

    }
    
}