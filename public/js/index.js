//onclick Cart
$('li.cart-icon').click(function(){
  $('.cart-hover').toggleClass('cartshow');
})

$('#closeCart').click(function(){
  $('.cart-hover').toggleClass('cartshow');
})

// Get All Categories
window.Categories = $.parseJSON($.ajax({
  type: 'get',
  url:  `/api/v1/categories`,
  dataType: "json", 
  async: false
}).responseText);

// Get All Products
window.Products = $.parseJSON($.ajax({
  type: 'get',
  url:  `/api/v1/products`,
  dataType: "json", 
  async: false
}).responseText);

$('.product-list').attr('catId','All');

/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import { signup } from './signup';
import { updateSettings } from './updateSettings';
import { showAlert } from './alerts';
import './wishList';
import './cart';
import './main';
import './shopConfig';

// DOM ELEMENTS
const loginForm = document.querySelector('.login-form');
const registerForm = document.querySelector('.signup-form');
const logOutBtn = document.querySelector('#logoutBtn');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const ProductListContainer = $('.product-list');
let productFilterUrl = '';

// get url last
let url = window.location.href;
url = url.split('/');
url = url[(url.length - 1)];
window.Url = url;
console.log(url);




if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if(registerForm)
  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('con-password').value;
    signup(name, email, password, passwordConfirm);
  });


if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if(ProductListContainer){
  sortingProduct();
}


$(`.AllFilter`).click(function(){
  $('.product-list').attr('catID', 'All');
  sortingProduct();
  console.log('hiii');
});

$(`.filter-btn`).click(function(){
  sortingProduct();
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


// Change Sort 
$(".sorting").change(function(){
  sortingProduct();
});



const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);






