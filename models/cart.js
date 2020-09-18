module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id) {
        let storedItem = this.items[id];
        if(!storedItem) {
            storedItem = this.items[id] = { price: item.price, qty: 0, totalPrice: 0, imageCover: item.imageCover, name: item.name, id: item.id};
        };
        storedItem.qty++;
        storedItem.totalPrice = storedItem.price * storedItem.qty;
        let totalQtys = 0;
        let totalPrices = 0;
        for(let id in this.items) {
            totalQtys += this.items[id].qty;
            totalPrices += this.items[id].totalPrice;
        }
        this.totalQty = totalQtys ? totalQtys : 0;
        this.totalPrice = totalPrices ? totalPrices : 0;
    };

    this.getArry = function(){
        let arr = [];
        for(let id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };

    this.updateQty = function(pid,pqty){
        this.items[pid].qty = pqty;
        this.items[pid].totalPrice = this.items[pid].price * pqty;
        let qty = this.items[pid].qty;
        let productTotalPrice = this.items[pid].totalPrice;
        let price = this.items[pid].price;
        let totalQtys = 0;
        let totalPrices = 0;
        for(let id in this.items) {
            totalQtys += this.items[id].qty;
            totalPrices += this.items[id].totalPrice;
        }
        this.totalQty = totalQtys ? totalQtys : 0;
        this.totalPrice = totalPrices ? totalPrices : 0;
        totalPrice = this.totalPrice;
        totalQty = this.totalQty;

        return {pid,  qty ,price, productTotalPrice, totalQty , totalPrice};
    };

    this.popItem = function(pid){
        delete this.items[pid];
        let totalQtys = 0;
        let totalPrices = 0;
        for(let id in this.items) {
            totalQtys += this.items[id].qty;
            totalPrices += this.items[id].totalPrice;
        }
        this.totalQty = totalQtys ? totalQtys : 0;
        this.totalPrice = totalPrices ? totalPrices : 0;
        totalPrice = this.totalPrice;
        totalQty = this.totalQty;
        return { pid , totalPrice, totalQty};
    }


    this.resetAll = function() {
        this.items = {};
        this.totalPrice = 0;
        this.totalQty = 0;
    };
};
