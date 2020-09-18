const NavMenus =$('.nav-menu-link'); 
const CategoriesMenus = $('.depart-hover');
$(document).ready(function(){
if(CategoriesMenus) {
    let html = '';
        if(window.Categories) {
            console.log('hiii');
            for(let i = 0; i < window.Categories.data.data.length ; i++) {
                if(window.Categories.data.data[i].name === window.Url) {
                    html += `
                        <li class="active">
                            <a href="/shop/${window.Categories.data.data[i].slug}">${window.Categories.data.data[i].slug}</a>
                        </li>`;
                }else {
                    html += `
                        <li>
                            <a href="/shop/${window.Categories.data.data[i].slug}">${window.Categories.data.data[i].slug}</a>
                        </li>`;
                }
                
            }
        }
        CategoriesMenus.html(html);
}

if(NavMenus) {
    let NavMenuItems = ['home', 'shop', 'blog', 'contact', 'faq', 'wishList'];
    let html = '';
        if(window.Categories) {
            console.log('hiii');
            for(let i = 0; i < NavMenuItems.length ; i++) {
                if(NavMenuItems[i] === window.Url) {
                    if(NavMenuItems[i] === 'home') {
                        html += `
                        <li class="active">
                            <a href="/">${NavMenuItems[i]}</a>
                        </li>`;    
                    }else {
                        html += `
                        <li class="active">
                            <a href="/${NavMenuItems[i]}">${NavMenuItems[i]}</a>
                        </li>`;
                    }
                }else {
                    if(NavMenuItems[i] === 'home') {
                        html += `
                        <li>
                            <a href="/">${NavMenuItems[i]}</a>
                        </li>`;    
                    }else {
                        html += `
                        <li>
                            <a href="/${NavMenuItems[i]}">${NavMenuItems[i]}</a>
                        </li>`;
                    }
                }
                
            }
        }
        NavMenus.html(html);
}
});


