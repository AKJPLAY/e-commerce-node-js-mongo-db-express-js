function callAgian() {
    $.ajax({
        type: 'get',
        url: '/api/v1/categories',
        dataType: 'json',
        success: function (data) {
            let html = '';
            for(var i =0; i< data.categories.length; i++)  {
                let id = data.categories[i].ID;
                let name = data.categories[i].name;
                html = html + ` 
                <tr class="cat${data.categories[i].ID}">
                    <td>${ i + 1 }</td>
                    <td><span class="catname${data.categories[i].ID}">${data.categories[i].name}</span>  <i class="fas fa-edit edit-name pointer"></i></td>
                    <td> <img class="catimage${data.categories[i].ID}" style="width: 40px;" src="../../img/${data.categories[i].image}" alt="${data.categories[i].image}">  <button id="${data.categories[i].ID}" type="button" class="btn" data-toggle="modal" data-target="#modal-sm"><i class="fas fa-edit edit-image pointer"></i></button></td>
                    <td status="${data.categories[i].status}"><span class="badge badge-${data.categories[i].status === 1 ? 'success' : 'danger'}"> ${data.categories[i].status === 1 ? 'active' : 'deactive'}</span></td>
                    <td onhome="${data.categories[i].onhome}"><span class="badge badge-${data.categories[i].onhome === 1 ? 'success' : 'danger'}"> ${data.categories[i].onhome === 1 ? 'active' : 'deactive'}</span></td>
                    <td><button type="button" id="delcat${data.categories[i].ID}" class="btn btn-tool">
                        <i class="fas fa-times"></i>
                    </button></td>
                </tr>
            `;
            
            $(document).ready(function(){
                let status = '';
                let onhome = '';
                //For active deactive status for category
                $(`tr.cat${id} td:nth-child(4)`).click(function() {
                    if($(`tr.cat${id} td:nth-child(4)`).attr('status') === '1') {
                        status = 0;
    
                        $.ajax({
                            type: 'patch',
                            url: `/api/v1/categories/${id}?Filedsandvalues[status]=${status}`,
                            dataType: 'json',
                            success: function (data) {
                            },
                            error: function (xhr, status, error) {
                                console.log(xhr, error);
                            }
                        });
    
                        $(`tr.cat${id} td:nth-child(4)`).attr('status', status);
                        $(`tr.cat${id} td:nth-child(4) span`).text('deactive');
                        $(`tr.cat${id} td:nth-child(4) span`).addClass('badge-danger');
                        $(`tr.cat${id} td:nth-child(4) span`).removeClass('badge-success');
    
                    }else {
                        status = 1;
    
                        $.ajax({
                            type: 'patch',
                            url: `/api/v1/categories/${id}?Filedsandvalues[status]=${status}`,
                            dataType: 'json',
                            success: function (data) {
                            },
                            error: function (xhr, status, error) {
                                console.log(xhr, error);
                            }
                        });
    
                        $(`tr.cat${id} td:nth-child(4)`).attr('status', status);
                        $(`tr.cat${id} td:nth-child(4) span`).text('active');
                        $(`tr.cat${id} td:nth-child(4) span`).addClass('badge-success');
                        $(`tr.cat${id} td:nth-child(4) span`).removeClass('badge-danger');
                    }
    
                  });
    
    
                  //For active deactive onhome for category
    
                  $(`tr.cat${id} td:nth-child(5)`).click(function() {
                    if($(`tr.cat${id} td:nth-child(5)`).attr('onhome') === '1') {
                        onhome = 0;
    
                        $.ajax({
                            type: 'patch',
                            url: `/api/v1/categories/${id}?Filedsandvalues[onhome]=${onhome}`,
                            dataType: 'json',
                            success: function (data) {
                            },
                            error: function (xhr, status, error) {
                                console.log(xhr, error);
                            }
                        });
    
                        $(`tr.cat${id} td:nth-child(5)`).attr('onhome', onhome);
                        $(`tr.cat${id} td:nth-child(5) span`).text('deactive');
                        $(`tr.cat${id} td:nth-child(5) span`).addClass('badge-danger');
                        $(`tr.cat${id} td:nth-child(5) span`).removeClass('badge-success');
    
                    }else {
                        onhome = 1;
    
                        $.ajax({
                            type: 'patch',
                            url: `/api/v1/categories/${id}?Filedsandvalues[onhome]=${onhome}`,
                            dataType: 'json',
                            success: function (data) {
                            },
                            error: function (xhr, status, error) {
                                console.log(xhr, error);
                            }
                        });
    
                        $(`tr.cat${id} td:nth-child(5)`).attr('onhome', onhome);
                        $(`tr.cat${id} td:nth-child(5) span`).text('active');
                        $(`tr.cat${id} td:nth-child(5) span`).addClass('badge-success');
                        $(`tr.cat${id} td:nth-child(5) span`).removeClass('badge-danger');
                    }
    
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
                            url: `/api/v1/categories/${id}?Filedsandvalues[name]=${value}`,
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
                                  url: `/api/v1/categories/${id}?Filedsandvalues[name]=${value}`,
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
                                      url: `/api/v1/categories/${id}?Filedsandvalues[name]=${value}`,
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
                                          url: `/api/v1/categories/${id}?Filedsandvalues[name]=${value}`,
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
                        var result = confirm("Are Sure to Delete Category");
                        if(result){
                            $.ajax({
                                type: 'delete',
                                url: `/api/v1/categories/${id}`,
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
                        <th>Image</th>
                        <th>Status</th>
                        <th>OnFront-Page</th>
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
        url: `/api/v1/categories/${id}`,
        data: formData,
        contentType: false,
        cache: false,
        processData: false
    });   
    setTimeout(function(){ location.reload(); }, 1500);
    
});


$(`#add-category`).click(function() {
    const name = document.getElementById("name").value;
    
    const imageName = document.querySelector("#addImageName").files[0];
    var formData = new FormData();
    if(name) {
        formData.append('name', name);
    }
    if(imageName) {
        formData.append('imageName', imageName);
    }

    
    $.ajax({
        type: 'post',
        url: `/api/v1/categories`,
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


