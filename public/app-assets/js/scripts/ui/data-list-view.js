/*=========================================================================================
    File Name: data-list-view.js
    Description: List View
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

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
  $('.action-edit').on("click",function(e){
    e.stopPropagation();
    /*$('#data-name').val('Altec Lansing - Bluetooth Speaker');
    $('#data-price').val('$99');
    $(".add-new-data").addClass("show");
    $(".overlay-bg").addClass("show");*/
    //Amit Code
    const id = $(this).closest('td').attr('prodID');
    if(window.Products){
      for(let i = 0; i < window.Products.length; i++){
        if(window.Products[i].id === id){
          $('#data-name').val($(`#proDetails${id} .product-name`).text());
          $('#data-price').val($(`#proDetails${id} .product-price`).text());
          $('#data-mrp').val(`$${parseFloat(window.Products[i].mrp).toFixed(2)}`);
          $('#data-description').val(`${window.Products[i].description}`);
          $(".add-new-data").addClass("show");
          $(".overlay-bg").addClass("show");
          let category = '';
          $('#data-category').change(function(){
            category = $('#data-category').val();
            console.log(category);
          })

          //Changes Effect
          $('.add-data-btn').click(function(){
            $(`#proDetails${id} .product-name`).text($('#data-name').val());
            $(`#proDetails${id} .product-price`).text($('#data-price').val());
            
            if(category) {
              $(`#proDetails${id} .product-category`).text(category);
            }
            
            $(".add-new-data").removeClass("show");
            $(".overlay-bg").removeClass("show");
            $('.add-data-btn').unbind();
            $('#data-category').unbind();
          });
        }
      }
    }

    
    
    //Amit Code end
    
  });



  // On Delete
  $('.action-delete').on("click", function(e){
    e.stopPropagation();
    $(this).closest('td').parent('tr').fadeOut();
  });

  // dropzone init
  Dropzone.options.dataListUpload = {
    complete: function(files) {
      var _this = this
      // checks files in class dropzone and remove that files
      $(".hide-data-sidebar, .cancel-data-btn, .actions .dt-buttons").on(
        "click",
        function() {
          $(".dropzone")[0].dropzone.files.forEach(function(file) {
            file.previewElement.remove()
          })
          $(".dropzone").removeClass("dz-started")
        }
      )
    }
  }
  Dropzone.options.dataListUpload.complete()

  // mac chrome checkbox fix
  if (navigator.userAgent.indexOf("Mac OS X") != -1) {
    $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
  }
})



jQuery('#product_List_Container').bind('DOMSubtreeModified',function(event) { 
	//On Edit
  $('.action-edit').on("click",function(e){
    e.stopPropagation();
    /*$('#data-name').val('Altec Lansing - Bluetooth Speaker');
    $('#data-price').val('$99');
    $(".add-new-data").addClass("show");
    $(".overlay-bg").addClass("show");*/
    //Amit Code
    const id = $(this).closest('td').attr('prodID');
    if(window.Products){
      for(let i = 0; i < window.Products.length; i++){
        if(window.Products[i].id === id){
          $('#data-name').val($(`#proDetails${id} .product-name`).text());
          $('#data-price').val($(`#proDetails${id} .product-price`).text());
          $('#data-mrp').val(`$${parseFloat(window.Products[i].mrp).toFixed(2)}`);
          $('#data-description').val(`${window.Products[i].description}`);
          if(window.Products[i].onsale) {
            $('#chip-onsale').addClass('chip-success');
            $('#chip-onsale').attr('onsale','true');
            $('#chip-onsale').removeClass('chip-danger');
            $('#chip-onsale .chip-text').text('Active');
          }else {
            $('#chip-onsale').addClass('chip-danger');
            $('#chip-onsale').attr('onsale','false');
            $('#chip-onsale').removeClass('chip-success');
            $('#chip-onsale .chip-text').text('Deactive');
          }
          if(window.Products[i].status) {
            $('#chip-status').addClass('chip-success');
            $('#chip-status').attr('status','true');
            $('#chip-status').removeClass('chip-danger');
            $('#chip-status .chip-text').text('Active');
          }else {
            $('#chip-status').addClass('chip-danger');
            $('#chip-status').attr('status','false');
            $('#chip-status').removeClass('chip-success');
            $('#chip-status .chip-text').text('Deactive');
          }
          $(".add-new-data").addClass("show");
          $(".overlay-bg").addClass("show");
          let category = '';
          $('#data-category').change(function(){
            category = $('#data-category').val();
            console.log(category);
          })
          //Changes Effect
          $('.add-data-btn').click(function(){
            $(`#proDetails${id} .product-name`).text($('#data-name').val());
            $(`#proDetails${id} .product-price`).text($('#data-price').val());
            const status = $('#chip-status').attr('status');
            const onsale = $('#chip-onsale').attr('onsale');
            console.log(status,onsale);
            if(onsale){
              $(`#onsale${id}`).attr('onsale', `${onsale === 'true'? 'true' : 'false'}`);
              $(`#onsale${id}`).html(`<div class="chip ${onsale === 'true' ? 'chip-success' : 'chip-warning'}"><div class="chip-body"><div class="chip-text">${onsale === 'true' ? 'Active' : 'Deactive'}</div></div></div>`);
            }
              
            if(status){
              $(`#status${id}`).attr('status', `${status === 'true' ? 'true' : 'false'}`);
              $(`#status${id}`).html(`<div class="chip ${status === 'true' ? 'chip-success' : 'chip-warning'}"><div class="chip-body"><div class="chip-text">${status === 'true' ? 'Active' : 'Deactive'}</div></div></div>`);
            }

            
            if(category) {
              $(`#proDetails${id} .product-category`).text(category);
            }
            
            $(".add-new-data").removeClass("show");
            $(".overlay-bg").removeClass("show");
            $('.add-data-btn').unbind();
            $('#data-category').unbind();
            jQuery('#product_List_Container').unbind();

          });
        }
      }
    }

    
    
    //Amit Code end
    
  });

  // On Delete
  $('.action-delete').on("click", function(e){
    e.stopPropagation();
    $(this).closest('td').parent('tr').fadeOut();
  });

}); 



//status and onsale 
$(document).ready(function(){
  $(`#chip-onsale`).click(function(){
    const onsale = $(`#chip-onsale`).attr('onsale');
    if(onsale === 'true'){
      $('#chip-onsale').addClass('chip-danger');
      $('#chip-onsale').attr('onsale','false');
      $('#chip-onsale').removeClass('chip-success');
      $('#chip-onsale .chip-text').text('Deactive');
    }else {
      $('#chip-onsale').addClass('chip-success');
      $('#chip-onsale').attr('onsale','true');
      $('#chip-onsale').removeClass('chip-danger');
      $('#chip-onsale .chip-text').text('Active');
    }
    
  })
  
  $(`#chip-status`).click(function(){
    const status = $(`#chip-status`).attr('status');
    if(status === 'true'){
      $('#chip-status').addClass('chip-danger');
      $('#chip-status').attr('status','false');
      $('#chip-status').removeClass('chip-success');
      $('#chip-status .chip-text').text('Deactive');
    }else {
      $('#chip-status').addClass('chip-success');
      $('#chip-status').attr('status','true');
      $('#chip-status').removeClass('chip-danger');
      $('#chip-status .chip-text').text('Active');
      }
  })
  
})
