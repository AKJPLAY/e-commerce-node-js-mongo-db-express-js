/*=========================================================================================
    File Name: data-list-view.js
    Description: List View
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
if(window.Url === 'products'){
  $('#onHomechip').hide();
}if(window.Url === 'categories'){
  $('#onSalechip').hide();
}

if(window.Url){
  if(window.Url === 'products'){
    window.deleteProduct = async function (id){
      const res = await axios({
        method: 'DELETE',
        url:  `/api/v1/products/${id}`,
      });
      return res;
    }
    
    window.updateProduct = async function (id, data){
      const res = await axios({
        method: 'PATCH',
        url:  `/api/v1/products/${id}`,
        data
      });
      return res;
    }
    
    
    window.addProduct = async function (data){
      const res = await axios({
        method: 'POST',
        url:  `/api/v1/products`,
        data
      });
      return res;
    }
  }
  if(window.Url === 'categories'){
    window.deleteCategory = async function (id){
      const res = await axios({
        method: 'DELETE',
        url:  `/api/v1/categories/${id}`,
      });
      return res;
    }
    
    window.updateCategory = async function (id, data){
      const res = await axios({
        method: 'PATCH',
        url:  `/api/v1/categories/${id}`,
        data
      });
      return res;
    }
    
    
    window.addCategory = async function (data){
      const res = await axios({
        method: 'POST',
        url:  `/api/v1/categories`,
        data
      });
      return res;
    }

    //add-Panel 
    $('#add-panel').html(`
    <div class="col-sm-12 data-field-col">
      <label for="data-name">Name</label>
      <input class="form-control" id="data-name" type="text">
    </div>
    <div class="col-sm-12 data-field-col data-list-upload">
      Cover Image<img id="productImg" src="" alt="">
      <input id="fileToUpload" type="file" name="imageCover">
    </div>
    `);
  }

  if(window.Url === 'posts'){
    window.deletePost = async function (id){
      const res = await axios({
        method: 'DELETE',
        url:  `/api/v1/posts/${id}`,
      });
      return res;
    }
    
    window.updatePost = async function (id, data){
      const res = await axios({
        method: 'PATCH',
        url:  `/api/v1/posts/${id}`,
        data
      });
      return res;
    }
    
    
    window.addPost = async function (data){
      const res = await axios({
        method: 'POST',
        url:  `/api/v1/posts`,
        data
      });
      return res;
    }

    //add-Panel 
    $('#add-panel').html(`
    <div class="col-sm-12 data-field-col">
      <label for="data-name">Name</label>
      <input class="form-control" id="data-name" type="text">
    </div>
    <div class="col-sm-12 data-field-col data-list-upload">
      <label for="data-description">Description</label>
      <textarea class="form-control" id="data-description" type="text"></textarea>
    </div>
    <div class="col-sm-12 data-field-col data-list-upload">
      Cover Image<img id="productImg" src="" alt="">
      <input id="fileToUpload" type="file" name="imageCover">
    </div>
    `);
  }
  
  
}


function editTableData(){
  //On Edit
  $(`.action-edit`).unbind();
  $(`.action-edit`).on("click",function(e){
    e.stopPropagation();
    //Amit Code
    $('.add-data-btn button').text('Update');
    if(window.Url){
        const id = $(this).closest('td').attr('prodID');
        $('.add-data-btn').attr('prodID', id);
          if(window.Url === 'products'){
            $('.add-new-data div div h4').text('Update Product');
            if(window.Products){
              for(let i = 0; i < window.Products.length; i++){
                if(window.Products[i].id === id){
                  $('#data-name').val($(`#proDetails${id} .product-name`).text());
                  $('#data-price').val($(`#proDetails${id} .product-price`).text());
                  $('#data-mrp').val(`$${parseFloat(window.Products[i].mrp).toFixed(2)}`);
                  $('#data-description').val(`${window.Products[i].description}`);
                  console.log(window.Products[i].imageCover);
                  $('#productImg').attr('src', `../../../img/products/${window.Products[i].imageCover}`);
                  if(window.Products[i].onsale) {
                    $('#chip-onsale').addClass('chip-success');
                    $('#chip-onsale').attr('onsale','true');
                    $('#chip-onsale').removeClass('chip-warning');
                    $('#chip-onsale .chip-text').text('Active');
                  }else {
                    $('#chip-onsale').addClass('chip-warning');
                    $('#chip-onsale').attr('onsale','false');
                    $('#chip-onsale').removeClass('chip-success');
                    $('#chip-onsale .chip-text').text('Deactive');
                  }
                  if(window.Products[i].status) {
                    $('#chip-status').addClass('chip-success');
                    $('#chip-status').attr('status','true');
                    $('#chip-status').removeClass('chip-warning');
                    $('#chip-status .chip-text').text('Active');
                  }else {
                    $('#chip-status').addClass('chip-warning');
                    $('#chip-status').attr('status','false');
                    $('#chip-status').removeClass('chip-success');
                    $('#chip-status .chip-text').text('Deactive');
                  }
                  $(".add-new-data").addClass("show");
                  $(".overlay-bg").addClass("show");
                  $(".add-new-data").addClass("show");
                  $(".overlay-bg").addClass("show");
            }
          }
        }
      }

        // Category
          if(window.Url === 'categories'){
            $('.add-new-data div div h4').text('Update Category');
            if(window.Categories){
              for(let i = 0; i < window.Categories.length; i++){
                if(window.Categories[i].id === id){
                  $('#data-name').val($(`#proDetails${id} .product-name`).text());
                  console.log(window.Categories[i].imageCover);
                  $('#productImg').attr('src', `../../../img/categories/${window.Categories[i].imageCover}`);
                  if(window.Categories[i].onhome) {
                    $('#chip-onhome').addClass('chip-success');
                    $('#chip-onhome').attr('onhome','true');
                    $('#chip-onhome').removeClass('chip-warning');
                    $('#chip-onhome .chip-text').text('Active');
                  }else {
                    $('#chip-onhome').addClass('chip-warning');
                    $('#chip-onhome').attr('onhome','false');
                    $('#chip-onhome').removeClass('chip-success');
                    $('#chip-onhome .chip-text').text('Deactive');
                  }
                  if(window.Categories[i].status) {
                    $('#chip-status').addClass('chip-success');
                    $('#chip-status').attr('status','true');
                    $('#chip-status').removeClass('chip-warning');
                    $('#chip-status .chip-text').text('Active');
                  }else {
                    $('#chip-status').addClass('chip-warning');
                    $('#chip-status').attr('status','false');
                    $('#chip-status').removeClass('chip-success');
                    $('#chip-status .chip-text').text('Deactive');
                  }
                  $(".add-new-data").addClass("show");
                  $(".overlay-bg").addClass("show");
                  $(".add-new-data").addClass("show");
                  $(".overlay-bg").addClass("show");
            }
          }
        }
      }

          // Post
          if(window.Url === 'posts'){
            $('.add-new-data div div h4').text('Update Post');
            if(window.Posts){
              for(let i = 0; i < window.Posts.length; i++){
                if(window.Posts[i].id === id){
                  $('#data-name').val($(`#proDetails${id} .product-name`).text());
                  $('#data-description').val(`${window.Posts[i].description}`);
                  console.log(window.Posts[i].imageCover);
                  $('#productImg').attr('src', `../../../img/blog/${window.Posts[i].imageCover}`);
                  if(window.Posts[i].onhome) {
                    $('#chip-onhome').addClass('chip-success');
                    $('#chip-onhome').attr('onhome','true');
                    $('#chip-onhome').removeClass('chip-warning');
                    $('#chip-onhome .chip-text').text('Active');
                  }else {
                    $('#chip-onhome').addClass('chip-warning');
                    $('#chip-onhome').attr('onhome','false');
                    $('#chip-onhome').removeClass('chip-success');
                    $('#chip-onhome .chip-text').text('Deactive');
                  }
                  if(window.Posts[i].featurePost) {
                    $('#chip-featured').addClass('chip-success');
                    $('#chip-featured').attr('featured','true');
                    $('#chip-featured').removeClass('chip-warning');
                    $('#chip-featured .chip-text').text('Active');
                  }else {
                    $('#chip-featured').addClass('chip-warning');
                    $('#chip-featured').attr('featured','false');
                    $('#chip-featured').removeClass('chip-success');
                    $('#chip-featured .chip-text').text('Deactive');
                  }
                  if(window.Posts[i].status) {
                    $('#chip-status').addClass('chip-success');
                    $('#chip-status').attr('status','true');
                    $('#chip-status').removeClass('chip-warning');
                    $('#chip-status .chip-text').text('Active');
                  }else {
                    $('#chip-status').addClass('chip-warning');
                    $('#chip-status').attr('status','false');
                    $('#chip-status').removeClass('chip-success');
                    $('#chip-status .chip-text').text('Deactive');
                  }
                  $(".add-new-data").addClass("show");
                  $(".overlay-bg").addClass("show");
                  $(".add-new-data").addClass("show");
                  $(".overlay-bg").addClass("show");
            }
          }
        }
      }
    }
    

    
    //Amit Code end
  });  
}


function addBtnData(){
  $('.add-data-btn').unbind();
  $('.add-data-btn').click(function(){
    let data = new FormData();
    const id = $('.add-data-btn').attr('prodID');
    const name = $('#data-name').val();
    const description = $('#data-description').val();
    $(`#proDetails${id} .product-name`).text($('#data-name').val());
    const status = $('#chip-status').attr('status');
    const onsale = $('#chip-onsale').attr('onsale');
    const onhome = $('#chip-onhome').attr('onhome');
    const featured = $('#chip-featured').attr('featured');
    if(window.Url){
      if(window.Url === 'products'){
        $(`#proDetails${id} .product-price`).text($('#data-price').val());
        $(`#proDetails${id} .product-category`).text($(`#data-category`).val());



        if(onsale && status){
          $(`#status${id}`).attr('status', `${status === 'true'? 'true' : 'false'}`);
          $(`#status${id}`).html(`<div class="chip ${status === 'true' ? 'chip-success' : 'chip-warning'}"><div class="chip-body"><div class="chip-text">${status === 'true' ? 'Active' : 'Deactive'}</div></div></div>`);
          $(`#onsale${id}`).attr('onsale', `${onsale === 'true'? 'true' : 'false'}`);
          $(`#onsale${id}`).html(`<div class="chip ${onsale === 'true' ? 'chip-success' : 'chip-warning'}"><div class="chip-body"><div class="chip-text">${onsale === 'true' ? 'Active' : 'Deactive'}</div></div></div>`);
          console.log($(`#onsale${id}`),$(`#status${id}`))
          if($(`#onsale${id}`) && $(`#status${id}`)){
            //Convert price into interger
            let price = $('#data-price').val().replace(/\$/g,'');
            price = parseFloat(price).toFixed(2);
            let mrp = $('#data-mrp').val().replace(/\$/g,'');
            mrp = parseFloat(mrp).toFixed(2);
            //Get Category ID
            const categoryname = $(`#data-category`).val();
            let category_id = '';
            if(window.Categories){
              for(let i = 0; i < window.Categories.length; i++){
                if(window.Categories[i].name === categoryname){
                  category_id = window.Categories[i].id;
                }
              }
            }
            if(name){
              data.append('name', name);
            }
            if(status){
              data.append('status',status);
            }
            if(category_id){
              data.append('category_id', category_id);
            }
            if(mrp){
              data.append('mrp', mrp);
            }
            if(onsale){
              data.append('onsale', onsale);
            }
            if(document.getElementById('fileToUpload').files[0]){
              data.append('imageCover', document.getElementById('fileToUpload').files[0]);
            }
            
            console.log(name,price,mrp,status,onsale,document.getElementById('fileToUpload').files[0]);
    
            window.updateProduct(id, data);
            
          }
      }
    }

    if(window.Url === 'categories'){
      $(`#proDetails${id} .product-price`).text($('#data-price').val());
        $(`#proDetails${id} .product-category`).text($(`#data-category`).val());


        if(onhome && status){
          $(`#status${id}`).attr('status', `${status === 'true'? 'true' : 'false'}`);
          $(`#status${id}`).html(`<div class="chip ${status === 'true' ? 'chip-success' : 'chip-warning'}"><div class="chip-body"><div class="chip-text">${status === 'true' ? 'Active' : 'Deactive'}</div></div></div>`);
          $(`#onhome${id}`).attr('onhome', `${onhome === 'true'? 'true' : 'false'}`);
          $(`#onhome${id}`).html(`<div class="chip ${onhome === 'true' ? 'chip-success' : 'chip-warning'}"><div class="chip-body"><div class="chip-text">${onhome === 'true' ? 'Active' : 'Deactive'}</div></div></div>`);
          console.log($(`#onhome${id}`),$(`#status${id}`))
          if($(`#onhome${id}`) && $(`#status${id}`)){
            if(name){
              data.append('name', name);
            }
            if(status){
              data.append('status',status);
            }
            if(onhome){
              data.append('onhome', onhome);
            }
            if(document.getElementById('fileToUpload').files[0]){
              data.append('imageCover', document.getElementById('fileToUpload').files[0]);
            }
            
            console.log(name,status,onsale,document.getElementById('fileToUpload').files[0]);
    
            window.updateCategory(id, data);
            
          }
      }
    }

    if(window.Url === 'posts'){
        if(onhome && status && featured){
          $(`#status${id}`).attr('status', `${status === 'true'? 'true' : 'false'}`);
          $(`#status${id}`).html(`<div class="chip ${status === 'true' ? 'chip-success' : 'chip-warning'}"><div class="chip-body"><div class="chip-text">${status === 'true' ? 'Active' : 'Deactive'}</div></div></div>`);
          $(`#onhome${id}`).attr('onhome', `${onhome === 'true'? 'true' : 'false'}`);
          $(`#onhome${id}`).html(`<div class="chip ${onhome === 'true' ? 'chip-success' : 'chip-warning'}"><div class="chip-body"><div class="chip-text">${onhome === 'true' ? 'Active' : 'Deactive'}</div></div></div>`);
          $(`#featured${id}`).attr('featured', `${featured === 'true'? 'true' : 'false'}`);
          $(`#featured${id}`).html(`<div class="chip ${featured === 'true' ? 'chip-success' : 'chip-warning'}"><div class="chip-body"><div class="chip-text">${featured === 'true' ? 'Active' : 'Deactive'}</div></div></div>`);
          console.log($(`#onhome${id}`),$(`#status${id}`),$(`#featured${id}`));
          if($(`#onhome${id}`) && $(`#status${id}`) && $(`#featured${id}`)){
            if(name){
              data.append('name', name);
            }
            if(description){
              data.append('description', description);
            }
            if(status){
              data.append('status',status);
            }
            if(onhome){
              data.append('onhome', onhome);
            }
            if(featured){
              data.append('featurePost', featured);
            }
            if(document.getElementById('fileToUpload').files[0]){
              data.append('imageCover', document.getElementById('fileToUpload').files[0]);
            }
            
            console.log(name,status,onsale,document.getElementById('fileToUpload').files[0]);
    
            window.updatePost(id, data);
            
          }
      }
    }
    console.log(status,onhome);
    }
    
    $(".add-new-data").removeClass("show");
    $(".overlay-bg").removeClass("show");
    jQuery('#product_List_Container').unbind();
    
  });
}

$(document).ready(function() {
  "use strict"
  // init list view datatable
  var dataListView = $(".data-list-view").DataTable({
    responsive: false,
    columnDefs: [
      {
        orderable: true,
        targets: 0,
        checkboxes: { selectRow: true }
      }
    ],
    dom:
      '<"top"<"actions action-btns"B><"action-filters"lf>><"clear">rt<"bottom"<"actions">p>',
    oLanguage: {
      sLengthMenu: "_MENU_",
      sSearch: ""
    },
    aLengthMenu: [[4, 10, 15, 20], [4, 10, 15, 20]],
    select: {
      style: "multi"
    },
    order: [[1, "asc"]],
    bInfo: false,
    pageLength: 4,
    buttons: [
      {
        text: "<i class='feather icon-plus'></i> Add New",
        action: function() {
          $(this).removeClass("btn-secondary")
          $(".add-new-data").addClass("show")
          $(".overlay-bg").addClass("show")
          if(window.Url){
            if(window.Url === 'products'){
              $("#data-name, #data-price").val("")
              $("#data-category, #data-status").prop("selectedIndex", 0)
              //Amit's Code
              //Add Product
              $('#data-name').attr('placeholder','Enter Name');
              $('#data-price').attr('placeholder','Enter Price');
              $('#data-mrp').attr('placeholder','Enter Mrp');
              $('#data-description').attr('placeholder','Enter Description');
              $('#data-mrp').val('');
              $('#data-description').val('');
              $('.add-new-data div div h4').text('Add New Product');
              $('#productImg').attr('src', ``);
              $('.add-data-btn button').text('Add');
              $('.add-data-btn').unbind();
              $('.add-data-btn').click(function(){
                const data = new FormData();
                let category_id = '';
                const name = $('#data-name').val();
                const price = $('#data-price').val();
                const mrp = $('#data-mrp').val();
                const description = $('#data-description').val();
                for(let i = 0; i < window.Categories.length; i++){
                  if(window.Categories[i].name === $('#data-category').val()){
                    category_id = window.Categories[i].id;
                  }
                }
                data.append('name', name);
                data.append('category_id', category_id);
                data.append('price', price);
                data.append('mrp', mrp);
                data.append('description', description);
                data.append('imageCover', document.getElementById('fileToUpload').files[0]);
                console.log(document.getElementById('fileToUpload').files[0]);
                window.addProduct(data);
                
                setTimeout(function(){
                  location.reload();
                },2000);
                $('.add-data.btn').unbind();
              });
              
              //Amit's Code ends
            }
          if(window.Url === 'categories'){
              $("#data-category, #data-status").prop("selectedIndex", 0)
              //Amit's Code
              //Add Product
              $('#data-name').attr('placeholder','Enter Name');
              $('#data-description').attr('placeholder','Enter Description');
              $('#data-description').val('');
              $('.add-new-data div div h4').text('Add New Category');
              $('#productImg').attr('src', ``);
              $('.add-data-btn button').text('Add');
              $('.add-data-btn').unbind();
              $('.add-data-btn').click(function(){
                const data = new FormData();
                let category_id = '';
                const name = $('#data-name').val();
                const description = $('#data-description').val();
                data.append('name', name);
                data.append('imageCover', document.getElementById('fileToUpload').files[0]);
                console.log(document.getElementById('fileToUpload').files[0]);
                window.addCategory(data);
                
                setTimeout(function(){
                  location.reload();
                },2000);
                $('.add-data.btn').unbind();
              });
              
              //Amit's Code ends
            }

            if(window.Url === 'posts'){
              $("#data-category, #data-status").prop("selectedIndex", 0)
              //Amit's Code
              //Add Product
              $('#data-name').attr('placeholder','Enter Name');
              $('#data-description').attr('placeholder','Enter Description');
              $('#data-description').val('');
              $('.add-new-data div div h4').text('Add New Post');
              $('#productImg').attr('src', ``);
              $('.add-data-btn button').text('Add');
              $('.add-data-btn').unbind();
              $('.add-data-btn').click(function(){
                const data = new FormData();
                let category_id = '';
                const name = $('#data-name').val();
                const description = $('#data-description').val();
                data.append('name', name);
                data.append('description', description);
                data.append('imageCover', document.getElementById('fileToUpload').files[0]);
                console.log(document.getElementById('fileToUpload').files[0]);
                window.addPost(data);
                
                setTimeout(function(){
                  location.reload();
                },2000);
                $('.add-data.btn').unbind();
              });
              
              //Amit's Code ends
            }
          }
        },
        className: "btn-outline-primary"
      }
    ],
    initComplete: function(settings, json) {
      $(".dt-buttons .btn").removeClass("btn-secondary")
    }
  });

  dataListView.on('draw.dt', function(){
    setTimeout(function(){
      if (navigator.userAgent.indexOf("Mac OS X") != -1) {
        $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
      }
    }, 50);
  });

  // init thumb view datatable
  var dataThumbView = $(".data-thumb-view").DataTable({
    responsive: false,
    columnDefs: [
      {
        orderable: true,
        targets: 0,
        checkboxes: { selectRow: true }
      }
    ],
    dom:
      '<"top"<"actions action-btns"B><"action-filters"lf>><"clear">rt<"bottom"<"actions">p>',
    oLanguage: {
      sLengthMenu: "_MENU_",
      sSearch: ""
    },
    aLengthMenu: [[4, 10, 15, 20], [4, 10, 15, 20]],
    select: {
      style: "multi"
    },
    order: [[1, "asc"]],
    bInfo: false,
    pageLength: 4,
    buttons: [
      {
        text: "<i class='feather icon-plus'></i> Add New",
        action: function() {
          $(this).removeClass("btn-secondary")
          $(".add-new-data").addClass("show")
          $(".overlay-bg").addClass("show")
        },
        className: "btn-outline-primary"
      }
    ],
    initComplete: function(settings, json) {
      $(".dt-buttons .btn").removeClass("btn-secondary")
    }
  })

  dataThumbView.on('draw.dt', function(){
    setTimeout(function(){
      if (navigator.userAgent.indexOf("Mac OS X") != -1) {
        $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
      }
    }, 50);
  });

  // To append actions dropdown before add new button
  var actionDropdown = $(".actions-dropodown")
  actionDropdown.insertBefore($(".top .actions .dt-buttons"))


  // Scrollbar
  if ($(".data-items").length > 0) {
    new PerfectScrollbar(".data-items", { wheelPropagation: false })
  }

  // Close sidebar
  $(".hide-data-sidebar, .cancel-data-btn, .overlay-bg").on("click", function() {
    $(".add-new-data").removeClass("show")
    $(".overlay-bg").removeClass("show")
    $("#data-name, #data-price").val("")
    $("#data-category, #data-status").prop("selectedIndex", 0)
    //Reassigne add Btn Funcation
    addBtnData();
  })

  //On Edit
     editTableData();

  // mac chrome checkbox fix
  if (navigator.userAgent.indexOf("Mac OS X") != -1) {
    $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
  }
})



jQuery('#product_List_Container').bind('DOMSubtreeModified',function(event) { 
  //On Edit
  editTableData();
  if(window.Url){
    if(window.Url === 'products'){
      if(window.Products){
        for(let i = 0; i < window.Products.length; i++){
            $(`#del${window.Products[i].id}`).unbind();
            // On Delete
            $(`#del${window.Products[i].id}`).on("click", function(e){
              e.stopPropagation();
              $(this).closest('td').parent('tr').fadeOut();
              const id = $(this).closest('td').attr('prodid');
              window.deleteProduct(id);
              location.reload();
            });
          
        }
      }
    }
    if(window.Url === 'categories'){
      if(window.Categories){
        for(let i = 0; i < window.Categories.length; i++){
            $(`#del${window.Categories[i].id}`).unbind();
            // On Delete
            $(`#del${window.Categories[i].id}`).on("click", function(e){
              e.stopPropagation();
              $(this).closest('td').parent('tr').fadeOut();
              const id = $(this).closest('td').attr('prodid');
              window.deleteCategory(id);
              location.reload();
            });
          
        }
      }
    }
    if(window.Url === 'posts'){
      if(window.Posts){
        for(let i = 0; i < window.Posts.length; i++){
            $(`#del${window.Posts[i].id}`).unbind();
            // On Delete
            $(`#del${window.Posts[i].id}`).on("click", function(e){
              e.stopPropagation();
              $(this).closest('td').parent('tr').fadeOut();
              const id = $(this).closest('td').attr('prodid');
              window.deletePost(id);
              location.reload();
            });
        }
      }
    }
  }
  

}); 



//status and onsale 
$(document).ready(function(){
  if(window.Url){
    if(window.Url === 'products'){
      $(`#chip-onsale`).click(function(){

        const onsale = $(`#chip-onsale`).attr('onsale');
        if(onsale === 'true'){
          $('#chip-onsale').addClass('chip-warning');
          $('#chip-onsale').attr('onsale','false');
          $('#chip-onsale').removeClass('chip-success');
          $('#chip-onsale .chip-text').text('Deactive');
        }else {
          $('#chip-onsale').addClass('chip-success');
          $('#chip-onsale').attr('onsale','true');
          $('#chip-onsale').removeClass('chip-warning');
          $('#chip-onsale .chip-text').text('Active');
        }
        
      })
    }
    if(window.Url === 'categories'){
      $(`#chip-onhome`).click(function(){
        const onhome = $(`#chip-onhome`).attr('onhome');
        if(onhome === 'true'){
          $('#chip-onhome').addClass('chip-warning');
          $('#chip-onhome').attr('onhome','false');
          $('#chip-onhome').removeClass('chip-success');
          $('#chip-onhome .chip-text').text('Deactive');
        }else {
          $('#chip-onhome').addClass('chip-success');
          $('#chip-onhome').attr('onhome','true');
          $('#chip-onhome').removeClass('chip-warning');
          $('#chip-onhome .chip-text').text('Active');
        }
        
      })
    }

    if(window.Url === 'posts'){
      $(`#chip-onhome`).click(function(){
        const onhome = $(`#chip-onhome`).attr('onhome');
        if(onhome === 'true'){
          $('#chip-onhome').addClass('chip-warning');
          $('#chip-onhome').attr('onhome','false');
          $('#chip-onhome').removeClass('chip-success');
          $('#chip-onhome .chip-text').text('Deactive');
        }else {
          $('#chip-onhome').addClass('chip-success');
          $('#chip-onhome').attr('onhome','true');
          $('#chip-onhome').removeClass('chip-warning');
          $('#chip-onhome .chip-text').text('Active');
        }
        
      })

      $(`#chip-featured`).click(function(){
        const featured = $(`#chip-featured`).attr('featured');
        if(featured === 'true'){
          $('#chip-featured').addClass('chip-warning');
          $('#chip-featured').attr('featured','false');
          $('#chip-featured').removeClass('chip-success');
          $('#chip-featured .chip-text').text('Deactive');
        }else {
          $('#chip-featured').addClass('chip-success');
          $('#chip-featured').attr('featured','true');
          $('#chip-featured').removeClass('chip-warning');
          $('#chip-featured .chip-text').text('Active');
        }
      })
    }
  }
  
  $(`#chip-status`).click(function(){
    const status = $(`#chip-status`).attr('status');
    if(status === 'true'){
      $('#chip-status').addClass('chip-warning');
      $('#chip-status').attr('status','false');
      $('#chip-status').removeClass('chip-success');
      $('#chip-status .chip-text').text('Deactive');
    }else {
      $('#chip-status').addClass('chip-success');
      $('#chip-status').attr('status','true');
      $('#chip-status').removeClass('chip-warning');
      $('#chip-status .chip-text').text('Active');
      }
  })
  
})


//Changes Effect of Row of Data
addBtnData();

  // Deleting Functionl
  if(window.Url){
    if(window.Url === 'products'){
      if(window.Products){
        for(let i = 0; i < window.Products.length; i++){
            $(`#del${window.Products[i].id}`).unbind();
            // On Delete
            $(`#del${window.Products[i].id}`).on("click", function(e){
              e.stopPropagation();
              $(this).closest('td').parent('tr').fadeOut();
              const id = $(this).closest('td').attr('prodid');
              window.deleteProduct(id);
              location.reload();
            });
          
        }
      }
    }
    if(window.Url === 'categories'){
      if(window.Categories){
        for(let i = 0; i < window.Categories.length; i++){
            $(`#del${window.Categories[i].id}`).unbind();
            // On Delete
            $(`#del${window.Categories[i].id}`).on("click", function(e){
              e.stopPropagation();
              $(this).closest('td').parent('tr').fadeOut();
              const id = $(this).closest('td').attr('prodid');
              window.deleteCategory(id);
              location.reload();
            });
        }
      }
    }

    if(window.Url === 'posts'){
      if(window.Posts){
        for(let i = 0; i < window.Posts.length; i++){
            $(`#del${window.Posts[i].id}`).unbind();
            // On Delete
            $(`#del${window.Posts[i].id}`).on("click", function(e){
              e.stopPropagation();
              $(this).closest('td').parent('tr').fadeOut();
              const id = $(this).closest('td').attr('prodid');
              window.deletePost(id);
              location.reload();
            });
        }
      }
    }
  }

  