
function callAgian() {
    $.ajax({
        type: 'get',
        url: '/api/v1/products/',
        dataType: 'json',
        success: function (data) {
            let html = '';
            for(var i =0; i< data.categories.length; i++)  {
                let catName = '';                
                let id = data.categories[i].ID;
                let name = data.categories[i].name;
                let catID = data.categories[i].categories_id;
                let catData = $.parseJSON($.ajax({
                    type: 'get',
                    url:  `/api/v1/categories/${data.categories[i].categories_id}`,
                    dataType: "json", 
                    async: false
                }).responseText);                
                html = html + ` 
                <tr class="cat${data.categories[i].ID}">
                    <td>${ i + 1 }</td>
                    <td><span class="catname${data.categories[i].ID}">${data.categories[i].name}</span>  <i class="fas fa-edit edit-name pointer"></i></td>
                    <td><span>${catData.categories[0].name}</span></td>
                    <td> <img class="catimage${data.categories[i].ID}" style="width: 40px; height: 33px;" src="../../img/products/${data.categories[i].image}" alt="${data.categories[i].image}">  <button id="${data.categories[i].ID}" type="button" class="btn" data-toggle="modal" data-target="#modal-sm"><i class="fas fa-edit edit-image pointer"></i></button></td>
                    <td status="${data.categories[i].status}"><span class="badge badge-${data.categories[i].status === 1 ? 'success' : 'danger'}"> ${data.categories[i].status === 1 ? 'active' : 'deactive'}</span></td>
                    <td onsale="${data.categories[i].onsale}"><span class="badge badge-${data.categories[i].onsale === 1 ? 'success' : 'danger'}"> ${data.categories[i].onsale === 1 ? 'active' : 'deactive'}</span></td>
                    <td>
                    <i class="fas fa-edit edit-complete-product${data.categories[i].ID} pointer">
                    <button type="button" id="delcat${data.categories[i].ID}" class="btn btn-tool">
                        <i class="fas fa-times"></i>
                    </button></td>
                </tr>
            `;
            
            $(document).ready(function(){
                let status = '';
                let onsale = '';
                //For active deactive status for category
                $(`tr.cat${id} td:nth-child(5)`).click(function() {
                    if($(`tr.cat${id} td:nth-child(5)`).attr('status') === '1') {
                        status = 0;
    
                        $.ajax({
                            type: 'patch',
                            url: `/api/v1/products//${id}?Filedsandvalues[status]=${status}`,
                            dataType: 'json',
                            success: function (data) {
                            },
                            error: function (xhr, status, error) {
                                console.log(xhr, error);
                            }
                        });
    
                        $(`tr.cat${id} td:nth-child(5)`).attr('status', status);
                        $(`tr.cat${id} td:nth-child(5) span`).text('deactive');
                        $(`tr.cat${id} td:nth-child(5) span`).addClass('badge-danger');
                        $(`tr.cat${id} td:nth-child(5) span`).removeClass('badge-success');
    
                    }else {
                        status = 1;
    
                        $.ajax({
                            type: 'patch',
                            url: `/api/v1/products//${id}?Filedsandvalues[status]=${status}`,
                            dataType: 'json',
                            success: function (data) {
                            },
                            error: function (xhr, status, error) {
                                console.log(xhr, error);
                            }
                        });
    
                        $(`tr.cat${id} td:nth-child(5)`).attr('status', status);
                        $(`tr.cat${id} td:nth-child(5) span`).text('active');
                        $(`tr.cat${id} td:nth-child(5) span`).addClass('badge-success');
                        $(`tr.cat${id} td:nth-child(5) span`).removeClass('badge-danger');
                    }
    
                  });
    
    
                  //For active deactive onsale for category
    
                  $(`tr.cat${id} td:nth-child(6)`).click(function() {
                    if($(`tr.cat${id} td:nth-child(6)`).attr('onsale') === '1') {
                        onsale = 0;
    
                        $.ajax({
                            type: 'patch',
                            url: `/api/v1/products//${id}?Filedsandvalues[onsale]=${onsale}`,
                            dataType: 'json',
                            success: function (data) {
                            },
                            error: function (xhr, status, error) {
                                console.log(xhr, error);
                            }
                        });
    
                        $(`tr.cat${id} td:nth-child(6)`).attr('onsale', onsale);
                        $(`tr.cat${id} td:nth-child(6) span`).text('deactive');
                        $(`tr.cat${id} td:nth-child(6) span`).addClass('badge-danger');
                        $(`tr.cat${id} td:nth-child(6) span`).removeClass('badge-success');
    
                    }else {
                        onsale = 1;
    
                        $.ajax({
                            type: 'patch',
                            url: `/api/v1/products//${id}?Filedsandvalues[onsale]=${onsale}`,
                            dataType: 'json',
                            success: function (data) {
                            },
                            error: function (xhr, status, error) {
                                console.log(xhr, error);
                            }
                        });
    
                        $(`tr.cat${id} td:nth-child(6)`).attr('onsale', onsale);
                        $(`tr.cat${id} td:nth-child(6) span`).text('active');
                        $(`tr.cat${id} td:nth-child(6) span`).addClass('badge-success');
                        $(`tr.cat${id} td:nth-child(6) span`).removeClass('badge-danger');
                    }
    
                  });


                    //Product Details
                    $(`.edit-complete-product${id}`).click(function() {
                        
                        $.ajax({
                            type: 'get',
                            url: `/api/v1/products/${id}`,
                            dataType: 'json',
                            success: function (data) {
                                //Category Option
                                let categories_html = '';
                                const category_option = $.parseJSON($.ajax({
                                    type: 'get',
                                    url:  `/api/v1/categories/`,
                                    dataType: "json", 
                                    async: false
                                }).responseText);
                                for(var i = 0; i < category_option.categories.length; i++) {
                                    if(category_option.categories[i].ID === catID){
                                        categories_html += `<option catID="${category_option.categories[i].ID}" selected="selected">${category_option.categories[i].name}</option>`;
                                    }else {
                                        categories_html += `<option catID="${category_option.categories[i].ID}">${category_option.categories[i].name}</option>`;
                                    }
                                    
                                }

                                $("#categoryList").addClass('p-4');
                                $(".change-title").text('Product Details');
                                $("#categoryList").html(
                                    `
                                    <form role="form">
                                        <div class="row">
                                        <div class="col-sm-6">
                                            <!-- text input -->
                                            <div class="form-group">
                                            <label>Name</label>
                                            <input id="productname" name="name" type="text" class="form-control" placeholder="${data.categories[0].name}" value="${data.categories[0].name}">
                                            </div>
                                        </div>

                                        <div class="col-sm-6">
                                            <div class="form-group">
                                            <label>Category</label>
                                            <select id="catOption" class="form-control">
                                                ${categories_html}
                                            </select>
                                            </div>
                                        </div>
                                        
                                        </div>

                                        <div class="row">
                                        <div class="col-sm-4">
                                            <!-- text input -->
                                            <div class="form-group">
                                            <label>Mrp</label>
                                            <input id="mrp" name="mrp" type="text" class="form-control" placeholder="${data.categories[0].mrp}" value="${data.categories[0].mrp}">
                                            </div>
                                        </div>

                                        <div class="col-sm-4">
                                            <!-- text input -->
                                            <div class="form-group">
                                            <label>Price</label>
                                            <input id="price" name="price" type="text" class="form-control" placeholder="${data.categories[0].price}" value="${data.categories[0].price}">
                                            </div>
                                        </div>

                                        <div class="col-sm-4">
                                            <!-- text input -->
                                            <div class="form-group">
                                            <label>Qty.</label>
                                            <input id="qty" name="qty" type="text" class="form-control" placeholder="${data.categories[0].qty}" value="${data.categories[0].qty}">
                                            </div>
                                        </div>
                                        
                                        </div>


                                        <div class="row">
                                        <div class="col-sm-12">
                                            <!-- text input -->
                                            <div class="form-group">
                                            <label>Short Discription</label>
                                            <textarea id="short_desc" name="short_desc" type="text" class="form-control" placeholder="${data.categories[0].short_desc}">${data.categories[0].qty}</textarea>
                                            </div>
                                        </div>

                                        <div class="col-sm-12">
                                            <!-- text input -->
                                            <div class="form-group">
                                            <label>Discription</label>
                                            <textarea id="descrip" name="descrip" type="text" class="form-control" placeholder="${data.categories[0].descrip}">${data.categories[0].descrip}</textarea>
                                            </div>
                                        </div>
                                        
                                        </div>

                                        <div class="row">
                                        <div class="col-sm-12" style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
                                            <img style="width: 70%;" src="../../img/products/${data.categories[0].image}" alt="${data.categories[0].image}">
                                            <div class="form-group">
                                            <label for="exampleInputFile">Change Image</label>
                                            <div class="input-group">
                                                <div class="custom-file">
                                                <input id="imageName" name="imageName" type="file" class="custom-file-input">
                                                <label class="custom-file-label" for="exampleInputFile">Choose file</label>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>

                                        <div class="row">
                                        <div class="col-sm-4">
                                            <!-- text input -->
                                            <div class="form-group">
                                            <label>Meta Title</label>
                                            <input id="meta_title" name="meta_title" type="text" class="form-control" placeholder="${data.categories[0].meta_title}" value="${data.categories[0].meta_title}">
                                            </div>
                                        </div>

                                        <div class="col-sm-4">
                                            <!-- text input -->
                                            <div class="form-group">
                                            <label>Status</label>
                                            <input id="btn-status${data.categories[0].ID}" status="${data.categories[0].status}" type="button" class="form-control btn-${data.categories[0].status === 1 ? 'success' : 'danger'}" value="${data.categories[0].status === 1 ? 'active' : 'deactive'}">
                                            </div>
                                        </div>

                                        <div class="col-sm-4">
                                            <!-- text input -->
                                            <div class="form-group">
                                            <label>Onsale</label>
                                            <input id="btn-onsale${data.categories[0].ID}" onsale="${data.categories[0].onsale}" type="button" class="form-control btn-${data.categories[0].onsale === 1 ? 'success' : 'danger'}" value="${data.categories[0].onsale === 1 ? 'active' : 'deactive'}">
                                            </div>
                                        </div>
                                        </div>

                                        <div class="row">
                                        <div class="col-sm-12">
                                            <!-- text input -->
                                            <div class="form-group">
                                                <label>Meta Discription</label>
                                                <textarea id="meta_desc" name="meta_desc" type="text" class="form-control" placeholder="${data.categories[0].meta_desc}">${data.categories[0].meta_desc}</textarea>
                                            </div>
                                        </div>
                                        </div>
                    
                                        <div class="card-footer p-0" style="background: #fff;">
                                            <button id="save-product" type="button" class="btn btn-primary float-left">Save Product</button>
                                            <button id="close-product" type="button" class="btn btn-danger float-right">Close</button>
                                        </div>
                                    </form>
                                    `
                                );


                                //For active deactive status for product
    
                                $(`#btn-status${data.categories[0].ID}`).click(function() {
                                    if($(`#btn-status${data.categories[0].ID}`).attr('status') === '1') {
                                        status = 0;
                    
                                        $.ajax({
                                            type: 'patch',
                                            url: `/api/v1/products//${id}?Filedsandvalues[status]=${status}`,
                                            dataType: 'json',
                                            success: function (data) {
                                            },
                                            error: function (xhr, status, error) {
                                                console.log(xhr, error);
                                            }
                                        });
                    
                                        $(`#btn-status${data.categories[0].ID}`).attr('status', status);
                                        $(`#btn-status${data.categories[0].ID}`).attr('value', 'deactive');
                                        $(`#btn-status${data.categories[0].ID}`).addClass('btn-danger');
                                        $(`#btn-status${data.categories[0].ID}`).removeClass('btn-success');
                    
                                    }else {
                                        status = 1;
                    
                                        $.ajax({
                                            type: 'patch',
                                            url: `/api/v1/products//${id}?Filedsandvalues[status]=${status}`,
                                            dataType: 'json',
                                            success: function (data) {
                                            },
                                            error: function (xhr, status, error) {
                                                console.log(xhr, error);
                                            }
                                        });
                    
                                        $(`#btn-status${data.categories[0].ID}`).attr('status', status);
                                        $(`#btn-status${data.categories[0].ID}`).attr('value', 'active');
                                        $(`#btn-status${data.categories[0].ID}`).addClass('btn-success');
                                        $(`#btn-status${data.categories[0].ID}`).removeClass('btn-danger');
                                    }
                    
                                });

                                //For active deactive onsale for product
    
                                $(`#btn-onsale${data.categories[0].ID}`).click(function() {
                                    if($(`#btn-onsale${data.categories[0].ID}`).attr('onsale') === '1') {
                                        onsale = 0;
                    
                                        $.ajax({
                                            type: 'patch',
                                            url: `/api/v1/products//${id}?Filedsandvalues[onsale]=${onsale}`,
                                            dataType: 'json',
                                            success: function (data) {
                                            },
                                            error: function (xhr, status, error) {
                                                console.log(xhr, error);
                                            }
                                        });
                    
                                        $(`#btn-onsale${data.categories[0].ID}`).attr('onsale', onsale);
                                        $(`#btn-onsale${data.categories[0].ID}`).attr('value', 'deactive');
                                        $(`#btn-onsale${data.categories[0].ID}`).addClass('btn-danger');
                                        $(`#btn-onsale${data.categories[0].ID}`).removeClass('btn-success');
                    
                                    }else {
                                        onsale = 1;
                    
                                        $.ajax({
                                            type: 'patch',
                                            url: `/api/v1/products//${id}?Filedsandvalues[onsale]=${onsale}`,
                                            dataType: 'json',
                                            success: function (data) {
                                            },
                                            error: function (xhr, status, error) {
                                                console.log(xhr, error);
                                            }
                                        });
                    
                                        $(`#btn-onsale${data.categories[0].ID}`).attr('onsale', onsale);
                                        $(`#btn-onsale${data.categories[0].ID}`).attr('value', 'active');
                                        $(`#btn-onsale${data.categories[0].ID}`).addClass('btn-success');
                                        $(`#btn-onsale${data.categories[0].ID}`).removeClass('btn-danger');
                                    }
                    
                                });


                                setTimeout(function(){ 
                                    $('#save-product').click(function() {
                                        let categoriesID = '';
                                        const catName = $("#catOption").val();
                                        let catData = $.parseJSON($.ajax({
                                            type: 'get',
                                            url:  `/api/v1/categories/`,
                                            dataType: "json", 
                                            async: false
                                        }).responseText);
                                        for(let i = 0; i< catData.categories.length; i++) {
                                            if(catData.categories[i].name === catName) {
                                                categoriesID = catData.categories[i].ID;
                                            }
                                        }
                                        const name = $(`#productname`).val();
                                        const mrp = $(`#mrp`).val();
                                        const price = $(`#price`).val();
                                        const short_desc = $(`#short_desc`).val();
                                        const descrip = $(`#descrip`).val();
                                        const meta_title = $(`#meta_title`).val();
                                        const meta_desc = $(`#meta_desc`).val();
                                        const imageName = document.querySelector("#imageName").files[0];
                                        const qty = $(`#qty`).val();
                                        var formData = new FormData();
                                        if(name) {
                                            formData.append('name', name);
                                        }
                                        if(mrp){
                                            formData.append('mrp', mrp);
                                        }
                                        if(price) {
                                            formData.append('price', price);
                                        }
                                        if(short_desc) {
                                            formData.append('short_desc', short_desc);
                                        }
                                        if(descrip) {
                                            formData.append('descrip', descrip);
                                        }
                                        if(meta_title) {
                                            formData.append('meta_title', meta_title);
                                        }
                                        if(meta_desc) {
                                            formData.append('meta_desc', meta_desc);
                                        }
                                        if(imageName) {
                                            formData.append('imageName', imageName);
                                        }
                                        if(qty) {
                                            formData.append('qty', qty);                                            
                                        }           
                                        if(categoriesID) {
                                            formData.append('categories_id', categoriesID);

                                        }                             
                                        $.ajax({
                                            type: 'patch',
                                            url: `/api/v1/products/${id}`,
                                            data: formData,
                                            contentType: false,
                                            cache: false,
                                            processData: false,
                                            success: function(data){
                                                console.log(data.data[0].ID);
                                            }
                                        });   
                                        location.reload();
                                    }); 
                                    $('#close-product').click(function() {
                                        callAgian();
                                    })
                                }, 1000);

                            }

                        });

                    });
    
                  
                  
    
                  $(`tr.cat${id} td:nth-child(2) .edit-name`).click(function() {
                      const name = $(`.catname${id}`).text();
                      let html = `<input placeholder="${name}" id="catname${id}"/>  <i class="far fa-check-square pointer save-name"></i>`
                      $(`tr.cat${id} td:nth-child(2)`).html(html);
                      
    
                      $(`tr.cat${id} td:nth-child(2) .save-name`).click(function() {
                        //let html = `<input placeholder="${name}" id="catname${id}"/>  <i class="far fa-check-square pointer save-name"></i>`
                        //<span class="catname${data.categories[i].ID}">${data.categories[i].name}</span>  <i class="fas fa-edit edit-name pointer"></i>
                        let value = $(`#catname${id}`).val();
                        let html = `<span class="catname${id}">${value}</span>  <i class="fas fa-edit edit-name pointer"></i>`
                        $(`tr.cat${id} td:nth-child(2)`).html(html);
    
                        $.ajax({
                            type: 'patch',
                            url: `/api/v1/products/${id}?Filedsandvalues[name]=${value}`,
                            dataType: 'json',
                            success: function (data) {
                            },
                            error: function (xhr, status, error) {
                                console.log(xhr, error);
                            }
                        });
    
                        //Second
    
                        $(`tr.cat${id} td:nth-child(2) .edit-name`).click(function() {
                            const name = $(`.catname${id}`).text();
                            let html = `<input placeholder="${name}" id="catname${id}"/>  <i class="far fa-check-square pointer save-name"></i>`
                            $(`tr.cat${id} td:nth-child(2)`).html(html);
                            
          
                            $(`tr.cat${id} td:nth-child(2) .save-name`).click(function() {
                              //let html = `<input placeholder="${name}" id="catname${id}"/>  <i class="far fa-check-square pointer save-name"></i>`
                              //<span class="catname${data.categories[i].ID}">${data.categories[i].name}</span>  <i class="fas fa-edit edit-name pointer"></i>
                              let value = $(`#catname${id}`).val();
                              let html = `<span class="catname${id}">${value}</span>  <i class="fas fa-edit edit-name pointer"></i>`
                              $(`tr.cat${id} td:nth-child(2)`).html(html);
                              
          
                              $.ajax({
                                  type: 'patch',
                                  url: `/api/v1/products//${id}?Filedsandvalues[name]=${value}`,
                                  dataType: 'json',
                                  success: function (data) {
                                  },
                                  error: function (xhr, status, error) {
                                      console.log(xhr, error);
                                  }
                              });
    
                              //Third
    
                              $(`tr.cat${id} td:nth-child(2) .edit-name`).click(function() {
                                const name = $(`.catname${id}`).text();
                                let html = `<input placeholder="${name}" id="catname${id}"/>  <i class="far fa-check-square pointer save-name"></i>`
                                $(`tr.cat${id} td:nth-child(2)`).html(html);
                                
              
                                $(`tr.cat${id} td:nth-child(2) .save-name`).click(function() {
                                  //let html = `<input placeholder="${name}" id="catname${id}"/>  <i class="far fa-check-square pointer save-name"></i>`
                                  //<span class="catname${data.categories[i].ID}">${data.categories[i].name}</span>  <i class="fas fa-edit edit-name pointer"></i>
                                  let value = $(`#catname${id}`).val();
                                  let html = `<span class="catname${id}">${value}</span>  <i class="fas fa-edit edit-name pointer"></i>`
                                  $(`tr.cat${id} td:nth-child(2)`).html(html);
                                  
              
                                  $.ajax({
                                      type: 'patch',
                                      url: `/api/v1/products//${id}?Filedsandvalues[name]=${value}`,
                                      dataType: 'json',
                                      success: function (data) {
                                      },
                                      error: function (xhr, status, error) {
                                          console.log(xhr, error);
                                      }
                                  });
    
    
                                  //Fort
    
    
                                  $(`tr.cat${id} td:nth-child(2) .edit-name`).click(function() {
                                    const name = $(`.catname${id}`).text();
                                    let html = `<input placeholder="${name}" id="catname${id}"/>  <i class="far fa-check-square pointer save-name"></i>`
                                    $(`tr.cat${id} td:nth-child(2)`).html(html);
                                    
                  
                                    $(`tr.cat${id} td:nth-child(2) .save-name`).click(function() {
                                      //let html = `<input placeholder="${name}" id="catname${id}"/>  <i class="far fa-check-square pointer save-name"></i>`
                                      //<span class="catname${data.categories[i].ID}">${data.categories[i].name}</span>  <i class="fas fa-edit edit-name pointer"></i>
                                      let value = $(`#catname${id}`).val();
                                      let html = `<span class="catname${id}">${value}</span>  <i class="fas fa-edit edit-name pointer"></i>`
                                      $(`tr.cat${id} td:nth-child(2)`).html(html);
                                      
                  
                                      $.ajax({
                                          type: 'patch',
                                          url: `/api/v1/products//${id}?Filedsandvalues[name]=${value}`,
                                          dataType: 'json',
                                          success: function (data) {
                                          },
                                          error: function (xhr, status, error) {
                                              console.log(xhr, error);
                                          }
                                      });
    
                                      //Five
                                    })                
                                  });
    
                                })                
                              });
                            })                
                          });
                      })                
                    });



                    $(`button#${id} `).click(function() {
                        $('#modal-sm').attr('catID',id);
                        $('#modal-sm').attr('name',name);
                    });

                    $(`button#delcat${id} `).click(function() {
                        var result = confirm("Are Sure to Delete Product");
                        if(result){
                            $.ajax({
                                type: 'delete',
                                url: `/api/v1/products/${id}`,
                                dataType: 'json',
                                success: function (data) {
                                },
                                error: function (xhr, status, error) {
                                    console.log(xhr, error);
                                }
                            });
                            $(`tr.cat${id}`).remove();    
                        }
                        
                    });
                });

                

    
            
            }
            $("#categoryList").html(
                `
                <div class="table-responsive">
                    <table class="table m-0">
                        <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Status</th>
                        <th>OnSale</th>
                        <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            ${html}        
                        </tbody>
                    </table>
                </div>
                <!-- /.table-responsive -->
                `
            );
        },
        error: function (xhr, status, error) {
            console.log(xhr, error);
        }
    });
    
}

