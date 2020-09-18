//DOM Menupulation
const loginBtn = $('#loginBtn');
const logoutBtn = $('#logoutBtn');
const signUpBtn = $('#signUpBtn');
const filterCategory = $('.filter-catagories');
const ProductListContainer = $('.product-list');
const byAllCategory = $()

//Sorting Functionality
$('.product-list').attr('catId','All');
const productFilter = () => {
    if(ProductListContainer) {
        const products = getProducts();
        let html = '';
        for(var i = 0; i< products.length; i++) {
            let categoryName = getCategoryname(products[i].categories_id);
            html +=  `
                    <div class="col-lg-4 col-sm-6 blogBox moreBox">
                        <div class="product-item">
                            <div class="pi-pic">
                                <img src="img/products/${products[i].image}" alt="${products[i].image}">
                                ${products[i].onsale ? '<div class="sale pp-sale">Sale</div>' : '' }
                                <div class="icon">
                                    <i class="icon_heart_alt"></i>
                                </div>
                                <ul>
                                    <li class="w-icon active"><a href="#"><i class="icon_bag_alt"></i></a></li>
                                    <li class="quick-view"><a href="/shop/product/${products[i].ID}">+ Quick View</a></li>
                                    <li class="w-icon"><a href="#"><i class="fa fa-random"></i></a></li>
                                </ul>
                            </div>
                            <div class="pi-text">
                                <div class="catagory-name">${categoryName}</div>
                                <a href="#">
                                    <h5>${products[i].name}</h5>
                                </a>
                                <div class="product-price">
                                    $${products[i].price}
                                    <span>$${products[i].mrp}</span>
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
            `)
        }
}

//Sorting Functionality End


export const hideAlert = () => {
    const el = document.querySelector('.alert');
    if(el) el.parentElement.removeChild(el);
}
export const showAlert = (type, msg) => {
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    $("body").prepend(markup);
    window.setTimeout(hideAlert, 5000);
};


const login = async (email, password) =>{
    try {
        const loginData = await axios({
            method: 'POST',
            url: `/api/v1/users/login`,
            data: {
                email,
                password
            }
        });

        if(loginData.data.status === 'success') {
            showAlert('success','Logged In Successfully!!');
            window.setTimeout(function(){
                location.assign('/');
            }, 4000);
            
        }
        
    } catch(err) {
        showAlert('error',err.response.data.message);
    }
}

const logout = async () => {
    try{
        const res = await axios({
            method: 'GET',
            url: `/api/v1/users/logout`,
        });
        if(res.data.status === 'success') {
            window.setTimeout(function(){
                showAlert('success','Logged Out Successfully!!');
            }, 1000);
            window.setTimeout(function(){
                location.reload();
            }, 4000);
            
        }
    } catch(err) {
        alert(err.response2000a.message);
    }
}


const signUp = async (name, email, password, passwordConfirm) => {
    try {
        const loginData = await axios({
            method: 'POST',
            url: `/api/v1/users/signup`,
            data: {
                name,
                email,
                password,
                passwordConfirm
            }
        });

        if(loginData.data.status === 'success') {
            showAlert('success','Registration Successfull!!!');
            window.setTimeout(function(){
                location.assign('/');
            }, 3000);
        }
        
    } catch(err) {
        showAlert('error',err.response.data.message);
    }
}



//Get Category Name

const getCategoryname = (id) => {
    const category_option = $.parseJSON($.ajax({
        type: 'get',
        url:  `/api/v1/categories/${id}`,
        dataType: "json", 
        async: false
    }).responseText);
    
    return category_option.categories[0].name;
}


//Get Products

const getProducts = () => {
    let category_id = $('.product-list').attr('catId');
    let sort = $('.current').text();
    let minAmt = $('#minamount').val().replace(/\$/g,'');
    let maxAmt = $('#maxamount').val().replace(/\$/g,'');
    console.log(category_id,sort,minAmt,maxAmt);
    let reqUrl = '/api/v1/products/';
    if(category_id && minAmt && maxAmt && sort) {
        if(category_id === 'All'){
        }else {
            reqUrl += `?categories_id=${category_id}`;
        }
        if(minAmt && maxAmt) {
            if(category_id === 'All'){
                reqUrl += `?price=bwt ${minAmt} ${maxAmt}`;
            }else {
                reqUrl += `&price=bwt ${minAmt} ${maxAmt}`;
            }
            
        }
        if(sort) {
            if(sort === 'Default Sorting') {
                
            }
            if(sort === 'Desending Sorting') {
                reqUrl += `&sort=desc name`;
            }
            if(sort === 'Lowest Price') {
                reqUrl += `&sort=asc price`;
            }
            if(sort === 'Heigest Price') {
                reqUrl += `&sort=desc price`;
            }
        }
        
    }
    console.log(reqUrl);
    const products = $.parseJSON($.ajax({
        type: 'get',
        url:  reqUrl,
        dataType: "json", 
        async: false
    }).responseText);
    
    return products.categories;
}

// Login button
    if(loginBtn) {
        loginBtn.click(function(){
            console.log('hiii');
            const email = $('#email').val();
            const password = $('#password').val();
            login(email, password);
        });
    }
    

// Logout button
    if(logoutBtn) {
        logoutBtn.click(function(){
            logout();
        }); 
    }
       
// SignUp button
    if(signUpBtn){
        signUpBtn.click(function(){
            const name = $("#username").val();
            const email = $("#email").val();
            const password = $("#password").val();
            const passwordConfirm = $("#con-password").val();
            console.log(name,email,password,passwordConfirm);
            signUp(name, email, password, passwordConfirm);
        });    
    }
    


// filter-catagories
if(filterCategory) {
    const categories = getCategories();
    let html = `<li class="AllFilter" catid="AllFilter" style="cursor: pointer;">All Categories</li>`;
    for(var i = 0; i< categories.length; i++) {
        html +=  `<li class="catfilter${categories[i].ID}" catID="${categories[i].ID}" style="cursor: pointer;">${categories[i].name}</li>`;
    }
    filterCategory.html(html);
}



// First Time Show Product
productFilter();


//Sort 
$(".sorting").change(function(){
    productFilter();
});
//Sort by Category
if(filterCategory) {
    const categories = getCategories();
    for(var i = 0; i< categories.length; i++) {
        let ID =categories[i].ID;
        $(`.catfilter${ID}`).click(function(){
            $('.product-list').attr('catID', ID);
            productFilter();
        });
        
    }
}

$(`.AllFilter`).click(function(){
    $('.product-list').attr('catID', 'All');
    productFilter();
});

$(`.filter-btn`).click(function(){
    productFilter();
});


//Search 
$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".product-list .blogBox").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
