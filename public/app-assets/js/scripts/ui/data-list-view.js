/*=========================================================================================
    File Name: data-list-view.js
    Description: List View
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
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
          $("#data-name, #data-price").val("")
          $("#data-category, #data-status").prop("selectedIndex", 0)
          //Amit's Code
          //Add Product
          console.log('hiii');
          $('#data-name').attr('placeholder','Enter Name');
          $('#data-price').attr('placeholder','Enter Price');
          $('#data-mrp').attr('placeholder','Enter Mrp');
          $('#data-description').attr('placeholder','Enter Description');
          $('#data-mrp').val('');
          $('#data-description').val('');
          $('.add-new-data div div h4').text('Add New Product');
          $('#productImg').attr('src', ``);
          $('.add-data-btn button').text('Add');

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
  })

  //On Edit
      $(`.action-edit`).unbind();
      $(`.action-edit`).on("click",function(e){
        $('.add-new-data div div h4').text('Update Product');
        $('.add-data-btn button').text('Update');
        e.stopPropagation();
        /*$('#data-name').val('Altec Lansing - Bluetooth Speaker');
        $('#data-price').val('$99');
        $(".add-new-data").addClass("show");
        $(".overlay-bg").addClass("show");*/
        //Amit Code
        const id = $(this).closest('td').attr('prodID');
        $('.add-data-btn').attr('prodID', id);
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
              let category = '';
              let html = '';
              for(let j = 0; j < window.Categories.length; j++) {
                if(window.Categories[j].id === window.Products[i].category_id){
                  html += `<option id="${window.Categories[j].id}" selected="selected">${window.Categories[j].name}</option>`
                }else {
                  html += `<option id="${window.Categories[j].id}">${window.Categories[j].name}</option>`
                }
              }
              $('#data-category').html(html);
            }
          }
        }

        
        //Amit Code end
      });
    

  // mac chrome checkbox fix
  if (navigator.userAgent.indexOf("Mac OS X") != -1) {
    $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
  }
})



jQuery('#product_List_Container').bind('DOMSubtreeModified',function(event) { 
  //On Edit
  $(`.action-edit`).unbind();
  $(`.action-edit`).on("click",function(e){
    $('.add-new-data div div h4').text('Update Product');
    $('.add-data-btn button').text('Update');
    e.stopPropagation();
    /*$('#data-name').val('Altec Lansing - Bluetooth Speaker');
    $('#data-price').val('$99');
    $(".add-new-data").addClass("show");
    $(".overlay-bg").addClass("show");*/
    //Amit Code
    const id = $(this).closest('td').attr('prodID');
    $('.add-data-btn').attr('prodID', id);
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
          let category = '';
          let html = '';
          for(let j = 0; j < window.Categories.length; j++) {
            if(window.Categories[j].id === window.Products[i].category_id){
              html += `<option id="${window.Categories[j].id}" selected="selected">${window.Categories[j].name}</option>`
            }else {
              html += `<option id="${window.Categories[j].id}">${window.Categories[j].name}</option>`
            }
          }
          $('#data-category').html(html);
        }
      }
    }

    
    //Amit Code end
  });


  if(window.Products){
    for(let i = 0; i < window.Products.length; i++){
        $(`#del${window.Products[i].id}`).unbind();
        // On Delete
        $(`#del${window.Products[i].id}`).on("click", function(e){
          e.stopPropagation();
          $(this).closest('td').parent('tr').fadeOut();
          const id = $(this).closest('td').attr('prodid');
          window.deleteProduct(id);
        });
      
    }
}

}); 



//status and onsale 
$(document).ready(function(){
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


//Changes Effect
$('.add-data-btn').click(function(){
    let data = new FormData();
    const id = $('.add-data-btn').attr('prodID');
    const name = $('#data-name').val();
    $(`#proDetails${id} .product-name`).text($('#data-name').val());
    $(`#proDetails${id} .product-price`).text($('#data-price').val());
    $(`#proDetails${id} .product-category`).text($(`#data-category`).val());
    const status = $('#chip-status').attr('status');
    const onsale = $('#chip-onsale').attr('onsale');
    console.log(status,onsale);
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
        //Update the Products
        /*
        const data = {
          name: $('#data-name').val(),
          status: status,
          category_id: category_id,
          onsale: onsale,
          price: price,
        }*/
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
    
    $(".add-new-data").removeClass("show");
    $(".overlay-bg").removeClass("show");
    jQuery('#product_List_Container').unbind();
    
  });

  if(window.Products){
      for(let i = 0; i < window.Products.length; i++){
          // On Delete
          $(`#del${window.Products[i].id}`).unbind();
          $(`#del${window.Products[i].id}`).on("click", function(e){
            e.stopPropagation();
            $(this).closest('td').parent('tr').fadeOut();
            const id = $(this).closest('td').attr('prodid');
            window.deleteProduct(id);
          });
        
      }
  }