callAgian();


$(`#updateImage`).click(function() {
    const id = $("#modal-sm").attr("catID");
    const name = $("#modal-sm").attr("name");
    const imageName = document.querySelector("#imageName").files[0];
    var formData = new FormData();
    formData.append('name', name);
    formData.append('imageName', imageName);

    $.ajax({
        type: 'patch',
        url: `/api/v1/products/${id}`,
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        success: function(data){
            console.log(data.data[0].ID);
        }
    });   
    setTimeout(function(){ location.reload(); }, 1500);
    
});


let categories_html = '';
const category_option = $.parseJSON($.ajax({
    type: 'get',
    url:  `/api/v1/categories/`,
    dataType: "json", 
    async: false
}).responseText);
for(var i = 0; i < category_option.categories.length; i++) {
    categories_html += `<option catID="${category_option.categories[i].ID}">${category_option.categories[i].name}</option>`;
}

$("#addcatOption").html(categories_html);




$(`#add-category`).click(function() {
    var formData = new FormData();
    let categoriesID = '';
    const catName = $("#addcatOption").val();
    let catData = $.parseJSON($.ajax({
        type: 'get',
        url:  `/api/v1/categories/`,
        dataType: "json", 
        async: false
    }).responseText);
    for(let i = 0; i< catData.categories.length; i++) {
        if(catData.categories[i].name === catName) {
            categoriesID = catData.categories[i].ID;
        }
    }
    formData.append('categories_id', categoriesID);
    const imageName = document.querySelector("#addImageName").files[0];
    const name = $(`#addproductname`).val();
    const mrp = $(`#addmrp`).val();
    const price = $(`#addprice`).val();
    const short_desc = $(`#addshort_desc`).val();
    const descrip = $(`#adddescrip`).val();
    const meta_title = $(`#addmeta_title`).val();
    const meta_desc = $(`#addmeta_desc`).val();
    const qty = $(`#addqty`).val();
    

    if(name) {
        formData.append('name', name);
    }
    if(mrp){
        formData.append('mrp', mrp);
    }
    if(price) {
        formData.append('price', price);
    }
    if(short_desc) {
        formData.append('short_desc', short_desc);
    }
    if(descrip) {
        formData.append('descrip', descrip);
    }
    if(meta_title) {
        formData.append('meta_title', meta_title);
    }
    if(meta_desc) {
        formData.append('meta_desc', meta_desc);
    }
    if(imageName) {
        formData.append('imageName', imageName);
    }
    if(qty) {
        formData.append('qty', qty);
    }             

    $.ajax({
        type: 'post',
        url: `/api/v1/products/`,
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        success: function(data){
        }

    }); 

    setTimeout(function(){ location.reload(); }, 1500);
    
});



    







/*
$.ajax({
    type: 'get',
    url: '/api/v1/categories',
    dataType: 'json',
    success: function (data) {
        console.log('success');
    },
    error: function (xhr, status, error) {
        console.log(xhr, error);
    }
});
*/


