class Products{
    constructor(){
        this.classNameActive = 'active__btn';
        this.labelAdd = 'Добавить в корзину <img src="../Wine/img/icons/cart.svg" alt="cart">';
        this.labelRemove = "Убрать из корзины";
    };

    removeItem(el, id){
        const {pushProducts, products,} = localStorageUtils.putProducts(id);
        if (pushProducts) {
            el.classList.remove(this.classNameActive);
        }
        headerPage.render(products.length);
        shoppingPage.render();
        productsPage.render();
    };

    removeItemAllItem(el, id){
        const productsStore = localStorageUtils.putProducts(id);
        for (el of productsStore) {
            el.classList.remove(this.classNameActive);
        }
        headerPage.render(products.length);
        shoppingPage.render();
        productsPage.render();
    }

    handleSetLocationStorage(el, id){
        const {pushProducts, products,} = localStorageUtils.putProducts(id);
        if (pushProducts) {
            el.classList.add(this.classNameActive);
            el.innerHTML = this.labelRemove;
        }else{
            el.classList.remove(this.classNameActive);
            el.innerHTML = this.labelAdd;
        }

        headerPage.render(products.length);
    };

    render(){
        const productsStore = localStorageUtils.getProducts();
        let htmlCatalog = '';

        catalog.forEach(({ id, img, name, country, price}) =>{
            let activeBtn = '';
            let activeText = '';

            if (productsStore.indexOf(id) === -1){
                activeText =  this.labelAdd;
            }else{
                activeBtn = ' '+this.classNameActive;
                activeText = this.labelRemove;
            }

            htmlCatalog +=`
                <div class="tab__products__item">
                    <div class="tab__products__img"><img src='${img}'></div>
                    <h5 class="tab__products__title">${name}</h5>
                    <p class="tab__products__country">${country}</p>
                    <p class="tab__products__price">${price} руб.</p>
                    <button class="tab__products__button button${activeBtn}" onclick="productsPage.handleSetLocationStorage(this, '${id}');">${activeText}</button>
                </div>
            `;
        })

        ROOT_PRODUCTS.innerHTML = htmlCatalog;
    }
}

const productsPage = new Products();
productsPage.render();