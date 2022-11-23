class Header{
    handlerOpenShoppingPage(){
        shoppingPage.render();
    }

    render(length){
        const html = `
            ${length}
        `;
        ROOT_HEADER.innerHTML = html;
    }
}

const headerPage = new Header();

const productsStore = localStorageUtils.getProducts();
headerPage.render(productsStore.length);
