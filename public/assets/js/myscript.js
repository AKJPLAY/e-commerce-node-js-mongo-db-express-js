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

Products
for(let i = 0; i < Products.length; i++) {
    for(let j = 0; j < Categories.length; j++){
        if(Products[i].category_id === Categories[j].id) {
            window.Products[i].category_name = Categories[j].name;
        }
    }
}


const ProductList = $('#product_List_Container');
if(ProductList){
    $(document).ready(function(){
    let html = '';
    for(let i = 0; i < window.Products.length; i++) {
        html += `
         <tr id="proDetails${window.Products[i].id}">
            <td></td>
            <td class="product-name">${window.Products[i].name}</td>
            <td class="product-category">${window.Products[i].category_name}</td>
            <td id="status${window.Products[i].id}" status="${window.Products[i].status ? '1' : '0'}">
                <div class="chip ${window.Products[i].status ? 'chip-success' : 'chip-warning'}"><div class="chip-body"><div class="chip-text">${window.Products[i].status ? 'Active' : 'Deactive'}</div></div></div>
            </td>
            <td id=onsale${window.Products[i].id}" onsale="${window.Products[i].onsale ? '1' : '0'}">
                <div class="chip ${window.Products[i].onsale ? 'chip-success' : 'chip-warning'}"><div class="chip-body"><div class="chip-text">${window.Products[i].onsale ? 'Active' : 'Deactive'}</div></div></div>
            </td>
            <td class="product-price">$${parseFloat(window.Products[i].price).toFixed(2)}</td>
            <td class="product-action" prodID="${window.Products[i].id}">
                <span class="action-edit"><i class="feather icon-edit"></i></span>
                <span class="action-delete"><i class="feather icon-trash"></i></span>
            </td>
         </tr>
        `;
    }
        ProductList.html(html);
    })
    for(let i = 0; i < window.Products.length; i++) {
        $(`#status${window.Products[i].id}`).click(function(){
            const status = $(`#status${window.Products[i].id}`).attr('status');
            if(status === 1){
                $(`#status${window.Products[i].id}`).html(`
                    <div class="chip ${status ? 'chip-success' : 'chip-warning'}"><div class="chip-body"><div class="chip-text">${status ? 'Active' : 'Deactive'}</div></div></div>
                `);
                status = 0;
                $(`#status${window.Products[i].id}`).attr('status', status);
            }else {
                $(`#status${window.Products[i].id}`).html(`
                    <div class="chip ${status ? 'chip-success' : 'chip-warning'}"><div class="chip-body"><div class="chip-text">${status ? 'Active' : 'Deactive'}</div></div></div>
                `);
                status = 1;
                $(`#status${window.Products[i].id}`).attr('status', status);
            }
        });
        $(`#onsale${window.Products[i].id}`).click(function(){
            const onsale = $(`#onsale${window.Products[i].id}`).attr('onsale');
            if(onsale === 1){
                $(`#onsale${window.Products[i].id}`).html(`
                    <div class="chip ${onsale ? 'chip-success' : 'chip-warning'}"><div class="chip-body"><div class="chip-text">${onsale ? 'Active' : 'Deactive'}</div></div></div>
                `);
                onsale = 0;
                $(`#onsale${window.Products[i].id}`).attr('onsale', onsale);
            }else {
                $(`#onsale${window.Products[i].id}`).html(`
                    <div class="chip ${onsale ? 'chip-success' : 'chip-warning'}"><div class="chip-body"><div class="chip-text">${onsale ? 'Active' : 'Deactive'}</div></div></div>
                `);
                onsale = 1;
                $(`#onsale${window.Products[i].id}`).attr('onsale', onsale);
            }
        });
    }
}

