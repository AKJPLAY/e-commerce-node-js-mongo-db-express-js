module.exports = function WishList(oldWishList) {
    this.items = oldWishList.items || {};
    this.totalQty = oldWishList.totalQty || 0;

    this.add = function(product, id) {
        let storedItem = this.items[id];
        if(!storedItem) {
            storedItem = this.items[id] = { 
                id: id,
                name: product.name,
                slug: product.slug,
                category_id: product.category_id,
                price: product.price,
                mrp: product.mrp,
                onsale: product.onsale,
                status: product.status,
                imageCover: product.imageCover,
            };
        }; 
        let index = 0;
        for(let id in this.items) {
            index++;
        }
        this.totalQty = index ? index : 0;
    };

    this.getArry = function(){
        let arr = [];
        for(let id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };

    this.popItem = function(pid){
        delete this.items[pid];
        let totalQtys = 0;
        let index = 0;
        for(let id in this.items) {
            index++;
        }
        this.totalQty = index ? index : 0;
    }

  
    this.resetAll = function() {
        this.items = {};
        this.totalQty = 0;
    };
};